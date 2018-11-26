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
  sections: 'level',
  permutations: [
    'level',
    'border',
    'ellipsis',
    { color: [
      'primary',
      'secondary',
      'primary-inverse',
      'secondary-inverse',
      'inherit'
    ]}
  ],
  renderProps: (props) => {
    return {
      componentProps: {
        children: 'Hello this is a test heading',
        margin: 'medium none'
      },
      exampleProps: {
        background: [
          'primary-inverse',
          'secondary-inverse'
        ].includes(props.color) ? 'inverse' : 'default',
        width: props.ellipsis ? '10rem' : '100%'
      },
      filter: (
        props.type === 'notification' && props.countUntil ||
        props.standalone && props.placement !== 'start top'
      )
    }
  }
}
