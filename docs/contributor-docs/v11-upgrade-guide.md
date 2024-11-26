---
title: Upgrade Guide for Version 11
category: Guides
order: 99
isWIP: true
---

# Upgrade Guide for Version 11 (WIP)

## Removal of deprecated props/components

### Table

[Table](/#Table) is now using `TableContext` to pass down data to its child components, the following props are no longer passed down to their children:

| Component | prop        | Substitute / Notes              |
| --------- | ----------- | ------------------------------- |
| `Row`     | `isStacked` | is now stored in `TableContext` |
| `Body`    | `isStacked` | is now stored in `TableContext` |
| `Body`    | `hover`     | is now stored in `TableContext` |
| `Body`    | `headers`   | is now stored in `TableContext` |

### Theming engine changes

| Deprecation                                | What to use instead?                                                                                     |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `canvas.use()`, `canvasHighContrast.use()` | Wrap all your application roots in `<InstUISettingsProvider>`                                            |
| `variables` field on theme objects         | Use the fields from the object above, e.g. use `canvas.borders` instead of `canvas.variables.borders`    |
| `@instructure/theme-registry` package      | This added the deprecated functions above. Wrap all your application roots in `<InstUISettingsProvider>` |

## Changes

- `ui-dom-utils`/`getComputedStyle` can now return `undefined`: In previous versions sometimes returned an empty object which could lead to runtime exceptions when one tried to call methods of `CSSStyleDeclaration` on it.
