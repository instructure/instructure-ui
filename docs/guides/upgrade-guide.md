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

## Focus rings

Focus rings are now styled in a central pseudo-component called `SharedTokens`. You can override here how it looks, for example:

```js
---
type: example
---
<InstUISettingsProvider
  theme={{
    newTheme: { // TODO remove this when we remove the old theme
      sharedTokens: {
        focusOutline: {
          infoColor: 'green',
          width: '0.4rem',
          offset: '0rem'
        }
      }
    }
  }}>
  <TextInput renderLabel="Name" placeholder="Note: Change example when the old theme is renamed!"/>
</InstUISettingsProvider>
```

### Heading

`color` prop has 2 new values: `primary-on` and `secondary-on`, these are used for colored surfaces.

The default value of the `color` prop has changed from `'inherit'` to `'primary'`. If you need to preserve the previous behavior, explicitly set `color="inherit"`.

```js
---
type: embed
---
<V12ChangelogTable
  removed={[
    {name:"weightImportant",note:""},
    {name:"lineHeight125",note:""},
    {name:"lineHeight150",note:""}
  ]}
  changed={[
    {oldName:"primaryColor",newName:"baseColor",note:""},
    {oldName:"secondaryColor",newName:"mutedColor",note:""},
    {oldName:"primaryInverseColor",newName:"inverseColor",note:""},
    {oldName:"secondaryInverseColor",newName:"inverseColor",note:""},
    {oldName:"titlePageDesktop",newName:"titlePageDesktop",note:"now returns a full typography object instead of just a font size"},
    {oldName:"titlePageMobile",newName:"titlePageMobile",note:"now returns a full typography object instead of just a font size"},
    {oldName:"titleSection",newName:"titleSection",note:"now returns a full typography object instead of just a font size"},
    {oldName:"titleCardSection",newName:"titleCardSection",note:"now returns a full typography object instead of just a font size"},
    {oldName:"titleModule",newName:"titleModule",note:"now returns a full typography object instead of just a font size"},
    {oldName:"titleCardLarge",newName:"titleCardLarge",note:"now returns a full typography object instead of just a font size"},
    {oldName:"titleCardRegular",newName:"titleCardRegular",note:"now returns a full typography object instead of just a font size"},
    {oldName:"titleCardMini",newName:"titleCardMini",note:"now returns a full typography object instead of just a font size"},
    {oldName:"label",newName:"label",note:"now returns a full typography object instead of just a font size"},
    {oldName:"labelInline",newName:"labelInline",note:"now returns a full typography object instead of just a font size"}
  ]}
/>

```

### Billboard

```js
---
type: embed
---
<V12ChangelogTable
  removed={[
    {name:"iconHoverColorInverse",note:""},
    {name:"iconHoverColor",note:""},
    {name:"iconColor",note:""},
    {name:"messageColorInverse",note:""}
  ]}
/>

```

### Breadcrumb

```js
---
type: embed
---
<V12ChangelogTable
  added={[
    {name:"gapSm",note:"Gap spacing for small size breadcrumbs"},
    {name:"gapMd",note:"Gap spacing for medium size breadcrumbs"},
    {name:"gapLg",note:"Gap spacing for large size breadcrumbs"}
  ]}
  removed={[
    {name:"fontFamily",note:"handled in link component"},
    {name:"separatorColor",note:"handled in link component"},
    {name:"smallSeparatorFontSize",note:"handled in link component"},
    {name:"smallFontSize",note:"handled in link component"},
    {name:"mediumSeparatorFontSize",note:"handled in link component"},
    {name:"mediumFontSize",note:"handled in link component"},
    {name:"largeSeparatorFontSize",note:"handled in link component"},
    {name:"largeFontSize",note:"handled in link component"}
  ]}
/>

```

### Flex

Gap styling now uses `sharedTokens.legacySpacing`.

```js
---
type: embed
---
<V12ChangelogTable
  removed={[
    {name:"gapButtons",note:""},
    {name:"gapCheckboxes",note:""},
    {name:"gapDataPoints",note:""},
    {name:"gapInputFields",note:""},
    {name:"gapLarge",note:""},
    {name:"gapMedium",note:""},
    {name:"gapMediumSmall",note:""},
    {name:"gapModalElements",note:""},
    {name:"gapModuleElements",note:""},
    {name:"gapPaddingCardLarge",note:""},
    {name:"gapPaddingCardMedium",note:""},
    {name:"gapPaddingCardSmall",note:""},
    {name:"gapRadios",note:""},
    {name:"gapSectionElements",note:""},
    {name:"gapSections",note:""},
    {name:"gapSelects",note:""},
    {name:"gapSmall",note:""},
    {name:"gapSpace0",note:""},
    {name:"gapSpace12",note:""},
    {name:"gapSpace16",note:""},
    {name:"gapSpace2",note:""},
    {name:"gapSpace24",note:""},
    {name:"gapSpace36",note:""},
    {name:"gapSpace4",note:""},
    {name:"gapSpace48",note:""},
    {name:"gapSpace60",note:""},
    {name:"gapSpace8",note:""},
    {name:"gapStatusIndicators",note:""},
    {name:"gapTags",note:""},
    {name:"gapTextareas",note:""},
    {name:"gapToggles",note:""},
    {name:"gapTrayElements",note:""},
    {name:"gapXLarge",note:""},
    {name:"gapXSmall",note:""},
    {name:"gapXxLarge",note:""},
    {name:"gapXxSmall",note:""},
    {name:"gapXxxSmall",note:""}
  ]}
/>

```

### FormField

#### FormFieldGroup

`error` or `success` messages are no longer displayed when the component is `readOnly` or `disabled`.

```js
---
type: embed
---
<V12ChangelogTable
  removed={[
    {name:"errorBorderColor",note:""},
    {name:"errorFieldsPadding",note:""},
    {name:"borderColor",note:""},
    {name:"borderStyle",note:""},
    {name:"borderWidth",note:""}
  ]}
/>

```

#### FormFieldLayout

```js
---
type: embed
---
<V12ChangelogTable
  removed={[
    {name:"spacing",note:""},
    {name:"inlinePadding",note:""},
    {name:"asteriskColor",note:""}
  ]}
  changed={[
    {oldName:"color",newName:"textColor",note:""}
  ]}
/>

```

#### FormFieldMessage

`newError` message type is now deprecated. Both `newError` and the original `error` type now behave identically (using the new implementation that was previously exclusive to `newError`).

```js
---
type: embed
---
<V12ChangelogTable
  removed={[
    {name:"errorIconMarginRight",note:""}
  ]}
  changed={[
    {oldName:"colorHint",newName:"hintTextColor",note:""},
    {oldName:"colorError",newName:"errorTextColor",note:""},
    {oldName:"colorSuccess",newName:"successTextColor",note:""}
  ]}
/>

```

#### FormFieldMessages

```js
---
type: embed
---
<V12ChangelogTable
  removed={[
    {name:"topMargin",note:""}
  ]}
/>

```

### Grid

```js
---
type: embed
---
<V12ChangelogTable
  changed={[
    {oldName:"mediumMin",newName:"mediumMin",note:"now only provides the value, not the full media query (e.g., '768px' instead of 'min-width: 768px'). The component now adds the `min-width:` prefix automatically in the generated styles."},
    {oldName:"largeMin",newName:"largeMin",note:"now only provides the value, not the full media query (e.g., '1024px' instead of 'min-width: 1024px'). The component now adds the `min-width:` prefix automatically in the generated styles."},
    {oldName:"xLargeMin",newName:"xLargeMin",note:"now only provides the value, not the full media query (e.g., '1440px' instead of 'min-width: 1440px'). The component now adds the `min-width:` prefix automatically in the generated styles."}
  ]}
/>

```

### Grid.Row

```js
---
type: embed
---
<V12ChangelogTable
  changed={[
    {oldName:"mediumMin",newName:"mediumMin",note:"now only provides the value, not the full media query (e.g., '768px' instead of 'min-width: 768px'). The component now adds the `min-width:` prefix automatically in the generated styles."},
    {oldName:"largeMin",newName:"largeMin",note:"now only provides the value, not the full media query (e.g., '1024px' instead of 'min-width: 1024px'). The component now adds the `min-width:` prefix automatically in the generated styles."},
    {oldName:"xLargeMin",newName:"xLargeMin",note:"now only provides the value, not the full media query (e.g., '1440px' instead of 'min-width: 1440px'). The component now adds the `min-width:` prefix automatically in the generated styles."}
  ]}
/>

```

### Grid.Col

```js
---
type: embed
---
<V12ChangelogTable
  changed={[
    {oldName:"mediumMin",newName:"mediumMin",note:"now only provides the value, not the full media query (e.g., '768px' instead of 'min-width: 768px'). The component now adds the `min-width:` prefix automatically in the generated styles."},
    {oldName:"largeMin",newName:"largeMin",note:"now only provides the value, not the full media query (e.g., '1024px' instead of 'min-width: 1024px'). The component now adds the `min-width:` prefix automatically in the generated styles."},
    {oldName:"xLargeMin",newName:"xLargeMin",note:"now only provides the value, not the full media query (e.g., '1440px' instead of 'min-width: 1440px'). The component now adds the `min-width:` prefix automatically in the generated styles."}
  ]}
/>

```

### Link

- `isWithinText` prop has been removed.

#### New `size` prop

A new `size` prop has been added to control the font size, line height, and icon size/gap. Available values are:

- `'small'`
- `'medium'` (default)
- `'large'`

#### Deprecated variant values

The following variant values have been **deprecated** and will be removed in a future version (still supported but warn):

- `'inline-small'`
- `'standalone-small'`

```js
---
type: embed
---
<V12ChangelogTable
  added={[
    {name:"unstyledTextColor",note:"for non-interactive Links"}
  ]}
  removed={[
    {name:"fontSize",note:""},
    {name:"fontSizeSmall",note:""},
    {name:"lineHeight",note:""},
    {name:"focusOutlineWidth",note:""},
    {name:"focusOutlineStyle",note:""},
    {name:"focusOutlineColor",note:""},
    {name:"focusOutlineBorderRadius",note:""},
    {name:"focusInverseOutlineColor",note:""},
    {name:"focusInverseIconOutlineColor",note:""},
    {name:"iconSize",note:""},
    {name:"iconPlusTextMargin",note:""},
    {name:"iconPlusTextMarginSmall",note:""},
    {name:"textUnderlineOffset",note:""}
  ]}
  changed={[
    {oldName:"color",newName:"textColor",note:""},
    {oldName:"hoverColor",newName:"textHoverColor",note:""},
    {oldName:"colorInverse",newName:"onColorTextColor",note:""}
  ]}
/>

```

### Metric

```js
---
type: embed
---
<V12ChangelogTable
  removed={[
    {name:"padding",note:"left-right padding can be set now with the paddingHorizontal theme variable"},
    {name:"fontFamily",note:"font can be set independently on the value and label elements using the valueFontFamily and labelFontFamily variables"}
  ]}
/>

```

#### MetricGroup

```js
---
type: embed
---
<V12ChangelogTable
  removed={[
    {name:"lineHeight",note:""}
  ]}
/>

```

### Menu

Icons for checkbox and radio menu items are now positioned on the right side instead of the left.

```js
---
type: embed
---
<V12ChangelogTable
  removed={[
    {name:"focusBorderStyle",note:"style uses sharedTokens.focusOutline"},
    {name:"focusBorderWidth",note:"style uses sharedTokens.focusOutline"},
    {name:"focusBorderColor",note:"style uses sharedTokens.focusOutline"},
    {name:"focusBorderRadius",note:"style uses sharedTokens.focusOutline"}
  ]}
/>

```

#### Menu.Item

```js
---
type: embed
---
<V12ChangelogTable
  removed={[
    {name:"iconColor",note:""},
    {name:"activeIconColor",note:""},
    {name:"padding",note:"split into paddingVertical and paddingHorizontal"}
  ]}
/>

```

#### Menu.Group

```js
---
type: embed
---
<V12ChangelogTable
  removed={[
    {name:"padding",note:"split into paddingVertical and paddingHorizontal"}
  ]}
/>

```

### Options

```js
---
type: embed
---
<V12ChangelogTable
  removed={[
    {name:"nestedLabelPadding",note:"split into nestedLabelPaddingVertical and nestedLabelPaddingHorizontal"}
  ]}
/>

```

#### Options.Item

```js
---
type: embed
---
<V12ChangelogTable
  removed={[
    {name:"padding",note:"split into paddingVertical and paddingHorizontal"},
  ]}
/>

```

#### Options.Separator

```js
---
type: embed
---
<V12ChangelogTable
  removed={[
    {name:"margin",note:"split into marginVertical and marginHorizontal"}
  ]}
/>

```

### NumberInput

`error` or `success` messages are no longer displayed when the component is `readOnly` or `disabled`.

`newError` message type is now deprecated. Both `newError` and the original `error` type now behave identically (using the new implementation that was previously exclusive to `newError`).

```js
---
type: embed
---
<V12ChangelogTable
  removed={[
    {name:"padding",note:""},
    {name:"borderStyle",note:""},
    {name:"errorOutlineColor",note:""},
    {name:"focusOutlineWidth",note:""},
    {name:"focusOutlineStyle",note:""},
    {name:"focusOutlineColor",note:""},
    {name:"requiredInvalidColor",note:""}
  ]}
  changed={[
    {oldName:"mediumFontSize",newName:"fontSizeMd",note:""},
    {oldName:"largeFontSize",newName:"fontSizeLg",note:""},
    {oldName:"mediumHeight",newName:"heightMd",note:""},
    {oldName:"largeHeight",newName:"textColor",note:""},
    {oldName:"color",newName:"textColor",note:""},
    {oldName:"background",newName:"backgroundColor",note:""}
  ]}
/>

```

### Pill

#### Deprecated color prop values

The following `color` prop values have been **removed**:

- `'danger'` - use `'error'` instead
- `'alert'` - use `'info'` instead

```js
---
type: embed
---
<V12ChangelogTable
  added={[
    {name:"fontFamily",note:""},
    {name:"baseTextColor",note:"split from primaryColor"},
    {name:"baseBorderColor",note:"split from primaryColor"},
    {name:"successTextColor",note:"split from successColor"},
    {name:"successBorderColor",note:"split from successColor"},
    {name:"infoTextColor",note:"split from infoColor"},
    {name:"infoBorderColor",note:"split from infoColor"},
    {name:"warningTextColor",note:"split from warningColor"},
    {name:"warningBorderColor",note:"split from warningColor"},
    {name:"errorTextColor",note:"split from dangerColor"},
    {name:"errorBorderColor",note:"split from dangerColor"}
  ]}
  removed={[
    {name:"primaryColor",note:"split into baseTextColor and baseBorderColor"},
    {name:"successColor",note:"split into successTextColor and successBorderColor"},
    {name:"infoColor",note:"split into infoTextColor and infoBorderColor"},
    {name:"warningColor",note:"split into warningTextColor and warningBorderColor"},
    {name:"dangerColor",note:"replaced with errorTextColor and errorBorderColor"},
    {name:"alertColor",note:"use info* variables instead"}
  ]}
  changed={[
    {oldName:"padding",newName:"paddingHorizontal",note:"now only controls horizontal padding"},
    {oldName:"background",newName:"backgroundColor",note:""}
  ]}
/>

```

### ProgressBar

```js
---
type: embed
---
<V12ChangelogTable
  added={[
    {name:"borderColor",note:"full border color for rebrand theme"},
    {name:"borderColorInverse",note:"full border color for rebrand theme"}
  ]}
  removed={[
    {name:"lineHeight",note:""},
    {name:"meterBorderColorInverse",note:""},
    {name:"meterBorderWidthInverse",note:""},
  ]}
/>

```

### RadioInput

- Setting `readonly` does not set the low level `<input>` to disabled, but to `readonly`. This also means that the input is still focusable when `readonly`
- Its DOM structure has been significantly simplified

### RadioInputGroup

`error` or `success` messages are no longer displayed when the component is `readOnly` or `disabled`.

`newError` message type is now deprecated. Both `newError` and the original `error` type now behave identically (using the new implementation that was previously exclusive to `newError`).

```js
---
type: embed
---
<V12ChangelogTable
  removed={[
    {name:"invalidAsteriskColor",note:""}
  ]}
/>

```

### Spinner

- `as` prop has been removed, `Spinner` will always render as a `<div>` element.
- `elementRef` prop has been removed, use the `ref` prop instead.

### Table

#### Table.Cell

```js
---
type: embed
---
<V12ChangelogTable
  added={[
    {name:"paddingVertical",note:"split from padding"},
    {name:"paddingHorizontal",note:"split from padding"}
  ]}
  removed={[
    {name:"padding",note:"split into paddingVertical and paddingHorizontal"},
    {name:"borderColor",note:""}
  ]}
/>

```

#### Table.ColHeader

```js
---
type: embed
---
<V12ChangelogTable
  added={[
    {name:"paddingVertical",note:"split from padding"},
    {name:"paddingHorizontal",note:"split from padding"}
  ]}
  removed={[
    {name:"padding",note:"split into paddingVertical and paddingHorizontal"},
    {name:"borderColor",note:""},
    {name:"focusOutlineColor",note:""},
    {name:"focusOutlineStyle",note:""},
    {name:"focusOutlineWidth",note:""},
    {name:"sortedIconColor",note:""},
    {name:"unsortedIconColor",note:""}
  ]}
/>

```

#### Table.Row

```js
---
type: embed
---
<V12ChangelogTable
  added={[
    {name:"paddingVertical",note:"split from padding"},
    {name:"paddingHorizontal",note:"split from padding"}
  ]}
  removed={[
    {name:"padding",note:"split into paddingVertical and paddingHorizontal"}
  ]}
/>

```

#### Table.RowHeader

```js
---
type: embed
---
<V12ChangelogTable
  added={[
    {name:"paddingVertical",note:"split from padding"},
    {name:"paddingHorizontal",note:"split from padding"}
  ]}
  removed={[
    {name:"padding",note:"split into paddingVertical and paddingHorizontal"}
  ]}
/>

```

### Tabs

#### Tabs.Panel

```js
---
type: embed
---
<V12ChangelogTable
  removed={[
    {name:"focusOutlineColor",note:"style uses sharedTokens.focusOutline.infoColor"}
  ]}
  changed={[
    {oldName:"color",newName:"textColor",note:""}
  ]}
/>

```

#### Tabs.Tab

```js
---
type: embed
---
<V12ChangelogTable
  removed={[
    {name:"defaultHoverBorderColor",note:"was unused"}
  ]}
  changed={[
    {oldName:"defaultColor",newName:"defaultTextColor",note:""}
  ]}
/>

```

### Text

- `alert` color has been removed. Please use `primary` instead.
- Some prop values have been deprecated, see [Text](/Text) for more details.
- `color` has 2 new values: `primary-on` and `secondary-on`, these are used for colored surfaces.

### TreeBrowser

#### Icon system migration

TreeBrowser now uses Lucide icons instead of the legacy icon system:

- Default `collectionIcon` changed from `IconFolderLine` to `FolderClosedInstUIIcon`
- Default `collectionIconExpanded` changed from `IconFolderLine` to `FolderClosedInstUIIcon`
- Default `itemIcon` changed from `IconDocumentLine` to `FileTextInstUIIcon`

#### Theme variable changes

**TreeBrowser:**

- theme variable `focusOutlineWidth` is now removed (handled by `sharedTokens`)
- theme variable `focusOutlineStyle` is now removed (handled by `sharedTokens`)
- theme variable `focusOutlineColor` is now removed (handled by `sharedTokens`)

**TreeButton:**

- theme variable `focusOutlineWidth` is now removed (handled by `sharedTokens`)
- theme variable `focusOutlineStyle` is now removed (handled by `sharedTokens`)
- theme variable `focusOutlineColor` is now removed (handled by `sharedTokens`)
- theme variable `selectedOutlineWidth` is now removed (handled by `sharedTokens`)
- theme variable `iconColor` is now removed
- theme variable `iconsMarginRight` is now removed

### Tag

```js
---
type: embed
---
<V12ChangelogTable
  removed={[
    {name:"defaultIconColor",note:""},
    {name:"defaultIconHoverColor",note:""},
    {name:"inlineIconColor",note:""},
    {name:"inlineIconHoverColor",note:""},
    {name:"focusOutlineColor",note:""},
    {name:"focusOutlineStyle",note:""},
    {name:"focusOutlineWidth",note:""},
    {name:"padding",note:"paddingHorizontal replaces padding for horizontal padding control"},
    {name:"paddingSmall",note:"paddingHorizontalSmall replaces paddingSmall for horizontal padding control"}
  ]}
/>

```

### TextArea

`error` or `success` messages are no longer displayed when the component is `readOnly` or `disabled`.

```js
---
type: embed
---
<V12ChangelogTable
  removed={[
    {name:"requiredInvalidColor",note:""},
    {name:"borderStyle",note:""},
    {name:"borderTopColor",note:""},
    {name:"borderBottomColor",note:""},
    {name:"borderLeftColor",note:""},
    {name:"borderRightColor",note:""},
    {name:"focusOutlineWidth",note:""},
    {name:"focusOutlineStyle",note:""},
    {name:"focusOutlineColor",note:""}
  ]}
  changed={[
    {oldName:"smallFontSize",newName:"fontSizeSm",note:""},
    {oldName:"mediumFontSize",newName:"fontSizeMd",note:""},
    {oldName:"largeFontMedium",newName:"fontSizeLg",note:""},
    {oldName:"color",newName:"textColor",note:""},
    {oldName:"background",newName:"backgroundColor",note:""}
  ]}
/>

```

### TextInput

`error` or `success` messages are no longer displayed when the component is `readOnly` or `disabled`.

`newError` message type is now deprecated. Both `newError` and the original `error` type now behave identically (using the new implementation that was previously exclusive to `newError`).

```js
---
type: embed
---
<V12ChangelogTable
  removed={[
    {name:"padding",note:""},
    {name:"borderStyle",note:""},
    {name:"errorOutlineColor",note:""},
    {name:"focusOutlineWidth",note:""},
    {name:"focusOutlineStyle",note:""},
    {name:"focusOutlineColor",note:""},
    {name:"requiredInvalidColor",note:""}
  ]}
  changed={[
    {oldName:"smallFontSize",newName:"fontSizeSm",note:""},
    {oldName:"mediumFontSize",newName:"fontSizeMd",note:""},
    {oldName:"largeFontSize",newName:"fontSizeLg",note:""},
    {oldName:"smallHeight",newName:"heightSm",note:""},
    {oldName:"mediumHeight",newName:"heightMd",note:""},
    {oldName:"largeHeight",newName:"textColor",note:""},
    {oldName:"color",newName:"textColor",note:""},
    {oldName:"background",newName:"backgroundColor",note:""}
  ]}
/>

```

### RangeInput

```js
---
type: embed
---
<V12ChangelogTable
  removed={[
    {name:"handleFocusRingSize",note:"style uses sharedTokens.focusOutline.width token"},
    {name:"handleFocusRingColor",note:"style uses sharedTokens.focusOutline.onColor token"}
  ]}
  changed={[
    {oldName:"handleShadow",newName:"boxShadow",note:""},
    {oldName:"valueSmallPadding",newName:"valueSmallPadding",note:"now only sets horizontal padding of the value"},
    {oldName:"valueMediumPadding",newName:"valueMediumPadding",note:"now only sets horizontal padding of the value"},
    {oldName:"valueLargePadding",newName:"valueLargePadding",note:"now only sets horizontal padding of the value"}
  ]}
/>

```

### SourceCodeEditor

```js
---
type: embed
---
<V12ChangelogTable
  removed={[
    {name:"focusBorderColor",note:"now uses sharedTokens.focusOutline.infoColor"}
  ]}
/>

```

### Tray

```js
---
type: embed
---
<V12ChangelogTable
  removed={[
    {name:"borderStyle",note:""},
    {name:"position",note:""}
  ]}
  changed={[
    {oldName:"background",newName:"backgroundColor",note:""},
    {oldName:"xSmallWidth",newName:"widthXs",note:""},
    {oldName:"smallWidth",newName:"widthSm",note:""},
    {oldName:"regularWidth",newName:"widthMg",note:""},
    {oldName:"mediumWidth",newName:"widthLg",note:""},
    {oldName:"largeWidth",newName:"widthXl",note:""}
  ]}
/>

```

### View

```js
---
type: embed
---
<V12ChangelogTable
  removed={[
    {name:"arrowSize",note:"Moved to ContextView component"},
    {name:"marginXxxSmall",note:"Use sharedTokens.spacing"},
    {name:"marginXxSmall",note:"Use sharedTokens.spacing"},
    {name:"marginXSmall",note:"Use sharedTokens.spacing"},
    {name:"marginSmall",note:"Use sharedTokens.spacing"},
    {name:"marginMedium",note:"Use sharedTokens.spacing"},
    {name:"marginLarge",note:"Use sharedTokens.spacing"},
    {name:"marginXLarge",note:"Use sharedTokens.spacing"},
    {name:"marginXxLarge",note:"Use sharedTokens.spacing"},
    {name:"paddingXxxSmall",note:"Use sharedTokens.spacing"},
    {name:"paddingXxSmall",note:"Use sharedTokens.spacing"},
    {name:"paddingXSmall",note:"Use sharedTokens.spacing"},
    {name:"paddingSmall",note:"Use sharedTokens.spacing"},
    {name:"paddingMedium",note:"Use sharedTokens.spacing"},
    {name:"paddingLarge",note:"Use sharedTokens.spacing"},
    {name:"paddingXLarge",note:"Use sharedTokens.spacing"},
    {name:"paddingXxLarge",note:"Use sharedTokens.spacing"},
    {name:"shadowDepth1",note:"Use sharedTokens.boxShadow.elevation1/2/3"},
    {name:"shadowDepth2",note:"Use sharedTokens.boxShadow.elevation1/2/3"},
    {name:"shadowDepth3",note:"Use sharedTokens.boxShadow.elevation1/2/3"},
    {name:"shadowResting",note:"Use sharedTokens.boxShadow.elevation*"},
    {name:"shadowAbove",note:"Use sharedTokens.boxShadow.elevation*"},
    {name:"shadowTopmost",note:"Use sharedTokens.boxShadow.elevation*"},
    {name:"borderRadiusSmall",note:"Use sharedTokens.radius*"},
    {name:"borderRadiusMedium",note:"Use sharedTokens.radius*"},
    {name:"borderRadiusLarge",note:"Use sharedTokens.radius*"},
    {name:"borderWidthSmall",note:"Use sharedTokens.width*"},
    {name:"borderWidthMedium",note:"Use sharedTokens.width*"},
    {name:"borderWidthLarge",note:"Use sharedTokens.width*"}
  ]}
/>

```

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
