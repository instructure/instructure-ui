---
title: Upgrade Guide for Version 11
category: Guides
order: 7
---

# Upgrade Guide for Version 11

## InstUI and React

> React 16 support was dropped with InstUI 11. Please upgrade to React 18 before upgrading to InstUI v11!

### React 19

InstUI v11 added support for React 19. But upgrading to React 19 might cause issues because InstUI needs to access the native DOM in some cases and React introduced a breaking change here by [removing `ReactDOM.findDOMNode()`](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#removed-reactdom-finddomnode). If you are upgrading to React 19, you will need to add `ref`s to some of your custom components that use InstUI utilities, see [this guide](#accessing-the-dom). We suggest to check your code thoroughly for errors, especially places where you use your own components as some kind of popovers or its triggers (e.g. Menu, Popover, Tooltip, Drilldown,..).

If you are using React 18 you might just see error messages like (`Error: ${elName} doesn't have "ref" property.`), but your code should work the same as with InstUI v10.

---

## PropTypes Support Dropped

With React 19, support for **PropTypes was dropped** from the core library. While it's still possible to use them with third-party libraries, InstUI has decided to no longer support them based on user feedback.

**Tip:** To see how the removal of `propTypes` might affect your application's business logic, you can use a Babel plugin like [babel-plugin-transform-react-remove-prop-types](https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types) to strip them out during your build process for testing.

---

## Changes to Testability

The **`@testable` decorator has been removed**. The `data-cid` props, which were previously added by this decorator in development builds, are now **always added to components**. This change was made in response to frequent requests for a consistent way to identify InstUI components for end-to-end (e2e) tests.

As a result of this change, the **`ALWAYS_APPEND_UI_TESTABLE_LOCATORS`** Node.js environment variable is no longer used.

---

## Removal of deprecated props/components/APIs

### InstUISettingsProvider

[InstUISettingsProvider](#InstUISettingsProvider)'s `as` prop was removed, it will always render as a `<span>` (note: it will only render anything to the DOM if you provide a value to the `dir` prop.). The provided codemod will remove this prop automatically (see below).

### Theming engine changes

| Removed                                            | What to use instead?                                                                                  |
| :------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| `canvas.use()`, `canvasHighContrast.use()`         | Wrap all your application roots in `<InstUISettingsProvider>`                                         |
| `canvasThemeLocal`, `canvasHighContrastThemeLocal` | Use `canvas` and `canvasHighContrast` respectively, they are the same objects.                        |
| `variables` field on theme objects                 | Use `canvas.borders` instead of `canvas.variables.borders` (same for all other fields)                |
| `@instructure/theme-registry` package              | This added the removed functions above. Wrap all your application roots in `<InstUISettingsProvider>` |

### Removal of the `deprecated`, `experimental`, `hack` decorators

We have removed these utilities from the `ui-react-utils` package because we are phasing out parts from the codebase that use decorators.

If you want to still use these we suggest to copy-paste their code from the latest v10 codebase (Note: they only work for class-based components!).

---

## Component Changes

### CodeEditor

The **`<CodeEditor>` component** from the `ui-code-editor` package has been **removed** due to significant accessibility issues. Please use the **`<SourceCodeEditor>`** component as a replacement.

### Table

[Table](#Table) is now using [TableContext](#TableContext) to pass down data to its child components, the following props are no longer passed down to their children (This should only affect you if you have custom table rows or cells):

| Component | prop        | Substitute / Notes              |
| :-------- | :---------- | :------------------------------ |
| `Row`     | `isStacked` | is now stored in `TableContext` |
| `Body`    | `isStacked` | is now stored in `TableContext` |
| `Body`    | `hover`     | is now stored in `TableContext` |
| `Body`    | `headers`   | is now stored in `TableContext` |

[Table](#Table)'s `caption` prop is now required.

---

## API Changes

- `ui-dom-utils`/`getComputedStyle` can now return `undefined`: In previous versions it sometimes returned an empty object which could lead to runtime exceptions when one tried to call methods of `CSSStyleDeclaration` on it.

---

## Codemods

To ease the upgrade we provide codemods that will automate most of the changes. Pay close attention to its output, it cannot refactor complex code! The codemod scripts can be run via the following commands:

```sh
---
type: code
---
npm install @instructure/ui-codemods@11
npx jscodeshift@17.3.0 -t node_modules/@instructure/ui-codemods/lib/instUIv11Codemods.ts <path> --usePrettier=false
```

This is a collection of the codemods that will do the following:

- Removes the `as` prop from `InstUISettingsProvider`.
- Renames `canvasThemeLocal` to `canvas` and `canvasHighContrastThemeLocal` to `canvasHighContrastTheme`, warns about deleted `ThemeRegistry` imports and the removed `canvas.use()`/`canvasHighContrast.use()` functions.
- Prints a warning if the `caption` prop is missing from a `<Table />`
- Warns if `CodeEditor` is used

Options for the codemod:

- `filename`: if specified then emitted warnings are written to this file.
- `usePrettier`: if `true` the transformed code will be run through Prettier. You can customize this through a [Prettier
  config file](https://prettier.io/docs/configuration.html)
