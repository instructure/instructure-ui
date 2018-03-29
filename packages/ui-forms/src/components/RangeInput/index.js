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

import ContextBox from '@instructure/ui-elements/lib/components/ContextBox'

import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import addEventListener from '@instructure/ui-utils/lib/dom/addEventListener'
import { pickProps, omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import uid from '@instructure/ui-utils/lib/uid'

import FormField from '../FormField'
import FormPropTypes from '../../utils/FormPropTypes'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/forms
---
**/
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
    value: CustomPropTypes.controllable(PropTypes.number),
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
    inline: PropTypes.bool
  }

  static defaultProps = {
    step: 1,
    formatValue: (val) => val,
    max: 0,
    min: 0,
    inline: false,
    size: 'medium',
    layout: 'stacked',
    displayValue: true
  }

  constructor (props) {
    super()

    if (props.value === undefined) {
      this.state = {
        value: props.defaultValue
      }
    }

    this.defaultId = `RangeInput_${uid()}`
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

    if (value === undefined) {
      this.setState({ value: event.target.value })
    }

    if (typeof onChange === 'function') {
      onChange(event.target.value)
    }
  }

  // controlled input must have an onChange, but we're handling it with native events
  noopChange = () => {}

  get value () {
    return (this.props.value === undefined) ? this.state.value : this.props.value
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
        <ContextBox variant="inverse" placement="end">
          <output htmlFor={this.id} className={styles.value}>
            {this.props.formatValue(this.value)}
          </output>
        </ContextBox>
      )
    }
  }

  render () {
    const {
      formatValue,
      size
    } = this.props

    const props = omitProps(this.props, RangeInput.propTypes)

    const classes = {
      [styles.root]: true,
      [styles[size]]: size
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
          />
          {this.renderValue()}
        </div>
      </FormField>
    )
    /* eslint-enable jsx-a11y/no-redundant-roles */
  }
}

export default RangeInput
