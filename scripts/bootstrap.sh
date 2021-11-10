#! /usr/bin/env bash
CLEAN_SCRIPT_PATH="scripts/clean.sh"

yarn clean:modules
source "$CLEAN_SCRIPT_PATH"
yarn install:packages
yarn build:ts &
yarn build
[[ "$CI" = "true" ]] && yarn build:tokens

# wait for the background processes to finish before moving on to the next process/job in CI
wait
