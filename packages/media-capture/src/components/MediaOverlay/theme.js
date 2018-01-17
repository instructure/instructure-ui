export default function generator ({ colors, spacing, typography }) {
  return {
    fontColor: colors.white,
    backgroundColor: colors.slate,
    fontSize: typography.fontSizeSmall,
    padding: `0 ${spacing.xSmall}`,
    recordingBarHeight: '1.5em'
  }
}
