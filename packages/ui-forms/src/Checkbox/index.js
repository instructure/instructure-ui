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
import { FormPropTypes  } from '@instructure/ui-form-field'
import { deprecated } from '@instructure/ui-react-utils'
import { Checkbox as UICheckbox } from '@instructure/ui-checkbox'
import { CheckboxFacade } from './CheckboxFacade'
import { ToggleFacade } from './ToggleFacade'

/**
---
category: components/deprecated
id: DeprecatedCheckbox
---
**/
@deprecated('7.0.0', null, 'Use Checkbox from ui-checkbox instead.')
class Checkbox extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
    id: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    /**
    * object with shape: `{
    * text: PropTypes.string,
    * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *   }`
    */
    messages: PropTypes.arrayOf(FormPropTypes.message),
    /* whether to set the input to checked or not on initial render */
    defaultChecked: PropTypes.bool,
    /**
    * whether the input is checked or not (must be accompanied by an `onChange` prop)
    */
    checked: controllable(PropTypes.bool, 'onChange', 'defaultChecked'),
    /**
    * when used with the `checked` prop, the component will not control its own state
    */
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    /**
     * Whether or not to disable the checkbox
     */
    disabled: PropTypes.bool,
    /**
     * Works just like disabled but keeps the same styles as if it were active
     */
    readOnly: PropTypes.bool,
    /**
    * Visual state showing that child checkboxes are a combination of checked and unchecked
    */
    indeterminate: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['simple', 'toggle']),
    inline: PropTypes.bool,
    labelPlacement: PropTypes.oneOf(['top', 'start', 'end'])
  }

  static defaultProps = {
    size: 'medium',
    variant: 'simple',
    disabled: false,
    inline: false,
    indeterminate: false,
    readOnly: false,
    onChange: undefined,
    onKeyDown: undefined,
    onFocus: undefined,
    onBlur: undefined,
    onMouseOut: undefined,
    onMouseOver: undefined,
    checked: undefined,
    defaultChecked: undefined,
    messages: undefined,
    id: undefined,
    value: undefined,
    labelPlacement: 'end'
  }

  _checkbox = null

  get id () {
    return this._checkbox && this._checkbox.id
  }

  get checked () {
    return this._checkbox && this._checkbox.checked
  }

  get focused () {
    return this._checkbox && this._checkbox.focused
  }

  focus () {
    this._checkbox && this._checkbox.focus()
  }

  render () {
    return (
      <UICheckbox
        ref={(component) => { this._checkbox = component }}
        {...this.props}
      />
    )
  }
}

export default Checkbox
export { Checkbox, CheckboxFacade, ToggleFacade }
