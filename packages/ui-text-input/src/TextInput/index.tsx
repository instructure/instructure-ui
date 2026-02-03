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

import { Component, isValidElement } from 'react'

import {
  callRenderProp,
  getInteraction,
  passthroughProps,
  withDeterministicId,
  safeCloneElement
} from '@instructure/ui-react-utils'
import {
  isActiveElement,
  addEventListener,
  getCSSStyleDeclaration
} from '@instructure/ui-dom-utils'
import { FormField } from '@instructure/ui-form-field'
import { withStyle_11_5 as withStyle } from '@instructure/emotion'

import generateStyle from './styles'
import type {
  TextInputProps,
  TextInputState,
  TextInputStyleProps
} from './props'
import { allowedProps } from './props'
import type { Renderable } from '@instructure/shared-types'

/**
---
category: components
tags: form, field, input
---
**/
@withDeterministicId()
@withStyle(generateStyle)
class TextInput extends Component<TextInputProps, TextInputState> {
  static readonly componentId = 'TextInput'

  static allowedProps = allowedProps

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
    this.state = { afterElementHasWidth: undefined }
    this._defaultId = props.deterministicId!()
    this._messagesId = props.deterministicId!('TextInput-messages')
  }

  ref: Element | null = null

  private _input: HTMLInputElement | null = null
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
        afterElementHasWidth: this.getElementHasWidth(this._afterElement)
      })
    }
    this.adjustAfterElementHeight()
    this.props.makeStyles?.(this.makeStyleProps())
  }

  componentWillUnmount() {
    if (this._focusListener) {
      this._focusListener.remove()
    }
  }

  componentDidUpdate(prevProps: TextInputProps) {
    if (prevProps.renderAfterInput !== this.props.renderAfterInput) {
      this.setState({
        afterElementHasWidth: this.getElementHasWidth(this._afterElement)
      })
    }
    this.props.makeStyles?.(this.makeStyleProps())
  }

  renderInstUIIcon(elementToRender: Renderable) {
    if (!elementToRender) {
      return null
    }
    const rendered = callRenderProp(elementToRender)
    // Map sizes to Lucide icon semantic size tokens
    const linkSizeToIconSize = {
      small: 'sm',
      medium: 'md',
      large: 'lg'
    } as const
    const iconSize = linkSizeToIconSize[this.props.size || 'medium']
    if (
      isValidElement(elementToRender) &&
      (elementToRender as React.FunctionComponentElement<unknown>).type
        ?.name === 'WrappedIcon'
    ) {
      return safeCloneElement(rendered, { size: iconSize })
    }
    return rendered
  }

  adjustAfterElementHeight() {
    const afterElementChild = this._afterElement
      ?.firstElementChild as HTMLElement | null

    // Check if the child is a button, then get the button's first child (the content span)
    const buttonContentSpan =
      afterElementChild?.tagName === 'BUTTON'
        ? (afterElementChild.firstElementChild as HTMLElement | null)
        : null

    // This is a necessary workaround for DateInput2 because it uses a Popover, which has a nested Button as an afterElement
    // Check if the child is a Popover's inner span containing a button, then get the button's first child (the content span)
    const popoverContentSpan =
      afterElementChild?.tagName === 'SPAN' &&
      afterElementChild.firstElementChild?.tagName === 'BUTTON'
        ? (afterElementChild.firstElementChild
            .firstElementChild as HTMLElement | null)
        : null

    const targetSpan = buttonContentSpan ?? popoverContentSpan

    if (targetSpan) {
      // Set the height to 36px (the height of a medium TextInput) to avoid layout shift when the afterElement content changes
      // this temporary workaround is necessary because otherwise the layout breaks, later on IconButton's default height will be adjusted to the TextInput size
      // so this workaround will not be needed anymore
      targetSpan.style.height = '36px'
    }
  }

  makeStyleProps = (): TextInputStyleProps => {
    const { afterElementHasWidth } = this.state
    const beforeElement = this.props.renderBeforeInput
      ? callRenderProp(this.props.renderBeforeInput)
      : null
    const success =
      !!this.props.messages &&
      this.props.messages.some((message) => message.type === 'success')
    return {
      interaction: this.interaction,
      invalid: this.invalid,
      success: success,
      afterElementHasWidth: afterElementHasWidth,
      beforeElementExists: !!beforeElement
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
        return message.type === 'error' || message.type === 'newError'
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
  }

  handleFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(event)
    }
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
      onFocus,
      ...rest
    } = this.props

    const props = passthroughProps(rest)

    const { interaction } = this

    let descriptionIds = ''
    if (props['aria-describedby']) {
      descriptionIds = `${props['aria-describedby']}`
    }

    return (
      <input
        {...props}
        css={this.props.styles?.textInput}
        defaultValue={defaultValue}
        value={value}
        placeholder={interaction === 'enabled' ? placeholder : undefined}
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

  getElementHasWidth(element: Element | null) {
    if (!element) {
      return undefined
    }

    const computedStyle = getCSSStyleDeclaration(element)
    if (!computedStyle) {
      return undefined
    }

    const { width, paddingInlineStart, paddingInlineEnd } = computedStyle

    if (width === 'auto' || width === '') {
      // This is a workaround for an edge-case, when the TextInput's parent
      // is hidden on load, so the element is not visible either.
      // In this case the computed width is going to be either 'auto' or '',
      // so we assume it has width so that the padding won't be removed.
      return true
    }

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
      isRequired,
      styles
    } = this.props

    const beforeElement = this.renderInstUIIcon(renderBeforeInput)
    const afterElement = this.renderInstUIIcon(renderAfterInput)

    const renderBeforeOrAfter =
      !!beforeElement ||
      !!afterElement ||
      renderBeforeInput !== undefined ||
      renderAfterInput !== undefined

    const label = callRenderProp(renderLabel)

    return (
      <FormField
        id={this.id}
        label={label}
        messagesId={this._messagesId}
        messages={messages}
        inline={display === 'inline-block'}
        width={width}
        inputContainerRef={inputContainerRef}
        layout={this.props.layout}
        elementRef={this.handleRef}
        margin={this.props.margin}
        isRequired={isRequired}
        disabled={this.interaction === 'disabled'}
        readOnly={this.interaction === 'readonly'}
        data-cid="TextInput"
      >
        <span css={styles?.facade}>
          {renderBeforeOrAfter ? (
            <span css={styles?.layout}>
              {beforeElement}
              {/* The input and content after input should not wrap,
                so they're in their own flex container */}
              <span css={styles?.inputLayout}>
                {this.renderInput()}
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
