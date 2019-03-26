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
import { expect, mount, stub, find, within } from '@instructure/ui-test-utils'

import Table from '../index'
import styles from '../Row/styles.css'

describe('<Table />', async () => {
  const render = (props) => mount(
    <Table
      caption="Test table"
      {...props}
    >
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
    await render()
    const table = await find('table')

    expect(await table.find('caption:contains(Test table)')).to.exist()
  })

  it('should meet a11y standards', async () => {
    await render()
    const table = await find('table')
    expect(await table.accessible()).to.be.true()
  })

  it('applies a fixed column layout', async () => {
    await render({
      layout: 'fixed',
    })
    const table = await find('table')
    const tableNode = within(table.getDOMNode())

    expect(tableNode.getComputedStyle().tableLayout).to.equal('fixed')
  })

  it('passes hover to table row', async () => {
    await render({
      hover: true,
    })
    const tr = await find('tbody tr')
    const trNode = within(tr.getDOMNode())

    expect(trNode.getAttribute('class')).to.contain(styles.hover)
  })

  it('sets the scope of column header to col', async () => {
    await render()
    const th = await find('thead th')
    const thNode = within(th.getDOMNode())

    expect(thNode.getAttribute('scope')).to.equal('col')
  })

  it('sets the scope of row header to row', async () => {
    await render()
    const th = await find('tbody th')
    const thNode = within(th.getDOMNode())

    expect(thNode.getAttribute('scope')).to.equal('row')
  })

  it('can render table in stacked mode', async () => {
    const stackedTable = await render({
      mode: 'stacked',
    })

    expect(stackedTable).to.exist()
  })

  it('can handle non-existent head in stacked mode', async () => {
    const stackedTable = await mount(
      <Table
        caption="Test table"
        mode="stacked"
      >
        <Table.Body>
        </Table.Body>
      </Table>
    )

    expect(stackedTable).to.exist()
  })

  it('can handle empty head in stacked mode', async () => {
    const stackedTable = await mount(
      <Table
        caption="Test table"
        mode="stacked"
      >
        <Table.Head>
        </Table.Head>
      </Table>
    )

    expect(stackedTable).to.exist()
  })

  it('can handle invalid header in stacked mode', async () => {
    const stackedTable = await mount(
      <Table
        caption="Test table"
        mode="stacked"
      >
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
    const renderSortableTable = (props, mode = 'default') => mount(
      <Table
        caption="Sortable table"
        mode={mode}
      >
        <Table.Head>
          <Table.Row>
            <Table.ColHeader id="foo" {...props}>Foo</Table.ColHeader>
            <Table.ColHeader id="bar">Bar</Table.ColHeader>
          </Table.Row>
        </Table.Head>
      </Table>
    )

    it('can render up arrow for ascending order', async () => {
      await renderSortableTable({
        sortDirection: 'ascending',
      })
      const arrow = await find('svg[name="IconMiniArrowUp"]')

      expect(arrow).to.exist()
    })

    it('can render down arrow for descending order', async () => {
      await renderSortableTable({
        sortDirection: 'descending',
      })
      const arrow = await find('svg[name="IconMiniArrowDown"]')

      expect(arrow).to.exist()
    })

    it('calls onRequestSort when column header is clicked', async () => {
      const onRequestSort = stub()

      await renderSortableTable({
        onRequestSort,
      })
      const button = await find('th button')

      await button.click()
      expect(onRequestSort).to.have.been.calledOnce()
    })

    it('can render table head as a combobox when in stacked mode', async () => {
      const sortFoo = stub()

      await renderSortableTable({
        onRequestSort: sortFoo,
      }, 'stacked')
      const input = await find('input[role="combobox"]')

      await input.keyDown('down')
      await input.keyDown('enter')
      expect(sortFoo).to.have.been.calledOnce()
    })

    it('can render check mark for sorted column in stacked mode', async () => {
      await renderSortableTable({
        onRequestSort: stub(),
        sortDirection: 'ascending',
      }, 'stacked')
      const icon = await find('svg[name="IconCheck"]')

      expect(icon).to.exist()
    })
  })
})
