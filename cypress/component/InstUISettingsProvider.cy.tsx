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

import canvas from '@instructure/ui-themes/src/index'
import { InstUISettingsProvider } from '@instructure/emotion/src/index'
import '../support/component'
import 'cypress-real-events'

describe('<InstUISettingsProvider />', () => {
  it('can handle nested text direction setting changes', () => {
    cy.mount(
      <InstUISettingsProvider theme={canvas} dir="rtl">
        <InstUISettingsProvider>
          <div data-testid="textDirAwareElement">hello world</div>
        </InstUISettingsProvider>
      </InstUISettingsProvider>
    )

    cy.get('[data-testid="textDirAwareElement"]').then(($el) => {
      const direction = getComputedStyle($el[0]).direction
      expect(direction).to.equal('rtl')
    })

    // Set prop: dir
    cy.mount(
      <InstUISettingsProvider theme={canvas} dir="ltr">
        <InstUISettingsProvider>
          <div data-testid="textDirAwareElement">hello world</div>
        </InstUISettingsProvider>
      </InstUISettingsProvider>
    )

    cy.get('[data-testid="textDirAwareElement"]').then(($el) => {
      const direction = getComputedStyle($el[0]).direction
      expect(direction).to.equal('ltr')
    })
  })
})
