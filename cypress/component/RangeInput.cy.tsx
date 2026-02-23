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

import { expect } from 'chai'
import { RangeInput } from '@instructure/ui/latest'

import '../support/component'
import 'cypress-real-events'

describe('<RangeInput/>', () => {
  it('should update the value displayed', async () => {
    cy.mount(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={0}
        defaultValue={50}
      />
    )
    cy.get('input[name="opacity"]').as('rangeInput')
    cy.get('[class$="-rangeInput__value"]').as('output')

    cy.get('@rangeInput').invoke('val', '30').trigger('input')

    cy.get('@output').should('have.text', '30')
  })

  it('should call the onChange prop', async () => {
    const onChange = cy.spy()

    cy.mount(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={0}
        defaultValue={50}
        onChange={onChange}
      />
    )

    cy.get('input[name="opacity"]').as('rangeInput')
    cy.get('@rangeInput').invoke('val', '30').trigger('input')

    cy.wrap(onChange)
      .should('have.been.called')
      .then((spy) => {
        expect(spy.getCall(0).args[0]).to.equal('30')
      })
  })

  it('should update the input value when the value prop is uncontrolled', async () => {
    cy.mount(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={0}
        onChange={cy.spy()}
        defaultValue={50}
      />
    )
    cy.get('input[name="opacity"]').as('rangeInput')
    cy.get('@rangeInput').should('have.value', '50')

    cy.get('@rangeInput').realClick()
    cy.get('@rangeInput').realType('{rightarrow}')

    cy.get('@rangeInput').should('have.value', '51')
  })

  it('should not update the input value when the value prop is controlled', async () => {
    cy.mount(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={0}
        onChange={cy.spy()}
        value={50}
      />
    )
    cy.get('input[name="opacity"]').as('rangeInput')
    cy.get('@rangeInput').should('have.value', '50')

    cy.get('@rangeInput').realClick()
    cy.get('@rangeInput').realType('{rightarrow}')

    cy.get('@rangeInput').should('have.value', '50')
  })

  it('should show messages', async () => {
    const message = 'Invalid'

    cy.mount(
      <RangeInput
        label="Opacity"
        name="opacity"
        max={100}
        min={0}
        messages={[{ text: message, type: 'error' }]}
      />
    )
    cy.get('[class$="-formFieldMessages"]').should('contain.text', message)
  })
})
