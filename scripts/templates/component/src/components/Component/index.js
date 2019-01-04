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

import { Component } from 'react'
import PropTypes from 'prop-types'

/**
---
category: components
---
**/
class ${COMPONENT} extends Component {
  static propTypes = {
    /**
     * @param {Object} renderProps
     * @param {Function} renderProps.getViewProps - Props to be spread onto the view element
     */
    children: PropTypes.func,
    /**
     * Identical to children
     */
    render: PropTypes.func,
  }

  render () {
    const { children, render = children } = this.props

    if (typeof render === 'function') {
      return render({
        getViewProps: (props) => {
          return {
            /* component specific view props go here */
            /* consumers can override them by passing in an overrides object */
            ...props
          }
        }
      })
    } else {
     return null
    }
  }
}

export default ${COMPONENT}
export { default as ${COMPONENT}View } from './${COMPONENT}View'
