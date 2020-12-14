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

import generateComponentTheme from './theme'
/**
 * Generates the style object from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @param  {Object} themeOverride User provided overrides of the default theme mapping.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  theme,
  themeOverride,
  {
    overlay,
    withBlur,
    withGrayscale,
    hasBackground,
    src,
    supportsObjectFit,
    constrain
  }
) => {
  const componentTheme = generateComponentTheme(theme, themeOverride)

  const overlayStyle = overlay
    ? {
        backgroundColor: overlay.color,
        opacity: overlay.opacity * 0.1,
        mixBlendMode: overlay.blend ? overlay.blend : null
      }
    : {}

  const imgOverlayStyle = overlay
    ? {
        display: 'block'
      }
    : {}

  const containerOverlayStyle = overlay
    ? {
        position: 'relative',
        overflow:
          'hidden' /* stops blurred images extending past overlay borders */
      }
    : {}

  const filterStyle =
    withBlur || withGrayscale
      ? {
          transition: `all ${componentTheme.effectTransitionDuration}`,
          filter: `${withBlur || ''}${withBlur && withGrayscale && ''}${
            withGrayscale || ''
          }`
        }
      : {
          filter: 'none'
        }

  const containerCover = {
    width: '100%',
    height: '100%'
  }
  const cover = {
    objectFit: 'cover'
  }

  const containerContain = {
    height: 'inherit'
  }
  const contain = {
    objectFit: 'contain',
    ...(overlay
      ? {
          width: 'auto',
          height: 'auto',
          maxWidth: '100%',
          maxHeight: '100%'
        }
      : {})
  }

  const constrainStyle = constrain === 'cover' ? cover : contain
  const containerConstrainStyle =
    constrain === 'cover' ? containerCover : containerContain

  const containerBackgroundStyle = {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: constrain
  }

  const viewBackgroundImageStyle = hasBackground ? `url(${src})` : {}
  return {
    overlay: {
      label: 'img__overlay',
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      ...overlayStyle
    },
    view: {
      label: 'img__view',
      ...viewBackgroundImageStyle,
      ...containerOverlayStyle,
      ...containerConstrainStyle,
      ...containerBackgroundStyle
    },
    img: {
      label: 'img',
      margin: '0',
      padding: '0',
      cssFloat: 'none',
      top: 'auto',
      bottom: 'auto',
      left: 'auto',
      right: 'auto',
      lineHeight: 'normal',
      position: 'static',
      transform: 'none',
      maxHeight: 'none',
      minHeight: '0',
      minWidth: '0',
      maxWidth: '100%',
      ...imgOverlayStyle,
      ...filterStyle,
      ...(supportsObjectFit ? constrainStyle : {})
    },
    imageBlurAmount: componentTheme.imageBlurAmount
  }
}
export default generateStyle
