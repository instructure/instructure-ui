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
import React, { Component } from 'react'
import { FormField } from '@instructure/ui-form-field'
import {
  addEventListener,
  isActiveElement,
  requestAnimationFrame,
  getBoundingClientRect
} from '@instructure/ui-dom-utils'
import type { RequestAnimationFrameType } from '@instructure/ui-dom-utils'
import { debounce } from '@instructure/debounce'
import type { Debounced } from '@instructure/debounce'
import { withStyle, jsx } from '@instructure/emotion'
import { px } from '@instructure/ui-utils'
import { testable } from '@instructure/ui-testable'
import {
  omitProps,
  pickProps,
  withDeterministicId
} from '@instructure/ui-react-utils'
import { hasVisibleChildren } from '@instructure/ui-a11y-utils'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import type { TextAreaProps } from './props'
import { allowedProps, propTypes } from './props'

/**
---
category: components
---
**/
@withDeterministicId()
@withStyle(generateStyle, generateComponentTheme)
@testable()
class TextArea extends Component<TextAreaProps> {
  static readonly componentId = 'TextArea'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    size: 'medium',
    autoGrow: true,
    resize: 'none',
    inline: false,
    messages: [],
    disabled: false,
    readOnly: false,
    layout: 'stacked',
    required: false
  }

  private _listener?: { remove(): void }
  private _request?: RequestAnimationFrameType
  private _defaultId: string
  private _textareaResizeListener?: ResizeObserver
  private _debounced?: Debounced<typeof this.grow>
  private _textarea: HTMLTextAreaElement | null = null
  private _container: HTMLDivElement | null = null
  private _height?: string
  private _manuallyResized = false
  private _highlightRef: HTMLSpanElement | null = null
  private myObserver: ResizeObserver | null = null
  private resizeTimeout?: NodeJS.Timeout

  ref: Element | null = null

  constructor(props: TextAreaProps) {
    super(props)

    this._defaultId = props.deterministicId!()

    //mock ResizeObserver for ssr
    if (typeof window === 'undefined') {
      global.ResizeObserver = class ResizeObserver {
        observe() {
          // do nothing
        }
        unobserve() {
          // do nothing
        }
        disconnect() {
          // do nothing
        }
      }
    }
  }

  componentDidMount() {
    this.myObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (this._highlightRef) {
          const entryStyle = window.getComputedStyle(entry.target)
          this._highlightRef.style.transition = 'none'
          this._highlightRef.style.width = `calc(${entryStyle.width}px + 2.125rem)`
          this._highlightRef.style.height = `calc(${entryStyle.height}px + 2.125rem)`
          clearTimeout(this.resizeTimeout)

          this.resizeTimeout = setTimeout(() => {
            if (this._highlightRef) {
              this._highlightRef.style.transition = 'all 0.2s'
            }
          }, 500)
        }
      }
    })

    this.autoGrow()
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.autoGrow()
    this.props.makeStyles?.()
  }

  componentWillUnmount() {
    if (this._listener) {
      this._listener.remove()
    }

    if (this._textareaResizeListener) {
      this._textareaResizeListener.disconnect()
    }

    if (this._request) {
      this._request.cancel()
    }

    if (this._debounced) {
      this._debounced.cancel()
    }

    if (this.myObserver) {
      this.myObserver.disconnect()
    }
  }

  _textareaResize = () => {
    const textareaHeight = this._textarea!.style.height
    if (textareaHeight !== '' && textareaHeight !== this._height) {
      this._manuallyResized = true
      this._textarea!.style.overflowY = 'auto'

      // update container minHeight to ensure focus ring always wraps input
      this._container!.style.minHeight = textareaHeight
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
        const { height: origHeight } = getBoundingClientRect(this._textarea)
        this._textareaResizeListener = new ResizeObserver((entries) => {
          for (const entry of entries) {
            const { height } = entry.contentRect

            if (origHeight !== height) {
              this._textareaResize()
            }
          }
        })

        this._textareaResizeListener.observe(this._textarea)
      }

      this._request = requestAnimationFrame(this.grow)
    }
  }

  grow = () => {
    if (!this._textarea || this._manuallyResized) {
      return
    }
    const offset = this._textarea.offsetHeight - this._textarea.clientHeight
    let height = ''

    // Notes:
    // 1. height has to be reset to `auto` every time this method runs, or scrollHeight will not reset
    // 2. `this._textarea.scrollHeight` will not reset if assigned to a variable; it needs to be written out each time
    this._textarea.style.height = 'auto'
    this._textarea.style.overflowY = 'hidden' // hide scrollbars for autoGrow textareas
    height = this._textarea.scrollHeight + offset + 'px'

    const maxHeight = this.props.maxHeight
      ? px(this.props.maxHeight, this._container)
      : undefined

    if (
      this.props.maxHeight &&
      maxHeight !== undefined &&
      this._textarea.scrollHeight > maxHeight
    ) {
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
    const heightExceedsMax = maxHeight !== undefined && px(height) > maxHeight
    if (!heightExceedsMax) {
      this._container!.style.minHeight = height
    }

    this._height = height
    this._textarea.style.height = height
  }

  focus() {
    this._textarea!.focus()
  }

  handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  handleContainerRef = (node: HTMLDivElement | null) => {
    this._container = node
  }

  get minHeight() {
    return this._textarea!.style.minHeight
  }

  get invalid() {
    return (
      this.props.messages &&
      this.props.messages.findIndex((message) => {
        return message.type === 'error' || message.type === 'newError'
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
    return this._textarea!.value
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
      resize,
      styles
    } = this.props

    const props = omitProps(this.props, TextArea.allowedProps)

    const style = {
      width,
      resize,
      height: !autoGrow ? height : undefined,
      maxHeight
    }

    const textarea = (
      <textarea
        {...props}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        ref={(textarea) => {
          if (textarea) {
            this.myObserver?.observe(textarea)
          }

          this._textarea = textarea
          if (typeof textareaRef === 'function') {
            textareaRef(textarea)
          }
        }}
        style={style}
        id={this.id}
        required={required}
        aria-required={required}
        aria-invalid={this.invalid ? 'true' : undefined}
        disabled={disabled || readOnly}
        css={this.props.styles?.textArea}
        onChange={this.handleChange}
      />
    )

    const label = hasVisibleChildren(this.props.label) ? (
      <React.Fragment>
        {this.props.label}
        {required && (
          <span
            css={this.invalid ? styles?.requiredInvalid : {}}
            aria-hidden={true}
          >
            {' '}
            *
          </span>
        )}
      </React.Fragment>
    ) : (
      this.props.label
    )

    return (
      <FormField
        {...pickProps(this.props, FormField.allowedProps)}
        label={label}
        vAlign="top"
        id={this.id}
        elementRef={(el) => {
          this.ref = el
        }}
      >
        <div
          css={this.props.styles?.textAreaLayout}
          style={{
            width,
            maxHeight
          }}
          ref={this.handleContainerRef}
        >
          {textarea}
          {!disabled && !readOnly ? (
            <span
              css={this.props.styles?.textAreaOutline}
              aria-hidden="true"
              ref={(e) => (this._highlightRef = e)}
            />
          ) : null}
        </div>
      </FormField>
    )
  }
}

export default TextArea
export { TextArea }
