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

import { View } from '@instructure/ui-view'

import { List } from '../index'
import { ListItem } from '../ListItem'

import ListLocator from '../locator'

describe('<List />', async () => {
  it('should render list items and filter out null/falsy children', async () => {
    await mount(
      <List>
        <ListItem>List item 1</ListItem>
        <ListItem>List item 2</ListItem>
        <ListItem>List item 3</ListItem>
        <ListItem>List item 4</ListItem>
        {null && <ListItem>ignore me 1</ListItem>}
        {false && <ListItem>ignore me 2</ListItem>}
      </List>
    )

    const list = await ListLocator.find()
    const listItems = await list.findAllItems()
    expect(listItems.length).to.equal(4)
  })

  it('should not render a delimiter when inline=false and delimiter=none', async () => {
    await mount(
      <List
        variant="unstyled"
        delimiter="none"
      >
        <ListItem>List item 1</ListItem>
        <ListItem>List item 2</ListItem>
        <ListItem>List item 3</ListItem>
        <ListItem>List item 4</ListItem>
      </List>
    )

    const list = await ListLocator.find()
    const delimiters = await list.findAll('[aria-hidden="true"]', {
      expectEmpty: true
    })

    expect(delimiters.length).to.equal(0)
  })

  it('should render a delimiter when inline=true and delimiter=none', async () => {
    await mount(
      <List
        variant="inline"
        delimiter="none"
      >
        <ListItem>List item 1</ListItem>
        <ListItem>List item 2</ListItem>
        <ListItem>List item 3</ListItem>
        <ListItem>List item 4</ListItem>
      </List>
    )

    const list = await ListLocator.find()
    const delimiters = await list.findAll('[aria-hidden="true"]')

    expect(delimiters.length).to.equal(4)
  })

  it('should render an ordered list', async () => {
    await mount(
      <List as="ol">
        <ListItem>List item 1</ListItem>
        <ListItem>List item 2</ListItem>
        <ListItem>List item 3</ListItem>
        <ListItem>List item 4</ListItem>
      </List>
    )
    const list = await ListLocator.find()
    expect(list.getTagName()).to.equal('ol')
  })

  it('should meet a11y standards', async () => {
    await mount(
      <List>
        <ListItem>List item 1</ListItem>
        <ListItem>List item 2</ListItem>
        <ListItem>List item 3</ListItem>
        <ListItem>List item 4</ListItem>
      </List>
    )

    const list = await ListLocator.find()
    expect(await list.accessible()).to.be.true()
  })

  describe('when passing down props to View', async () => {
    const allowedProps = {
      margin: 'small',
      as: 'ul',
      elementRef: () => {}
    }

    Object.keys(View.propTypes)
      .filter(prop => prop !== 'theme' && prop !== 'children')
      .forEach((prop) => {
        if (Object.keys(allowedProps).indexOf(prop) < 0) {
          it(`should NOT allow the '${prop}' prop`, async () => {
            const consoleError = stub(console, 'error')
            const warning = `Warning: [List] prop '${prop}' is not allowed.`
            const props = {
              [prop]: 'foo'
            }
            await mount(
              <List {...props}>
                <ListItem>List item 1</ListItem>
              </List>
            )
            expect(consoleError)
              .to.be.calledWith(warning)
          })
        } else {
          it(`should allow the '${prop}' prop`, async () => {
            const props = { [prop]: allowedProps[prop] }
            const consoleError = stub(console, 'error')
            await mount(
              <List {...props}>
                <ListItem>List item 1</ListItem>
              </List>
            )
            expect(consoleError).to.not.be.called()
          })
        }
    })
  })
})
