export default function ({ colors, borders }) {
  return {
    borderColor: colors.border,
    backgroundColor: colors.lightest,
    boxShadowColor: 'rgba(0, 0, 0, 0.1)',
    textColor: colors.dark,

    borderColorInverse: 'transparent',
    backgroundColorInverse: colors.dark,
    textColorInverse: colors.lightest,
    boxShadowColorInverse: 'transparent',

    arrowSize: '0.5rem',
    borderWidth: borders.widthSmall,
    borderRadius: borders.radiusMedium
  }
}
