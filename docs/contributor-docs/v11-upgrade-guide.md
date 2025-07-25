---
title: Upgrade Guide for Version 11
category: Guides
order: 99
isWIP: true
---

# Upgrade Guide for Version 11 (WIP)

## Removal of deprecated props/components/APIs

### InstUISettingsProvider

[InstUISettingsProvider](/#InstUISettingsProvider)'s `as` prop was removed, it will always render as a `<span>` (note: it will only render anything to the DOM if you provide a value to the `dir` prop.). The provided codemod will remove this prop automatically (see below).

### Table

[Table](/#Table) is now using [TableContext](#TableContext) to pass down data to its child components, the following props are no longer passed down to their children (This should only affect you if you wild custom table rows or cells):

| Component | prop        | Substitute / Notes              |
| --------- | ----------- | ------------------------------- |
| `Row`     | `isStacked` | is now stored in `TableContext` |
| `Body`    | `isStacked` | is now stored in `TableContext` |
| `Body`    | `hover`     | is now stored in `TableContext` |
| `Body`    | `headers`   | is now stored in `TableContext` |

### Theming engine changes

| Deprecation                                | What to use instead?                                                                                  |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `canvas.use()`, `canvasHighContrast.use()` | Wrap all your application roots in `<InstUISettingsProvider>`                                         |
| `variables` field on theme objects         | Use `canvas.borders` instead of `canvas.variables.borders` (same for all othere fields)               |
| `@instructure/theme-registry` package      | This added the removed functions above. Wrap all your application roots in `<InstUISettingsProvider>` |

## API Changes

- `ui-dom-utils`/`getComputedStyle` can now return `undefined`: In previous versions sometimes returned an empty object which could lead to runtime exceptions when one tried to call methods of `CSSStyleDeclaration` on it.
- TO-DO: [TimeSelect](/#TimeSelect) as a controlled component can now return an '' instead of a valid date when its input field is cleared. In previous versions it always reverted to the last selected value when the input field was cleared and lost focus.

## Codemods

To ease the upgrade we provide codemods that will automate most of the changes. Pay close attention to its output, it cannot refactor complex code! The codemod scripts can be run via the following commands:

```sh
---
type: code
---
npm install @instructure/ui-codemods@11
npx jscodeshift@17.3.0 -t node_modules/@instructure/ui-codemods/lib/instUIv11Codemods.ts <path> --usePrettier=false
```

Options for the codemod:

- `filename`: if specified then emitted warnings are written to this file.
- `usePrettier`: if `true` the transformed code will be run through Prettier. You can customize this through a [Prettier
  config file](https://prettier.io/docs/configuration.html)
