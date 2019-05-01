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
import PropTypes from 'prop-types'

import { omitProps, pickProps } from '@instructure/ui-react-utils'

import { FormPropTypes } from '../FormPropTypes'
import { FormFieldLayout } from '../FormFieldLayout'

/**
---
category: components
---
**/
class FormField extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
    /**
     * the id of the input (to link it to its label for a11y)
     */
    id: PropTypes.string.isRequired,
    /**
     * object with shape: `{
     *   text: PropTypes.string,
     *   type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
     * }`
     */
    messages: PropTypes.arrayOf(FormPropTypes.message),
    messagesId: PropTypes.string,
    children: PropTypes.node,
    inline: PropTypes.bool,
    layout: PropTypes.oneOf(['stacked', 'inline']),
    labelAlign: PropTypes.oneOf(['start', 'end']),
    vAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
    width: PropTypes.string
  }

  static defaultProps = {
    inline: false,
    layout: 'stacked',
    labelAlign: 'end',
    vAlign: 'middle',
    messages: undefined,
    messagesId: undefined,
    children: null,
    width: undefined
  }

  render() {
    return (
      <FormFieldLayout
        {...omitProps(this.props, FormField.propTypes)}
        {...pickProps(this.props, FormFieldLayout.propTypes)}
        vAlign={this.props.vAlign}
        as="label"
        htmlFor={this.props.id}
      />
    )
  }
}

export default FormField
export { FormField }
