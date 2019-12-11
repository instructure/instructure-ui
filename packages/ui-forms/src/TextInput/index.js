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
import classnames from 'classnames'

import { controllable } from '@instructure/ui-prop-types'
import { FormField, FormPropTypes } from '@instructure/ui-form-field'
import { uid } from '@instructure/uid'
import { deprecated, omitProps, pickProps } from '@instructure/ui-react-utils'
import { isActiveElement } from '@instructure/ui-dom-utils'
import { themeable } from '@instructure/ui-themeable'
import { testable } from '@instructure/ui-testable'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/deprecated
id: DeprecatedTextInput
---
**/
@deprecated('7.0.0', null, 'Use TextInput from ui-text-input instead.')
@testable()
@themeable(theme, styles)
class TextInput extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['text', 'email', 'url', 'tel', 'search', 'password']),
    label: PropTypes.node.isRequired,
    id: PropTypes.string,
    /**
    * object with shape: `{
    * text: PropTypes.string,
    * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *   }`
    */
    messages: PropTypes.arrayOf(FormPropTypes.message),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    layout: PropTypes.oneOf(['stacked', 'inline']),
    textAlign: PropTypes.oneOf(['start', 'center']),
    width: PropTypes.string,
    inline: PropTypes.bool,
    /**
    * Html placeholder text to display when the input has no value. This should be hint text, not a label
    * replacement.
    */
    placeholder: PropTypes.string,
    /**
     * Whether or not to disable the input
     */
    disabled: PropTypes.bool,
    /**
     * Works just like disabled but keeps the same styles as if it were active
     */
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    /**
    * a function that provides a reference to the actual input element
    */
    inputRef: PropTypes.func,
    /**
    * value to set on initial render
    */
    defaultValue: PropTypes.string,
    /**
    * the selected value (must be accompanied by an `onChange` prop)
    */
    value: controllable(PropTypes.string),
    /**
    * An icon to display within the input
    */
    icon: PropTypes.func
  }

  static defaultProps = {
    id: undefined,
    width: undefined,
    placeholder: undefined,
    required: false,
    defaultValue: undefined,
    value: undefined,
    icon: undefined,
    inline: false,
    type: 'text',
    size: 'medium',
    textAlign: 'start',
    messages: [],
    disabled: false,
    readOnly: false,
    inputRef: function (input) {},
    layout: 'stacked'
  }

  constructor (props) {
    super()

    this._defaultId = uid('TextInput')
    this._messagesId = uid('TextInput-messages')
  }

  /**
  * focus the input element
  */
  focus () {
    this._input.focus()
  }

  get hasMessages () {
    return this.props.messages && (this.props.messages.length > 0)
  }

  get invalid () {
    return this.props.messages && this.props.messages.findIndex((message) => { return message.type === 'error' }) >= 0
  }

  get id () {
    return this.props.id || this._defaultId
  }

  get focused () {
    return isActiveElement(this._input)
  }

  get value () {
    return this._input.value
  }

  handleInputRef = node => {
    this._input = node
    this.props.inputRef(node)
  }

  renderIcon () {
    const Icon = this.props.icon

    if (typeof Icon === 'function') {
      return (
        <span className={styles.icon} aria-hidden="true">
          <Icon />
        </span>
      )
    } else {
      return null
    }
  }

  render () {
    const {
      type,
      size,
      textAlign,
      placeholder,
      value,
      defaultValue,
      disabled,
      readOnly,
      required,
      width,
      icon
    } = this.props

    const props = omitProps(this.props, TextInput.propTypes)

    const classes = {
      [styles.input]: true,
      [styles[size]]: size,
      [styles[`textAlign--${textAlign}`]]: textAlign,
      [styles.hasIcon]: icon,
      [styles.disabled]: disabled
    }

    const style = width ? { width } : null

    let descriptionIds = ''
    if (props['aria-describedby']) {
      descriptionIds = `${props['aria-describedby'] }`
    }
    if (this.hasMessages) {
      descriptionIds += this._messagesId
    }

    return (
      <FormField
        {...pickProps(this.props, FormField.propTypes)}
        id={this.id}
        messagesId={this._messagesId}
      >
        <span className={styles.layout}>
          <input
            {...props}
            value={value}
            style={style}
            defaultValue={defaultValue}
            placeholder={placeholder}
            ref={this.handleInputRef}
            type={type}
            id={this.id}
            required={required}
            aria-required={required}
            aria-invalid={this.invalid ? 'true' : null}
            disabled={disabled || readOnly}
            className={classnames(classes)}
            aria-describedby={descriptionIds !== '' ? descriptionIds : null}
          />
          {
            (!disabled && !readOnly)
            ? <span className={styles.outline} aria-hidden="true"></span> : null
          }
          {this.renderIcon()}
        </span>
      </FormField>
    )
  }
}

export default TextInput
export { TextInput }
