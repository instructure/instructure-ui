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

const meta: Meta = {
  title: 'Welcome',
  render: () => html`
    <section
      style="
        padding: var(--sharedTokens-spacing-large, 2rem);
        max-width: 64rem;
        font-family: var(--sharedTokens-typography-fontFamily, system-ui);
        color: var(--semantics-color-text-primary, #273540);
      "
    >
      <h1 style="margin-top: 0;">@instructure/ui-web-core</h1>
      <p>
        InstUI primitives delivered as Lit-based Web Components, plus the SSR
        and theming utilities needed to run them in the Parchment stack.
      </p>
      <p>
        This Storybook is a placeholder &mdash; real component stories will land
        alongside the first primitives. The
        <strong>ThemeProvider</strong> story already demonstrates how InstUI
        design tokens are exposed as CSS custom properties for consumption from
        any framework.
      </p>
      <ul>
        <li>
          <strong>Source:</strong>
          <code>packages/ui-web-core</code>
        </li>
        <li>
          <strong>Local dev:</strong>
          <code>pnpm --filter @instructure/ui-web-core storybook</code>
        </li>
        <li>
          <strong>Hosted:</strong>
          <a href="https://instructure.design/parchment">
            instructure.design/parchment
          </a>
        </li>
      </ul>
    </section>
  `
}

export default meta

export const Welcome: StoryObj = {}
