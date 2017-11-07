export default function ({ colors, borders, spacing, typography }) {
  return {
    fontFamily: 'Menlo, Consolas, Monaco, "Andale Mono", monospace',
    fontSize: typography.fontSizeSmall,
    border: `${borders.widthSmall} solid #f6f8fa`,
    borderRadius: borders.radiusMedium,
    focusBorderColor: '#0084D1',
    focusBoxShadow: `inset 0 0 0 1px ${colors.white}`,
    padding: `0 ${spacing.xSmall}`
  }
}
