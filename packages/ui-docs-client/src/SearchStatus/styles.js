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

import { keyframes } from '@instructure/emotion'

// keyframes have to be outside of 'generateStyle',
// since it is causing problems in style recalculation
const scaleUp = keyframes`
  to {
    transform: scale(1);
  }`

/**
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (componentTheme, props, state) => {
  const { status } = props

  const activeStyle =
    status === 'active'
      ? {
          transform: 'rotate(45deg)'
        }
      : {}

  const boxActiveStyle =
    status === 'active'
      ? {
          transform: 'scale(0.5)',
          animationName: scaleUp,
          animationDuration: '0.5s',
          animationDirection: 'alternate',
          animationIterationCount: 'infinite'
        }
      : {}

  return {
    searchStatus: {
      label: 'searchStatus',
      display: 'block',
      position: 'relative',
      ...activeStyle
    },
    box: {
      label: 'searchStatus__box',
      display: 'block',
      position: 'absolute',
      width: '46%',
      height: '46%',
      opacity: 1,
      ...boxActiveStyle,
      '&:nth-of-type(1)': {
        insetInlineStart: 0,
        top: 0,
        background: componentTheme.colorBrand
      },
      '&:nth-of-type(2)': {
        insetInlineEnd: 0,
        top: 0,
        background: componentTheme.colorAlert,
        animationDelay: '0.1s'
      },
      '&:nth-of-type(3)': {
        insetInlineStart: 0,
        bottom: 0,
        background: componentTheme.colorWarning,
        animationDelay: '0.2s'
      },
      '&:nth-of-type(4)': {
        insetInlineEnd: 0,
        bottom: 0,
        background: componentTheme.colorDanger,
        animationDelay: '0.3s'
      }
    }
  }
}

export default generateStyle
