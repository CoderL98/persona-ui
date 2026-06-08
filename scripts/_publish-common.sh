#!/usr/bin/env bash
# =============================================================================
#  Persona UI — npm 发布共享库（私有，供 publish-lib.sh / publish-theme.sh source）
# =============================================================================
#  此文件**不**可独立执行，仅作为函数库被 source。
#  下划线前缀 = 私有约定，IDE / 文件管理器通常会隐藏。
#
#  约束（违反会导致 caller 行为异常）：
#    1. 不写 set -euo pipefail —— caller 负责
#    2. 不写 trap —— 会覆盖 caller 的 trap，导致行号定位丢失
#    3. 不写 cleanup_and_exit —— 各 caller 清理路径不同（lib 单包，theme 多包数组）
#    4. 不做执行权限检查 —— 不是入口脚本
#
#  依赖：Bash 4+（declare -A / readarray / mapfile）
# =============================================================================

# -----------------------------------------------------------------------------
# 路径常量（每次 source 重新求值，不污染 caller 全局）
# -----------------------------------------------------------------------------
_PUB_COMMON_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"  # 本文件所在目录（绝对）
ROOT_DIR="$(cd "$_PUB_COMMON_DIR/.." && pwd)"                   # monorepo 根
NPM_REGISTRY="https://registry.npmjs.org/"                      # 官方 npm 源

# -----------------------------------------------------------------------------
# 颜色（TTY 检测，CI 环境回退到无色）
# -----------------------------------------------------------------------------
_pub_setup_colors() {
  if [ -t 1 ]; then
    RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[0;33m'; BLUE='\033[0;34m'; NC='\033[0m'
  else
    RED=''; GREEN=''; YELLOW=''; BLUE=''; NC=''
  fi
}
_pub_setup_colors  # source 时立即生效

# -----------------------------------------------------------------------------
# 日志函数
# -----------------------------------------------------------------------------
log_info()  { printf "%b %b\n" "$BLUE"  "ℹ" "$1" "$NC"; }
log_ok()    { printf "%b %b\n" "$GREEN" "✓" "$1" "$NC"; }
log_warn()  { printf "%b %b\n" "$YELLOW" "⚠" "$1" "$NC"; }
log_err()   { printf "%b %b\n" "$RED"    "✗" "$1" "$NC" >&2; }
log_step()  { printf "\n%b━━━ %s ━━━%b\n" "$BLUE" "$1" "$NC"; }

# 失败退出（caller 设 trap 'die $LINENO "$BASH_COMMAND"' 调用）
die() {
  log_err "第 $1 行失败：${2:-未知错误}"
  exit 1
}

# -----------------------------------------------------------------------------
# 环境 / 认证
# -----------------------------------------------------------------------------
pub_check_workspace() {
  if [ ! -f "$ROOT_DIR/pnpm-workspace.yaml" ]; then
    die "${BASH_LINENO[0]}" "未检测到 pnpm-workspace.yaml，请在 monorepo 根目录执行"
  fi
  log_ok "工作目录：$ROOT_DIR"
}

pub_check_tools() {
  command -v pnpm >/dev/null 2>&1 || { log_err "未找到 pnpm"; exit 3; }
  command -v npm  >/dev/null 2>&1 || { log_err "未找到 npm";  exit 3; }
  command -v node >/dev/null 2>&1 || { log_err "未找到 node"; exit 3; }
  log_ok "pnpm: $(pnpm --version)  node: $(node --version)  npm: $(npm --version)"
}

pub_load_token() {
  local env_file="$ROOT_DIR/.env"
  if [ -f "$env_file" ]; then
    set -a
    # shellcheck disable=SC1090
    source "$env_file"
    set +a
    log_ok "已从 $env_file 加载环境变量"
  fi
  if [ -z "${NPM_PUBLISH_TOKEN:-}" ]; then
    log_err "环境变量 NPM_PUBLISH_TOKEN 未设置"
    log_err "请先在 npmjs.com 创建 bypass-2fa 的 granular access token，然后："
    log_err "  在项目根目录创建 .env 文件，内容为："
    log_err "    NPM_PUBLISH_TOKEN=npm_xxxx"
    log_err "  或通过环境变量传入："
    log_err "    export NPM_PUBLISH_TOKEN=npm_xxxx"
    exit 3
  fi
  log_ok "NPM_PUBLISH_TOKEN 已设置（长度 ${#NPM_PUBLISH_TOKEN}）"
}

pub_unset_proxies() {
  unset http_proxy https_proxy HTTP_PROXY HTTPS_PROXY all_proxy ALL_PROXY 2>/dev/null || true
  log_ok "已解除系统代理"
}

pub_check_git_state() {
  local release="${1:-false}"
  if ! git -C "$ROOT_DIR" diff --quiet 2>/dev/null || \
     [ -n "$(git -C "$ROOT_DIR" status --porcelain 2>/dev/null)" ]; then
    log_warn "git 工作树有未提交改动（发布前请确认是否需要提交）："
    git -C "$ROOT_DIR" status --short | sed 's/^/    /'
    if [ "$release" = "true" ]; then
      # 仅在交互式 TTY 下 read 二次确认；非交互场景（CI / pipe）下 --release 已隐含确认
      if [ -t 0 ]; then
        read -r -p "是否继续？(y/N) " ans
        [[ "$ans" =~ ^[Yy]$ ]] || { log_err "已中止"; exit 4; }
      else
        log_warn "非交互模式（pipe/CI），--release 已隐含确认，跳过 read"
      fi
    fi
  fi
  log_ok "git 状态已确认"
}

# -----------------------------------------------------------------------------
# .npmrc 注入（caller 自行负责清理：trap cleanup_and_exit）
# -----------------------------------------------------------------------------
# 用法：local npmrc_path; npmrc_path=$(pub_write_npmrc "$pkg_dir")
pub_write_npmrc() {
  local pkg_dir="$1"
  local npmrc_path="$pkg_dir/.npmrc"
  cat > "$npmrc_path" <<EOF
registry=$NPM_REGISTRY
//registry.npmjs.org/:_authToken=$NPM_PUBLISH_TOKEN
EOF
  log_ok "已临时生成 $npmrc_path（脚本结束时自动删除）"
  echo "$npmrc_path"  # 返回路径给 caller 保存
}

pub_gitignore_npmrc() {
  local pkg_dir="$1"
  local npmrc_path="$pkg_dir/.npmrc"
  # 提取相对根的路径（如 "packages/lib/.npmrc"）
  local rel_path="${npmrc_path#"$ROOT_DIR/"}"
  local gitignore="$ROOT_DIR/.gitignore"
  touch "$gitignore"
  if ! grep -qxF "$rel_path" "$gitignore"; then
    echo "$rel_path" >> "$gitignore"
    log_ok "已将 $rel_path 加入 .gitignore"
  fi
}

# -----------------------------------------------------------------------------
# 版本 / 标签
# -----------------------------------------------------------------------------
# 用法：local version; version=$(pub_read_version "$pkg_json")
pub_read_version() {
  local pkg_json="$1"
  if [ ! -f "$pkg_json" ]; then
    die "${BASH_LINENO[0]}" "未找到 $pkg_json"
  fi
  local ver
  ver="$(node -e "console.log(require('$pkg_json').version)" 2>/dev/null || true)"
  if [ -z "$ver" ] || [ "$ver" = "undefined" ]; then
    die "${BASH_LINENO[0]}" "无法从 $pkg_json 读取到 version 字段"
  fi
  echo "$ver"
}

# 规则：含 '-' 视为预发布（next），否则稳定（latest）
pub_infer_tag() {
  local version="$1"
  if [[ "$version" == *-* ]]; then
    echo "next"
  else
    echo "latest"
  fi
}

pub_print_plan() {
  local name="$1" ver="$2" tag="$3" release="$4" registry="$5"
  local tag_note=""
  if [ -n "${TAG_OVERRIDE:-}" ]; then
    tag_note="（用户显式覆盖）"
  else
    tag_note="（从版本号自动推断）"
  fi
  log_step "发布计划"
  log_info "包名：   $name"
  log_info "版本号： $ver"
  log_info "标签：   $tag$tag_note"
  log_info "模式：   $([ "$release" = true ] && echo "🔴 实际发布（将向 npmjs.com 推送）" || echo "🟢 干跑（默认，不实际发布）")"
  log_info "源：     $registry"
  log_info ""
  log_warn "版本号来自 package.json，脚本不会自动修改它。"
  log_warn "如需调整：先手动编辑 package.json#version，再重跑本脚本。"
}

# 用法：local tag; tag=$(pub_read_pkg_tag "$pkg_json")
pub_read_pkg_tag() {
  local pkg_json="$1"
  node -e "console.log((require('$pkg_json').publishConfig || {}).tag || 'latest')" 2>/dev/null || echo "latest"
}

# -----------------------------------------------------------------------------
# 文件清单预检（关键：防"files 声明了但文件不存在"类问题复发）
# -----------------------------------------------------------------------------
# 用法：pub_verify_files_manifest "$pkg_json"
pub_verify_files_manifest() {
  local pkg_json="$1"
  local pkg_dir; pkg_dir="$(dirname "$pkg_json")"
  local missing=()
  local entry
  while IFS= read -r entry; do
    [ -z "$entry" ] && continue
    local path="$pkg_dir/$entry"
    if [ -e "$path" ] || [ -L "$path" ]; then
      log_ok "files 清单：$entry"
    else
      missing+=("$entry")
    fi
  done < <(node -e "console.log((require('$pkg_json').files||[]).join('\n'))")
  if [ ${#missing[@]} -gt 0 ]; then
    die "${BASH_LINENO[0]}" "package.json#files 声明了但文件不存在: ${missing[*]}"
  fi
}

# -----------------------------------------------------------------------------
# 解包验证：npm pack → 解压 → 校验 require_files 中每个路径存在
# -----------------------------------------------------------------------------
# 用法：pub_verify_tarball "$pkg_dir" "$version" "dist/index.js LICENSE"
pub_verify_tarball() {
  local pkg_dir="$1" version="$2" require_files="$3"
  local tarball="/tmp/pui-publish-verify-$$.tgz"
  local verify_dir="/tmp/pui-publish-verify-$$"
  # 从 package.json#name 拿 tgz 文件名（保留 scope 去掉前导 @）
  # 例：@persona-ui/cli → persona-ui-cli
  #      @persona-ui/lib → persona-ui-lib
  #      persona-ui-lib → persona-ui-lib（无 scope）
  local pkg_name; pkg_name="$(node -e "console.log(require('$pkg_dir/package.json').name.replace(/^@/, ''))")"

  # caller 应已设 trap 清理，但保险起见此处也清理一次
  rm -rf "$tarball" "$verify_dir" 2>/dev/null || true

  pushd "$pkg_dir" >/dev/null
  npm pack --pack-destination /tmp 2>&1 | tail -3
  if [ ! -f "/tmp/$pkg_name-$version.tgz" ]; then
    popd >/dev/null
    die "${BASH_LINENO[0]}" "npm pack 未生成 /tmp/$pkg_name-$version.tgz"
  fi
  mv "/tmp/$pkg_name-$version.tgz" "$tarball"
  mkdir -p "$verify_dir"
  tar -xzf "$tarball" -C "$verify_dir"
  popd >/dev/null

  local package_dir="$verify_dir/package"
  if [ ! -f "$package_dir/package.json" ]; then
    rm -rf "$tarball" "$verify_dir"
    die "${BASH_LINENO[0]}" "解包后缺少 package.json"
  fi

  local req missing=()
  for req in $require_files; do
    if [ -e "$package_dir/$req" ] || [ -L "$package_dir/$req" ]; then
      log_ok "解包验证：$req"
    else
      missing+=("$req")
    fi
  done
  if [ ${#missing[@]} -gt 0 ]; then
    rm -rf "$tarball" "$verify_dir"
    die "${BASH_LINENO[0]}" "解包后缺少必需文件: ${missing[*]}"
  fi

  # 清理（caller 的 trap 还会再清一次，幂等）
  rm -rf "$tarball" "$verify_dir"
}

# -----------------------------------------------------------------------------
# 临时项目安装 + 子路径解析验证
# -----------------------------------------------------------------------------
# 用法：pub_install_resolve_verify "$pkg_name" "$version" "$pkg_name $pkg_name/dist/index.js"
pub_install_resolve_verify() {
  local pkg_name="$1" version="$2" resolve_paths="$3"
  local test_dir="/tmp/pui-install-verify-$$"

  rm -rf "$test_dir" 2>/dev/null || true
  mkdir -p "$test_dir"
  cat > "$test_dir/package.json" <<EOF
{ "name": "pui-verify", "version": "0.0.0", "type": "module", "private": true,
  "dependencies": { "$pkg_name": "$version" } }
EOF
  cat > "$test_dir/.npmrc" <<EOF
registry=$NPM_REGISTRY
EOF

  pushd "$test_dir" >/dev/null
  pnpm install --silent 2>&1 | tail -5
  # 拼 node -e 的 import 列表
  local paths_js=""
  local p
  for p in $resolve_paths; do
    paths_js="${paths_js}    '$p',\n"
  done
  node --input-type=module -e "
    const checks = [${paths_js}    ];
    for (const c of checks) {
      const r = import.meta.resolve(c);
      console.log('  ✓', c, '→', r.replace('$test_dir', '<root>'));
    }
  " 2>&1
  popd >/dev/null

  rm -rf "$test_dir"
}

# -----------------------------------------------------------------------------
# lib 是否已发布（主题包发布前置条件：theme peer 依赖 lib）
# -----------------------------------------------------------------------------
# 用法：pub_check_lib_published "$lib_version"
pub_check_lib_published() {
  local lib_version="$1"
  local url="$NPM_REGISTRY@persona-ui/lib/$lib_version"
  local code
  code="$(curl -sS -o /dev/null -w '%{http_code}' "$url" 2>/dev/null || echo "000")"
  if [ "$code" != "200" ]; then
    die "${BASH_LINENO[0]}" "@persona-ui/lib@$lib_version 未在 registry 上发布（HTTP $code）"
  fi
  log_ok "@persona-ui/lib@$lib_version 已在 registry"
}
