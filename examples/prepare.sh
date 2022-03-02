#!/bin/bash

set -e
TMP_FILE=$(mktemp)
echo "Retrieving Snapshot version..."
#1. get the latest snapshot version
SNAPSHOT_VERSION=$(npm view @instructure/ui --json | jq '."dist-tags".snapshot')
echo "Snapshot version is: $SNAPSHOT_VERSION"

#2. override package json with the new snapshot in a temp file
jq ".dependencies |= setpath([\"@instructure/ui\"]; $SNAPSHOT_VERSION)" <package.json >"$TMP_FILE"

#3. copy over the tempfile content to override it
cat "$TMP_FILE" >package.json
rm -f "$TMP_FILE"
