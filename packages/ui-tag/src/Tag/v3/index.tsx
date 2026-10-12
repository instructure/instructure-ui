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

import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

import { XInstUIIcon, renderIconWithProps } from '@instructure/ui-icons'
import { View } from '@instructure/ui-view/latest'
import type { ViewProps } from '@instructure/ui-view/latest'
import { omitProps, callRenderProp } from '@instructure/ui-react-utils'
import { isActiveElement } from '@instructure/ui-dom-utils'
import { useStyleNew } from '@instructure/emotion'

import generateStyle from './styles.js'
import type { TagProps } from './props'
import { allowedProps } from './props.js'

/**
---
category: components
---
**/
const Tag = forwardRef<TagHandle, TagProps>((props, ref) => {
  const {
    className,
    text,
    size = 'medium',
    disabled = false,
    readOnly = false,
    href,
    renderIcon,
    renderDismissButtonLabel,
    onDismiss,
    margin,
    elementRef,
    themeOverride
  } = props

  const [iconHovered, setIconHovered] = useState(false)
  const linkRef = useRef<HTMLAnchorElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)

  const isBlocked = disabled || readOnly
  const isLink = !!href
  const dismissLabel =
    renderDismissButtonLabel != null
      ? callRenderProp(renderDismissButtonLabel)
      : undefined

  const styles = useStyleNew({
    generateStyle,
    themeOverride,
    params: { size, disabled, isLink },
    componentId: 'Tag',
    displayName: 'Tag'
  })

  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        ;(linkRef.current ?? closeRef.current)?.focus()
      },
      get focused() {
        return (
          isActiveElement(linkRef.current) || isActiveElement(closeRef.current)
        )
      }
    }),
    []
  )

  const handleRef = (element: Element | null) => {
    if (typeof elementRef === 'function') {
      elementRef(element)
    }
  }

  const handleDismiss = (e: React.MouseEvent<Element>) => {
    if (isBlocked) {
      e.preventDefault()
      e.stopPropagation()
    } else if (typeof onDismiss === 'function') {
      onDismiss(e as React.MouseEvent<ViewProps & Element>)
    }
  }

  const iconSize = ({ small: 'xs', medium: 'sm', large: 'sm' } as const)[size]
  const iconColor = disabled
    ? 'mutedColor'
    : iconHovered
    ? 'actionSecondaryHoverColor'
    : 'baseColor'

  const content = (
    <>
      {renderIcon ? (
        <span css={styles?.leadIcon}>
          {renderIconWithProps(renderIcon, iconSize, undefined)}
        </span>
      ) : null}
      <span css={styles?.text}>{text}</span>
    </>
  )

  const passthroughProps = View.omitViewProps(
    omitProps(props, allowedProps),
    Tag
  )

  return (
    <View
      {...passthroughProps}
      elementRef={handleRef}
      css={styles?.tag}
      className={className}
      as="span"
      margin={margin}
      display={undefined}
      data-cid="Tag"
    >
      {isLink ? (
        <a
          css={styles?.body}
          ref={linkRef}
          href={isBlocked ? undefined : href}
          aria-disabled={isBlocked ? 'true' : undefined}
        >
          {content}
        </a>
      ) : (
        <span css={styles?.body}>{content}</span>
      )}
      {dismissLabel ? (
        <button
          type="button"
          css={styles?.closeButton}
          ref={closeRef}
          onClick={handleDismiss}
          onMouseEnter={() => setIconHovered(true)}
          onMouseLeave={() => setIconHovered(false)}
          disabled={isBlocked}
          aria-label={dismissLabel as string}
        >
          <span css={styles?.closeIcon}>
            <XInstUIIcon size="sm" color={iconColor} />
          </span>
        </button>
      ) : null}
    </View>
  )
})

Tag.displayName = 'Tag'

interface TagHandle {
  focus: () => void
  readonly focused: boolean
}

export default Tag
export { Tag }
export type { TagHandle }
