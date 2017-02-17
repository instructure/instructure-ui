import { lighten } from '../../../util/color'

export default function generator ({ colors, spacing, typography }) {
  return {
    color: colors.oxford,

    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    lineHeight: typography.lineHeightCondensed,
    fontSize: typography.fontSizeMedium,

    xSmallHeight: spacing.xSmall,
    xSmallValueFontSize: typography.fontSizeXSmall,

    smallHeight: spacing.small,
    smallValueFontSize: typography.fontSizeXSmall,

    mediumHeight: spacing.medium,
    mediumValueFontSize: typography.fontSizeSmall,

    largeHeight: spacing.large,
    largeValueFontSize: typography.fontSizeMedium,

    valuePadding: `${spacing.xxSmall}`,

    meterColorStart: colors.brand,
    meterColorEnd: lighten(colors.brand, 12),

    doneMeterColorStart: colors.success,
    doneMeterColorEnd: lighten(colors.success, 12),

    trackColor: colors.porcelain,

    inverseColor: colors.lightest,
    inverseTrackColor: 'rgba(0, 0, 0, 0.25)'
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark'],
    meterColorStart: variables['ic-brand-primary'],
    meterColorEnd: lighten(variables['ic-brand-primary'], 10)
  }
}
