#!/bin/sh
set -eu
cd "$(dirname "$0")/.."

# Use the desktop runtime if Node is not installed on the shell PATH.
if ! command -v node >/dev/null 2>&1; then
  for runtime_bin in /opt/homebrew/bin /usr/local/bin "$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin"; do
    if [ -x "$runtime_bin/node" ]; then
      PATH="$runtime_bin:$PATH"
      export PATH
      break
    fi
  done
fi

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is required. Install Node.js 22 or newer, then rerun this script." >&2
  exit 1
fi

if [ ! -f node_modules/astro/bin/astro.mjs ]; then
  echo "Project dependencies are missing. Run pnpm install --frozen-lockfile first." >&2
  echo "If pnpm is unavailable, install it with: npm install -g pnpm@11.19.0" >&2
  exit 1
fi

node node_modules/astro/bin/astro.mjs check
node node_modules/astro/bin/astro.mjs build
node scripts/check-build.mjs
