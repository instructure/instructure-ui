export default function ({ borders, colors, typography }) {
  return {
    borderColor: colors.colorNeutralAccent,
    borderColorHover: colors.colorBrandAccent,
    borderRadius: borders.borderRadiusSmall,
    backgroundColor: colors.colorBackground,
    labelTextColor: colors.colorText,
    checkmarkFillColor: colors.colorBackground,
    checkmarkCheckedFillColor: colors.colorBrandAccent,
    focusOutlineColor: colors.colorFocusTransparent,
    labelLineHeight: typography.lineHeightBase,
    labelFontSize: typography.fontSizeSmall,

    toggleBorderRadius: borders.borderRadiusLarge,
    toggleBgColor: colors.colorNeutral,
    toggleHandleBgColor: colors.colorBackground,
    toggleColorOn: colors.colorSuccessAccent,
    toggleLabelFontWeight: typography.fontWeightBold
  }
}
