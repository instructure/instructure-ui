export default function ({ colors, borders, spacing, typography }) {
  return {
    color: colors.darkest,
    background: colors.lightest,
    borderRadius: borders.radiusMedium,
    marginTop: spacing.small,

    contentPadding: spacing.small + ' ' + spacing.medium,
    contentFontSize: typography.fontSizeMedium,
    contentFontFamily: typography.fontFamily,
    contentFontWeight: typography.fontWeightNormal,
    contentLineHeight: typography.lineHeightCondensed,

    iconColor: colors.lightest,
    iconBackground: colors.lightest,

    successBorderColor: colors.success,
    successIconBackground: colors.success,

    infoBorderColor: colors.info,
    infoIconBackground: colors.info,

    warningBorderColor: colors.warning,
    warningIconBackground: colors.warning,

    dangerBorderColor: colors.danger,
    dangerIconBackground: colors.danger
  }
}
