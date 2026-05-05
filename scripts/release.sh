#!/usr/bin/env bash
# Cut a release.
#
# Usage:  ./scripts/release.sh <version>
# e.g.:   ./scripts/release.sh 0.1.0
#
# What it does:
#   1. Bumps every @mauvezero/* package.json to the given version.
#   2. Opens CHANGELOG.md in $EDITOR so you can rename `[Unreleased]` to
#      `[<version>] - <today>` and add a fresh `[Unreleased]` block.
#   3. Commits the changes and tags `v<version>`.
#   4. Prints the next steps (push).
#
# The GitHub Actions tag trigger (`v*`) picks up the push and creates a
# GitHub release using the matching CHANGELOG section.

set -euo pipefail

VERSION="${1:-}"
if [ -z "$VERSION" ]; then
  echo "Usage: $0 <version>  (e.g. $0 0.1.0)" >&2
  exit 2
fi

# Sanity: must be on master and clean.
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "master" ]; then
  echo "Refusing to release: not on master (currently on $BRANCH)." >&2
  echo "Run on master, or override by editing this script." >&2
  exit 1
fi
if [ -n "$(git status --porcelain)" ]; then
  echo "Refusing to release: working tree is dirty. Commit or stash first." >&2
  exit 1
fi

# 1. Bump versions across the publishables.
echo "Bumping @mauvezero/* to $VERSION ..."
pnpm --filter "@mauvezero/*" exec npm version "$VERSION" --no-git-tag-version --allow-same-version

# 2. CHANGELOG editing — human's job.
echo
echo "Open CHANGELOG.md and:"
echo "  - rename '## [Unreleased]' to '## [$VERSION] - $(date +%Y-%m-%d)'"
echo "  - add a fresh empty '## [Unreleased]' block at the top"
echo
read -rp "Press Enter to open \$EDITOR (${EDITOR:-vi}) ..."
${EDITOR:-vi} CHANGELOG.md

# 3. Commit + tag.
git add -A
git commit -m "Release v$VERSION"
git tag -a "v$VERSION" -m "Release v$VERSION"

# 4. Next steps.
cat <<EOF

Tagged v$VERSION on master. To publish, push:

    git push && git push --tags

The tag trigger fires on the push and the release workflow creates a
matching GitHub release using the CHANGELOG entry for v$VERSION.

EOF
