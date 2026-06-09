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

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import type { StorybookConfig } from '@storybook/web-components-vite'

const getAbsolutePath = (value: string) =>
  dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))

// Source-only aliases (shared with the library build in ../vite.config.ts via
// ../aliases.mjs) for cherry-picking React-free modules out of sibling InstUI
// packages. Aliases remap paths only; import surgically (e.g.
// `@alerts/Alert/v2/styles`) and avoid `.tsx` entries that pull in React.
import { aliases } from '../aliases.mjs'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs')
  ],
  framework: getAbsolutePath('@storybook/web-components-vite'),
  viteFinal: async (viteConfig) => ({
    ...viteConfig,
    resolve: {
      ...viteConfig.resolve,
      alias: {
        ...(viteConfig.resolve?.alias as Record<string, string> | undefined),
        ...aliases
      }
    }
  })
}

export default config
