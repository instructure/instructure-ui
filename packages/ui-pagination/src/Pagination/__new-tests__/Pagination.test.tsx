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

import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Pagination } from '../index'

describe('<Pagination />', () => {
  describe('with minimal config', () => {
    it('should render the correct pages - 1', () => {
      const { container } = render(
        <Pagination
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          totalPageNumber={9}
        />
      )
      expect(container.firstChild).toHaveTextContent('12...9Next Page')
    })
    it('should render the correct pages - 2', () => {
      const { container } = render(
        <Pagination
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          totalPageNumber={9}
          currentPage={5}
        />
      )
      expect(container.firstChild).toHaveTextContent(
        'Previous Page1...456...9Next Page'
      )
    })
    it('should render the correct pages - 3', () => {
      const { container } = render(
        <Pagination
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          totalPageNumber={9}
          currentPage={5}
          siblingCount={1}
          boundaryCount={3}
        />
      )
      expect(container.firstChild).toHaveTextContent(
        'Previous Page123456789Next Page'
      )
    })
    it('should render the correct pages - 4', () => {
      const { container } = render(
        <Pagination
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          totalPageNumber={9}
          currentPage={5}
          siblingCount={1}
          boundaryCount={2}
        />
      )
      expect(container.firstChild).toHaveTextContent(
        'Previous Page12...456...89Next Page'
      )
    })
    it('should render the correct pages - 5', () => {
      const { container } = render(
        <Pagination
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          totalPageNumber={9}
          currentPage={5}
          siblingCount={100}
        />
      )
      expect(container.firstChild).toHaveTextContent(
        'Previous Page123456789Next Page'
      )
    })
    it('should render the correct pages - 6', () => {
      const { container } = render(
        <Pagination
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          totalPageNumber={9}
          currentPage={5}
          boundaryCount={100}
        />
      )
      expect(container.firstChild).toHaveTextContent(
        'Previous Page123456789Next Page'
      )
    })
    it('should render the correct pages - 7', () => {
      const { container } = render(
        <Pagination
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          totalPageNumber={9}
          currentPage={1}
          boundaryCount={3}
          siblingCount={1}
        />
      )
      expect(container.firstChild).toHaveTextContent('123...789Next Page')
    })
    it('should render the correct ellipsis', () => {
      const { container } = render(
        <Pagination
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          totalPageNumber={9}
          currentPage={1}
          boundaryCount={3}
          siblingCount={1}
          ellipsis="<->"
        />
      )
      expect(container.firstChild).toHaveTextContent('123<->789Next Page')
    })
    it('should render custom buttons', () => {
      const pageMap = ['A-G', 'H-J', 'K-M', 'N-Q', 'R-Z']
      const { container } = render(
        <Pagination
          variant="full"
          labelNext="Next Page"
          labelPrev="Previous Page"
          totalPageNumber={5}
          currentPage={1}
          renderPageIndicator={(page) => pageMap[page - 1]}
        />
      )
      expect(container.firstChild).toHaveTextContent('A-GH-JK-MN-QR-Z')
    })
    it('should render huge "totalPageNumber"s properly', () => {
      const { container } = render(
        <Pagination
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          totalPageNumber={1000000000000000}
          currentPage={5678}
        />
      )
      expect(container.firstChild).toHaveTextContent(
        'Previous Page1...567756785679...1000000000000000Next Page'
      )
    })
    it('should render first and last buttons', () => {
      const { container } = render(
        <Pagination
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          labelFirst="First Page"
          labelLast="Last Page"
          totalPageNumber={100}
          currentPage={5}
          withFirstAndLastButton
        />
      )
      expect(container.firstChild).toHaveTextContent(
        'First PagePrevious Page1...456...100Next PageLast Page'
      )
    })
    it('should render every page if boundary and sibling counts are big enough', () => {
      const { container } = render(
        <Pagination
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          totalPageNumber={10}
          currentPage={1}
          siblingCount={5}
          boundaryCount={4}
        />
      )
      expect(container.firstChild).toHaveTextContent('12345678910Next Page')
    })
  })
})
