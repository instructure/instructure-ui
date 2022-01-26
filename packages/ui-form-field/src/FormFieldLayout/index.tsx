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
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { Grid } from '@instructure/ui-grid'
import { logError as error } from '@instructure/console'
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
@tsProps
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

    this._messagesId = props.messagesId || props.deterministicId!

    error(
      typeof props.width !== 'undefined' ||
        !props.inline ||
        props.layout !== 'inline',
      `[FormFieldLayout] The 'inline' prop is true, and the 'layout' is set to 'inline'.
      This will cause a layout issue in Internet Explorer 11 unless you also add a value for the 'width' prop.`
    )
  }

  private _messagesId: string

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
          <FormFieldLabel
            aria-hidden={this.elementType === 'fieldset' ? 'true' : undefined}
          >
            {this.props.label}
          </FormFieldLabel>
        </Grid.Col>
      )
    } else if (this.elementType !== 'fieldset') {
      // to avoid duplicate label/legend content
      return this.props.label
    } else {
      return null
    }
  }

  renderLegend() {
    // note: the legend element must be the first child of a fieldset element for SR
    // so we render it twice in that case (once for SR-only and one that is visible)
    return (
      <ScreenReaderContent as="legend">
        {this.props.label}
        {this.hasMessages && (
          <FormFieldMessages messages={this.props.messages} />
        )}
      </ScreenReaderContent>
    )
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
    // any cast is needed to prevent Expression produces a union type that is too complex to represent errors
    const ElementType = this.elementType as any

    const { makeStyles, styles, ...props } = this.props

    const { width, layout, children } = props
    return (
      <ElementType
        //@ts-expect-error too complex
        {...omitProps(props, [
          ...FormFieldLayout.allowedProps,
          ...Grid.allowedProps
        ])}
        css={styles?.formFieldLayout}
        style={{ width }}
        aria-describedby={this.hasMessages ? this._messagesId : undefined}
        ref={this.handleRef}
      >
        {this.elementType === 'fieldset' && this.renderLegend()}
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
              {children}
            </Grid.Col>
          </Grid.Row>
          {this.renderVisibleMessages()}
        </Grid>
      </ElementType>
    )
  }
}

export default FormFieldLayout
export { FormFieldLayout }
