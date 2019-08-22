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
import { deprecated, callRenderProp, omitProps, pickProps } from '@instructure/ui-react-utils'
import { isActiveElement } from '@instructure/ui-dom-utils'
import { FormField, FormPropTypes } from '@instructure/ui-form-field'
import { Flex } from '@instructure/ui-flex'
import { uid } from '@instructure/uid'
import { themeable } from '@instructure/ui-themeable'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/
@deprecated('7.0.0', {
  label: 'renderLabel',
  disabled: 'interaction',
  readOnly: 'interaction',
  required: 'isRequired',
  inline: 'display'
})
@themeable(theme, styles)
class TextInput extends Component {
  static propTypes = {
    /**
    * The form field label.
    */
    renderLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
    * The type of input.
    */
    type: PropTypes.oneOf(['text', 'email', 'url', 'tel', 'search', 'password']),
    /**
    * The id of the text input. One is generated if not supplied.
    */
    id: PropTypes.string,
    /**
    * Specifies if interaction with the input is enabled, disabled, or readonly.
    * When "disabled", the input changes visibly to indicate that it cannot
    * receive user interactions. When "readonly" the input still cannot receive
    * user interactions but it keeps the same styles as if it were enabled.
    */
    interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
    /**
    * object with shape: `{
    * text: PropTypes.string,
    * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *   }`
    */
    messages: PropTypes.arrayOf(FormPropTypes.message),
    /**
    * The size of the text input.
    */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
    * The text alignment of the input.
    */
    textAlign: PropTypes.oneOf(['start', 'center']),
    /**
    * The width of the input.
    */
    width: PropTypes.string,
    /**
    * The display of the root element.
    */
    display: PropTypes.oneOf(['inline-block', 'block']),
    /**
    * Html placeholder text to display when the input has no value. This should be hint text, not a label
    * replacement.
    */
    placeholder: PropTypes.string,
    /**
    * Whether or not the text input is required.
    */
    isRequired: PropTypes.bool,
    /**
    * a function that provides a reference to the actual input element
    */
    inputRef: PropTypes.func,
    /**
    * a function that provides a reference a parent of the input element
    */
    inputContainerRef: PropTypes.func,
    /**
    * the selected value (must be accompanied by an `onChange` prop)
    */
    value: controllable(PropTypes.string),
    /**
    * Content to display before the input text, such as an icon
    */
    renderBeforeInput: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
    * Content to display after the input text, such as an icon
    */
    renderAfterInput: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
    * Callback executed when the input fires a change event.
    * @param {Object} event - the event object
    * @param {Object} value - the string value of the input
    */
    onChange: PropTypes.func,
    /**
    * Callback fired when input loses focus.
    */
    onBlur: PropTypes.func,
    /**
    * Callback fired when input receives focus.
    */
    onFocus: PropTypes.func,
    /**
    * deprecated
    */
    label: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
    * deprecated
    */
    disabled: PropTypes.bool,
    /**
    * deprecated
    */
    readOnly: PropTypes.bool,
    /**
    * deprecated
    */
    required: PropTypes.bool,
    /**
    * deprecated
    */
    inline: PropTypes.bool
  }

  static defaultProps = {
    renderLabel: undefined,
    type: 'text',
    id: undefined,
    interaction: 'enabled',
    isRequired: false,
    value: undefined,
    display: 'block',
    placeholder: undefined,
    width: undefined,
    size: 'medium',
    textAlign: 'start',
    messages: [],
    inputRef: function (input) {},
    inputContainerRef: function (container) {},
    onChange: function (event, value) {},
    onBlur: function (event) {},
    onFocus: function (event) {},
    renderBeforeInput: undefined,
    renderAfterInput: undefined,
    label: undefined,
    disabled: undefined,
    readOnly: undefined,
    required: undefined,
    inline: undefined
  }

  constructor (props) {
    super()
    this.state = { hasFocus: false }
    this._defaultId = uid('TextInput')
    this._messagesId = uid('TextInput-messages')
  }

  focus () {
    this._input.focus()
  }

  get hasMessages () {
    return this.props.messages && (this.props.messages.length > 0)
  }

  get invalid () {
    return this.props.messages && this.props.messages.findIndex((message) => { return message.type === 'error' }) >= 0
  }

  get focused () {
    return isActiveElement(this._input)
  }

  get value () {
    return this._input.value
  }

  get id () {
    return this.props.id || this._defaultId
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
    this.setState({
      hasFocus: false
    })
  }

  handleFocus = (event) => {
    this.props.onFocus(event)
    this.setState({
      hasFocus: true
    })
  }

  renderInput () {
    const {
      type,
      size,
      textAlign,
      placeholder,
      value,
      disabled,
      readOnly,
      interaction,
      required,
      isRequired
    } = this.props

    const props = omitProps(this.props, TextInput.propTypes, ['layout'])

    const inputClasses = {
      [styles.input]: true,
      [styles[size]]: size,
      [styles[`textAlign--${textAlign}`]]: textAlign
    }

    let descriptionIds = ''
    if (props['aria-describedby']) {
      descriptionIds = `${props['aria-describedby']}`
    }
    if (this.hasMessages) {
      descriptionIds = descriptionIds !== ''
      ? `${descriptionIds} ${this._messagesId}`
      : this._messagesId
    }

    return (
      <input
        {...props}
        className={classnames(inputClasses)}
        value={value}
        placeholder={placeholder}
        ref={this.handleInputRef}
        type={type}
        id={this.id}
        required={isRequired || required}
        aria-invalid={this.invalid ? 'true' : null}
        disabled={interaction === 'disabled' || disabled}
        readOnly={interaction === 'readonly' || readOnly}
        aria-describedby={descriptionIds !== '' ? descriptionIds : null}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
      />
    )
  }

  render () {
    const {
      interaction,
      disabled,
      width,
      inline,
      display,
      label,
      renderLabel,
      renderBeforeInput,
      renderAfterInput
    } = this.props

    const renderBeforeOrAfter = renderBeforeInput || renderAfterInput

    const facadeClasses = {
      [styles.facade]: true,
      [styles.disabled]: interaction === 'disabled' || disabled,
      [styles.invalid]: this.invalid,
      [styles.focused]: this.state.hasFocus
    }

    return (
      <FormField
        {...pickProps(this.props, FormField.propTypes)}
        id={this.id}
        label={callRenderProp(renderLabel || label)}
        messagesId={this._messagesId}
        inline={display === 'inline-block' || inline}
        width={width}
      >
        <span className={classnames(facadeClasses)}>
          {
            renderBeforeOrAfter ?
              <Flex wrap="wrap" __dangerouslyIgnoreExperimentalWarnings>
                {renderBeforeInput &&
                  <Flex.Item padding="0 0 0 small">
                    {callRenderProp(renderBeforeInput)}
                  </Flex.Item>
                }
                <Flex.Item shouldGrow shouldShrink>

                  {/*
                    The input and content after input should not wrap, so they're in their own
                    Flex container
                  */}
                  <Flex __dangerouslyIgnoreExperimentalWarnings>
                    <Flex.Item shouldGrow shouldShrink>
                      {this.renderInput()}
                    </Flex.Item>
                    {renderAfterInput &&
                      <Flex.Item padding="0 small 0 0">
                        {callRenderProp(renderAfterInput)}
                      </Flex.Item>
                    }
                  </Flex>

                </Flex.Item>
              </Flex>

              /* If no prepended or appended content, don't render Flex layout */
              : this.renderInput()
          }
        </span>
      </FormField>
    )
  }
}

export default TextInput
export { TextInput }
