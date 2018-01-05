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
import PropTypes from 'prop-types'

export default function IconArrowDown ({ className }) {
  return (
    <svg
      x="0"
      y="0"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        role="presentation"
        fill="currentColor"
        d="M8 11.4c-0.2 0-0.4-0.1-0.6-0.2l-7-4.8C0
        6.1-0.1 5.5 0.2 5c0.3-0.5 0.9-0.6 1.4-0.3L8
        9.1l6.4-4.4c0.5-0.3 1.1-0.2 1.4 0.3 0.3 0.5
        0.2 1.1-0.3 1.4l-7 4.8C8.4 11.3 8.2 11.4 8 11.4z"
      />
    </svg>
  )
}

IconArrowDown.propTypes = {
  className: PropTypes.string
}
