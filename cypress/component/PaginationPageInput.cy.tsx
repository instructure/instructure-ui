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
import { Pagination } from '../../packages/ui'

import '../support/component'
import 'cypress-real-events'

describe('<PaginationPageInput />', () => {
  it('should update the number in the input on typing a number', async () => {
    cy.mount(
      <Pagination
        as="nav"
        margin="small"
        variant="input"
        labelNext="Next Page"
        labelPrev="Previous Page"
        currentPage={4}
        totalPageNumber={10}
        onPageChange={cy.spy()}
      />
    )

    cy.get('input').should('have.value', '4')

    cy.get('input').clear().type('6')
    cy.get('input').should('have.value', '6')
  })

  it('should not update the input on typing a letter', async () => {
    cy.mount(
      <Pagination
        as="nav"
        margin="small"
        variant="input"
        labelNext="Next Page"
        labelPrev="Previous Page"
        currentPage={4}
        totalPageNumber={10}
        onPageChange={cy.spy()}
      />
    )
    cy.get('input').should('have.value', '4')

    cy.get('input').clear().type('a')
    cy.get('input').should('have.value', '')
  })

  it("shouldn't call onChange on input typing ", async () => {
    const onChange = cy.spy()

    cy.mount(
      <Pagination
        as="nav"
        margin="small"
        variant="input"
        labelNext="Next Page"
        labelPrev="Previous Page"
        currentPage={4}
        totalPageNumber={10}
        onPageChange={onChange}
      />
    )

    cy.get('input').clear().type('6')
    cy.wrap(onChange).should('not.have.been.called')
  })

  it('should keep the number in the input, on input and Enter ', async () => {
    cy.mount(
      <Pagination
        as="nav"
        margin="small"
        variant="input"
        labelNext="Next Page"
        labelPrev="Previous Page"
        currentPage={4}
        totalPageNumber={10}
        onPageChange={cy.spy()}
      />
    )

    cy.get('input').clear().type('6{enter}')
    cy.get('input').should('have.value', '6')
  })

  it('should call onChange on successful update, on input and Enter', async () => {
    const onChange = cy.spy()

    cy.mount(
      <Pagination
        as="nav"
        margin="small"
        variant="input"
        labelNext="Next Page"
        labelPrev="Previous Page"
        currentPage={4}
        totalPageNumber={10}
        onPageChange={onChange}
      />
    )

    cy.get('input').should('have.value', '4')

    cy.get('input').clear().type('6{enter}')
    cy.wrap(onChange).should('have.been.calledWithMatch', 6)
  })

  it('should set MAX value on too big number, on input and Enter', async () => {
    const onChange = cy.spy()

    cy.mount(
      <Pagination
        as="nav"
        margin="small"
        variant="input"
        labelNext="Next Page"
        labelPrev="Previous Page"
        currentPage={4}
        totalPageNumber={10}
        onPageChange={onChange}
      />
    )

    cy.get('input').clear().type('200{enter}')
    cy.get('input').should('have.value', '10')
    cy.wrap(onChange).should('have.been.calledWithMatch', 10)
  })

  it('should set MIN value on too small number, on input and Enter', async () => {
    const onChange = cy.spy()

    cy.mount(
      <Pagination
        as="nav"
        margin="small"
        variant="input"
        labelNext="Next Page"
        labelPrev="Previous Page"
        currentPage={4}
        totalPageNumber={10}
        onPageChange={onChange}
      />
    )

    cy.get('input').clear().type('0{enter}')
    cy.get('input').should('have.value', '1')
    cy.wrap(onChange).should('have.been.calledWithMatch', 1)
  })

  it('should reset current value and not call onChange on empty string, on input and Enter', async () => {
    const onChange = cy.spy()

    cy.mount(
      <Pagination
        as="nav"
        margin="small"
        variant="input"
        labelNext="Next Page"
        labelPrev="Previous Page"
        currentPage={4}
        totalPageNumber={10}
        onPageChange={onChange}
      />
    )

    cy.get('input').clear().type('{enter}')
    cy.get('input').should('have.value', '4')
    cy.wrap(onChange).should('not.have.been.called')
  })

  it('should increment value and call onChange on up arrow', async () => {
    const onChange = cy.spy()

    cy.mount(
      <Pagination
        as="nav"
        margin="small"
        variant="input"
        labelNext="Next Page"
        labelPrev="Previous Page"
        currentPage={4}
        totalPageNumber={10}
        onPageChange={onChange}
      />
    )

    cy.get('input').should('have.value', '4')
    cy.get('input').type('{uparrow}')
    cy.get('input').should('have.value', '5')
    cy.wrap(onChange).should('have.been.calledWithMatch', 5)
  })

  it('should decrement value and call onChange on down arrow', async () => {
    const onChange = cy.spy()

    cy.mount(
      <Pagination
        as="nav"
        margin="small"
        variant="input"
        labelNext="Next Page"
        labelPrev="Previous Page"
        currentPage={4}
        totalPageNumber={10}
        onPageChange={onChange}
      />
    )

    cy.get('input').should('have.value', '4')
    cy.get('input').type('{downarrow}')
    cy.get('input').should('have.value', '3')
    cy.wrap(onChange).should('have.been.calledWithMatch', 3)
  })
})
