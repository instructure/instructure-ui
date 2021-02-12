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

import {
  expect,
  mount,
  stub,
  generateA11yTests
} from '@instructure/ui-test-utils'

import { Day } from '../index'
import { DayLocator } from '../DayLocator'
import DayExamples from '../__examples__/Day.examples'

describe('Day', async () => {
  it('should render children', async () => {
    const subject = await mount(
      <Day date="2019-08-02" label="1 August 2019 Friday">
        8
      </Day>
    )

    expect(await DayLocator.findWithText('8')).to.exist()

    await subject.setProps({
      children: () => 31
    })

    expect(await DayLocator.findWithText('31')).to.exist()
  })

  it('should have an accessible label', async () => {
    const label = '1 August 2019 Friday'
    await mount(
      <Day date="2019-08-02" label={label}>
        8
      </Day>
    )

    expect(await DayLocator.findWithText(label)).to.exist()
  })

  it('should set aria-current="date" when `isToday`', async () => {
    const subject = await mount(
      <Day date="2019-08-02" label="1 August 2019 Friday" isToday>
        8
      </Day>
    )

    expect(await DayLocator.find('[aria-current="date"]')).to.exist()

    await subject.setProps({ isToday: false })

    expect(
      await DayLocator.find('[aria-current="date"]', { expectEmpty: true })
    ).to.not.exist()
  })

  it('should not set aria-selected without a role', async () => {
    const subject = await mount(
      <Day date="2019-08-02" label="1 August 2019 Friday">
        8
      </Day>
    )

    expect(
      await DayLocator.find('[aria-selected]', { expectEmpty: true })
    ).to.not.exist()

    await subject.setProps({ isSelected: true })

    expect(
      await DayLocator.find('[aria-selected]', { expectEmpty: true })
    ).to.not.exist()
  })

  it('should set aria-selected="true/false" when `isSelected` and `role` is `option` or `gridcell`', async () => {
    const subject = await mount(
      <Day date="2019-08-02" label="1 August 2019 Friday" role="option">
        8
      </Day>
    )

    expect(await DayLocator.find('[aria-selected="false"]')).to.exist()

    await subject.setProps({ isSelected: true })
    expect(await DayLocator.find('[aria-selected="true"]')).to.exist()

    await subject.setProps({ isSelected: false, role: 'gridcell' })
    expect(await DayLocator.find('[aria-selected="false"]')).to.exist()

    await subject.setProps({ isSelected: true })
    expect(await DayLocator.find('[aria-selected="true"]')).to.exist()
  })

  it('should call onClick with date', async () => {
    const onClick = stub()
    const date = '2019-08-02'

    await mount(
      <Day date={date} label="1 August 2019 Friday" onClick={onClick}>
        8
      </Day>
    )

    const day = await DayLocator.find()

    await day.click()

    expect(onClick).to.have.been.calledOnce()
    expect(onClick.lastCall.args[1].date).to.equal(date)
  })

  it('should call onKeyDown with date', async () => {
    const onKeyDown = stub()
    const date = '2019-08-02'

    await mount(
      <Day
        date={date}
        label="1 August 2019 Friday"
        onKeyDown={onKeyDown}
        onClick={() => {}}
      >
        8
      </Day>
    )

    const day = await DayLocator.find()

    await day.keyDown()

    expect(onKeyDown).to.have.been.calledOnce()
    expect(onKeyDown.lastCall.args[1].date).to.equal(date)
  })

  it('should apply disabled when interaction is `disabled`', async () => {
    const onClick = stub()

    await mount(
      <Day
        date="2019-08-02"
        label="1 August 2019 Friday"
        onClick={onClick}
        interaction="disabled"
      >
        8
      </Day>
    )

    const day = await DayLocator.find('[disabled]')

    expect(day).to.exist()

    await day.click(null, { clickable: false })

    expect(onClick).to.not.have.been.called()
  })

  it('should provide an elementRef', async () => {
    let element

    const elementRef = (el) => {
      element = el
    }

    const subject = await mount(
      <Day
        date="2019-08-02"
        label="1 August 2019 Friday"
        elementRef={elementRef}
      >
        8
      </Day>
    )

    expect(subject.getDOMNode()).to.equal(element)
  })

  describe('element type', async () => {
    it('should render as a span by default', async () => {
      await mount(
        <Day date="2019-08-02" label="1 August 2019 Friday">
          8
        </Day>
      )

      const day = await DayLocator.find()
      expect(day.getTagName()).to.equal('span')
    })

    it('should render as a button when onClick is provided', async () => {
      await mount(
        <Day date="2019-08-02" label="1 August 2019 Friday" onClick={() => {}}>
          8
        </Day>
      )

      const day = await DayLocator.find()
      expect(day.getTagName()).to.equal('button')
    })

    it('default elementTypes should be overwritten when `as` prop is set', async () => {
      await mount(
        <Day
          date="2019-08-02"
          label="1 August 2019 Friday"
          onClick={() => {}}
          as="li"
        >
          8
        </Day>
      )

      const day = await DayLocator.find()
      expect(day.getTagName()).to.equal('li')
    })
  })

  describe('with generated examples', async () => {
    generateA11yTests(DayExamples)
  })
})
