export default function ({ typography, colors }) {
  return {
    ...typography,

    colorPrimary: colors.darkest,
    colorSecondary: colors.dark,
    colorPrimaryInverse: colors.lightest,
    colorSecondaryInverse: colors.light,
    colorError: colors.danger,
    colorSuccess: colors.success
  }
}
