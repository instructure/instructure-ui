#! /usr/bin/env bash

# don't delete the `lib` directories from these packages
NODE_PACKAGES=(
  "ui-icons-build" "ui-eslint-config" "ui-babel-preset"
  "ui-upgrade-scripts" "ui-token-scripts" "ui-codemods"
  "ui-karma-config" "ui-template-scripts" "ui-stylelint-config"
  "ui-scripts" "command-utils" "config-loader"
  "cz-lerna-changelog" "eslint-plugin-instructure-ui" "instui-cli" "pkg-utils"
  "babel-plugin-transform-imports"
)
count=0

for dir in packages/*; do
  package_name="${dir##*/}"
  # only in non node packages we must delete the /es/ and /lib/ directories
  if [[ ! " ${NODE_PACKAGES[*]} " =~ ${package_name} ]]; then
    rm -rf "$dir/es" "$dir/lib"
  fi
  rm -rf "$dir/tsconfig.build.tsbuildinfo" "$dir/types" "$dir/__build__"
  ((count++))
done

echo "Performed clean in ${count} packages."
