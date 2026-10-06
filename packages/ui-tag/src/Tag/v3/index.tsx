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

import { XInstUIIcon } from '@instructure/ui-icons'
import { View } from '@instructure/ui-view/latest'
import type { ViewProps } from '@instructure/ui-view/latest'
import { omitProps } from '@instructure/ui-react-utils'
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
    dismissible = false,
    disabled = false,
    readOnly = false,
    onClick,
    margin,
    elementRef,
    themeOverride
  } = props

  const [iconHovered, setIconHovered] = useState(false)
  const rootRef = useRef<Element | null>(null)

  const styles = useStyleNew({
    generateStyle,
    themeOverride,
    params: { size, dismissible, disabled, isButton: !!onClick },
    componentId: 'Tag',
    displayName: 'Tag'
  })

  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        ;(rootRef.current as HTMLElement | null)?.focus()
      },
      get focused() {
        return isActiveElement(rootRef.current)
      }
    }),
    []
  )

  const handleRef = (element: Element | null) => {
    rootRef.current = element
    if (typeof elementRef === 'function') {
      elementRef(element)
    }
  }

  const handleClick = (e: React.MouseEvent<ViewProps & Element>) => {
    if (disabled || readOnly) {
      e.preventDefault()
      e.stopPropagation()
    } else if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  const iconSize = ({ small: 'xs', medium: 'sm', large: 'md' } as const)[size]
  const iconColor = disabled
    ? 'mutedColor'
    : iconHovered
    ? 'actionSecondaryHoverColor'
    : 'baseColor'

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
      as={onClick ? 'button' : 'span'}
      margin={margin}
      type={onClick ? 'button' : undefined}
      {...(onClick && { onClick: handleClick })}
      disabled={disabled || readOnly}
      display={undefined}
      title={typeof text === 'string' ? text : undefined}
      data-cid="Tag"
      onMouseEnter={() => setIconHovered(true)}
      onMouseLeave={() => setIconHovered(false)}
    >
      <span css={styles?.text}>{text}</span>
      {onClick && dismissible ? (
        <span css={styles?.icon}>
          <XInstUIIcon size={iconSize} color={iconColor} />
        </span>
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
