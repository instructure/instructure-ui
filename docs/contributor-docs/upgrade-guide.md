---
title: Upgrade Guide for Version 11
category: Guides
order: 7
---

# Upgrade Guide for Version 11

## InstUI and React

> React 16 support was dropped with InstUI 11. Please upgrade to React 17 or later before upgrading to InstUI v11!

### React 19

InstUI v11 added support for React 19. But upgrading to React 19 might cause issues because InstUI needs to access the native DOM in some cases and React introduced a breaking change here by [removing `ReactDOM.findDOMNode()`](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#removed-reactdom-finddomnode). If you are upgrading to React 19, you will need to add `ref`s to some of your custom components that use InstUI utilities, see [this guide](/#accessing-the-dom). We suggest to check your code thoroughly for errors, especially places where you use your own components as some kind of popovers or its triggers (e.g. Menu, Popover, Tooltip, Drilldown,..)

If you are staying on React 17 or 18 you might just see error messages like (`Error: ${elName} doesn't have "ref" property.`), but your code should work the same as with InstUI v10.

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

### Removal of the `deprecated`, `experimental`, `hack` decorators

We have removed these utilities from the `ui-react-utils` package because we are phasing out parts from the codebase that use decorators.

If you want to still use these we suggest to copy-paste their code from the latest v10 codebase (Note: they only work for class-based components!).

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
