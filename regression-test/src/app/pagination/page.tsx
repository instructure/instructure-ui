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

'use client'
import React, { useMemo, useState } from 'react'
import { Pagination as pg } from 'instructure-ui/ui-pagination/es/index'
import { View as vw } from 'instructure-ui/ui-view/es/index'

const Pagination = pg as any
const View = vw as any

export default function PaginationPage() {
  // New API states
  const [currentNewSmall, setCurrentNewSmall] = useState(1)
  const [currentNewLarge, setCurrentNewLarge] = useState(1)
  const [currentFull, setCurrentFull] = useState(1)
  const [currentInput, setCurrentInput] = useState(1)

  // Legacy API states
  const [legacyCompactPage, setLegacyCompactPage] = useState(0)
  const [legacyInputPage, setLegacyInputPage] = useState(0)

  const pageMap = useMemo(() => ['A-G', 'H-J', 'K-M', 'N-Q', 'R-Z'], [])

  const renderLegacyPages = (
    count: number,
    current: number,
    setter: (p: number) => void
  ) =>
    Array.from(Array(count)).map((_, i) => (
      <Pagination.Page
        key={i}
        onClick={() => setter(i)}
        current={i === current}
      >
        {i + 1}
      </Pagination.Page>
    ))

  return (
    <main className="flex gap-12 p-8 flex-col items-start axe-test">
      {/* New API: compact variant with 9 pages */}
      <section>
        <Pagination
          as="nav"
          margin="small"
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          currentPage={currentNewSmall}
          totalPageNumber={9}
          onPageChange={(nextPage: number) => setCurrentNewSmall(nextPage)}
        />
      </section>

      {/* New API: compact variant with very large totalPageNumber, sibling/boundary and SR labels */}
      <section>
        <Pagination
          as="nav"
          margin="small"
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          currentPage={currentNewLarge}
          totalPageNumber={100000}
          onPageChange={(nextPage: number) => setCurrentNewLarge(nextPage)}
          siblingCount={3}
          boundaryCount={2}
          screenReaderLabelPageButton={(
            currentPage: number,
            totalPageNumber: number
          ) => `Page ${currentPage} of ${totalPageNumber}`}
        />
      </section>

      {/* New API: full variant with custom page indicator */}
      <section>
        <Pagination
          as="nav"
          margin="small"
          variant="full"
          labelNext="Next Page"
          labelPrev="Previous Page"
          currentPage={currentFull}
          totalPageNumber={5}
          onPageChange={(nextPage: number) => setCurrentFull(nextPage)}
          siblingCount={5}
          boundaryCount={0}
          renderPageIndicator={(page: number) => pageMap[page - 1]}
        />
      </section>

      {/* New API: input variant */}
      <section>
        <Pagination
          as="nav"
          margin="small"
          variant="input"
          labelNext="Next Page"
          labelPrev="Previous Page"
          currentPage={currentInput}
          totalPageNumber={9}
          onPageChange={(nextPage: number) => setCurrentInput(nextPage)}
        />
      </section>
      <div>Legacy API</div>
      {/* Legacy API: compact variant with children */}
      <section>
        <View as="div" display="block" margin="small 0">
          <Pagination
            as="nav"
            margin="small"
            variant="compact"
            labelNext="Next Page"
            labelPrev="Previous Page"
          >
            {renderLegacyPages(9, legacyCompactPage, setLegacyCompactPage)}
          </Pagination>
        </View>
      </section>

      {/* Legacy API: input variant with children + first/last labels */}
      <section>
        <Pagination
          as="nav"
          margin="small"
          variant="input"
          labelFirst="First Page"
          labelPrev="Previous Page"
          labelNext="Next Page"
          labelLast="Last Page"
        >
          {renderLegacyPages(9, legacyInputPage, setLegacyInputPage)}
        </Pagination>
      </section>
    </main>
  )
}
