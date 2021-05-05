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
  const { minimized } = state

  return {
    navigation: {
      label: 'navigation',
      color: componentTheme.fontColor,
      backgroundColor: componentTheme.backgroundColor,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      // @ts-expect-error ts-migrate(2783) FIXME: 'width' is specified more than once, so this usage... Remove this comment to see the full error message
      width: componentTheme.width,
      height: '100%',
      overflowY: 'auto',
      ...(minimized ? { width: componentTheme.minimizedWidth } : {})
    },
    list: {
      label: 'navigation__list',
      padding: 0,
      margin: 0
    },
    content: {
      label: 'navigation__content',
      listStyleType: 'none',
      margin: '0',
      padding: '0',
      flex: '1 0 auto'
    },
    toggle: {
      transform: 'translate3d(0, 0, 0)',
      transition: `all ${componentTheme.toggleTransition}`,
      ...(minimized ? { transform: 'rotate3d(0, 1, 0, -180deg)' } : {})
    },
    toggleIcon: {
      fill: componentTheme.fill,
      margin: '0 auto'
    }
  }
}

export default generateStyle
