export default function generator ({ colors, typography }) {
  return {
    separatorColor: colors.slate,

    smallSeparatorFontSize: '0.5rem',
    smallFontSize: typography.fontSizeSmall,

    mediumSeparatorFontSize: '0.75rem',
    mediumFontSize: typography.fontSizeMedium,

    largeSeparatorFontSize: '1rem',
    largeFontSize: typography.fontSizeLarge
  }
}
