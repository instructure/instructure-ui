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

import React, { Component } from 'react'

import { omitProps, pickProps } from '@instructure/ui-react-utils'

import { FormFieldLayout } from '../FormFieldLayout'

import { propTypes, allowedProps } from './props'
import type { FormFieldProps } from './props'

/**
---
category: components
---
**/
class FormField extends Component<FormFieldProps> {
  static readonly componentId = 'FormField'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    inline: false,
    layout: 'stacked',
    labelAlign: 'end',
    vAlign: 'middle'
  }

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  render() {
    return (
      <FormFieldLayout
        {...omitProps(this.props, FormField.allowedProps)}
        {...pickProps(this.props, FormFieldLayout.allowedProps)}
        label={this.props.label}
        vAlign={this.props.vAlign}
        as="label"
        htmlFor={this.props.id}
        elementRef={this.handleRef}
        margin={this.props.margin}
      />
    )
  }
}

export default FormField
export { FormField }
