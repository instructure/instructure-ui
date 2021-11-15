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
import { expect, match, mount, stub } from '@instructure/ui-test-utils'
import { PaginationPageInput } from '../index'
import { PaginationPageInputLocator } from '../PaginationPageInputLocator'

const defaultOnChange = (e: Event, value: number) => {
  console.log(e, value) // eslint-disable-line no-console
}
const defaultSRLabel = (currentPage: number, numberOfPages: number) =>
  `Select page (${currentPage} of ${numberOfPages})`

describe('<PaginationPageInput />', async () => {
  it('should render', async () => {
    await mount(
      <PaginationPageInput
        numberOfPages={10}
        currentPageIndex={0}
        onChange={defaultOnChange}
        screenReaderLabel={defaultSRLabel}
      />
    )

    const pageInput = await PaginationPageInputLocator.find()
    expect(pageInput).to.exist()
  })

  it('should display the current page number', async () => {
    await mount(
      <PaginationPageInput
        numberOfPages={10}
        currentPageIndex={3}
        onChange={defaultOnChange}
        screenReaderLabel={defaultSRLabel}
      />
    )

    const pageInput = await PaginationPageInputLocator.find()
    const input = await pageInput.findInput()
    expect(input.getDOMNode().value).to.equal('4')
  })

  it('should correctly update page number', async () => {
    const subject = await mount(
      <PaginationPageInput
        numberOfPages={10}
        currentPageIndex={3}
        onChange={defaultOnChange}
        screenReaderLabel={defaultSRLabel}
      />
    )

    const pageInput = await PaginationPageInputLocator.find()
    const input = await pageInput.findInput()
    expect(input.getDOMNode().value).to.equal('4')

    await subject.setProps({ currentPageIndex: 6 })

    expect(input.getDOMNode().value).to.equal('7')
  })

  it("shouldn't display the arrow keys of NumberInput", async () => {
    await mount(
      <PaginationPageInput
        numberOfPages={10}
        currentPageIndex={3}
        onChange={defaultOnChange}
        screenReaderLabel={defaultSRLabel}
      />
    )

    const pageInput = await PaginationPageInputLocator.find()
    const arrowKeys = await pageInput.findNumberInputArrows({
      expectEmpty: true
    })
    expect(arrowKeys.length).to.equal(0)
  })

  it("should disable the input on 'disabled'", async () => {
    await mount(
      <PaginationPageInput
        numberOfPages={10}
        currentPageIndex={3}
        onChange={defaultOnChange}
        screenReaderLabel={defaultSRLabel}
        disabled
      />
    )

    const pageInput = await PaginationPageInputLocator.find()
    const input = await pageInput.findInput()
    expect(input.getDOMNode().disabled).to.true()
  })

  it('should set the ScreenReaderLabel for the input', async () => {
    await mount(
      <PaginationPageInput
        numberOfPages={10}
        currentPageIndex={3}
        onChange={defaultOnChange}
        screenReaderLabel={defaultSRLabel}
      />
    )

    const pageInput = await PaginationPageInputLocator.find()
    const label = await pageInput.find(':contains(Select page (4 of 10))')
    expect(label).to.exist()
  })

  it('should display the number of pages in the label', async () => {
    await mount(
      <PaginationPageInput
        numberOfPages={10}
        currentPageIndex={3}
        onChange={defaultOnChange}
        screenReaderLabel={defaultSRLabel}
        label={(numberOfPages) => `of ${numberOfPages}`}
      />
    )

    const pageInput = await PaginationPageInputLocator.find()
    const label = await pageInput.find(':contains(of 10)')
    expect(label).to.exist()
  })

  describe('on typing', async () => {
    it('a number, should update the number in the input', async () => {
      await mount(
        <PaginationPageInput
          numberOfPages={10}
          currentPageIndex={3}
          onChange={defaultOnChange}
          screenReaderLabel={defaultSRLabel}
          label={(numberOfPages) => `of ${numberOfPages}`}
        />
      )

      const pageInput = await PaginationPageInputLocator.find()
      const input = await pageInput.findInput()
      await input.change({ target: { value: '6' } })

      expect(input.getDOMNode().value).to.equal('6')
    })

    it('a letter, should not update the input', async () => {
      await mount(
        <PaginationPageInput
          numberOfPages={10}
          currentPageIndex={3}
          onChange={defaultOnChange}
          screenReaderLabel={defaultSRLabel}
          label={(numberOfPages) => `of ${numberOfPages}`}
        />
      )

      const pageInput = await PaginationPageInputLocator.find()
      const input = await pageInput.findInput()
      await input.change({ target: { value: 'a' } })

      expect(input.getDOMNode().value).to.equal('')
    })

    it("shouldn't call onChange on input", async () => {
      const onChange = stub()

      await mount(
        <PaginationPageInput
          numberOfPages={10}
          currentPageIndex={3}
          onChange={defaultOnChange}
          screenReaderLabel={defaultSRLabel}
          label={(numberOfPages) => `of ${numberOfPages}`}
        />
      )

      const pageInput = await PaginationPageInputLocator.find()
      const input = await pageInput.findInput()
      input.change({ target: { value: '6' } })

      expect(onChange).to.not.have.been.called()
    })
  })

  describe('on input and Enter', async () => {
    it('should keep the number in the input', async () => {
      await mount(
        <PaginationPageInput
          numberOfPages={10}
          currentPageIndex={3}
          onChange={defaultOnChange}
          screenReaderLabel={defaultSRLabel}
          label={(numberOfPages) => `of ${numberOfPages}`}
        />
      )

      const pageInput = await PaginationPageInputLocator.find()
      const input = await pageInput.findInput()
      await input.change({ target: { value: '6' } })
      expect(input.getDOMNode().value).to.equal('6')

      await input.keyDown('enter')

      expect(input.getDOMNode().value).to.equal('6')
    })

    it('should call onChange on successful update', async () => {
      const onChange = stub()

      await mount(
        <PaginationPageInput
          numberOfPages={10}
          currentPageIndex={3}
          onChange={onChange}
          screenReaderLabel={defaultSRLabel}
          label={(numberOfPages) => `of ${numberOfPages}`}
        />
      )

      const pageInput = await PaginationPageInputLocator.find()
      const input = await pageInput.findInput()

      await input.change({ target: { value: '6' } })
      await input.keyDown('enter')

      expect(onChange).to.have.been.calledWithMatch(match.object, 5)
    })

    it('should set MAX value on too big number', async () => {
      const onChange = stub()

      await mount(
        <PaginationPageInput
          numberOfPages={10}
          currentPageIndex={3}
          onChange={onChange}
          screenReaderLabel={defaultSRLabel}
          label={(numberOfPages) => `of ${numberOfPages}`}
        />
      )

      const pageInput = await PaginationPageInputLocator.find()
      const input = await pageInput.findInput()

      await input.change({ target: { value: '20' } })
      await input.keyDown('enter')

      expect(input.getDOMNode().value).to.equal('10')
      expect(onChange).to.have.been.calledWithMatch(match.object, 9)
    })

    it('should set MIN value on too small number', async () => {
      const onChange = stub()

      await mount(
        <PaginationPageInput
          numberOfPages={10}
          currentPageIndex={3}
          onChange={onChange}
          screenReaderLabel={defaultSRLabel}
          label={(numberOfPages) => `of ${numberOfPages}`}
        />
      )

      const pageInput = await PaginationPageInputLocator.find()
      const input = await pageInput.findInput()

      await input.change({ target: { value: '0' } })
      await input.keyDown('enter')

      expect(input.getDOMNode().value).to.equal('1')
      expect(onChange).to.have.been.calledWithMatch(match.object, 0)
    })

    it('should reset current value and not call onChange on empty string', async () => {
      const onChange = stub()

      await mount(
        <PaginationPageInput
          numberOfPages={10}
          currentPageIndex={3}
          onChange={onChange}
          screenReaderLabel={defaultSRLabel}
          label={(numberOfPages) => `of ${numberOfPages}`}
        />
      )

      const pageInput = await PaginationPageInputLocator.find()
      const input = await pageInput.findInput()

      await input.change({ target: { value: '' } })
      await input.keyDown('enter')

      expect(input.getDOMNode().value).to.equal('4')
      expect(onChange).to.have.not.been.called()
    })
  })

  describe('on up arrow', async () => {
    it('should increment value and call onChange', async () => {
      const onChange = stub()

      await mount(
        <PaginationPageInput
          numberOfPages={10}
          currentPageIndex={3}
          onChange={onChange}
          screenReaderLabel={defaultSRLabel}
          label={(numberOfPages) => `of ${numberOfPages}`}
        />
      )

      const pageInput = await PaginationPageInputLocator.find()
      const input = await pageInput.findInput()

      await input.keyDown('up')

      expect(input.getDOMNode().value).to.equal('5')
      expect(onChange).to.have.been.calledWithMatch(match.object, 4)
    })
  })

  describe('on down arrow', async () => {
    it('should decrement value and call onChange', async () => {
      const onChange = stub()

      await mount(
        <PaginationPageInput
          numberOfPages={10}
          currentPageIndex={3}
          onChange={onChange}
          screenReaderLabel={defaultSRLabel}
          label={(numberOfPages) => `of ${numberOfPages}`}
        />
      )

      const pageInput = await PaginationPageInputLocator.find()
      const input = await pageInput.findInput()

      await input.keyDown('down')

      expect(input.getDOMNode().value).to.equal('3')
      expect(onChange).to.have.been.calledWithMatch(match.object, 2)
    })
  })
})
