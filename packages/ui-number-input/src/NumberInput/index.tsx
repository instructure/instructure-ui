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
import React, { Component } from 'react'
import keycode from 'keycode'

import { FormField } from '@instructure/ui-form-field'
import {
  IconArrowOpenDownLine,
  IconArrowOpenUpLine
} from '@instructure/ui-icons'
import { testable } from '@instructure/ui-testable'
import {
  omitProps,
  pickProps,
  callRenderProp,
  getInteraction,
  withDeterministicId
} from '@instructure/ui-react-utils'
import { hasVisibleChildren } from '@instructure/ui-a11y-utils'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { allowedProps, propTypes } from './props'
import type {
  NumberInputProps,
  NumberInputState,
  NumberInputStyleProps
} from './props'

/**
---
category: components
id: NumberInput
---
**/
@withDeterministicId()
@withStyle(generateStyle, generateComponentTheme)
@testable()
class NumberInput extends Component<NumberInputProps, NumberInputState> {
  static readonly componentId = 'NumberInput'
  static allowedProps = allowedProps
  static propTypes = propTypes
  static defaultProps = {
    // Leave interaction default undefined so that `disabled` and `readOnly` can also be supplied
    interaction: undefined,
    messages: [],
    isRequired: false,
    showArrows: true,
    size: 'medium',
    display: 'block',
    textAlign: 'start',
    inputMode: 'numeric'
  }

  state: NumberInputState = { hasFocus: false }

  ref: Element | null = null

  private _input: HTMLInputElement | null = null
  private _id?: string

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  get id() {
    if (this.props.id) {
      return this.props.id
    }
    if (!this._id) {
      this._id = this.props.deterministicId!()
    }
    return this._id
  }

  get invalid() {
    return (
      !!this.props.messages &&
      this.props.messages.some(
        (message) => message.type === 'error' || message.type === 'newError'
      )
    )
  }

  get interaction() {
    return getInteraction({ props: this.props })
  }

  componentDidMount() {
    this.props.makeStyles?.(this.makeStyleVariables)
  }

  componentDidUpdate() {
    this.props.makeStyles?.(this.makeStyleVariables)
  }

  get makeStyleVariables(): NumberInputStyleProps {
    return {
      interaction: this.interaction,
      hasFocus: this.state.hasFocus,
      invalid: this.invalid
    }
  }

  handleInputRef = (element: HTMLInputElement | null) => {
    this._input = element

    if (typeof this.props.inputRef === 'function') {
      this.props.inputRef(element)
    }
  }

  handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    this.setState({ hasFocus: true })

    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(event)
    }
  }

  handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    this.setState({ hasFocus: false })

    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(event)
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event, event.target.value)
    }
  }

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { onKeyDown, onDecrement, onIncrement } = this.props

    if (typeof onKeyDown === 'function') {
      onKeyDown(event)
    }

    if (event.keyCode === keycode.codes.down) {
      event.preventDefault()
      if (typeof onDecrement === 'function') {
        onDecrement(event)
      }
    } else if (event.keyCode === keycode.codes.up) {
      event.preventDefault()
      if (typeof onIncrement === 'function') {
        onIncrement(event)
      }
    }
  }

  handleClickUpArrow = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.arrowClicked(event, this.props.onIncrement)
  }

  handleClickDownArrow = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.arrowClicked(event, this.props.onDecrement)
  }

  arrowClicked(
    event: React.MouseEvent<HTMLButtonElement>,
    callback: NumberInputProps['onIncrement'] | NumberInputProps['onDecrement']
  ) {
    const { interaction } = this

    event.preventDefault()
    if (interaction === 'enabled') {
      this._input?.focus()

      if (typeof callback === 'function') {
        callback(event)
      }
    }
  }

  renderArrows() {
    return (
      <span css={this.props.styles?.arrowContainer}>
        <button
          aria-hidden
          css={this.props.styles?.arrow}
          onMouseDown={this.handleClickUpArrow}
          tabIndex={-1}
          type="button"
        >
          <IconArrowOpenUpLine />
        </button>
        <button
          aria-hidden
          css={this.props.styles?.arrow}
          onMouseDown={this.handleClickDownArrow}
          tabIndex={-1}
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
      width,
      styles
    } = this.props

    const { interaction } = this

    const rawLabel = callRenderProp(renderLabel)
    const label = hasVisibleChildren(rawLabel) ? (
      <React.Fragment>
        {rawLabel}
        {isRequired && (
          <span css={this.invalid ? styles?.requiredInvalid : {}}> *</span>
        )}
      </React.Fragment>
    ) : (
      rawLabel
    )

    return (
      <FormField
        {...pickProps(this.props, FormField.allowedProps)}
        label={label}
        inline={display === 'inline-block'}
        id={this.id}
        elementRef={this.handleRef}
      >
        <span
          css={this.props.styles?.inputWidth}
          style={width ? { width } : undefined}
        >
          <span css={this.props.styles?.inputContainer}>
            <input
              {...omitProps(this.props, [
                ...FormField.allowedProps,
                ...NumberInput.allowedProps
              ])}
              css={this.props.styles?.input}
              aria-invalid={this.invalid ? 'true' : undefined}
              id={this.id}
              type="number"
              inputMode={this.props.inputMode}
              placeholder={placeholder}
              ref={this.handleInputRef}
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
