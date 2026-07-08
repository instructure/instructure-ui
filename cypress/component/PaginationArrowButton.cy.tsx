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

import { Pagination } from '@instructure/ui/latest'

import '../support/component'
import 'cypress-real-events'

describe('<PaginationArrowButton />', () => {
  it('should display tooltips', () => {
    cy.mount(
      <Pagination
        as="nav"
        margin="small"
        variant="compact"
        labelNext="Next"
        labelPrev="Prev"
        currentPage={3}
        totalPageNumber={10}
        onPageChange={cy.spy()}
      />
    )
    cy.contains('[role="tooltip"]', 'Next').should('not.be.visible')

    cy.contains('button', 'Next').should('be.visible').realHover()

    cy.contains('[role="tooltip"]', 'Next').should('be.visible')
  })
})
