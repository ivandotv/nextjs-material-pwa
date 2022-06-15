#!/usr/bin/env zx

// info: https://github.com/google/zx

// install pnpm
await $`npm i -g pnpm@6`

// install dependencies
await $`pnpm i`

// automatically sign commits
await $`git config --global commit.gpgsign true`
