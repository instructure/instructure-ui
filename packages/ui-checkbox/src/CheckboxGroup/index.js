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

import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'

import {
  controllable,
  Children as ChildrenPropTypes
} from '@instructure/ui-prop-types'
import { FormPropTypes, FormFieldGroup } from '@instructure/ui-form-field'
import { uid } from '@instructure/uid'
import {
  matchComponentTypes,
  safeCloneElement,
  pickProps,
  omitProps
} from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { Checkbox } from '../Checkbox'

/**
---
category: components
---
**/

@testable()
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
    layout: PropTypes.oneOf(['stacked', 'columns', 'inline'])
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

  constructor(props) {
    super()

    if (typeof props.value === 'undefined') {
      this.state = {
        value: props.defaultValue
      }
    }

    this._messagesId = uid('CheckboxGroup-messages')
  }

  get hasMessages() {
    return this.props.messages && this.props.messages.length > 0
  }

  handleChange = (e) => {
    const newValue = this.value || []

    if (this.props.disabled || this.props.readOnly) {
      e.preventDefault()
      return
    }

    if (e.target.checked) {
      newValue.push(e.target.value)
    } else {
      newValue.splice(newValue.indexOf(e.target.value), 1)
    }

    if (typeof this.props.value === 'undefined') {
      this.setState({ value: newValue })
    }

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(newValue)
    }
  }

  get value() {
    if (
      typeof this.props.value === 'undefined' &&
      typeof this.state.value === 'undefined'
    ) {
      return []
    } else {
      return typeof this.props.value === 'undefined'
        ? [...this.state.value]
        : [...this.props.value]
    }
  }

  renderChildren() {
    const { children, name, size, disabled, readOnly } = this.props

    return Children.map(children, (child, index) => {
      if (matchComponentTypes(child, [Checkbox])) {
        return safeCloneElement(child, {
          key: `${child.props.name}`,
          name,
          disabled: disabled || child.props.disabled,
          readOnly: readOnly || child.props.readOnly,
          size,
          checked: this.value.indexOf(child.props.value) > -1,
          onChange: this.handleChange,
          width: child.props.width || 'auto',
          'aria-describedby': this.hasMessages && this._messagesId
        })
      } else {
        return child
      }
    })
  }

  render() {
    return (
      <FormFieldGroup
        {...omitProps(this.props, CheckboxGroup.propTypes)}
        {...pickProps(this.props, FormFieldGroup.propTypes)}
        rowSpacing="small"
        vAlign="top"
        messagesId={this._messagesId}
      >
        {this.renderChildren()}
      </FormFieldGroup>
    )
  }
}

export default CheckboxGroup
export { CheckboxGroup }
