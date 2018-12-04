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
import keycode from 'keycode'

import FormField from '@instructure/ui-form-field/lib/components/FormField'
import FormPropTypes from '@instructure/ui-form-field/lib/utils/FormPropTypes'
import IconArrowOpenDown from '@instructure/ui-icons/lib/Line/IconArrowOpenDown'
import IconArrowOpenUp from '@instructure/ui-icons/lib/Line/IconArrowOpenUp'
import generateElementId from '@instructure/ui-utils/lib/dom/generateElementId'
import themeable from '@instructure/ui-themeable'
import { pickProps, omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
id: NumberInputControlled
---
**/
@themeable(theme, styles)
export default class NumberInput extends Component {
  static propTypes = {
    /**
     * Whether or not to disable the input.
     */
    disabled: PropTypes.bool,
    id: PropTypes.string,
    inline: PropTypes.bool,
    /**
     * A function that provides a reference to the actual input element.
     */
    inputRef: PropTypes.func,
    label: PropTypes.node.isRequired,
    layout: PropTypes.oneOf(['stacked', 'inline']),
    /**
     * Object with shape: `{
     *   text: PropTypes.string,
     *   type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
     * }`
     */
    messages: PropTypes.arrayOf(FormPropTypes.message),
    onBlur: PropTypes.func,
    /**
     * Called when the value of the input changes. The first argument is an
     * event object; the second argument is the string value of the input.
     */
    onChange: PropTypes.func,
    /**
     * Called when the down arrow button is clicked, or the down arrow key is
     * pressed.
     */
    onDecrement: PropTypes.func,
    onFocus: PropTypes.func,
    /**
     * Called when the up arrow button is clicked, or the up arrow key is
     * pressed.
     */
    onIncrement: PropTypes.func,
    onKeyDown: PropTypes.func,
    /**
     * Html placeholder text to display when the input has no value. This
     * should be hint text, not a label replacement.
     */
    placeholder: PropTypes.string,
    /**
     * Works just like disabled but keeps the same styles as if it were active.
     */
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    /**
     * Whether or not to diplay the up/down arrow buttons.
     */
    showArrows: PropTypes.bool,
    size: PropTypes.oneOf(['medium', 'large']),
    /**
     * The value of the input (should be accompanied by an `onChange` prop).
     */
    value: PropTypes.string,
    width: PropTypes.string
  }

  static defaultProps = {
    disabled: false,
    id: null,
    inline: false,
    inputRef: function (input) {},
    layout: 'stacked',
    messages: [],
    onBlur: function (event) {},
    onChange: function (event, value) {},
    onDecrement: function (event) {},
    onFocus: function (event) {},
    onIncrement: function (event) {},
    onKeyDown: function (event) {},
    placeholder: null,
    readOnly: false,
    required: false,
    showArrows: true,
    size: 'medium',
    width: null
  }

  state = {
    focus: false
  }

  input = null

  get id () {
    if (this.props.id) {
      return this.props.id
    }
    if (!this._id) {
      this._id = generateElementId('NumberInput')
    }
    return this._id
  }

  get invalid () {
    return (
      this.props.messages &&
      this.props.messages.some((message) => message.type === 'error')
    )
  }

  handleRef = (element) => {
    this.input = element
    this.props.inputRef(element)
  }

  handleFocus = (event) => {
    this.setState({ focus: true })
    this.props.onFocus(event)
  }

  handleBlur = (event) => {
    this.setState({ focus: false })
    this.props.onBlur(event)
  }

  handleChange = (event) => {
    this.props.onChange(event, event.target.value)
  }

  handleKeyDown = (event) => {
    this.props.onKeyDown(event)

    if (event.keyCode === keycode.codes.down) {
      event.preventDefault()
      this.props.onDecrement(event)
    } else if (event.keyCode === keycode.codes.up) {
      event.preventDefault()
      this.props.onIncrement(event)
    }
  }

  handleClickUpArrow = (event) => {
    this.arrowClicked(event, this.props.onIncrement)
  }

  handleClickDownArrow = (event) => {
    this.arrowClicked(event, this.props.onDecrement)
  }

  arrowClicked (event, callback) {
    event.preventDefault()
    if (this.props.disabled || this.props.readOnly) return
    this.input.focus()
    callback(event)
  }

  renderArrows () {
    return (
      <span className={styles.arrowContainer}>
        <button
          aria-hidden
          className={styles.arrow}
          onMouseDown={this.handleClickUpArrow}
          tabIndex="-1"
        >
          <IconArrowOpenUp />
        </button>
        <button
          aria-hidden
          className={styles.arrow}
          onMouseDown={this.handleClickDownArrow}
          tabIndex="-1"
        >
          <IconArrowOpenDown />
        </button>
      </span>
    )
  }

  render () {
    const {
      disabled,
      inline,
      placeholder,
      readOnly,
      required,
      showArrows,
      size,
      value,
      width
    } = this.props

    return (
      <FormField
        {...pickProps(this.props, FormField.propTypes)}
        id={this.id}
      >
        <span
          className={classnames(styles.inputWidth, {
            [styles.focus]: this.state.focus,
            [styles.inline]: inline,
            [styles.invalid]: this.invalid
          })}
          style={width ? { width } : null}
        >
          <span
            className={classnames(styles.inputContainer, {
              [styles.disabled]: disabled,
              [styles.focus]: this.state.focus,
              [styles.invalid]: this.invalid,
              [styles[size]]: size
            })}
          >
            <input
              {...omitProps(this.props, { ...FormField.propTypes, ...NumberInput.propTypes })}
              aria-disabled={disabled || readOnly ? 'true' : null}
              aria-invalid={this.invalid ? 'true' : null}
              aria-required={required}
              className={styles.input}
              disabled={disabled || readOnly}
              id={this.id}
              inputMode="numeric"
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onKeyDown={this.handleKeyDown}
              placeholder={placeholder}
              ref={this.handleRef}
              required={required}
              type="text"
              value={value}
            />
            {showArrows ? this.renderArrows() : null}
          </span>
        </span>
      </FormField>
    )
  }
}
