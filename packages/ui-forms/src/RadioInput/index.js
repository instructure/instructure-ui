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

import { deprecated } from '@instructure/ui-react-utils'

import { RadioInput as UIRadioInput } from '@instructure/ui-radio-input'
/**
---
category: components/deprecated
id: DeprecatedRadioInput
---
**/
@deprecated('7.0.0', null, 'Use RadioInput from ui-radio-input instead.')
class RadioInput extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    id: PropTypes.string,
    name: PropTypes.string,
    checked: PropTypes.bool,
    /**
     * Whether or not to disable the input
     */
    disabled: PropTypes.bool,
    /**
     * Works just like disabled but keeps the same styles as if it were active
     */
    readOnly: PropTypes.bool,
    variant: PropTypes.oneOf(['simple', 'toggle']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    context: PropTypes.oneOf(['success', 'warning', 'danger', 'off']),
    inline: PropTypes.bool,
    onClick: PropTypes.func,
    onChange: PropTypes.func
  }

  static defaultProps = {
    onClick: function (event) {},
    onChange: function (event) {},
    variant: 'simple',
    size: 'medium',
    disabled: false,
    inline: false,
    context: 'success',
    readOnly: false,
    checked: undefined,
    id: undefined,
    name: undefined,
    value: undefined
  }

  _radioInput = null

  focus () {
    this._radioInput && this._radioInput.focus()
  }

  get id () {
    return this._radioInput && this._radioInput.id
  }

  get focused () {
    return this._radioInput && this._radioInput.focused
  }

  get checked () {
    return this._radioInput && this._radioInput.checked
  }

  render () {
    return (
      <UIRadioInput
        ref={(component) => { this._radioInput = component }}
        {...this.props}
      />
    )
  }
}

export default RadioInput
export { RadioInput }
