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

import { useEffect, useRef } from 'react'
import type { FocusEvent, SyntheticEvent } from 'react'

import { useStyleNew } from '@instructure/emotion'
import { IconButton } from '@instructure/ui-buttons/latest'
import { Heading } from '@instructure/ui-heading/latest'
import { PanelLeftCloseInstUIIcon } from '@instructure/ui-icons'

import { SubNavItem } from '../SubNavItem/index.js'
import type { SubNavLevelProps } from './props.js'
import generateStyle from './styles.js'

/**
---
private: true
id: GlobalNav.SubNavLevel
---
**/
const SubNavLevel = (props: SubNavLevelProps) => {
  const { subNav, titleId, closeSubNavLabel, onClose, focusIntentRef } = props

  const styles = useStyleNew({
    generateStyle,
    componentId: 'SubNav'
  })

  const firstItemRef = useRef<HTMLElement | null>(null)
  const closeRef = useRef<HTMLElement | null>(null)
  const focusInsideRef = useRef(false)

  useEffect(() => {
    const intent = focusIntentRef.current
    if (intent?.target === 'rescue' || intent?.target === 'first') {
      focusIntentRef.current = undefined
      ;(firstItemRef.current ?? closeRef.current)?.focus()
    }

    return () => {
      // React fires no blur event for an element it removes, so the flag still says whether focus was inside
      if (focusInsideRef.current && !focusIntentRef.current) {
        focusIntentRef.current = { target: 'rescue' }
      }
    }
  }, [focusIntentRef])

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    focusInsideRef.current = event.currentTarget.contains(
      event.relatedTarget as Node | null
    )
  }

  const items = subNav.items ?? []

  return (
    <div
      css={styles?.level}
      onFocus={() => {
        focusInsideRef.current = true
      }}
      onBlur={handleBlur}
    >
      <div css={styles?.header}>
        <IconButton
          screenReaderLabel={closeSubNavLabel}
          // the icon mirrors itself in RTL
          renderIcon={PanelLeftCloseInstUIIcon}
          withBackground={false}
          withBorder={false}
          size="small"
          elementRef={(element) => {
            closeRef.current = element as HTMLElement | null
          }}
          // IconButton types the event target as ViewProps, at runtime it is the DOM button
          onClick={(event) => onClose(event as unknown as SyntheticEvent)}
        />
      </div>
      <Heading
        level="h2"
        variant="titleCardRegular"
        color="inherit"
        id={titleId}
      >
        {subNav.title}
      </Heading>
      <div css={styles?.divider} />
      <div css={styles?.body}>
        {items.length > 0 && (
          <ul css={styles?.items}>
            {items.map((item, index) => (
              <SubNavItem
                key={item.itemID}
                item={item}
                elementRef={
                  index === 0
                    ? (element) => {
                        firstItemRef.current = element
                      }
                    : undefined
                }
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default SubNavLevel
export { SubNavLevel }
