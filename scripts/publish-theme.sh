#!/usr/bin/env bash
# =============================================================================
#  Persona UI — 主题包发布脚本（@persona-ui/theme-apple + @persona-ui/theme-material）
# =============================================================================
#  作用：将 packages/theme-* 串行发布到 npmjs.com 官方源
#  作者：Persona UI contributors
#
#  用法：./scripts/publish-theme.sh [标签] [--release]
#        默认行为 = 干跑（不实际发布），需显式 --release 才执行真正发布。
#        标签默认根据版本号自动推断：
#          - 含 -  （预发布）→ tag = next
#          - 不含 -（稳定版）→ tag = latest
#
#  重要前置：
#    1. 同一版本的 @persona-ui/lib 必须**先**发布到 npm（theme peer 依赖 lib）
#    2. NPM_PUBLISH_TOKEN 必须在 .env 中设置
#    3. 仓库处于可发布状态
#
#  示例：
#    ./scripts/publish-theme.sh                   # 干跑所有主题包
#    ./scripts/publish-theme.sh --release         # 实跑
#    ./scripts/publish-theme.sh next --release    # 显式打 next tag 实跑
#
#  与 publish-lib.sh 的差异：
#    - 构建是 tsc + copy-theme-css（无 svelte-package）
#    - 无 svelte-check、无 vitest、无 docs check
#    - 解包必须包含 dist/index.js + dist/<id>.css + LICENSE
#    - 临时安装只验证 2 个子路径
#    - 实发前用 sed 改 peerDeps 的 workspace:* → ^<version>，trap 恢复
# =============================================================================

set -euo pipefail
# 严格模式：-e 任何命令非零退出立即终止 / -u 未定义变量报错 / -o pipefail 管道失败即失败

# -----------------------------------------------------------------------------
# Source 共享库
# -----------------------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./_publish-common.sh
source "$SCRIPT_DIR/_publish-common.sh"

# -----------------------------------------------------------------------------
# 主题包清单（name  dir  theme_id  css_basename）
# -----------------------------------------------------------------------------
THEME_PACKAGES=(
  "@persona-ui/theme-apple    packages/theme-apple    apple    apple.css"
  "@persona-ui/theme-material packages/theme-material material material.css"
)

# -----------------------------------------------------------------------------
# 清理：每个主题包都有自己的 .npmrc，记到数组统一清理
# -----------------------------------------------------------------------------
declare -a CLEANUP_NPMRCS=()
declare -a CLEANUP_PKGJSON_BAKS=()

cleanup_and_exit() {
  local code="${1:-0}"
  local f
  for f in "${CLEANUP_NPMRCS[@]:-/tmp/pui-__none__}"; do
    [ -f "$f" ] && { rm -f "$f"; log_ok "已删除 $f"; }
  done
  for f in "${CLEANUP_PKGJSON_BAKS[@]:-/tmp/pui-__none__}"; do
    # .bak 文件若还在（异常中断未恢复），强制恢复
    if [ -f "$f" ]; then
      local orig="${f%.bak}"
      mv -f "$f" "$orig" 2>/dev/null || rm -f "$f"
      log_warn "异常退出，已恢复 $orig"
    fi
  done
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
      sed -n '2,40p' "$0"
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
# 0. 一次性环境检查（所有主题包共享）
# -----------------------------------------------------------------------------
log_step "步骤 0/7 — 环境检查"
pub_check_workspace
pub_check_tools
pub_load_token
pub_unset_proxies
pub_check_git_state "$RELEASE"

# 一次性加入 .gitignore（所有主题包）
for entry in "${THEME_PACKAGES[@]}"; do
  read -r _ dir _ _ <<<"$entry"
  pub_gitignore_npmrc "$ROOT_DIR/$dir"
done

# -----------------------------------------------------------------------------
# 主循环：按 THEME_PACKAGES 数组顺序串行发布
# -----------------------------------------------------------------------------
PACK_INDEX=0
TOTAL_PACKS=${#THEME_PACKAGES[@]}

for entry in "${THEME_PACKAGES[@]}"; do
  PACK_INDEX=$((PACK_INDEX + 1))
  read -r PKG_NAME PKG_REL_DIR THEME_ID CSS_BASENAME <<<"$entry"
  PKG_DIR="$ROOT_DIR/$PKG_REL_DIR"
  PKG_JSON="$PKG_DIR/package.json"

  log_step "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  log_step "[$PACK_INDEX/$TOTAL_PACKS] $PKG_NAME"
  log_step "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  # -----------------------------------------------------------------------------
  # 1. 临时 .npmrc
  # -----------------------------------------------------------------------------
  PKG_NPMRC="$(pub_write_npmrc "$PKG_DIR")"
  CLEANUP_NPMRCS+=("$PKG_NPMRC")

  # -----------------------------------------------------------------------------
  # 2. 读版本 + 推断 tag
  # -----------------------------------------------------------------------------
  VERSION="$(pub_read_version "$PKG_JSON")"
  if [ -n "$TAG_OVERRIDE" ]; then
    TAG="$TAG_OVERRIDE"
  else
    TAG="$(pub_infer_tag "$VERSION")"
  fi
  PKG_TAG="$(pub_read_pkg_tag "$PKG_JSON")"

  log_info "包名：   $PKG_NAME"
  log_info "版本号： $VERSION"
  log_info "标签：   $TAG（publishConfig.tag=$PKG_TAG）"
  log_info "主题 id：$THEME_ID  CSS 入口：dist/$CSS_BASENAME"
  if [ "$PKG_TAG" != "$TAG" ]; then
    log_warn "publishConfig.tag=$PKG_TAG 与本次 TAG=$TAG 不一致"
  fi

  # -----------------------------------------------------------------------------
  # 3. 清理旧 dist + 构建 + 检查
  # -----------------------------------------------------------------------------
  rm -rf "$PKG_DIR/dist"
  log_ok "已清理旧 dist/"

  log_info "执行 pnpm --filter $PKG_NAME build ..."
  pnpm --filter "$PKG_NAME" build 2>&1 | tail -5

  log_info "执行 pnpm --filter $PKG_NAME check ..."
  CHECK_OUT="$(pnpm --filter "$PKG_NAME" check 2>&1)"
  echo "$CHECK_OUT" | tail -3
  if [ -z "$CHECK_OUT" ] || echo "$CHECK_OUT" | grep -qiE "error"; then
    # tsc --noEmit 失败时会输出 error TSxxxx
    die $LINENO "tsc --noEmit 检查失败"
  fi
  log_ok "类型检查通过"

  # -----------------------------------------------------------------------------
  # 4. 关键：CSS 入口必须存在（防 copy-theme-css 失败但 build "成功"）
  # -----------------------------------------------------------------------------
  if [ ! -f "$PKG_DIR/dist/$CSS_BASENAME" ]; then
    die $LINENO "构建后缺少 $PKG_DIR/dist/$CSS_BASENAME（copy-theme-css 是否失败？）"
  fi
  log_ok "CSS 入口：dist/$CSS_BASENAME"

  # -----------------------------------------------------------------------------
  # 5. 文件清单预检（防 LICENSE 类问题）
  # -----------------------------------------------------------------------------
  pub_verify_files_manifest "$PKG_JSON"

  # -----------------------------------------------------------------------------
  # 6. 干跑
  # -----------------------------------------------------------------------------
  log_step "干跑检查（dry-run）"
  DRY_OUT="$(cd "$PKG_DIR" && npm publish --access public --tag "$TAG" --dry-run 2>&1)"
  echo "$DRY_OUT" | tail -15

  TARBALL_SIZE="$(echo "$DRY_OUT" | grep -oE 'package size: [0-9.]+ kB' | head -1 || true)"
  TOTAL_FILES="$(echo "$DRY_OUT" | grep -oE 'total files: [0-9]+' | head -1 || true)"
  log_ok "Tarball 概览：${TARBALL_SIZE:-未知}  ${TOTAL_FILES:-未知}"

  # 安全检查：必须包含 dist/index.js + dist/<id>.css，禁止 src/ 源码
  if ! echo "$DRY_OUT" | grep -qE "dist/index\.js"; then
    die $LINENO "干跑输出中未发现 dist/index.js"
  fi
  if ! echo "$DRY_OUT" | grep -qE "dist/$CSS_BASENAME"; then
    die $LINENO "干跑输出中未发现 dist/$CSS_BASENAME"
  fi
  if echo "$DRY_OUT" | grep -qE "src/.*\.ts$"; then
    die $LINENO "干跑输出中发现 src/ 下的 .ts 文件，请检查 files 白名单"
  fi
  log_ok "文件清单安全（仅含 dist/、README、LICENSE）"

  # 干跑模式：早退
  if [ "$RELEASE" != "true" ]; then
    log_ok "干跑完成，未实际发布（要真发？请加 --release 参数）"
    continue
  fi

  # -----------------------------------------------------------------------------
  # 7. 实发前置：lib 必须已发布
  # -----------------------------------------------------------------------------
  log_step "前置校验：lib 已发布？"
  pub_check_lib_published "$VERSION"

  # -----------------------------------------------------------------------------
  # 8. 实发：备份 + 改写 peerDeps + npm publish
  # -----------------------------------------------------------------------------
  log_step "实际发布到 npm"

  read -r -p "$(printf "%b即将发布 %b@%b 到 %b（tag=%b），确认？ (y/N)%b" \
    "$YELLOW" "$PKG_NAME" "$VERSION" "$NPM_REGISTRY" "$TAG" "$NC")" ans
  [[ "$ans" =~ ^[Yy]$ ]] || { log_err "用户取消"; cleanup_and_exit 5; }

  # 备份 package.json
  PKG_JSON_BAK="$PKG_JSON.bak"
  cp "$PKG_JSON" "$PKG_JSON_BAK"
  CLEANUP_PKGJSON_BAKS+=("$PKG_JSON_BAK")

  # sed 改写 peerDependencies: workspace:* → ^<version>
  # pnpm 不会自动改写 workspace 协议，发到 npm 后用户会看到字面量
  if grep -q '"workspace:\*"' "$PKG_JSON"; then
    sed -i "s|\"workspace:\\*\"|\"^$VERSION\"|g" "$PKG_JSON"
    log_ok "已改写 peerDependencies: workspace:* → ^$VERSION（备份在 $PKG_JSON_BAK）"
  else
    log_info "peerDependencies 已是发布态字面量，无需改写"
  fi

  log_info "执行 npm publish --access public --tag $TAG ..."
  pushd "$PKG_DIR" >/dev/null
  npm publish --access public --tag "$TAG" 2>&1 | tail -10
  popd >/dev/null
  log_ok "发布命令完成"

  # 恢复 package.json
  mv "$PKG_JSON_BAK" "$PKG_JSON"
  log_ok "已恢复 $PKG_JSON"

  # -----------------------------------------------------------------------------
  # 9. 验证：registry 查询 + 解包 + 临时安装
  # -----------------------------------------------------------------------------
  log_step "验证发布结果"

  # 9.1 registry 元数据
  log_info "查询 $NPM_REGISTRY$PKG_NAME ..."
  META="$(curl -sS "$NPM_REGISTRY$PKG_NAME")"
  DIST_TAG="$(echo "$META" | grep -oE "\"$TAG\":\"[0-9][^\"]*\"" | head -1)"
  if [ -n "$DIST_TAG" ]; then
    log_ok "dist-tag [$TAG] = $DIST_TAG"
  else
    die $LINENO "registry 中未找到 tag=$TAG 的条目"
  fi

  # 9.2 解包验证
  pub_verify_tarball "$PKG_DIR" "$VERSION" "dist/index.js dist/$CSS_BASENAME LICENSE"

  # 9.3 临时安装 + 2 个子路径解析
  pub_install_resolve_verify "$PKG_NAME" "$VERSION" \
    "$PKG_NAME $PKG_NAME/$CSS_BASENAME"

  log_ok "$PKG_NAME 安装 + 解析验证通过"
done

# -----------------------------------------------------------------------------
# 收尾
# -----------------------------------------------------------------------------
log_step "全部主题包发布完成 🎉"
log_info "下一步建议（脚本不会自动执行）："
cat <<EOF | sed 's/^/    /'
git add packages/theme-*/package.json packages/theme-*/dist packages/theme-*/LICENSE
git commit -m "chore: release theme packages (v$VERSION)"
git push
# 访问 https://www.npmjs.com/package/@persona-ui/theme-apple 等页面查看
EOF

cleanup_and_exit 0
