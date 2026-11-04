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

import { useState } from 'react'
import type { MouseEvent, SyntheticEvent } from 'react'

import { useStyleNew } from '@instructure/emotion'

import type { GlobalNavSubNav, GlobalNavSubNavItem } from '../props.js'
import { SubNavLevel } from '../SubNavLevel/index.js'
import type { SubNavProps } from './props.js'
import generateStyle from './styles.js'

type Level = { subNav: GlobalNavSubNav; itemID?: string }

// the itemIDs of the levels to open so the deepest current item shows, or undefined without one
const findCurrentPath = (subNav: GlobalNavSubNav): string[] | undefined => {
  const items = subNav.items ?? []
  for (const item of items) {
    if (item.subNav) {
      const deeperPath = findCurrentPath(item.subNav)
      if (deeperPath) return [item.itemID, ...deeperPath]
    }
  }
  return items.some((item) => item.current) ? [] : undefined
}

// stops at an itemID that the latest data no longer has, so the deepest level that still exists shows
const resolveLevels = (subNav: GlobalNavSubNav, path: string[]) => {
  const levels: Level[] = [{ subNav }]
  for (const itemID of path) {
    const parent = levels[levels.length - 1].subNav
    const item = parent.items?.find((i) => i.itemID === itemID)
    if (!item?.subNav) break
    levels.push({ subNav: item.subNav, itemID })
  }
  return levels
}

/**
---
private: true
id: GlobalNav.SubNav
---
**/
const SubNav = (props: SubNavProps) => {
  const {
    subNav,
    subNavId,
    titleId,
    closeSubNavLabel,
    backLabel,
    onClose,
    focusIntentRef
  } = props

  const styles = useStyleNew({
    generateStyle,
    componentId: 'SubNav'
  })

  const [path, setPath] = useState(() => findCurrentPath(subNav) ?? [])

  const levels = resolveLevels(subNav, path)
  const resolvedPath = levels.slice(1).map((level) => level.itemID!)
  // keeps the stored path short, so the level doesn't jump back if a removed item returns
  if (resolvedPath.length < path.length) {
    setPath(resolvedPath)
  }
  const level = levels[levels.length - 1]
  const parent = levels.length > 1 ? levels[levels.length - 2] : undefined

  const handleDrillIn = (
    _event: MouseEvent<HTMLElement>,
    item: GlobalNavSubNavItem
  ) => {
    focusIntentRef.current = { target: 'first' }
    setPath([...resolvedPath, item.itemID])
  }

  const handleBack = (_event: SyntheticEvent) => {
    focusIntentRef.current = {
      target: 'item',
      itemID: resolvedPath[resolvedPath.length - 1]
    }
    setPath(resolvedPath.slice(0, -1))
  }

  return (
    <nav id={subNavId} aria-labelledby={titleId} css={styles?.subNav}>
      <SubNavLevel
        // a new level remounts, which resets its refs, focus and scroll position
        key={JSON.stringify(resolvedPath)}
        subNav={level.subNav}
        titleId={titleId}
        closeSubNavLabel={closeSubNavLabel}
        onClose={onClose}
        back={
          parent && {
            title: parent.subNav.title,
            label: backLabel(parent.subNav.title),
            onClick: handleBack
          }
        }
        onDrillIn={handleDrillIn}
        focusIntentRef={focusIntentRef}
      />
    </nav>
  )
}

export default SubNav
export { SubNav }
