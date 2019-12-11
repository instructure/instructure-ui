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

import { controllable, Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import { FormPropTypes } from '@instructure/ui-form-field'
import { deprecated } from '@instructure/ui-react-utils'
import { CheckboxGroup as UICheckboxGroup } from '@instructure/ui-checkbox'

import { Checkbox } from '../Checkbox'

/**
---
category: components/deprecated
id: DeprecatedCheckboxGroup
---
**/

@deprecated('7.0.0', null, 'Use CheckboxGroup from ui-checkbox instead.')
class CheckboxGroup extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.node.isRequired,
    /**
    * value to set on initial render
    */
    defaultValue: PropTypes.array,
    /**
    * the selected values (must be accompanied by an `onChange` prop)
    */
    value: controllable(PropTypes.array),
    /**
    * when used with the `value` prop, the component will not control its own state
    */
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    /**
    * object with shape: `{
    text: PropTypes.string,
    type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
      }`
    */
    messages: PropTypes.arrayOf(FormPropTypes.message),
    /**
    * children of type `Checkbox`
    */
    children: ChildrenPropTypes.oneOf([Checkbox]),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    layout: PropTypes.oneOf([
      'stacked',
      'columns',
      'inline'
    ])
  }

  static defaultProps = {
    disabled: false,
    readOnly: false,
    size: 'medium',
    layout: 'stacked',
    defaultValue: undefined,
    messages: undefined,
    value: undefined,
    onChange: undefined,
    children: null
  }

  _checkboxGroup = null

  get hasMessages () {
    return this._checkboxGroup && this._checkboxGroup.hasMessages
  }

  get value () {
    return this._checkboxGroup && this._checkboxGroup.value
  }

  render () {
    return (
      <UICheckboxGroup
        ref={(component) => { this._checkboxGroup = component }}
        {...this.props}
      />
    )
  }
}

export default CheckboxGroup
export { CheckboxGroup }
