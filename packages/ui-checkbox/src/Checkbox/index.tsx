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

import { FormFieldMessages } from '@instructure/ui-form-field'
import { createChainedFunction } from '@instructure/ui-utils'
import { logError as error } from '@instructure/console'
import { uid } from '@instructure/uid'
import { isActiveElement } from '@instructure/ui-dom-utils'
import { omitProps } from '@instructure/ui-react-utils'
import { View } from '@instructure/ui-view'
import { testable } from '@instructure/ui-testable'

import { withStyle, jsx } from '@instructure/emotion'

import { CheckboxFacade } from './CheckboxFacade'
import { ToggleFacade } from './ToggleFacade'

import generateStyle from './styles'

import { propTypes, allowedProps } from './props'
import type { CheckboxProps, CheckboxState } from './props'

import type {
  CheckboxFacadeTheme,
  ToggleFacadeTheme
} from '@instructure/shared-types'

/**
---
category: components
tags: toggle, switch
---
@tsProps
**/

@withStyle(generateStyle, null)
@testable()
class Checkbox extends Component<CheckboxProps, CheckboxState> {
  static readonly componentId = 'Checkbox'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    size: 'medium',
    variant: 'simple',
    disabled: false,
    inline: false,
    indeterminate: false,
    readOnly: false,
    labelPlacement: 'end'
  }

  constructor(props: CheckboxProps) {
    super(props)

    this.state = {
      focused: false,
      hovered: false,
      checked:
        typeof props.checked === 'undefined'
          ? !!props.defaultChecked
          : undefined
    }

    this._defaultId = uid('Checkbox')
  }
  private _defaultId: string
  private _input?: HTMLInputElement | null

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  componentDidMount() {
    if (this._input) {
      this._input.indeterminate = this.props.indeterminate || false
    }

    this.props.makeStyles?.()
  }

  componentDidUpdate(prevProps: CheckboxProps) {
    if (prevProps.indeterminate !== this.props.indeterminate && this._input) {
      this._input.indeterminate = this.props.indeterminate || false
    }

    this.props.makeStyles?.()
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange, disabled, checked, readOnly } = this.props

    if (disabled || readOnly) {
      e.preventDefault()
      return
    }

    if (typeof checked === 'undefined') {
      this.setState({ checked: !this.state.checked })
    }

    if (typeof onChange === 'function') {
      onChange(e)
    }
  }

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (this.props.variant === 'toggle' && e.keyCode === keycode.codes.enter) {
      this._input && this._input.click()
      e.preventDefault()
    }
  }

  handleFocus = () => {
    this.setState({
      focused: true
    })
  }

  handleBlur = () => {
    this.setState({
      focused: false
    })
  }

  handleMouseOver = () => {
    this.setState({
      hovered: true
    })
  }

  handleMouseOut = () => {
    this.setState({
      hovered: false
    })
  }

  get id() {
    return this.props.id || this._defaultId
  }

  get checked() {
    return typeof this.props.checked === 'undefined'
      ? this.state.checked
      : this.props.checked
  }

  get focused() {
    return isActiveElement(this._input)
  }

  focus() {
    this._input && this._input.focus()
  }

  renderFacade() {
    const {
      size,
      disabled,
      variant,
      label,
      readOnly,
      indeterminate,
      labelPlacement,
      themeOverride
    } = this.props

    const { hovered, focused } = this.state

    error(
      !(variant === 'simple' && labelPlacement !== 'end'),
      `[Checkbox] The \`simple\` variant does not support the \`labelPlacement\` property.  Use the \`toggle\` variant instead.`
    )

    if (variant === 'toggle') {
      return (
        <ToggleFacade
          disabled={disabled}
          size={size}
          focused={focused}
          checked={this.checked}
          readOnly={readOnly}
          labelPlacement={labelPlacement}
          themeOverride={themeOverride as Partial<ToggleFacadeTheme>}
        >
          {label}
        </ToggleFacade>
      )
    } else {
      return (
        <CheckboxFacade
          size={size}
          hovered={hovered}
          focused={focused}
          checked={this.checked}
          indeterminate={indeterminate}
          themeOverride={themeOverride as Partial<CheckboxFacadeTheme>}
        >
          {label}
        </CheckboxFacade>
      )
    }
  }

  renderMessages() {
    const { messages } = this.props

    return messages && messages.length > 0 ? (
      <View display="block" margin="small 0 0">
        <FormFieldMessages messages={messages} />
      </View>
    ) : null
  }

  render() {
    const {
      disabled,
      readOnly,
      value,
      onKeyDown,
      onFocus,
      onBlur,
      onMouseOver,
      onMouseOut,
      indeterminate,
      variant,
      styles
    } = this.props

    const props = omitProps(this.props, Checkbox.allowedProps)

    error(
      !(variant === 'toggle' && indeterminate),
      `[Checkbox] The \`toggle\` variant does not support the \`indeterminate\` property. Use the \`simple\` variant instead.`
    )

    /* eslint-disable jsx-a11y/mouse-events-have-key-events */

    return (
      <div
        css={styles?.checkbox}
        onMouseOver={createChainedFunction(onMouseOver, this.handleMouseOver)}
        onMouseOut={createChainedFunction(onMouseOut, this.handleMouseOut)}
        ref={this.handleRef}
      >
        <input
          {...props}
          id={this.id}
          value={value}
          type="checkbox"
          ref={(c) => {
            this._input = c
          }}
          disabled={disabled || readOnly}
          aria-checked={indeterminate ? 'mixed' : undefined}
          css={styles?.input}
          onChange={this.handleChange}
          onKeyDown={createChainedFunction(onKeyDown, this.handleKeyDown)}
          onFocus={createChainedFunction(onFocus, this.handleFocus)}
          onBlur={createChainedFunction(onBlur, this.handleBlur)}
          checked={this.checked}
        />
        <label htmlFor={this.id} css={styles?.control}>
          {this.renderFacade()}
          {this.renderMessages()}
        </label>
      </div>
    )

    /* eslint-enable jsx-a11y/mouse-events-have-key-events */
  }
}

export default Checkbox
export { Checkbox, CheckboxFacade, ToggleFacade }
