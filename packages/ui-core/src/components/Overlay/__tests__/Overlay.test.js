import React from 'react'
import Overlay from '../index'
import Portal from '../../Portal'

describe('<Overlay />', () => {
  const testbed = new Testbed(<Overlay />)

  it('should render nothing when closed', () => {
    const subject = testbed.render()
    const portal = subject.find(Portal).unwrap()
    expect(portal.node).to.equal(undefined)
  })

  it('should render children and have a node with a parent when open', () => {
    const subject = testbed.render({
      open: true
    })
    const node = subject.find(Portal).unwrap().node
    expect(node.parentNode).to.equal(document.body)
  })

  it('should use transition', () => {
    const onEnter = testbed.stub()
    const onEntering = testbed.stub()
    const onEntered = testbed.stub()
    testbed.render({
      open: true,
      transition: 'fade',
      onEnter,
      onEntering,
      onEntered
    })

    testbed.tick()

    expect(onEnter).to.have.been.called

    testbed.tick()

    expect(onEntering).to.have.been.called
    expect(onEntered).to.have.been.called
  })

  it('should support onOpen prop', () => {
    const onOpen = testbed.stub()
    testbed.render({
      open: true,
      onOpen
    })

    testbed.tick()

    expect(onOpen).to.have.been.called
  })

  it('should support onClose prop', done => {
    const onClose = testbed.stub()

    const subject = testbed.render({
      onClose,
      open: true
    })

    expect(onClose).to.not.have.been.called

    subject.setProps({ open: false }, () => {
      expect(onClose).to.have.been.called
      done()
    })
  })
})
