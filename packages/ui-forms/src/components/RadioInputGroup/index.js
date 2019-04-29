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

import { controllable, Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import FormPropTypes from '@instructure/ui-form-field/lib/utils/FormPropTypes'
import uid from '@instructure/uid'
import testable from '@instructure/ui-testable'
import matchComponentTypes from '@instructure/ui-react-utils/lib/matchComponentTypes'
import safeCloneElement from '@instructure/ui-react-utils/lib/safeCloneElement'
import FormFieldGroup from '@instructure/ui-form-field/lib/components/FormFieldGroup'
import { pickProps, omitProps } from '@instructure/ui-react-utils/lib/passthroughProps'

import RadioInput from '../RadioInput'

/**
---
category: components
---
**/
@testable()
export default class RadioInputGroup extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.node.isRequired,
    /**
    * value to set on initial render
    */
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    /**
    * the selected value (must be accompanied by an `onChange` prop)
    */
    value: controllable(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])),
    /**
    * when used with the `value` prop, the component will not control its own state
    */
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    /** works just like disabled but keeps the same styles as if it were active */
    readOnly: PropTypes.bool,
    /**
    * object with shape: `{
    * text: PropTypes.string,
    * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *   }`
    */
    messages: PropTypes.arrayOf(FormPropTypes.message),
    /**
    * children of type `RadioInput`
    */
    children: ChildrenPropTypes.oneOf([RadioInput]),
    variant: PropTypes.oneOf(['simple', 'toggle']), // TODO: split toggle out to its own component
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    layout: PropTypes.oneOf([
      'stacked',
      'columns',
      'inline'
    ])
  }

  static defaultProps = {
    disabled: false,
    variant: 'simple',
    size: 'medium',
    layout: 'stacked',
    readOnly: false,
    defaultValue: undefined,
    value: undefined,
    children: null,
    messages: undefined,
    onChange: undefined
  }

  constructor (props) {
    super()

    if (typeof props.value === 'undefined') {
      this.state = {
        value: props.defaultValue
      }
    }

    this._messagesId = uid('RadioInputGroup-messages')
  }

  get hasMessages () {
    return this.props.messages && (this.props.messages.length > 0)
  }

  handleChange = (e) => {
    const value = e.target.value

    if (this.props.disabled || this.props.readOnly) {
      e.preventDefault()
      return
    }

    if (typeof this.props.value === 'undefined') {
      this.setState({value})
    }

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(e, value)
    }
  };

  get value () {
    return (typeof this.props.value === 'undefined') ? this.state.value : this.props.value
  }

  renderChildren () {
    const {
      children,
      name,
      variant,
      size,
      disabled,
      readOnly
    } = this.props

    // This adds the passed in name property to each RadioInput component
    // and checks the input whose value matches the value property
    return Children.map(children, (child, index) => {
      if (matchComponentTypes(child, [RadioInput])) {
        const isChecked = this.value === child.props.value
        const defaultFocus = !this.value && index === 0
        return safeCloneElement(child, {
          name,
          disabled: (disabled || child.props.disabled),
          variant,
          size,
          checked: isChecked,
          onChange: this.handleChange,
          readOnly: (readOnly || child.props.readOnly),
          width: child.props.width || 'auto',
          'aria-describedby': this.hasMessages && this._messagesId,
          // only one radio in a group should be considered tabbable
          // if a radio is checked, it should be the input to receive focus when tabbed to
          // if none of the inputs are checked, the first should receive the focus
          tabIndex: isChecked || defaultFocus ? '0' : '-1'
        })
      } else {
        return child // ignore (but preserve) children that aren't RadioInput
      }
    })
  }

  render () {
    const {
      variant,
      layout
    } = this.props

    return (
      <FormFieldGroup
        {...omitProps(this.props, RadioInputGroup.propTypes)}
        {...pickProps(this.props, FormFieldGroup.propTypes)}
        // TODO: split out toggle variant into its own component
        layout={(layout === 'columns' && variant === 'toggle') ? 'stacked' : layout} // toggles already display in cols
        vAlign={(variant === 'toggle') ? 'middle' : 'top'}
        rowSpacing="small"
        colSpacing={(variant === 'toggle') ? 'none' : 'small'} // keep toggles close together
        startAt={(variant === 'toggle') ? 'small' : undefined}
        messagesId={this._messagesId}
      >
        {this.renderChildren()}
      </FormFieldGroup>
    )
  }
}
