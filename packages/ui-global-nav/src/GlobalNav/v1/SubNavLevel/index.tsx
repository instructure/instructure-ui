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
import { CondensedButton, IconButton } from '@instructure/ui-buttons/latest'
import { findTabbable } from '@instructure/ui-dom-utils'
import { Heading } from '@instructure/ui-heading/latest'
import {
  ChevronLeftInstUIIcon,
  PanelLeftCloseInstUIIcon
} from '@instructure/ui-icons'
import { callRenderProp } from '@instructure/ui-react-utils'
import { Tooltip } from '@instructure/ui-tooltip/latest'

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
  const {
    subNav,
    titleId,
    closeSubNavLabel,
    onClose,
    back,
    onDrillIn,
    focusIntentRef
  } = props

  const styles = useStyleNew({
    generateStyle,
    componentId: 'SubNav'
  })

  const itemRefs = useRef(new Map<string, HTMLElement>())
  const closeRef = useRef<HTMLElement | null>(null)
  const focusInsideRef = useRef(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const intent = focusIntentRef.current
    const firstElement =
      (findTabbable(bodyRef.current)[0] as HTMLElement | undefined) ??
      closeRef.current
    if (intent?.target === 'rescue' || intent?.target === 'first') {
      focusIntentRef.current = undefined
      firstElement?.focus()
    } else if (intent?.target === 'item') {
      focusIntentRef.current = undefined
      ;(itemRefs.current.get(intent.itemID) ?? firstElement)?.focus()
    }

    return () => {
      // React fires no blur event for an element it removes, so the flag still says whether focus was inside
      // StrictMode runs this cleanup without removing the level, and then focus is still in it
      if (
        focusInsideRef.current &&
        !focusIntentRef.current &&
        !root?.contains(document.activeElement)
      ) {
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
      ref={rootRef}
      css={styles?.level}
      onFocus={() => {
        focusInsideRef.current = true
      }}
      onBlur={handleBlur}
    >
      <div css={styles?.header}>
        {back && (
          <span css={styles?.back}>
            <CondensedButton
              color="secondary"
              size="small"
              // the design shows it as plain text, without a hover background
              themeOverride={{ secondaryGhostHoverBackground: 'transparent' }}
              // the icon mirrors itself in RTL
              renderIcon={<ChevronLeftInstUIIcon />}
              aria-label={back.label}
              // CondensedButton types the event target as ViewProps, at runtime it is the DOM button
              onClick={(event) =>
                back.onClick(event as unknown as SyntheticEvent)
              }
            >
              {back.title}
            </CondensedButton>
          </span>
        )}
        <Tooltip renderTip={closeSubNavLabel}>
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
        </Tooltip>
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
      <div ref={bodyRef} css={styles?.body}>
        {subNav.renderContent !== undefined
          ? callRenderProp(subNav.renderContent)
          : items.length > 0 && (
              <ul {...subNav.listElementProps} css={styles?.items}>
                {items.map((item) => (
                  <SubNavItem
                    key={item.itemID}
                    item={item}
                    elementRef={(element) => {
                      if (element) {
                        itemRefs.current.set(item.itemID, element)
                      } else {
                        itemRefs.current.delete(item.itemID)
                      }
                    }}
                    onDrillIn={onDrillIn}
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
