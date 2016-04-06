export default function ({ borders, colors, typography }) {
  return {
    borderColor: colors.colorNeutralMedium,
    borderColorHover: colors.colorBrandAccent,
    outlineColorFocus: colors.colorFocusTransparent,
    outlineColorChecked: colors.colorNeutralInverseTransparent,
    shadowColorFocus: colors.colorFocusTransparent,
    backgroundColor: colors.colorBackground,
    labelTextColor: colors.colorText,
    labelLineHeight: typography.lineHeightBase,
    labelFontSize: typography.fontSizeSmall,

    toggleBorderRadius: borders.borderRadiusLarge,
    toggleBgColor: colors.colorNeutral,
    toggleHandleBgColor: colors.colorBackground,
    toggleTextColor: colors.colorTextInverse,
    toggleHandleTextColor: colors.colorText,
    toggleFocusColor: colors.colorFocusTransparent,
    toggleSuccessTextColor: colors.colorSuccess,
    toggleDangerTextColor: colors.colorDanger
  }
}
