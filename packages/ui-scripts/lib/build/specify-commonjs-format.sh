#!/usr/bin/env bash

if [[ ! -f lib/package.json ]]; then
  mkdir -p lib
  echo '{"type":"commonjs"}' > lib/package.json
fi
