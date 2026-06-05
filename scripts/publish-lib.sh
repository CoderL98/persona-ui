#!/usr/bin/env bash
# =============================================================================
#  Persona UI — @persona-ui/lib 发布脚本
# =============================================================================
#  作用：将 packages/lib 发布到 npmjs.com 官方源
#  作者：Persona UI contributors
#
#  用法：./scripts/publish-lib.sh [标签] [--release]
#        默认行为 = 干跑（不实际发布），需显式 --release 才执行真正发布。
#        版本号 = 读取自 packages/lib/package.json#version（唯一来源）。
#        标签默认根据版本号自动推断：
#          - 含 -  （预发布，如 0.1.0-next.0）→ tag = next
#          - 不含 -（稳定版，如 0.1.0      ）→ tag = latest
#        也可显式传标签覆盖：./scripts/publish-lib.sh latest
#
#  示例：
#    ./scripts/publish-lib.sh                 # 干跑 @ 0.1.0-next.0 / next
#    ./scripts/publish-lib.sh latest          # 干跑 @ 0.1.0-next.0 / latest（覆盖）
#    ./scripts/publish-lib.sh --release       # 实跑 @ 0.1.0-next.0 / next
#    ./scripts/publish-lib.sh latest --release# 实跑 @ 0.1.0-next.0 / latest
#
#  前置：
#    1. 拥有 @persona-ui 组织成员权限的 npm 账号
#    2. 已创建 bypass-2fa 的 granular access token
#    3. 在项目根目录 .env 文件中设置 NPM_PUBLISH_TOKEN=npm_xxxx（已 .gitignore）
#    4. 仓库处于可发布状态（构建/检查/测试全部通过）
#    5. 已在 packages/lib/package.json#version 中写好目标版本号
# =============================================================================

set -euo pipefail
# 严格模式：
#   -e  任何命令非零退出立即终止
#   -u  使用未定义变量时报错
#   -o pipefail  管道命令中任一环节失败都视为整体失败

# -----------------------------------------------------------------------------
# Source 共享库（颜色、日志、env/token 检查、registry 查询、文件预检、解包）
# -----------------------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./_publish-common.sh
source "$SCRIPT_DIR/_publish-common.sh"

# -----------------------------------------------------------------------------
# Lib 包路径
# -----------------------------------------------------------------------------
LIB_DIR="$ROOT_DIR/packages/lib"
PKG_JSON="$LIB_DIR/package.json"
PKG_NAME="@persona-ui/lib"

# -----------------------------------------------------------------------------
# 清理函数（lib 是单包，路径硬编码即可）
# -----------------------------------------------------------------------------
cleanup_and_exit() {
  local code="${1:-0}"
  [ -f "${LIB_NPMRC:-}" ] && { rm -f "$LIB_NPMRC"; log_ok "已删除 $LIB_NPMRC"; }
  rm -rf "${TARBALL:-/tmp/pui-__none__}" "${VERIFY_DIR:-/tmp/pui-__none__}" "${TEST_DIR:-/tmp/pui-__none__}" 2>/dev/null || true
  exit "$code"
}
trap 'die $LINENO "$BASH_COMMAND"' ERR

# -----------------------------------------------------------------------------
# 参数解析
# -----------------------------------------------------------------------------
# 可选 1 个 tag，可选 --release / --dry-run
# 默认行为 = 干跑（最安全）；必须显式 --release 才会真发
TAG_OVERRIDE=""
RELEASE=false

for arg in "$@"; do
  case "$arg" in
    --release|-r)  RELEASE=true ;;
    --dry-run|-n)  RELEASE=false ;;
    --help|-h)
      sed -n '2,30p' "$0"
      exit 0 ;;
    -*)
      log_err "未知选项：$arg（可用：--release / --dry-run / --help）"
      exit 2 ;;
    *)
      [ -z "$TAG_OVERRIDE" ] && TAG_OVERRIDE="$arg" || { log_err "多余的位置参数：$arg"; exit 2; }
      ;;
  esac
done

# -----------------------------------------------------------------------------
# 读版本 + 推断 tag
# -----------------------------------------------------------------------------
VERSION="$(pub_read_version "$PKG_JSON")"
if [ -n "$TAG_OVERRIDE" ]; then
  TAG="$TAG_OVERRIDE"
else
  TAG="$(pub_infer_tag "$VERSION")"
fi

# 打印发布计划
pub_print_plan "$PKG_NAME" "$VERSION" "$TAG" "$RELEASE" "$NPM_REGISTRY"

# -----------------------------------------------------------------------------
# 0. 环境检查
# -----------------------------------------------------------------------------
log_step "步骤 0/7 — 环境检查"
pub_check_workspace
pub_check_tools
pub_load_token
pub_unset_proxies
pub_check_git_state "$RELEASE"

# -----------------------------------------------------------------------------
# 1. 临时 .npmrc 注入 token（不写入仓库）
# -----------------------------------------------------------------------------
log_step "步骤 1/7 — 配置 npm 认证"
LIB_NPMRC="$(pub_write_npmrc "$LIB_DIR")"
pub_gitignore_npmrc "$LIB_DIR"

# -----------------------------------------------------------------------------
# 2. 构建 + 质量门（lib 特有：svelte-package + svelte-check + vitest + docs check）
# -----------------------------------------------------------------------------
log_step "步骤 2/7 — 构建与质量门"

# 2.1 清理旧 dist
rm -rf "$LIB_DIR/dist"
log_ok "已清理旧 dist/"

# 2.2 svelte-package 构建
log_info "执行 pnpm --filter @persona-ui/lib build ..."
pnpm --filter @persona-ui/lib build 2>&1 | tail -5

# 2.3 类型检查（必须 0 error / 0 warning）
log_info "执行 svelte-check ..."
CHECK_OUT="$(pnpm --filter @persona-ui/lib check 2>&1)"
CHECK_EXIT=$?
echo "$CHECK_OUT" | tail -3
# 优先用退出码判断（最可靠），其次校验输出含 "0 ERRORS" 模式
if [ "$CHECK_EXIT" -ne 0 ]; then
  die $LINENO "类型检查未通过（svelte-check 退出码 $CHECK_EXIT）"
fi
if ! echo "$CHECK_OUT" | grep -qE "0 ERRORS? (AND )?0 WARNINGS?"; then
  die $LINENO "类型检查输出格式异常：未匹配到 '0 ERRORS 0 WARNINGS'"
fi
log_ok "lib 类型检查：0/0"

# 2.4 单元测试
log_info "执行单元测试 ..."
TEST_OUT="$(pnpm --filter @persona-ui/lib test:unit 2>&1)"
TEST_EXIT=$?
echo "$TEST_OUT" | tail -6
if [ "$TEST_EXIT" -ne 0 ]; then
  die $LINENO "单元测试未通过（vitest 退出码 $TEST_EXIT）"
fi
log_ok "lib 单元测试通过"

# 2.5 文档应用类型检查（验证 lib 仍可被消费方解析）
log_info "执行 docs 类型检查（验证导出兼容性）..."
pnpm --filter @persona-ui/docs exec svelte-kit sync 2>&1 | tail -2
DOCS_OUT="$(pnpm --filter @persona-ui/docs check 2>&1)"
DOCS_EXIT=$?
echo "$DOCS_OUT" | tail -3
if [ "$DOCS_EXIT" -ne 0 ]; then
  die $LINENO "docs 类型检查失败（svelte-check 退出码 $DOCS_EXIT）"
fi
if ! echo "$DOCS_OUT" | grep -qE "0 ERRORS? (AND )?0 WARNINGS?"; then
  die $LINENO "docs 类型检查输出格式异常：未匹配到 '0 ERRORS 0 WARNINGS'"
fi
log_ok "docs 类型检查：0/0（导出兼容性已确认）"

# -----------------------------------------------------------------------------
# 3. 确认 publishConfig.tag（不修改任何文件）
# -----------------------------------------------------------------------------
log_step "步骤 3/7 — 确认版本配置"

PKG_TAG="$(pub_read_pkg_tag "$PKG_JSON")"
log_info "package.json#version           = $VERSION"
log_info "package.json#publishConfig.tag = $PKG_TAG"
log_info "本脚本将使用的 TAG              = $TAG"

if [ "$PKG_TAG" != "$TAG" ]; then
  log_warn "publishConfig.tag=$PKG_TAG 与本次使用 TAG=$TAG 不一致"
  log_warn "（脚本不会自动改写 — 由你决定是否手动同步）"
fi

log_ok "版本号与标签已确认（package.json 为唯一来源）"

# -----------------------------------------------------------------------------
# 4. 干跑 + 文件清单预检（关键：防 LICENSE 类问题复发）
# -----------------------------------------------------------------------------
log_step "步骤 4/7 — 干跑检查（dry-run）"

# 4.0 预检：package.json#files 字段声明的所有路径都存在
pub_verify_files_manifest "$PKG_JSON"

# 4.1 dry-run 展示将发布的文件
DRY_OUT="$(cd "$LIB_DIR" && npm publish --access public --tag "$TAG" --dry-run 2>&1)"
echo "$DRY_OUT" | tail -15

TARBALL_SIZE="$(echo "$DRY_OUT" | grep -oE 'package size: [0-9.]+ kB' | head -1 || true)"
TOTAL_FILES="$(echo "$DRY_OUT" | grep -oE 'total files: [0-9]+' | head -1 || true)"
log_ok "Tarball 概览：${TARBALL_SIZE:-未知}  ${TOTAL_FILES:-未知}"

# 4.2 安全检查：必须包含 dist/index.js 且不包含 src/（防误打包源文件）
if echo "$DRY_OUT" | grep -qE "src/lib/.*\.svelte$"; then
  die $LINENO "干跑输出中发现 src/ 下的 .svelte 文件，请检查 files 白名单"
fi
if ! echo "$DRY_OUT" | grep -qE "dist/index\.js"; then
  die $LINENO "干跑输出中未发现 dist/index.js"
fi
log_ok "文件清单安全（仅含 dist/、README、LICENSE）"

# 如果是干跑模式（默认），到此处结束
if [ "$RELEASE" != "true" ]; then
  log_ok "干跑完成，未实际发布（要真发？请加 --release 参数）"
  cleanup_and_exit 0
fi

# -----------------------------------------------------------------------------
# 5. 实际发布
# -----------------------------------------------------------------------------
log_step "步骤 5/7 — 实际发布到 npm"

read -r -p "$(printf "%b即将发布 %b@%b 到 %b（tag=%b），确认？ (y/N)%b" \
  "$YELLOW" "$PKG_NAME" "$VERSION" "$NPM_REGISTRY" "$TAG" "$NC")" ans
[[ "$ans" =~ ^[Yy]$ ]] || { log_err "用户取消"; cleanup_and_exit 5; }

log_info "执行 npm publish --access public --tag $TAG ..."
pushd "$LIB_DIR" >/dev/null
npm publish --access public --tag "$TAG" 2>&1 | tail -10
popd >/dev/null
log_ok "发布命令完成"

# -----------------------------------------------------------------------------
# 6. 验证发布结果
# -----------------------------------------------------------------------------
log_step "步骤 6/7 — 验证发布"

# 6.1 查询 registry 元数据
log_info "查询 $NPM_REGISTRY$PKG_NAME ..."
META="$(curl -sS "$NPM_REGISTRY$PKG_NAME")"
DIST_TAG="$(echo "$META" | grep -oE "\"$TAG\":\"[0-9][^\"]*\"" | head -1)"
if [ -n "$DIST_TAG" ]; then
  log_ok "dist-tag [$TAG] = $DIST_TAG"
else
  die $LINENO "registry 中未找到 tag=$TAG 的条目"
fi

# 6.2 解包验证
pub_verify_tarball "$LIB_DIR" "$VERSION" "dist/index.js LICENSE"

# 6.3 临时项目安装 + 5 个 lib 子路径解析
pub_install_resolve_verify "$PKG_NAME" "$VERSION" \
  "$PKG_NAME $PKG_NAME/components/button/index.js $PKG_NAME/components/radio/index.js $PKG_NAME/components/toast/index.js $PKG_NAME/styles.css"

log_ok "安装 + 解析验证通过"

# -----------------------------------------------------------------------------
# 7. 清理 + 后续提示
# -----------------------------------------------------------------------------
log_step "步骤 7/7 — 清理临时文件"
log_step "发布成功 🎉"
log_info "下一步建议（脚本不会自动执行）："
cat <<EOF | sed 's/^/    /'
git add packages/lib/package.json packages/lib/dist
git commit -m "chore: release @persona-ui/lib@$VERSION"
git tag @persona-ui/lib@$VERSION
git push --tags
# 访问 https://www.npmjs.com/package/@persona-ui/lib 查看包页面
# 提示：如需发布主题包，请再跑：./scripts/publish-theme.sh --release
EOF

cleanup_and_exit 0
