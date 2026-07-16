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

import { warn } from '@instructure/console'
import { ContextView } from '@instructure/ui-view/latest'
import { FormField } from '@instructure/ui-form-field/latest'
import { addEventListener } from '@instructure/ui-dom-utils'
import { withStyleNew } from '@instructure/emotion'
import {
  omitProps,
  pickProps,
  withDeterministicId
} from '@instructure/ui-react-utils'

import generateStyle from './styles.js'

import type { RangeInputProps, RangeInputState } from './props'
import { allowedProps } from './props.js'

/**
---
category: components
---
**/
@withDeterministicId()
@withStyleNew(generateStyle)
class RangeInput extends Component<RangeInputProps, RangeInputState> {
  static displayName = 'RangeInput'
  static readonly componentId = 'RangeInput'
  static outputLocatorAttribute = 'data-range-output'

  static allowedProps = allowedProps

  static defaultProps = {
    step: 1,
    formatValue: (val?: number) => val,

    // If min and max has default value, they don't give a warning if not set, even if they are required props.
    // TODO: figure out if they don't need to be required or remove defaults in V9.
    max: 0,
    min: 0,

    inline: false,
    size: 'medium',
    layout: 'stacked',
    displayValue: true,
    disabled: false,
    readOnly: false
  }

  ref: Element | null = null

  private _input: HTMLInputElement | null = null
  private _inputListener: { remove(): void } | null = null
  private _changeListener: { remove(): void } | null = null
  private readonly defaultId: string

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  handleInputRef = (el: HTMLInputElement | null) => {
    this._input = el
    if (typeof this.props.inputRef === 'function') {
      this.props.inputRef(el)
    }
  }

  constructor(props: RangeInputProps) {
    super(props)

    if (typeof props.value === 'undefined') {
      this.state = {
        value: props.defaultValue
      }
    }

    this.defaultId = props.deterministicId!()
  }

  /* workaround for https://github.com/facebook/react/issues/554 */
  componentDidMount() {
    this.props.makeStyles?.()

    if (this._input !== null) {
      // https://connect.microsoft.com/IE/Feedback/Details/856998
      this._inputListener = addEventListener(
        this._input,
        'input',
        this.handleChange
      )
      this._changeListener = addEventListener(
        this._input,
        'change',
        this.handleChange
      )
    }
  }

  componentWillUnmount() {
    if (!this._input) {
      return
    }
    this._inputListener?.remove()
    this._changeListener?.remove()
  }
  /* end workaround */

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange, value } = this.props

    if (typeof value === 'undefined') {
      this.setState({ value: event.target.value })
    }

    if (typeof onChange === 'function') {
      onChange(event.target.value)
    }
  }

  // controlled input must have an onChange, but we're handling it with native events
  noopChange: React.ChangeEventHandler<HTMLInputElement> = () => {}

  get value() {
    const value =
      typeof this.props.value === 'undefined'
        ? this.state.value
        : this.props.value

    return typeof value === 'string' ? parseInt(value) : value
  }

  get id() {
    return this.props.id || this.defaultId
  }

  renderValue() {
    if (this.props.displayValue) {
      if (!this.value) {
        warn(
          false,
          'RangeInput should have a `value` or `defaultValue` set for the value to be displayed. If no value has to be displayed, set `displayValue={false}`.'
        )
        return null
      }
      const props = { [RangeInput.outputLocatorAttribute]: this.id }
      return (
        <ContextView background="inverse" placement="end center">
          <div {...props} css={this.props.styles?.rangeInputInputValue}>
            {this.props.formatValue!(this.value, this.props.max)}
          </div>
        </ContextView>
      )
    }

    return null
  }

  render() {
    const { formatValue, disabled, readOnly, messages } = this.props

    const props = omitProps(this.props, RangeInput.allowedProps)

    // Messages live inside the wrapping <label>. Reference them from the input
    // via `aria-describedby` and point the accessible name at the label text
    // only via `aria-labelledby`, so the messages are announced as a
    // description rather than as part of the control's name.
    // Only when a message actually renders (has text); FormField skips
    // empty-text messages, so otherwise aria-describedby would dangle.
    const hasMessages = !!messages?.some((m) => !!m.text)
    const messagesId = `${this.id}-messages`
    const labelId = `${this.id}-label`

    return (
      <FormField
        {...pickProps(this.props, FormField.allowedProps)}
        label={this.props.label}
        messagesId={messagesId}
        labelId={labelId}
        id={this.id}
        elementRef={this.handleRef}
        data-cid="RangeInput"
      >
        <div css={this.props.styles?.rangeInput}>
          <input
            css={this.props.styles?.rangeInputInput}
            ref={this.handleInputRef}
            type="range"
            id={this.id}
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
            value={this.value}
            onChange={this.noopChange}
            aria-valuetext={formatValue!(this.value, this.props.max)}
            {...props}
            disabled={disabled || readOnly}
            aria-disabled={disabled || readOnly ? 'true' : undefined}
            aria-describedby={
              [props['aria-describedby'], hasMessages ? messagesId : null]
                .filter(Boolean)
                .join(' ') || undefined
            }
            aria-labelledby={
              hasMessages
                ? props['aria-labelledby'] || labelId
                : props['aria-labelledby']
            }
          />
          {this.renderValue()}
        </div>
      </FormField>
    )
  }
}

export default RangeInput
export { RangeInput }
