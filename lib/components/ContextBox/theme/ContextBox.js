export default function ({ colors }) {
  return {
    borderColor: colors.colorNeutralMedium,
    backgroundColor: colors.colorBackground,
    boxShadowColor: 'rgba(0, 0, 0, 0.1)',
    textColor: colors.colorText,

    borderColorInverse: 'transparent',
    backgroundColorInverse: colors.colorBackgroundInverse,
    textColorInverse: colors.colorTextInverse,
    boxShadowColorInverse: 'transparent'
  }
}
