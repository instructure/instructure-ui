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
import { expect, mount, stub } from '@instructure/ui-test-utils'

import { DateTime } from '@instructure/ui-i18n'

import { isSameDay } from "../../utils/dateHelpers"

import { DatePicker } from '../index'

import DatePickerLocator from '../locator'
import styles from '../styles.css'

describe('<DatePicker />', async () => {
  it('styles today date', async () => {
    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-06-01"
        defaultSelectedValue="2017-06-02"
      />
    )
    const datePicker = await DatePickerLocator.find()
    const currentDate = await datePicker.findCurrentDate()

    expect(currentDate).to.exist()
    expect(currentDate.hasClass(styles.today)).to.be.true()
  })

  it('styles the selected date', async () => {
    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-06-01"
        defaultSelectedValue="2017-06-02"
      />
    )
    const datePicker = await DatePickerLocator.find()
    const selectedDate = await datePicker.findSelectedDate()

    expect(selectedDate).to.exist()
    expect(selectedDate.hasClass(styles.selected)).to.be.true()
  })

  it('styles dates outside the selected month', async () => {
    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-06-01"
        defaultSelectedValue="2017-06-02"
      />
    )

    const datePicker = await DatePickerLocator.find()
    const outside = await datePicker.findDate(':textContent(31)')

    expect(outside).to.exist()
    expect(outside.hasClass(styles.outside)).to.be.true()
  })

  it('fires onSelectedChange when date is clicked', async () => {
    const onSelectedChange = stub()

    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-06-01"
        onSelectedChange={onSelectedChange}
      />
    )

    const datePicker = await DatePickerLocator.find()
    const cell = await datePicker.findDate(':textContent(31)')

    await cell.click()

    expect(onSelectedChange).to.have.been.called()
    const onChangeArg = onSelectedChange.getCall(0).args[1]
    expect(DateTime.isValid(onChangeArg)).to.be.ok()
    expect(cell.getDOMNode().disabled).to.equal(false)
  })

  it('should disable the date if the day is in disabledDaysOfWeek', async () => {
    const onSelectedChange = stub()
    const disabledDaysOfWeek = [1, 6]

    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-06-01"
        onSelectedChange={onSelectedChange}
        disabledDaysOfWeek={disabledDaysOfWeek}
      />
    )

    const datePicker = await DatePickerLocator.find()
    const dates = await datePicker.findAllDates()

    dates.forEach((date, i) => {
      if (disabledDaysOfWeek.includes(i % 7)) {
        expect(date.getDOMNode().disabled).to.be.true()
      } else {
        expect(date.getDOMNode().disabled).to.be.false()
      }
    })

    const disabled = await datePicker.findDate('[disabled]')
    await disabled.click()

    expect(onSelectedChange).to.not.have.been.called()
  })

  it('should disable the date if the day is in disabledDays', async () => {
    const onSelectedChange = stub()
    const disabledDays = [new Date(2017, 5, 5)]

    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-06-01"
        onSelectedChange={onSelectedChange}
        disabledDays={disabledDays}
      />
    )

    const datePicker = await DatePickerLocator.find()
    const dates = await datePicker.findAllDates()

    const date = dates[8]
    await date.click()

    expect(onSelectedChange).to.not.have.been.called()
    expect(date.getDOMNode().disabled).to.equal(true)
  })

  it('should disable the day if the disabledDays callback returns true', async () => {
    const disabledDays = (day) => true
    const onSelectedChange = stub()

    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-06-01"
        onSelectedChange={onSelectedChange}
        disabledDays={disabledDays}
      />
    )

    const datePicker = await DatePickerLocator.find()
    const dates = await datePicker.findAllDates()

    dates.forEach((date, i) => {
      expect(date.getDOMNode().disabled).to.be.true()
    })
    const date = await datePicker.findDate()
    await date.click()

    expect(onSelectedChange).to.not.have.been.called()
  })

  it('fires onRenderedChange when next arrow is clicked', async () => {
    const onRenderedChange = stub()

    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-06-01"
        onRenderedChange={onRenderedChange}
      />
    )

    const datePicker = await DatePickerLocator.find()
    const nextButton = await datePicker.find('button:label(bar)')

    await nextButton.click()

    expect(onRenderedChange).to.have.been.called()
    const onChangeArg = onRenderedChange.getCall(0).args[1]
    expect(DateTime.isValid(onChangeArg)).to.be.ok()
  })

  it('fires onRenderedChange when previous arrow is clicked', async () => {
    const onRenderedChange = stub()

    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-06-01"
        onRenderedChange={onRenderedChange}
      />
    )

    const datePicker = await DatePickerLocator.find()
    const prevButton = await datePicker.find('button:label(foo)')

    await prevButton.click()

    expect(onRenderedChange).to.have.been.called()
    const onChangeArg = onRenderedChange.getCall(0).args[1]
    expect(DateTime.isValid(onChangeArg)).to.be.ok()
  })

  it('localizes the calendar layout', async () => {
    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-06-01"
        locale="fr"
      />
    )

    const datePicker = await DatePickerLocator.find()

    expect(await datePicker.find('[aria-hidden]:contains(lu)')).to.exist()
    expect(await datePicker.find(':contains(lundi)')).to.exist()
  })

  it('localizes the header', async () => {
    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-06-01"
        locale="fr"
        defaultRenderedValue="2017-01-01"
      />
    )

    const datePicker = await DatePickerLocator.find()

    expect(await datePicker.find(':contains(janvier)')).to.exist()
    expect(await datePicker.find(':contains(2017)')).to.exist()
  })

  it('uses the specified timezone', async () => {
    const onSelectedChange = stub()

    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-06-01"
        defaultRenderedValue="2017-05-01"
        timezone="Europe/Paris"
        onSelectedChange={onSelectedChange}
      />
    )

    const datePicker = await DatePickerLocator.find()
    const cell = await datePicker.findDate(':textContent(30)')
    await cell.click()

    expect(onSelectedChange).to.have.been.called()
    expect(onSelectedChange.getCall(0).args[1]).to.include('2017-04-30T00:00:00+02:00')
  })

  it('gets locale and timezone from context', async () => {
    let datePicker = null

    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-06-01"
        locale="fr"
        timezone="Europe/Paris"
        componentRef={(el) => { datePicker = el }}
      />
    )

    expect(datePicker.locale).to.equal('fr')
    expect(datePicker.timezone).to.equal('Europe/Paris')
  })

  it('overrides locale and timezone context with properties', async () => {
    let datePicker = null

    const subject = await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-06-01"
        locale="ja"
        timezone="Asia/Tokyo"
        componentRef={(el) => { datePicker = el }}
      />
    )

    await subject.setContext({
      locale: 'fr',
      timezone: 'Europe/Paris'
    })

    expect(datePicker.locale).to.equal('ja')
    expect(datePicker.timezone).to.equal('Asia/Tokyo')
  })

  it('defaults the selected value to the today value', async () => {
    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-04-01"
      />
    )

    const datePicker = await DatePickerLocator.find()
    const selectedDate = await datePicker.findSelectedDate()

    expect(await datePicker.find(':contains(April)')).to.exist()
    expect(await datePicker.find(':contains(2017)')).to.exist()

    expect(selectedDate.getTextContent()).to.equal('1')
  })

  it('defaults the rendered value to the selected value', async () => {
    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-04-01"
        defaultSelectedValue="2018-05-02"
      />
    )

    const datePicker = await DatePickerLocator.find()
    const selectedDate = await datePicker.findSelectedDate()

    expect(await datePicker.find(':contains(May)')).to.exist()
    expect(await datePicker.find(':contains(2018)')).to.exist()

    expect(selectedDate.getTextContent()).to.equal('2')
  })

  it('should focus next day on key right', async () => {
    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-04-01"
        defaultSelectedValue="2017-05-17"
        timezone="Europe/Paris"
      />
    )

    const datePicker = await DatePickerLocator.find()
    const currentDate = await datePicker.findDate(':textContent(17)')
    const nextDate = await datePicker.findDate(':textContent(18)')

    await currentDate.keyDown('right')

    expect(nextDate.focused()).to.be.true()
  })

  it('should focus previous day on key left', async () => {
    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-04-01"
        defaultSelectedValue="2017-05-17"
        timezone="Europe/Paris"
      />
    )

    const datePicker = await DatePickerLocator.find()

    const currentDate = await datePicker.findDate(':textContent(17)')
    const prevDate = await datePicker.findDate(':textContent(16)')

    await currentDate.keyDown('left')

    expect(prevDate.focused()).to.be.true()
  })

  it('should focus next week on key down', async () => {
    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-04-01"
        defaultSelectedValue="2017-05-17"
        timezone="Europe/Paris"
      />
    )

    const datePicker = await DatePickerLocator.find()

    const currentDate = await datePicker.findDate(':textContent(17)')
    const nextDate = await datePicker.findDate(':textContent(24)')

    await currentDate.keyDown('down')

    expect(nextDate.focused()).to.be.true()
  })

  it('should focus previous week on key up', async () => {
    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-04-01"
        defaultSelectedValue="2017-05-17"
        timezone="Europe/Paris"
      />
    )

    const datePicker = await DatePickerLocator.find()

    const currentDate = await datePicker.findDate(':textContent(17)')
    const prevDate = await datePicker.findDate(':textContent(10)')

    await currentDate.keyDown('up')

    expect(prevDate.focused()).to.be.true()
  })

  it('should skip disabled days on key right', async () => {
    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-04-01"
        defaultSelectedValue="2017-05-17"
        timezone="Europe/Paris"
        disabledDays={[new Date(2017, 4, 18)]}
      />
    )

    const datePicker = await DatePickerLocator.find()

    const currentDate = await datePicker.findDate(':textContent(17)')
    const nextDate = await datePicker.findDate(':textContent(19)')

    await currentDate.keyDown('right')

    expect(nextDate.focused()).to.be.true()
  })

  it('should skip disabled days on key left', async () => {
    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-04-01"
        defaultSelectedValue="2017-05-17"
        timezone="Europe/Paris"
        disabledDays={[new Date(2017, 4, 16)]}
      />
    )

    const datePicker = await DatePickerLocator.find()

    const currentDate = await datePicker.findDate(':textContent(17)')
    const prevDate = await datePicker.findDate(':textContent(15)')

    await currentDate.keyDown('left')

    expect(prevDate.focused()).to.be.true()
  })

  it('should skip disabled days on key down', async () => {
    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-04-01"
        defaultSelectedValue="2017-05-17"
        timezone="Europe/Paris"
        disabledDays={[new Date(2017, 4, 24)]}
      />
    )

    const datePicker = await DatePickerLocator.find()

    const currentDate = await datePicker.findDate(':textContent(17)')
    const nextDate = await datePicker.findDate(':textContent(31)')

    await currentDate.keyDown('down')

    expect(nextDate.focused()).to.be.true()
  })

  it('should skip disabled days on key up', async () => {
    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-04-01"
        defaultSelectedValue="2017-05-17"
        timezone="Europe/Paris"
        disabledDays={[new Date(2017, 4, 10)]}
      />
    )

    const datePicker = await DatePickerLocator.find()

    const currentDate = await datePicker.findDate(':textContent(17)')
    const prevDate = await datePicker.findDate(':textContent(3)')

    await currentDate.keyDown('up')

    expect(prevDate.focused()).to.be.true()
  })

  it('should stay on the current day on arrow change if more than the the following 60 days are disabled', async () => {
    const defaultSelectedValue = "2017-05-01"
    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-04-01"
        defaultSelectedValue={defaultSelectedValue}
        timezone="Europe/Paris"
        disabledDays={(date) => !isSameDay(date, defaultSelectedValue)}
      />
    )

    const datePicker = await DatePickerLocator.find()
    const date = await datePicker.findDate(':textContent(1)')

    await date.focus()
    await date.keyDown('right')

    expect(date.focused()).to.be.true()
  })

  it('should move slider to a different month when focus moves out of month', async () => {
    const onRenderedChange = stub()

    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-04-01"
        defaultSelectedValue="2017-05-01"
        onRenderedChange={onRenderedChange}
      />
    )

    const datePicker = await DatePickerLocator.find()
    const date = await datePicker.findDate(':textContent(1)')

    await date.keyDown('left')

    expect(onRenderedChange).to.have.been.called()
  })

  it('should move slider to a different month when date is selected out of month', async () => {
    const onRenderedChange = stub()

    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-04-01"
        defaultSelectedValue="2017-05-01"
        onRenderedChange={onRenderedChange}
      />
    )

    const datePicker = await DatePickerLocator.find()
    const date = await datePicker.findDate(':textContent(30)')

    await date.click()

    expect(onRenderedChange).to.have.been.called()
  })

  it('should meet a11y standards', async () => {
    await mount(
      <DatePicker
        previousLabel="foo"
        nextLabel="bar"
        todayValue="2017-04-02"
        defaultSelectedValue="2017-04-01"
        defaultRenderedValue="2017-04-01"
      />
    )

    const datePicker = await DatePickerLocator.find()
    expect(await datePicker.accessible()).to.be.true()
  })
})
