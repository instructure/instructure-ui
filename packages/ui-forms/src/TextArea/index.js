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

import { controllable } from '@instructure/ui-prop-types'
import { FormPropTypes } from '@instructure/ui-form-field'
import { deprecated } from '@instructure/ui-react-utils'

import { TextArea as UITextArea } from '@instructure/ui-text-area'

/**
---
category: components/deprecated
id: DeprecatedTextArea
---
**/
@deprecated('7.0.0', null, 'Use TextArea from ui-text-area instead.')

class TextArea extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
    id: PropTypes.string,
    /**
    * sets the font-size for the textarea
    */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    layout: PropTypes.oneOf(['stacked', 'inline']),
    /**
    * the textarea will expand vertically to fit the height of the content,
    * unless its content exceeds `maxHeight`
    */
    autoGrow: PropTypes.bool,
    /**
    * is the textarea resizable (in supported browsers)
    */
    resize: PropTypes.oneOf(['none', 'both', 'horizontal', 'vertical']),
    /**
    * a fixed width for the textarea
    */
    width: PropTypes.string,
    /**
    * a initial height for the textarea (if autoGrow is true it will grow vertically)
    */
    height: PropTypes.string,
    /**
    * when autoGrow is true, the textarea will never grow beyond this value
    */
    maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
    * object with shape: `{
    * text: PropTypes.string,
    * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *   }`
    */
    messages: PropTypes.arrayOf(FormPropTypes.message),
    inline: PropTypes.bool,
    /**
    * Html placeholder text to display when the input has no value. This should be hint text, not a label
    * replacement.
    */
    placeholder: PropTypes.string,
    /**
     * Whether or not to disable the textarea
     */
    disabled: PropTypes.bool,
    /**
     * Works just like disabled but keeps the same styles as if it were active
     */
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    /**
    * a function that provides a reference to the actual textarea element
    */
    textareaRef: PropTypes.func,
    /**
    * value to set on initial render
    */
    defaultValue: PropTypes.string,
    /**
    * the selected value (must be accompanied by an `onChange` prop)
    */
    value: controllable(PropTypes.string),
    /**
    * when used with the `value` prop, the component will not control its own state
    */
    onChange: PropTypes.func
  }

  static defaultProps = {
    size: 'medium',
    autoGrow: true,
    resize: 'none',
    inline: false,
    messages: [],
    disabled: false,
    readOnly: false,
    textareaRef: function (textarea) {},
    layout: 'stacked',
    id: undefined,
    value: undefined,
    defaultValue: undefined,
    onChange: undefined,
    required: false,
    placeholder: undefined,
    width: undefined,
    height: undefined,
    maxHeight: undefined
  }

  _textArea = null

  focus () {
    this._textArea && this._textArea.focus()
  }

  get minHeight () {
    return this._textArea && this._textArea.minHeight
  }

  get invalid () {
    return this._textArea && this._textArea.invalid
  }

  get id () {
    return this._textArea && this._textArea.id
  }

  get focused () {
    return this._textArea && this._textArea.focused
  }

  get value () {
    return this._textArea && this._textArea.value
  }

  render () {
    return (
      <UITextArea
        ref={(component) => { this._textArea = component }}
        {...this.props}
      />
    )
  }
}

export default TextArea
export { TextArea }
