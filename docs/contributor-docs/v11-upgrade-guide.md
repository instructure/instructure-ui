---
title: Upgrade Guide for Version 11
category: Guides
order: 99
isWIP: true
---

# Upgrade Guide for Version 11

## Removal of deprecated props/components

### Table

[Table](/#Table) is now using `TableContext` to pass down data to its child components, the following props are no longer passed down to their children:

| Component | prop        | Substitute / Notes              |
| --------- | ----------- | ------------------------------- |
| `Row`     | `isStacked` | is now stored in `TableContext` |
| `Body`    | `isStacked` | is now stored in `TableContext` |
| `Body`    | `hover`     | is now stored in `TableContext` |
| `Body`    | `headers`   | is now stored in `TableContext` |

## Changes

- `ui-dom-utils`/`getComputedStyle` can now return `undefined`: In previous versions sometimes returned an empty object which could lead to runtime exceptions when one tried to call methods of `CSSStyleDeclaration` on it.
