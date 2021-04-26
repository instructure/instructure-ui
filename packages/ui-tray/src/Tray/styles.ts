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

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'componentTheme' implicitly has an 'any'... Remove this comment to see the full error message
const generateStyle = (componentTheme, props, state) => {
  const { border, shadow, size, placement } = props

  const borderStyle = {
    borderWidth: 0,
    borderColor: componentTheme.borderColor,
    borderStyle: componentTheme.borderStyle
  }

  const shadowStyle = shadow
    ? {
        boxShadow: componentTheme.boxShadow
      }
    : {}

  const contentStyle =
    placement === 'start' || placement === 'end' || placement === 'center'
      ? {
          label: 'tray__content',
          minHeight: '100vh'
        }
      : {}

  const placementStyles = {
    top: {
      insetInlineStart: 0,
      insetInlineEnd: 0,
      top: 0
    },
    bottom: {
      insetInlineStart: 0,
      insetInlineEnd: 0,
      bottom: 0
    },
    start: {
      top: 0,
      bottom: 0,
      insetInlineStart: 0,
      insetInlineEnd: 'auto'
    },
    end: {
      top: 0,
      bottom: 0,
      insetInlineEnd: 0,
      insetInlineStart: 'auto'
    },
    center: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  }

  const borderPlacementStyle = border
    ? {
        start: {
          borderInlineEndWidth: componentTheme.borderWidth
        },
        end: {
          borderInlineStartWidth: componentTheme.borderWidth
        },
        top: {
          borderBottomWidth: componentTheme.borderWidth
        },
        bottom: {
          borderTopWidth: componentTheme.borderWidth
        }
      }
    : {}

  const sizeVariants = {
    'x-small': componentTheme.xSmallWidth,
    small: componentTheme.smallWidth,
    regular: componentTheme.regularWidth,
    medium: componentTheme.mediumWidth,
    large: componentTheme.largeWidth
  }
  const sizeStyle =
    placement === 'start' || placement === 'end'
      ? {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          width: sizeVariants[size]
        }
      : {}

  return {
    tray: {
      label: 'tray',
      backgroundColor: componentTheme.background,
      position: 'fixed',
      overflowY: 'auto',
      overflowX: 'hidden',
      boxSizing: 'border-box',
      zIndex: componentTheme.zIndex,
      maxWidth: '100vw',
      maxHeight: '100vh',
      ...shadowStyle,
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...placementStyles[placement],
      ...(border && borderStyle),
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...(border && borderPlacementStyle[placement]),
      ...sizeStyle
    },
    content: contentStyle
  }
}

export default generateStyle
