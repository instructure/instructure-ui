export default function ({ colors, typography }) {
  return {
    trigger: {
      fontFamily: typography.fontFamily,
      fontWeight: typography.fontWeightNormal,

      color: colors.brand,
      textDecoration: 'none',

      hover: {
        color: colors.brand,
        textDecoration: 'underline'
      }
    }
  }
}
