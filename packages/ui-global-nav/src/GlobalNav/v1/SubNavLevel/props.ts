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

import type { MouseEvent, MutableRefObject, SyntheticEvent } from 'react'

import type { ComponentStyle } from '@instructure/emotion'

import type { GlobalNavSubNav, GlobalNavSubNavItem } from '../props.js'
import type { FocusIntent } from '../SubNav/props.js'

type SubNavLevelProps = {
  /**
   * The data of the level.
   */
  subNav: GlobalNavSubNav
  /**
   * The id of the title.
   */
  titleId: string
  /**
   * Screen reader text of the close handle.
   */
  closeSubNavLabel: string
  /**
   * Called when the user clicks the close handle.
   */
  onClose: (event: SyntheticEvent) => void
  /**
   * The back button of a deeper level: the title of the level it returns to, its screen reader text and its click handler.
   */
  back?: {
    title: string
    label: string
    onClick: (event: SyntheticEvent) => void
  }
  /**
   * Called when the user activates an item with a `subNav`.
   */
  onDrillIn: (event: MouseEvent<HTMLElement>, item: GlobalNavSubNavItem) => void
  /**
   * The focus move that the user asked for, shared with GlobalNav.
   */
  focusIntentRef: MutableRefObject<FocusIntent | undefined>
}

type SubNavLevelStyle = ComponentStyle<
  'level' | 'header' | 'back' | 'divider' | 'body' | 'items'
>

export type { SubNavLevelProps, SubNavLevelStyle }
