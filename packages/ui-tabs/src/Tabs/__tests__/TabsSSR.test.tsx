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

import { act } from 'react'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import { describe, it, expect, vi } from 'vitest'

import { Tabs as TabsLatest } from '@instructure/ui-tabs/latest'
import { Tabs as TabsV1 } from '@instructure/ui-tabs/v11_6'

// Deliberately no `id` on the panels: Tabs falls back to a generated id only
// when the panel doesn't supply one (`panel.props.id || generatedId`), and that
// generated id is what has to survive SSR.
const LatestExample = () => (
  <TabsLatest variant="default">
    <TabsLatest.Panel renderTitle="First Tab" isSelected>
      First panel
    </TabsLatest.Panel>
    <TabsLatest.Panel renderTitle="Second Tab">Second panel</TabsLatest.Panel>
  </TabsLatest>
)

const V1Example = () => (
  <TabsV1 variant="default">
    <TabsV1.Panel renderTitle="First Tab" isSelected>
      First panel
    </TabsV1.Panel>
    <TabsV1.Panel renderTitle="Second Tab">Second panel</TabsV1.Panel>
  </TabsV1>
)

// Both shipped versions generated their fallback panel id with `uid()`, so both
// need the SSR guard.
function describeSSR(name: string, Example: () => React.JSX.Element) {
  describe(`<Tabs /> ${name} SSR/hydration`, () => {
    it('hydrates the server markup without id mismatch warnings', async () => {
      // React reports hydration mismatches through console.error, so a mismatch
      // in the tab/panel ids surfaces here.
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const html = renderToString(<Example />)
      const container = document.createElement('div')
      container.innerHTML = html
      document.body.appendChild(container)

      await act(async () => {
        hydrateRoot(container, <Example />)
      })

      const mismatches = errorSpy.mock.calls.filter((args) =>
        /hydrat|did not match|didn't match/i.test(String(args[0]))
      )
      errorSpy.mockRestore()
      container.remove()

      expect(mismatches).toEqual([])
    })

    it('generates ids that match between the server and client render', () => {
      const ids = (markup: string) =>
        Array.from(markup.matchAll(/id="([^"]+)"/g)).map((m) => m[1])

      // Two independent renders of the same tree must agree, otherwise the
      // server HTML and the hydrated client tree reference different ids.
      expect(ids(renderToString(<Example />))).toEqual(
        ids(renderToString(<Example />))
      )
    })
  })
}

describeSSR('v2 (latest)', LatestExample)
describeSSR('v1 (v11_6)', V1Example)
