---
title: Upgrade Guide for Version 12
category: Guides
order: 1
---

# Upgrade Guide for Version 12

## New theming system

TODO add details

## New icons

InstUI has switched to a new icon set, [Lucide](https://lucide.dev/icons/). We are still keeping some Instructure-specific icons, like product logos. We have a codemod that will help you migrate your code to the new icon set (see below).

### Lucide Icons Package

InstUI v12 introduces a new icon package **`@instructure/ui-icons-lucide`** based on the [Lucide](https://lucide.dev/icons/) icon library, providing 1,700+ icons with improved theming and RTL support. The new Lucide icons are wrapped with `wrapLucideIcon` to integrate with InstUI's theming system while maintaining access to all native Lucide props.

**Key differences from `SVGIcon`/`InlineSVG`:**

| Property        | Old API (SVGIcon)                                                                               | New API (Lucide)                                                                                      |
| :-------------- | :---------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| **size**        | `'x-small'` \| `'small'` \| `'medium'` \| `'large'` \| `'x-large'`                              | `'xs'` \| `'sm'` \| `'md'` \| `'lg'` \| `'xl'` \| `'2xl'` \| `number` (pixels)                        |
| **color**       | Limited tokens: `'primary'` \| `'secondary'` \| `'success'` \| `'error'` \| `'warning'` \| etc. | 60+ theme tokens (`'baseColor'`, `'successColor'`, `'actionPrimaryBaseColor'`, etc.) or any CSS color |
| **strokeWidth** | ❌ Not available                                                                                | `'xs'` \| `'sm'` \| `'md'` \| `'lg'` \| `'xl'` \| `'2xl'` \| `number` \| `string`                     |
| **children**    | `React.ReactNode`                                                                               | ❌ Removed                                                                                            |
| **focusable**   | `boolean`                                                                                       | ❌ Removed                                                                                            |
| **description** | `string` (combined with title)                                                                  | ❌ Removed (use `title` only)                                                                         |
| **src**         | `string`                                                                                        | ❌ Removed                                                                                            |

The new icons automatically sync with theme changes, support all InstUI color tokens, and provide better TypeScript integration. All standard HTML and SVG attributes can be passed directly to Lucide icons and will be spread onto the nested SVG element. Existing `@instructure/ui-icons` package remains available for legacy Instructure-specific icons.

## Removal of deprecated props/components/APIs

## API Changes

### RadioInput

- Setting `readonly` does not set the low level `<input>` to disabled, but to `readonly`. This also means that the input is still focusable when `readonly`
- its DOM structure has been significantly simplified

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
