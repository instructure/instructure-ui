#!/bin/bash

# TODO: rewrite this to JavaScript...
set -e
TMP_FILE=$(mktemp)
echo "Retrieving latest snapshot version..."
# get the latest snapshot version
SNAPSHOT_VERSION=$(npm view @instructure/ui --json | jq '."dist-tags".snapshot')
echo "Snapshot version is: $SNAPSHOT_VERSION"

# override package json with the snapshot version
PKG_JSON=$(jq ".dependencies |= setpath([\"@instructure/ui\"]; $SNAPSHOT_VERSION)" <package.json)
jq ".devDependencies |= setpath([\"@instructure/browserslist-config-instui\"]; $SNAPSHOT_VERSION)" <<<"$PKG_JSON" >"$TMP_FILE"

# copy over the temp file to the package.json
cat "$TMP_FILE" >package.json
rm -f "$TMP_FILE"
