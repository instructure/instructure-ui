export default function ({ typography, colors }) {
  return {
    fontFamily: typography.fontFamilyBase,
    letterSpacing: '0.03125em',
    textColor: colors.colorTextInverse,
    backgroundColor: colors.colorBrand
  }
}
