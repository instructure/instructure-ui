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

export default {
  sections: 'size',
  permutations: [
    'color',
    'size',
    'weight',
    'fontStyle',
    'letterSpacing',
    'transform',
    'lineHeight',
  ],
  maxExamplesPerPage: 50,
  renderProps: (props) => {
    return {
      componentProps: {
        children: ['x-small', 'small', 'medium', 'large'].includes(props.size) ? (
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ullamco'
        ) : (
          'Lorem ipsum dolor sit amet, consectetur'
        )
      },
      exampleProps: {
        background: props.color.includes('inverse') ? 'inverse' : 'default',
        maxWidth: '25rem'
      },
      filter: props.color !== 'primary' && !(
        props.weight === 'normal' &&
        props.fontStyle === 'normal' &&
        props.letterSpacing === 'normal' &&
        props.transform === 'none' &&
        props.lineHeight === 'default'
      )
    }
  }
}
