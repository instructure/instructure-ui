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
 * Generates the style object from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @param  {Object} themeOverride User provided overrides of the default theme mapping.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (theme, themeOverride, props, state) => {
  const {
    grow,
    shouldGrow,
    shrink,
    shouldShrink,
    align,
    size,
    direction,
    textAlign,
    margin,
    padding,
    overflowX,
    overflowY
  } = props

  const alignSelfValues = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    stretch: 'stretch'
  }

  const dirColumn = direction === 'column'
  const dirRow = direction === 'row'

  return {
    flexItem: {
      label: 'flexItem',
      boxSizing: 'border-box',
      flexBasis: size,
      // initial value is 1, but we want 0 as our default,
      // so users can opt in to shrink like they do grow
      flexShrink: shrink || shouldShrink ? 1 : 0,
      ...((grow || shouldGrow) && { flexGrow: 1 }),
      ...(align && { alignSelf: alignSelfValues[align] })
    },
    forwardedStyleProps: {
      minHeight: dirColumn ? size : undefined,
      minWidth: dirRow && size ? size : '0.0625rem',
      textAlign: textAlign,
      margin: margin,
      padding: padding,
      overflowX: overflowX,
      overflowY: overflowY || (dirColumn ? 'auto' : 'visible')
    }
  }
}

export default generateStyle
