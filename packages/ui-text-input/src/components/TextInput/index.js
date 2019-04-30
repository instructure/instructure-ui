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
import callRenderProp from '@instructure/ui-react-utils/lib/callRenderProp'
import isActiveElement from '@instructure/ui-dom-utils/lib/isActiveElement'
import FormField from '@instructure/ui-form-field/lib/components/FormField'
import FormPropTypes from '@instructure/ui-form-field/lib/utils/FormPropTypes'
import Flex, { FlexItem } from '@instructure/ui-layout/lib/Flex'
import uid from '@instructure/uid'
import themeable from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-react-utils/lib/omitProps'
import { pickProps } from '@instructure/ui-react-utils/lib/pickProps'

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
    * Content to display before the input text, such as an icon
    */
    renderBeforeInput: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
    * Content to display after the input text, such as an icon
    */
    renderAfterInput: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func
  }

  static defaultProps = {
    id: undefined,
    required: false,
    value: undefined,
    inline: false,
    placeholder: undefined,
    width: undefined,
    label: undefined,
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
    renderBeforeInput: undefined,
    renderAfterInput: undefined,
    layout: 'stacked'
  }

  constructor (props) {
    super()
    this.state = { focused: false }
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
      focused: false
    })
  }

  handleFocus = (event) => {
    this.props.onFocus(event)
    this.setState({
      focused: true
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
      required
    } = this.props

    const props = omitProps(this.props, TextInput.propTypes)

    const inputClasses = {
      [styles.input]: true,
      [styles[size]]: size,
      [styles[`textAlign--${textAlign}`]]: textAlign
    }

    let descriptionIds = ''
    if (props['aria-describedby']) {
      descriptionIds = `${props['aria-describedby'] }`
    }
    if (this.hasMessages) {
      descriptionIds += this._messagesId
    }

    return (
      <input
        {...props}
        value={value}
        placeholder={placeholder}
        ref={this.handleInputRef}
        type={type}
        id={this.id}
        required={required}
        aria-required={required}
        aria-invalid={this.invalid ? 'true' : null}
        disabled={disabled}
        readOnly={readOnly}
        className={classnames(inputClasses)}
        aria-describedby={descriptionIds !== '' ? descriptionIds : null}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
      />
    )
  }

  render () {
    const {
      disabled,
      width,
      renderBeforeInput,
      renderAfterInput
    } = this.props

    const renderBeforeOrAfter = renderBeforeInput || renderAfterInput

    const facadeClasses = {
      [styles.facade]: true,
      [styles.disabled]: disabled,
      [styles.invalid]: this.invalid,
      [styles.focused]: this.state.focused
    }

    return (
      <FormField
        {...pickProps(this.props, FormField.propTypes)}
        id={this.id}
        messagesId={this._messagesId}
        width={width}
      >
        <span className={classnames(facadeClasses)}>
          {
            renderBeforeOrAfter ?
              <Flex wrapItems>
                {renderBeforeInput &&
                  <FlexItem padding="0 0 0 x-small">
                    {callRenderProp(renderBeforeInput)}
                  </FlexItem>
                }
                <FlexItem grow shrink>

                  {/*
                    The input and content after input should not wrap, so they're in their own
                    Flex container
                  */}
                  <Flex>
                    <FlexItem grow shrink>
                      {this.renderInput()}
                    </FlexItem>
                    {renderAfterInput &&
                      <FlexItem padding="0 x-small 0 0">
                        {callRenderProp(renderAfterInput)}
                      </FlexItem>
                    }
                  </Flex>

                </FlexItem>
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
