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
import 'cypress-real-events'

import { Tooltip } from '../../packages/ui'
import '../support/component'

describe('<Tooltip/>', () => {
  it('should render the tip offscreen', async () => {
    cy.mount(
      <div>
        <button>For dismiss</button>
        <Tooltip renderTip="Hello">
          <a data-testid="trigger" href="example.html">
            Hover or focus me
          </a>
        </Tooltip>
      </div>
    )

    cy.contains('Hello').should('not.be.visible')
    cy.get('[data-testid="trigger"]').then(($trigger) => {
      const offscreenPopoverId = $trigger.attr('data-position-target')
      const offscreenPopover = `[data-position-content="${offscreenPopoverId}"]`

      cy.get(offscreenPopover).should('have.text', 'Hello')
      cy.get(offscreenPopover).should('have.css', 'display', 'none')
      cy.get(offscreenPopover).should('have.css', 'left', '-159984px')
    })

    cy.get('[data-testid="trigger"]').realHover().wait(100)

    cy.contains('Hello').should('be.visible')
    cy.get('[data-testid="trigger"]').then(($trigger) => {
      const popoverId = $trigger.attr('data-position-target')
      const popover = `span[data-position-content="${popoverId}"]`

      cy.get(popover).should('have.text', 'Hello')
      cy.get(popover).should('have.css', 'display', 'block')
      cy.get(popover).should('have.css', 'left', '0px')
    })
  })

  it('should show tip by default when defaultIsShowingContent is true', async () => {
    cy.mount(
      <Tooltip renderTip="Hello" defaultIsShowingContent>
        <a data-testid="trigger" href="example.html">
          Hover or focus me
        </a>
      </Tooltip>
    )

    cy.contains('Hello').should('be.visible')

    cy.get('[data-testid="trigger"]').then(($trigger) => {
      const popoverId = $trigger.attr('data-position-target')
      const popover = `span[data-position-content="${popoverId}"]`

      cy.get(popover).should('have.text', 'Hello')
      cy.get(popover).should('have.css', 'display', 'block')
      cy.get(popover).should('have.css', 'left', '0px')
    })
  })

  it('should show tip when isShowingContent is true', async () => {
    cy.mount(
      <Tooltip renderTip={<h2>Hello</h2>} isShowingContent>
        <a data-testid="trigger" href="example.html">
          Hover or focus me
        </a>
      </Tooltip>
    )

    cy.contains('Hello').should('be.visible')
    cy.get('[data-testid="trigger"]').then(($trigger) => {
      const popoverId = $trigger.attr('data-position-target')
      const popover = `span[data-position-content="${popoverId}"]`

      cy.get(popover).should('have.text', 'Hello')
      cy.get(popover).should('have.css', 'display', 'block')
      cy.get(popover).should('have.css', 'left', '0px')
    })
  })

  it('should call onShowContent and on onHideContent', async () => {
    const onShowContent = cy.spy()
    const onHideContent = cy.spy()

    cy.mount(
      <div>
        <button>For dismiss</button>
        <Tooltip
          renderTip={<h2>Hello</h2>}
          onShowContent={onShowContent}
          onHideContent={onHideContent}
        >
          <a data-testid="trigger" href="example.html">
            Hover or focus me
          </a>
        </Tooltip>
      </div>
    )

    cy.get('[data-testid="trigger"]').realHover()
    cy.contains('Hello').should('be.visible')
    cy.wrap(onShowContent).should('have.been.calledOnce')

    cy.contains('button', 'For dismiss').realHover()
    cy.contains('Hello').should('not.be.visible')
    cy.wrap(onHideContent).should('have.been.calledOnce')
  })
})
