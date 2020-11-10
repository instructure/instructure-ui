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
const generateStyle = (theme, themeOverride, { size, variant, shape, src }, { loaded }) => {
  const themeSpecificStyles = {
    canvas: {
      color: 'red'
    }
  }

  const fromTheme = {
    color: theme?.colors?.textBrand,
    background: theme?.colors?.backgroundLightest,
    borderWidthSmall: theme?.borders?.widthSmall,
    borderWidthMedium: theme?.borders?.widthMedium,
    borderColor: theme?.colors?.borderMedium,
    fontFamily: theme?.typography?.fontFamily,
    fontWeight: theme?.typography?.fontWeightBold,
    ...themeSpecificStyles[theme.key],
    ...themeOverride
  }

  const sizeStyles = {
    auto: {
      fontSize: 'inherit',
      borderWidth: fromTheme.borderWidthSmall,
    },
    'x-small': {
      fontSize: '0.75rem',
      borderWidth: fromTheme.borderWidthSmall
    },
    small: {
      fontSize: '1rem',
      borderWidth: fromTheme.borderWidthSmall
    },
    medium: {
      fontSize: '1.25rem',
      borderWidth: fromTheme.borderWidthMedium,
    },
    large: {
      fontSize: '1.5rem',
      borderWidth: fromTheme.borderWidthMedium,
    },
    'x-large': {
      fontSize: '1.75rem',
      borderWidth: fromTheme.borderWidthMedium,
    }
  }

  const variantStyles = {
    circle:{
      width: '2.5em',
      position: 'relative',
      borderRadius: '100%',
      overflow: 'hidden',
    },
    rectangle:{
      width: '3em',
    }
  }

return {
  root: {
    label: 'root',
    height: '2.5em',
    borderStyle: 'solid',
    borderColor: fromTheme.borderColor,
    boxSizing: 'border-box',
    backgroundColor: fromTheme.background,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundClip: 'content-box',
    backgroundRepeat: 'no-repeat',
    overflow: 'hidden',
    lineHeight: 0,
    textAlign: 'center',
    backgroundImage: loaded ? `url('${src}')` : undefined,
    ...sizeStyles[size],
    ...variantStyles[variant || shape]
  },
  initials: {
    label: 'initials',
    color: fromTheme.color,
    lineHeight: '2.375em',
    fontFamily: fromTheme.fontFamily,
    fontWeight: fromTheme.fontWeight,
    letterSpacing: '0.0313em'
  },
  loadImage: {
    label: 'loadImage',
    display: 'none'
  }
 }
}
export default generateStyle
