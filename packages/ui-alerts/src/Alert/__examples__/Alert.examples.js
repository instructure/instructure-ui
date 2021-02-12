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
  sectionProp: 'variant',
  propValues: {
    renderCloseButtonLabel: [null, 'close'],
    children: [
      'An alert with some content',
      'an alert with a ton of content that is going to wrap. It takes a ton of content to ' +
        'get text to wrap when the screen is high resolution and there is a good amount of space ' +
        'to fill'
    ]
  },
  getComponentProps: (props) => {
    return {
      margin: 'medium',
      screenReaderOnly: false,
      liveRegionPoliteness: 'polite',
      transition: 'none',
      open: true
    }
  },
  filter: (props) => {
    return props.screenReaderOnly || props.open === false
  }
}
