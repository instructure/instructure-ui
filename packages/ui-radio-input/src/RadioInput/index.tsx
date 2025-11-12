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
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useEffect
} from 'react'

import {
  passthroughProps,
  useDeterministicId
} from '@instructure/ui-react-utils'
import { isActiveElement } from '@instructure/ui-dom-utils'

import { useStyle } from '@instructure/emotion'

import generateStyle from './styles'

import type { RadioInputProps } from './props'

/**
---
category: components
---
**/
const RadioInput = forwardRef<RadioInputHandle, RadioInputProps>(
  (props, ref) => {
    const {
      variant = 'simple',
      size = 'medium',
      disabled = false,
      inline = false,
      context = 'success',
      readOnly = false,
      id: idProp,
      label,
      value,
      name,
      checked: checkedProp,
      onClick,
      onChange,
      inputRef,
      ...rest
    } = props
    const [hovered, setHovered] = useState(false)
    // State for uncontrolled mode
    const [internalChecked, setInternalChecked] = useState(false)

    // Refs
    const containerRef = useRef<HTMLDivElement | null>(null)
    const inputElementRef = useRef<HTMLInputElement | null>(null)

    // Deterministic ID generation
    const [deterministicId, setDeterministicId] = useState<string | undefined>()
    const getId = useDeterministicId('RadioInput')
    useEffect(() => {
      setDeterministicId(getId())
    }, [])
    const id = idProp || deterministicId

    // Computed checked value
    const checked =
      typeof checkedProp === 'undefined' ? internalChecked : checkedProp

    // Styles - pass props with defaults applied for generateStyle
    const styles = useStyle({
      generateStyle,
      params: {
        disabled,
        context,
        inline,
        hovered,
        readOnly,
        size,
        variant
      },
      componentId: 'RadioInput',
      displayName: 'RadioInput'
    })

    // Event handlers
    const handleInputRef = useCallback(
      (el: HTMLInputElement | null) => {
        inputElementRef.current = el
        if (typeof inputRef === 'function') {
          inputRef(el)
        }
      },
      [inputRef]
    )

    const handleClick: React.MouseEventHandler<HTMLInputElement> = useCallback(
      (e) => {
        if (disabled || readOnly) {
          e.preventDefault()
          return
        }

        if (typeof onClick === 'function') {
          onClick(e)
        }
      },
      [disabled, readOnly, onClick]
    )

    const handleChange: React.ChangeEventHandler<HTMLInputElement> =
      useCallback(
        (e) => {
          if (disabled || readOnly) {
            e.preventDefault()
            return
          }

          if (typeof checkedProp === 'undefined') {
            setInternalChecked(!internalChecked)
          }

          if (typeof onChange === 'function') {
            onChange(e)
          }
        },
        [disabled, readOnly, checkedProp, internalChecked, onChange]
      )

    // Expose imperative API via ref
    useImperativeHandle(
      ref,
      () => ({
        focus: () => {
          inputElementRef.current?.focus()
        },
        get focused() {
          return isActiveElement(inputElementRef.current)
        },
        get checked() {
          return checked
        },
        get id() {
          return id
        }
      }),
      [checked, id]
    )

    const handleMouseOver = () => {
      setHovered(true)
    }

    const handleMouseOut = () => {
      setHovered(false)
    }

    const passedProps = passthroughProps(rest)
    return (
      <div
        css={styles?.radioInput}
        data-cid="RadioInput"
        ref={containerRef}
        /* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */
        onMouseOver={handleMouseOver}
        /* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */
        onMouseOut={handleMouseOut}
      >
        <input
          {...passedProps}
          id={id}
          ref={handleInputRef}
          value={value}
          name={name}
          checked={checked}
          type="radio"
          css={styles?.input}
          readOnly={readOnly}
          disabled={disabled}
          onChange={handleChange}
          onClick={handleClick}
        />
        <label htmlFor={id} css={styles?.label}>
          {label}
        </label>
      </div>
    )
  }
)

RadioInput.displayName = 'RadioInput'

export interface RadioInputHandle {
  focus: () => void
  readonly focused: boolean
  readonly checked: boolean
  readonly id: string | undefined
}

export default RadioInput
export { RadioInput }
