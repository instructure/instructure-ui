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
  isActiveElement,
  requestAnimationFrame,
  RequestAnimationFrameType,
  getBoundingClientRect
} from '@instructure/ui-dom-utils'
import { debounce } from '@instructure/debounce'
import { withStyle, jsx } from '@instructure/emotion'
import { uid } from '@instructure/uid'
import { px } from '@instructure/ui-utils'
import { testable } from '@instructure/ui-testable'
import { omitProps, pickProps } from '@instructure/ui-react-utils'
import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  label: React.ReactNode
  id?: string
  size?: 'small' | 'medium' | 'large'
  layout?: 'stacked' | 'inline'
  autoGrow?: boolean
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
  width?: string
  height?: string
  maxHeight?: number | string
  messages?: any[] // TODO: FormPropTypes.message
  inline?: boolean
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  textareaRef?: (...args: any[]) => any
  defaultValue?: string
  value?: any // TODO: controllable(PropTypes.string)
  onChange?: (...args: any[]) => any
  makeStyles?: (...args: any[]) => any
  styles?: any
}

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class TextArea extends Component<Props> {
  static componentId = 'TextArea'

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
    // @ts-expect-error ts-migrate(6133) FIXME: 'textarea' is declared but its value is never read... Remove this comment to see the full error message
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

  _listener: { remove(): void } | null = null
  _request: RequestAnimationFrameType | undefined

  constructor() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
    super()

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_defaultId' does not exist on type 'Text... Remove this comment to see the full error message
    this._defaultId = uid('TextArea')
  }

  componentDidMount() {
    this.autoGrow()
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.autoGrow()
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  componentWillUnmount() {
    if (this._listener) {
      this._listener.remove()
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_textareaResizeListener' does not exist ... Remove this comment to see the full error message
    if (this._textareaResizeListener) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_textareaResizeListener' does not exist ... Remove this comment to see the full error message
      this._textareaResizeListener.disconnect()
    }

    if (this._request) {
      this._request.cancel()
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_debounced' does not exist on type 'Text... Remove this comment to see the full error message
    if (this._debounced) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_debounced' does not exist on type 'Text... Remove this comment to see the full error message
      this._debounced.cancel()
    }
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'evt' is declared but its value is never read.
  _textareaResize = (evt) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_textarea' does not exist on type 'TextA... Remove this comment to see the full error message
    const textareaHeight = this._textarea.style.height
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_height' does not exist on type 'TextAre... Remove this comment to see the full error message
    if (textareaHeight !== '' && textareaHeight !== this._height) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_manuallyResized' does not exist on type... Remove this comment to see the full error message
      this._manuallyResized = true
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_textarea' does not exist on type 'TextA... Remove this comment to see the full error message
      this._textarea.style.overflowY = 'auto'

      // update container minHeight to ensure focus ring always wraps input
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_container' does not exist on type 'Text... Remove this comment to see the full error message
      this._container.style.minHeight = textareaHeight
    }
  }

  autoGrow() {
    if (this.props.autoGrow) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_debounced' does not exist on type 'Text... Remove this comment to see the full error message
      if (!this._debounced) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_debounced' does not exist on type 'Text... Remove this comment to see the full error message
        this._debounced = debounce(this.grow, 200, {
          leading: false,
          trailing: true
        })
      }

      if (!this._listener) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_debounced' does not exist on type 'Text... Remove this comment to see the full error message
        this._listener = addEventListener(window, 'resize', this._debounced)
      }

      // @ts-expect-error ts-migrate(2339) FIXME: Property '_textarea' does not exist on type 'TextA... Remove this comment to see the full error message
      if (this._textarea && !this._textareaResizeListener) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'height' does not exist on type '{}'.
        const { height: origHeight } = getBoundingClientRect(this._textarea)
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_textareaResizeListener' does not exist ... Remove this comment to see the full error message
        this._textareaResizeListener = new ResizeObserver((entries) => {
          for (const entry of entries) {
            const { height } = entry.contentRect

            if (origHeight !== height) {
              // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
              this._textareaResize()
            }
          }
        })

        // @ts-expect-error ts-migrate(2339) FIXME: Property '_textareaResizeListener' does not exist ... Remove this comment to see the full error message
        this._textareaResizeListener.observe(this._textarea)
      }

      this._request = requestAnimationFrame(this.grow)
    }
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'evt' is declared but its value is never read.
  grow = (evt) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_textarea' does not exist on type 'TextA... Remove this comment to see the full error message
    if (!this._textarea || this._manuallyResized) {
      return
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_textarea' does not exist on type 'TextA... Remove this comment to see the full error message
    const offset = this._textarea.offsetHeight - this._textarea.clientHeight
    let height = ''

    // Notes:
    // 1. height has be reset to `auto` every time this method runs, or scrollHeight will not reset
    // 2. `this._textarea.scrollHeight` will not reset if assigned to a variable; it needs to be written out each time
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_textarea' does not exist on type 'TextA... Remove this comment to see the full error message
    this._textarea.style.height = 'auto'
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_textarea' does not exist on type 'TextA... Remove this comment to see the full error message
    this._textarea.style.overflowY = 'hidden' // hide scrollbars for autoGrow textareas
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_textarea' does not exist on type 'TextA... Remove this comment to see the full error message
    height = this._textarea.scrollHeight + offset + 'px'

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_container' does not exist on type 'Text... Remove this comment to see the full error message
    const maxHeight = px(this.props.maxHeight, this._container)

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_textarea' does not exist on type 'TextA... Remove this comment to see the full error message
    if (this.props.maxHeight && this._textarea.scrollHeight > maxHeight) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_textarea' does not exist on type 'TextA... Remove this comment to see the full error message
      this._textarea.style.overflowY = 'auto' // add scroll if scrollHeight exceeds maxHeight in pixels
    } else if (this.props.height) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_textarea' does not exist on type 'TextA... Remove this comment to see the full error message
      if (this._textarea.value === '') {
        height = this.props.height
      } else if (
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_container' does not exist on type 'Text... Remove this comment to see the full error message
        px(this.props.height, this._container) > this._textarea.scrollHeight
      ) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_textarea' does not exist on type 'TextA... Remove this comment to see the full error message
        this._textarea.style.overflowY = 'auto' // add scroll if scrollHeight exceeds height in pixels
        height = this.props.height
      }
    }

    // preserve container height to prevent scroll jumping on long textareas,
    // but make sure container doesn't exceed maxHeight prop
    const heightExceedsMax = px(height) > maxHeight
    if (!heightExceedsMax) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_container' does not exist on type 'Text... Remove this comment to see the full error message
      this._container.style.minHeight = height
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_height' does not exist on type 'TextAre... Remove this comment to see the full error message
    this._height = height
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_textarea' does not exist on type 'TextA... Remove this comment to see the full error message
    this._textarea.style.height = height
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_textarea' does not exist on type 'TextA... Remove this comment to see the full error message
    this._textarea.scrollTop = this._textarea.scrollHeight
  }

  focus() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_textarea' does not exist on type 'TextA... Remove this comment to see the full error message
    this._textarea.focus()
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
  handleContainerRef = (node) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_container' does not exist on type 'Text... Remove this comment to see the full error message
    this._container = node
  }

  get minHeight() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_textarea' does not exist on type 'TextA... Remove this comment to see the full error message
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
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_defaultId' does not exist on type 'Text... Remove this comment to see the full error message
    return this.props.id || this._defaultId
  }

  get focused() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_textarea' does not exist on type 'TextA... Remove this comment to see the full error message
    return isActiveElement(this._textarea)
  }

  get value() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_textarea' does not exist on type 'TextA... Remove this comment to see the full error message
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

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
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
          // @ts-expect-error ts-migrate(2339) FIXME: Property '_textarea' does not exist on type 'TextA... Remove this comment to see the full error message
          this._textarea = textarea
          // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
          textareaRef.apply(this, [textarea].concat(args))
        }}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ width: string | undefined; resize: "none" ... Remove this comment to see the full error message
        style={style}
        id={this.id}
        required={required}
        aria-required={required}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '"true" | null' is not assignable to type 'bo... Remove this comment to see the full error message
        aria-invalid={this.invalid ? 'true' : null}
        disabled={disabled || readOnly}
        css={this.props.styles.textArea}
        onChange={this.handleChange}
      />
    )

    return (
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <FormField
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        {...pickProps(this.props, FormField.propTypes)}
        vAlign="top"
        id={this.id}
        ref={(el) => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property '_node' does not exist on type 'TextArea'... Remove this comment to see the full error message
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
