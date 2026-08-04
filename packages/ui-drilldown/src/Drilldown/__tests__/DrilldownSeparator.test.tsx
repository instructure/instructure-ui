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

import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import { describe, it, expect } from 'vitest'

import { Drilldown } from '@instructure/ui-drilldown/latest'

describe('<Drilldown.Separator />', () => {
  it('should render', async () => {
    await render(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0">
          <Drilldown.Separator id="sep1" data-testid="separator1" />
        </Drilldown.Page>
      </Drilldown>
    )
    const separator = page.getByTestId('separator1').element()

    expect(separator).toBeVisible()
    expect(separator.getAttribute('class')).toContain('-separator')
  })

  it('should not render children', async () => {
    await render(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0">
          <Drilldown.Separator id="sep1" data-testid="separator1">
            Children
          </Drilldown.Separator>
        </Drilldown.Page>
      </Drilldown>
    )
    const separatorChild = page.getByText('Children').query()

    expect(separatorChild).not.toBeInTheDocument()
  })

  describe('Component tests', () => {
    it('themeOverride prop should pass overrides to Option.Separator', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Separator
              id="separator1"
              themeOverride={{ height: '16px', background: 'rgb(0, 128, 0)' }}
            />
          </Drilldown.Page>
        </Drilldown>
      )
      const separator = document.querySelector<HTMLElement>('#separator1')!
      const style = getComputedStyle(separator)

      expect(style.height).toBe('16px')
      expect(style.backgroundColor).toBe('rgb(0, 128, 0)')
    })
  })
})
