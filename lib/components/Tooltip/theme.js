export default function ({ colors, typography }) {
  return {
    triggerFontFamily: typography.fontFamily,
    triggerFontWeight: typography.fontWeightNormal,

    triggerColor: colors.brand,
    triggerTextDecoration: 'none',

    triggerHoverColor: colors.brand,
    triggerHoverTextDecoration: 'underline'
  }
}
