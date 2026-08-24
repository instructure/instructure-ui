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

import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'

/**
 * Scenario slug -> component.
 *
 * `next/dynamic` (with SSR left on, which is the default) code-splits every
 * scenario into its own chunk. That is closer to how a real app loads than one
 * giant bundle, and it makes the gap between "server HTML is on screen" and
 * "React has hydrated this subtree" wide enough to actually see under network
 * throttling.
 */
export const LOADERS: Record<string, ComponentType> = {
  'text-input': dynamic(() => import('./text-input')),
  link: dynamic(() => import('./link')),
  button: dynamic(() => import('./button')),
  table: dynamic(() => import('./table')),
  tabs: dynamic(() => import('./tabs')),
  'tree-browser': dynamic(() => import('./tree-browser')),
  'side-nav-bar': dynamic(() => import('./side-nav-bar')),
  'top-nav-bar': dynamic(() => import('./top-nav-bar')),
  'drawer-layout': dynamic(() => import('./drawer-layout')),
  'toggle-group': dynamic(() => import('./toggle-group')),
  'file-drop': dynamic(() => import('./file-drop')),
  'progress-circle': dynamic(() => import('./progress-circle')),
  rating: dynamic(() => import('./rating')),
  calendar: dynamic(() => import('./calendar')),
  'color-picker': dynamic(() => import('./color-picker')),
  drilldown: dynamic(() => import('./drilldown')),
  'truncate-text': dynamic(() => import('./truncate-text')),
  pill: dynamic(() => import('./pill')),
  'text-area': dynamic(() => import('./text-area')),
  breadcrumb: dynamic(() => import('./breadcrumb')),
  select: dynamic(() => import('./select')),
  'suite-form': dynamic(() => import('./suite-form')),
  'suite-dashboard': dynamic(() => import('./suite-dashboard')),
  'suite-app-shell': dynamic(() => import('./suite-app-shell'))
}
