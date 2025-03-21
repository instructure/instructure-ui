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

import { NumberInput } from '@instructure/ui'

import '../support/component'
import 'cypress-real-events'

describe('<NumberInput/>', () => {
  it('focuses the input when up arrow spinbutton is clicked', async () => {
    cy.mount(<NumberInput renderLabel="Label" />)

    cy.get('input[class$="-numberInput_input"]').as('input')

    cy.get('button[class$="-numberInput_arrow').first().as('button')

    cy.get('@button').then(($btn) => {
      $btn[0].addEventListener('mousedown', (event) => {
        cy.spy(event, 'preventDefault').as('preventDefaultSpy')
      })
    })

    cy.get('@button').trigger('mousedown')

    cy.get('@preventDefaultSpy').should('have.been.calledOnce')

    cy.get('@input').should('be.focused')
  })

  it('focuses the input when down arrow spinbutton is clicked', async () => {
    cy.mount(<NumberInput renderLabel="Label" />)

    cy.get('input[class$="-numberInput_input"]').as('input')

    cy.get('button[class$="-numberInput_arrow').eq(1).as('button')

    cy.get('@button').then(($btn) => {
      $btn[0].addEventListener('mousedown', (event) => {
        cy.spy(event, 'preventDefault').as('preventDefaultSpy')
      })
    })

    cy.get('@button').trigger('mousedown')

    cy.get('@preventDefaultSpy').should('have.been.calledOnce')

    cy.get('@input').should('be.focused')
  })

  it('calls onIncrement when up arrow key is pressed', async () => {
    const onIncrement = cy.stub()
    cy.mount(<NumberInput renderLabel="Label" onIncrement={onIncrement} />)

    cy.get('input[class$="-numberInput_input"]').as('input')

    cy.get('@input').type('{uparrow}')

    cy.wrap(onIncrement).should('have.been.calledOnce')
  })

  it('calls onDecrement when down arrow key is pressed', async () => {
    const onDecrement = cy.stub()
    cy.mount(<NumberInput renderLabel="Label" onDecrement={onDecrement} />)

    cy.get('input[class$="-numberInput_input"]').as('input')

    cy.get('@input').type('{downarrow}')

    cy.wrap(onDecrement).should('have.been.calledOnce')
  })

  it('does not move caret when up arrow key is pressed', () => {
    cy.mount(<NumberInput renderLabel="Label" />)

    cy.get('input[class$="-numberInput_input"]').as('input')

    cy.get('@input').then(($input) => {
      $input[0].addEventListener('keydown', (event) => {
        cy.spy(event, 'preventDefault').as('preventDefaultSpy')
      })
    })

    cy.get('@input').focus().type('{uparrow}')

    cy.get('@preventDefaultSpy').should('have.been.calledOnce')
  })

  it('does not move caret when down arrow key is pressed', () => {
    cy.mount(<NumberInput renderLabel="Label" />)

    cy.get('input[class$="-numberInput_input"]').as('input')

    cy.get('@input').then(($input) => {
      $input[0].addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
          cy.spy(event, 'preventDefault').as('preventDefaultSpy')
        }
      })
    })

    cy.get('@input').focus().type('{downarrow}')

    cy.get('@preventDefaultSpy').should('have.been.calledOnce')
  })

  it('handles other keyDown events normally', () => {
    cy.mount(<NumberInput renderLabel="Label" />)

    cy.get('input[class$="-numberInput_input"]').as('input')

    cy.get('@input').then(($input) => {
      $input[0].addEventListener('keydown', (event) => {
        cy.spy(event, 'preventDefault').as('preventDefaultSpy')
      })
    })

    cy.get('@input').focus().type('hello')

    cy.get('@preventDefaultSpy').should('not.have.been.called')
  })
})
