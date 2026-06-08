#!/usr/bin/env bash
# =============================================================================
#  scope-guard.sh — 防止外部 PR 抢占 @persona-ui scope 创建新包
# =============================================================================
#  触发场景：PR 修改了 packages/*/package.json 且 name 以 @persona-ui/theme-* 开头
#  规则：@persona-ui scope 只能由仓库所有者（PR_AUTHOR == REPO_OWNER）使用
#       其他用户必须改用 @<your-scope>/theme-* 命名
#
#  用法：环境变量 PR_AUTHOR + REPO_OWNER + GITHUB_BASE_REF
#  注意：--diff-filter=A 限制为"新增"文件，避免重命名误报
# =============================================================================

set -euo pipefail

# -----------------------------------------------------------------------------
# 环境变量兜底（本地调试时可能缺）
# -----------------------------------------------------------------------------
GITHUB_BASE_REF="${GITHUB_BASE_REF:-main}"
PR_AUTHOR="${PR_AUTHOR:-local-dev}"
REPO_OWNER="${REPO_OWNER:-rcc}"

# -----------------------------------------------------------------------------
# 检测：PR 中"新增"的 package.json
# -----------------------------------------------------------------------------
CHANGED=$(git diff --name-only --diff-filter=A \
  "origin/${GITHUB_BASE_REF}...HEAD" -- 'packages/*/package.json' 2>/dev/null || true)

if [ -z "$CHANGED" ]; then
  echo "scope-guard: no new package.json detected, skip"
  exit 0
fi

# -----------------------------------------------------------------------------
# 逐个校验
# -----------------------------------------------------------------------------
VIOLATIONS=0
for f in $CHANGED; do
  # 用 node 读 name（比 jq 通用，所有 monorepo 必有 node）
  name="$(node -e "console.log(require('./$f').name)" 2>/dev/null || true)"
  if [ -z "$name" ]; then
    continue   # 读不出来当没看见（可能是 partial diff 上下文）
  fi
  if [[ "$name" == @persona-ui/theme-* ]]; then
    if [[ "$PR_AUTHOR" != "$REPO_OWNER" ]]; then
      echo "::error file=$f::PR by '$PR_AUTHOR' cannot add package '$name' (@persona-ui scope is reserved for repo owner '$REPO_OWNER')"
      VIOLATIONS=$((VIOLATIONS + 1))
    fi
  fi
done

if [ "$VIOLATIONS" -gt 0 ]; then
  echo ""
  echo "::error::$VIOLATIONS scope violation(s) found"
  echo ""
  echo "如何修复："
  echo "  把包名改为 @<your-scope>/theme-<id> 形式（例：@acme-ui/theme-corp）"
  echo "  详见 packages/lib/dist/themes/README.md §4 Fork 指南"
  exit 1
fi

echo "scope-guard: OK"
