import { lighten } from '../../../util/color'

export default function generator ({ colors, spacing, typography }) {
  return {
    color: colors.dark,

    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    lineHeight: typography.lineHeightCondensed,
    fontSize: typography.fontSizeMedium,

    small: {
      height: spacing.medium,
      value: {
        fontSize: typography.fontSizeSmall
      }
    },

    medium: {
      height: spacing.large,
      value: {
        fontSize: typography.fontSizeMedium
      }
    },

    large: {
      height: spacing.xLarge,
      value: {
        fontSize: typography.fontSizeLarge
      }
    },

    value: {
      padding: `${spacing.xxSmall}`
    },

    meter: {
      colorStart: colors.brand,
      colorEnd: lighten(colors.brand, 10)
    },

    done: {
      meter: {
        colorStart: colors.success,
        colorEnd: lighten(colors.success, 10)
      }
    },

    track: {
      color: colors.light
    },

    inverse: {
      color: colors.lightest,
      track: {
        color: 'rgba(0, 0, 0, 0.25)'
      }
    }
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark'],
    meter: {
      colorStart: variables['ic-brand-primary'],
      colorEnd: lighten(variables['ic-brand-primary'], 10)
    }
  }
}
