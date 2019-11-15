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

import { controllable } from '@instructure/ui-prop-types'
import { FormPropTypes } from '@instructure/ui-form-field'
import { RangeInput as UIRangeInput } from '@instructure/ui-range-input'
import { themeable } from '@instructure/ui-themeable'
import { testable } from '@instructure/ui-testable'
import { deprecated } from '@instructure/ui-react-utils'

import theme from './theme'

/**
---
category: components/deprecated
id: DeprecatedRangeInput
---
**/

@deprecated('7.0.0', null, 'Use RangeInput from ui-range-input instead.')
@testable()
@themeable(theme)
class RangeInput extends Component {
  static propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    /**
    * value to set on initial render
    */
    defaultValue: PropTypes.number,
    /**
    * the selected value (must be accompanied by an `onChange` prop)
    */
    value: controllable(PropTypes.number),
    /**
    * when used with the `value` prop, the component will not control its own state
    */
    onChange: PropTypes.func,
    messages: PropTypes.arrayOf(FormPropTypes.message),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    layout: PropTypes.oneOf(['stacked', 'inline']),
    id: PropTypes.string,
    label: PropTypes.node.isRequired,
    /**
    * whether to display the current value
    */
    displayValue: PropTypes.bool,
    step: PropTypes.number,
    /**
    * A function to format the displayed value
    */
    formatValue: PropTypes.func,
    inline: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool
  }

  static defaultProps = {
    step: 1,
    formatValue: (val) => val,
    max: 0,
    min: 0,
    inline: false,
    size: 'medium',
    layout: 'stacked',
    displayValue: true,
    disabled: false,
    readOnly: false,
    id: undefined,
    defaultValue: undefined,
    value: undefined,
    onChange: undefined,
    messages: undefined
  }

  _rangeInput = null

  get id () {
    return this._rangeInput && this._rangeInput.id
  }

  get value () {
    return this._rangeInput && this._rangeInput.value
  }

  get invalid () {
    return this._rangeInput && this._rangeInput.invalid
  }

  render () {
    return (
      <UIRangeInput
        ref={(component) => { this._rangeInput = component }}
        {...this.props}
      />
    )
  }
}

export default RangeInput
export { RangeInput }
