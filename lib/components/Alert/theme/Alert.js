export default function ({ borders, colors, spacing, typography }) {
  return {
    borderRadius: borders.borderRadiusMedium,

    colorBackground: colors.colorBackground,
    colorIcon: colors.colorTextInverse,
    colorSuccess: colors.colorSuccessAccent,
    colorBrand: colors.colorBrandAccent,
    colorAlert: colors.colorAlertAccent,
    colorDanger: colors.colorDangerAccent,
    colorCloseIcon: colors.colorTextSecondary,

    spacingSmall: spacing.spacingSmall,
    spacingMedium: spacing.spacingMedium,
    spacingLarge: spacing.spacingLarge,

    fontFamily: typography.fontFamilyBase,
    fontSize: typography.fontSizeSmall,
    lineHeight: typography.lineHeightCondensed
  }
}
