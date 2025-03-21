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
import { hasVisibleChildren } from '@instructure/ui-a11y-utils'
import {
  omitProps,
  getElementType,
  withDeterministicId
} from '@instructure/ui-react-utils'

import { withStyle } from '@instructure/emotion'
import { FormFieldMessages } from '../FormFieldMessages'
import generateStyle from './styles'
import { propTypes, allowedProps, FormFieldStyleProps } from './props'
import type { FormFieldLayoutProps } from './props'
import generateComponentTheme from './theme'

/**
---
parent: FormField
---
**/
@withDeterministicId()
@withStyle(generateStyle, generateComponentTheme)
class FormFieldLayout extends Component<FormFieldLayoutProps> {
  static readonly componentId = 'FormFieldLayout'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    inline: false,
    layout: 'stacked',
    as: 'label',
    labelAlign: 'end'
  } as const

  constructor(props: FormFieldLayoutProps) {
    super(props)
    this._messagesId = props.messagesId || props.deterministicId!()
    this._labelId = props.deterministicId!('FormField-Label')
  }

  private _messagesId: string
  private _labelId: string

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

  componentDidUpdate() {
    this.props.makeStyles?.(this.makeStyleProps())
  }

  makeStyleProps = (): FormFieldStyleProps => {
    const hasNewErrorMsgAndIsGroup =
      !!this.props.messages?.find((m) => m.type === 'newError') &&
      !!this.props.isGroup
    return {
      hasMessages: this.hasMessages,
      hasVisibleLabel: this.hasVisibleLabel,
      // if true render error message above the controls (and below the label)
      hasNewErrorMsgAndIsGroup: hasNewErrorMsgAndIsGroup
    }
  }

  get hasVisibleLabel() {
    return this.props.label ? hasVisibleChildren(this.props.label) : false
  }

  get hasMessages() {
    if (!this.props.messages || this.props.messages.length == 0) {
      return false
    }
    for (const msg of this.props.messages) {
      if (msg.text) {
        if (typeof msg.text === 'string') {
          return msg.text.length > 0
        }
        // this is more complicated (e.g. an array, a Component,...)
        // but we don't try to optimize here for these cases
        return true
      }
    }
    return false
  }

  get elementType() {
    return getElementType(FormFieldLayout, this.props)
  }

  handleInputContainerRef = (node: HTMLElement | null) => {
    if (typeof this.props.inputContainerRef === 'function') {
      this.props.inputContainerRef(node)
    }
  }

  renderLabel() {
    if (this.hasVisibleLabel) {
      if (this.elementType == 'fieldset') {
        // `legend` has some special built in CSS, this can only be reset
        // this way https://stackoverflow.com/a/65866981/319473
        return (
          <legend style={{ display: 'contents' }}>
            <span css={this.props.styles?.formFieldLabel}>
              {this.props.label}
            </span>
          </legend>
        )
      }
      return (
        <span css={this.props.styles?.formFieldLabel}>{this.props.label}</span>
      )
    } else if (this.props.label) {
      if (this.elementType == 'fieldset') {
        return (
          <legend id={this._labelId} style={{ display: 'contents' }}>
            {this.props.label}
          </legend>
        )
      }
      // needs to be wrapped because it needs an `id`
      return (
        <div id={this._labelId} style={{ display: 'contents' }}>
          {this.props.label}
        </div>
      )
    } else return null
  }

  renderVisibleMessages() {
    return this.hasMessages ? (
      <FormFieldMessages
        id={this._messagesId}
        messages={this.props.messages}
        gridArea="messages"
      />
    ) : null
  }

  render() {
    // Should be `<label>` if it's a FormField, fieldset if it's a group
    const ElementType = this.elementType

    const { makeStyles, styles, messages, isGroup, ...props } = this.props

    const { width, children } = props

    const hasNewErrorMsgAndIsGroup =
      !!messages?.find((m) => m.type === 'newError') && isGroup
    return (
      <ElementType
        {...omitProps(props, [...FormFieldLayout.allowedProps])}
        css={styles?.formFieldLayout}
        aria-describedby={this.hasMessages ? this._messagesId : undefined}
        aria-errormessage={
          this.props['aria-invalid'] ? this._messagesId : undefined
        }
        style={{ width }}
        ref={this.handleRef}
      >
        {this.renderLabel()}
        {hasNewErrorMsgAndIsGroup && this.renderVisibleMessages()}
        <span
          css={styles?.formFieldChildren}
          ref={this.handleInputContainerRef}
        >
          {children}
        </span>
        {!hasNewErrorMsgAndIsGroup && this.renderVisibleMessages()}
      </ElementType>
    )
  }
}

export default FormFieldLayout
export { FormFieldLayout }
