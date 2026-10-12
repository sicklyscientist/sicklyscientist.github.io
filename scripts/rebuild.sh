#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
pnpm check
pnpm build
pnpm test:build
