export default function ({ typography }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    lineHeight: typography.lineHeightCondensed,

    h1: {
      fontSize: typography.fontSizeXXLarge,
      fontWeight: typography.fontWeightNormal
    },

    h2: {
      fontSize: typography.fontSizeXLarge,
      fontWeight: typography.fontWeightNormal
    },

    h3: {
      fontSize: typography.fontSizeLarge,
      fontWeight: typography.fontWeightNormal
    },

    h4: {
      fontSize: typography.fontSizeMedium,
      fontWeight: typography.fontWeightNormal
    }
  }
}
