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
import '../support/component'
import 'cypress-real-events'

import { TextArea } from '../../packages/ui'

it('should resize if autoGrow is true', () => {
  cy.mount(
    <TextArea label="Name" autoGrow={true} width="500px" onChange={cy.stub()} />
  )

  cy.get('textarea').then((input) => {
    const initialHeight = parseInt(getComputedStyle(input[0]).height, 10)

    cy.get('textarea')
      .invoke(
        'val',
        'Chartreuse celiac thundercats, distillery snackwave glossier pork belly tacos venmo fanny pack paleo portland. Migas 3 wolf moon typewriter, meditation pitchfork meh narwhal copper mug gluten-free vegan next level. Succulents keytar cronut, fanny pack kitsch hammock sustainable skateboard gochujang poutine la croix ennui cred quinoa. Fap copper mug pitchfork small batch hell of vice. Kickstarter small batch hexagon, scenester bushwick tacos cliche. Pickled flannel PBR&B, chartreuse next level vinyl echo park chambray pitchfork selfies actually tattooed blue bottle 3 wolf moon. Raw denim enamel pin tumeric retro fam scenester.'
      )
      .trigger('input')

    cy.get('textarea').then((input) => {
      const resizedHeight = parseInt(getComputedStyle(input[0]).height, 10)
      expect(resizedHeight).to.be.above(initialHeight)
    })

    cy.get('[class$="-textArea__layout"]').then((layout) => {
      const layoutMinHeight = parseInt(
        getComputedStyle(layout[0]).getPropertyValue('min-height'),
        10
      )
      cy.get('textarea').then((input) => {
        const resizedHeight = parseInt(getComputedStyle(input[0]).height, 10)
        expect(resizedHeight).to.equal(layoutMinHeight)
      })
    })
  })
})

it('should set a maxHeight', () => {
  cy.mount(
    <TextArea
      label="Name"
      autoGrow={true}
      maxHeight="160px"
      onChange={cy.stub()}
      value={`Chartreuse celiac thundercats, distillery snackwave glossier
        pork belly tacos venmo fanny pack paleo portland. Migas 3 wolf moon typewriter,
        meditation pitchfork meh narwhal copper mug gluten-free vegan next level.
        Succulents keytar cronut, fanny pack kitsch hammock sustainable skateboard
        gochujang poutine la croix ennui cred quinoa. Fap copper mug pitchfork small
        batch hell of vice. Kickstarter small batch hexagon, scenester bushwick tacos
        cliche. Pickled flannel PBR&B, chartreuse next level vinyl echo park chambray
        pitchfork selfies actually tattooed blue bottle 3 wolf moon. Raw denim enamel
        pin tumeric retro fam scenester. Succulents keytar cronut, fanny pack kitsch
        hammock sustainable skateboard gochujang poutine la croix ennui cred quinoa.
        Fap copper mug pitchfork small batch hell of vice. Kickstarter small batch
        hexagon, scenester bushwick tacos`}
    />
  )
  const input = cy.get('textarea')

  input.should('have.css', 'max-height', '160px')

  // ensure maxHeight is being applied to input container and not exceeded by minHeight style
  cy.get('[class$=-textArea__layout]').then((layout) => {
    const layoutMaxHeight = parseInt(layout.css('max-height'), 10)
    const layoutMinHeight = parseInt(layout.css('min-height'), 10)

    expect(layoutMaxHeight).to.equal(160)
    expect(layoutMaxHeight).to.be.above(layoutMinHeight)
  })
})
