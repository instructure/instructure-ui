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

import {
  callRenderProp,
  getInteraction,
  passthroughProps
} from '@instructure/ui-react-utils'
import { isActiveElement } from '@instructure/ui-dom-utils'
import { FormField } from '@instructure/ui-form-field'
import { uid } from '@instructure/uid'
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
**/
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
    messages: [],
    // @ts-expect-error ts-migrate(6133) FIXME: 'input' is declared but its value is never read.
    inputRef: function (input) {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'container' is declared but its value is never rea... Remove this comment to see the full error message
    inputContainerRef: function (container) {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onChange: function (event, value) {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onBlur: function (event) {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onFocus: function (event) {}
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    super(props)
    this.state = { hasFocus: false }
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_defaultId' does not exist on type 'Text... Remove this comment to see the full error message
    this._defaultId = uid('TextInput')
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_messagesId' does not exist on type 'Tex... Remove this comment to see the full error message
    this._messagesId = uid('TextInput-messages')
  }

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }
  componentDidMount() {
    this.props.makeStyles?.(this.makeStyleProps())
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles?.(this.makeStyleProps())
  }

  makeStyleProps = (): TextInputStyleProps => {
    const { interaction } = this
    return {
      disabled: interaction === 'disabled',
      invalid: this.invalid,
      focused: this.state.hasFocus
    }
  }

  focus() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_input' does not exist on type 'TextInpu... Remove this comment to see the full error message
    this._input.focus()
  }

  get interaction() {
    return getInteraction({ props: this.props })
  }

  get hasMessages() {
    return this.props.messages && this.props.messages.length > 0
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
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_input' does not exist on type 'TextInpu... Remove this comment to see the full error message
    return isActiveElement(this._input)
  }

  get value() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_input' does not exist on type 'TextInpu... Remove this comment to see the full error message
    return this._input.value
  }

  get id() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_defaultId' does not exist on type 'Text... Remove this comment to see the full error message
    return this.props.id || this._defaultId
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
  handleInputRef = (node) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_input' does not exist on type 'TextInpu... Remove this comment to see the full error message
    this._input = node
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.inputRef(node)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleChange = (event) => {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.onChange(event, event.target.value)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleBlur = (event) => {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.onBlur(event)
    this.setState({
      hasFocus: false
    })
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleFocus = (event) => {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.onFocus(event)
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
          ? // @ts-expect-error ts-migrate(2339) FIXME: Property '_messagesId' does not exist on type 'Tex... Remove this comment to see the full error message
            `${descriptionIds} ${this._messagesId}`
          : // @ts-expect-error ts-migrate(2339) FIXME: Property '_messagesId' does not exist on type 'Tex... Remove this comment to see the full error message
            this._messagesId
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
        aria-invalid={this.invalid ? 'true' : null}
        disabled={interaction === 'disabled'}
        readOnly={interaction === 'readonly'}
        aria-describedby={descriptionIds !== '' ? descriptionIds : null}
        //@ts-expect-error can't be string
        size={htmlSize}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
      />
    )
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

    const hasBeforeElement =
      renderBeforeInput && callRenderProp(renderBeforeInput)
    const hasAfterElement = renderAfterInput && callRenderProp(renderAfterInput)

    const renderBeforeOrAfter = hasBeforeElement || hasAfterElement

    return (
      <FormField
        id={this.id}
        label={callRenderProp(renderLabel)}
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_messagesId' does not exist on type 'Tex... Remove this comment to see the full error message
        messagesId={this._messagesId}
        messages={messages}
        inline={display === 'inline-block'}
        width={width}
        inputContainerRef={inputContainerRef}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'layout' does not exist on type 'Readonly... Remove this comment to see the full error message
        layout={this.props.layout} // eslint-disable-line react/prop-types
        elementRef={this.handleRef}
      >
        <span css={styles?.facade}>
          {renderBeforeOrAfter ? (
            <div>
              <span css={styles?.layout}>
                {hasBeforeElement && (
                  <span css={styles?.beforeElement}>
                    {callRenderProp(renderBeforeInput)}
                  </span>
                )}
                <span css={styles?.innerWrapper}>
                  {/*
                    The input and content after input should not wrap,
                    so they're in their own flex container
                  */}
                  <span css={styles?.inputLayout}>
                    <span css={styles?.innerWrapper}>{this.renderInput()}</span>
                    {hasAfterElement && (
                      <span css={styles?.afterElement}>
                        {callRenderProp(renderAfterInput)}
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
