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

import {
  forwardRef,
  useRef,
  useEffect,
  useContext,
  useImperativeHandle,
  useCallback,
  useMemo
} from 'react'
import { FormField } from '@instructure/ui-form-field/latest'
import {
  addEventListener,
  isActiveElement,
  requestAnimationFrame,
  getBoundingClientRect
} from '@instructure/ui-dom-utils'
import type { RequestAnimationFrameType } from '@instructure/ui-dom-utils'
import { debounce } from '@instructure/debounce'
import type { Debounced } from '@instructure/debounce'

import { useStyle } from '@instructure/emotion'
import { generateId, px } from '@instructure/ui-utils'

import {
  passthroughProps,
  pickProps,
  DeterministicIdContext
} from '@instructure/ui-react-utils'

import generateStyle from './styles'
import type { TextAreaProps } from './props'

export type TextAreaElement = {
  focus: () => void
  readonly value: string
  readonly minHeight: string
  readonly focused: boolean
  readonly invalid: boolean
  readonly id: string
}

/**
---
category: components
---
**/
const TextArea = forwardRef<TextAreaElement, TextAreaProps>((props, ref) => {
  const {
    size = 'medium',
    autoGrow = true,
    resize = 'none',
    inline = false,
    messages = [],
    disabled = false,
    readOnly = false,
    layout = 'stacked',
    required = false,
    placeholder,
    value,
    defaultValue,
    width,
    height,
    maxHeight,
    textareaRef,
    margin,
    label,
    onChange,
    id: propId,
    themeOverride,
    ...rest
  } = props

  // Use deterministic ID
  const instanceCounterMap = useContext(DeterministicIdContext)
  const defaultId = useMemo(
    () => generateId('TextArea', instanceCounterMap),
    [instanceCounterMap]
  )
  const id = propId || defaultId

  // Use refs for mutable values
  const _listener = useRef<{ remove(): void } | undefined>()
  const _request = useRef<RequestAnimationFrameType | undefined>()
  const _textareaResizeListener = useRef<ResizeObserver | undefined>()
  const _debounced = useRef<Debounced<() => void> | undefined>()
  const _textarea = useRef<HTMLTextAreaElement | null>(null)
  const _container = useRef<HTMLDivElement | null>(null)
  const _height = useRef<string | undefined>()
  const _manuallyResized = useRef(false)
  const formFieldRef = useRef<Element | null>(null)

  // Compute invalid state
  const { isInvalid, isSuccess } = useMemo(() => {
    const isInvalid =
      messages &&
      messages.findIndex(
        (message) => message.type === 'error' || message.type === 'newError'
      ) >= 0
    const isSuccess =
      messages &&
      messages.findIndex((message) => message.type === 'success') >= 0
    return { isInvalid, isSuccess }
  }, [messages])

  // Use styles
  const styles = useStyle({
    generateStyle,
    themeOverride,
    params: {
      size,
      disabled,
      readOnly,
      success: isSuccess,
      invalid: isInvalid
    },
    componentId: 'TextArea',
    displayName: 'TextArea'
  })

  // Mock ResizeObserver for SSR
  useEffect(() => {
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
  }, [])

  // Grow function
  const grow = useCallback(() => {
    if (!_textarea.current || _manuallyResized.current) {
      return
    }
    const offset =
      _textarea.current.offsetHeight - _textarea.current.clientHeight
    let heightValue = ''

    // Notes:
    // 1. height has to be reset to `auto` every time this method runs, or scrollHeight will not reset
    // 2. `_textarea.current.scrollHeight` will not reset if assigned to a variable; it needs to be written out each time
    _textarea.current.style.height = 'auto'
    _textarea.current.style.overflowY = 'hidden' // hide scrollbars for autoGrow textareas
    heightValue = _textarea.current.scrollHeight + offset + 'px'

    const maxHeightPx = maxHeight
      ? px(maxHeight, _container.current)
      : undefined

    if (
      maxHeight &&
      maxHeightPx !== undefined &&
      _textarea.current.scrollHeight > maxHeightPx
    ) {
      _textarea.current.style.overflowY = 'auto' // add scroll if scrollHeight exceeds maxHeight in pixels
    } else if (height) {
      if (_textarea.current.value === '') {
        heightValue = height
      } else if (
        px(height, _container.current) > _textarea.current.scrollHeight
      ) {
        _textarea.current.style.overflowY = 'auto' // add scroll if scrollHeight exceeds height in pixels
        heightValue = height
      }
    }

    // preserve container height to prevent scroll jumping on long textareas,
    // but make sure container doesn't exceed maxHeight prop
    const heightExceedsMax =
      maxHeightPx !== undefined && px(heightValue) > maxHeightPx
    if (!heightExceedsMax && _container.current) {
      _container.current.style.minHeight = heightValue
    }

    _height.current = heightValue
    _textarea.current.style.height = heightValue
  }, [height, maxHeight])

  // Textarea resize handler
  const _textareaResize = useCallback(() => {
    if (!_textarea.current) return

    const textareaHeight = _textarea.current.style.height
    if (textareaHeight !== '' && textareaHeight !== _height.current) {
      _manuallyResized.current = true
      _textarea.current.style.overflowY = 'auto'

      // update container minHeight to ensure focus ring always wraps input
      if (_container.current) {
        _container.current.style.minHeight = textareaHeight
      }
    }
  }, [])

  // AutoGrow effect
  useEffect(() => {
    if (autoGrow) {
      if (!_debounced.current) {
        _debounced.current = debounce(grow, 200, {
          leading: false,
          trailing: true
        })
      }

      if (!_listener.current) {
        _listener.current = addEventListener(
          window,
          'resize',
          _debounced.current
        )
      }

      if (_textarea.current && !_textareaResizeListener.current) {
        const { height: origHeight } = getBoundingClientRect(_textarea.current)
        _textareaResizeListener.current = new ResizeObserver((entries) => {
          for (const entry of entries) {
            const { height: entryHeight } = entry.contentRect

            if (origHeight !== entryHeight) {
              _textareaResize()
            }
          }
        })

        _textareaResizeListener.current.observe(_textarea.current)
      }

      _request.current = requestAnimationFrame(grow)
    }
  }, [autoGrow, grow, _textareaResize])

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (_listener.current) {
        _listener.current.remove()
      }

      if (_textareaResizeListener.current) {
        _textareaResizeListener.current.disconnect()
      }

      if (_request.current) {
        _request.current.cancel()
      }

      if (_debounced.current) {
        _debounced.current.cancel()
      }
    }
  }, [])

  // Handle change
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (disabled || readOnly) {
        event.preventDefault()
        return
      }

      if (typeof value === 'undefined') {
        // if uncontrolled
        if (autoGrow) {
          if (!_debounced.current) {
            _debounced.current = debounce(grow, 200, {
              leading: false,
              trailing: true
            })
          }

          if (!_listener.current) {
            _listener.current = addEventListener(
              window,
              'resize',
              _debounced.current
            )
          }

          if (_textarea.current && !_textareaResizeListener.current) {
            const { height: origHeight } = getBoundingClientRect(
              _textarea.current
            )
            _textareaResizeListener.current = new ResizeObserver((entries) => {
              for (const entry of entries) {
                const { height: entryHeight } = entry.contentRect

                if (origHeight !== entryHeight) {
                  _textareaResize()
                }
              }
            })

            _textareaResizeListener.current.observe(_textarea.current)
          }

          _request.current = requestAnimationFrame(grow)
        }
      }

      if (typeof onChange === 'function') {
        onChange(event)
      }
    },
    [disabled, readOnly, value, onChange, autoGrow, grow, _textareaResize]
  )

  // Expose API through ref using useImperativeHandle
  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        _textarea.current?.focus()
      },
      get value() {
        return _textarea.current?.value || ''
      },
      get minHeight() {
        return _textarea.current?.style.minHeight || ''
      },
      get focused() {
        return isActiveElement(_textarea.current)
      },
      get invalid() {
        return (
          messages &&
          messages.findIndex(
            (message) => message.type === 'error' || message.type === 'newError'
          ) >= 0
        )
      },
      get id() {
        return id
      }
    }),
    [id, messages]
  )

  const style = {
    width,
    resize,
    height: !autoGrow ? height : undefined,
    maxHeight
  }

  const textarea = (
    <textarea
      {...passthroughProps(rest)}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      ref={(textarea) => {
        _textarea.current = textarea
        if (typeof textareaRef === 'function') {
          textareaRef(textarea)
        }
      }}
      style={style}
      id={id}
      required={required}
      aria-required={required}
      aria-invalid={isInvalid ? 'true' : undefined}
      disabled={disabled}
      readOnly={readOnly}
      css={styles?.textArea}
      onChange={handleChange}
    />
  )

  return (
    <FormField
      {...pickProps(props, FormField.allowedProps)}
      label={label}
      vAlign="top"
      id={id}
      elementRef={(el) => {
        formFieldRef.current = el
      }}
      margin={margin}
      isRequired={required}
      disabled={disabled}
      readOnly={readOnly}
      data-cid="TextArea"
    >
      <div
        css={styles?.textAreaLayout}
        style={{
          width,
          maxHeight
        }}
        ref={(node) => {
          _container.current = node
        }}
      >
        {textarea}
      </div>
    </FormField>
  )
})

TextArea.displayName = 'TextArea'

export default TextArea
export { TextArea }
