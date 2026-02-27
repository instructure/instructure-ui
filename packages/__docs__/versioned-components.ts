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

import * as V11_6 from '@instructure/ui/v11_6'
import * as V11_7 from '@instructure/ui/v11_7'
// eslint-disable-next-line no-restricted-imports
import { Guidelines } from './src/Guidelines'
// eslint-disable-next-line no-restricted-imports
import { Figure } from './src/Figure'
// eslint-disable-next-line no-restricted-imports
import { ToggleBlockquote } from './src/ToggleBlockquote'
// eslint-disable-next-line no-restricted-imports
import { V12ChangelogTable } from './src/V12ChangelogTable'

const docsComponents = { Guidelines, Figure, ToggleBlockquote, V12ChangelogTable }

const versions: Record<string, Record<string, any>> = {
  v11_6: { ...V11_6, ...docsComponents } as any,
  v11_7: { ...V11_7, ...docsComponents } as any,
}

/**
 * Returns the full component map for a given library version.
 * Version exports are merged with docs-specific components (Guidelines,
 * Figure, ToggleBlockquote, V12ChangelogTable). Defaults to v11_6.
 */
export function getComponentsForVersion(
  version?: string
): Record<string, any> {
  return versions[version ?? 'v11_6'] ?? versions['v11_6']
}
