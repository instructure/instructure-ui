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

import React, { Children, Component, ReactElement } from 'react'
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

type Props = {
  name: string
  description: React.ReactNode
  defaultValue?: any[]
  value?: any // TODO: controllable(PropTypes.array)
  onChange?: (...args: any[]) => any
  disabled?: boolean
  readOnly?: boolean
  messages?: any[] // TODO: FormPropTypes.message
  size?: 'small' | 'medium' | 'large'
  layout?: 'stacked' | 'columns' | 'inline'
}

/**
---
category: components
---
**/

@testable()
class CheckboxGroup extends Component<Props> {
  static componentId = 'CheckboxGroup'

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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
    super()

    if (typeof props.value === 'undefined') {
      this.state = {
        value: props.defaultValue
      }
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_messagesId' does not exist on type 'Che... Remove this comment to see the full error message
    this._messagesId = uid('CheckboxGroup-messages')
  }

  get hasMessages() {
    return this.props.messages && this.props.messages.length > 0
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
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
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
      typeof this.state.value === 'undefined'
    ) {
      return []
    } else {
      return typeof this.props.value === 'undefined'
        ? // @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
          [...this.state.value]
        : [...this.props.value]
    }
  }

  renderChildren() {
    const { children, name, size, disabled, readOnly } = this.props

    // @ts-expect-error ts-migrate(6133) FIXME: 'index' is declared but its value is never read.
    return Children.map(children, (child, index) => {
      if (matchComponentTypes(child, [Checkbox])) {
        return safeCloneElement(child as ReactElement, {
          // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
          key: `${child.props.name}`,
          name,
          // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
          disabled: disabled || child.props.disabled,
          // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
          readOnly: readOnly || child.props.readOnly,
          size,
          // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
          checked: this.value.indexOf(child.props.value) > -1,
          onChange: this.handleChange,
          // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
          width: child.props.width || 'auto',
          // @ts-expect-error ts-migrate(2339) FIXME: Property '_messagesId' does not exist on type 'Che... Remove this comment to see the full error message
          'aria-describedby': this.hasMessages && this._messagesId
        })
      } else {
        return child
      }
    })
  }

  render() {
    return (
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <FormFieldGroup
        {...omitProps(this.props, CheckboxGroup.propTypes)}
        {...pickProps(this.props, FormFieldGroup.propTypes)}
        rowSpacing="small"
        vAlign="top"
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_messagesId' does not exist on type 'Che... Remove this comment to see the full error message
        messagesId={this._messagesId}
      >
        {this.renderChildren()}
      </FormFieldGroup>
    )
  }
}

export default CheckboxGroup
export { CheckboxGroup }
