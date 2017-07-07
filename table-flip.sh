#!/bin/bash -e

echo '(╯°□°）╯︵ ┻━┻'

echo "-- install node"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

nvm install

echo "-- installing dependencies"
rm -rf node_modules
npm cache clear --force
npm install

echo "-- clearing old build artifacts"
npm run clean
