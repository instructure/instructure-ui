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

import { FormFieldGroup } from '@instructure/ui-form-field'
import { uid } from '@instructure/uid'
import {
  matchComponentTypes,
  safeCloneElement,
  pickProps,
  omitProps
} from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { Checkbox } from '../Checkbox'
import type { CheckboxProps } from '../Checkbox/props'

import { propTypes, allowedProps } from './props'
import type { CheckboxGroupProps, CheckboxGroupState } from './props'

/**
---
category: components
---
@tsProps
**/

@testable()
class CheckboxGroup extends Component<CheckboxGroupProps, CheckboxGroupState> {
  static readonly componentId = 'CheckboxGroup'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    disabled: false,
    readOnly: false,
    size: 'medium',
    layout: 'stacked',
    children: null
  }

  constructor(props: CheckboxGroupProps) {
    super(props)

    if (typeof props.value === 'undefined') {
      this.state = {
        value: props.defaultValue || []
      }
    }

    this._messagesId = uid('CheckboxGroup-messages')
  }
  private _messagesId: string
  ref: Element | null = null

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  get hasMessages() {
    return this.props.messages && this.props.messages.length > 0
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    return Children.map(children, (child) => {
      if (matchComponentTypes(child, [Checkbox])) {
        return safeCloneElement(child as React.ReactElement, {
          key: `${
            (child as React.ComponentElement<CheckboxProps, Checkbox>).props
              .name
          }`,
          name,
          disabled:
            disabled ||
            (child as React.ComponentElement<CheckboxProps, Checkbox>).props
              .disabled,
          readOnly:
            readOnly ||
            (child as React.ComponentElement<CheckboxProps, Checkbox>).props
              .readOnly,
          size,
          checked:
            this.value.indexOf(
              (child as React.ComponentElement<CheckboxProps, Checkbox>).props
                .value!
            ) > -1,
          onChange: this.handleChange,
          width:
            (child as React.ComponentElement<CheckboxProps, Checkbox>).props
              .width || 'auto',
          'aria-describedby': this.hasMessages ? this._messagesId : ''
        })
      } else {
        return child
      }
    })
  }

  render() {
    return (
      <FormFieldGroup
        {...omitProps(this.props, CheckboxGroup.allowedProps)}
        {...pickProps(this.props, FormFieldGroup.allowedProps)}
        description={this.props.description}
        rowSpacing="small"
        vAlign="top"
        messagesId={this._messagesId}
        elementRef={this.handleRef}
      >
        {this.renderChildren()}
      </FormFieldGroup>
    )
  }
}

export default CheckboxGroup
export { CheckboxGroup }
