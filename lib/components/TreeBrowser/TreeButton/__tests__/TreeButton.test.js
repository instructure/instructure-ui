import React from 'react'
import IconFolderSolid from 'instructure-icons/lib/Solid/IconFolderSolid'
import IconDocumentSolid from 'instructure-icons/lib/Solid/IconDocumentSolid'
import TreeButton from '../index'
import styles from '../styles.css'

describe('<TreeButton />', () => {
  const testbed = new Testbed(<TreeButton id="1" />)

  it('should render', () => {
    const button = testbed.render()
    expect(button).to.be.present
  })

  describe('onClick', () => {
    it('calls functions passed and returns the id', () => {
      const onClick = testbed.stub()
      const button = testbed.render({ onClick })
      button.find('button').simulate('click')
      expect(onClick).to.have.been.called
      expect(onClick).to.have.been.calledWith({id: '1', type: 'treeButton'})
    })
  })

  describe('descriptor', () => {
    it('does not render a descriptor element if no descriptor passed', () => {
      const button = testbed.render()
      expect(button.find('.' + styles.textDescriptor)).to.have.length(0)
    })

    it('renders a descriptor element if passed', () => {
      const button = testbed.render({
        descriptor: 'Some Descriptor'
      })
      expect(button.find('.' + styles.textDescriptor).text()).to.equal('Some Descriptor')
    })
  })

  describe('icons', () => {
    it('renders a passed collection Icon', () => {
      const button = testbed.render({type: 'collection', collectionIcon: IconFolderSolid})
      const svg = button.find(IconFolderSolid)
      expect(svg.length).to.equal(1)
    })

    it('renders a passed item Icon', () => {
      const button = testbed.render({type: 'item', itemIcon: IconDocumentSolid})
      const svg = button.find(IconDocumentSolid)
      expect(svg.length).to.equal(1)
    })

    it('renders a TreeButton without icon if no icon prop passd', () => {
      const button = testbed.render()
      const svg1 = button.find(IconFolderSolid)
      const svg2 = button.find(IconDocumentSolid)
      expect(svg1.length + svg2.length).to.equal(0)
    })
  })
})
