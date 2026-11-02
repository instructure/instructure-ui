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
import type { ImageCardStyle } from './props'

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
  componentTheme: ReturnType<NewComponentTypes['ImageCard']>
): ImageCardStyle => {
  const variantSizeStyles = {
    sm: {
      borderRadius: componentTheme.borderRadiusBaseSm,
      padding: componentTheme.paddingBaseSm
    },
    md: {
      borderRadius: componentTheme.borderRadiusBaseMd,
      padding: componentTheme.paddingBaseMd
    },
    lg: {
      borderRadius: componentTheme.borderRadiusBaseLg,
      padding: componentTheme.paddingBaseLg
    }
  }

  const imageSizeStyles = {
    sm: {
      marginBottom: componentTheme.imgTextGapSm,
      borderRadius: componentTheme.imgBorderRadiusSm
    },
    md: {
      marginBottom: componentTheme.imgTextGapMd,
      borderRadius: componentTheme.imgBorderRadiusMd
    },
    lg: {
      marginBottom: componentTheme.imgTextGapLg,
      borderRadius: componentTheme.imgBorderRadiusLg
    }
  }

  const sizeQueries = {
    sm: `@container (width < ${componentTheme.breakpointMd})`,
    md: `@container ((width >= ${componentTheme.breakpointMd}) and (width < ${componentTheme.breakpointLg}))`,
    lg: `@container (width >= ${componentTheme.breakpointLg})`
  }

  return {
    card: {
      label: 'card',
      containerType: 'inline-size',
      width: '100%'
    },
    container: {
      label: 'card__content',
      overflowWrap: 'anywhere',
      background: componentTheme.backgroundColor,
      boxShadow: boxShadowObjectsToCSSString(componentTheme.boxShadow),
      [sizeQueries.sm]: {
        ...variantSizeStyles.sm
      },
      [sizeQueries.md]: {
        ...variantSizeStyles.md
      },
      [sizeQueries.lg]: {
        ...variantSizeStyles.lg
      }
    },
    content: {
      [sizeQueries.sm]: {
        marginTop: componentTheme.titleContentGapSm
      },
      [sizeQueries.md]: {
        marginTop: componentTheme.titleContentGapMd
      },
      [sizeQueries.lg]: {
        marginTop: componentTheme.titleContentGapLg
      }
    },
    img: {
      label: 'card__img',
      display: 'block',
      width: '100%',
      aspectRatio: componentTheme.imgAspectRatio,
      objectFit: 'cover',
      [sizeQueries.sm]: {
        ...imageSizeStyles.sm
      },
      [sizeQueries.md]: {
        ...imageSizeStyles.md
      },
      [sizeQueries.lg]: {
        ...imageSizeStyles.lg
      }
    },
    breakpointMd: componentTheme.breakpointMd,
    breakpointLg: componentTheme.breakpointLg
  }
}

export default generateStyle
