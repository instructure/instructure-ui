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

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import themeable from '@instructure/ui-themeable'
import debounce from '@instructure/ui-utils/lib/debounce'
import addEventListener from '@instructure/ui-utils/lib/dom/addEventListener'
import addResizeListener from '@instructure/ui-utils/lib/dom/addResizeListener'
import findDOMNode from '@instructure/ui-utils/lib/dom/findDOMNode'
import requestAnimationFrame from '@instructure/ui-utils/lib/dom/requestAnimationFrame'
import isActiveElement from '@instructure/ui-utils/lib/dom/isActiveElement'
import px from '@instructure/ui-utils/lib/px'
import { pickProps, omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import generateElementId from '@instructure/ui-utils/lib/dom/generateElementId'

import styles from './styles.css'
import theme from './theme'

import FormPropTypes from '../../utils/FormPropTypes'
import FormField from '../FormField'

/**
---
category: components
---
**/
@themeable(theme, styles)
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
    value: CustomPropTypes.controllable(PropTypes.string),
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
    layout: 'stacked'
  }

  constructor () {
    super()

    this._defaultId = generateElementId('TextArea')
  }

  componentDidMount () {
    this.autoGrow()
  }

  componentWillReceiveProps (nextProps) {
    this.autoGrow()
  }

  componentWillUnmount () {
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
    if(this._textarea.style.height != this._height) {
      this._manuallyResized = true
      this._textarea.style.overflowY = 'auto'
    }
  }

  autoGrow () {
    if (this.props.autoGrow) {
      if (!this._debounced) {
        this._debounced = debounce(this.grow, 200, {leading: false, trailing: true})
      }

      if (!this._listener) {
        this._listener = addEventListener(window, 'resize', this._debounced)
      }

      if (this._textarea && !this._textareaResizeListener) {
        this._textareaResizeListener = addResizeListener(this._textarea, this._textareaResize, ['height'])
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

    // Note:
    // 1. height has be reset to `auto` every time this method runs, or scrollHeight will not reset
    this._textarea.style.height = 'auto'
    // 2. `this._textarea.scrollHeight` will not reset if assigned to a variable; it needs to be written out each time

    this._textarea.style.overflowY = 'hidden' // hide scrollbars for autoGrow textareas
    height = (this._textarea.scrollHeight + offset) + 'px'

    if (
      this.props.maxHeight &&
      (this._textarea.scrollHeight > px(this.props.maxHeight, findDOMNode(this)))) {
      this._textarea.style.overflowY = 'auto' // add scroll if scrollHeight exceeds maxHeight in pixels
    } else if (this.props.height) {
      if (this._textarea.value === '') {
        height = this.props.height
      } else if (px(this.props.height, findDOMNode(this)) > this._textarea.scrollHeight) {
        this._textarea.style.overflowY = 'auto' // add scroll if scrollHeight exceeds height in pixels
        height = this.props.height
      }
    }

    if (this._container) {
      // preserve height to prevent scroll jumping on long textareas
      this._container.style.minHeight = height
    }

    this._height = height
    this._textarea.style.height = height
    this._textarea.scrollTop = this._textarea.scrollHeight
  }

  focus () {
    this._textarea.focus()
  }

  handleChange = (event) => {
    const { onChange, value, disabled, readOnly } = this.props

    if (disabled || readOnly) {
      event.preventDefault()
      return
    }

    if (typeof value === 'undefined') { // if uncontrolled
      this.autoGrow()
    }

    if (typeof onChange === 'function') {
      onChange(event)
    }
  }

  handleContainerRef = (node) => {
    this._container = node
  }

  get minHeight () {
    return this._textarea.style.minHeight
  }

  get invalid () {
    return this.props.messages && this.props.messages.findIndex((message) => { return message.type === 'error' }) >= 0
  }

  get id () {
    return this.props.id || this._defaultId
  }

  get focused () {
    return isActiveElement(this._textarea)
  }

  get value () {
    return this._textarea.value
  }

  render () {
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
      resize,
      size
    } = this.props

    const props = omitProps(this.props, TextArea.propTypes)

    const classes = {
      [styles.textarea]: true,
      [styles[size]]: true,
      [styles.disabled]: disabled
    }

    const style = {
      width: width,
      resize: resize,
      height: (!autoGrow) ? height : null,
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
        aria-disabled={disabled || readOnly ? 'true' : null}
        className={classnames(classes)}
        onChange={this.handleChange}
      />
    )

    return (
      <FormField
        {...pickProps(this.props, FormField.propTypes)}
        vAlign="top"
        id={this.id}
        ref={(el) => { this._node = el }}
      >
        <div
          className={styles.layout}
          ref={this.handleContainerRef}
        >
          { textarea }
          { (!disabled && !readOnly) ? <span className={styles.outline} aria-hidden="true"></span> : null }
        </div>
      </FormField>
    )
  }
}

export default TextArea
