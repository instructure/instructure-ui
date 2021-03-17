---
title: Deprecated Properties and Components in Version 7.0
category: Guides
order: 2
---

# Deprecated Properties and Components in Version 7.0

```javascript
---
embed: true
---
<ToggleBlockquote
  summary="Important"
>
  <ToggleBlockquote.Paragraph>
    The following properties and components are deprecated in v7, and <strong>will be permanently deleted in v8.0.</strong>
  </ToggleBlockquote.Paragraph>
</ToggleBlockquote>
```

The tables below show what will be removed and what are they replaced with. We also marked if there are [codemods](#ui-codemods) available.

- [Deprecated Components](#v7-deprecated-props-and-components/#deprecated-properties-and-components-in-version-7.0-deprecated-components)
- [Deprecated Properties](#v7-deprecated-props-and-components/#deprecated-properties-and-components-in-version-7.0-deprecated-properties)
- [Deprecated Deprecated Property Values](#v7-deprecated-props-and-components/#deprecated-properties-and-components-in-version-7.0-deprecated-property-values)
- [Deprecated Theme Variables](#v7-deprecated-props-and-components/#deprecated-properties-and-components-in-version-7.0-deprecated-theme-variables)

### Deprecated Components

These components will be removed in the v8.0 release, and this table shows which components they can be substituted with. There are no [codemods](#ui-codemods) available for replacing components.

For more information, click the name of the component to see its full documentation.

| Component                                       | Substitute                                                                                                                                                      |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [DeprecatedButton](#DeprecatedButton)           | Use `Button` from `ui-buttons` package instead. See the [upgrade guide](https://instructure.design/#button-upgrade-guide) for detailed instructions on updating |
| [Media](#Media)                                 | Use `Byline` from the `ui-byline` package instead.                                                                                                              |
| [FocusableView](#FocusableView)                 | Use `View` instead.                                                                                                                                             |
| [MetricsList](#MetricsList)                     | Use `MetricGroup` instead.                                                                                                                                      |
| [MetricsListItem](#MetricsList)                 | Use `Metric` instead.                                                                                                                                           |
| [Popover.Content](#Popover) (PopoverContent)    | Use `children` of `Popover` instead.                                                                                                                            |
| [Popover.Trigger](#Popover) (PopoverTrigger)    | Use `renderTrigger` prop of `Popover` instead.                                                                                                                  |
| [Position.Content](#Position) (PositionContent) | Use `children` of `Position` instead.                                                                                                                           |
| [Position.Target](#Position) (PositionTarget)   | Use `renderTarget` prop of `Position` instead.                                                                                                                  |
| [Progress](#Progress)                           | Use `ProgressBar` or `ProgressCircle` instead.                                                                                                                  |

### Deprecated Properties

Some components have properties that were renamed or will be deleted in the v8.0. release. This table shows the new names of the properties or what other properties you can replace them with. Most of these changes are covered by [codemods](#ui-codemods), and some have notes next to them if the update is not completely evident.

For more information, click the name of the component to see its full documentation.

\* CMA = Codemod available

| Component                      | Old prop                 | New prop                      | CMA\*   | Note                                                                                                                                                                           |
| ------------------------------ | ------------------------ | ----------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Alert](#Alert)                | closeButtonLabel         | renderCloseButtonLabel        | yes     |                                                                                                                                                                                |
| [Avatar](#Avatar)              | inline                   | display                       | yes     | use `display` ('inline-block' or 'block') instead                                                                                                                              |
|                                | variant                  | shape                         | yes     |                                                                                                                                                                                |
| [Breadcrumb.Link](#Breadcrumb) | icon                     | renderIcon                    | yes     |
| [Button](#Button)              | buttonRef                | elementRef                    | yes     | see the [upgrade guide](#button-upgrade-guide/#v8-button-upgrade-guide-props-that-need-to-be-upgraded) for more details                                                        |
|                                | fluidWidth               | display                       | partial | set `display="block"` and `textAlign="start"` instead, see the [upgrade guide](#button-upgrade-guide/#v8-button-upgrade-guide-props-that-need-to-be-upgraded) for more details |
|                                | icon                     | renderIcon                    | yes     | see the [upgrade guide](#button-upgrade-guide/#v8-button-upgrade-guide-props-that-need-to-be-upgraded) for more details                                                        |
|                                | variant                  | -                             | partial | see the [upgrade guide](#button-upgrade-guide/#v8-button-upgrade-guide-upgrading-variant-default,-primary,-success,-danger,-light,-ghost,-or-ghost-inverse)                    |
| [CloseButton](#CloseButton)    | buttonRef                | elementRef                    | yes     | see the [upgrade guide](#button-upgrade-guide/#v8-button-upgrade-guide-props-that-need-to-be-upgraded) for more details                                                        |
|                                | children                 | screenReaderLabel             | no      |                                                                                                                                                                                |
|                                | variant                  | color                         | yes     | use `color` ('primary', 'primary-inverse') instead                                                                                                                             |
| [DateInput](#DateInput)        | label                    | renderLabel                   | yes     |                                                                                                                                                                                |
| [FileDrop](#FileDrop)          | label                    | renderLabel                   | yes     |                                                                                                                                                                                |
|                                | enablePreview            | shouldEnablePreview           | yes     |                                                                                                                                                                                |
|                                | allowRepeatFileSelection | shouldAllowRepeats            | yes     |                                                                                                                                                                                |
|                                | allowMultiple            | shouldAllowMultiple           | yes     |                                                                                                                                                                                |
| [Flex](#Flex)                  | inline                   | display                       | yes     | use `display` ('inline-flex' or 'flex') instead                                                                                                                                |
|                                | wrapItems                | wrap                          | yes     | use `wrap` ('wrap', 'no-wrap' or 'wrap-reverse') instead                                                                                                                       |
|                                | visualDebug              | withVisualDebug               | yes     |                                                                                                                                                                                |
| [Flex.Item](#Flex)             | grow                     | shouldGrow                    | yes     |                                                                                                                                                                                |
|                                | shrink                   | shouldShrink                  | yes     |                                                                                                                                                                                |
|                                | visualDebug              | withVisualDebug               | yes     |                                                                                                                                                                                |
| [Heading](#Heading)            | ellipsis                 | <TruncateText />              | no      | use `TruncateText` component as child instead                                                                                                                                  |
| [Img](#Img)                    | grayscale                | withGrayscale                 | yes     |                                                                                                                                                                                |
|                                | blur                     | withBlur                      | yes     |                                                                                                                                                                                |
|                                | inline                   | display                       | yes     | use `display` ('inline-block' or 'block') instead                                                                                                                              |
| [Link](#Link)                  | linkRef                  | elementRef                    | yes     |                                                                                                                                                                                |
|                                | variant                  | color                         | yes     | use `color` ('link' or ’link-inverse') instead                                                                                                                                 |
| [List](#List)                  | variant                  | -                             | no      | use `InlineList` component for inline lists and `isUnstyled` boolean prop for unstyled lists                                                                                   |
| [NumberInput](#NumberInput)    | label                    | renderLabel                   | yes     |                                                                                                                                                                                |
|                                | inline                   | display                       | yes     | use `display` ('inline-block' or 'block') instead                                                                                                                              |
|                                | required                 | isRequired                    | yes     |                                                                                                                                                                                |
| [Pill](#Pill)                  | text                     | children                      | no      | use `Children` instead (`Children` is now required)                                                                                                                            |
|                                | variant                  | color                         | yes     | use color instead: within the new color prop "default" is now "primary" (gray), "primary" has updated to "info" (blue) and "message" is now "alert"                            |
| [Popover](#Popover)            | show                     | isShowingContent              | yes     |                                                                                                                                                                                |
|                                | defaultShow              | defaultIsShowingContent       | yes     |                                                                                                                                                                                |
|                                | variant                  | color                         | yes     | use `color` ('primary' or 'primary-inverse') instead                                                                                                                           |
|                                | label                    | screenReaderLabel             | yes     |                                                                                                                                                                                |
|                                | trackPosition            | shouldTrackPosition           | yes     |                                                                                                                                                                                |
|                                | alignArrow               | shouldAlignArrow              | yes     |                                                                                                                                                                                |
|                                | onShow                   | onShowContent                 | yes     |                                                                                                                                                                                |
|                                | onDismiss                | onHideContent                 | yes     |                                                                                                                                                                                |
|                                | onToggle                 | onShowContent / onHideContent | no      | use `onShowContent` and `onHideContent`                                                                                                                                        |
| [Position](#Position)          | trackPosition            | shouldTrackPosition           | yes     |                                                                                                                                                                                |
|                                | over                     | shouldPositionOverTarget      | yes     |                                                                                                                                                                                |
| [Spinner](#Spinner)            | title                    | renderTitle                   | yes     |                                                                                                                                                                                |
| [Table](#Table)                | mode                     | -                             | no      | Removed support for deprecated "mode" property, since it was deprecated in v7.                                                                                                 |
| [Tabs](#Tabs)                  | title                    | renderTitle                   | yes     |                                                                                                                                                                                |
|                                | size                     | maxWidth                      | no      |                                                                                                                                                                                |
|                                | selectedIndex            | -                             | no      | use `isSelected` prop on `Tabs.Panel` instead                                                                                                                                  |
|                                | onChange                 | onRequestTabChange            | yes     |                                                                                                                                                                                |
|                                | focus                    | shouldFocusOnRender           | yes     |                                                                                                                                                                                |
| [Tabs.Panel](#Tabs)            | title                    | renderTitle                   | yes     |                                                                                                                                                                                |
|                                | selected                 | isSelected                    | yes     |                                                                                                                                                                                |
|                                | disabled                 | isDisabled                    | yes     |                                                                                                                                                                                |
| [Tabs.Tab](#Tabs)              | selected                 | isSelected                    | yes     |                                                                                                                                                                                |
|                                | disabled                 | isDisabled                    | yes     |                                                                                                                                                                                |
| [TextInput](#TextInput)        | label                    | renderLabel                   | yes     |                                                                                                                                                                                |
|                                | required                 | isRequired                    | yes     |                                                                                                                                                                                |
|                                | inline                   | display                       | yes     | use `display` ('inline-block' or 'block') instead                                                                                                                              |
|                                | icon                     | renderAfterInput              | no      |                                                                                                                                                                                |
| [TimeSelect](#TimeSelect)      | label                    | renderLabel                   | yes     |                                                                                                                                                                                |
| [Tooltip](#Tooltip)            | tip                      | renderTip                     | yes     | use `renderTip` instead (`renderTip` property is now required)                                                                                                                 |
|                                | variant                  | color                         | yes     | use `color` ('primary' or 'primary-inverse') instead                                                                                                                           |
| [View](#View)                  | focused                  | withFocusOutline              | yes     |                                                                                                                                                                                |
|                                | visualDebug              | withVisualDebug               | yes     |                                                                                                                                                                                |

### Deprecated Property Values

The following table shows component properties that have changes in the set of values they accept.

The listed `delimiter` values were deleted from `List` and `List.Item`, so they have to be changed manually, but the rest of the changes are covered with [codemods](#ui-codemods).

For more information, click the name of the component to see its full documentation.

\* CMA = Codemod available

| Component          | Property    | Old value | New value       | CMA\* | Note                                                |
| ------------------ | ----------- | --------- | --------------- | ----- | --------------------------------------------------- |
| [List](#List)      | delimiter   | pipe      | -               | no    | will only be available when using [InlineList]      |
|                    |             | slash     | -               | no    | will only be available when using [InlineList]      |
|                    |             | arrow     | -               | no    | will only be available when using [InlineList]      |
| [List.Item](#List) | delimiter   | pipe      | -               | no    | will only be available when using [InlineList.Item] |
|                    |             | slash     | -               | no    | will only be available when using [InlineList.Item] |
|                    |             | arrow     | -               | no    | will only be available when using [InlineList.Item] |
| [Text](#Text)      | color       | error     | danger          | yes   |                                                     |
| [View](#View)      | background  | default   | primary         | yes   |                                                     |
|                    |             | light     | secondary       | yes   |                                                     |
|                    |             | inverse   | primary-inverse | yes   |                                                     |
|                    | borderColor | default   | primary         | yes   |                                                     |
|                    |             | inverse   | transparent     | yes   |                                                     |

### Deprecated Theme Variables

This table shows theme variables that will be removed in the v8.0. release. If you have theme overrides for the following components, overriding the listed variables, please replace them with the indicated substitutes.

```jsx
// e.g.: in ApplyTheme
<ApplyTheme theme={{
  [Button.theme]: {
    defaultBackground: '#ffffff'
  }
}}>
  ...
</ApplyTheme>

// or local overrides
<Button theme={{ defaultBackground: '#ffffff' }} {...buttonProps}>...</Button>
```

There are no [codemods](#ui-codemods) available for theme variables.

| Component                            | Old variable            | New variable                                                                            |
| ------------------------------------ | ----------------------- | --------------------------------------------------------------------------------------- |
| [Button](#Button)                    | smallPadding            | smallPaddingHorizontal                                                                  |
|                                      | mediumPadding           | mediumPaddingHorizontal                                                                 |
|                                      | largePadding            | largePaddingHorizontal                                                                  |
|                                      | defaultBackground       | secondaryBackground                                                                     |
|                                      | defaultBorderColor      | secondaryBorderColor                                                                    |
|                                      | defaultColor            | secondaryColor                                                                          |
|                                      | defaultHoverBackground  | secondaryHoverBackground                                                                |
|                                      | defaultActiveBackground | secondaryActiveBackground                                                               |
|                                      | defaultActiveBoxShadow  | secondaryActiveBoxShadow                                                                |
| [Checkbox](#Checkbox) (ToggleFacade) | baseSizeSmall           | toggleSize                                                                              |
|                                      | baseSizeMedium          | toggleSize                                                                              |
|                                      | baseSizeLarge           | toggleSize                                                                              |
| [Heading](#Heading)                  | fontFamily              | one of ['h1FontFamily', 'h2FontFamily', 'h3FontFamily', 'h4FontFamily', 'h5FontFamily'] |
| [View](#View)                        | borderColorDefault      | borderColorPrimary                                                                      |
|                                      | borderColorInverse      | borderColorTransparent                                                                  |
|                                      | colorInverse            | colorPrimaryInverse                                                                     |
|                                      | background              | backgroundPrimary                                                                       |
|                                      | backgroundLight         | backgroundSecondary                                                                     |
|                                      | backgroundInverse       | backgroundPrimaryInverse                                                                |
