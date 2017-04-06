import React from 'react'
import TreeCollection from '../index'
import IconFolderSolid from 'instructure-icons/lib/Solid/IconFolderSolid'
import IconDocumentSolid from 'instructure-icons/lib/Solid/IconDocumentSolid'

describe('<TreeCollection />', function () {
  const testbed = new Testbed(<TreeCollection
    collection={{
      id: 1, name: 'Coll 1', collections: [2], items: [1]
    }}
    collections={{
      2: {id: 2, name: 'Coll 2', descriptor: 'Another Descriptor'},
      3: {id: 3, name: 'Coll 3'}
    }}
    items={{
      1: {id: 1, name: 'Item 1'},
      2: {id: 2, name: 'Item 2'}
    }}
    descriptor={'Some Descriptor'}
    collectionIcon={IconFolderSolid}
    collectionIconExpanded={IconFolderSolid}
    itemIcon={IconDocumentSolid}
  />)

  it('should render', function () {
    const collection = testbed.render()
    expect(collection).to.be.present
  })

  describe('collections', function () {
    it('properly expands and collapses', function () {
      const collection = testbed.render()
      const button = collection.find('button')
      expect(collection.find('li')).to.have.length(0)
      button.simulate('click')
      expect(collection.find('li')).to.have.length(2)
    })

    it('renders icons properly when expanding and contracting', function () {
      const collection = testbed.render({
        collectionIconExpanded: IconDocumentSolid
      })
      const button = collection.find('button')
      expect(button.find(IconFolderSolid).length).to.equal(1)
      expect(button.find(IconDocumentSolid).length).to.equal(0)
      button.simulate('click')
      expect(button.find(IconFolderSolid).length).to.equal(0)
      expect(button.find(IconDocumentSolid).length).to.equal(1)
      button.simulate('click')
      expect(button.find(IconFolderSolid).length).to.equal(1)
      expect(button.find(IconDocumentSolid).length).to.equal(0)
    })

    it('expands but does not render a list if collection is empty', function () {
      const collection = testbed.render({
        collection: { id: 1, name: 'Empty Collection', collections: [] },
        collectionIconExpanded: IconDocumentSolid
      })
      const button = collection.find('button')
      button.simulate('click')
      expect(button.find(IconFolderSolid).length).to.equal(0)
      expect(button.find(IconDocumentSolid).length).to.equal(1)
      expect(collection.find('ul')).to.have.length(0)
    })

    it('passes an aria-expanded attribute to its button', function () {
      const collection = testbed.render()
      const button = collection.find('button')
      expect(button.getAttribute('aria-expanded')).to.exist
    })

    it('properly toggles aria-expanded', function () {
      const collection = testbed.render()
      const button = collection.find('button')
      expect(button.getAttribute('aria-expanded')).to.eq('false')
      button.simulate('click')
      expect(button.getAttribute('aria-expanded')).to.eq('true')
    })

    describe('onCollectionClick', function () {
      it('calls functions passed and returns the collection id', function () {
        const onCollectionClick = testbed.stub()
        const collection = testbed.render({ onCollectionClick })
        collection.find('button').simulate('click')
        expect(onCollectionClick).to.have.been.calledWith('1')
      })
    })
  })

  describe('items', function () {
    it('does not pass an aria-expanded attribute to its button', function () {
      const collection = testbed.render({defaultValue: 'true'})
      collection.find('button').simulate('click')
      const itemButton = collection.find('#item_1').node
      expect(itemButton.getAttribute('aria-expanded')).to.not.exist
    })

    it('calls any custom functions passed by onItemClick prop', function () {
      const onItemClick = testbed.stub()
      const collection = testbed.render({
        onCollectionClick: onItemClick
      })
      collection.find('button').simulate('click')
      expect(onItemClick).to.have.been.called
    })
  })

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      const collection = testbed.render()
      collection.should.be.accessible(done, {
        ignores: [
          'color-contrast' // brand color doesn't meet 4.5:1 contrast req
        ]
      })
    })

    it('should properly set aria-expanded/collapsed', function () {
      const collection = testbed.render()
      const button = collection.find('button')
      expect(button.node.getAttribute('aria-expanded')).to.equal('false')
      button.simulate('click')
      expect(button.node.getAttribute('aria-expanded')).to.equal('true')
    })
  })
})
