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
/** @jsx jsx */
import { Component } from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'

import { FormField, FormPropTypes } from '@instructure/ui-form-field'
import {
  IconArrowOpenDownLine,
  IconArrowOpenUpLine
} from '@instructure/ui-icons'
import { uid } from '@instructure/uid'
import { testable } from '@instructure/ui-testable'
import {
  omitProps,
  pickProps,
  callRenderProp,
  getInteraction
} from '@instructure/ui-react-utils'
import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'

/**
---
category: components
id: NumberInput
---
**/
@withStyle(generateStyle)
@testable()
class NumberInput extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * The form field label.
     */
    renderLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
      .isRequired,
    /**
     * The id of the input. One is generated if not supplied.
     */
    id: PropTypes.string,
    /**
     * Specifies if interaction with the input is enabled, disabled, or readonly.
     * When "disabled", the input changes visibly to indicate that it cannot
     * receive user interactions. When "readonly" the input still cannot receive
     * user interactions but it keeps the same styles as if it were enabled.
     */
    interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
    /**
     * Object with shape: `{
     *   text: PropTypes.string,
     *   type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
     * }`
     */
    messages: PropTypes.arrayOf(FormPropTypes.message),
    /**
     * Html placeholder text to display when the input has no value. This
     * should be hint text, not a label replacement.
     */
    placeholder: PropTypes.string,
    /**
     * Whether or not the text input is required.
     */
    isRequired: PropTypes.bool,
    /**
     * Whether or not to display the up/down arrow buttons.
     */
    showArrows: PropTypes.bool,
    /**
     * The size of the input.
     */
    size: PropTypes.oneOf(['medium', 'large']),
    /**
     * The value of the input (should be accompanied by an `onChange` prop).
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * The width of the input.
     */
    width: PropTypes.string,
    /**
     * The display of the root element.
     */
    display: PropTypes.oneOf(['inline-block', 'block']),
    /**
     * A function that provides a reference to the actual input element.
     */
    inputRef: PropTypes.func,
    /**
     * Callback fired when input receives focus.
     */
    onFocus: PropTypes.func,
    /**
     * Callback fired when the input loses focus.
     */
    onBlur: PropTypes.func,
    /**
     * Callback executed when the input fires a change event.
     * @param {Object} event - the event object
     * @param {Object} value - the string value of the input
     */
    onChange: PropTypes.func,
    /**
     * Called when the down arrow button is clicked, or the down arrow key is
     * pressed.
     */
    onDecrement: PropTypes.func,
    /**
     * Called when the up arrow button is clicked, or the up arrow key is
     * pressed.
     */
    onIncrement: PropTypes.func,
    /**
     * Callback fired when a key is pressed.
     */
    onKeyDown: PropTypes.func
  }

  static defaultProps = {
    id: null,
    // Leave interaction default undefined so that `disabled` and `readOnly` can also be supplied
    interaction: undefined,
    messages: [],
    placeholder: null,
    isRequired: false,
    showArrows: true,
    size: 'medium',
    value: undefined,
    width: undefined,
    display: 'block',
    inputRef: (event) => {},
    onFocus: (event) => {},
    onBlur: (event) => {},
    onChange: (event, value) => {},
    onDecrement: (event) => {},
    onIncrement: (event) => {},
    onKeyDown: (event) => {},
    disabled: undefined,
    readOnly: undefined
  }

  state = { hasFocus: false }
  _input = null

  get id() {
    if (this.props.id) {
      return this.props.id
    }
    if (!this._id) {
      this._id = uid('NumberInput')
    }
    return this._id
  }

  get invalid() {
    return (
      this.props.messages &&
      this.props.messages.some((message) => message.type === 'error')
    )
  }

  get interaction() {
    return getInteraction({ props: this.props })
  }

  componentDidMount() {
    this.props.makeStyles({
      interaction: this.interaction,
      hasFocus: this.state.hasFocus,
      invalid: this.invalid
    })
  }

  componentDidUpdate() {
    this.props.makeStyles({
      interaction: this.interaction,
      hasFocus: this.state.hasFocus,
      invalid: this.invalid
    })
  }

  handleRef = (element) => {
    this._input = element
    this.props.inputRef(element)
  }

  handleFocus = (event) => {
    this.setState({ hasFocus: true })
    this.props.onFocus(event)
  }

  handleBlur = (event) => {
    this.setState({ hasFocus: false })
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

  arrowClicked(event, callback) {
    const { interaction } = this

    event.preventDefault()
    if (interaction === 'enabled') {
      this._input.focus()
      callback(event)
    }
  }

  renderArrows() {
    return (
      <span css={this.props.styles.arrowContainer}>
        <button
          aria-hidden
          css={this.props.styles.arrow}
          onMouseDown={this.handleClickUpArrow}
          tabIndex="-1"
          type="button"
        >
          <IconArrowOpenUpLine />
        </button>
        <button
          aria-hidden
          css={this.props.styles.arrow}
          onMouseDown={this.handleClickDownArrow}
          tabIndex="-1"
          type="button"
        >
          <IconArrowOpenDownLine />
        </button>
      </span>
    )
  }

  render() {
    const {
      renderLabel,
      display,
      placeholder,
      isRequired,
      showArrows,
      value,
      width
    } = this.props

    const { interaction } = this

    return (
      <FormField
        {...pickProps(this.props, FormField.propTypes)}
        label={callRenderProp(renderLabel)}
        inline={display === 'inline-block'}
        id={this.id}
      >
        <span
          css={this.props.styles.inputWidth}
          style={width ? { width } : null}
        >
          <span css={this.props.styles.inputContainer}>
            <input
              {...omitProps(this.props, {
                ...FormField.propTypes,
                ...NumberInput.propTypes
              })}
              css={this.props.styles.input}
              aria-invalid={this.invalid ? 'true' : null}
              id={this.id}
              type="text"
              inputMode="numeric"
              placeholder={placeholder}
              ref={this.handleRef}
              required={isRequired}
              value={value}
              disabled={interaction === 'disabled'}
              readOnly={interaction === 'readonly'}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />
            {showArrows ? this.renderArrows() : null}
          </span>
        </span>
      </FormField>
    )
  }
}

export default NumberInput
export { NumberInput }
