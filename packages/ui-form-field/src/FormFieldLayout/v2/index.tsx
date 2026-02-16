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

import { forwardRef, useEffect, useState, useCallback } from 'react'
import { hasVisibleChildren } from '@instructure/ui-a11y-utils'
import { omitProps, useDeterministicId } from '@instructure/ui-react-utils'

import { useStyle } from '@instructure/emotion'
import { FormFieldMessages } from '../../FormFieldMessages/v2'
import generateStyle from './styles'
import { allowedProps } from './props'
import type { FormFieldLayoutProps } from './props'

/**
---
parent: FormField
---
**/
const FormFieldLayout = forwardRef<Element, FormFieldLayoutProps>(
  (props, ref) => {
    const {
      inline = false,
      layout = 'stacked',
      as = 'label',
      labelAlign = 'end',
      vAlign,
      label,
      messages,
      messagesId: messagesIdProp,
      children,
      width,
      elementRef,
      inputContainerRef,
      isGroup,
      isRequired = false,
      margin,
      disabled = false,
      readOnly = false,
      themeOverride,
      ...rest
    } = props

    // Deterministic ID generation
    const [deterministicId, setDeterministicId] = useState<string | undefined>()
    const getId = useDeterministicId('FormFieldLayout')
    useEffect(() => {
      setDeterministicId(getId())
    }, [])

    const messagesId = messagesIdProp || deterministicId
    const labelId = deterministicId ? `${deterministicId}-Label` : undefined

    // Filter out error and success messages when disabled or readOnly
    const filteredMessages =
      disabled || readOnly
        ? messages?.filter(
            (msg) =>
              msg.type !== 'error' &&
              msg.type !== 'newError' &&
              msg.type !== 'success'
          )
        : messages

    // Compute style props
    const hasMessages =
      filteredMessages && filteredMessages.length > 0
        ? filteredMessages.some((msg) => {
            if (msg.text) {
              if (typeof msg.text === 'string') {
                return msg.text.length > 0
              }
              return true
            }
            return false
          })
        : false

    const hasVisibleLabel = label ? hasVisibleChildren(label) : false

    const hasErrorMsgAndIsGroup =
      !!filteredMessages?.find(
        (m) => m.type === 'error' || m.type === 'newError'
      ) && !!isGroup

    const invalid = !!filteredMessages?.find(
      (m) => m.type === 'error' || m.type === 'newError'
    )

    // Styles
    const styles = useStyle({
      generateStyle,
      themeOverride,
      params: {
        hasMessages,
        hasVisibleLabel,
        hasErrorMsgAndIsGroup,
        inline,
        layout,
        vAlign,
        labelAlign,
        margin,
        messages: filteredMessages,
        isRequired,
        invalid
      },
      componentId: 'FormFieldLayout',
      displayName: 'FormFieldLayout'
    })

    const ElementType = as

    const handleRef = useCallback(
      (el: Element | null) => {
        if (typeof ref === 'function') {
          ref(el)
        } else if (ref) {
          const refObject = ref as React.MutableRefObject<Element | null>
          refObject.current = el
        }

        if (typeof elementRef === 'function') {
          elementRef(el)
        }
      },
      [ref, elementRef]
    )

    const handleInputContainerRef = useCallback(
      (node: HTMLElement | null) => {
        if (typeof inputContainerRef === 'function') {
          inputContainerRef(node)
        }
      },
      [inputContainerRef]
    )

    const renderLabel = () => {
      const labelContent = hasVisibleLabel ? (
        <>
          {label}
          {isRequired && (
            <span
              css={invalid ? styles?.requiredAsterisk : {}}
              aria-hidden={true}
            >
              {' '}
              *
            </span>
          )}
        </>
      ) : (
        label
      )

      if (hasVisibleLabel) {
        if (ElementType === 'fieldset') {
          // `legend` has some special built in CSS, this can only be reset
          // this way https://stackoverflow.com/a/65866981/319473
          return (
            <legend style={{ display: 'contents' }}>
              <span css={styles?.formFieldLabel}>{labelContent}</span>
            </legend>
          )
        }
        return <span css={styles?.formFieldLabel}>{labelContent}</span>
      } else if (label) {
        if (ElementType === 'fieldset') {
          return (
            <legend id={labelId} style={{ display: 'contents' }}>
              {label}
            </legend>
          )
        }
        // needs to be wrapped because it needs an `id`
        return (
          <div id={labelId} style={{ display: 'contents' }}>
            {label}
          </div>
        )
      } else return null
    }

    const renderVisibleMessages = () => {
      return hasMessages ? (
        <FormFieldMessages
          id={messagesId}
          messages={filteredMessages}
          gridArea="messages"
        />
      ) : null
    }

    return (
      <ElementType
        {...omitProps(rest, [...allowedProps])}
        css={styles?.formFieldLayout}
        aria-describedby={hasMessages ? messagesId : undefined}
        aria-errormessage={rest['aria-invalid'] ? messagesId : undefined}
        style={{ width }}
        ref={handleRef}
      >
        {renderLabel()}
        {hasErrorMsgAndIsGroup && renderVisibleMessages()}
        <span css={styles?.formFieldChildren} ref={handleInputContainerRef}>
          {children}
        </span>
        {!hasErrorMsgAndIsGroup && renderVisibleMessages()}
      </ElementType>
    )
  }
)

FormFieldLayout.displayName = 'FormFieldLayout'

export default FormFieldLayout
export { FormFieldLayout, allowedProps }
