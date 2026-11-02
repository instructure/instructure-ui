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

import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react'
import type { MouseEvent, SyntheticEvent } from 'react'
import { useStyleNew } from '@instructure/emotion'
import { omitProps, useDeterministicId } from '@instructure/ui-react-utils'

import type { GlobalNavMainNavItem, GlobalNavProps } from './props.js'
import { allowedProps } from './props.js'
import generateStyle, { generateMainNavStyle } from './styles.js'
import { CollapseButton } from './CollapseButton/index.js'
import { CollapsedSubNav } from './CollapsedSubNav/index.js'
import { InstitutionLogo } from './InstitutionLogo/index.js'
import { MainNavItem } from './MainNavItem/index.js'
import { SubNav } from './SubNav/index.js'
import type { FocusIntent } from './SubNav/props.js'

// React 18 warns about useLayoutEffect on the server, where there is no layout to measure
const useClientLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
---
category: components
isWIP: true
---
**/
const GlobalNav = forwardRef<HTMLElement, GlobalNavProps>(
  (props: GlobalNavProps, ref) => {
    const {
      label,
      collapsed,
      onCollapse,
      collapseLabel,
      expandLabel,
      closeSubNavLabel,
      expandSubNavLabel,
      openSubNav,
      onSubNavChange,
      items,
      logo,
      themeOverride
    } = props

    const styles = useStyleNew({
      generateStyle,
      themeOverride,
      params: { collapsed },
      componentId: 'GlobalNav',
      displayName: 'GlobalNav'
    })

    // MainNav is a separate token set, and useStyleNew reads one set per call
    const mainNavStyles = useStyleNew({
      generateStyle: generateMainNavStyle,
      params: { collapsed },
      componentId: 'MainNav'
    })

    const getId = useDeterministicId('GlobalNav')
    const subNavId = getId('GlobalNav-subNav')
    const titleId = getId('GlobalNav-subNavTitle')

    const focusIntentRef = useRef<FocusIntent>()
    const triggerRefs = useRef(new Map<string, HTMLElement>())
    const renderedSubNavRef = useRef<string>()
    const railRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const collapseButtonRef = useRef<Element | null>(null)

    // the SubNav buttons line up with the rail's collapse button, whose position depends on the logo
    const updateCollapseButtonTop = () => {
      const rail = railRef.current
      const button = collapseButtonRef.current
      if (!rail || !button) return
      const top =
        button.getBoundingClientRect().top -
        rail.getBoundingClientRect().top -
        rail.clientTop
      rail.style.setProperty('--globalNav-collapseButtonTop', `${top}px`)
    }

    // after every render, because the theme and the collapsed state move the button,
    // and before paint, so a SubNav that is open on page load doesn't jump
    useClientLayoutEffect(updateCollapseButtonTop)

    // the header also resizes without a render, for example when the logo image loads
    useEffect(() => {
      const header = headerRef.current
      if (!header || typeof ResizeObserver === 'undefined') return
      const observer = new ResizeObserver(updateCollapseButtonTop)
      observer.observe(header)
      return () => observer.disconnect()
    }, [])

    const openItem = items.find(
      (item) => item.itemID === openSubNav && item.subNav
    )
    // the SubNav of the current page collapses to a strip, other SubNavs close completely
    const currentSectionItem = items.find((item) => item.current && item.subNav)

    useEffect(() => {
      const intent = focusIntentRef.current
      // an intent lives for one commit, so a change that the app ignores doesn't move focus later
      focusIntentRef.current = undefined
      const closedID = renderedSubNavRef.current
      renderedSubNavRef.current = openItem?.itemID

      if (
        !openItem &&
        closedID !== undefined &&
        (intent?.target === 'trigger' || intent?.target === 'rescue')
      ) {
        triggerRefs.current.get(closedID)?.focus()
      }
    })

    const handleItemActivate = (
      event: MouseEvent<HTMLElement>,
      item: GlobalNavMainNavItem
    ) => {
      if (item.subNav) {
        const next = openSubNav === item.itemID ? undefined : item.itemID
        focusIntentRef.current = next
          ? { target: 'first' }
          : { target: 'trigger' }
        onSubNavChange?.(event, next)
      } else if (
        openItem &&
        // a link opened in a new tab or window keeps the SubNav open
        !(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      ) {
        focusIntentRef.current = { target: 'none' }
        onSubNavChange?.(event, undefined)
      }
    }

    const handleSubNavClose = (event: SyntheticEvent) => {
      focusIntentRef.current = { target: 'trigger' }
      onSubNavChange?.(event, undefined)
    }

    const handleSubNavExpand = (event: SyntheticEvent) => {
      if (!currentSectionItem) return
      focusIntentRef.current = { target: 'first' }
      onSubNavChange?.(event, currentSectionItem.itemID)
    }

    return (
      <nav
        {...omitProps(props, allowedProps)}
        ref={ref}
        aria-label={label}
        css={styles?.globalNav}
      >
        <div ref={railRef} css={styles?.rail}>
          <div css={mainNavStyles?.mainNav}>
            <div ref={headerRef} css={mainNavStyles?.header}>
              <InstitutionLogo logo={logo} collapsed={collapsed} />
              <CollapseButton
                collapsed={collapsed}
                collapseLabel={collapseLabel}
                expandLabel={expandLabel}
                onCollapse={onCollapse}
                elementRef={(element) => {
                  collapseButtonRef.current = element
                }}
              />
            </div>
            {!collapsed && <div css={styles?.divider} />}
            <ul css={mainNavStyles?.items}>
              {items.map((item) => (
                <MainNavItem
                  key={item.itemID}
                  item={item}
                  collapsed={collapsed}
                  open={openSubNav === item.itemID}
                  subNavId={
                    openItem?.itemID === item.itemID ? subNavId : undefined
                  }
                  onActivate={handleItemActivate}
                  elementRef={(element) => {
                    if (element) {
                      triggerRefs.current.set(item.itemID, element)
                    } else {
                      triggerRefs.current.delete(item.itemID)
                    }
                  }}
                />
              ))}
            </ul>
          </div>
          {openItem?.subNav ? (
            <SubNav
              key={openItem.itemID}
              subNav={openItem.subNav}
              subNavId={subNavId}
              titleId={titleId}
              closeSubNavLabel={closeSubNavLabel}
              onClose={handleSubNavClose}
              focusIntentRef={focusIntentRef}
            />
          ) : (
            currentSectionItem && (
              <CollapsedSubNav
                label={expandSubNavLabel}
                onExpand={handleSubNavExpand}
              />
            )
          )}
        </div>
      </nav>
    )
  }
)

GlobalNav.displayName = 'GlobalNav'

export default GlobalNav
export { GlobalNav }
