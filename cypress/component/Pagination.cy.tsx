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
import { Pagination, ScreenReaderContent } from '../../packages/ui'

import '../support/component'
import 'cypress-real-events'

describe('<Pagination/>', () => {
  it('should render no additional space when label text is hidden', async () => {
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

    cy.get('nav[role="navigation"]').then(($pagination) => {
      const heightWithNoLabel = window.getComputedStyle($pagination[0]).height

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
          label={<ScreenReaderContent>I am a hidden label</ScreenReaderContent>}
        />
      )

      cy.get('nav[role="navigation"]').then(($paginationWithLabel) => {
        const heightWithHiddenLabel = window.getComputedStyle(
          $paginationWithLabel[0]
        ).height
        expect(heightWithNoLabel).to.equal(heightWithHiddenLabel)
        cy.wrap($paginationWithLabel).should('contain', 'I am a hidden label')
      })
    })
  })
})
