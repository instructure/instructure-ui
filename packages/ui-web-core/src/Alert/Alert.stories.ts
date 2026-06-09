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
import { html, nothing } from 'lit'
import './Alert'

type Args = {
  variant: 'info' | 'success' | 'warning' | 'error'
  hasShadow: boolean
  open: boolean
  transition: 'none' | 'fade'
  timeout: number
  renderCloseButtonLabel: string
  variantScreenReaderLabel: string
}

const meta: Meta<Args> = {
  title: 'ui-web-core/Alert',
  component: 'instui-alert',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error']
    },
    hasShadow: { control: 'boolean' },
    open: { control: 'boolean' },
    transition: {
      control: { type: 'select' },
      options: ['none', 'fade']
    },
    timeout: {
      control: { type: 'number', min: 0, step: 500 },
      description: 'Milliseconds before auto-dismiss. 0 disables.'
    },
    renderCloseButtonLabel: { control: 'text' },
    variantScreenReaderLabel: { control: 'text' }
  },
  args: {
    variant: 'info',
    hasShadow: true,
    open: true,
    transition: 'fade',
    timeout: 0,
    renderCloseButtonLabel: '',
    variantScreenReaderLabel: ''
  }
}

export default meta

type Story = StoryObj<Args>

// ---------------------------------------------------------------------------
// Interactive playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <instui-alert
        variant=${args.variant}
        ?has-shadow=${args.hasShadow}
        ?open=${args.open}
        transition=${args.transition}
        timeout=${args.timeout}
        render-close-button-label=${args.renderCloseButtonLabel || nothing}
        variant-screen-reader-label=${args.variantScreenReaderLabel || nothing}
      >
        This is a sample alert. Edit the controls to change its behavior.
      </instui-alert>
    </div>
  `
}

// ---------------------------------------------------------------------------
// One per variant, side-by-side
// ---------------------------------------------------------------------------

const variantBlurb: Record<Args['variant'], string> = {
  info: 'Heads up — the feature you used is in beta.',
  success: 'Your changes have been saved.',
  warning: 'Three of your fields are missing values.',
  error: 'We could not save your changes. Try again in a moment.'
}

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      ${(['info', 'success', 'warning', 'error'] as const).map(
        (variant) => html`
          <instui-alert variant=${variant}>
            ${variantBlurb[variant]}
          </instui-alert>
        `
      )}
    </div>
  `
}

// ---------------------------------------------------------------------------
// Dismissible (close button + Escape key)
// ---------------------------------------------------------------------------

export const Dismissible: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <instui-alert
      variant="warning"
      render-close-button-label="Close this alert"
    >
      Click the ✕ button or press Escape to dismiss. The
      <code>instui-alert-dismiss</code> event fires on close.
    </instui-alert>
  `
}

// ---------------------------------------------------------------------------
// Auto-dismiss after a timeout
// ---------------------------------------------------------------------------

export const AutoDismiss: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <p style="font-family: system-ui; margin: 0 0 1rem;">
      This alert dismisses itself after 4 seconds.
    </p>
    <instui-alert variant="success" timeout="4000">
      Auto-dismissing in 4 seconds…
    </instui-alert>
  `
}

// ---------------------------------------------------------------------------
// Live region (screen-reader announcement)
// ---------------------------------------------------------------------------

export const WithLiveRegion: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <p style="font-family: system-ui; margin: 0 0 1rem;">
      The hidden <code>role="alert"</code> element below receives a copy of the
      alert content so screen readers announce it on appearance.
    </p>
    <div
      id="alert-stories-live-region"
      role="alert"
      style="position: absolute; width: 1px; height: 1px; overflow: hidden;"
    ></div>
    <instui-alert
      variant="info"
      variant-screen-reader-label="Information,"
      live-region-selector="#alert-stories-live-region"
    >
      I'm announced to assistive tech the moment I appear.
    </instui-alert>
  `
}
