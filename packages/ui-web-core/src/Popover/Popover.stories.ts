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
import './Popover'

type Args = {
  placement: string
}

const meta: Meta<Args> = {
  title: 'ui-web-core/Popover',
  component: 'instui-popover',
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: [
        'top center',
        'bottom center',
        'start center',
        'end center',
        'top start',
        'bottom start'
      ]
    }
  },
  args: { placement: 'bottom center' }
}

export default meta

type Story = StoryObj<Args>

const onShow = () => {
  // eslint-disable-next-line no-console
  console.log('instui-popover-show')
}

const onHide = (event: Event) => {
  // eslint-disable-next-line no-console
  console.log('instui-popover-hide', (event as CustomEvent).detail)
}

// ---------------------------------------------------------------------------
// Click-triggered popover with focusable content (contain + return focus)
// ---------------------------------------------------------------------------

export const Playground: Story = {
  render: (args) => html`
    <div style="padding: 6rem; font-family: system-ui;">
      <instui-popover
        placement=${args.placement}
        should-contain-focus
        should-return-focus
        @instui-popover-show=${onShow}
        @instui-popover-hide=${onHide}
      >
        <button slot="trigger">Open popover</button>
        <div style="padding: 1rem; max-width: 16rem;">
          <p style="margin: 0 0 0.5rem;">Focusable popover content.</p>
          <button>An action</button>
        </div>
      </instui-popover>
    </div>
  `
}

// ---------------------------------------------------------------------------
// Click-outside + Escape to dismiss (via the shared FocusRegion)
// ---------------------------------------------------------------------------

export const DismissBehavior: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="padding: 6rem; font-family: system-ui;">
      <p style="max-width: 28rem;">
        Open the popover, then click anywhere outside it or press
        <kbd>Escape</kbd> — both route through
        <code>FocusRegion.onDismiss</code> to <code>hide()</code>, firing
        <code>instui-popover-hide</code> (with <code>documentClick</code> set
        for outside clicks).
      </p>
      <instui-popover
        placement="bottom start"
        should-contain-focus
        should-return-focus
        @instui-popover-hide=${onHide}
      >
        <button slot="trigger">Menu</button>
        <div style="padding: 0.5rem;">
          <button style="display:block; width:100%;">First</button>
          <button style="display:block; width:100%;">Second</button>
        </div>
      </instui-popover>
    </div>
  `
}
