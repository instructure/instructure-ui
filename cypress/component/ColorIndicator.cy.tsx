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
import { ColorIndicator } from '../../packages/ui'

import '../support/component'
import 'cypress-real-events'

import { colorToRGB, colorToHex8 } from '../../packages/ui-color-utils'

const colorTestCases = {
  '3 digit hex': '#069',
  '6 digit hex': '#01659a',
  rgb: 'rgb(100, 0, 200)',
  rgba: 'rgba(100, 0, 200, .5)',
  named: 'white',
  hsl: 'hsl(30, 100%, 50%)',
  hsla: 'hsla(30, 100%, 50%, .35)'
}

describe('<ColorIndicator/>', () => {
  it('should display empty by default', async () => {
    cy.mount(<ColorIndicator />)

    cy.get('div[class$="-colorIndicator"]')
      .should('exist')
      .and('have.css', 'box-shadow', 'none')
  })

  Object.entries(colorTestCases).forEach(([testCase, testColor]) => {
    it(`should display ${testCase} color`, async () => {
      const expectedColor = colorToRGB(testColor)

      cy.mount(<ColorIndicator color={testColor} />)

      cy.get('div[class$="-colorIndicator"]')
        .should('exist')
        .invoke('css', 'box-shadow')
        .then((boxShadow) => {
          const colorValue = boxShadow.toString().split(')')[0] + ')'

          expect(colorToRGB(colorValue)).to.deep.equal(expectedColor)
        })
    })
  })

  // needs to be checked separately, the alpha is rounded different
  it('should display 8 digit hexa color', async () => {
    const testColor = '#06AD8580'
    const expectedColor = colorToHex8(testColor)

    cy.mount(<ColorIndicator color={testColor} />)

    cy.get('div[class$="-colorIndicator"]')
      .should('exist')
      .invoke('css', 'box-shadow')
      .then((boxShadow) => {
        const colorValue = boxShadow.toString().split(')')[0] + ')'

        expect(colorToHex8(colorValue)).to.deep.equal(expectedColor)
      })
  })

  it('should display circle by default', async () => {
    cy.mount(<ColorIndicator />)

    cy.get('div[class$="-colorIndicator"]')
      .should('exist')
      .invoke('css', ['border-radius', 'width', 'height'])
      .then((styles) => {
        const { 'border-radius': borderRadius, width, height } = styles

        expect(width).to.equal(height)
        expect(borderRadius).to.equal(width)
      })
  })

  it('should display rectangle version', async () => {
    cy.mount(<ColorIndicator shape="rectangle" />)

    cy.get('div[class$="-colorIndicator"]')
      .should('exist')
      .invoke('css', ['border-radius', 'width', 'height'])
      .then((styles) => {
        const { 'border-radius': borderRadius, width, height } = styles

        expect(width).to.equal(height)
        expect(borderRadius).to.equal('6px')
      })
  })
})
