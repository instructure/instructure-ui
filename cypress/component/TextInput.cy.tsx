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
import { TextInput } from '../../packages/ui'

import '../support/component'
import 'cypress-real-events'

describe('<TextInput/>', () => {
  const contentBeforeSVG = (
    <svg height="24" width="24">
      <title>Content before</title>
      <circle cx="50" cy="50" r="40" />
    </svg>
  )

  const contentAfterSVG = (
    <svg height="24" width="24">
      <title>Content after</title>
      <circle cx="50" cy="50" r="40" />
    </svg>
  )
  it('should prepend and append content', async () => {
    cy.mount(
      <TextInput
        renderLabel="Name"
        renderBeforeInput={() => contentBeforeSVG}
      />
    )

    cy.get('span[class$="__beforeElement"]')
      .should('exist')
      .and('have.text', 'Content before')

    cy.get('[data-cy-root]').then(() => {
      cy.mount(
        <TextInput
          renderLabel="Name"
          renderBeforeInput={() => contentBeforeSVG}
          renderAfterInput={() => contentAfterSVG}
        />
      )
    })

    cy.get('svg title').eq(0).should('have.text', 'Content before')
    cy.get('svg title').eq(1).should('have.text', 'Content after')

    cy.get('svg').should('have.length', 2)
  })

  it('should have no padding on empty before/after content', async () => {
    cy.mount(
      <TextInput
        renderLabel="Name"
        renderBeforeInput={<span id="before"></span>}
        renderAfterInput={<span id="after"></span>}
      />
    )

    cy.get('[class*="__beforeElement"]').should(
      'have.css',
      'padding-inline-start',
      '0px'
    )
    cy.get('[class*="__afterElement"]').should(
      'have.css',
      'padding-inline-end',
      '0px'
    )

    cy.get('[data-cy-root]').then(() => {
      cy.mount(
        <TextInput
          renderLabel="Name"
          renderBeforeInput={() => contentBeforeSVG}
          renderAfterInput={() => contentAfterSVG}
        />
      )
    })

    cy.get('[class*="__beforeElement"]').should(
      'have.css',
      'padding-inline-start',
      '12px'
    )
    cy.get('[class*="__afterElement"]').should(
      'have.css',
      'padding-inline-end',
      '12px'
    )
  })
})
