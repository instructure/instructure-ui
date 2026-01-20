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
  useCallback,
  useImperativeHandle,
  forwardRef,
  useEffect
} from 'react'
import keycode from 'keycode'

import { FormField } from '@instructure/ui-form-field'
import {
  ChevronUpInstUIIcon,
  ChevronDownInstUIIcon
} from '@instructure/ui-icons'
import {
  pickProps,
  callRenderProp,
  getInteraction,
  useDeterministicId,
  passthroughProps
} from '@instructure/ui-react-utils'

import { useStyle } from '@instructure/emotion'

import generateStyle from './styles'

import type { NumberInputProps } from './props'
import { Renderable } from '@instructure/shared-types'

/**
---
category: components
id: NumberInput
---
**/
const NumberInput = forwardRef<NumberInputHandle, NumberInputProps>(
  (props, ref) => {
    const {
      messages = [],
      isRequired = false,
      showArrows = true,
      size = 'medium',
      display = 'block',
      textAlign = 'start',
      inputMode = 'numeric',
      allowStringValue = false,
      renderLabel,
      placeholder,
      value,
      width,
      renderIcons,
      margin,
      inputRef: inputRefProp,
      onFocus,
      onBlur,
      onChange,
      onKeyDown,
      onDecrement,
      onIncrement,
      id: idProp,
      themeOverride,
      ...rest
    } = props
    // these are icon tokens
    type ArrowButtonColors =
      | 'actionSecondaryBaseColor'
      | 'actionSecondaryHoverColor'
      | 'actionSecondaryActiveColor'
      | 'actionSecondaryDisabledColor'
    const [upButtonState, setUpButtonState] = useState<ArrowButtonColors>(
      'actionSecondaryBaseColor'
    )
    const [downButtonState, setDownButtonState] = useState<ArrowButtonColors>(
      'actionSecondaryBaseColor'
    )
    // Refs
    const containerRef = useRef<Element | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)

    // Deterministic ID generation
    const [deterministicId, setDeterministicId] = useState<string | undefined>()
    const getId = useDeterministicId('NumberInput')
    useEffect(() => {
      setDeterministicId(getId())
    }, []) // Empty deps array - only run once on mount
    const id = idProp || deterministicId

    // Computed values
    const invalid =
      !!messages &&
      messages.some(
        (message) => message.type === 'error' || message.type === 'newError'
      )
    const success =
      !!messages && messages.some((message) => message.type === 'success')

    const interaction = getInteraction({ props })
    if (
      interaction === 'disabled' &&
      upButtonState !== 'actionSecondaryDisabledColor'
    ) {
      setUpButtonState('actionSecondaryDisabledColor')
      setDownButtonState('actionSecondaryDisabledColor')
    } else if (
      interaction === 'enabled' &&
      downButtonState !== 'actionSecondaryBaseColor'
    ) {
      setUpButtonState('actionSecondaryBaseColor')
      setDownButtonState('actionSecondaryBaseColor')
    }
    // Styles - useStyle will pass these to generateStyle(componentTheme, params as props, params as state)
    // We need to provide all values that generateStyle needs from both props and state
    const styles = useStyle({
      generateStyle,
      themeOverride,
      params: {
        size,
        textAlign,
        interaction,
        invalid,
        success
      },
      componentId: 'NumberInput',
      displayName: 'NumberInput',
      useTokensFrom: 'TextInput'
    })

    // Event handlers
    const handleInputRef = useCallback(
      (element: HTMLInputElement | null) => {
        inputRef.current = element

        if (typeof inputRefProp === 'function') {
          inputRefProp(element)
        }
      },
      [inputRefProp]
    )

    const handleRef = useCallback((el: Element | null) => {
      containerRef.current = el
    }, [])

    const handleFocus = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        if (typeof onFocus === 'function') {
          onFocus(event)
        }
      },
      [onFocus]
    )

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        if (typeof onBlur === 'function') {
          onBlur(event)
        }
      },
      [onBlur]
    )

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (typeof onChange === 'function') {
          onChange(event, event.target.value)
        }
      },
      [onChange]
    )

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (typeof onKeyDown === 'function') {
          onKeyDown(event)
        }

        if (event.keyCode === keycode.codes.down) {
          event.preventDefault()
          if (typeof onDecrement === 'function') {
            onDecrement(event)
          }
        } else if (event.keyCode === keycode.codes.up) {
          event.preventDefault()
          if (typeof onIncrement === 'function') {
            onIncrement(event)
          }
        }
      },
      [onKeyDown, onDecrement, onIncrement]
    )

    const arrowClicked = useCallback(
      (
        event: React.MouseEvent<HTMLButtonElement>,
        callback:
          | NumberInputProps['onIncrement']
          | NumberInputProps['onDecrement']
      ) => {
        event.preventDefault()
        if (interaction === 'enabled') {
          inputRef.current?.focus()

          if (typeof callback === 'function') {
            callback(event)
          }
        }
      },
      [interaction]
    )

    const handleClickUpArrow = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        setUpButtonState('actionSecondaryActiveColor')
        arrowClicked(event, onIncrement)
      },
      [arrowClicked, onIncrement]
    )

    const handleClickDownArrow = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        setDownButtonState('actionSecondaryActiveColor')
        arrowClicked(event, onDecrement)
      },
      [arrowClicked, onDecrement]
    )

    // Expose imperative API via ref
    useImperativeHandle(
      ref,
      () => ({
        focus: () => {
          inputRef.current?.focus()
        },
        get id() {
          return id
        },
        get invalid() {
          return invalid
        },
        get interaction() {
          return interaction
        },
        get value() {
          return inputRef.current?.value
        }
      }),
      [id, invalid, interaction]
    )

    // Render methods
    const renderArrows = (customIcons?: {
      increase: Renderable
      decrease: Renderable
    }) => {
      return (
        <span css={styles?.arrowContainer}>
          {/* eslint-disable jsx-a11y/mouse-events-have-key-events */}
          <button
            aria-hidden
            css={styles?.arrow}
            onMouseDown={handleClickUpArrow}
            onMouseOver={() => setUpButtonState('actionSecondaryHoverColor')}
            onMouseOut={() => setUpButtonState('actionSecondaryBaseColor')}
            tabIndex={-1}
            type="button"
          >
            {customIcons?.increase ? (
              callRenderProp(customIcons.increase)
            ) : (
              <ChevronUpInstUIIcon size="sm" color={upButtonState} />
            )}
          </button>

          <button
            aria-hidden
            css={styles?.arrow}
            onMouseDown={handleClickDownArrow}
            onMouseOver={() => setDownButtonState('actionSecondaryHoverColor')}
            onMouseOut={() => setDownButtonState('actionSecondaryBaseColor')}
            tabIndex={-1}
            type="button"
          >
            {customIcons?.decrease ? (
              callRenderProp(customIcons.decrease)
            ) : (
              <ChevronDownInstUIIcon size="sm" color={downButtonState} />
            )}
          </button>
          {/* eslint-enable jsx-a11y/mouse-events-have-key-events */}
        </span>
      )
    }

    const label = callRenderProp(renderLabel)

    const passedProps = passthroughProps(rest)

    // Don't render until we have an ID
    if (!id) {
      return null
    }

    return (
      <FormField
        {...pickProps(props, FormField.allowedProps)}
        label={label}
        inline={display === 'inline-block'}
        id={id}
        elementRef={handleRef}
        margin={margin}
        isRequired={isRequired}
        disabled={interaction === 'disabled'}
        readOnly={interaction === 'readonly'}
        data-cid="NumberInput"
      >
        <span css={styles?.inputWidth} style={width ? { width } : undefined}>
          <span css={styles?.inputContainer}>
            <input
              {...passedProps}
              css={styles?.input}
              aria-invalid={invalid ? 'true' : undefined}
              id={id}
              type={allowStringValue ? 'text' : 'number'}
              inputMode={inputMode}
              placeholder={interaction === 'enabled' ? placeholder : undefined}
              ref={handleInputRef}
              required={isRequired}
              value={value}
              disabled={interaction === 'disabled'}
              readOnly={interaction === 'readonly'}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            {showArrows && interaction !== 'readonly'
              ? renderArrows(renderIcons)
              : null}
          </span>
        </span>
      </FormField>
    )
  }
)

NumberInput.displayName = 'NumberInput'

export interface NumberInputHandle {
  focus: () => void
  readonly id: string | undefined
  readonly invalid: boolean
  readonly interaction: ReturnType<typeof getInteraction>
  readonly value: string | undefined
}

export default NumberInput
export { NumberInput }
