import Color from 'color'

export default function ({ borders, colors, typography }) {
  const _default = makeVariables(
    'default',
    colors.colorNeutralInverse,
    colors.colorText,
    colors.colorFocusAccent
  )

  const _primary = makeVariables(
    'primary',
    colors.colorBrand,
    colors.colorTextInverse,
    colors.colorFocusInverse
  )

  const _success = makeVariables(
    'success',
    colors.colorSuccess,
    colors.colorTextInverse,
    colors.colorFocusInverse
  )

  const _alert = makeVariables(
    'alert',
    colors.colorAlert,
    colors.colorTextInverse,
    colors.colorFocusInverse
  )

  const _danger = makeVariables(
    'danger',
    colors.colorDanger,
    colors.colorTextInverse,
    colors.colorFocusInverse
  )

  const _base = {
    fontFamily: typography.fontFamilyLight,
    borderRadius: borders.borderRadiusMedium,
    borderWidth: borders.borderWidthDefault,
    borderStyle: borders.borderStyleDefault,
    textTransform: 'none',

    linkTextColor: colors.colorBrand,
    linkFocusOutlineColor: colors.colorFocusAccent,
    linkTextDecoration: 'none',
    linkTextDecorationHover: 'underline',
    linkTextDecorationFocus: 'underline',
    linkBorderColor: 'transparent'
  }

  return {
    ..._base,
    ..._default,
    ..._primary,
    ..._success,
    ..._alert,
    ..._danger
  }
}

function darken (color, percent) {
  return Color(color).darken(percent).hexString()
}

function makeVariables (style, mainColor, textColor, focusOutlineColor) {
  return {
    [style + 'Background']: mainColor,
    [style + 'BorderColor']: darken(mainColor, 0.2),
    [style + 'TextColor']: textColor,
    [style + 'BackgroundHover']: darken(mainColor, 0.1),
    [style + 'InnerBorderColor']: darken(mainColor, 0.35),
    [style + 'FocusOutlineColor']: focusOutlineColor
  }
}
