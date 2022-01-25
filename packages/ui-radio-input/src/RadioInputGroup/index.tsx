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
import { testable } from '@instructure/ui-testable'
import {
  matchComponentTypes,
  safeCloneElement,
  omitProps,
  pickProps,
  withSSR
} from '@instructure/ui-react-utils'

import { RadioInput } from '../RadioInput'
import type { RadioInputProps } from '../RadioInput/props'

import type { RadioInputGroupProps, RadioInputGroupState } from './props'
import { allowedProps, propTypes } from './props'

import { generateId } from '@instructure/ui-utils'

type RadioInputChild = React.ComponentElement<RadioInputProps, RadioInput>

/**
---
category: components
---
@tsProps
**/
@withSSR()
@testable()
class RadioInputGroup extends Component<
  RadioInputGroupProps,
  RadioInputGroupState
> {
  static readonly componentId = 'RadioInputGroup'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    disabled: false,
    variant: 'simple',
    size: 'medium',
    layout: 'stacked',
    readOnly: false
  }

  ref: Element | null = null

  private readonly _messagesId: string

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  constructor(props: RadioInputGroupProps) {
    super(props)

    if (typeof props.value === 'undefined') {
      this.state = {
        value: props.defaultValue
      }
    }

    this._messagesId = generateId(
      'RadioInputGroup-messages',
      //@ts-expect-error props.instanceMapCounter
      this.props.instanceMapCounter
    )
  }

  get hasMessages() {
    return !!this.props.messages && this.props.messages.length > 0
  }

  handleChange: RadioInputProps['onChange'] = (e) => {
    const value = e.target.value

    if (this.props.disabled || this.props.readOnly) {
      e.preventDefault()
      return
    }

    if (typeof this.props.value === 'undefined') {
      this.setState({ value })
    }

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(e, value)
    }
  }

  get value() {
    return typeof this.props.value === 'undefined'
      ? this.state.value
      : this.props.value
  }

  renderChildren() {
    const { children, name, variant, size, disabled, readOnly } = this.props

    // This adds the passed in name property to each RadioInput component
    // and checks the input whose value matches the value property
    return Children.map(children, (child, index) => {
      if (matchComponentTypes<RadioInputChild>(child, [RadioInput])) {
        const isChecked = this.value === child.props.value
        const defaultFocus = !this.value && index === 0
        return safeCloneElement(child, {
          name,
          disabled: disabled || child.props.disabled,
          variant,
          size,
          checked: isChecked,
          onChange: this.handleChange,
          readOnly: readOnly || child.props.readOnly,
          width: child.props.width || 'auto',
          'aria-describedby': this.hasMessages ? this._messagesId : undefined,
          // only one radio in a group should be considered tabbable
          // if a radio is checked, it should be the input to receive focus when tabbed to
          // if none of the inputs are checked, the first should receive the focus
          tabIndex: isChecked || defaultFocus ? 0 : -1,
          label: child.props.label
        })
      } else {
        return child // ignore (but preserve) children that aren't RadioInput
      }
    })
  }

  render() {
    const { variant, layout, description } = this.props

    return (
      <FormFieldGroup
        {...omitProps(this.props, RadioInputGroup.allowedProps)}
        {...pickProps(this.props, FormFieldGroup.allowedProps)}
        description={description}
        // TODO: split out toggle variant into its own component
        layout={
          layout === 'columns' && variant === 'toggle' ? 'stacked' : layout
        } // toggles already display in cols
        vAlign={variant === 'toggle' ? 'middle' : 'top'}
        rowSpacing="small"
        colSpacing={variant === 'toggle' ? 'none' : 'small'} // keep toggles close together
        startAt={variant === 'toggle' ? 'small' : undefined}
        messagesId={this._messagesId}
        elementRef={this.handleRef}
      >
        {this.renderChildren()}
      </FormFieldGroup>
    )
  }
}

export default RadioInputGroup
export { RadioInputGroup }
