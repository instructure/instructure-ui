import React from 'react'
import IconFolder from '@instructure/ui-icons/lib/Solid/IconFolder'
import IconDocument from '@instructure/ui-icons/lib/Solid/IconDocument'
import TreeCollection from '../index'

describe('<TreeCollection />', () => {
  const testbed = new Testbed(<TreeCollection
    id={1}
    name={'Coll 1'}
    descriptor={'Some Descriptor'}
    collections={[
      {id: 2, name: 'Coll 2', descriptor: 'Another Descriptor'}
    ]}
    items={[
      {id: 1, name: 'Item 1'}
    ]}
    collectionIcon={IconFolder}
    collectionIconExpanded={IconFolder}
    itemIcon={IconDocument}
  />)

  it('should render', () => {
    const collection = testbed.render()
    expect(collection).to.be.present
  })

  describe('collections', () => {
    it('renders icons properly on children', () => {
      const collection = testbed.render({expanded: true})
      expect(collection.find(IconFolder).length).to.equal(2)
      expect(collection.find(IconDocument).length).to.equal(1)
    })

    it('shows expanded icon without rendering a list if collection is empty', () => {
      const collection = testbed.render({
        collectionIconExpanded: IconDocument,
        expanded: true,
        collections: [],
        items: []
      })
      expect(collection.find(IconDocument).length).to.equal(1)
      expect(collection.find('ul')).to.have.length(0)
    })

    it('passes an aria-expanded attribute to its button', () => {
      const collection = testbed.render()
      const button = collection.find('button')
      expect(button.getAttribute('aria-expanded')).to.exist
    })

    describe('onCollectionClick', () => {
      it('calls returns the correct collection params on click', () => {
        const onCollectionClick = testbed.stub()
        const collection = testbed.render({ onCollectionClick })
        collection.find('button').simulate('click')
        expect(onCollectionClick).to.have.been.calledWith({expanded: true, id: 1})
      })
    })
  })

  describe('items', () => {
    it('does not pass an aria-expanded attribute to its button', () => {
      const collection = testbed.render({expanded: true})
      const itemButton = collection.find('[title="Item 1"]').node
      expect(itemButton.getAttribute('aria-expanded')).to.not.exist
    })

    it('calls any custom functions passed by onItemClick prop', () => {
      const onItemClick = testbed.stub()
      const collection = testbed.render({
        onCollectionClick: onItemClick
      })
      collection.find('button').simulate('click')
      expect(onItemClick).to.have.been.called
    })
  })
})
