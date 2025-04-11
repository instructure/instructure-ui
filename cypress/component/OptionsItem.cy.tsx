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

import '../support/component'
import 'cypress-real-events'
import { expect } from 'chai'
import { Options } from '@instructure/ui'
import { IconCheckSolid } from '@instructure/ui-icons'

describe('<OptionsItem/>', () => {
  it('should allow label to recieve focus', async () => {
    const onFocus = cy.spy()
    cy.mount(
      <Options.Item tabIndex={-1} onFocus={onFocus}>
        Hello World
      </Options.Item>
    )
    cy.get('span[role="listitem"]').as('item')

    cy.get('@item').focus()
    cy.wrap(onFocus).should('have.been.called')
    cy.contains('Hello World').should('be.focused')
  })

  it('should render colored icon before label', async () => {
    cy.mount(
      <Options.Item
        renderBeforeLabel={(props) => {
          return (
            <IconCheckSolid
              {...(props.variant === 'default' && { color: 'warning' })}
            />
          )
        }}
      >
        Hello World
      </Options.Item>
    )

    cy.get('[class$="-optionItem__content--before"]')
      .find('svg[name="IconCheck"]')
      .then(($icon) => {
        const iconStyle = getComputedStyle($icon[0])
        expect(iconStyle.color).to.equal('rgb(207, 74, 0)')
      })
  })

  it('should render colored icon after highlighted label', async () => {
    cy.mount(
      <Options.Item
        variant="highlighted"
        renderAfterLabel={(props) => {
          return (
            <IconCheckSolid
              {...(props.variant === 'highlighted' && { color: 'success' })}
            />
          )
        }}
      >
        Hello World
      </Options.Item>
    )
    cy.get('[class$="-optionItem__content--after"]')
      .find('svg[name="IconCheck"]')
      .then(($icon) => {
        const iconStyle = getComputedStyle($icon[0])
        expect(iconStyle.color).to.equal('rgb(3, 137, 61)')
      })
  })
})
