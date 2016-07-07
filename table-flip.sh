#!/bin/bash

echo '(╯°□°）╯︵ ┻━┻'

echo "-- install node"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && nvm install && nvm use

echo "-- installing dependencies"
rm -rf node_modules
npm cache clean
npm install
