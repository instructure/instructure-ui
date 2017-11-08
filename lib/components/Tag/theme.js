import { darken } from '../../util/color'

export default function generator ({ borders, colors, forms, spacing, typography }) {
  const tagVariant = function (style, {
    borderColor,
    borderRadius,
    borderStyle,
    borderWidth,
    hoverColor,
    iconColor,
    iconHoverColor,
    mainColor,
    textColor
  }) {
    return {
      [`${style}BackgroundHover`]: hoverColor || darken(mainColor, 5),
      [`${style}Background`]: mainColor,
      [`${style}BorderColor`]: borderColor,
      // For 'pill'-style rounded corners
      // https://stackoverflow.com/questions/22578979/border-radius-50-vs-border-radius-999em
      [`${style}BorderRadius`]: borderRadius || '999rem',
      [`${style}BorderStyle`]: borderStyle || borders.style,
      [`${style}BorderWidth`]: borderWidth || borders.widthSmall,
      [`${style}Color`]: textColor,
      [`${style}IconColor`]: iconColor || textColor,
      [`${style}IconHoverColor`]: iconHoverColor || iconColor || textColor
    }
  }

  return {
    fontFamily: typography.fontFamily,
    heightSmall: '1.3125rem', // matches Pill component height
    heightMedium: forms.inputHeightSmall,
    heightLarge: forms.inputHeightMedium,
    fontSizeSmall: typography.fontSizeXSmall,
    fontSizeMedium: typography.fontSizeSmall,
    fontSizeLarge: typography.fontSizeMedium,
    padding: `0 ${spacing.small}`,
    paddingSmall: `0 ${spacing.xSmall}`,
    focusOutlineColor: colors.brand,
    maxWidth: '10rem',
    iconMargin: spacing.xxSmall,
    transitionTiming: '0.2s',

    ...tagVariant('default', {
      borderColor: colors.tiara,
      iconColor: colors.licorice,
      iconHoverColor: colors.brand,
      mainColor: colors.porcelain,
      textColor: colors.licorice
    }),

    ...tagVariant('inline', {
      borderColor: colors.ash,
      borderRadius: borders.radiusMedium,
      iconColor: colors.ash,
      iconHoverColor: colors.slate,
      mainColor: colors.white,
      textColor: colors.licorice
    })
  }
}

generator['canvas-a11y'] = generator['modern-a11y'] = function ({ colors }) {
  return {
    defaultBackground: colors.white,
    defaultBorderColor: colors.licorice
  }
}

generator.canvas = function (variables) {
  return {
    focusOutlineColor: variables['ic-brand-primary'],
    defaultTextColor: variables['ic-brand-font-color-dark']
  }
}
