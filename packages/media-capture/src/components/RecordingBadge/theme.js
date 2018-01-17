export default function generator ({ colors, spacing, typography }) {
  return {
    backgroundColor: colors.slate,
    fontColor: colors.white,
    padding: `${spacing.xxxSmall} ${spacing.xSmall}`,
    signalColor: colors.white,
    signalSize: '0.4em',
    signalMargin: `0 ${spacing.xxSmall} 0 0`
  }
}
