---
title: Migrating components to new theming system
category: Contributor Guides
order: 01
---

# Token migration

The new token system consists of auto-generated tokens form design. They can be imported from `ui-themes`.

## Changing tokens only

The migration strategy with the least amount of effort is only changing tokens. This approach keeps the component as class-based and retains the `View` component.

Changes needed:

- Import token types from `@instructure/ui-themes` instead of `@instructure/shared-types`
- Update `generateStyle` function to use `NewComponentTypes['ComponentName']` for the theme parameter
- Replace old theme tokens with new token names from the design system
- Replace `@TODO_EXPLAIN` decorator with `@withStyle` and remove `generateComponentTheme`
- delete `theme.ts`

If tokens are from a different (usually parent) components, add the `componentID` of that component as second paramater of `@withStyle` and use that name in the `generateStyle` function in `style.ts`: `NewComponentTypes['ParentComponentNameWithTheTokens']`

`generateStyle` accepts a third parameter as well, which are the `sharedTokens`. These provide tokens for shared behaviors such as focus rings, shadows or margins. `'@instructure/emotion'` has various util functions that uses these, such as `calcSpacingFromShorthand` and `calcFocusOutlineStyles`.

## Removing View

For some components it makes sense to remove the `View` component underneath the component structure. Most of the time, `View` only provides margins, focus rings, or minor visual aid. These can be replicated - in most cases - by the `sharedTokens` and their utils.

Ideally all occurrences of `View` would be eliminated from the codebase.

## Transforming class based components to functional

The ultimate goal is to migrate all components to functional based ones. Currently it's not a priority and detailed migration guides will be available later. For the time being, `Avatar` or `RadioInput` can be used as starting reference points.
