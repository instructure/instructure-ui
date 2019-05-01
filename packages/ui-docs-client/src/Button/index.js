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

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { darken } from '@instructure/ui-color-utils'
import { Button as BaseButton } from '@instructure/ui-buttons'

class Button extends Component {
  static propTypes = {
    theme: PropTypes.object,
    variant: PropTypes.string
  }

  static defaultProps = {
    variant: 'icon',
    theme: {}
  }

  focus () {
    this._button.focus()
  }

  render () {
    const color = '#0084D1'
    return (
      <BaseButton
        {...this.props}
        ref={(c) => { this._button = c }}
        variant={this.props.variant}
        theme={{
          iconColor: color,
          iconFocusBoxShadow: `inset 0 0 0 1px ${color}`,
          iconHoverColor: color,
          linkColor: color,
          linkHoverColor: darken(color, 10)
        }}
      />
    )
  }
}

export default Button
export { Button }
