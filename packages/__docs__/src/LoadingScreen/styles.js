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

const docsLoadingAnimation = keyframes`
  to {
    transform: scale(1) rotate(0);
  }`
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
  const spinnerBeforeAfterStyles = {
    content: '""',
    display: 'block',
    position: 'absolute',
    boxSizing: 'border-box',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: '#ea2127',
    transform: 'scale(0) rotate(1turn)',
    animationName: docsLoadingAnimation,
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationDirection: 'alternate'
  }
  return {
    loadingScreen: {
      label: 'loadingScreen',
      textAlign: 'center',
      margin: '2rem auto',
      width: '6rem',
      height: '6rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    loadingScreen__spinner: {
      label: 'loadingScreen__spinner',
      display: 'inline-block',
      position: 'relative',
      width: '2rem',
      height: '2rem',
      '&::before': spinnerBeforeAfterStyles,
      '&::after': {
        ...spinnerBeforeAfterStyles,
        animationDirection: 'alternate-reverse',
        background: '#f68e1f'
      }
    },
    loadingScreen__text: {
      label: 'loadingScreen__text',
      paddingTop: '1rem',
      textTransform: 'uppercase',
      fontSize: 'small',
      color: '#666'
    }
  }
}

export default generateStyle
