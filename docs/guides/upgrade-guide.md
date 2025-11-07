---
title: Upgrade Guide for Version 11
category: Guides
order: 1
---

# Upgrade Guide for Version 12

## New theming system

TODO add details

## New icons

InstUI has switched to a new icon set, [Lucide](https://lucide.dev/icons/). We are still keeping some Instructure-specific icons, like product logos. We have a codemod that will help you migrate your code to the new icon set (see below).

## Removal of deprecated props/components/APIs

## API Changes

## Codemods

To ease the upgrade, we provide codemods that will automate most of the changes. Pay close attention to its output, it cannot refactor complex code! The codemod scripts can be run via the following commands:

```sh
---
type: code
---
npm install @instructure/ui-codemods@12
npx jscodeshift@17.3.0 -t node_modules/@instructure/ui-codemods/lib/instUIv12Codemods.ts <path> --usePrettier=false
```

where `<path>` is the path to the directory (and its subdirectories) to be transformed.

The codemods that will do the following:

- TODO add details
- TODO

Options for the codemod:

- `filename`: if specified then emitted warnings are written to this file.
- `usePrettier`: if `true` the transformed code will be run through Prettier. You can customize this through a [Prettier
  config file](https://prettier.io/docs/configuration.html)
