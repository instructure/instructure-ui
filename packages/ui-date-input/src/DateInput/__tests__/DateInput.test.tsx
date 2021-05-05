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
  wait,
  generateA11yTests
} from '@instructure/ui-test-utils'
import { Calendar } from '@instructure/ui-calendar'

import Examples from '../__examples__/DateInput.examples'

import { DateInput } from '../index'
import { DateInputLocator } from '../DateInputLocator'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<DateInput />', async () => {
  const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const generateDays = (count = Calendar.DAY_COUNT) => {
    const days = []
    const date = new Date('2019-07-28')

    while (days.length < count) {
      days.push(
        <Calendar.Day
          key={date.toISOString()}
          date={date.toISOString()}
          label={date.toISOString()}
        >
          {date.getDate()}
        </Calendar.Day>
      )
      date.setDate(date.getDate() + 1)
    }

    return days
  }

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render an input and a calendar', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <DateInput
        renderLabel="Choose date"
        renderWeekdayLabels={weekdayLabels}
        isShowingCalendar
      >
        {generateDays()}
      </DateInput>
    )
    const dateInput = await DateInputLocator.find()
    expect(dateInput).to.exist()

    expect(await dateInput.findInput()).to.exist()
    expect(await dateInput.findCalendar()).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('input', async () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render a label', async () => {
      const renderLabel = 'Choose date'
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <DateInput
          renderLabel={renderLabel}
          renderWeekdayLabels={weekdayLabels}
        >
          {generateDays()}
        </DateInput>
      )

      const dateInput = await DateInputLocator.find()
      const input = await dateInput.findInput()
      expect(input).to.have.label(renderLabel)
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should set value', async () => {
      const value = 'January 5'
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <DateInput
          renderLabel="Choose date"
          value={value}
          onChange={() => {}}
          renderWeekdayLabels={weekdayLabels}
        >
          {generateDays()}
        </DateInput>
      )

      const dateInput = await DateInputLocator.find()
      const input = await dateInput.findInput()
      expect(input).to.have.value(value)
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should call onChange with the updated value', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onChange = stub()
      const value = 'January 5'
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          onChange={onChange}
        >
          {generateDays()}
        </DateInput>
      )

      const dateInput = await DateInputLocator.find()
      const input = await dateInput.findInput()
      await input.change({ target: { value } })

      expect(onChange).to.have.been.calledOnce()
      expect(onChange.lastCall.args[1].value).to.equal(value)
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should call onBlur', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onBlur = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <DateInput
          renderLabel="Choose a date"
          renderWeekdayLabels={weekdayLabels}
          onBlur={onBlur}
        >
          {generateDays()}
        </DateInput>
      )

      const dateInput = await DateInputLocator.find()
      const input = await dateInput.findInput()
      await input.blur()

      expect(onBlur).to.have.been.calledOnce()
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should correctly set interaction type', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const subject = await mount(
        <DateInput
          renderLabel="Choose a date"
          renderWeekdayLabels={weekdayLabels}
          interaction="disabled"
        >
          {generateDays()}
        </DateInput>
      )

      const dateInput = await DateInputLocator.find()

      expect(await dateInput.findInput('[disabled]')).to.exist()

      await subject.setProps({ interaction: 'readonly' })

      expect(await dateInput.findInput('[readonly]')).to.exist()
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should correctly set disabled', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <DateInput
          renderLabel="Choose a date"
          renderWeekdayLabels={weekdayLabels}
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
          disabled
        >
          {generateDays()}
        </DateInput>
      )

      const dateInput = await DateInputLocator.find()

      expect(await dateInput.findInput('[disabled]')).to.exist()
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should correctly set readOnly', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <DateInput
          renderLabel="Choose a date"
          renderWeekdayLabels={weekdayLabels}
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
          readOnly
        >
          {generateDays()}
        </DateInput>
      )

      const dateInput = await DateInputLocator.find()

      expect(await dateInput.findInput('[readonly]')).to.exist()
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should set placeholder', async () => {
      const placeholder = 'Start typing to choose a date'

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <DateInput
          renderLabel="Choose a date"
          renderWeekdayLabels={weekdayLabels}
          placeholder={placeholder}
        >
          {generateDays()}
        </DateInput>
      )

      const dateInput = await DateInputLocator.find()
      const input = await dateInput.findInput()

      expect(input.getAttribute('placeholder')).to.equal(placeholder)
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should be requireable', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <DateInput
          renderLabel="Choose a date"
          renderWeekdayLabels={weekdayLabels}
          isRequired
        >
          {generateDays()}
        </DateInput>
      )

      const dateInput = await DateInputLocator.find()
      const input = await dateInput.findInput()

      expect(input.getDOMNode().required).to.be.true()
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should provide inputRef', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const inputRef = stub()

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <DateInput
          renderLabel="Choose a date"
          renderWeekdayLabels={weekdayLabels}
          inputRef={inputRef}
        >
          {generateDays()}
        </DateInput>
      )

      const dateInput = await DateInputLocator.find()
      const input = await dateInput.findInput()

      expect(inputRef).to.have.been.calledWith(input.getDOMNode())
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render messages', async () => {
      const text = 'The selected date is invalid'
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <DateInput
          renderLabel="Choose a date"
          renderWeekdayLabels={weekdayLabels}
          messages={[{ type: 'error', text }]}
        >
          {generateDays()}
        </DateInput>
      )

      const dateInput = await DateInputLocator.find()

      await wait(() => {
        expect(dateInput).to.contain.text(text, { exact: false })
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should allow custom props to pass through', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <DateInput
          renderLabel="Choose a date"
          renderWeekdayLabels={weekdayLabels}
          data-custom-attr="true"
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
          name="my name"
        >
          {generateDays()}
        </DateInput>
      )
      const dateInput = await DateInputLocator.find()
      const input = await dateInput.findInput()

      expect(input.getAttribute('data-custom-attr')).to.equal('true')
      expect(input.getAttribute('name')).to.equal('my name')
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('Calendar', async () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should show calendar when `isShowingCalendar` is set', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const subject = await mount(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
        >
          {generateDays()}
        </DateInput>
      )

      const dateInput = await DateInputLocator.find()
      expect(dateInput).to.exist()

      expect(await dateInput.findCalendar({ expectEmpty: true })).to.not.exist()

      await subject.setProps({ isShowingCalendar: true })

      expect(await dateInput.findCalendar()).to.exist()
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('onRequestShowCalendar', async () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call onRequestShowCalendar when root is clicked', async () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
        const onRequestShowCalendar = stub()
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        await mount(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestShowCalendar={onRequestShowCalendar}
          >
            {generateDays()}
          </DateInput>
        )

        const dateInput = await DateInputLocator.find()
        await dateInput.click()
        expect(onRequestShowCalendar).to.have.been.calledOnce()
      })

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call onRequestShowCalendar when input is clicked', async () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
        const onRequestShowCalendar = stub()
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        await mount(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestShowCalendar={onRequestShowCalendar}
          >
            {generateDays()}
          </DateInput>
        )

        const dateInput = await DateInputLocator.find()
        const input = await dateInput.findInput()
        await input.click()
        expect(onRequestShowCalendar).to.have.been.calledOnce()
      })

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call onRequestShowCalendar when input receives space event', async () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
        const onRequestShowCalendar = stub()
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        await mount(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestShowCalendar={onRequestShowCalendar}
          >
            {generateDays()}
          </DateInput>
        )

        const dateInput = await DateInputLocator.find()
        const input = await dateInput.findInput()
        await input.keyDown('space')
        expect(onRequestShowCalendar).to.have.been.calledOnce()
      })

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should not call onRequestShowCalendar when input receives space event if calendar is already showing', async () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
        const onRequestShowCalendar = stub()
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        await mount(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestShowCalendar={onRequestShowCalendar}
            isShowingCalendar
          >
            {generateDays()}
          </DateInput>
        )

        const dateInput = await DateInputLocator.find()
        const input = await dateInput.findInput()
        await input.keyDown('space')
        expect(onRequestShowCalendar).to.not.have.been.called()
      })

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call onRequestShowCalendar when input receives down arrow event', async () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
        const onRequestShowCalendar = stub()
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        await mount(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestShowCalendar={onRequestShowCalendar}
          >
            {generateDays()}
          </DateInput>
        )

        const dateInput = await DateInputLocator.find()
        const input = await dateInput.findInput()
        await input.keyDown('down')
        expect(onRequestShowCalendar).to.have.been.calledOnce()
      })

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should not call onRequestShowCalendar when input receives down arrow event if calendar is already showing', async () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
        const onRequestShowCalendar = stub()
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        await mount(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestShowCalendar={onRequestShowCalendar}
            isShowingCalendar
          >
            {generateDays()}
          </DateInput>
        )

        const dateInput = await DateInputLocator.find()
        const input = await dateInput.findInput()
        await input.keyDown('down')
        expect(onRequestShowCalendar).to.not.have.been.called()
      })

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call onRequestShowCalendar when input receives up arrow event', async () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
        const onRequestShowCalendar = stub()
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        await mount(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestShowCalendar={onRequestShowCalendar}
          >
            {generateDays()}
          </DateInput>
        )

        const dateInput = await DateInputLocator.find()
        const input = await dateInput.findInput()
        await input.keyDown('up')
        expect(onRequestShowCalendar).to.have.been.calledOnce()
      })

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should not call onRequestShowCalendar when input receives up arrow event if calendar is already showing', async () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
        const onRequestShowCalendar = stub()
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        await mount(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestShowCalendar={onRequestShowCalendar}
            isShowingCalendar
          >
            {generateDays()}
          </DateInput>
        )

        const dateInput = await DateInputLocator.find()
        const input = await dateInput.findInput()
        await input.keyDown('up')
        expect(onRequestShowCalendar).to.not.have.been.called()
      })

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call onRequestShowCalendar when input receives onChange event', async () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
        const onRequestShowCalendar = stub()
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        await mount(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestShowCalendar={onRequestShowCalendar}
          >
            {generateDays()}
          </DateInput>
        )

        const dateInput = await DateInputLocator.find()
        const input = await dateInput.findInput()
        await input.change({ target: { value: 'January 5' } })
        expect(onRequestShowCalendar).to.have.been.calledOnce()
      })

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should not call onRequestShowCalendar when disabled', async () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
        const onRequestShowCalendar = stub()
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        await mount(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestShowCalendar={onRequestShowCalendar}
            interaction="disabled"
          >
            {generateDays()}
          </DateInput>
        )

        const dateInput = await DateInputLocator.find()
        await dateInput.click()

        const input = await dateInput.findInput()
        await input.click(null, { clickable: false })
        await input.keyDown('up', null, { focusable: false })
        await input.keyDown('down', null, { focusable: false })
        await input.keyDown('space', null, { focusable: false })
        await input.change({ target: { value: 'January 5' } })

        expect(onRequestShowCalendar).to.not.have.been.called()
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('onRequestHideCalendar and onRequestValidateDate', async () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call onRequestHideCalendar and onRequestValidateDate input receives onBlur event', async () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
        const onRequestHideCalendar = stub()
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
        const onRequestValidateDate = stub()

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        await mount(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestHideCalendar={onRequestHideCalendar}
            onRequestValidateDate={onRequestValidateDate}
            isShowingCalendar
          >
            {generateDays()}
          </DateInput>
        )

        const dateInput = await DateInputLocator.find()
        const input = await dateInput.findInput()
        await input.blur()
        expect(onRequestHideCalendar).to.have.been.calledOnce()
        expect(onRequestValidateDate).to.have.been.calledOnce()
      })

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call onRequestHideCalendar and onRequestValidateDate when input receives esc event', async () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
        const onRequestHideCalendar = stub()
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
        const onRequestValidateDate = stub()

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        await mount(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestHideCalendar={onRequestHideCalendar}
            onRequestValidateDate={onRequestValidateDate}
            isShowingCalendar
          >
            {generateDays()}
          </DateInput>
        )

        const dateInput = await DateInputLocator.find()
        const input = await dateInput.findInput()
        await input.keyUp('esc')
        expect(onRequestHideCalendar).to.have.been.calledOnce()
        expect(onRequestValidateDate).to.have.been.calledOnce()
      })

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call onRequestHideCalendar and onRequestValidateDate when input receives enter event', async () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
        const onRequestHideCalendar = stub()
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
        const onRequestValidateDate = stub()

        const days = generateDays()
        days[4] = (
          <Calendar.Day key="4" label="4" date="2019-09-28" isSelected>
            {4}
          </Calendar.Day>
        )

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        await mount(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestHideCalendar={onRequestHideCalendar}
            onRequestValidateDate={onRequestValidateDate}
            isShowingCalendar
          >
            {days}
          </DateInput>
        )

        const dateInput = await DateInputLocator.find()
        const input = await dateInput.findInput()
        await input.keyDown('enter')
        expect(onRequestHideCalendar).to.have.been.calledOnce()
        expect(onRequestValidateDate).to.have.been.calledOnce()
      })

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call onRequestHideCalendar and onRequestValidateDate when date is selected', async () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
        const onRequestHideCalendar = stub()
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
        const onRequestValidateDate = stub()

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        await mount(
          <DateInput
            renderLabel="Choose date"
            renderWeekdayLabels={weekdayLabels}
            onRequestHideCalendar={onRequestHideCalendar}
            onRequestValidateDate={onRequestValidateDate}
            isShowingCalendar
          >
            {generateDays()}
          </DateInput>
        )

        const dateInput = await DateInputLocator.find()
        const calendar = await dateInput.findCalendar()
        const day = await calendar.findDay()

        await day.click()

        expect(onRequestHideCalendar).to.have.been.calledOnce()
        expect(onRequestValidateDate).to.have.been.calledOnce()
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should call onRequestHideCalendar and onRequestValidateDate when date is selected and is outside month', async () => {
      const days = generateDays()
      days[5] = (
        <Calendar.Day key="5" label="5" date="2019-09-28" isOutsideMonth>
          outside
        </Calendar.Day>
      )

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onRequestHideCalendar = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onRequestValidateDate = stub()

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          onRequestHideCalendar={onRequestHideCalendar}
          onRequestValidateDate={onRequestValidateDate}
          isShowingCalendar
        >
          {days}
        </DateInput>
      )

      const dateInput = await DateInputLocator.find()
      const calendar = await dateInput.findCalendar()
      const day = await calendar.findDay(':textContent(outside)')

      await day.click()

      expect(onRequestHideCalendar).to.have.been.calledOnce()
      expect(onRequestValidateDate).to.have.been.calledOnce()
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should call onRequestSelectNextDay on down arrow if calendar is showing', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onRequestSelectNextDay = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const subject = await mount(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          onRequestSelectNextDay={onRequestSelectNextDay}
        >
          {generateDays()}
        </DateInput>
      )

      const dateInput = await DateInputLocator.find()
      const input = await dateInput.findInput()
      await input.keyDown('down')
      expect(onRequestSelectNextDay).to.not.have.been.called()

      await subject.setProps({ isShowingCalendar: true })

      await input.keyDown('down')
      expect(onRequestSelectNextDay).to.have.been.calledOnce()
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should call onRequestSelectNextDay on up arrow if calendar is showing', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onRequestSelectPrevDay = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const subject = await mount(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          onRequestSelectPrevDay={onRequestSelectPrevDay}
        >
          {generateDays()}
        </DateInput>
      )

      const dateInput = await DateInputLocator.find()
      const input = await dateInput.findInput()
      await input.keyDown('up')
      expect(onRequestSelectPrevDay).to.not.have.been.called()

      await subject.setProps({ isShowingCalendar: true })

      await input.keyDown('up')
      expect(onRequestSelectPrevDay).to.have.been.calledOnce()
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should call onRequestRenderNextMonth and onRequestRenderPrevMonth when calendar arrow buttons are clicked', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onRequestRenderNextMonth = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onRequestRenderPrevMonth = stub()

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          onRequestRenderNextMonth={onRequestRenderNextMonth}
          onRequestRenderPrevMonth={onRequestRenderPrevMonth}
          renderNextMonthButton={<button>next</button>}
          renderPrevMonthButton={<button>prev</button>}
          isShowingCalendar
        >
          {generateDays()}
        </DateInput>
      )

      const dateInput = await DateInputLocator.find()
      const calendar = await dateInput.findCalendar()

      const nextButton = await calendar.findWithLabel('next')
      const prevButton = await calendar.findWithLabel('prev')

      await nextButton.click()
      await prevButton.click()

      expect(onRequestRenderNextMonth).to.have.been.calledOnce()
      expect(onRequestRenderPrevMonth).to.have.been.calledOnce()
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render calendar navigation label', async () => {
      const label = 'January 2019'
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          renderNavigationLabel={<div>{label}</div>}
          isShowingCalendar
        >
          {generateDays()}
        </DateInput>
      )

      const dateInput = await DateInputLocator.find()
      const calendar = await dateInput.findCalendar()
      expect(await calendar.findWithText(label)).to.exist()
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render calendar weekday labels', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          isShowingCalendar
        >
          {generateDays()}
        </DateInput>
      )

      const dateInput = await DateInputLocator.find()
      const calendar = await dateInput.findCalendar()

      const headers = await calendar.findAll('th')
      expect(headers.length).to.equal(7)

      weekdayLabels.forEach((label, i) => {
        expect(label).to.equal(headers[i].getTextContent())
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render all focusable elements in calendar with tabIndex="-1"', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          renderNextMonthButton={<button>next</button>}
          renderPrevMonthButton={<button>prev</button>}
          isShowingCalendar
        >
          {generateDays()}
        </DateInput>
      )

      const dateInput = await DateInputLocator.find()
      const calendar = await dateInput.findCalendar()

      const focusableElements = await calendar.findAll(':focusable')

      // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
      focusableElements.forEach((element, i) => {
        expect(element.getAttribute('tabIndex')).to.equal('-1')
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render days with the correct role', async () => {
      const days = generateDays()
      days[5] = (
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        <Calendar.Day key="5" label="5" date="2019-09-28" id="5" isOutsideMonth>
          outside
        </Calendar.Day>
      )

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          isShowingCalendar
        >
          {days}
        </DateInput>
      )

      const dateInput = await DateInputLocator.find()
      const calendar = await dateInput.findCalendar()
      const results = await calendar.findAllDays()

      // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'day' implicitly has an 'any' type.
      results.forEach((day) => {
        if (day.getTextContent().includes('outside')) {
          expect(day.getAttribute('role')).to.equal('presentation')
        } else {
          expect(day.getAttribute('role')).to.equal('option')
        }
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should assign aria-selected to the selected date and link it to the input', async () => {
      const days = generateDays()
      days[7] = (
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        <Calendar.Day key="7" label="7" date="2019-09-28" id="7" isSelected>
          selected
        </Calendar.Day>
      )

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <DateInput
          renderLabel="Choose date"
          renderWeekdayLabels={weekdayLabels}
          isShowingCalendar
        >
          {days}
        </DateInput>
      )

      const dateInput = await DateInputLocator.find()
      const calendar = await dateInput.findCalendar()
      const results = await calendar.findAllDays()

      // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'day' implicitly has an 'any' type.
      results.forEach((day) => {
        if (day.getTextContent().includes('selected')) {
          expect(day.getAttribute('aria-selected')).to.equal('true')
        } else {
          expect(day.getAttribute('aria-selected')).to.equal('false')
        }
      })

      const input = await dateInput.findInput()
      const selectedDay = await calendar.findDay(':textContent(selected)')

      expect(input.getAttribute('aria-activedescendant')).to.equal(
        selectedDay.getAttribute('id')
      )
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('with generated examples', async () => {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ propValues: { placement: (stri... Remove this comment to see the full error message
    generateA11yTests(Examples)
  })
})
