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
import { locator, expect, mount, stub } from '@instructure/ui-test-utils'

import { SelectOptionsList } from '../index'

import styles from '../styles.css'

const OptionLocator = locator('li')
const SelectedOptionLocator = locator(`.${styles.selected}`)
const HighlightedOptionLocator = locator(`.${styles.highlighted}`)

const SelectOptionsListLocator = locator(SelectOptionsList.selector, {
  findAllOptions: (...args) => OptionLocator.findAll(...args),
  findOption: (...args) => OptionLocator.find(...args),
  findSelectedOption: (...args) => SelectedOptionLocator.find(...args),
  findHighlightedOption: (...args) => HighlightedOptionLocator.find(...args)
})

describe('<SelectOptionsList />', async () => {
  it('should render options', async () => {
    await mount(
      <SelectOptionsList
        expanded
        options={[
          {
            label: 'Alabama',
            value: '0',
            id: '0',
            children: 'Alabama'
          },
          {
            label: 'Alaska',
            value: '1',
            id: '1',
            children: 'Alaska'
          },
          {
            label: 'America',
            value: '2',
            id: '2',
            children: 'America'
          }
        ]}
      />
    )
    const list = await SelectOptionsListLocator.find()
    const items = await list.findAllOptions()

    expect(list).to.exist()
    expect(items.length).to.equal(3)
  })

  it('should set selectedOption correctly', async () => {
    await mount(
      <SelectOptionsList
        expanded
        options={[
          {
            label: 'Alabama',
            value: '0',
            id: '0',
            children: 'Alabama'
          },
          {
            label: 'Alaska',
            value: '1',
            id: '1',
            children: 'Alaska'
          },
          {
            label: 'America',
            value: '2',
            id: '2',
            children: 'America'
          }
        ]}
        selectedOption={{
          label: 'Alaska',
          value: '1',
          id: '1',
          children: 'Alaska'
        }}
      />
    )
    const list = await SelectOptionsListLocator.find()
    const selectedItem = await list.findSelectedOption()
    expect(selectedItem.getTextContent()).to.equal('Alaska')
  })

  it('should set highlightedIndex correctly', async () => {
    await mount(
      <SelectOptionsList
        expanded
        options={[
          {
            label: 'Alabama',
            value: '0',
            id: '0',
            children: 'Alabama'
          },
          {
            label: 'Alaska',
            value: '1',
            id: '1',
            children: 'Alaska'
          },
          {
            label: 'America',
            value: '2',
            id: '2',
            children: 'America'
          }
        ]}
        highlightedIndex={2}
      />
    )
    const list = await SelectOptionsListLocator.find()
    const highlightedItem = await list.findHighlightedOption()
    expect(highlightedItem.getTextContent()).to.equal('America')
  })

  it('should call onSelect', async () => {
    const onSelect = stub()
    await mount(
      <SelectOptionsList
        expanded
        options={[
          {
            label: 'Alabama',
            value: '0',
            id: '0',
            children: 'Alabama'
          },
          {
            label: 'Alaska',
            value: '1',
            id: '1',
            children: 'Alaska'
          },
          {
            label: 'America',
            value: '2',
            id: '2',
            children: 'America'
          }
        ]}
        onSelect={onSelect}
      />
    )
    const list = await SelectOptionsListLocator.find()
    const item = await list.findOption()

    await item.click()
    expect(onSelect).to.have.been.called()
  })

  it('should call onHighlightOption', async () => {
    const onHighlightOption = stub()
    await mount(
      <SelectOptionsList
        expanded
        options={[
          {
            label: 'Alabama',
            value: '0',
            id: '0',
            children: 'Alabama'
          },
          {
            label: 'Alaska',
            value: '1',
            id: '1',
            children: 'Alaska'
          },
          {
            label: 'America',
            value: '2',
            id: '2',
            children: 'America'
          }
        ]}
        onHighlightOption={onHighlightOption}
      />
    )
    const list = await SelectOptionsListLocator.find()
    const items = await list.findAllOptions()

    await items[1].mouseOver({relatedTarget: null})
    expect(onHighlightOption).to.have.been.called()
  })

  it('should call onStaticClick when static option is selected', async () => {
    const onStaticClick = stub()
    await mount(
      <SelectOptionsList
        expanded
        options={[]}
        emptyOption="no results"
        onStaticClick={onStaticClick}
      />
    )
    const list = await SelectOptionsListLocator.find()
    const empty = await list.findAllOptions()

    expect(empty.length).to.equal(1)
    expect(empty[0]).to.exist()
    expect(empty[0].getTextContent()).to.equal('no results')

    await empty[0].click()
    expect(onStaticClick).to.have.been.called()
  })

  it('should not allow disabled options to be selected', async () => {
    const onSelect = stub()
    await mount(
      <SelectOptionsList
        expanded
        options={[
          {
            label: 'Alabama',
            value: '0',
            id: '0',
            children: 'Alabama',
            disabled: true
          },
          {
            label: 'Alaska',
            value: '1',
            id: '1',
            children: 'Alaska'
          },
          {
            label: 'America',
            value: '2',
            id: '2',
            children: 'America'
          }
        ]}
        onSelect={onSelect}
      />
    )
    const list = await SelectOptionsListLocator.find()
    const item = await list.findOption()

    await item.click(null, { disabled: true })

    expect(onSelect).to.not.have.been.called()
  })
})
