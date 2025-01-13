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
import React from 'react'
import { Tray } from '@instructure/ui'

import '../support/component'
import 'cypress-real-events'

describe('<Tray />', () => {
  it('should apply theme overrides when open', async () => {
    cy.mount(
      <Tray
        label="Tray Example"
        open
        size="small"
        placement="start"
        themeOverride={{ smallWidth: '10em' }}
      >
        <div>Hello</div>
      </Tray>
    )

    cy.get('[aria-label="Tray Example"]')
      .should('have.attr', 'role', 'dialog')
      .and('have.css', 'width', '160px')
  })

  it('should call onDismiss prop when Esc key pressed', async () => {
    const onDismiss = cy.stub()
    cy.mount(
      <Tray
        open
        label="Tray Example"
        shouldCloseOnDocumentClick
        onDismiss={onDismiss}
      >
        Hello Tray
        <input type="text" />
        <input type="text" id="my-input" />
      </Tray>
    )

    cy.get('[aria-label="Tray Example"]').as('tray')

    cy.get('@tray').realPress('Escape')
    cy.wrap(onDismiss).should('have.been.called')
  })
})
