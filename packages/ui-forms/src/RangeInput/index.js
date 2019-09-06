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
import classnames from 'classnames'

import { ContextView } from '@instructure/ui-layout'
import { controllable } from '@instructure/ui-prop-types'
import { FormField, FormPropTypes } from '@instructure/ui-form-field'
import { addEventListener } from '@instructure/ui-dom-utils'
import { uid } from '@instructure/uid'
import { themeable } from '@instructure/ui-themeable'
import { testable } from '@instructure/ui-testable'
import { omitProps, pickProps } from '@instructure/ui-react-utils'
import { isEdge } from '@instructure/ui-utils'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/
@testable()
@themeable(theme, styles)
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

  constructor (props) {
    super()

    if (typeof props.value === 'undefined') {
      this.state = {
        value: props.defaultValue
      }
    }

    this.defaultId = uid('RangeInput')
  }

  /* workaround for https://github.com/facebook/react/issues/554 */
  componentDidMount () {
    if (!this._input) {
      return
    }
    // https://connect.microsoft.com/IE/Feedback/Details/856998
    this.inputListener = addEventListener(this._input, 'input', this.handleChange)
    this.changeListener = addEventListener(this._input, 'change', this.handleChange)
  }

  componentWillUnmount () {
    if (!this._input) {
      return
    }
    this.inputListener.remove()
    this.changeListener.remove()
  }
  /* end workaround */

  handleChange = (event) => {
    const { onChange, value } = this.props

    if (typeof value === 'undefined') {
      this.setState({ value: event.target.value })
    }

    if (typeof onChange === 'function') {
      onChange(event.target.value)
    }
  }

  // controlled input must have an onChange, but we're handling it with native events
  noopChange = () => {}

  get value () {
    return (typeof this.props.value === 'undefined') ? this.state.value : this.props.value
  }

  get invalid () {
    return this.props.messages && this.props.messages.findIndex((message) => { return message.type === 'error' }) >= 0
  }

  get id () {
    return this.props.id || this.defaultId
  }

  renderValue () {
    if (this.props.displayValue) {
      return (
        <ContextView background="inverse" placement="end center">
          <output htmlFor={this.id} className={styles.value}>
            {this.props.formatValue(this.value)}
          </output>
        </ContextView>
      )
    }
  }

  render () {
    const {
      formatValue,
      size,
      disabled,
      readOnly
    } = this.props

    const props = omitProps(this.props, RangeInput.propTypes)

    const classes = {
      [styles.root]: true,
      [styles[size]]: size,
      [styles.edge16Up]: isEdge
    }

    /* eslint-disable jsx-a11y/no-redundant-roles */
    return (
      <FormField
        {...pickProps(this.props, FormField.propTypes)}
        id={this.id}
      >
        <div className={classnames(classes)}>
          <input
            className={styles.input}
            ref={(c) => { this._input = c }}
            type="range"
            role="slider"
            id={this.id}
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
            value={this.value}
            onChange={this.noopChange}
            aria-valuenow={this.value}
            aria-valuemin={this.props.min}
            aria-valuemax={this.props.max}
            aria-valuetext={formatValue(this.value, this.props.max)}
            {...props}
            disabled={disabled || readOnly}
            aria-disabled={disabled || readOnly ? 'true' : null}
          />
          {this.renderValue()}
        </div>
      </FormField>
    )
    /* eslint-enable jsx-a11y/no-redundant-roles */
  }
}

export default RangeInput
export { RangeInput }
