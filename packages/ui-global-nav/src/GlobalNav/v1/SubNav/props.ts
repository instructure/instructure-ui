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

import type { MutableRefObject, SyntheticEvent } from 'react'

import type { ComponentStyle } from '@instructure/emotion'

import type { GlobalNavSubNav } from '../props.js'

// set in event handlers and applied in effects, after the app re-renders with the new state
type FocusIntent =
  // open or drill-in: the first focusable element in the level's body, else the close handle
  | { target: 'first' }
  // back: the item that opened the level the user left
  | { target: 'item'; itemID: string }
  // the user closed the SubNav: its rail item
  | { target: 'trigger' }
  // a rail item without a SubNav closed it: focus stays where the user clicked
  | { target: 'none' }
  // a level with focus went away without a user action: the rail item, or the first element of the next level
  | { target: 'rescue' }

type SubNavProps = {
  /**
   * The data of the top level.
   */
  subNav: GlobalNavSubNav
  /**
   * The id of the panel, which the rail item points to with `aria-controls`.
   */
  subNavId: string
  /**
   * The id of the title, which names the panel.
   */
  titleId: string
  /**
   * Screen reader text of the close handle.
   */
  closeSubNavLabel: string
  /**
   * Screen reader text of the back button, from the title of the level it returns to.
   */
  backLabel: (parentTitle: string) => string
  /**
   * Called when the user clicks the close handle.
   */
  onClose: (event: SyntheticEvent) => void
  /**
   * The focus move that the user asked for, shared with GlobalNav.
   */
  focusIntentRef: MutableRefObject<FocusIntent | undefined>
}

type SubNavStyle = ComponentStyle<'subNav'>

export type { FocusIntent, SubNavProps, SubNavStyle }
