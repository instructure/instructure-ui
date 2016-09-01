export default function ({ colors }) {
  return {
    trigger: {
      color: colors.brand,
      textDecoration: 'none',

      hover: {
        color: colors.brand,
        textDecoration: 'underline'
      }
    }
  }
}
