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
import { expect, mount, stub, wait, within } from '@instructure/ui-test-utils'

import { View } from '@instructure/ui-view'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'

import { Pagination, PaginationButton } from '../index'
import { PaginationLocator } from '../PaginationLocator'

const buildPages = (count = 4, current = 0) => {
  // @ts-expect-error ts-migrate(6133) FIXME: 'v' is declared but its value is never read.
  return Array.from(Array(count)).map((v, i) => {
    return (
      <PaginationButton key={i} current={i === current}>
        #{i}
      </PaginationButton>
    )
  })
}

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<Pagination />', async () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render all pages buttons', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<Pagination variant="compact">{buildPages(5)}</Pagination>)

    const pagination = await PaginationLocator.find()
    const buttons = await pagination.findAllPageButtons()

    expect(buttons.length).to.equal(5)

    const buttonsText = buttons.reduce(
      // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'acc' implicitly has an 'any' type.
      (acc, button) => acc + button.getTextContent(),
      ''
    )

    expect(buttonsText).to.equal('#0#1#2#3#4')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should not render next/prev buttons', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Pagination
        label="Example"
        variant="compact"
        labelNext="Next"
        labelPrev="Prev"
      >
        {buildPages(5)}
      </Pagination>
    )

    const pagination = await PaginationLocator.find(':label(Example)')
    const nextButton = await pagination.findArrowButton(':label(Next)', {
      expectEmpty: true
    })
    const prevButton = await pagination.findArrowButton(':label(Prev)', {
      expectEmpty: true
    })

    expect(nextButton).to.not.exist()
    expect(prevButton).to.not.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should meet a11y standards', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
        {buildPages(5)}
      </Pagination>
    )
    const pagination = await PaginationLocator.find()
    expect(await pagination.accessible()).to.be.true()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render no additional space when label text is hidden', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const pagination = await mount(
      <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
        {buildPages(5)}
      </Pagination>
    )

    const paginationNode = within(pagination.getDOMNode())
    const heightWithNoLabel = paginationNode.getComputedStyle()['height']

    await pagination.setProps({
      label: <ScreenReaderContent>I am a hidden label</ScreenReaderContent>
    })

    await wait(() => {
      const heightWithHiddenLabel = paginationNode.getComputedStyle()['height']
      expect(heightWithNoLabel).to.equal(heightWithHiddenLabel)
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render page buttons', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
        {buildPages(5)}
      </Pagination>
    )
    const pagination = await PaginationLocator.find()
    const buttons = await pagination.findAllPageButtons()

    expect(buttons.length).to.equal(5)
    expect(
      // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'acc' implicitly has an 'any' type.
      buttons.reduce((acc, button) => acc + button.getTextContent(), '')
    ).to.equal('#0#1#2#3#4')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render a single page button', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
        {buildPages(1)}
      </Pagination>
    )
    const pagination = await PaginationLocator.find()
    const buttons = await pagination.findAllPageButtons()

    expect(buttons.length).to.equal(1)
    expect(buttons[0]).to.have.text(`#0`)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render nothing if there are no pages', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Pagination variant="compact" labelNext="Next" labelPrev="Prev" />
    )
    const pagination = await PaginationLocator.find({ expectEmpty: true })

    expect(pagination).to.not.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should truncate pages to context', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
        {buildPages(9, 3)}
      </Pagination>
    )

    const pagination = await PaginationLocator.find()
    const allButtons = await pagination.findAll('button')
    const paginationButtons = await pagination.findAllPageButtons()
    const ellipses = await pagination.findAll('[aria-hidden]:contains("…")')

    expect(allButtons.length).to.equal(9)
    expect(paginationButtons.length).to.equal(7)
    expect(ellipses.length).to.equal(2)
    expect(pagination).to.have.text('Prev#0…#2#3#4#5#6…#8Next')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should truncate start', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
        {buildPages(9, 8)}
      </Pagination>
    )
    const pagination = await PaginationLocator.find()
    const allButtons = await pagination.findAll('button')
    const paginationButtons = await pagination.findAllPageButtons()
    const ellipses = await pagination.findAll('[aria-hidden]:contains(…)')

    expect(allButtons.length).to.equal(6)
    expect(paginationButtons.length).to.equal(5)
    expect(ellipses.length).to.equal(1)

    expect(pagination).to.have.text('Prev#0…#5#6#7#8')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should truncate end', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
        {buildPages(6)}
      </Pagination>
    )
    const pagination = await PaginationLocator.find()
    const allButtons = await pagination.findAll('button')
    const paginationButtons = await pagination.findAllPageButtons()
    const ellipses = await pagination.findAll('[aria-hidden]:contains(…)')

    expect(allButtons.length).to.equal(6)
    expect(paginationButtons.length).to.equal(5)
    expect(ellipses.length).to.equal(1)

    expect(pagination).to.have.text('#0#1#2#3…#5Next')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should omit ellipses when bounds included in context', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
        {buildPages(7, 2)}
      </Pagination>
    )
    const pagination = await PaginationLocator.find()
    const allButtons = await pagination.findAll('button')
    const paginationButtons = await pagination.findAllPageButtons()
    const ellipses = await pagination.findAll('[aria-hidden]:contains(…)', {
      expectEmpty: true
    })

    expect(allButtons.length).to.equal(9)
    expect(paginationButtons.length).to.equal(7)
    expect(ellipses.length).to.equal(0)

    expect(
      // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'acc' implicitly has an 'any' type.
      allButtons.reduce((acc, button) => acc + button.getTextContent(), '')
    ).to.equal('Prev#0#1#2#3#4#5#6Next')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when updating with the FIRST page becoming current', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should move focus from the Previous Page button to the first page button', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const subject = await mount(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 1)}
        </Pagination>
      )

      const pagination = await PaginationLocator.find()
      const prevButtonWrapper = await pagination.findArrowButton(
        ':label(Previous)'
      )
      const prevButton = await prevButtonWrapper.find('button')

      await prevButton.focus()

      await wait(() => {
        expect(prevButton.focused()).to.be.true()
      })

      await subject.setProps({ children: buildPages(7, 0) })

      const button0 = await pagination.findPageButton(':label(#0)')

      await wait(() => {
        expect(button0.focused()).to.be.true()
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should not change focus when the Previous Page button did not have focus', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const subject = await mount(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 1)}
        </Pagination>
      )

      const pagination = await PaginationLocator.find()
      const button1 = await pagination.findPageButton(':label(#1)')

      await button1.focus()

      await subject.setProps({ children: buildPages(7, 0) })

      await wait(() => {
        expect(button1.containsFocus()).to.be.true()
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should not continue to change focus on subsequent updates', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const subject = await mount(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 1)}
        </Pagination>
      )

      const pagination = await PaginationLocator.find()
      const prevButton = await pagination.findArrowButton(':label(Previous)')

      await prevButton.focus()

      await subject.setProps({ children: buildPages(7, 0) })

      const button1 = await pagination.findPageButton(':label(#1)')

      await button1.focus()

      await subject.setProps({ children: buildPages(7, 0) })

      await wait(() => {
        expect(button1.containsFocus()).to.be.true()
      })
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when updating with the LAST page becoming current', async () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should move focus from the Next Page button to the last page button', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const subject = await mount(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 5)}
        </Pagination>
      )

      const pagination = await PaginationLocator.find()
      const nextButtonWrapper = await pagination.findArrowButton(':label(Next)')
      const nextButton = await nextButtonWrapper.find('button')

      await nextButton.focus()

      await wait(() => {
        expect(nextButton.focused()).to.be.true()
      })

      await subject.setProps({ children: buildPages(7, 6) })

      const button6 = await pagination.findPageButton(':label(#6)')

      await wait(() => {
        expect(button6.focused()).to.be.true()
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should not change focus when the Next Page button did not have focus', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const subject = await mount(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 5)}
        </Pagination>
      )

      const pagination = await PaginationLocator.find()
      const button5 = await pagination.findPageButton(':label(#5)')

      await button5.focus()

      await subject.setProps({ children: buildPages(7, 6) })

      await wait(() => {
        expect(button5.containsFocus()).to.be.true()
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should not continue to change focus on subsequent updates', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
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

      await wait(() => {
        expect(button5.containsFocus()).to.be.true()
      })
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('arrows', async () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should not continue to change focus on subsequent updates', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const subject = await mount(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(6)}
        </Pagination>
      )

      const pagination = await PaginationLocator.find()

      let prevButton = await pagination.findArrowButton(':label(Previous)', {
        expectEmpty: true
      })

      expect(prevButton).to.not.exist()

      let nextButton = await pagination.findArrowButton(':label(Next)')

      expect(nextButton).to.exist()

      await subject.setProps({ children: buildPages(6, 5) })

      prevButton = await pagination.findArrowButton(':label(Previous)')

      expect(prevButton).to.exist()

      nextButton = await pagination.findArrowButton(':label(Next)', {
        expectEmpty: true
      })

      expect(nextButton).to.not.exist()
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when passing down props to View', async () => {
      const allowedProps = {
        margin: 'small',
        as: 'section'
      }

      Object.keys(View.propTypes)
        .filter(
          (prop) =>
            prop !== 'theme' &&
            prop !== 'children' &&
            prop !== 'elementRef' &&
            prop !== 'makeStyles' &&
            prop !== 'styles'
        )
        .forEach((prop) => {
          if (Object.keys(allowedProps).indexOf(prop) < 0) {
            // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
            it(`should NOT allow the '${prop}' prop`, async () => {
              // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
              const consoleError = stub(console, 'error')
              const warning = `Warning: [Pagination] prop '${prop}' is not allowed.`
              const props = { [prop]: 'foo' }
              // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
              await mount(
                <Pagination
                  variant="compact"
                  labelNext="Next"
                  labelPrev="Previous"
                  {...props}
                >
                  {buildPages(6)}
                </Pagination>
              )
              await wait(() => {
                expect(consoleError).to.be.calledWith(warning)
              })
            })
          } else {
            // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
            it(`should allow the '${prop}' prop`, async () => {
              // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              const props = { [prop]: allowedProps[prop] }
              // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
              const consoleError = stub(console, 'error')
              // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
              await mount(
                <Pagination
                  variant="compact"
                  labelNext="Next"
                  labelPrev="Previous"
                  {...props}
                >
                  {buildPages(6)}
                </Pagination>
              )
              expect(consoleError).to.not.be.called()
            })
          }
        })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it(`should pass down the elementRef prop`, async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const elementRef = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const subject = await mount(
        <Pagination
          elementRef={elementRef}
          variant="compact"
          labelNext="Next"
          labelPrev="Previous"
        >
          {buildPages(6)}
        </Pagination>
      )
      await wait(() => {
        expect(elementRef).to.have.been.calledWith(subject.getDOMNode())
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should navigate to adjacent pages', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onClick = stub()

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {[
            ...buildPages(6, 5),
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            <PaginationButton key="last" onClick={onClick}>
              Last
            </PaginationButton>
          ]}
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
