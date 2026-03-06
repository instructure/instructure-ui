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

import { Table } from '@instructure/ui/latest'

describe('<Table/>', () => {
  const TestTable = ({
    setHoverStateTo,
    hover
  }: {
    setHoverStateTo?: boolean
    hover?: boolean
  }) => (
    <Table caption="Test table" hover={hover}>
      <Table.Head>
        <Table.Row data-testid="target-row" setHoverStateTo={setHoverStateTo}>
          <Table.ColHeader id="foo">ColHeader</Table.ColHeader>
          <Table.ColHeader id="bar">Bar-header</Table.ColHeader>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row data-testid="control-row">
          <Table.RowHeader>RowHeader</Table.RowHeader>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )

  it('can render table head as a combobox when in stacked layout', async () => {
    const sortFoo = cy.stub()
    cy.mount(
      <Table caption="Sortable table" layout="stacked">
        <Table.Head>
          <Table.Row>
            <Table.ColHeader id="id" onRequestSort={sortFoo}>
              Foo
            </Table.ColHeader>
            <Table.ColHeader id="bar" onRequestSort={sortFoo}>
              Bar
            </Table.ColHeader>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row></Table.Row>
          <Table.Row></Table.Row>
        </Table.Body>
      </Table>
    )

    const input = cy.get('input[role="combobox"]')

    input.click()

    cy.get('[role="option"]').first().click()

    cy.wrap(sortFoo).should('have.been.calledOnce')
  })

  it('should highlight row when setHoverStateTo is set to true', () => {
    cy.mount(<TestTable />)

    cy.get('[data-testid="target-row"]')
      .invoke('css', 'border-left-color')
      .then((initialTargetColor) => {
        cy.get('[data-testid="control-row"]')
          .invoke('css', 'border-left-color')
          .then((initialControlColor) => {
            cy.mount(<TestTable setHoverStateTo={true} />)

            cy.get('[data-testid="target-row"]').should(
              'not.have.css',
              'border-left-color',
              initialTargetColor
            )

            cy.get('[data-testid="control-row"]').should(
              'have.css',
              'border-left-color',
              initialControlColor
            )
          })
      })
  })

  it('should not highlight row when setHoverStateTo is set to false', () => {
    cy.mount(<TestTable />)

    cy.get('[data-testid="target-row"]')
      .invoke('css', 'border-left-color')
      .then((initialTargetColor) => {
        cy.get('[data-testid="control-row"]')
          .invoke('css', 'border-left-color')
          .then((initialControlColor) => {
            cy.mount(<TestTable setHoverStateTo={false} />)

            cy.get('[data-testid="target-row"]').should(
              'have.css',
              'border-left-color',
              initialTargetColor
            )

            cy.get('[data-testid="control-row"]').should(
              'have.css',
              'border-left-color',
              initialControlColor
            )
          })
      })
  })

  it('should not highlight table row when hover is true but setHoverStateTo is false', () => {
    cy.mount(<TestTable setHoverStateTo={false} hover={true} />)

    cy.get('[data-testid="target-row"]').then(($row) => {
      const initialBorderColor = $row.css('border-left-color')

      cy.wrap($row)
        .realHover()
        .and('have.css', 'border-left-color', initialBorderColor)
    })

    cy.get('[data-testid="control-row"]').then(($row) => {
      const initialBorderColor = $row.css('border-left-color')

      cy.wrap($row)
        .realHover()
        .should('not.have.css', 'border-left-color', initialBorderColor)
    })
  })

  it('should highlight table row when hover is false but setHoverStateTo is true', () => {
    cy.mount(<TestTable />)

    cy.get('[data-testid="target-row"]')
      .invoke('css', 'border-left-color')
      .then((initialTargetColor) => {
        cy.get('[data-testid="control-row"]')
          .invoke('css', 'border-left-color')
          .then((initialControlColor) => {
            cy.mount(<TestTable setHoverStateTo={true} hover={false} />)

            cy.get('[data-testid="target-row"]').should(
              'not.have.css',
              'border-left-color',
              initialTargetColor
            )

            cy.get('[data-testid="control-row"]').should(
              'have.css',
              'border-left-color',
              initialControlColor
            )
          })
      })
  })

  it('should highlight table row when hover is true but setHoverStateTo is undefined', () => {
    cy.mount(<TestTable setHoverStateTo={undefined} hover={true} />)

    cy.get('[data-testid="target-row"]').then(($row) => {
      const initialBorderColor = $row.css('border-left-color')

      cy.wrap($row)
        .realHover()
        .should('not.have.css', 'border-left-color', initialBorderColor)
    })

    cy.get('[data-testid="control-row"]').then(($row) => {
      const initialBorderColor = $row.css('border-left-color')

      cy.wrap($row)
        .realHover()
        .should('not.have.css', 'border-left-color', initialBorderColor)
    })
  })

  it('should not highlight table row when hover is false and setHoverStateTo is undefined', () => {
    cy.mount(<TestTable setHoverStateTo={undefined} hover={false} />)

    cy.get('[data-testid="target-row"]').then(($row) => {
      const initialBorderColor = $row.css('border-left-color')

      cy.wrap($row)
        .realHover()
        .should('have.css', 'border-left-color', initialBorderColor)
    })

    cy.get('[data-testid="control-row"]').then(($row) => {
      const initialBorderColor = $row.css('border-left-color')

      cy.wrap($row)
        .realHover()
        .should('have.css', 'border-left-color', initialBorderColor)
    })
  })
})
