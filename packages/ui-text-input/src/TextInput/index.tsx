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

import {
  callRenderProp,
  getInteraction,
  passthroughProps,
  withDeterministicId
} from '@instructure/ui-react-utils'
import { isActiveElement, addEventListener } from '@instructure/ui-dom-utils'
import { FormField } from '@instructure/ui-form-field'
import { testable } from '@instructure/ui-testable'
import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import type {
  TextInputProps,
  TextInputState,
  TextInputStyleProps
} from './props'
import { allowedProps, propTypes } from './props'

/**
---
category: components
tags: form, field
---
@tsProps
**/
@withDeterministicId()
@withStyle(generateStyle, generateComponentTheme)
@testable()
class TextInput extends Component<TextInputProps, TextInputState> {
  static readonly componentId = 'TextInput'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    type: 'text',
    // Leave interaction default undefined so that `disabled` and `readOnly` can also be supplied
    interaction: undefined,
    isRequired: false,
    display: 'block',
    shouldNotWrap: false,
    size: 'medium',
    textAlign: 'start',
    messages: []
  }

  constructor(props: TextInputProps) {
    super(props)
    this.state = {
      hasFocus: false,
      beforeElementHasWidth: undefined,
      afterElementHasWidth: undefined
    }
    this._defaultId = props.deterministicId!()
    this._messagesId = props.deterministicId!('TextInput-messages')
  }

  ref: Element | null = null

  private _input: HTMLInputElement | null = null
  private _beforeElement: HTMLSpanElement | null = null
  private _afterElement: HTMLSpanElement | null = null

  private readonly _defaultId: string
  private readonly _messagesId: string

  private _focusListener: { remove(): void } | null = null

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  componentDidMount() {
    if (this._input) {
      this._focusListener = addEventListener(
        this._input,
        'focus',
        this.handleFocus
      )

      this.setState({
        beforeElementHasWidth: this.getElementHasWidth(this._beforeElement),
        afterElementHasWidth: this.getElementHasWidth(this._afterElement)
      })
    }

    this.props.makeStyles?.(this.makeStyleProps())
  }

  componentWillUnmount() {
    if (this._focusListener) {
      this._focusListener.remove()
    }
  }

  componentDidUpdate(prevProps: TextInputProps) {
    if (prevProps.renderBeforeInput !== this.props.renderBeforeInput) {
      this.setState({
        beforeElementHasWidth: this.getElementHasWidth(this._beforeElement)
      })
    }
    if (prevProps.renderAfterInput !== this.props.renderAfterInput) {
      this.setState({
        afterElementHasWidth: this.getElementHasWidth(this._afterElement)
      })
    }

    this.props.makeStyles?.(this.makeStyleProps())
  }

  makeStyleProps = (): TextInputStyleProps => {
    const { interaction } = this
    const { hasFocus, beforeElementHasWidth, afterElementHasWidth } = this.state
    return {
      disabled: interaction === 'disabled',
      invalid: this.invalid,
      focused: hasFocus,
      beforeElementHasWidth,
      afterElementHasWidth
    }
  }

  focus() {
    this._input?.focus()
  }

  get interaction() {
    return getInteraction({ props: this.props })
  }

  get hasMessages() {
    return !!this.props.messages && this.props.messages.length > 0
  }

  get invalid() {
    return (
      !!this.props.messages &&
      this.props.messages.findIndex((message) => {
        return message.type === 'error'
      }) >= 0
    )
  }

  get focused() {
    return isActiveElement(this._input)
  }

  get value() {
    return this._input?.value
  }

  get id() {
    return this.props.id || this._defaultId
  }

  handleInputRef = (node: HTMLInputElement | null) => {
    this._input = node

    if (typeof this.props.inputRef === 'function') {
      this.props.inputRef(node)
    }
  }

  handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event, event.target.value)
    }
  }

  handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(event)
    }
    this.setState({
      hasFocus: false
    })
  }

  handleFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(event)
    }
    this.setState({
      hasFocus: true
    })
  }

  renderInput() {
    const {
      type,
      size,
      htmlSize,
      display,
      textAlign,
      placeholder,
      value,
      defaultValue,
      isRequired,
      ...rest
    } = this.props

    const props = passthroughProps(rest)

    const { interaction } = this

    let descriptionIds = ''
    if (props['aria-describedby']) {
      descriptionIds = `${props['aria-describedby']}`
    }

    if (this.hasMessages) {
      descriptionIds =
        descriptionIds !== ''
          ? `${descriptionIds} ${this._messagesId}`
          : this._messagesId
    }

    return (
      <input
        {...props}
        css={this.props.styles?.textInput}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        ref={this.handleInputRef}
        type={type}
        id={this.id}
        required={isRequired}
        aria-invalid={this.invalid ? 'true' : undefined}
        disabled={interaction === 'disabled'}
        readOnly={interaction === 'readonly'}
        aria-describedby={descriptionIds !== '' ? descriptionIds : undefined}
        size={htmlSize}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    )
  }

  getElementHasWidth(element: HTMLSpanElement | null) {
    if (!element) {
      return undefined
    }

    const computedStyle = getComputedStyle(element)
    const { width, paddingInlineStart, paddingInlineEnd } = computedStyle

    const elementWidth =
      parseFloat(width) -
      parseFloat(paddingInlineStart) -
      parseFloat(paddingInlineEnd)

    return elementWidth > 0
  }

  render() {
    const {
      width,
      display,
      renderLabel,
      renderBeforeInput,
      renderAfterInput,
      messages,
      inputContainerRef,
      styles
    } = this.props

    const beforeElement: React.ReactNode = renderBeforeInput
      ? callRenderProp(renderBeforeInput)
      : null
    const afterElement: React.ReactNode = renderAfterInput
      ? callRenderProp(renderAfterInput)
      : null

    const renderBeforeOrAfter = !!beforeElement || !!afterElement

    return (
      <FormField
        id={this.id}
        label={callRenderProp(renderLabel)}
        messagesId={this._messagesId}
        messages={messages}
        inline={display === 'inline-block'}
        width={width}
        inputContainerRef={inputContainerRef}
        layout={this.props.layout}
        elementRef={this.handleRef}
      >
        <span css={styles?.facade}>
          {renderBeforeOrAfter ? (
            <div>
              <span css={styles?.layout}>
                {beforeElement && (
                  <span
                    css={styles?.beforeElement}
                    ref={(e) => {
                      this._beforeElement = e
                    }}
                  >
                    {beforeElement}
                  </span>
                )}
                <span css={styles?.innerWrapper}>
                  {/*
                    The input and content after input should not wrap,
                    so they're in their own flex container
                  */}
                  <span css={styles?.inputLayout}>
                    <span css={styles?.innerWrapper}>{this.renderInput()}</span>
                    {afterElement && (
                      <span
                        css={styles?.afterElement}
                        ref={(e) => {
                          this._afterElement = e
                        }}
                      >
                        {afterElement}
                      </span>
                    )}
                  </span>
                </span>
              </span>
            </div>
          ) : (
            /* If no prepended or appended content, don't render Flex layout */
            this.renderInput()
          )}
        </span>
      </FormField>
    )
  }
}

export default TextInput
export { TextInput }
