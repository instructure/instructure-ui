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
import FormField from '@instructure/ui-form-field/lib/components/FormField'
import FormPropTypes from '@instructure/ui-form-field/lib/utils/FormPropTypes'
import uid from '@instructure/uid'
import isActiveElement from '@instructure/ui-utils/lib/dom/isActiveElement'
import themeable from '@instructure/ui-themeable'
import { pickProps, omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
id: TextInputControlled
---
**/
@themeable(theme, styles)
class TextInput extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['text', 'email', 'url', 'tel', 'search', 'password']),
    label: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
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
    * the selected value (must be accompanied by an `onChange` prop)
    */
    value: controllable(PropTypes.string),
    /**
    * Content to display after the input text, such as an icon
    */
    renderAfterInput: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func
  }

  static defaultProps = {
    inline: false,
    type: 'text',
    size: 'medium',
    textAlign: 'start',
    messages: [],
    disabled: false,
    readOnly: false,
    inputRef: function (input) {},
    onChange: function (event, value) {},
    onBlur: function (event) {},
    onFocus: function (event) {},
    layout: 'stacked'
  }

  constructor (props) {
    super()

    this._defaultId = uid('TextInputControlled')
    this._messagesId = uid('TextInputControlled-messages')
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

  handleChange = (event) => {
    this.props.onChange(event, event.target.value)
  }

  handleBlur = (event) => {
    this.props.onBlur(event)
  }

  handleFocus = (event) => {
    this.props.onFocus(event)
  }

  renderAfterInput () { //TODO: refactor when we add renderBeforeInput prop
    const Content = this.props.renderAfterInput

    if (typeof Content === 'function') {
      return (
        <span
          className={styles.contentAfterInput}
          aria-hidden="true"
        >
          <Content />
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
      disabled,
      readOnly,
      required,
      width,
      renderAfterInput
    } = this.props

    const props = omitProps(this.props, TextInput.propTypes)

    const classes = {
      [styles.input]: true,
      [styles[size]]: size,
      [styles[`textAlign--${textAlign}`]]: textAlign,
      [styles.hasContentAfterInput]: renderAfterInput,
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
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
          />
          {
            (!disabled && !readOnly)
            ? <span className={styles.outline} aria-hidden="true"></span> : null
          }
          {this.renderAfterInput()}
        </span>
      </FormField>
    )
  }
}

export default TextInput
