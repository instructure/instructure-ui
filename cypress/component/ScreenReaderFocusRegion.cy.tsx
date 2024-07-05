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
import { ScreenReaderFocusRegion } from '../../packages/ui-a11y-utils/src/ScreenReaderFocusRegion'

import '../support/component'
import 'cypress-real-events'

const element = (
  <div>
    <div data-testid="ignore">
      <iframe
        data-testid="iframe"
        title="unhidden"
        width="100%"
        height="10px"
      />
    </div>
    <iframe data-testid="iframe" title="hidden" width="100%" height="10px" />
    <div>
      <iframe data-testid="iframe" title="hidden" width="100%" height="10px" />
      <div data-testid="content">
        <span>
          <iframe
            data-testid="iframe"
            title="unhidden"
            width="100%"
            height="10px"
          />
        </span>
        <div>Hello world</div>
        <button>click me</button>
        <button>or click me</button>
        <iframe
          data-testid="iframe"
          title="unhidden"
          width="100%"
          height="10px"
        />
      </div>
      <div>
        <span>
          <iframe
            data-testid="iframe"
            title="hidden"
            width="100%"
            height="10px"
          />
          <iframe
            data-testid="iframe"
            title="hidden"
            width="100%"
            height="10px"
          />
        </span>
      </div>
      <iframe
        data-testid="iframe"
        title="always-hidden"
        width="100%"
        height="10px"
      />
    </div>
  </div>
)

describe('ScreenReaderFocusRegion', () => {
  it('should hide the body element of any iframes present on the page', async () => {
    cy.mount(element)

    const getIframeBody = (iframe) => {
      return cy
        .wrap(iframe)
        .its('0.contentDocument')
        .should('exist')
        .its('body')
        .should('not.be.undefined')
        .then(cy.wrap)
    }

    // hide one iframe initially
    cy.get('iframe[title="always-hidden"]').then(($iframe) => {
      getIframeBody($iframe).then((body: any) => {
        body[0].setAttribute('aria-hidden', 'true')
        cy.log(body[0].attributes)
      })
    })

    // verify no iframe bodies are hidden unless they were hidden initially
    cy.get('iframe[title="always-hidden"]').then(($iframe) => {
      getIframeBody($iframe).should('have.attr', 'aria-hidden', 'true')
    })

    cy.get('iframe[data-testid="iframe"]')
      .filter('[title!="always-hidden"]')
      .each(($iframe) => {
        getIframeBody($iframe).should('not.have.attr', 'aria-hidden')
      })

    // prepare and activate screenReaderFocusRegion
    cy.get('[data-testid="content"]').then(($content) => {
      cy.get('[data-testid="ignore"]').then(($ignore) => {
        const screenReaderFocusRegion = new ScreenReaderFocusRegion(
          $content[0],
          {
            liveRegion: $ignore[0],
            shouldContainFocus: true
          }
        )

        screenReaderFocusRegion.activate()

        // once activated, all iframe bodies should be hidden except for iframes that
        // are contained in the defined content element or live region
        cy.get('iframe[title="hidden"]').each(($iframeHidden) => {
          getIframeBody($iframeHidden).should(
            'have.attr',
            'aria-hidden',
            'true'
          )
        })

        cy.get('iframe[title="unhidden"]').each(($iframeUnhidden) => {
          getIframeBody($iframeUnhidden).should('not.have.attr', 'aria-hidden')
        })

        cy.get('iframe[title="always-hidden"]').then(($iframeAlwaysHidden) => {
          getIframeBody($iframeAlwaysHidden).should(
            'have.attr',
            'aria-hidden',
            'true'
          )
        })
      })
    })
  })

  it('should restore all iframe bodies after deactivate', async () => {
    cy.mount(element)

    const getIframeBody = (iframe) => {
      return cy
        .wrap(iframe)
        .its('0.contentDocument')
        .should('exist')
        .its('body')
        .should('not.be.undefined')
        .then(cy.wrap)
    }

    // hide one iframe initially
    cy.get('iframe[title="always-hidden"]').then(($iframe) => {
      getIframeBody($iframe).then((body: any) => {
        body[0].setAttribute('aria-hidden', 'true')
        cy.log(body[0].attributes)
      })
    })

    // verify no iframe bodies are hidden unless they were hidden initially
    cy.get('iframe[title="always-hidden"]').then(($iframe) => {
      getIframeBody($iframe).should('have.attr', 'aria-hidden', 'true')
    })

    cy.get('iframe[data-testid="iframe"]')
      .filter('[title!="always-hidden"]')
      .each(($iframe) => {
        getIframeBody($iframe).should('not.have.attr', 'aria-hidden')
      })

    // prepare and deactivate screenReaderFocusRegion
    cy.get('[data-testid="content"]').then(($content) => {
      cy.get('[data-testid="ignore"]').then(($ignore) => {
        const screenReaderFocusRegion = new ScreenReaderFocusRegion(
          $content[0],
          {
            liveRegion: $ignore[0],
            shouldContainFocus: true
          }
        )

        screenReaderFocusRegion.activate()
        screenReaderFocusRegion.deactivate()

        cy.get('iframe[data-testid="iframe"]')
          .filter('[title!="always-hidden"]')
          .each(($iframe1) => {
            getIframeBody($iframe1).should('not.have.attr', 'aria-hidden')
          })

        cy.get('iframe[title="always-hidden"]').then(($iframe2) => {
          getIframeBody($iframe2).should('have.attr', 'aria-hidden', 'true')
        })
      })
    })
  })
})
