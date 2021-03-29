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
import { FormField, FormPropTypes } from '@instructure/ui-form-field'
import {
  addEventListener,
  addResizeListener,
  isActiveElement,
  requestAnimationFrame
} from '@instructure/ui-dom-utils'
import { debounce } from '@instructure/debounce'
import { withStyle, jsx } from '@instructure/emotion'
import { uid } from '@instructure/uid'
import { px } from '@instructure/ui-utils'
import { testable } from '@instructure/ui-testable'
import { omitProps, pickProps } from '@instructure/ui-react-utils'
import generateStyle from './styles'
import generateComponentTheme from './theme'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
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
     * Initial height for the textarea (if autoGrow is true it will grow vertically)
     * Accepts CSS units, e.g. '55px'
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
    /**
     * Sets the required property on the underlying native textArea
     */
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
    onChange: PropTypes.func,

    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object
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

  constructor() {
    super()

    this._defaultId = uid('TextArea')
  }

  componentDidMount() {
    this.autoGrow()
    this.props.makeStyles()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.autoGrow()
    this.props.makeStyles()
  }

  componentWillUnmount() {
    if (this._listener) {
      this._listener.remove()
    }

    if (this._textareaResizeListener) {
      this._textareaResizeListener.remove()
    }

    if (this._request) {
      this._request.cancel()
    }

    if (this._debounced) {
      this._debounced.cancel()
    }
  }

  _textareaResize = (evt) => {
    const textareaHeight = this._textarea.style.height
    if (textareaHeight !== '' && textareaHeight !== this._height) {
      this._manuallyResized = true
      this._textarea.style.overflowY = 'auto'

      // update container minHeight to ensure focus ring always wraps input
      this._container.style.minHeight = textareaHeight
    }
  }

  autoGrow() {
    if (this.props.autoGrow) {
      if (!this._debounced) {
        this._debounced = debounce(this.grow, 200, {
          leading: false,
          trailing: true
        })
      }

      if (!this._listener) {
        this._listener = addEventListener(window, 'resize', this._debounced)
      }

      if (this._textarea && !this._textareaResizeListener) {
        this._textareaResizeListener = addResizeListener(
          this._textarea,
          this._textareaResize,
          ['height']
        )
      }

      this._request = requestAnimationFrame(this.grow)
    }
  }

  grow = (evt) => {
    if (!this._textarea || this._manuallyResized) {
      return
    }
    const offset = this._textarea.offsetHeight - this._textarea.clientHeight
    let height = ''

    // Notes:
    // 1. height has be reset to `auto` every time this method runs, or scrollHeight will not reset
    // 2. `this._textarea.scrollHeight` will not reset if assigned to a variable; it needs to be written out each time
    this._textarea.style.height = 'auto'
    this._textarea.style.overflowY = 'hidden' // hide scrollbars for autoGrow textareas
    height = this._textarea.scrollHeight + offset + 'px'

    const maxHeight = px(this.props.maxHeight, this._container)

    if (this.props.maxHeight && this._textarea.scrollHeight > maxHeight) {
      this._textarea.style.overflowY = 'auto' // add scroll if scrollHeight exceeds maxHeight in pixels
    } else if (this.props.height) {
      if (this._textarea.value === '') {
        height = this.props.height
      } else if (
        px(this.props.height, this._container) > this._textarea.scrollHeight
      ) {
        this._textarea.style.overflowY = 'auto' // add scroll if scrollHeight exceeds height in pixels
        height = this.props.height
      }
    }

    // preserve container height to prevent scroll jumping on long textareas,
    // but make sure container doesn't exceed maxHeight prop
    const heightExceedsMax = px(height) > maxHeight
    if (!heightExceedsMax) {
      this._container.style.minHeight = height
    }

    this._height = height
    this._textarea.style.height = height
    this._textarea.scrollTop = this._textarea.scrollHeight
  }

  focus() {
    this._textarea.focus()
  }

  handleChange = (event) => {
    const { onChange, value, disabled, readOnly } = this.props

    if (disabled || readOnly) {
      event.preventDefault()
      return
    }

    if (typeof value === 'undefined') {
      // if uncontrolled
      this.autoGrow()
    }

    if (typeof onChange === 'function') {
      onChange(event)
    }
  }

  handleContainerRef = (node) => {
    this._container = node
  }

  get minHeight() {
    return this._textarea.style.minHeight
  }

  get invalid() {
    return (
      this.props.messages &&
      this.props.messages.findIndex((message) => {
        return message.type === 'error'
      }) >= 0
    )
  }

  get id() {
    return this.props.id || this._defaultId
  }

  get focused() {
    return isActiveElement(this._textarea)
  }

  get value() {
    return this._textarea.value
  }

  render() {
    const {
      autoGrow,
      placeholder,
      value,
      defaultValue,
      disabled,
      readOnly,
      required,
      width,
      height,
      maxHeight,
      textareaRef,
      resize
    } = this.props

    const props = omitProps(this.props, TextArea.propTypes)

    const style = {
      width: width,
      resize: resize,
      height: !autoGrow ? height : null,
      maxHeight: maxHeight
    }

    const textarea = (
      <textarea
        {...props}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        ref={(textarea, ...args) => {
          this._textarea = textarea
          textareaRef.apply(this, [textarea].concat(args))
        }}
        style={style}
        id={this.id}
        required={required}
        aria-required={required}
        aria-invalid={this.invalid ? 'true' : null}
        disabled={disabled || readOnly}
        css={this.props.styles.textArea}
        onChange={this.handleChange}
      />
    )

    return (
      <FormField
        {...pickProps(this.props, FormField.propTypes)}
        vAlign="top"
        id={this.id}
        ref={(el) => {
          this._node = el
        }}
      >
        <div
          css={this.props.styles.textAreaLayout}
          style={{
            width: width,
            maxHeight: maxHeight
          }}
          ref={this.handleContainerRef}
        >
          {textarea}
          {!disabled && !readOnly ? (
            <span css={this.props.styles.textAreaOutline} aria-hidden="true" />
          ) : null}
        </div>
      </FormField>
    )
  }
}

export default TextArea
export { TextArea }
