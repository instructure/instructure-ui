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

import React from 'react'

export default {
  sectionProp: 'color',
  maxExamplesPerPage: 15,
  maxExamples: 400,
  propValues: {
    withArrow: [true, false],
    placement: ['bottom center'],
    dir: ['rtl', 'ltr']
  },
  excludeProps: [
    'shouldCloseOnDocumentClick',
    'shouldCloseOnEscape',
    'shouldReturnFocus',
    'shouldFocusContentOnTriggerBlur',
    'defaultIsShowingContent',
    'shouldContainFocus'
  ],
  // @ts-expect-error ts-migrate(6133) FIXME: 'props' is declared but its value is never read.
  getComponentProps: (props) => {
    return {
      defaultIsShowingContent: true,
      placement: 'bottom center',
      renderTrigger: <button>Show Popup</button>,
      children: <h2>Hello World</h2>
    }
  },
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  getExampleProps: (props) => {
    return {
      dir: props.dir,
      as: 'div',
      width: '100%',
      height: '11rem',
      margin: 'small',
      padding: 'small',
      textAlign: 'center'
    }
  },
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  filter: (props) => {
    // only generate 1 example if its not showing content
    return (
      !props.isShowingContent &&
      (props.color !== 'primary' ||
        props.dir !== 'ltr' ||
        props.insertAt !== 'bottom' ||
        props.placement !== 'bottom center' ||
        props.shouldAlignArrow !== false ||
        props.shouldRenderOffscreen !== false ||
        props.shouldTrackPosition !== false ||
        props.withArrow !== false)
    )
  }
}
