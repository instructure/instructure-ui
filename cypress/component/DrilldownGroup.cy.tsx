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

import 'cypress-real-events'

import { Drilldown } from '@instructure/ui'
import '../support/component'

function mountDrilldown(selectableType, defaultSelected) {
  cy.mount(
    <Drilldown rootPageId="page0">
      <Drilldown.Page id="page0">
        <Drilldown.Group
          id="group0"
          selectableType={selectableType}
          defaultSelected={defaultSelected}
        >
          <Drilldown.Option id="groupOption0" value="item0">
            Option0
          </Drilldown.Option>
          <Drilldown.Option id="groupOption1" value="item1">
            Option1
          </Drilldown.Option>
          <Drilldown.Option id="groupOption2" value="item2">
            Option2
          </Drilldown.Option>
        </Drilldown.Group>
      </Drilldown.Page>
    </Drilldown>
  )
}

describe('<DrilldownGroup/>', () => {
  it('should toggle the selected option only when selectableType is multiple', async () => {
    const selectedValues = ['item0', 'item1', 'item2']
    const selectableType = 'multiple'

    mountDrilldown(selectableType, selectedValues)

    cy.get('[role="menuitemcheckbox"]').each(($option) => {
      cy.wrap($option).should('have.attr', 'aria-checked', 'true')
    })

    cy.get('[role="menuitemcheckbox"]').eq(1).realClick()

    cy.get('[role="menuitemcheckbox"]')
      .eq(0)
      .should('have.attr', 'aria-checked', 'true')
    cy.get('[role="menuitemcheckbox"]')
      .eq(1)
      .should('have.attr', 'aria-checked', 'false')
    cy.get('[role="menuitemcheckbox"]')
      .eq(2)
      .should('have.attr', 'aria-checked', 'true')
  })

  it('should toggle options in radio fashion when selectableType is single', async () => {
    const selectedValues = ['item0']
    const selectableType = 'single'

    mountDrilldown(selectableType, selectedValues)

    cy.get('[role="menuitemradio"]')
      .eq(0)
      .should('have.attr', 'aria-checked', 'true')
    cy.get('[role="menuitemradio"]')
      .eq(1)
      .should('have.attr', 'aria-checked', 'false')
    cy.get('[role="menuitemradio"]')
      .eq(2)
      .should('have.attr', 'aria-checked', 'false')

    cy.get('[role="menuitemradio"]').eq(1).realClick()

    cy.get('[role="menuitemradio"]')
      .eq(0)
      .should('have.attr', 'aria-checked', 'false')
    cy.get('[role="menuitemradio"]')
      .eq(1)
      .should('have.attr', 'aria-checked', 'true')
    cy.get('[role="menuitemradio"]')
      .eq(2)
      .should('have.attr', 'aria-checked', 'false')
  })

  it('should themeOverride prop passed to the Options component', async () => {
    cy.mount(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0">
          <Drilldown.Group
            id="group0"
            renderGroupTitle="Group label"
            themeOverride={{ labelColor: 'rgb(100, 0, 0)' }}
          >
            <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
            <Drilldown.Option id="groupOption02">Option</Drilldown.Option>
          </Drilldown.Group>
        </Drilldown.Page>
      </Drilldown>
    )

    cy.contains('[role="presentation"]', 'Group label')
      .should('exist')
      .and('have.css', 'color', 'rgb(100, 0, 0)')
  })
})
