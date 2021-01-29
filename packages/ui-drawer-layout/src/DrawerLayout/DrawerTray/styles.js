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
const generateStyle = (componentTheme, props, state) => {
  const { border } = props
  const { hasShadow, placement } = state

  const borderPlacementStyle = {
    start: { borderRightWidth: componentTheme.borderWidth },
    end: { borderLeftWidth: componentTheme.borderWidth }
  }

  const borderStyles = border
    ? {
        borderWidth: 0,
        borderColor: componentTheme.borderColor,
        borderStyle: componentTheme.borderStyle,
        boxSizing: 'border-box',
        ...borderPlacementStyle[placement]
      }
    : {
        boxSizing: 'content-box'
      }

  const shadowStyles = hasShadow
    ? {
        boxShadow: componentTheme.boxShadow
      }
    : {}

  const placementStyleMap = {
    start: { left: 0 },
    end: { right: 0 }
  }

  return {
    drawerTray: {
      label: 'drawerLayout__tray',
      position: 'absolute',
      backgroundColor: componentTheme.background,
      zIndex: componentTheme.zIndex,
      overflowY: 'auto',
      overflowX: 'hidden',
      ...borderStyles,
      ...shadowStyles,
      top: 0,
      bottom: 0,
      ...placementStyleMap[placement]
    },
    drawerTrayContent: {
      label: 'drawerLayout__trayContent',
      overflowY: 'auto',
      height: '100%',
      boxSizing: 'content-box'
    }
  }
}

export default generateStyle
