/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { boxShadowObjectsToCSSString } from '@instructure/ui-themes'
import type { NewComponentTypes } from '@instructure/ui-themes'
import type { CardProps, CardStyle } from './props'

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param componentTheme The theme variable object.
 * @param props the props of the component, the style is applied to
 * @return The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: ReturnType<NewComponentTypes['Card']>,
  props: CardProps
): CardStyle => {
  const { variant = 'base', size = 'md' } = props
  const isAuto = size === 'auto' && variant === 'base'
  // `auto` isn't supported for `nested` Cards (see props.ts) — fall back to
  // the default size rather than indexing the size lookups with 'auto'.
  const sizeKey = size === 'auto' ? 'md' : size

  const boxShadow = boxShadowObjectsToCSSString(componentTheme.boxShadow)

  const borderRadius = {
    base: {
      sm: componentTheme.borderRadiusBaseSm,
      md: componentTheme.borderRadiusBaseMd,
      lg: componentTheme.borderRadiusBaseLg
    },
    nested: {
      sm: componentTheme.borderRadiusNestedSm,
      md: componentTheme.borderRadiusNestedMd,
      lg: componentTheme.borderRadiusNestedLg
    }
  }

  const padding = {
    base: {
      sm: componentTheme.paddingBaseSm,
      md: componentTheme.paddingBaseMd,
      lg: componentTheme.paddingBaseLg
    },
    nested: {
      sm: componentTheme.paddingNestedSm,
      md: componentTheme.paddingNestedMd,
      lg: componentTheme.paddingNestedLg
    }
  }

  // Width breakpoints only apply to `base`: a `nested` Card's available width
  // is already constrained by its parent's padded content box, so enforcing
  // the same breakpoints on `nested` could make it not fit inside `base`.
  const widthVariants =
    variant === 'base'
      ? {
          sm: { maxWidth: componentTheme.breakpointMd },
          md: {
            minWidth: componentTheme.breakpointMd,
            maxWidth: componentTheme.breakpointLg
          },
          lg: { minWidth: componentTheme.breakpointLg }
        }
      : { sm: {}, md: {}, lg: {} }

  const sizeVariants = {
    sm: {
      padding: padding[variant].sm,
      ...widthVariants.sm
    },
    md: {
      padding: padding[variant].md,
      ...widthVariants.md
    },
    lg: {
      padding: padding[variant].lg,
      ...widthVariants.lg
    }
  }

  const variantVariants = {
    base: {
      background: componentTheme.backgroundColor,
      boxShadow
    },
    nested: {
      border: `1px solid ${componentTheme.nestedBorderColor}`
    }
  }

  // `auto` measures the Card's own rendered width via a CSS container query
  // and picks padding/border-radius from the same breakpoints the explicit
  // sizes use — mobile-first: `sm` values are the base, `md`/`lg` values
  // apply once the container is wide enough. It needs a wrapping element
  // (`container`) because a container query can't target the element that
  // declares `containerType` itself, only its descendants.
  if (isAuto) {
    return {
      container: {
        label: 'card__container',
        containerType: 'inline-size'
      },
      card: {
        label: 'card',
        boxSizing: 'border-box',
        borderRadius: borderRadius.base.sm,
        padding: padding.base.sm,
        ...variantVariants.base,
        [`@container (min-width: ${componentTheme.breakpointMd})`]: {
          borderRadius: borderRadius.base.md,
          padding: padding.base.md
        },
        [`@container (min-width: ${componentTheme.breakpointLg})`]: {
          borderRadius: borderRadius.base.lg,
          padding: padding.base.lg
        }
      }
    }
  }

  return {
    card: {
      label: 'card',
      boxSizing: 'border-box',
      borderRadius: borderRadius[variant][sizeKey],
      ...sizeVariants[sizeKey],
      ...variantVariants[variant]
    }
  }
}

export default generateStyle
