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
  const { size, href, onClick, disabled, hero, heading } = props

  const clickable = href || onClick

  const sizeVariants = {
    small: {
      billboard: { padding: componentTheme.paddingSmall },
      hero: { fontSize: '3rem' },
      message: { fontSize: componentTheme.messageFontSizeSmall },
      heading: { ...(hero && { margin: `${componentTheme.largeMargin} 0 0` }) }
    },
    medium: {
      billboard: { padding: componentTheme.paddingMedium },
      hero: { fontSize: '5rem' },
      message: { fontSize: componentTheme.messageFontSizeMedium }
    },
    large: {
      billboard: { padding: componentTheme.paddingLarge },
      hero: { fontSize: '10rem' },
      message: { fontSize: componentTheme.messageFontSizeLarge }
    }
  }

  const clickableVariants = clickable
    ? {
        appearance: 'none',
        boxSizing: 'border-box',
        cursor: 'pointer',
        userSelect: 'none',
        touchAction: 'manipulation',
        width: '100%',
        margin: '0',
        border: `${componentTheme.buttonBorderWidth} ${componentTheme.buttonBorderStyle} transparent`,
        borderRadius: componentTheme.buttonBorderRadius,
        background: componentTheme.backgroundColor,
        textDecoration: 'none',

        '&:hover': { borderStyle: componentTheme.buttonHoverBorderStyle },

        '&:hover, &:focus': {
          textDecoration: 'none',
          outline: 'none',
          borderColor: componentTheme.iconHoverColor,

          '& [class$=-billboard__hero]': {
            color: componentTheme.iconHoverColor
          }
        },
        '&:active': {
          background: componentTheme.clickableActiveBg,
          borderColor: componentTheme.iconHoverColor,

          '& [class$=-billboard__hero], & [class$=-billboard__message]': {
            color: componentTheme.clickableActiveText
          }
        }
      }
    : {
        backgroundColor: componentTheme.backgroundColor
      }

  return {
    billboard: {
      label: 'billboard',
      boxSizing: 'border-box',
      position: 'relative',
      fontFamily: componentTheme.fontFamily,
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'center',
      display: 'block',
      ...sizeVariants[size].billboard,
      ...clickableVariants,

      ...(disabled && {
        cursor: 'not-allowed',
        pointerEvents: 'none',
        opacity: 0.5
      })
    },
    content: {
      label: 'billboard__content',
      display: 'block'
    },
    hero: {
      label: 'billboard__hero',
      display: 'block',
      color: componentTheme.iconColor,
      ...sizeVariants[size].hero,

      '& > img, & > svg': {
        maxWidth: '100%',
        display: 'block',
        margin: '0 auto'
      },

      '& > img': { height: 'auto' }
    },
    heading: {
      label: 'billboard__heading',
      display: 'block',
      ...(hero && { margin: `${componentTheme.largeMargin} 0 0` }),
      ...sizeVariants[size].heading
    },
    message: {
      label: 'billboard__message',
      display: 'block',
      color: clickable
        ? componentTheme.messageColorClickable
        : componentTheme.messageColor,

      ...((hero || heading) && {
        margin: `${componentTheme.mediumMargin} 0 0`
      }),
      ...sizeVariants[size].message
    }
  }
}

export default generateStyle
