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

  const testbed = new Testbed(
    (
      <Pagination>
        {buildPages(5)}
      </Pagination>
    )
  )

  context('full', () => {
    it('should render all pages', () => {
      const subject = testbed.render()
      expect(subject.find('button').length).to.eq(5)
      expect(subject.text().trim()).to.eq('#0#1#2#3#4')
    })

    it('should not render arrows', () => {
      const subject = testbed.render()
      expect(subject.find('button').findText('Prev')).to.have.length(0)
      expect(subject.find('button').findText('Next')).to.have.length(0)
    })
  })

  context('compact', () => {
    it('should render pages', () => {
      const subject = testbed.render({
        variant: 'compact',
        labelNext: 'Next',
        labelPrev: 'Prev'
      })
      expect(subject.find('button').length).to.eq(5)
      expect(subject.text().trim()).to.eq('#0#1#2#3#4')
    })

    it('should render a single page', () => {
      const subject = testbed.render({
        variant: 'compact',
        labelNext: 'Next',
        labelPrev: 'Prev',
        children: <PaginationButton key="0">#000</PaginationButton>
      })
      expect(subject.find('button')).to.have.length(1)
      expect(subject.findElementWithText('button', '#000')).to.have.length(1)
    })

    it('should render no pages', () => {
      const subject = testbed.render({
        variant: 'compact',
        labelNext: 'Next',
        labelPrev: 'Prev',
        children: []
      })
      expect(subject.find('button').length).to.eq(0)
    })

    it('should truncate pages to context', () => {
      const subject = testbed.render({
        children: buildPages(9, 3),
        variant: 'compact',
        labelNext: 'Next',
        labelPrev: 'Prev'
      })
      expect(subject.find('button').length).to.eq(9)
      expect(subject.text().trim()).to.eq('Prev#0...#2#3#4#5#6...#8Next')
    })

    it('should truncate start', () => {
      const subject = testbed.render({
        children: buildPages(6, 5),
        variant: 'compact',
        labelNext: 'Next',
        labelPrev: 'Prev'
      })
      expect(subject.find('button').length).to.eq(4)
      expect(subject.text().trim()).to.eq('Prev#0...#4#5')
    })

    it('should truncate end', () => {
      const subject = testbed.render({
        children: buildPages(6),
        variant: 'compact',
        labelNext: 'Next',
        labelPrev: 'Prev'
      })
      expect(subject.find(PaginationButton).length).to.eq(5)
      expect(subject.text().trim()).to.eq('#0#1#2#3...#5Next')
    })

    it('should omit ellipses when bounds included in context', () => {
      const subject = testbed.render({
        children: buildPages(7, 2),
        variant: 'compact',
        labelNext: 'Next',
        labelPrev: 'Prev'
      })
      expect(subject.find('button').length).to.eq(9)
      expect(subject.text().trim()).to.eq('Prev#0#1#2#3#4#5#6Next')
    })

    describe('arrows', () => {
      it('should render only when applicable', () => {
        const subject = testbed.render({
          children: buildPages(6),
          variant: 'compact',
          labelNext: 'Next',
          labelPrev: 'Prev'
        })

        expect(subject.findElementWithText('button', 'Prev')).to.have.length(0)
        expect(subject.findElementWithText('button', 'Next')).to.have.length(1)

        subject.setProps({ children: buildPages(6, 5) })

        expect(subject.findElementWithText('button', 'Prev')).to.have.length(1)
        expect(subject.findElementWithText('button', 'Next')).to.have.length(0)
      })

      it('should navigate to adjacent pages', () => {
        const onClick = testbed.stub()
        const subject = testbed.render({
          children: [
            ...buildPages(6, 5),
            <PaginationButton key="last" onClick={onClick}>Last</PaginationButton>
          ],
          variant: 'compact',
          labelNext: 'Next',
          labelPrev: 'Prev'
        })

        subject.findElementWithText('button', 'Next').click()

        expect(onClick).to.have.been.called
      })
    })

    describe('when passing down props to View', () => {
      const allowedProps = {
        margin: 'small',
        as: 'section',
        display: View.defaultProps.display
      }

      Object.keys(View.propTypes)
        .filter(prop => prop !== 'theme' && prop !== 'children' && prop !== 'elementRef')
        .forEach((prop) => {
          if (Object.keys(allowedProps).indexOf(prop) < 0) {
            it(`should NOT allow the '${prop}' prop`, () => {
              const subject = testbed.render({
                variant: 'compact',
                labelNext: 'Next',
                labelPrev: 'Prev',
                [prop]: 'foo'
              })
              expect(subject.find(View).first().props()[prop]).to.not.exist
            })
          } else {
            it(`should allow the '${prop}' prop`, () => {
              const subject = testbed.render({
                variant: 'compact',
                labelNext: 'Next',
                labelPrev: 'Prev',
                [prop]: allowedProps[prop]
              })
              expect(subject.find(View).first().props()[prop]).to.equal(allowedProps[prop])
            })
          }
      })

      it(`should pass down the elementRef prop`, () => {
        const elementRef = testbed.stub()
        testbed.render({ elementRef })
        expect(elementRef).to.have.been.called
      })
    })

    // Testing compact only, since it is a superset of components in full
    it('should meet a11y standards', done => {
      const subject = testbed.render({
        variant: 'compact',
        labelNext: 'Next',
        labelPrev: 'Prev'
      })

      subject.should.be.accessible(done, {
        ignores: [
          'color-contrast' // brand color doesn't meet 4.5:1 contrast req
        ]
      })
    })
  })
})
