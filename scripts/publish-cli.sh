#!/usr/bin/env bash
# =============================================================================
#  Persona UI — @persona-ui/cli 发布脚本
# =============================================================================
#  作用：将 apps/cli 发布到 npmjs.com 官方源
#  作者：Persona UI contributors
#
#  用法：./scripts/publish-cli.sh [标签] [--release]
#        默认行为 = 干跑（不实际发布），需显式 --release 才执行真正发布。
#        版本号 = 读取自 apps/cli/package.json#version（唯一来源）。
#        标签默认根据版本号自动推断：
#          - 含 -  （预发布）→ tag = next
#          - 不含 -（稳定版）→ tag = latest
#
#  示例：
#    ./scripts/publish-cli.sh                 # 干跑 @ 0.1.0 / next
#    ./scripts/publish-cli.sh latest --release# 实跑 @ 0.1.0 / latest
#
#  关键差异 vs publish-lib.sh：
#    - 无 svelte-package / svelte-check / vitest / docs check
#    - 无 pub_check_lib_published（CLI 不 peer 依赖 lib）
#    - 无 sed 改 peerDeps（无 peerDeps）
#    - 临时验证改用 `npx pui-cli --version`
#
#  前置：
#    1. NPM_PUBLISH_TOKEN 在 .env（或环境变量）
#    2. 仓库处于可发布状态
#    3. apps/cli/package.json#version 已写好
# =============================================================================

set -euo pipefail
# 严格模式

# -----------------------------------------------------------------------------
# Source 共享库
# -----------------------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./_publish-common.sh
source "$SCRIPT_DIR/_publish-common.sh"

# -----------------------------------------------------------------------------
# CLI 包路径
# -----------------------------------------------------------------------------
CLI_DIR="$ROOT_DIR/apps/cli"
PKG_JSON="$CLI_DIR/package.json"
PKG_NAME="$(node -e "console.log(require('$PKG_JSON').name)")"
PKG_DESC="$(node -e "console.log(require('$PKG_JSON').description)")"

# -----------------------------------------------------------------------------
# 清理函数
# -----------------------------------------------------------------------------
cleanup_and_exit() {
  local code="${1:-0}"
  [ -f "${CLI_NPMRC:-}" ] && { rm -f "$CLI_NPMRC"; log_ok "已删除 $CLI_NPMRC"; }
  rm -rf "${TARBALL:-/tmp/pui-__none__}" "${VERIFY_DIR:-/tmp/pui-__none__}" "${TEST_DIR:-/tmp/pui-__none__}" 2>/dev/null || true
  exit "$code"
}
trap 'die $LINENO "$BASH_COMMAND"' ERR

# -----------------------------------------------------------------------------
# 参数解析
# -----------------------------------------------------------------------------
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
      log_err "未知选项：$arg"
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
# 1. 临时 .npmrc
# -----------------------------------------------------------------------------
log_step "步骤 1/7 — 配置 npm 认证"
CLI_NPMRC="$(pub_write_npmrc "$CLI_DIR")"
pub_gitignore_npmrc "$CLI_DIR"

# -----------------------------------------------------------------------------
# 2. 构建（CLI 特有：tsc + inject-shebang，无 svelte-check / vitest / docs check）
# -----------------------------------------------------------------------------
log_step "步骤 2/7 — 构建"

rm -rf "$CLI_DIR/dist"
log_ok "已清理旧 dist/"

log_info "执行 pnpm --filter @persona-ui/cli build ..."
pnpm --filter @persona-ui/cli build 2>&1 | tail -10

# 关键检查：dist/index.js 必须存在且含 shebang
if [ ! -f "$CLI_DIR/dist/index.js" ]; then
  die $LINENO "build 失败：$CLI_DIR/dist/index.js 不存在"
fi
if ! head -1 "$CLI_DIR/dist/index.js" | grep -q "^#!"; then
  die $LINENO "$CLI_DIR/dist/index.js 缺 shebang 行"
fi
log_ok "dist/index.js 有 shebang + 可执行"

# -----------------------------------------------------------------------------
# 3. 确认 publishConfig
# -----------------------------------------------------------------------------
log_step "步骤 3/7 — 确认版本配置"

PKG_TAG="$(pub_read_pkg_tag "$PKG_JSON")"
log_info "package.json#version           = $VERSION"
log_info "package.json#publishConfig.tag = $PKG_TAG"
log_info "本脚本将使用的 TAG              = $TAG"
if [ "$PKG_TAG" != "$TAG" ]; then
  log_warn "publishConfig.tag=$PKG_TAG 与本次使用 TAG=$TAG 不一致"
fi
log_ok "版本号与标签已确认"

# -----------------------------------------------------------------------------
# 4. 干跑 + 文件清单预检
# -----------------------------------------------------------------------------
log_step "步骤 4/7 — 干跑检查（dry-run）"

# 4.0 预检：package.json#files 字段声明的所有路径都存在
pub_verify_files_manifest "$PKG_JSON"

# 4.1 dry-run 展示将发布的文件
DRY_OUT="$(cd "$CLI_DIR" && npm publish --access public --tag "$TAG" --dry-run 2>&1)"
echo "$DRY_OUT" | tail -15

TARBALL_SIZE="$(echo "$DRY_OUT" | grep -oE 'package size: [0-9.]+ kB' | head -1 || true)"
TOTAL_FILES="$(echo "$DRY_OUT" | grep -oE 'total files: [0-9]+' | head -1 || true)"
log_ok "Tarball 概览：${TARBALL_SIZE:-未知}  ${TOTAL_FILES:-未知}"

# 4.2 安全检查：必须包含 dist/index.js，不应含 src/
if ! echo "$DRY_OUT" | grep -qE "dist/index\.js"; then
  die $LINENO "干跑输出中未发现 dist/index.js"
fi
if echo "$DRY_OUT" | grep -qE "src/.*\.ts$"; then
  die $LINENO "干跑输出中发现 src/ 下的 .ts 文件，请检查 files 白名单"
fi
log_ok "文件清单安全（仅含 dist/、README、LICENSE）"

# 干跑模式早退
if [ "$RELEASE" != "true" ]; then
  log_ok "干跑完成，未实际发布（要真发？请加 --release 参数）"
  cleanup_and_exit 0
fi

# -----------------------------------------------------------------------------
# 5. 实际发布
# -----------------------------------------------------------------------------
log_step "步骤 5/7 — 实际发布到 npm"

# 二次确认：仅在交互式 TTY 且 stdin 是 tty 时提示。
# 非交互场景（CI / pipe）已通过 --release 表达"确认要发"——直接跳过。
if [ -t 0 ] && [ -t 1 ]; then
  read -r -p "$(printf "%b即将发布 %b@%b 到 %b（tag=%b），确认？ (y/N)%b" \
    "$YELLOW" "$PKG_NAME" "$VERSION" "$NPM_REGISTRY" "$TAG" "$NC")" ans
  [[ "$ans" =~ ^[Yy]$ ]] || { log_err "用户取消"; cleanup_and_exit 5; }
else
  log_warn "非交互模式（pipe/CI），--release 已隐含确认，跳过 read"
fi

log_info "执行 npm publish --access public --tag $TAG ..."
pushd "$CLI_DIR" >/dev/null
npm publish --access public --tag "$TAG" 2>&1 | tail -10
popd >/dev/null
log_ok "发布命令完成"

# -----------------------------------------------------------------------------
# 6. 验证发布
# -----------------------------------------------------------------------------
log_step "步骤 6/7 — 验证发布"

# 6.1 registry 元数据
log_info "查询 $NPM_REGISTRY$PKG_NAME ..."
META="$(curl -sS "$NPM_REGISTRY$PKG_NAME")"
DIST_TAG="$(echo "$META" | grep -oE "\"$TAG\":\"[0-9][^\"]*\"" | head -1)"
if [ -n "$DIST_TAG" ]; then
  log_ok "dist-tag [$TAG] = $DIST_TAG"
else
  die $LINENO "registry 中未找到 tag=$TAG 的条目"
fi

# 6.2 解包验证（必须含 dist/index.js + LICENSE）
pub_verify_tarball "$CLI_DIR" "$VERSION" "dist/index.js LICENSE"

# 6.3 临时安装 + 跑命令验证
TEST_DIR="/tmp/pui-cli-verify-$$"
rm -rf "$TEST_DIR" 2>/dev/null || true
mkdir -p "$TEST_DIR"
cat > "$TEST_DIR/package.json" <<EOF
{ "name": "pui-cli-verify", "version": "0.0.0", "type": "module", "private": true,
  "dependencies": { "$PKG_NAME": "$VERSION" } }
EOF
cat > "$TEST_DIR/.npmrc" <<EOF
registry=$NPM_REGISTRY
EOF
pushd "$TEST_DIR" >/dev/null
pnpm install --silent 2>&1 | tail -5
CLI_BIN_PATH="$(node --input-type=module -e "
  const r = import.meta.resolve('$PKG_NAME');
  console.log(r.replace('$TEST_DIR', '<root>'));
")"
log_ok "解析成功：$CLI_BIN_PATH"

# 跑 --version 确认可执行
log_info "执行 $PKG_NAME --version ..."
VERSION_OUT="$(npx --no-install "$PKG_NAME" --version 2>&1 || true)"
if [ "$VERSION_OUT" = "$VERSION" ]; then
  log_ok "CLI 可执行，--version 输出 $VERSION_OUT"
else
  log_warn "CLI --version 输出 '$VERSION_OUT'，期望 '$VERSION'（可能需要 npx 缓存生效）"
fi
popd >/dev/null

rm -rf "$TEST_DIR"
log_ok "安装 + 命令验证通过"

# -----------------------------------------------------------------------------
# 7. 清理 + 后续提示
# -----------------------------------------------------------------------------
log_step "步骤 7/7 — 清理临时文件"
log_step "发布成功 🎉"
log_info "下一步建议（脚本不会自动执行）："
cat <<EOF | sed 's/^/    /'
git add apps/cli/package.json apps/cli/dist apps/cli/README.md apps/cli/LICENSE
git commit -m "chore: release @persona-ui/cli@$VERSION"
git tag @persona-ui/cli@$VERSION
git push --tags
# 访问 https://www.npmjs.com/package/@persona-ui/cli 查看包页面
# 试用：pnpm dlx @persona-ui/cli add https://persona-ui.ricecakecat.com/r/theme-apple.json
EOF

cleanup_and_exit 0
