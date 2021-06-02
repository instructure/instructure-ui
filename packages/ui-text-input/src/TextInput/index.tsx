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
import PropTypes from 'prop-types'

import { controllable } from '@instructure/ui-prop-types'
import {
  callRenderProp,
  getInteraction,
  passthroughProps
} from '@instructure/ui-react-utils'
import { isActiveElement } from '@instructure/ui-dom-utils'
import { FormField, FormPropTypes } from '@instructure/ui-form-field'
import { Flex } from '@instructure/ui-flex'
import { uid } from '@instructure/uid'
import { testable } from '@instructure/ui-testable'
import { withStyle, jsx } from '@instructure/emotion'
import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  renderLabel?: React.ReactNode | ((...args: any[]) => any)
  type?: 'text' | 'email' | 'url' | 'tel' | 'search' | 'password'
  id?: string
  value?: any // TODO: controllable(PropTypes.string)
  defaultValue?: string
  interaction?: 'enabled' | 'disabled' | 'readonly'
  messages?: any[] // TODO: FormPropTypes.message
  size?: 'small' | 'medium' | 'large'
  textAlign?: 'start' | 'center'
  width?: string
  htmlSize?: string | number
  display?: 'inline-block' | 'block'
  shouldNotWrap?: boolean
  placeholder?: string
  isRequired?: boolean
  inputRef?: (...args: any[]) => any
  inputContainerRef?: (...args: any[]) => any
  renderBeforeInput?: React.ReactNode | ((...args: any[]) => any)
  renderAfterInput?: React.ReactNode | ((...args: any[]) => any)
  onChange?: (...args: any[]) => any
  onBlur?: (...args: any[]) => any
  onFocus?: (...args: any[]) => any
  makeStyles?: (...args: any[]) => any
  styles?: any
}

/**
---
category: components
tags: form, field
---
**/
@withStyle(generateStyle, generateComponentTheme, ['size', 'textAlign', 'as'])
@testable()
class TextInput extends Component<Props> {
  static propTypes = {
    /**
     * The form field label.
     */
    renderLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * Determines the underlying native HTML `<input>` element's `type`.
     * For more see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/url
     */
    type: PropTypes.oneOf([
      'text',
      'email',
      'url',
      'tel',
      'search',
      'password'
    ]),
    /**
     * The id of the text input. One is generated if not supplied.
     */
    id: PropTypes.string,
    /**
     * the selected value (must be accompanied by an `onChange` prop)
     */
    value: controllable(PropTypes.string),
    /**
     * value to set on initial render
     */
    defaultValue: PropTypes.string,
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
     * The width of the input, in characters, if a width is not explicitly
     * provided via the `width` prop. Only applicable if `isInline={true}`.
     */
    htmlSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * The display of the root element.
     */
    display: PropTypes.oneOf(['inline-block', 'block']),
    /**
     * Prevents the default behavior of wrapping the input and rendered content
     * when available space is exceeded.
     */
    shouldNotWrap: PropTypes.bool,
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

    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object
  }

  static defaultProps = {
    renderLabel: undefined,
    type: 'text',
    id: undefined,
    // Leave interaction default undefined so that `disabled` and `readOnly` can also be supplied
    interaction: undefined,
    isRequired: false,
    value: undefined,
    defaultValue: undefined,
    display: 'block',
    shouldNotWrap: false,
    placeholder: undefined,
    width: undefined,
    size: 'medium',
    htmlSize: undefined,
    textAlign: 'start',
    messages: [],
    // @ts-expect-error ts-migrate(6133) FIXME: 'input' is declared but its value is never read.
    inputRef: function (input) {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'container' is declared but its value is never rea... Remove this comment to see the full error message
    inputContainerRef: function (container) {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onChange: function (event, value) {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onBlur: function (event) {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onFocus: function (event) {},
    renderBeforeInput: undefined,
    renderAfterInput: undefined
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    super(props)
    this.state = { hasFocus: false }
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_defaultId' does not exist on type 'Text... Remove this comment to see the full error message
    this._defaultId = uid('TextInput')
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_messagesId' does not exist on type 'Tex... Remove this comment to see the full error message
    this._messagesId = uid('TextInput-messages')
  }

  componentDidMount() {
    const { disabled, invalid, focused } = this.makeStyleProps()
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles({ disabled, invalid, focused })
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { disabled, invalid, focused } = this.makeStyleProps()
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles({ disabled, invalid, focused })
  }

  makeStyleProps = () => {
    const { interaction } = this
    return {
      disabled: interaction === 'disabled',
      invalid: this.invalid,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'hasFocus' does not exist on type 'Readon... Remove this comment to see the full error message
      focused: this.state.hasFocus
    }
  }

  focus() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_input' does not exist on type 'TextInpu... Remove this comment to see the full error message
    this._input.focus()
  }

  get interaction() {
    // @ts-expect-error ts-migrate(2739) FIXME: Type 'Readonly<Props> & Readonly<{ children?: Reac... Remove this comment to see the full error message
    return getInteraction({ props: this.props })
  }

  get hasMessages() {
    return this.props.messages && this.props.messages.length > 0
  }

  get invalid() {
    return (
      this.props.messages &&
      this.props.messages.findIndex((message) => {
        return message.type === 'error'
      }) >= 0
    )
  }

  get focused() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_input' does not exist on type 'TextInpu... Remove this comment to see the full error message
    return isActiveElement(this._input)
  }

  get value() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_input' does not exist on type 'TextInpu... Remove this comment to see the full error message
    return this._input.value
  }

  get id() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_defaultId' does not exist on type 'Text... Remove this comment to see the full error message
    return this.props.id || this._defaultId
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
  handleInputRef = (node) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_input' does not exist on type 'TextInpu... Remove this comment to see the full error message
    this._input = node
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.inputRef(node)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleChange = (event) => {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.onChange(event, event.target.value)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleBlur = (event) => {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.onBlur(event)
    this.setState({
      hasFocus: false
    })
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleFocus = (event) => {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.onFocus(event)
    this.setState({
      hasFocus: true
    })
  }

  renderInput() {
    const {
      type,
      size,
      htmlSize,
      display,
      textAlign,
      placeholder,
      value,
      defaultValue,
      isRequired,
      ...rest
    } = this.props

    const props = passthroughProps(rest)

    const { interaction } = this

    let descriptionIds = ''
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (props['aria-describedby']) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      descriptionIds = `${props['aria-describedby']}`
    }

    if (this.hasMessages) {
      descriptionIds =
        descriptionIds !== ''
          ? // @ts-expect-error ts-migrate(2339) FIXME: Property '_messagesId' does not exist on type 'Tex... Remove this comment to see the full error message
            `${descriptionIds} ${this._messagesId}`
          : // @ts-expect-error ts-migrate(2339) FIXME: Property '_messagesId' does not exist on type 'Tex... Remove this comment to see the full error message
            this._messagesId
    }

    return (
      <input
        {...props}
        css={this.props.styles.textInput}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        ref={this.handleInputRef}
        type={type}
        id={this.id}
        required={isRequired}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '"true" | null' is not assignable to type 'bo... Remove this comment to see the full error message
        aria-invalid={this.invalid ? 'true' : null}
        disabled={interaction === 'disabled'}
        readOnly={interaction === 'readonly'}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
        aria-describedby={descriptionIds !== '' ? descriptionIds : null}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string | number | undefined' is not assignab... Remove this comment to see the full error message
        size={htmlSize}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
      />
    )
  }

  render() {
    const {
      width,
      display,
      renderLabel,
      renderBeforeInput,
      renderAfterInput,
      messages,
      inputContainerRef,
      shouldNotWrap
    } = this.props

    const hasBeforeElement =
      renderBeforeInput && callRenderProp(renderBeforeInput)
    const hasAfterElement = renderAfterInput && callRenderProp(renderAfterInput)

    const renderBeforeOrAfter = hasBeforeElement || hasAfterElement

    return (
      <FormField
        id={this.id}
        label={callRenderProp(renderLabel)}
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_messagesId' does not exist on type 'Tex... Remove this comment to see the full error message
        messagesId={this._messagesId}
        messages={messages}
        inline={display === 'inline-block'}
        width={width}
        inputContainerRef={inputContainerRef}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'layout' does not exist on type 'Readonly... Remove this comment to see the full error message
        layout={this.props.layout} // eslint-disable-line react/prop-types
      >
        <span css={this.props.styles.facade}>
          {renderBeforeOrAfter ? (
            <Flex wrap={shouldNotWrap ? 'no-wrap' : 'wrap'}>
              {hasBeforeElement && (
                <Flex.Item padding="0 0 0 small">
                  {callRenderProp(renderBeforeInput)}
                </Flex.Item>
              )}
              <Flex.Item shouldGrow shouldShrink>
                {/*
                    The input and content after input should not wrap, so they're in their own
                    Flex container
                  */}
                <Flex>
                  <Flex.Item shouldGrow shouldShrink>
                    {this.renderInput()}
                  </Flex.Item>
                  {hasAfterElement && (
                    <Flex.Item padding="0 small 0 0">
                      {callRenderProp(renderAfterInput)}
                    </Flex.Item>
                  )}
                </Flex>
              </Flex.Item>
            </Flex>
          ) : (
            /* If no prepended or appended content, don't render Flex layout */
            this.renderInput()
          )}
        </span>
      </FormField>
    )
  }
}

export default TextInput
export { TextInput }
