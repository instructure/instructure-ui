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
import './Menu'
// composition: register <instui-popover> for the dropdown story
import '../Popover/Popover'
import type { MenuConfigNode, MenuSelectDetail } from './Menu'

const meta: Meta = {
  title: 'ui-web-core/Menu',
  component: 'instui-menu'
}

export default meta

type Story = StoryObj

const onSelect = (event: Event) => {
  const { detail } = event as CustomEvent<MenuSelectDetail>
  // eslint-disable-next-line no-console
  console.log('instui-menu-select', detail)
}

// ---------------------------------------------------------------------------
// Flat menu: plain items, a single-select group, a multi-select group
// ---------------------------------------------------------------------------

const items: MenuConfigNode[] = [
  { id: 'new', label: 'New', value: 'new' },
  { id: 'open', label: 'Open…', value: 'open' },
  { separator: true, id: 'sep1' },
  {
    groupId: 'view',
    label: 'View (single-select)',
    allowMultiple: false,
    defaultSelected: ['grid'],
    items: [
      { id: 'grid', label: 'Grid', value: 'grid' },
      { id: 'list', label: 'List', value: 'list' },
      { id: 'columns', label: 'Columns', value: 'columns' }
    ]
  },
  { separator: true, id: 'sep2' },
  {
    groupId: 'panels',
    label: 'Panels (multi-select)',
    allowMultiple: true,
    defaultSelected: ['sidebar'],
    items: [
      { id: 'sidebar', label: 'Sidebar', value: 'sidebar' },
      { id: 'inspector', label: 'Inspector', value: 'inspector' },
      { id: 'console', label: 'Console', value: 'console', disabled: true }
    ]
  }
]

export const Flat: Story = {
  render: () => html`
    <instui-menu
      label="Editor menu"
      .items=${items}
      @instui-menu-select=${onSelect}
    ></instui-menu>
  `
}

// ---------------------------------------------------------------------------
// Flyout submenus: an item with nested `items` opens a child menu in its own
// nested <instui-popover> (hover / Right-arrow open, Left-arrow / Escape close)
// ---------------------------------------------------------------------------

const flyoutItems: MenuConfigNode[] = [
  { id: 'cut', label: 'Cut', value: 'cut' },
  { id: 'copy', label: 'Copy', value: 'copy' },
  {
    id: 'share',
    label: 'Share',
    items: [
      { id: 'share-link', label: 'Copy link', value: 'share-link' },
      { id: 'share-email', label: 'Email', value: 'share-email' },
      {
        id: 'share-social',
        label: 'Social',
        items: [
          { id: 'share-x', label: 'X', value: 'share-x' },
          { id: 'share-fb', label: 'Facebook', value: 'share-fb' }
        ]
      }
    ]
  },
  { separator: true, id: 'sep' },
  {
    groupId: 'export',
    label: 'Export as',
    allowMultiple: false,
    defaultSelected: ['pdf'],
    items: [
      { id: 'pdf', label: 'PDF', value: 'pdf' },
      { id: 'png', label: 'PNG', value: 'png' }
    ]
  }
]

export const Flyout: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <p style="font-family: system-ui; max-width: 32rem; margin: 0 0 1rem;">
      Hover or press <kbd>→</kbd> on “Share” / “Social” to open nested submenus
      (each is a child <code>&lt;instui-menu&gt;</code> in its own
      <code>&lt;instui-popover&gt;</code>). <kbd>←</kbd>/<kbd>Escape</kbd> or an
      outside click closes them; focus returns to the parent item.
    </p>
    <instui-menu
      label="Actions"
      .items=${flyoutItems}
      @instui-menu-select=${onSelect}
    ></instui-menu>
  `
}

// ---------------------------------------------------------------------------
// Dropdown: the menu composed inside <instui-popover> (trigger mode)
// ---------------------------------------------------------------------------

export const Dropdown: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="padding: 6rem; font-family: system-ui;">
      <p style="max-width: 30rem;">
        The menu composed inside <code>&lt;instui-popover&gt;</code>. Click the
        trigger to open; keyboard-navigate; a selection closes the popover
        (<code>shouldHideOnSelect</code>); click outside / <kbd>Escape</kbd>
        dismisses.
      </p>
      <instui-popover
        id="menu-popover"
        placement="bottom start"
        should-contain-focus
        should-return-focus
      >
        <button slot="trigger" aria-haspopup="true">Actions ▾</button>
        <instui-menu
          label="Actions"
          .items=${items}
          @instui-menu-select=${(event: Event) => {
            onSelect(event)
            ;(
              document.getElementById('menu-popover') as
                | (HTMLElement & { hide?: () => void })
                | null
            )?.hide?.()
          }}
        ></instui-menu>
      </instui-popover>
    </div>
  `
}
