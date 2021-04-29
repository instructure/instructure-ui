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
  const { rotate, size, bidirectional } = props

  const rotateVariants = {
    0: {},
    90: { transform: 'rotate(90deg)' },
    180: { transform: 'rotate(180deg)' },
    270: { transform: 'rotate(270deg)' }
  }

  const bidirectionalRotateVariants = {
    0: { transform: 'scale3d(-1, 1, 1)' },
    90: { transform: 'scale3d(-1, 1, 1) rotate(90deg)' },
    180: { transform: 'scale3d(-1, 1, 1) rotate(180deg)' },
    270: { transform: 'scale3d(-1, 1, 1) rotate(270deg)' }
  }

  const sizeVariants = {
    'x-small': { fontSize: componentTheme.sizeXSmall },
    small: { fontSize: componentTheme.sizeSmall },
    medium: { fontSize: componentTheme.sizeMedium },
    large: { fontSize: componentTheme.sizeLarge },
    'x-large': { fontSize: componentTheme.sizeXLarge }
  }

  return {
    svgIcon: {
      label: 'svgIcon',
      verticalAlign: 'middle',
      lineHeight: 1,
      width: '1em',
      height: '1em',
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...rotateVariants[rotate],
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...sizeVariants[size],

      ...(bidirectional && {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        '[dir="rtl"] &': bidirectionalRotateVariants[rotate]
      })
    }
  }
}

export default generateStyle
