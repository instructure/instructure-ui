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

import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './Drilldown'
// composition: register <instui-popover> so the drilldown can be triggered from it
import '../Popover/Popover'
import type {
  DrilldownConfigPage,
  DrilldownSelectDetail,
  DrilldownPageChangeDetail
} from './Drilldown'

const meta: Meta = {
  title: 'ui-web-core/Drilldown',
  component: 'instui-drilldown'
}

export default meta

type Story = StoryObj

const onSelect = (event: Event) => {
  const { detail } = event as CustomEvent<DrilldownSelectDetail>
  // eslint-disable-next-line no-console
  console.log('instui-drilldown-select', detail)
}

const onPageChange = (event: Event) => {
  const { detail } = event as CustomEvent<DrilldownPageChangeDetail>
  // eslint-disable-next-line no-console
  console.log('instui-drilldown-page-change', detail)
}

// ---------------------------------------------------------------------------
// Selection — single (radio) + multiple (checkbox) groups on one page
// ---------------------------------------------------------------------------

const selectionPages: DrilldownConfigPage[] = [
  {
    pageId: 'settings',
    title: 'Account settings',
    groups: [
      {
        groupId: 'theme',
        groupTitle: 'Theme (single-select)',
        selectableType: 'single',
        defaultSelected: ['light'],
        options: [
          { id: 'theme-light', label: 'Light', value: 'light' },
          { id: 'theme-dark', label: 'Dark', value: 'dark' },
          { id: 'theme-system', label: 'Match system', value: 'system' }
        ]
      },
      {
        groupId: 'notifications',
        groupTitle: 'Notifications (multi-select)',
        selectableType: 'multiple',
        defaultSelected: ['email'],
        options: [
          { id: 'notif-email', label: 'Email', value: 'email' },
          { id: 'notif-sms', label: 'SMS', value: 'sms' },
          {
            id: 'notif-push',
            label: 'Push (disabled)',
            value: 'push',
            disabled: true
          }
        ]
      }
    ]
  }
]

export const Selection: Story = {
  render: () => html`
    <instui-drilldown
      root-page-id="settings"
      label="Account settings"
      .pages=${selectionPages}
      @instui-drilldown-select=${onSelect}
    ></instui-drilldown>
  `
}

// ---------------------------------------------------------------------------
// Navigation — root page drilling into sub-pages, then selecting
// ---------------------------------------------------------------------------

const navigationPages: DrilldownConfigPage[] = [
  {
    pageId: 'root',
    title: 'Order menu',
    groups: [
      {
        groupId: 'root-nav',
        options: [
          { id: 'go-food', label: 'Food', subPageId: 'food' },
          { id: 'go-drinks', label: 'Drinks', subPageId: 'drinks' }
        ]
      }
    ]
  },
  {
    pageId: 'food',
    title: 'Food',
    groups: [
      {
        groupId: 'food-choice',
        groupTitle: 'Pick one',
        selectableType: 'single',
        options: [
          { id: 'food-pizza', label: 'Pizza', value: 'pizza' },
          { id: 'food-salad', label: 'Salad', value: 'salad' },
          { id: 'food-soup', label: 'Soup', value: 'soup' }
        ]
      }
    ]
  },
  {
    pageId: 'drinks',
    title: 'Drinks',
    groups: [
      {
        groupId: 'drink-choice',
        groupTitle: 'Pick any',
        selectableType: 'multiple',
        options: [
          { id: 'drink-coffee', label: 'Coffee', value: 'coffee' },
          { id: 'drink-tea', label: 'Tea', value: 'tea' },
          { id: 'drink-water', label: 'Water', value: 'water' }
        ]
      }
    ]
  }
]

export const Navigation: Story = {
  render: () => html`
    <p style="font-family: system-ui; max-width: 30rem; margin: 0 0 1rem;">
      Click a row (or use ↑/↓ then →) to drill into a sub-page. Use ← or the
      Back button to return. Selection state per group is preserved across
      navigation — all of it driven by the shared, React-free behavior reducers.
    </p>
    <instui-drilldown
      root-page-id="root"
      label="Order menu"
      .pages=${navigationPages}
      @instui-drilldown-select=${onSelect}
      @instui-drilldown-page-change=${onPageChange}
    ></instui-drilldown>
  `
}

// ---------------------------------------------------------------------------
// Keyboard reference
// ---------------------------------------------------------------------------

export const KeyboardNavigation: Story = {
  render: () => html`
    <p style="font-family: system-ui; max-width: 30rem; margin: 0 0 1rem;">
      Focus an option and try: <kbd>↑</kbd>/<kbd>↓</kbd> move (wrapping),
      <kbd>Home</kbd>/<kbd>End</kbd> jump, <kbd>Enter</kbd>/<kbd>Space</kbd>
      activate, <kbd>→</kbd> drill in, <kbd>←</kbd> go back.
    </p>
    <instui-drilldown
      root-page-id="root"
      label="Order menu"
      .pages=${navigationPages}
      @instui-drilldown-select=${onSelect}
      @instui-drilldown-page-change=${onPageChange}
    ></instui-drilldown>
  `
}

// ---------------------------------------------------------------------------
// Trigger / popover mode — the two extracted Lit components composed.
//
// Shadow-DOM-correct composition: <instui-popover> relocates the WHOLE
// <instui-drilldown> host element into its body portal, so the drilldown's own
// shadow root (scoped styles + keyboard/selection listeners) travels intact.
// This is the web-components equivalent of the React Drilldown's `trigger` prop.
//
// `shouldHideOnSelect` is wired here: a terminal selection (not page nav, which
// fires page-change instead) closes the popover.
// ---------------------------------------------------------------------------

export const InPopover: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="padding: 6rem; font-family: system-ui;">
      <p style="max-width: 30rem;">
        Click the trigger to open the drilldown in a positioned popover.
        Navigate with the keyboard, pick a leaf option to select-and-close, or
        click outside / press <kbd>Escape</kbd> to dismiss.
      </p>
      <instui-popover
        id="dd-popover"
        placement="bottom start"
        should-contain-focus
        should-return-focus
      >
        <button slot="trigger">Open menu</button>
        <instui-drilldown
          root-page-id="root"
          label="Order menu"
          .pages=${navigationPages}
          @instui-drilldown-select=${(event: Event) => {
            onSelect(event)
            // shouldHideOnSelect: terminal selection closes the popover
            ;(
              document.getElementById('dd-popover') as
                | (HTMLElement & { hide?: () => void })
                | null
            )?.hide?.()
          }}
          @instui-drilldown-page-change=${onPageChange}
        ></instui-drilldown>
      </instui-popover>
    </div>
  `
}
