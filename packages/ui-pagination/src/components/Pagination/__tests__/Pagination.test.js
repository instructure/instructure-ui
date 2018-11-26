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

import { expect, mount, stub, wait } from '@instructure/ui-test-utils'

import Pagination from '../index'
import PaginationButton from '../PaginationButton/index'
import PaginationLocator from '../locator'

const buildPages = (count = 4, current = 0) => {
  return Array.from(Array(count)).map((v, i) => {
    return (
      <PaginationButton key={i} current={i === current}>
        #{i}
      </PaginationButton>
    )
  })
}

describe('<Pagination />', async () => {
  it('should render all pages buttons', async () => {
    await mount(
      <Pagination variant="compact">
        { buildPages(5) }
      </Pagination>
    )

    const pagination = await PaginationLocator.find()
    const buttons = await pagination.findAllPageButtons()

    expect(buttons.length).to.equal(5)

    const buttonsText = buttons.reduce((acc, button) => acc + button.getTextContent(), '')

    expect(buttonsText).to.equal('#0#1#2#3#4')
  })

  it('should not render next/prev buttons', async () => {
    await mount(
      <Pagination
        label="Example"
        variant="compact"
        labelNext="Next"
        labelPrev="Prev"
      >
        { buildPages(5) }
      </Pagination>
    )

    const pagination = await PaginationLocator.find(':label(Example)')
    const nextButton = await pagination.findArrowButton(':label(Next)', { expectEmpty: true })
    const prevButton = await pagination.findArrowButton(':label(Prev)', { expectEmpty: true })

    expect(nextButton).to.not.exist()
    expect(prevButton).to.not.exist()
  })

  it('should meet a11y standards', async () => {
    await mount(
      <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
        { buildPages(5) }
      </Pagination>
    )
    const pagination = await PaginationLocator.find()
    expect(await pagination.accessible()).to.be.true()
  })

  it('should render page buttons', async () => {
    await mount(
      <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
        { buildPages(5) }
      </Pagination>
    )
    const pagination = await PaginationLocator.find()
    const buttons = await pagination.findAllPageButtons()

    expect(buttons.length).to.equal(5)
    expect(
      buttons.reduce((acc, button) => acc + button.getTextContent(), '')
    ).to.equal('#0#1#2#3#4')
  })

  it('should render a single page button', async () => {
    await mount(
      <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
        { buildPages(1) }
      </Pagination>
    )
    const pagination = await PaginationLocator.find()
    const buttons = await pagination.findAllPageButtons()

    expect(buttons.length).to.equal(1)
    expect(buttons[0].getTextContent()).to.equal(`#0`)
  })

  it('should render nothing if there are no pages', async () => {
    await mount(
      <Pagination variant="compact" labelNext="Next" labelPrev="Prev" />
    )
    const pagination = await PaginationLocator.find({ expectEmpty: true })

    expect(pagination).to.not.exist()
  })

  it('should truncate pages to context', async () => {
    await mount(
      <Pagination
        variant="compact"
        labelNext="Next"
        labelPrev="Prev"
      >
        { buildPages(9, 3) }
      </Pagination>
    )

    const pagination = await PaginationLocator.find()
    const allButtons = await pagination.findAll('button')
    const paginationButtons = await pagination.findAllPageButtons()
    const ellipses = await pagination.findAll('[aria-hidden]:contains("…")')

    expect(allButtons.length).to.equal(9)
    expect(paginationButtons.length).to.equal(7)
    expect(ellipses.length).to.equal(2)

    expect(pagination.getTextContent()).to.equal('Prev#0…#2#3#4#5#6…#8Next')
  })

  it('should truncate start', async () => {
    await mount(
      <Pagination
        variant="compact"
        labelNext="Next"
        labelPrev="Prev"
      >
        { buildPages(6, 5) }
      </Pagination>
    )
    const pagination = await PaginationLocator.find()
    const allButtons = await pagination.findAll('button')
    const paginationButtons = await pagination.findAllPageButtons()
    const ellipses = await pagination.findAll('[aria-hidden]:contains(…)')

    expect(allButtons.length).to.equal(4)
    expect(paginationButtons.length).to.equal(3)
    expect(ellipses.length).to.equal(1)

    expect(pagination.getTextContent()).to.equal('Prev#0…#4#5')
  })

  it('should truncate end', async () => {
    await mount(
      <Pagination
        variant="compact"
        labelNext="Next"
        labelPrev="Prev"
      >
        { buildPages(6) }
      </Pagination>
    )
    const pagination = await PaginationLocator.find()
    const allButtons = await pagination.findAll('button')
    const paginationButtons = await pagination.findAllPageButtons()
    const ellipses = await pagination.findAll('[aria-hidden]:contains(…)')

    expect(allButtons.length).to.equal(6)
    expect(paginationButtons.length).to.equal(5)
    expect(ellipses.length).to.equal(1)

    expect(pagination.getTextContent()).to.equal('#0#1#2#3…#5Next')
  })

  it('should omit ellipses when bounds included in context', async () => {
    await mount(
      <Pagination
        variant="compact"
        labelNext="Next"
        labelPrev="Prev"
      >
        { buildPages(7, 2) }
      </Pagination>
    )
    const pagination = await PaginationLocator.find()
    const allButtons = await pagination.findAll('button')
    const paginationButtons = await pagination.findAllPageButtons()
    const ellipses = await pagination.findAll(
      '[aria-hidden]:contains(…)',
      { expectEmpty: true }
    )

    expect(allButtons.length).to.equal(9)
    expect(paginationButtons.length).to.equal(7)
    expect(ellipses.length).to.equal(0)

    expect(
      allButtons.reduce((acc, button) => acc + button.getTextContent(), '')
    ).to.equal('Prev#0#1#2#3#4#5#6Next')
  })

  describe('when updating with the FIRST page becoming current', () => {
    it('should move focus from the Previous Page button to the first page button', async () => {
      const subject = await mount(
        <Pagination
          variant="compact"
          labelNext="Next"
          labelPrev="Previous"
        >
          { buildPages(7, 1) }
        </Pagination>
      )

      const pagination = await PaginationLocator.find()
      const prevButton = await pagination.findArrowButton(':label(Previous)')

      await prevButton.focus()

      await subject.setProps({ children: buildPages(7, 0) })

      const button0 = await pagination.findPageButton(':label(#0)')

      expect(button0.containsFocus()).to.be.true()
    })

    it('should not change focus when the Previous Page button did not have focus', async () => {
      const subject = await mount(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          { buildPages(7, 1) }
        </Pagination>
      )

      const pagination = await PaginationLocator.find()
      const button1 = await pagination.findPageButton(':label(#1)')

      await button1.focus()

      await subject.setProps({ children: buildPages(7, 0) })

      expect(button1.containsFocus()).to.be.true()
    })

    it('should not continue to change focus on subsequent updates', async () => {
      const subject = await mount(
        <Pagination
          variant="compact"
          labelNext="Next"
          labelPrev="Previous"
        >
          { buildPages(7, 1) }
        </Pagination>
      )

      const pagination = await PaginationLocator.find()
      const prevButton = await pagination.findArrowButton(':label(Previous)')

      await prevButton.focus()

      await subject.setProps({ children: buildPages(7, 0) })

      const button1 = await pagination.findPageButton(':label(#1)')

      await button1.focus()

      await subject.setProps({ children: buildPages(7, 0) })

      expect(button1.containsFocus()).to.be.true()
    })
  })

  describe('when updating with the LAST page becoming current', async () => {
    it('should move focus from the Next Page button to the last page button', async () => {
      const subject = await mount(
        <Pagination
          variant="compact"
          labelNext="Next"
          labelPrev="Previous"
        >
          { buildPages(7, 5) }
        </Pagination>
      )

      const pagination = await PaginationLocator.find()
      const nextButton = await pagination.findArrowButton(':label(Next)')

      await nextButton.focus()

      await subject.setProps({ children: buildPages(7, 6) })

      const button6 = await pagination.findPageButton(':label(#6)')

      expect(button6.containsFocus()).to.be.true()
    })

    it('should not change focus when the Next Page button did not have focus', async () => {
      const subject = await mount(
        <Pagination
          variant="compact"
          labelNext="Next"
          labelPrev="Previous"
        >
          { buildPages(7, 5) }
        </Pagination>
      )

      const pagination = await PaginationLocator.find()
      const button5 = await pagination.findPageButton(':label(#5)')

      await button5.focus()

      await subject.setProps({ children: buildPages(7, 6) })

      expect(button5.containsFocus()).to.be.true()
    })

    it('should not continue to change focus on subsequent updates', async () => {
      const subject = await mount(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 5)}
        </Pagination>
      )

      const pagination = await PaginationLocator.find()
      const nextButton = await pagination.findArrowButton(':label(Next)')

      await nextButton.focus()

      await subject.setProps({ children: buildPages(7, 6) })

      const button5 = await pagination.findPageButton(':label(#5)')

      await button5.focus()

      await subject.setProps({ children: buildPages(7, 6) })

      expect(button5.containsFocus()).to.be.true()
    })
  })

  describe('arrows', async () => {
    it('should not continue to change focus on subsequent updates', async () => {
      const subject = await mount(
        <Pagination
          variant="compact"
          labelNext="Next"
          labelPrev="Previous"
        >
          { buildPages(6) }
        </Pagination>
      )

      const pagination = await PaginationLocator.find()

      let prevButton = await pagination.findArrowButton(':label(Previous)', { expectEmpty: true })

      expect(prevButton).to.not.exist()

      let nextButton = await pagination.findArrowButton(':label(Next)')

      expect(nextButton).to.exist()

      await subject.setProps({ children: buildPages(6, 5) })

      prevButton = await pagination.findArrowButton(':label(Previous)')

      expect(prevButton).to.exist()

      nextButton = await pagination.findArrowButton(':label(Next)', { expectEmpty: true })

      expect(nextButton).to.not.exist()
    })

    describe('when passing down props to View', async () => {
      const allowedProps = {
        margin: 'small',
        as: 'section'
      }

      Object.keys(View.propTypes)
        .filter(prop => prop !== 'theme' && prop !== 'children' && prop !== 'elementRef')
        .forEach((prop) => {


          if (Object.keys(allowedProps).indexOf(prop) < 0) {
            it(`should NOT allow the '${prop}' prop`, async () => {
              const consoleError = stub(console, 'error')
              const warning = `Warning: [Pagination] prop '${prop}' is not allowed.`
              const props = { [prop]: 'foo' }
              await mount(
                <Pagination
                  variant="compact"
                  labelNext="Next"
                  labelPrev="Previous"
                  {...props}
                >
                  { buildPages(6) }
                </Pagination>
              )
              expect(consoleError)
                .to.be.calledWithExactly(warning)
            })
          } else {
            it(`should allow the '${prop}' prop`, async () => {
              const props = { [prop]: allowedProps[prop] }
              const consoleError = stub(console, 'error')
              await mount(
                <Pagination
                  variant="compact"
                  labelNext="Next"
                  labelPrev="Previous"
                  {...props}
                >
                  { buildPages(6) }
                </Pagination>
              )
              expect(consoleError).to.not.be.called()
            })
          }
        })
    })

    it(`should pass down the elementRef prop`, async () => {
      const elementRef = stub()
      const subject = await mount(
        <Pagination
          elementRef={elementRef}
          variant="compact"
          labelNext="Next"
          labelPrev="Previous"
        >
          { buildPages(6) }
        </Pagination>
      )
      expect(elementRef).to.have.been.calledWith(subject.getDOMNode())
    })

    it('should navigate to adjacent pages', async () => {
      const onClick = stub()

      await mount(
        <Pagination
          variant="compact"
          labelNext="Next"
          labelPrev="Previous"
        >
          {[...buildPages(6, 5), <PaginationButton key="last" onClick={onClick}>Last</PaginationButton>]}
        </Pagination>
      )

      const pagination = await PaginationLocator.find()
      const nextButton = await pagination.findArrowButton(':label(Next)')

      await nextButton.click()

      await wait(() => {
        expect(onClick).to.have.been.called()
      })
    })
  })
})
