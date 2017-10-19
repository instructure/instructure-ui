export default function generator ({ borders, colors, spacing, typography }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    color: colors.white,
    fontSize: typography.fontSizeXSmall,
    colorDanger: colors.crimson,
    colorSuccess: colors.shamrock,
    colorPrimary: colors.brand,
    size: '1.25rem',
    countOffset: '0.5rem',
    notificationOffset: '0.125rem',
    sizeNotification: spacing.small,
    borderRadius: '999rem',
    padding: spacing.xxSmall,
    pulseBorderThickness: borders.widthMedium
  }
}

generator['canvas'] = function (variables) {
  return {
    colorPrimary: variables['ic-brand-primary']
  }
}
