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

import moment from 'moment-timezone'
import 'cypress-real-events'

import '../support/component'
import { TimeSelect } from '@instructure/ui/latest'
import { DateTime } from '@instructure/ui-i18n'

describe('<TimeSelect/>', () => {
  it('should render an input and list', async () => {
    cy.mount(<TimeSelect renderLabel="Choose a time" />)

    cy.get('input[id^="Select_"]').as('input')
    cy.contains('ul[id^="Selectable_"]').should('not.exist')

    cy.get('@input').realClick()

    cy.get('ul[id^="Selectable_"]').should('exist')
  })

  it('should fire onChange when selected option changes', async () => {
    const onChange = cy.spy()
    cy.mount(
      <TimeSelect
        renderLabel="Choose a time"
        timezone="US/Eastern"
        onChange={onChange}
      />
    )
    cy.get('input[id^="Select_"]').as('input')
    cy.contains('ul[class$="-options__list"]').should('not.exist')

    cy.get('@input').click()

    cy.get('ul[class$="-options__list"]').should('be.visible')
    cy.get('li[class$="-optionItem"]').eq(0).as('option1')
    cy.get('@option1').should('have.text', '00:00')

    cy.get('@option1').click()

    cy.get('@input').should('have.value', '00:00')
    cy.wrap(onChange)
      .should('have.been.called')
      .then((spy) => {
        expect(spy.lastCall.args[1]).to.have.property('value')
        expect(spy.lastCall.args[1]).to.have.property('inputText', '00:00')
      })
  })

  it('should fire onChange when input field is cleared and blurred and allowClearingSelection is true', async () => {
    const onChange = cy.spy()
    cy.mount(
      <TimeSelect
        renderLabel="Choose a time"
        timezone="US/Eastern"
        onChange={onChange}
        allowClearingSelection={true}
      />
    )
    cy.get('input[id^="Select_"]').as('input')

    cy.get('@input').click()

    cy.get('li[class$="-optionItem"]').eq(0).click()

    cy.get('@input').click()
    cy.get('@input').clear()
    cy.get('@input').blur()

    cy.wrap(onChange)
      .should('have.been.called')
      .then((spy) => {
        expect(spy.lastCall.args[1]).to.have.property('value', '')
        expect(spy.lastCall.args[1]).to.have.property('inputText', '')
      })
  })

  it('should behave uncontrolled', async () => {
    const onChange = cy.spy()
    cy.mount(<TimeSelect renderLabel="Choose a time" onChange={onChange} />)

    cy.get('input[id^="Select_"]').as('input')
    cy.get('@input').should('have.value', '')

    cy.get('@input').click()

    cy.get('li[class$="-optionItem"]').eq(0).as('option1')

    cy.get('@option1').click()

    cy.get('@input').should('have.value', '00:00')
  })

  it('should behave controlled', async () => {
    const onChange = cy.spy()
    let selectedValue = ''
    const initialTestValue = moment
      .tz('1986-05-17T05:00:00.000Z', moment.ISO_8601, 'en', 'US/Eastern')
      .toISOString()

    cy.mount(
      <TimeSelect
        renderLabel="Choose an option"
        value={initialTestValue}
        timezone="US/Eastern"
        onChange={onChange}
      />
    )
    cy.get('input[id^="Select_"]').as('input')
    cy.get('@input').should('have.value', '01:00')

    cy.get('@input').click()

    cy.get('li[class$="-optionItem"]').eq(4).as('option5')
    cy.get('@option5')
      .invoke('text')
      .then((text) => {
        selectedValue = text
      })

    cy.get('@option5').click()

    cy.get('@input').should('have.value', '01:00') // not changed because it's hardcoded
    cy.wrap(onChange)
      .should('have.been.called')
      .then((spy) => {
        const args = spy.lastCall.args[1]

        expect(args.value).to.not.equal(initialTestValue)

        // update component with the new value
        cy.mount(
          <TimeSelect
            renderLabel="Choose an option"
            value={args.value}
            timezone="US/Eastern"
            onChange={onChange}
          />
        )
        cy.get('@input').should('have.value', selectedValue)
      })
  })

  it('Pressing ESC should reset the value in controlled mode', async () => {
    const onChange = cy.spy()
    const onKeyDown = cy.spy()
    const handleInputChange = cy.spy()
    cy.mount(
      <TimeSelect
        renderLabel="Choose a time"
        allowNonStepInput={true}
        value=""
        locale="en_AU"
        timezone="US/Eastern"
        onChange={onChange}
        onInputChange={handleInputChange}
        onKeyDown={onKeyDown}
      />
    )
    cy.get('input[id^="Select_"]').as('input')

    cy.get('@input').realClick().realType('7:45 PM')
    cy.get('@input').realPress('Escape')

    cy.wrap(onChange).should('not.have.been.called')
    cy.wrap(onKeyDown).should('have.been.called')
    cy.wrap(handleInputChange).should('have.been.called')
    cy.get('@input').should('have.value', '')
  })

  it('value should not be changeable via user input in controlled mode', async () => {
    const dateTime = DateTime.parse('2017-05-01T17:30Z', 'en-US', 'GMT')
    cy.mount(
      <TimeSelect
        renderLabel="Choose a time"
        allowNonStepInput={true}
        value={dateTime.toISOString()}
        locale="en_AU"
        timezone="US/Eastern"
      />
    )
    cy.get('input[id^="Select_"]').as('input')

    cy.get('@input').clear().realType('1:45 PM')
    cy.get('@input').realPress('Enter')
    cy.get('@input').blur()

    cy.get('@input').should('have.value', '1:30 PM')
  })

  it('should keep selection when value changes', async () => {
    const onChange = cy.spy()
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const dateTime = DateTime.parse('2017-05-01T17:30Z', locale, timezone)

    cy.mount(
      <TimeSelect
        renderLabel="Choose an option"
        value={dateTime.toISOString()}
        timezone="US/Eastern"
        onChange={onChange}
      />
    )
    cy.get('input[id^="Select_"]').as('input')
    cy.get('@input').should('have.value', '13:30')

    const newDateStr = '2022-03-29T19:00Z'
    const newDateTime = DateTime.parse(newDateStr, locale, timezone)

    cy.mount(
      <TimeSelect
        renderLabel="Choose an option"
        value={newDateTime.toISOString()}
        timezone="US/Eastern"
        onChange={onChange}
      />
    )
    cy.get('input[id^="Select_"]').as('input2')
    cy.get('@input2').should('have.value', '15:00')
  })

  it('should accept values that are not divisible by step', async () => {
    const onChange = cy.spy()
    cy.mount(
      <TimeSelect
        renderLabel="Choose an option"
        timezone="US/Eastern"
        onChange={onChange}
      />
    )
    cy.get('input[id^="Select_"]').as('input')

    // this expectation is needed so TimeSelect generates some default options
    cy.get('@input').should('have.attr', 'value', '')

    const value = moment.tz(
      '1986-05-17T05:02:00.000Z',
      moment.ISO_8601,
      'en',
      'US/Eastern'
    )

    cy.mount(
      <TimeSelect
        renderLabel="Choose an option"
        timezone="US/Eastern"
        onChange={onChange}
        value={value.toISOString()}
      />
    )
    cy.get('@input').should('have.attr', 'value', '01:02')
  })

  it('should use the specified step value', async () => {
    const value = moment.tz(
      '1986-05-17T18:00:00.000Z',
      moment.ISO_8601,
      'en',
      'US/Eastern'
    )
    cy.mount(
      <TimeSelect
        renderLabel="Choose a time"
        timezone="US/Eastern"
        step={15}
        value={value.toISOString()}
      />
    )
    cy.get('input[id^="Select_"]').as('input')

    cy.get('@input').click()

    cy.get('@input').should('have.value', '14:00')

    cy.get('li[class$="-optionItem"]').eq(0).as('option1')
    cy.get('li[class$="-optionItem"]').eq(1).as('option2')
    cy.get('@option1').should('have.text', '00:00')
    cy.get('@option2').should('have.text', '00:15')
  })

  it('should not allow non-step value when allowNonStepInput=false', async () => {
    const onChange = cy.spy()
    cy.mount(
      <TimeSelect
        renderLabel="Choose a time"
        allowNonStepInput={false}
        locale="en_AU"
        timezone="US/Eastern"
        onChange={onChange}
      />
    )
    cy.get('input[id^="Select_"]').as('input')

    cy.get('@input').realClick().realType('7:34 PM')
    cy.get('@input').realPress('Enter') // should not accept the value and send onChange event
    cy.get('@input').realPress('Escape') // should reset the value

    cy.wrap(onChange).should('not.have.been.called')
    cy.get('@input').should('have.value', '')
  })

  it('should allow non-step value when allowNonStepInput=true', async () => {
    const onChange = cy.spy()
    cy.mount(
      <TimeSelect
        renderLabel="Choose a time"
        allowNonStepInput={true}
        locale="en_AU"
        timezone="US/Eastern"
        onChange={onChange}
      />
    )
    cy.get('input[id^="Select_"]').as('input')

    cy.get('@input').realClick().realType('7:34 PM')
    cy.get('@input').blur() // sends onChange event

    cy.wrap(onChange)
      .should('have.been.called')
      .then((spy) => {
        expect(spy.lastCall.args[1]).to.have.property('value')
        cy.get('@input').should('have.attr', 'value', '7:34 PM')
      })
  })

  it('should round down seconds when applicable', async () => {
    const onChange = cy.spy()
    cy.mount(
      <TimeSelect
        renderLabel="Choose a time"
        allowNonStepInput={true}
        locale="en_AU"
        format="LTS" // shows seconds
        timezone="US/Eastern"
        onChange={onChange}
      />
    )
    cy.get('input[id^="Select_"]').as('input')
    cy.get('@input').should('have.value', '')

    cy.get('@input').realClick().realType('04:45:55 AM')
    cy.get('@input').blur() // sends onChange event

    cy.get('@input').should('have.value', '4:45:00 AM')
  })
})
