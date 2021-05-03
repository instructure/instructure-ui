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
  const { overlay, withBlur, withGrayscale, src, constrain } = props

  const { supportsObjectFit, hasBackground } = state

  const isCover = constrain === 'cover'
  const isContain = constrain === 'contain'

  // if overlay or filters are updated via props,
  // make the transition look smooth
  const transitionStyle = {
    transition: `all ${componentTheme.effectTransitionDuration}`
  }

  const getFilterStyle = () => {
    const filters = []

    withBlur && filters.push(`blur(${componentTheme.imageBlurAmount})`)
    withGrayscale && filters.push('grayscale(1)')

    return filters.length > 0
      ? {
          ...transitionStyle,
          filter: filters.join(' ')
        }
      : {
          filter: 'none'
        }
  }

  const fillContainer = {
    width: '100%',
    height: '100%'
  }

  const imgCoverStyle = {
    objectFit: 'cover',
    ...fillContainer
  }

  const imgContainStyle = {
    objectFit: 'contain',
    ...fillContainer,
    ...(overlay && {
      width: 'auto',
      height: 'auto',
      maxWidth: '100%',
      maxHeight: '100%'
    })
  }

  return {
    overlay: {
      label: 'img__overlay',
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      ...transitionStyle,
      ...(overlay && {
        backgroundColor: overlay.color,
        opacity: overlay.opacity * 0.1,
        mixBlendMode: overlay.blend ? overlay.blend : null
      })
    },

    container: {
      label: 'img__container',
      ...(overlay && {
        position: 'relative',
        overflow:
          'hidden' /* stops blurred images extending past overlay borders */
      }),
      ...(isCover && fillContainer),
      ...(isContain && { height: 'inherit' }),

      // if browser does not support ObjectFit CSS, and Img needs "constrain",
      // serve up a background-image instead
      ...(hasBackground && {
        ...fillContainer,
        backgroundImage: `url(${src})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        ...(constrain && { backgroundSize: constrain })
      })
    },

    img: {
      label: 'img',
      // reset image styles (initial: all was causing conflicts
      // View's CSS and overriding height/width attrs)
      margin: '0',
      padding: '0',
      float: 'none',
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

      ...getFilterStyle(),

      ...(overlay && {
        // when image is contained in overlay,
        // avoid extra space at bottom from inline/line-height
        display: 'block'
      }),

      ...(supportsObjectFit && {
        ...(isCover && imgCoverStyle),
        ...(isContain && imgContainStyle)
      })
    }
  }
}

export default generateStyle
