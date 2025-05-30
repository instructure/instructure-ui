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

import { Component } from 'react'

import { testable } from '@instructure/ui-testable'
import { omitProps, withDeterministicId } from '@instructure/ui-react-utils'
import { isActiveElement } from '@instructure/ui-dom-utils'

import { withStyle } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import type { RadioInputProps, RadioInputState } from './props'
import { allowedProps, propTypes } from './props'

/**
---
category: components
---
**/
@withDeterministicId()
@withStyle(generateStyle, generateComponentTheme)
@testable()
class RadioInput extends Component<RadioInputProps, RadioInputState> {
  static readonly componentId = 'RadioInput'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    variant: 'simple',
    size: 'medium',
    disabled: false,
    inline: false,
    context: 'success',
    readOnly: false
  }

  ref: Element | null = null

  private readonly _defaultId: string
  private _input: HTMLInputElement | null = null

  constructor(props: RadioInputProps) {
    super(props)

    if (typeof props.checked === 'undefined') {
      this.state = {
        checked: false
      }
    }

    this._defaultId = props.deterministicId!()
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  handleInputRef = (el: HTMLInputElement | null) => {
    this._input = el
    if (typeof this.props.inputRef === 'function') {
      this.props.inputRef(el)
    }
  }

  handleClick: React.MouseEventHandler<HTMLInputElement> = (e) => {
    if (this.props.disabled || this.props.readOnly) {
      e.preventDefault()
      return
    }

    if (typeof this.props.onClick === 'function') {
      this.props.onClick(e)
    }
  }

  handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (this.props.disabled || this.props.readOnly) {
      e.preventDefault()
      return
    }

    if (typeof this.props.checked === 'undefined') {
      this.setState({ checked: !this.state.checked })
    }

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(e)
    }
  }

  focus() {
    this._input?.focus()
  }

  get id() {
    return this.props.id || this._defaultId
  }

  get focused() {
    return isActiveElement(this._input)
  }

  get checked() {
    return typeof this.props.checked === 'undefined'
      ? this.state.checked
      : this.props.checked
  }

  render() {
    const { disabled, readOnly, label, value, name, styles } = this.props

    const props = omitProps(this.props, RadioInput.allowedProps)

    return (
      <div
        css={styles?.radioInput}
        ref={(el) => {
          this.ref = el
        }}
      >
        <div css={styles?.container}>
          <input
            {...props}
            id={this.id}
            ref={this.handleInputRef}
            value={value}
            name={name}
            checked={this.checked}
            type="radio"
            css={styles?.input}
            disabled={disabled || readOnly}
            aria-disabled={disabled || readOnly ? 'true' : undefined}
            onChange={this.handleChange}
            onClick={this.handleClick}
          />
          <label css={styles?.control} htmlFor={this.id}>
            <span css={styles?.facade} aria-hidden="true" />
            <span css={styles?.label}>{label}</span>
          </label>
        </div>
      </div>
    )
  }
}

export default RadioInput
export { RadioInput }
