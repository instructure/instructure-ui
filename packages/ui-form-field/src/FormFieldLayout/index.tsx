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
import { hasVisibleChildren } from '@instructure/ui-a11y-utils'
import { Grid } from '@instructure/ui-grid'
import {
  omitProps,
  pickProps,
  getElementType,
  withDeterministicId
} from '@instructure/ui-react-utils'

import { withStyle, jsx } from '@instructure/emotion'

import { FormFieldLabel } from '../FormFieldLabel'
import { FormFieldMessages } from '../FormFieldMessages'

import generateStyle from './styles'

import { propTypes, allowedProps } from './props'
import type { FormFieldLayoutProps } from './props'

/**
---
parent: FormField
---
**/
@withDeterministicId()
@withStyle(generateStyle, null)
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
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  get hasVisibleLabel() {
    return this.props.label && hasVisibleChildren(this.props.label)
  }

  get hasMessages() {
    return this.props.messages && this.props.messages.length > 0
  }

  get elementType() {
    return getElementType(FormFieldLayout, this.props)
  }

  get inlineContainerAndLabel() {
    // Return if both the component container and label will display inline
    return this.props.inline && this.props.layout === 'inline'
  }

  handleInputContainerRef = (node: HTMLSpanElement | null) => {
    if (typeof this.props.inputContainerRef === 'function') {
      this.props.inputContainerRef(node)
    }
  }

  renderLabel() {
    if (this.hasVisibleLabel) {
      return (
        <Grid.Col
          textAlign={this.props.labelAlign}
          width={this.inlineContainerAndLabel ? 'auto' : 3}
        >
          <FormFieldLabel id={this._labelId}>{this.props.label}</FormFieldLabel>
        </Grid.Col>
      )
    } else if (this.props.label) {
      // needs to be wrapped because it needs an `id`
      return <div id={this._labelId}>{this.props.label}</div>
    } else return null
  }

  renderVisibleMessages() {
    return this.hasMessages ? (
      <Grid.Row>
        <Grid.Col
          offset={this.inlineContainerAndLabel ? undefined : 3}
          textAlign={this.inlineContainerAndLabel ? 'end' : undefined}
        >
          <FormFieldMessages
            id={this._messagesId}
            messages={this.props.messages}
          />
        </Grid.Col>
      </Grid.Row>
    ) : null
  }

  render() {
    const ElementType = this.elementType

    const { makeStyles, styles, messages, isGroup, ...props } = this.props

    const { width, layout, children } = props

    const hasNewErrorMsg =
      !!messages?.find((m) => m.type === 'newError') && isGroup

    let labelConnector = {}
    if (ElementType == 'label') {
      // this is a `<label>`, it needs to be connected to a control
      // This is the case for e.g. `FormField`, `TextInput`, `NumberInput`
      labelConnector = { htmlFor: this.props.id }
    } else if (this.props.label) {
      // This is a FormFieldGroup (span), it needs to be connected to its label
      // This is the case for `FormFieldGroup`
      labelConnector = { 'aria-labelledby': this._labelId }
    }
    return (
      <ElementType
        {...omitProps(props, [
          ...FormFieldLayout.allowedProps,
          ...Grid.allowedProps
        ])}
        css={styles?.formFieldLayout}
        style={{ width }}
        aria-describedby={this.hasMessages ? this._messagesId : undefined}
        {...labelConnector}
        ref={this.handleRef}
      >
        <Grid
          rowSpacing="small"
          colSpacing="small"
          startAt={
            layout === 'inline' && this.hasVisibleLabel ? 'medium' : null
          }
          {...pickProps(props, Grid.allowedProps)}
        >
          <Grid.Row>
            {this.renderLabel()}
            <Grid.Col
              width={this.inlineContainerAndLabel ? 'auto' : undefined}
              elementRef={this.handleInputContainerRef}
            >
              {hasNewErrorMsg && (
                <div css={styles?.groupErrorMessage}>
                  {this.renderVisibleMessages()}
                </div>
              )}
              {children}
            </Grid.Col>
          </Grid.Row>
          {!hasNewErrorMsg && this.renderVisibleMessages()}
        </Grid>
      </ElementType>
    )
  }
}

export default FormFieldLayout
export { FormFieldLayout }
