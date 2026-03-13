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

import { Component, Children, ReactElement, AriaAttributes } from 'react'

import { Grid } from '@instructure/ui-grid/latest'
import { pickProps, omitProps } from '@instructure/ui-react-utils'
import { withStyle } from '@instructure/emotion'

import { allowedProps as formFieldLayoutAllowedProps } from '../../FormFieldLayout/v2/props'

import { FormFieldLayout } from '../../FormFieldLayout/v2'

import generateStyle from './styles'

import { allowedProps } from './props'
import type { FormFieldGroupProps } from './props'

/**
---
category: components
---
**/
@withStyle(generateStyle)
class FormFieldGroup extends Component<FormFieldGroupProps> {
  static readonly componentId = 'FormFieldGroup'

  static allowedProps = allowedProps
  static defaultProps = {
    as: 'fieldset',
    disabled: false,
    rowSpacing: 'medium',
    colSpacing: 'small',
    vAlign: 'middle',
    isGroup: true
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
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  get invalid() {
    return (
      !!this.props.messages &&
      this.props.messages.findIndex((message) => {
        return message.type === 'error' || message.type === 'newError'
      }) >= 0
    )
  }

  renderColumns() {
    return Children.map(this.props.children, (child, index) => {
      return child ? (
        <Grid.Col
          width={
            (child as ReactElement).props &&
            (child as ReactElement<any>).props.width
              ? 'auto'
              : undefined
          }
          key={index}
        >
          {child}
        </Grid.Col>
      ) : null
    })
  }

  renderChildren() {
    return (
      <Grid
        colSpacing={this.props.colSpacing}
        rowSpacing={this.props.rowSpacing}
        vAlign={this.props.vAlign}
        startAt={
          this.props.startAt ||
          (this.props.layout === 'columns' ? 'medium' : null)
        }
      >
        <Grid.Row>{this.renderColumns()}</Grid.Row>
      </Grid>
    )
  }

  renderFields() {
    const { styles } = this.props

    return (
      <span key="fields" css={styles?.formFieldGroup}>
        {this.renderChildren()}
      </span>
    )
  }

  render() {
    const { styles, makeStyles, isGroup, ...props } = this.props
    // This is quite ugly, but according to ARIA spec the `aria-invalid` prop
    // can only be used with certain roles see
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid#associated_roles
    // `aria-invalid` is put on in FormFieldLayout because the error message
    // DOM part gets there its ID.
    let ariaInvalid: AriaAttributes['aria-invalid'] = undefined
    if (
      this.props.role &&
      this.invalid &&
      [
        'application',
        'checkbox',
        'combobox',
        'gridcell',
        'listbox',
        'radiogroup',
        'slider',
        'spinbutton',
        'textbox',
        'tree',
        'columnheader',
        'rowheader',
        'searchbox',
        'switch',
        'treegrid'
      ].includes(this.props.role)
    ) {
      ariaInvalid = 'true'
    }
    return (
      <FormFieldLayout
        {...omitProps(props, FormFieldGroup.allowedProps)}
        {...pickProps(props, formFieldLayoutAllowedProps)}
        vAlign={props.vAlign}
        layout={props.layout === 'inline' ? 'inline' : 'stacked'}
        label={props.description}
        aria-disabled={props.disabled ? 'true' : undefined}
        aria-invalid={ariaInvalid}
        elementRef={this.handleRef}
        isGroup={isGroup}
      >
        {this.renderFields()}
      </FormFieldLayout>
    )
  }
}

export default FormFieldGroup
export { FormFieldGroup }
