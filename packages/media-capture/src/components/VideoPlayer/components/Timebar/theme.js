import { alpha } from '@instructure/ui-themeable/lib/utils/color'

export default function generator ({ colors, borders, spacing, typography }) {
  return {
    backgroundColor: alpha(colors.licorice, 80),
    bufferedBackgroundColor: alpha(colors.oxford, 80),
    progressBackgroundColor: alpha(colors.brand, 90),
    focusOutlineColor: colors.brand,
    focusOutlineWeight: borders.widthMedium,
    timestampFontWeight: typography.fontWeightLight,
    timestampColor: colors.white,
    timestampFontSize: typography.fontSizeXSmall,
    timestampPadding: `0 ${spacing.xSmall}`,
    tooltipTop: '-1.65rem',
    tooltipPadding: `${spacing.xxxSmall} ${spacing.xxSmall}`,
    tooltipFontWeight: typography.fontWeightLight,
    tooltipBackgroundColor: colors.brand,
    tooltipColor: colors.white,
    tooltipCaretSize: spacing.xxSmall,
    tooltipFontSize: typography.fontSizeXSmall,
    tooltipLineWidth: borders.widthMedium
  }
}
