---
title: Upgrade Guide for Version 12
category: Guides
order: 1
---

# Upgrade Guide for Version 12

## New theming system

TODO add details

## Link

### New `size` prop

A new `size` prop has been added to control the font size, line height, and icon size/gap. Available values are:

- `'small'`
- `'medium'` (default)
- `'large'`

### Deprecated variant values

The following variant values have been **deprecated** and will be removed in a future version (still supported but warn):

- `'inline-small'`
- `'standalone-small'`

### Theme variable changes

- theme variable `fontSize` is now removed
- theme variable `fontSizeSmall` is now removed
- theme variable `lineHeight` is now removed
- theme variable `color` has been renamed to `textColor`
- theme variable `hoverColor` has been renamed to `textHoverColor`
- theme variable `colorInverse` has been renamed to `onColorTextColor`
- theme variable `focusOutlineWidth` is now removed
- theme variable `focusOutlineStyle` is now removed
- theme variable `focusOutlineColor` is now removed
- theme variable `focusOutlineBorderRadius` is now removed
- theme variable `focusInverseOutlineColor` is now removed
- theme variable `focusInverseIconOutlineColor` is now removed
- theme variable `iconSize` is now removed
- theme variable `iconPlusTextMargin` is now removed
- theme variable `iconPlusTextMarginSmall` is now removed
- theme variable `textUnderlineOffset` is now removed

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

### Text

- `alert` color has been removed. Please use `primary` instead.
- Some prop values have been deprecated, see [Text](/Text) for more details.

## API Changes

### Focus rings

Focus rings are now styled in a central pseudo-component called `SharedTokens`. You can override here how it looks, for example:

```js
---
type: example
---
<InstUISettingsProvider
  theme={{
  themeOverrides: {
    canvas: {
      componentOverrides: {
        SharedTokens: {
          focusOutline: {
            infoColor: 'red',
            offset: '2rem'
          }
        }
      }
    }
  }
}}>
  <TextInput renderLabel="Name" placeholder="Doe, John Doe"/>
</InstUISettingsProvider>
```

### RadioInput

- Setting `readonly` does not set the low level `<input>` to disabled, but to `readonly`. This also means that the input is still focusable when `readonly`
- its DOM structure has been significantly simplified

### Spinner

- `as` prop has been removed, `Spinner` will always render as a `<div>` element.
- `elementRef` prop has been removed, use the `ref` prop instead.

### Metric

- theme variable `padding` is now removed, left-right padding can be set now with the `paddingHorizontal` theme variable
- theme variable `fontFamily` is now removed, font can be set independently on the value and label elements using the `valueFontFamily` and `labelFontFamily` variables respectively

### MetricGroup

- theme variable `lineHeight` is now removed.

### FormFieldGroup

- theme variable `errorBorderColor` is now removed
- theme variable `errorFieldsPaddin` is now removed

### FormFieldLayout

- theme variable `spacing` is now removed
- theme variable `color` has been renamed to `textColor`
- theme variable `inlinePadding` is now removed
- theme variable `asteriskColor` is now removed

### FormFieldMessage

- theme variable `colorHint` has been renamed to `hintTextColor`
- theme variable `colorError` has been renamed to `errorTextColor`
- theme variable `colorSuccess` has been renamed to `successTextColor`
- theme variable `errorIconMarginRight` is now removed

### FormFieldMessages

- theme variable `topMargin` is now removed

### TextArea

- theme variable `smallFontSize` is now renamed to `fontSizeSm`
- theme variable `mediumFontSize` is now renamed to `fontSizeMd`
- theme variable `largeFontMedium` is now renamed to `fontSizeLg`
- theme variable `requiredInvalidColor` is now removed
- theme variable `borderStyle` is now removed
- theme variable `borderTopColor` is now removed
- theme variable `borderBottomColor` is now removed
- theme variable `borderLeftColor` is now removed
- theme variable `borderRightColor` is now removed
- theme variable `color` is now renamed to `textColor`
- theme variable `background` is now renamed to `backgroundColor`
- theme variable `focusOutlineWidth` is now removed
- theme variable `focusOutlineStyle` is now removed
- theme variable `focusOutlineColor` is now removed
- `error` or `success` messages are no longer displayed when the component is `readOnly` or `disabled`

### TextInput

- theme variable `smallFontSize` is now renamed to `fontSizeSm`
- theme variable `mediumFontSize` is now renamed to `fontSizeMd`
- theme variable `largeFontSize` is now renamed to `fontSizeLg`
- theme variable `smallHeight` is now renamed to `heightSm`
- theme variable `mediumHeight` is now renamed to `heightMd`
- theme variable `largeHeight` is now renamed to `textColor`
- theme variable `color` is now renamed to `textColor`
- theme variable `background` is now renamed to `backgroundColor`
- theme variable `padding` is now removed
- theme variable `borderStyle` is now removed
- theme variable `errorOutlineColor` is now removed
- theme variable `focusOutlineWidth` is now removed
- theme variable `focusOutlineStyle` is now removed
- theme variable `focusOutlineColor` is now removed
- theme variable `requiredInvalidColor` is now removed
- `error` or `success` messages are no longer displayed when the component is `readOnly` or `disabled`

### NumberInput

- theme variable `mediumFontSize` is now renamed to `fontSizeMd`
- theme variable `largeFontSize` is now renamed to `fontSizeLg`
- theme variable `mediumHeight` is now renamed to `heightMd`
- theme variable `largeHeight` is now renamed to `textColor`
- theme variable `color` is now renamed to `textColor`
- theme variable `background` is now renamed to `backgroundColor`
- theme variable `padding` is now removed
- theme variable `borderStyle` is now removed
- theme variable `errorOutlineColor` is now removed
- theme variable `focusOutlineWidth` is now removed
- theme variable `focusOutlineStyle` is now removed
- theme variable `focusOutlineColor` is now removed
- theme variable `requiredInvalidColor` is now removed
- `error` or `success` messages are no longer displayed when the component is '`readOnly` or `disabled`

### RadioInputGroup

- theme variable `invalidAsteriskColor` is now removed
- `error` or `success` messages are no longer displayed when the component is '`readOnly` or `disabled`

### TextInput

- theme variable `requiredInvalidColor` is now removed
- `error` or `success` messages are no longer displayed when the component is '`readOnly` or `disabled`

### Tabs.Panel

- theme variable `color` is now renamed to `textColor`
- theme variable `focusOutlineColor` is now removed and the style uses the `sharedTokens.focusOutline.infoColor`

### Tabs.Tab

- theme variable `defaultColor` is now renamed to `defaultTextColor`
- theme variable `defaultHoverBorderColor` is now removed as it was unused

### Tray

- theme variable `background` is now renamed to `backgroundColor`
- theme variable `xSmallWidth` is now renamed to `widthXs`
- theme variable `smallWidth` is now renamed to `widthSm`
- theme variable `regularWidth` is now renamed to `widthMg`
- theme variable `mediumWidth` is now renamed to `widthLg`
- theme variable `largeWidth` is now renamed to `widthXl`
- theme variable `borderStyle` is now removed
- theme variable `position` is now removed

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
