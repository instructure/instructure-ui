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

const icon = (
  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; title: string; height: ... Remove this comment to see the full error message
  <svg title="myIcon" height="1em" width="1em" style={{ fill: 'currentcolor' }}>
    <circle cx="0.5em" cy="0.5em" r="0.5em" />
  </svg>
)

export default {
  sectionProp: 'color',
  // @ts-expect-error ts-migrate(6133) FIXME: 'props' is declared but its value is never read.
  getComponentProps: (props) => ({
    screenReaderLabel: 'Example',
    renderIcon: icon
  }),
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  getExampleProps: (props) => {
    return {
      background: props.color.includes('inverse')
        ? 'primary-inverse'
        : 'primary'
    }
  },
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  filter: (props) => {
    return (
      (props.withBackground && !props.withBorder) ||
      props.interaction === 'readonly' ||
      props.type !== 'button'
    )
  }
}
