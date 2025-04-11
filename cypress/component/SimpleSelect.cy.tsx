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

import { SimpleSelect } from '@instructure/ui'
import 'cypress-real-events'
import '../support/component'

type ExampleOption = 'foo' | 'bar' | 'baz'
const defaultOptions: ExampleOption[] = ['foo', 'bar', 'baz']

const getOptions = (disabled?: ExampleOption) =>
  defaultOptions.map((opt) => (
    <SimpleSelect.Option
      id={opt}
      key={opt}
      value={opt}
      isDisabled={opt === disabled}
    >
      {opt}
    </SimpleSelect.Option>
  ))

describe('<SimpleSelect/>', () => {
  it('should have role button in Safari', async () => {
    let originalUserAgent

    // Save the original userAgent and mock it to Safari
    cy.window().then((win) => {
      originalUserAgent = win.navigator.userAgent
      Object.defineProperty(win.navigator, 'userAgent', {
        value:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15',
        configurable: true
      })
    })

    cy.mount(
      <SimpleSelect renderLabel="Choose an option">{getOptions()}</SimpleSelect>
    )

    cy.get('input').should('have.attr', 'role', 'button')

    // Restore the original userAgent
    cy.window().then((win) => {
      Object.defineProperty(win.navigator, 'userAgent', {
        value: originalUserAgent,
        configurable: true
      })
    })
  })

  it('should have role combobox in different browsers than Safari', async () => {
    cy.mount(
      <SimpleSelect renderLabel="Choose an option">{getOptions()}</SimpleSelect>
    )

    cy.get('input').should('have.attr', 'role', 'combobox')
  })

  it('should fire onChange when selected option changes', async () => {
    const onChange = cy.spy()
    cy.mount(
      <SimpleSelect renderLabel="Choose an option" onChange={onChange}>
        {getOptions()}
      </SimpleSelect>
    )
    cy.get('input').click()
    cy.get('[role="option"]').eq(1).realClick()

    cy.wrap(onChange).should('have.been.calledOnce')
    cy.wrap(onChange)
      .its('lastCall.args.1.id')
      .should('equal', defaultOptions[1])
  })

  it('should behave uncontrolled', async () => {
    const onChange = cy.spy()
    cy.mount(
      <SimpleSelect renderLabel="Choose an option" onChange={onChange}>
        {getOptions()}
      </SimpleSelect>
    )
    cy.get('input').should('have.value', defaultOptions[0])

    cy.get('input').click()
    cy.get('[role="option"]').eq(1).realClick()

    cy.get('input').should('have.value', defaultOptions[1])
    cy.wrap(onChange).should('have.been.calledOnce')
    cy.wrap(onChange)
      .its('lastCall.args.1.id')
      .should('equal', defaultOptions[1])
  })

  it('should behave controlled', async () => {
    const onChange = cy.spy()

    cy.mount(
      <SimpleSelect
        renderLabel="Choose an option"
        value={defaultOptions[1]}
        onChange={onChange}
      >
        {getOptions()}
      </SimpleSelect>
    )
    cy.get('input').should('have.value', defaultOptions[1])

    cy.get('input').click()
    cy.get('[role="option"]').eq(2).realClick()

    cy.get('input').should('have.value', defaultOptions[1])
    cy.wrap(onChange).should('have.been.calledOnce')
    cy.wrap(onChange)
      .its('lastCall.args.1.id')
      .should('equal', defaultOptions[2])

    cy.mount(
      <SimpleSelect
        renderLabel="Choose an option"
        value={defaultOptions[2]}
        onChange={onChange}
      >
        {getOptions()}
      </SimpleSelect>
    )
    cy.get('input').should('have.value', defaultOptions[2])
  })
})
