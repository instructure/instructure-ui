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

import '../support/component'
import 'cypress-real-events'
import { InlineSVG } from '@instructure/ui/latest'
import { expect } from 'chai'

const WIDTH = '100px'
const HEIGHT = '200px'
const SVG_SRC = `<svg><circle cx="50" cy="50" r="40" /></svg>`

describe('<InlineSVG />', () => {
  it('should set custom width and height properly', async () => {
    cy.mount(<InlineSVG src={SVG_SRC} width={WIDTH} height={HEIGHT} />)

    cy.get('svg')
      .should('have.css', 'height', HEIGHT)
      .and('have.css', 'width', WIDTH)

    cy.get('svg').then(($svg) => {
      const attributes = $svg[0].attributes
      const attributeNames = Array.from(attributes).map((attr) => attr.name)

      expect(attributeNames).to.include('width')
      expect(attributeNames).to.include('height')
    })
  })

  it('should not set width/height attributes and styles when value is auto', async () => {
    cy.mount(<InlineSVG src={SVG_SRC} width="auto" height="auto" />)

    cy.get('svg').then(($svg) => {
      const attributes = $svg[0].attributes
      const attributeNames = Array.from(attributes).map((attr) => attr.name)

      expect(attributeNames).not.to.include('width')
      expect(attributeNames).not.to.include('height')
    })
  })

  it('should display block when inline is false', async () => {
    cy.mount(<InlineSVG src={SVG_SRC} inline={false} />)

    cy.get('svg').should('have.css', 'display', 'block')
  })

  it('should change the SVG color property', async () => {
    cy.mount(<InlineSVG src={SVG_SRC} color="success" />)

    cy.get('svg').then(($successSvg) => {
      const colorSuccess = getComputedStyle($successSvg[0]).color

      // Set prop: color
      cy.mount(<InlineSVG src={SVG_SRC} color="error" />)

      cy.get('svg').then(($errorSvg) => {
        const colorError = getComputedStyle($errorSvg[0]).color

        expect(colorError).to.not.equal(colorSuccess)
      })
    })
  })

  it('should allow passing in the svg src as a string', async () => {
    cy.mount(<InlineSVG src={`<svg><circle cx="50" cy="50" r="40" /></svg>`} />)

    cy.get('svg').should('exist')
    cy.get('g').should('exist')

    cy.get('g').then(($g) => {
      const innerHTML = $g[0].innerHTML.trim()
      expect(innerHTML).to.equal('<circle cx="50" cy="50" r="40"></circle>')
    })
  })
})
