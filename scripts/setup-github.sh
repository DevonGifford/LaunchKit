#!/usr/bin/env bash
#
# One-time GitHub setup for a LaunchKit repository — run by a maintainer, not
# by CI or a coding agent. Every step asks before it changes anything.
#
#   scripts/setup-github.sh [owner/repo]
#
# Requires: the GitHub CLI (`gh auth login`) with admin rights on the repo, and
# `main` already pushed. The repo defaults to the one `origin` points at.
#
# Steps (each optional):
#   1. Create `staging` from `main` (on GitHub — no local Git changes).
#   2. Enable Dependabot alerts and security updates.
#   3. Enable private vulnerability reporting (SECURITY.md relies on it).
#   4. Protect `main` and `staging`: pull requests only, CI must pass, no force
#      pushes or deletion. On private repositories this needs GitHub Pro, Team
#      or Enterprise; on the Free plan the step explains and skips.

set -euo pipefail

required_checks=('Quality' 'Browser tests' 'Build' 'End-to-end' 'Storybook')

repo="${1:-}"
if [[ -z "$repo" ]]; then
  # Works with SSH host aliases too (git@github_work:owner/repo.git).
  origin=$(git remote get-url origin)
  repo=$(sed -E 's#^(git@[^:]+:|https://[^/]+/|ssh://[^/]+/)##; s#\.git$##' <<<"$origin")
fi

confirm() {
  local answer
  read -r -p "$1 [y/N] " answer
  [[ "$answer" =~ ^[Yy]$ ]]
}

step() { printf '\n\033[1m%s\033[0m\n' "$1"; }

command -v gh >/dev/null || { echo "Install the GitHub CLI first: https://cli.github.com"; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "Run 'gh auth login' first."; exit 1; }
gh api "repos/$repo" --jq .full_name >/dev/null || { echo "Cannot access $repo with gh."; exit 1; }

echo "Repository: $repo (as $(gh api user --jq .login))"

step "1. staging branch"
if gh api "repos/$repo/branches/staging" >/dev/null 2>&1; then
  echo "staging already exists."
elif ! main_sha=$(gh api "repos/$repo/git/ref/heads/main" --jq .object.sha 2>/dev/null); then
  echo "main does not exist on GitHub yet — push the first commit, then run this again."
  exit 1
elif confirm "Create staging from main ($main_sha)?"; then
  gh api -X POST "repos/$repo/git/refs" -f ref=refs/heads/staging -f sha="$main_sha" >/dev/null
  echo "Created staging."
fi

step "2. Dependabot alerts and security updates"
if confirm "Enable them?"; then
  gh api -X PUT "repos/$repo/vulnerability-alerts" >/dev/null
  gh api -X PUT "repos/$repo/automated-security-fixes" >/dev/null
  echo "Enabled. Version updates are configured in .github/dependabot.yml."
fi

step "3. Private vulnerability reporting"
if confirm "Enable it?"; then
  gh api -X PUT "repos/$repo/private-vulnerability-reporting" >/dev/null
  echo "Enabled: Security tab → Report a vulnerability."
fi

step "4. Protect main and staging"
echo "Rules: changes via pull request only; these CI checks must pass:"
printf '  - %s\n' "${required_checks[@]}"
echo "No force pushes or deletion. No approving review required (solo maintainers can merge their own PRs)."
if confirm "Create the ruleset?"; then
  # Not "strict" (up to date with the base branch): after a release, main has a
  # merge commit staging lacks, and updating staging by push is blocked by the
  # pull-request rule. PR checks already run against the merged result.
  checks_json=$(printf '{"context":"%s"},' "${required_checks[@]}")
  ruleset=$(cat <<JSON
{
  "name": "Protect main and staging",
  "target": "branch",
  "enforcement": "active",
  "conditions": { "ref_name": { "include": ["refs/heads/main", "refs/heads/staging"], "exclude": [] } },
  "rules": [
    { "type": "deletion" },
    { "type": "non_fast_forward" },
    { "type": "pull_request", "parameters": {
        "required_approving_review_count": 0,
        "dismiss_stale_reviews_on_push": true,
        "require_code_owner_review": false,
        "require_last_push_approval": false,
        "required_review_thread_resolution": true } },
    { "type": "required_status_checks", "parameters": {
        "strict_required_status_checks_policy": false,
        "required_status_checks": [${checks_json%,}] } }
  ]
}
JSON
)
  if output=$(gh api -X POST "repos/$repo/rulesets" --input - <<<"$ruleset" 2>&1); then
    echo "Ruleset created."
  elif grep -qiE 'upgrade|403|not available|private' <<<"$output"; then
    echo "GitHub refused (plan limitation): $output"
    echo "Rulesets on private repositories need GitHub Pro, Team or Enterprise."
    echo "Either make the repository public or upgrade, then re-run this step."
  else
    echo "Failed: $output"
    exit 1
  fi
fi

step "Done"
echo "Next: read docs/releasing.md. Feature branches start from staging; promote staging to main with a merge commit."
