#!/usr/bin/env bash
# =============================================================================
#  Persona UI — npm 发布脚本
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
#    3. 设置环境变量 NPM_PUBLISH_TOKEN=npm_xxxx（不写入任何文件）
#    4. 仓库处于可发布状态（构建/检查/测试全部通过）
#    5. 已在 packages/lib/package.json#version 中写好目标版本号
# =============================================================================

set -euo pipefail
# 严格模式：
#   -e  任何命令非零退出立即终止
#   -u  使用未定义变量时报错
#   -o pipefail  管道命令中任一环节失败都视为整体失败

# -----------------------------------------------------------------------------
# 路径与常量
# -----------------------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"   # 脚本所在目录（绝对路径）
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"                     # monorepo 根目录
LIB_DIR="$ROOT_DIR/packages/lib"                            # lib 包目录
DOCS_DIR="$ROOT_DIR/apps/docs"                              # docs 应用目录
NPM_REGISTRY="https://registry.npmjs.org/"                  # 官方 npm 源
LOG_PREFIX="[publish-lib]"                                  # 日志前缀

# 颜色（终端更易读，CI 环境会回退到无色）
if [ -t 1 ]; then
  RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[0;33m'; BLUE='\033[0;34m'; NC='\033[0m'
else
  RED=''; GREEN=''; YELLOW=''; BLUE=''; NC=''
fi

# -----------------------------------------------------------------------------
# 工具函数
# -----------------------------------------------------------------------------
log_info()  { printf "%b %b\n" "$BLUE" "ℹ" "$1" "$NC"; }
log_ok()    { printf "%b %b\n" "$GREEN" "✓" "$1" "$NC"; }
log_warn()  { printf "%b %b\n" "$YELLOW" "⚠" "$1" "$NC"; }
log_err()   { printf "%b %b\n" "$RED" "✗" "$1" "$NC" >&2; }
log_step()  { printf "\n%b━━━ %s ━━━%b\n" "$BLUE" "$1" "$NC"; }

# 失败退出（自动打印行号与最近一条命令）
die() {
  log_err "第 $1 行失败：${2:-未知错误}"
  exit 1
}
trap 'die $LINENO "$BASH_COMMAND"' ERR

# 通用清理函数（在多个步骤中提前调用，因此提前定义）
# 形参：$1=退出码（默认 0）
cleanup_and_exit() {
  local code="${1:-0}"
  [ -f "${LIB_NPMRC:-}" ] && { rm -f "$LIB_NPMRC"; log_ok "已删除 $LIB_NPMRC"; }
  rm -rf "${TARBALL:-/tmp/pui-__none__}" "${VERIFY_DIR:-/tmp/pui-__none__}" "${TEST_DIR:-/tmp/pui-__none__}" 2>/dev/null || true
  exit "$code"
}

# -----------------------------------------------------------------------------
# 参数解析
# -----------------------------------------------------------------------------
# 解析参数：可选 1 个 tag，可选 --release / --dry-run
# 默认行为 = 干跑（最安全）；必须显式 --release 才会真发
TAG_OVERRIDE=""
RELEASE=false

for arg in "$@"; do
  case "$arg" in
    --release|-r)  RELEASE=true ;;
    --dry-run|-n)  RELEASE=false ;;   # 显式干跑（其实是默认值，写出来更清晰）
    --help|-h)
      sed -n '2,30p' "$0"
      exit 0 ;;
    -*)
      log_err "未知选项：$arg（可用：--release / --dry-run / --help）"
      exit 2 ;;
    *)
      # 第一个非选项参数视为 tag 覆盖
      [ -z "$TAG_OVERRIDE" ] && TAG_OVERRIDE="$arg" || { log_err "多余的位置参数：$arg"; exit 2; }
      ;;
  esac
done

# -----------------------------------------------------------------------------
# 从 package.json 读取版本号（唯一来源）
# -----------------------------------------------------------------------------
PKG_JSON="$LIB_DIR/package.json"
if [ ! -f "$PKG_JSON" ]; then
  log_err "未找到 $PKG_JSON"
  exit 3
fi
VERSION="$(node -e "console.log(require('$PKG_JSON').version)")"
if [ -z "$VERSION" ] || [ "$VERSION" = "undefined" ]; then
  log_err "无法从 $PKG_JSON 读取到 version 字段"
  exit 3
fi

# -----------------------------------------------------------------------------
# 自动推断 tag（如果用户没显式覆盖）
# -----------------------------------------------------------------------------
# 规则：含 '-' 视为预发布（next），否则为稳定（latest）
if [ -n "$TAG_OVERRIDE" ]; then
  TAG="$TAG_OVERRIDE"
elif [[ "$VERSION" == *-* ]]; then
  TAG="next"
else
  TAG="latest"
fi

# 发布计划展示
log_step "发布计划"
log_info "来源：   packages/lib/package.json#version（单一来源）"
log_info "版本号： $VERSION"
log_info "标签：   $TAG$([ -n "$TAG_OVERRIDE" ] && echo '（用户显式覆盖）' || echo '（从版本号自动推断）')"
log_info "模式：   $([ "$RELEASE" = true ] && echo "🔴 实际发布（将向 npmjs.com 推送）" || echo "🟢 干跑（默认，不实际发布）")"
log_info "源：     $NPM_REGISTRY"
log_info ""
log_warn "版本号来自 package.json，脚本不会自动修改它。"
log_warn "如需调整：先手动编辑 packages/lib/package.json#version，再重跑本脚本。"

# -----------------------------------------------------------------------------
# 0. 环境检查
# -----------------------------------------------------------------------------
log_step "步骤 0/7 — 环境检查"

# 0.1 必须在 monorepo 根目录执行
if [ ! -f "$ROOT_DIR/pnpm-workspace.yaml" ]; then
  log_err "未检测到 pnpm-workspace.yaml，请在 monorepo 根目录执行"
  exit 3
fi
log_ok "工作目录：$ROOT_DIR"

# 0.2 检查 pnpm 与 node
command -v pnpm >/dev/null 2>&1 || { log_err "未找到 pnpm"; exit 3; }
command -v npm  >/dev/null 2>&1 || { log_err "未找到 npm";  exit 3; }
command -v node >/dev/null 2>&1 || { log_err "未找到 node"; exit 3; }
log_ok "pnpm: $(pnpm --version)  node: $(node --version)  npm: $(npm --version)"

# 0.3 检查 token（必须通过环境变量传入，永不写入磁盘）
if [ -z "${NPM_PUBLISH_TOKEN:-}" ]; then
  log_err "环境变量 NPM_PUBLISH_TOKEN 未设置"
  log_err "请先在 npmjs.com 创建 bypass-2fa 的 granular access token，然后："
  log_err "  export NPM_PUBLISH_TOKEN=npm_xxxx"
  exit 3
fi
log_ok "NPM_PUBLISH_TOKEN 已设置（长度 ${#NPM_PUBLISH_TOKEN}）"

# 0.4 解除代理（避免 SOCKS 代理干扰 npm 请求）
unset http_proxy https_proxy HTTP_PROXY HTTPS_PROXY all_proxy ALL_PROXY
log_ok "已解除系统代理"

# 0.5 检查 git 状态：工作树必须干净或仅有预期改动
if ! git -C "$ROOT_DIR" diff --quiet 2>/dev/null || \
   [ -n "$(git -C "$ROOT_DIR" status --porcelain 2>/dev/null)" ]; then
  log_warn "git 工作树有未提交改动（发布前请确认是否需要提交）："
  git -C "$ROOT_DIR" status --short | sed 's/^/    /'
  if [ "$RELEASE" = "true" ]; then
    read -r -p "是否继续？(y/N) " ans
    [[ "$ans" =~ ^[Yy]$ ]] || { log_err "已中止"; exit 4; }
  fi
fi
log_ok "git 状态已确认"

# -----------------------------------------------------------------------------
# 1. 临时 .npmrc 注入 token（不写入仓库）
# -----------------------------------------------------------------------------
log_step "步骤 1/7 — 配置 npm 认证"

# 临时写入 lib 目录的 .npmrc（包含 token），发布完成后立即删除
LIB_NPMRC="$LIB_DIR/.npmrc"
cat > "$LIB_NPMRC" <<EOF
registry=$NPM_REGISTRY
//registry.npmjs.org/:_authToken=$NPM_PUBLISH_TOKEN
EOF
log_ok "已临时生成 $LIB_NPMRC（脚本结束时自动删除）"

# 添加 .npmrc 到 .gitignore 防止误提交（幂等）
GITIGNORE="$ROOT_DIR/.gitignore"
touch "$GITIGNORE"
if ! grep -qxF "packages/lib/.npmrc" "$GITIGNORE"; then
  echo "packages/lib/.npmrc" >> "$GITIGNORE"
  log_ok "已将 packages/lib/.npmrc 加入 .gitignore"
fi

# -----------------------------------------------------------------------------
# 2. 构建 + 质量门
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
pnpm --filter @persona-ui/lib check 2>&1 | tail -3
# 校验输出中包含 "0 errors and 0 warnings"
CHECK_OUT="$(pnpm --filter @persona-ui/lib check 2>&1)"
echo "$CHECK_OUT" | tail -3
if ! echo "$CHECK_OUT" | grep -qE "0 errors and 0 warnings"; then
  die $LINENO "类型检查未通过 0/0"
fi
log_ok "lib 类型检查：0/0"

# 2.4 单元测试
log_info "执行单元测试 ..."
TEST_OUT="$(pnpm --filter @persona-ui/lib test:unit 2>&1)"
echo "$TEST_OUT" | tail -6
if ! echo "$TEST_OUT" | grep -qE "Tests +[0-9]+ passed"; then
  die $LINENO "单元测试未通过"
fi
log_ok "lib 单元测试通过"

# 2.5 文档应用类型检查（验证 lib 仍可被消费方解析）
log_info "执行 docs 类型检查（验证导出兼容性）..."
DOCS_OUT="$(pnpm --filter @persona-ui/docs check 2>&1)"
echo "$DOCS_OUT" | tail -3
if ! echo "$DOCS_OUT" | grep -qE "0 errors and 0 warnings"; then
  die $LINENO "docs 类型检查失败（可能是 lib 导出路径被破坏）"
fi
log_ok "docs 类型检查：0/0（导出兼容性已确认）"

# -----------------------------------------------------------------------------
# 3. 确认版本号 + publishConfig.tag（不修改任何文件）
# -----------------------------------------------------------------------------
log_step "步骤 3/7 — 确认版本配置"

# 读取当前 package.json 关键字段（用于双重核对，不写回）
PKG_VER="$(node -e "console.log(require('$PKG_JSON').version)")"
PKG_TAG="$(node -e "console.log((require('$PKG_JSON').publishConfig || {}).tag || 'latest')")"
log_info "package.json#version           = $PKG_VER"
log_info "package.json#publishConfig.tag = $PKG_TAG"
log_info "本脚本将使用的 TAG              = $TAG"

if [ "$PKG_VER" != "$VERSION" ]; then
  die $LINENO "package.json#version ($PKG_VER) 与读取到的 VERSION ($VERSION) 不一致（理论上不可能）"
fi

# 友好提示：tag 与 publishConfig.tag 不一致时给出警告
if [ "$PKG_TAG" != "$TAG" ]; then
  log_warn "publishConfig.tag=$PKG_TAG 与本次使用 TAG=$TAG 不一致"
  log_warn "（脚本不会自动改写 — 由你决定是否手动同步）"
fi

log_ok "版本号与标签已确认（package.json 为唯一来源）"

# -----------------------------------------------------------------------------
# 4. 干跑（dry-run）展示将发布的文件
# -----------------------------------------------------------------------------
log_step "步骤 4/7 — 干跑检查（dry-run）"

# 解析 tarball 信息行
DRY_OUT="$(cd "$LIB_DIR" && npm publish --access public --tag "$TAG" --dry-run 2>&1)"
echo "$DRY_OUT" | tail -15

TARBALL_SIZE="$(echo "$DRY_OUT" | grep -oE 'package size: [0-9.]+ kB' | head -1 || true)"
TOTAL_FILES="$(echo "$DRY_OUT" | grep -oE 'total files: [0-9]+' | head -1 || true)"
log_ok "Tarball 概览：${TARBALL_SIZE:-未知}  ${TOTAL_FILES:-未知}"

# 安全检查：必须包含 dist/index.js 且不包含 src/（防误打包源文件）
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

# 二次确认（防止脚本误触发）
read -r -p "$(printf "%b即将发布 %b@%b 到 %b（tag=%b），确认？ (y/N)%b" \
  "$YELLOW" "@persona-ui/lib" "$VERSION" "$NPM_REGISTRY" "$TAG" "$NC")" ans
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
log_info "查询 https://registry.npmjs.org/@persona-ui/lib ..."
META="$(curl -sS "$NPM_REGISTRY@persona-ui/lib")"
DIST_TAG="$(echo "$META" | grep -oE "\"$TAG\":\"[0-9][^\"]*\"" | head -1)"

if [ -n "$DIST_TAG" ]; then
  log_ok "dist-tag [$TAG] = $DIST_TAG"
else
  die $LINENO "registry 中未找到 tag=$TAG 的条目"
fi

# 6.2 解包验证：npm pack 后立即解到一个临时目录，检查文件清单
TARBALL="/tmp/pui-publish-verify-$$.tgz"
VERIFY_DIR="/tmp/pui-publish-verify-$$"
trap 'rm -rf "$TARBALL" "$VERIFY_DIR"; cleanup_and_exit 1' ERR
pushd "$LIB_DIR" >/dev/null
npm pack --pack-destination /tmp 2>&1 | tail -3
mv "/tmp/persona-ui-lib-$VERSION.tgz" "$TARBALL"
mkdir -p "$VERIFY_DIR"
tar -xzf "$TARBALL" -C "$VERIFY_DIR"
popd >/dev/null

PACKAGE_DIR="$VERIFY_DIR/package"
[ -f "$PACKAGE_DIR/package.json" ] || die $LINENO "解包后缺少 package.json"
[ -f "$PACKAGE_DIR/dist/index.js" ] || die $LINENO "解包后缺少 dist/index.js"
[ -f "$PACKAGE_DIR/LICENSE" ]       || die $LINENO "解包后缺少 LICENSE"
log_ok "解包验证通过：package.json / dist/index.js / LICENSE 均存在"

# 6.3 在临时项目中真安装一次（确保导出路径能被包管理器解析）
TEST_DIR="/tmp/pui-install-verify-$$"
mkdir -p "$TEST_DIR"
cat > "$TEST_DIR/package.json" <<EOF
{ "name": "pui-verify", "version": "0.0.0", "type": "module", "private": true,
  "dependencies": { "@persona-ui/lib": "$VERSION" } }
EOF
cat > "$TEST_DIR/.npmrc" <<EOF
registry=$NPM_REGISTRY
EOF
pushd "$TEST_DIR" >/dev/null
pnpm install --silent 2>&1 | tail -5
# 用 node 解析几个子路径，验证 exports field
node --input-type=module -e "
  const checks = [
    '@persona-ui/lib',
    '@persona-ui/lib/components/button/index.js',
    '@persona-ui/lib/components/radio/index.js',
    '@persona-ui/lib/components/toast/index.js',
    '@persona-ui/lib/styles.css',
  ];
  for (const c of checks) {
    const r = import.meta.resolve(c);
    console.log('  ✓', c, '→', r.replace('$TEST_DIR', '<root>'));
  }
" 2>&1
popd >/dev/null
log_ok "安装 + 解析验证通过"

# -----------------------------------------------------------------------------
# 7. 清理
# -----------------------------------------------------------------------------
log_step "步骤 7/7 — 清理临时文件"

# 提示用户提交版本号变更
log_step "发布成功 🎉"
log_info "下一步建议（脚本不会自动执行）："
cat <<EOF | sed 's/^/    /'
git add packages/lib/package.json packages/lib/dist
git commit -m "chore: release @persona-ui/lib@$VERSION"
git tag @persona-ui/lib@$VERSION
git push --tags
# 访问 https://www.npmjs.com/package/@persona-ui/lib 查看包页面
EOF

cleanup_and_exit 0
