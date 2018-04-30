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
import View from '@instructure/ui-layout/lib/components/View'
import IconLeft from '@instructure/ui-icons/lib/Solid/IconArrowOpenLeft'
import IconRight from '@instructure/ui-icons/lib/Solid/IconArrowOpenRight'
import Pagination from '../index'
import PaginationButton from '../PaginationButton'

describe('<Pagination />', () => {
  const buildPages = function (count = 4, current = 0) {
    return Array.from(Array(count)).map((v, i) => {
      return (
        <PaginationButton key={i} current={i === current}>
          #{i}
        </PaginationButton>
      )
    })
  }

  context('full', () => {
    const testbed = new Testbed(
      (
        <Pagination>
          {buildPages(5)}
        </Pagination>
      )
    )

    it('should render all pages', () => {
      const subject = testbed.render()
      expect(subject.find(PaginationButton).length).to.eq(5)
      expect(subject.text().trim()).to.eq('#0#1#2#3#4')
    })

    it('should not render arrows', () => {
      const subject = testbed.render()
      expect(subject.find(IconLeft)).to.have.length(0)
      expect(subject.find(IconRight)).to.have.length(0)
    })
  })

  context('compact', () => {
    const compactTestbed = new Testbed(
      (
        <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
          {buildPages()}
        </Pagination>
      )
    )

    it('should render pages', () => {
      const subject = compactTestbed.render()
      expect(subject.find(PaginationButton).length).to.eq(4)
      expect(subject.text().trim()).to.eq('#0#1#2#3')
    })

    it('should render a single page', () => {
      const subject = compactTestbed.render({
        children: <PaginationButton key="0">#000</PaginationButton>
      })
      expect(subject.find(PaginationButton).length).to.eq(0)
      expect(subject.find(IconLeft)).to.have.length(0)
      expect(subject.find(IconRight)).to.have.length(0)
    })

    it('should render no pages', () => {
      const subject = compactTestbed.render({ children: [] })
      expect(subject.find(PaginationButton).length).to.eq(0)
      expect(subject.find(IconLeft)).to.have.length(0)
      expect(subject.find(IconRight)).to.have.length(0)
    })

    it('should truncate pages to context', () => {
      const subject = compactTestbed.render({ children: buildPages(9, 3) })
      expect(subject.find(PaginationButton).length).to.eq(7)
      expect(subject.text().trim()).to.eq('#0...#2#3#4#5#6...#8')
    })

    it('should truncate start', () => {
      const subject = compactTestbed.render({ children: buildPages(6, 5) })
      expect(subject.find(PaginationButton).length).to.eq(3)
      expect(subject.text().trim()).to.eq('#0...#4#5')
    })

    it('should truncate end', () => {
      const subject = compactTestbed.render({ children: buildPages(6) })
      expect(subject.find(PaginationButton).length).to.eq(5)
      expect(subject.text().trim()).to.eq('#0#1#2#3...#5')
    })

    it('should omit ellipses when bounds included in context', () => {
      const subject = compactTestbed.render({ children: buildPages(7, 2) })
      expect(subject.find(PaginationButton).length).to.eq(7)
      expect(subject.text().trim()).to.eq('#0#1#2#3#4#5#6')
    })

    describe('arrows', () => {
      it('should render only when applicable', () => {
        const subject = compactTestbed.render()
        expect(subject.find(IconLeft)).to.have.length(0)
        expect(subject.find(IconRight)).to.have.length(1)

        subject.setProps({ children: buildPages(4, 3) })
        expect(subject.find(IconLeft)).to.have.length(1)
        expect(subject.find(IconRight)).to.have.length(0)
      })

      it('should navigate to adjacent pages', () => {
        const onNextClick = compactTestbed.sandbox.stub()
        const subject = compactTestbed.render({
          children: [
            <PaginationButton key="cur" current>
              Current
            </PaginationButton>,
            <PaginationButton key="next" onClick={onNextClick}>
              Next
            </PaginationButton>
          ]
        })
        subject.find(IconRight).simulate('click')
        expect(onNextClick).to.have.been.called
      })
    })

    describe('when passing down props to View', () => {
      const allowedProps = {
        margin: 'small',
        elementRef: () => {},
        as: 'section',
        display: View.defaultProps.display
      }

      Object.keys(View.propTypes)
        .filter(prop => prop !== 'theme' && prop !== 'children')
        .forEach((prop) => {
          if (Object.keys(allowedProps).indexOf(prop) < 0) {
            it(`should NOT allow the '${prop}' prop`, () => {
              const subject = compactTestbed.render({
                [prop]: 'foo'
              })
              expect(subject.find(View).first().props()[prop]).to.not.exist
            })
          } else {
            it(`should allow the '${prop}' prop`, () => {
              const subject = compactTestbed.render({
                [prop]: allowedProps[prop]
              })
              expect(subject.find(View).first().props()[prop]).to.equal(allowedProps[prop])
            })
          }
      })
    })

    // Testing compact only, since it is a superset of components in full
    it('should meet a11y standards', done => {
      const subject = compactTestbed.render()

      subject.should.be.accessible(done, {
        ignores: [
          'color-contrast' // brand color doesn't meet 4.5:1 contrast req
        ]
      })
    })
  })
})
