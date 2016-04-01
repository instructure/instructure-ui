export default function ({ borders, colors }) {
  return {
    borderColor: colors.colorNeutralAccent,
    borderColorHover: colors.colorBrandAccent,
    borderRadius: borders.borderRadiusLarge,
    outlineColorFocus: colors.colorFocusTransparent,
    outlineColorChecked: colors.colorNeutralInverseTransparent,
    shadowColorFocus: colors.colorFocusTransparent,
    backgroundColor: colors.colorBackground,
    labelTextColor: colors.colorText,
    toggleBgColor: colors.colorNeutral,
    toggleHandleBgColor: colors.colorBackground,
    toggleTextColor: colors.colorTextInverse,
    toggleHandleTextColor: colors.colorText,
    toggleFocusColor: colors.colorFocusTransparent,
    toggleSuccessTextColor: colors.colorSuccess,
    toggleDangerTextColor: colors.colorDanger
  }
}
