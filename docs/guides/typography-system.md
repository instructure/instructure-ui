---
title: Typography
category: Guides
order: 9
---

# Typography

InstUI provides various typography tokens on theme and component level as well.

## Typography components

Your every text-based need should be covered by one of our two typography components, namely `<Text>` and `<Heading>`.
These components have a `variant` prop with a handful of semantic values to choose from. These values describe multiple aspects of the text, such as `font-weight`, `font-size`, `line-height` and for `<Heading>` the DOM element that should be rendered, (i.e.:`<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`).

While you can set all these properties separately as well, our strong recommendation is to use the variant with semantic values and only deviate from it in cases absolutely necessary.

## <Text>

Here is the list of semantic variant values and what they do in `<Text>`

This is always rendered as `<span>`

The values (e.g.:`weightRegular`) are from the currently used theme's typography sections, for example:
[Canvas Theme](https://instructure.design/#canvas)

| variant            | fontStyle | weight          | size               | lineHeight    |
| ------------------ | --------- | --------------- | ------------------ | ------------- |
| descriptionPage    | normal    | weightRegular   | descriptionPage    | lineHeight150 |
| descriptionSection | normal    | weightRegular   | descriptionSection | lineHeight150 |
| content            | normal    | weightRegular   | content            | lineHeight150 |
| contentImportant   | normal    | weightImportant | content            | lineHeight150 |
| contentQuote       | normal    | weightRegular   | content            | lineHeight150 |
| contentSmall       | normal    | weightRegular   | contentSmall       | lineHeight150 |
| legend             | normal    | weightRegular   | legend             | lineHeight150 |

## <Heading>

Here is the list of semantic variant values and how are they rendered in `<Heading>`

| variant          | dom element |
| ---------------- | ----------- |
| titlePageDesktop | h1          |
| titlePageMobile  | h1          |
| titleSection     | h2          |
| titleCardSection | h2          |
| titleModule      | h3          |
| titleCardLarge   | h4          |
| titleCardRegular | h4          |
| titleCardMini    | h4          |
| label            | h5          |
| labelInline      | h5          |

## Legacy values

For compatibility reasons we still provide the legacy typography tokens (xxLarge, medium, etc.) so updating InstUI is easier but these tokens shouldn't be used when creating new screens. The following tokens are deprecated from the `themes`, more specifically from `theme.typography`

Deprecated theme tokens:

- fontSizeXSmall
- fontSizeSmall
- fontSizeMedium
- fontSizeLarge
- fontSizeXLarge
- fontSizeXXLarge
- fontWeightLight
- fontWeightNormal
- fontWeightBold
- lineHeight
- lineHeightFit
- lineHeightCondensed
- lineHeightDouble
- letterSpacingNormal
