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
  find,
  findAll,
  within
} from '@instructure/ui-test-utils'
/* eslint-disable no-restricted-imports */
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@ins... Remove this comment to see the full error message
import { SimpleSelectLocator } from '@instructure/ui-simple-select/es/SimpleSelect/SimpleSelectLocator'
/* eslint-enable no-restricted-imports */
import { Table } from '../index'

describe('<Table />', async () => {
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  const render = (props) =>
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    mount(
      <Table caption="Test table" {...props}>
        <Table.Head>
          <Table.Row>
            <Table.ColHeader id="foo">Foo</Table.ColHeader>
            <Table.ColHeader id="bar">Bar</Table.ColHeader>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.RowHeader>foo</Table.RowHeader>
            <Table.Cell>bar</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )

  it('should render a caption', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    await render()
    const table = await find('table')

    expect(await table.find('caption:contains(Test table)')).to.exist()
  })

  it('should meet a11y standards', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    await render()
    const table = await find('table')
    expect(await table.accessible()).to.be.true()
  })

  it('applies a fixed column layout', async () => {
    await render({
      layout: 'fixed'
    })
    const table = await find('table')
    const tableNode = within(table.getDOMNode())

    expect(tableNode.getComputedStyle().tableLayout).to.equal('fixed')
  })

  it('passes hover to table row', async () => {
    await render({
      hover: true
    })
    const tr = await find('tbody tr')
    const trNode = within(tr.getDOMNode())

    expect(trNode.getComputedStyle().borderLeftStyle).to.not.equal('none')
    expect(trNode.getComputedStyle().borderRightStyle).to.not.equal('none')
  })

  it('sets the scope of column header to col', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    await render()
    const th = await find('thead th')
    const thNode = within(th.getDOMNode())

    expect(thNode.getAttribute('scope')).to.equal('col')
  })

  it('sets the scope of row header to row', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    await render()
    const th = await find('tbody th')
    const thNode = within(th.getDOMNode())

    expect(thNode.getAttribute('scope')).to.equal('row')
  })

  it('can render table in stacked layout', async () => {
    const stackedTable = await render({
      layout: 'stacked'
    })

    expect(stackedTable).to.exist()
  })

  it('can ignore invalid children', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Table caption="Test table">
        <Table.Head>
          {null}
          <Table.Row>
            <Table.ColHeader id="foo">Foo</Table.ColHeader>
            {null}
          </Table.Row>
        </Table.Head>
        {null}
        <Table.Body>
          {null}
          <Table.Row></Table.Row>
        </Table.Body>
      </Table>
    )
    const th = await findAll('th')
    const tr = await findAll('tr')

    expect(th).to.have.length(1)
    expect(tr).to.have.length(2)
  })

  it('can handle non-existent head in stacked layout', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const stackedTable = await mount(
      <Table caption="Test table" layout="stacked">
        <Table.Body></Table.Body>
      </Table>
    )

    expect(stackedTable).to.exist()
  })

  it('can handle empty head in stacked layout', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const stackedTable = await mount(
      <Table caption="Test table" layout="stacked">
        <Table.Head></Table.Head>
      </Table>
    )

    expect(stackedTable).to.exist()
  })

  it('can handle invalid header in stacked layout', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const stackedTable = await mount(
      <Table caption="Test table" layout="stacked">
        <Table.Head>
          <Table.Row>
            <Table.Cell>Foo</Table.Cell>
          </Table.Row>
        </Table.Head>
      </Table>
    )

    expect(stackedTable).to.exist()
  })

  describe('when table is sortable', async () => {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    const renderSortableTable = (props, handlers = {}, layout = 'auto') =>
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      mount(
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        <Table caption="Sortable table" layout={layout}>
          <Table.Head>
            <Table.Row>
              <Table.ColHeader id="foo" {...props} {...handlers}>
                Foo
              </Table.ColHeader>
              <Table.ColHeader id="bar" {...handlers}>
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

    it('can render up arrow for ascending order', async () => {
      await renderSortableTable({
        sortDirection: 'ascending'
      })
      const arrow = await find('svg[name="IconMiniArrowUp"]')

      expect(arrow).to.exist()
    })

    it('can render down arrow for descending order', async () => {
      await renderSortableTable({
        sortDirection: 'descending'
      })
      const arrow = await find('svg[name="IconMiniArrowDown"]')

      expect(arrow).to.exist()
    })

    it('calls onRequestSort when column header is clicked', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onRequestSort = stub()

      await renderSortableTable(
        {},
        {
          onRequestSort
        }
      )
      const button = await find('th button')

      await button.click()
      expect(onRequestSort).to.have.been.calledOnce()
    })

    it('can render table head as a combobox when in stacked layout', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const sortFoo = stub()

      await renderSortableTable(
        {},
        {
          onRequestSort: sortFoo
        },
        'stacked'
      )
      const select = await SimpleSelectLocator.find()
      const input = await select.findInput()

      await input.click()

      const list = await select.findOptionsList()
      const options = await list.findAll('[role="option"]')

      await options[1].click()
      expect(sortFoo).to.have.been.calledOnce()
    })

    it('can render check mark for sorted column in stacked layout', async () => {
      await renderSortableTable(
        {
          sortDirection: 'ascending'
        },
        {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
          onRequestSort: stub()
        },
        'stacked'
      )
      const icon = await find('svg[name="IconCheck"]')

      expect(icon).to.exist()
    })

    it('creates proper aria-sort attributes (ascending)', async () => {
      await renderSortableTable({
        sortDirection: 'ascending'
      })
      const sortedHeader = await find('th[aria-sort="ascending"]')

      expect(sortedHeader).to.exist()
    })

    it('creates proper aria-sort attributes (descending)', async () => {
      await renderSortableTable({
        sortDirection: 'descending'
      })
      const sortedHeader = await find('th[aria-sort="descending"]')

      expect(sortedHeader).to.exist()
    })
  })
})
