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

import { forwardRef, useCallback } from 'react'
import { hasVisibleChildren } from '@instructure/ui-a11y-utils'
import { omitProps, useDeterministicId } from '@instructure/ui-react-utils'

import { useStyleNew } from '@instructure/emotion'
import { FormFieldMessages } from '../../FormFieldMessages/v2/index.js'
import generateStyle from './styles.js'
import { allowedProps } from './props.js'
import type { FormFieldLayoutProps } from './props'

// Elements that handle clicks themselves, do not override it
const INTERACTIVE_SELECTOR = [
  'a[href]',
  'button',
  'input',
  'select',
  'textarea',
  'label',
  'summary',
  'iframe',
  'embed',
  'object',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]'
].join(',')

// Clicks already forwarded by a nested FormFieldLayout
const forwardedClicks = new WeakSet<Event>()

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
      as = 'div',
      labelAlign = 'end',
      vAlign,
      label,
      id,
      messages,
      messagesId: messagesIdProp,
      labelId: labelIdProp,
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

    // SSR-safe deterministic ID generation (stable across server/client render)
    const deterministicId = useDeterministicId('FormFieldLayout')()

    const messagesId = messagesIdProp || deterministicId
    // Give the label an id so controls can reference only the label text via
    // `aria-labelledby`, keeping messages out of the accessible name.
    const labelId = labelIdProp || `${deterministicId}-Label`

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

    // any message, even if it's not visible (screenreader only)
    let hasMessages = false
    let hasVisibleMessage = false
    if (filteredMessages) {
      for (const msg of filteredMessages) {
        if (msg.text) {
          if (typeof msg.text === 'string') {
            if (msg.text.length > 0) {
              hasMessages = true
              if (msg.type !== 'screenreader-only') {
                hasVisibleMessage = true
              }
            }
          } else {
            // if the message is a React component we just assume its non-empty
            hasMessages = true
            if (msg.type !== 'screenreader-only') {
              hasVisibleMessage = true
            }
          }
        }
      }
    }

    const hasVisibleLabel = label ? hasVisibleChildren(label) : false

    const describedBy = hasMessages ? messagesId : undefined

    const invalid = !!filteredMessages?.find(
      (m) => m.type === 'error' || m.type === 'newError'
    )

    // Styles
    const styles = useStyleNew({
      generateStyle,
      themeOverride,
      params: {
        hasMessages,
        hasVisibleLabel,
        hasVisibleMessage,
        isGroup: !!isGroup,
        inline,
        layout,
        vAlign,
        labelAlign,
        margin,
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

    // Clicks on the rest of the control area (icons, before/after content) need
    // to be forwarded to the control.
    const handleChildrenClick = (e: React.MouseEvent<HTMLElement>) => {
      if (
        // it's a group, no clear control to forward to
        ElementType === 'fieldset' ||
        e.defaultPrevented ||
        forwardedClicks.has(e.nativeEvent)
      ) {
        return
      }
      const container = e.currentTarget
      const interactive = (e.target as Element).closest(INTERACTIVE_SELECTOR)
      if (interactive && container.contains(interactive)) {
        return // do not steal clicks for e.g. DateInput's calendar icon
      }
      const control = id ? container.ownerDocument.getElementById(id) : null
      if (!control || !container.contains(control)) {
        return // no control
      }
      forwardedClicks.add(e.nativeEvent)
      control.focus()
      control.click()
    }

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
        return (
          <label css={styles?.formFieldLabel} id={labelId} htmlFor={id}>
            {labelContent}
          </label>
        )
      } else if (label) {
        if (ElementType === 'fieldset') {
          return (
            <legend id={labelId} style={{ display: 'contents' }}>
              {label}
            </legend>
          )
        }
        return (
          <label id={labelId} htmlFor={id} style={{ display: 'contents' }}>
            {label}
          </label>
        )
      } else return null
    }

    const renderMessages = () => {
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
        {isGroup && renderMessages()}
        {/* Clicks are forwarded to the control. Needed for e.g. Select's down arrow */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <span
          css={styles?.formFieldChildren}
          ref={handleInputContainerRef}
          onClick={handleChildrenClick}
        >
          {typeof children === 'function'
            ? children({ describedBy })
            : children}
        </span>
        {!isGroup && renderMessages()}
      </ElementType>
    )
  }
)

FormFieldLayout.displayName = 'FormFieldLayout'

export default FormFieldLayout
export { FormFieldLayout, allowedProps }
