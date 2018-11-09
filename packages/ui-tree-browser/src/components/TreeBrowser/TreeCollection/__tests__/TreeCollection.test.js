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
  locator,
  parseQueryArguments,
  find,
  findAll,
  mergeCSSIntoSelector
} from '@instructure/ui-test-utils'

import TreeCollection from '../index'


// TODO: if we make a TreeBrowserItem component + locator we could use it here.
const itemSelector = '[role="treeitem"]'

const TreeCollectionLocator = locator(TreeCollection.locator, {
  findAllItems: async (...args) => {
    const { element, selector, options } = parseQueryArguments(...args)
    return findAll(element, mergeCSSIntoSelector(itemSelector, selector), options)
  },
  findItem: async (...args) => {
    const { element, selector, options } = parseQueryArguments(...args)
    return find(element, mergeCSSIntoSelector(itemSelector, selector), options)
  }
})

const IconFolder = (
  <svg height="100" width="100">
    <title>Folder icon</title>
    <circle cx="50" cy="50" r="40" />
  </svg>
)

const IconDocument = (
  <svg height="100" width="100">
    <title>Document icon</title>
    <circle cx="50" cy="50" r="40" />
  </svg>
)

describe('<TreeCollection />', async () => {
  it('should render', async () => {
    await mount(
      <TreeCollection
        id={1}
        name="Coll 1"
        collections={[
          {id: 2, name: 'Coll 2', descriptor: 'Another Descriptor'}
        ]}
        items={[
          {id: 1, name: 'Item 1'}
        ]}
      />
    )
    const collection = await TreeCollectionLocator.find()
    expect(collection).to.exist()
  })

  describe('collections', async () => {
    it('should render icons on children', async () => {
      await mount(
        <TreeCollection
          id={1}
          name="Coll 1"
          collections={[
            {id: 2, name: 'Coll 2', descriptor: 'Another Descriptor'}
          ]}
          items={[
            {id: 1, name: 'Item 1'}
          ]}
          collectionIcon={() => IconFolder}
          collectionIconExpanded={() => IconFolder}
          itemIcon={() => IconDocument}
          expanded={true}
        />
      )
      const collection = await TreeCollectionLocator.find()

      const folderIcons = await collection.findAll({ tag: 'svg', title: 'Folder icon' })
      expect(folderIcons.length).to.equal(2)

      const documentIcons = await collection.findAll({ tag: 'svg', title: 'Document icon' })
      expect(documentIcons.length).to.equal(1)
    })

    it('should pass an aria-expanded attribute to its list item', async () => {
      await mount(
        <TreeCollection
          id={1}
          name="Coll 1"
          collections={[
            {id: 2, name: 'Coll 2', descriptor: 'Another Descriptor'}
          ]}
          items={[
            {id: 1, name: 'Item 1'}
          ]}
        />
      )

      const collection = await TreeCollectionLocator.find()
      const item = await collection.findItem()

      expect(item.getAttribute('aria-expanded')).to.exist()
    })

    it('should pass an aria-selected attribute to its list item', async () => {
      await mount(
        <TreeCollection
          id={1}
          name="Coll 1"
          collections={[
            {id: 2, name: 'Coll 2', descriptor: 'Another Descriptor'}
          ]}
          items={[
            {id: 1, name: 'Item 1'}
          ]}
          selection="collection_1"
        />
      )

      const collection = await TreeCollectionLocator.find()
      const item = await collection.findItem()

      expect(item.getAttribute('aria-selected')).to.exist()
    })

    describe('onCollectionClick', async () => {
      it('should return the correct collection params on click', async () => {
        const onCollectionClick = stub()
        await mount(
          <TreeCollection
            id={1}
            name="Coll 1"
            collections={[
              {id: 2, name: 'Coll 2', descriptor: 'Another Descriptor'}
            ]}
            items={[
              {id: 1, name: 'Item 1'}
            ]}
            onCollectionClick={onCollectionClick}
          />
        )

        const collection = await TreeCollectionLocator.find()
        const item = await collection.findItem()

        await item.click()

        expect(onCollectionClick).to.have.been.calledOnce()
        expect(onCollectionClick.lastCall.lastArg).to.deep.equal({
          id: 1,
          expanded: true,
          type: 'collection'
        })
      })
    })
  })

  describe('items', async () => {
    it('should not pass an aria-expanded attribute to its button', async () => {
      await mount(
        <TreeCollection
          id={1}
          name="Coll 1"
          collections={[
            {id: 2, name: 'Coll 2', descriptor: 'Another Descriptor'}
          ]}
          items={[
            {id: 1, name: 'Item 1'}
          ]}
          expanded={true}
        />
      )

      const collection = await TreeCollectionLocator.find()
      const item = await collection.findItem()
      const button = await item.find('button')

      expect(button.getAttribute('aria-expanded')).to.not.exist()
    })

    it('should call custom functions passed by onItemClick', async () => {
      const onItemClick = stub()
      await mount(
        <TreeCollection
          id={1}
          name="Coll 1"
          collections={[
            {id: 2, name: 'Coll 2', descriptor: 'Another Descriptor'}
          ]}
          items={[
            {id: 1, name: 'Item 1'}
          ]}
          onItemClick={onItemClick}
          expanded={true}
        />
      )

      const collection = await TreeCollectionLocator.find()
      const item = await collection.findItem({ label: 'Item 1' })

      await item.click()

      expect(onItemClick).to.have.been.calledOnce()
      expect(onItemClick.lastCall.lastArg).to.deep.equal({id: 1, type: 'item'})
    })
  })
})
