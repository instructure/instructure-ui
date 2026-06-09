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
import './ThemeProvider'

type Args = {
  defaultThemeName:
    | 'defaultTheme'
    | 'contrastTheme'
    | 'darkTheme'
    | 'lightTheme'
  userTheme: string
  enableContrast: boolean
  enableDark: boolean
}

const meta: Meta<Args> = {
  title: 'ui-web-core/ThemeProvider',
  component: 'instui-theme-provider',
  argTypes: {
    defaultThemeName: {
      control: { type: 'select' },
      options: ['defaultTheme', 'contrastTheme', 'darkTheme', 'lightTheme']
    },
    userTheme: { control: 'text' },
    enableContrast: { control: 'boolean' },
    enableDark: { control: 'boolean' }
  },
  args: {
    defaultThemeName: 'defaultTheme',
    userTheme: '',
    enableContrast: false,
    enableDark: false
  }
}

export default meta

type Story = StoryObj<Args>

// The decorator in preview.ts wraps every story in a provider, so this story
// renders a second nested provider configured via the controls. CSS variables
// from the nearest provider that mounted last win — that's the one tied to
// the controls panel.
export const TokenInspector: Story = {
  render: (args) => html`
    <instui-theme-provider
      default-theme-name=${args.defaultThemeName}
      user-theme=${args.userTheme}
      .customContrastTheme=${{ isEnabled: args.enableContrast }}
      .customDarkTheme=${{ isEnabled: args.enableDark }}
    >
      <section
        style="
          font-family: var(--sharedTokens-typography-fontFamily, system-ui);
          color: var(--semantics-semantic-color-text-primary, #273540);
          background: var(--semantics-semantic-color-background-page, #fff);
          padding: 1.5rem;
        "
      >
        <h2 style="margin-top: 0;">InstUI tokens as CSS variables</h2>
        <p>
          Resize the window or change system preferences to see contrast / dark
          auto-switching when the corresponding override is enabled below.
        </p>

        <h3>Surfaces</h3>
        <div
          style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 0.75rem;
          "
        >
          <div
            style="padding: 1rem; background: var(--semantics-semantic-color-background-page); border: 1px solid var(--semantics-semantic-color-divider-base, currentColor);"
          >
            background-page
          </div>
          <div
            style="padding: 1rem; background: var(--semantics-semantic-color-background-container); border: 1px solid var(--semantics-semantic-color-divider-base, currentColor);"
          >
            background-container
          </div>
          <div
            style="padding: 1rem; background: var(--semantics-semantic-color-background-muted); border: 1px solid var(--semantics-semantic-color-divider-base, currentColor);"
          >
            background-muted
          </div>
          <div
            style="padding: 1rem; background: var(--semantics-semantic-color-background-brand); color: var(--semantics-semantic-color-background-onColor, white);"
          >
            background-brand
          </div>
        </div>

        <h3 style="margin-top: 1.5rem;">Text colors</h3>
        <ul style="list-style: none; padding: 0; display: grid; gap: 0.25rem;">
          <li style="color: var(--semantics-semantic-color-text-primary);">
            text-primary
          </li>
          <li style="color: var(--semantics-semantic-color-text-secondary);">
            text-secondary
          </li>
          <li style="color: var(--semantics-semantic-color-text-brand);">
            text-brand
          </li>
          <li style="color: var(--semantics-semantic-color-text-error);">
            text-error
          </li>
          <li style="color: var(--semantics-semantic-color-text-success);">
            text-success
          </li>
        </ul>

        <h3 style="margin-top: 1.5rem;">Primitives sample</h3>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          ${[
            'primitives-color-blue-blue40',
            'primitives-color-blue-blue80',
            'primitives-color-blue-blue120',
            'primitives-color-grey-grey20',
            'primitives-color-grey-grey80',
            'primitives-color-grey-grey160'
          ].map(
            (name) => html`
              <div
                style="
                  width: 5rem;
                  height: 3rem;
                  border-radius: var(--sharedTokens-borderRadius-md, 0.25rem);
                  background: var(--${name});
                  display: grid;
                  place-items: center;
                  font-size: 0.65rem;
                  color: white;
                  text-shadow: 0 0 2px black;
                "
              >
                ${name.split('-').slice(-1)[0]}
              </div>
            `
          )}
        </div>
      </section>
    </instui-theme-provider>
  `
}
