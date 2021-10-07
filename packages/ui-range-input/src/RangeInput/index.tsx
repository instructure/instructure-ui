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

import { ContextView } from '@instructure/ui-view'
import { FormField } from '@instructure/ui-form-field'
import { addEventListener } from '@instructure/ui-dom-utils'
import { uid } from '@instructure/uid'
import { withStyle, jsx } from '@instructure/emotion'
import { testable } from '@instructure/ui-testable'
import { omitProps, pickProps } from '@instructure/ui-react-utils'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import type { RangeInputProps } from './props'
import { allowedProps, propTypes } from './props'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class RangeInput extends Component<RangeInputProps> {
  static readonly componentId = 'RangeInput'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    step: 1,
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'val' implicitly has an 'any' type.
    formatValue: (val) => val,
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
  _input: HTMLInputElement | null = null
  _inputListener: { remove(): void } | null = null
  _changeListener: { remove(): void } | null = null

  handleRef = (el: Element | null) => {
    this.ref = el
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

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultId' does not exist on type 'Range... Remove this comment to see the full error message
    this.defaultId = uid('RangeInput')
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
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_inputListener' does not exist on type 'R... Remove this comment to see the full error message
    this._inputListener.remove()
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_changeListener' does not exist on type '... Remove this comment to see the full error message
    this._changeListener.remove()
  }
  /* end workaround */

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
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

  get value() {
    return typeof this.props.value === 'undefined'
      ? // @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
        this.state.value
      : this.props.value
  }

  get invalid() {
    return (
      this.props.messages &&
      this.props.messages.findIndex((message) => {
        return message.type === 'error'
      }) >= 0
    )
  }

  get id() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultId' does not exist on type 'Range... Remove this comment to see the full error message
    return this.props.id || this.defaultId
  }

  // @ts-expect-error ts-migrate(7030) FIXME: Not all code paths return a value.
  renderValue() {
    if (this.props.displayValue) {
      return (
        <ContextView background="inverse" placement="end center">
          <output
            htmlFor={this.id}
            css={this.props.styles?.rangeInputInputValue}
          >
            {/* @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message */}
            {this.props.formatValue(this.value)}
          </output>
        </ContextView>
      )
    }
  }

  render() {
    const { formatValue, disabled, readOnly } = this.props

    const props = omitProps(this.props, RangeInput.allowedProps)

    /* eslint-disable jsx-a11y/no-redundant-roles */
    return (
      // @ts-expect-error ts-migrate(2554) FIXME: no overload..
      <FormField
        {...pickProps(this.props, FormField.allowedProps)}
        id={this.id}
        elementRef={this.handleRef}
      >
        <div css={this.props.styles?.rangeInput}>
          <input
            css={this.props.styles?.rangeInputInput}
            ref={(c) => {
              this._input = c
            }}
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
            // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
            aria-valuetext={formatValue(this.value, this.props.max)}
            {...props}
            disabled={disabled || readOnly}
            aria-disabled={disabled || readOnly ? 'true' : undefined}
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
