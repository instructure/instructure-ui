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
  const { size, variant, overflow, constrain } = props

  const commonSizeStyleExceptForFullscreen = {
    maxWidth: '95%',
    maxHeight: '95%',
    ...(overflow === 'fit' && {
      transform: 'translateY(2.5%)'
    })
  }

  const sizeStyles = {
    auto: {
      flex: '0 1 auto',
      minWidth: componentTheme.autoMinWidth,
      ...commonSizeStyleExceptForFullscreen
    },
    small: {
      flex: `0 1 ${componentTheme.smallMaxWidth}`,
      ...commonSizeStyleExceptForFullscreen
    },
    medium: {
      flex: `0 1 ${componentTheme.mediumMaxWidth}`,
      ...commonSizeStyleExceptForFullscreen
    },
    large: {
      flex: `0 1 ${componentTheme.largeMaxWidth}`,
      ...commonSizeStyleExceptForFullscreen
    },
    fullscreen: {
      flex: 1,
      width: '100%',
      height: '100%',
      boxShadow: 'none',
      border: 'none',
      borderRadius: 0
    }
  }
  const backgroundStyles =
    variant === 'inverse'
      ? {
          background: componentTheme.inverseBackground,
          color: componentTheme.inverseTextColor
        }
      : {
          background: componentTheme.background,
          color: componentTheme.textColor
        }

  const fullscreenConstrainStyles =
    constrain === 'window' ? { position: 'fixed' } : { position: 'absolute' }

  return {
    modal: {
      label: 'modal',
      fontFamily: componentTheme.fontFamily,
      display: 'flex',
      minWidth: '1px',
      flexDirection: 'column',
      position: 'relative',
      boxSizing: 'border-box',
      boxShadow: componentTheme.boxShadow,
      border: `0.0625rem solid ${componentTheme.borderColor}`,
      borderRadius: componentTheme.borderRadius,
      ...sizeStyles[size],
      ...backgroundStyles
    },
    fullscreenLayout: {
      label: 'modal__fullscreenLayout',
      boxSizing: 'border-box',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      zIndex: componentTheme.zIndex,
      ...fullscreenConstrainStyles
    },
    constrainContext: {
      label: 'modal__constrainContext',
      display: 'block',
      position: 'relative',
      width: '100%',
      height: '100%'
    }
  }
}

export default generateStyle
