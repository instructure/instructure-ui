import React from 'react'
import $ from 'teaspoon'
import Overlay from '../index'
import Portal from '../../Portal'

describe('<Overlay />', function () {
  const testbed = new Testbed(<Overlay />)

  it('should render nothing and have a node with no parent when closed', function () {
    const subject = testbed.render()
    const node = subject.find(Portal).unwrap()._node
    expect(node.parentNode).to.equal(null)
  })

  it('should render children and have a node with a parent when open', function () {
    const subject = testbed.render({
      isOpen: true
    })
    const node = subject.find(Portal).unwrap()._node
    expect(node.parentNode).to.equal(document.body)
  })

  it('should use transition', function () {
    const onEnter = testbed.sandbox.stub()
    const onEntering = testbed.sandbox.stub()
    const onEntered = testbed.sandbox.stub()
    testbed.render({
      isOpen: true,
      transition: 'fade',
      onEnter,
      onEntering,
      onEntered
    })

    expect(onEnter).to.have.been.called
    expect(onEntering).to.have.been.called
    expect(onEntered).to.have.been.called
  })

  it('should support onReady prop', function () {
    const onReady = testbed.sandbox.stub()
    testbed.render({
      isOpen: true,
      onReady
    })
    expect(onReady).to.have.been.called
  })

  it('should support onClose prop', function () {
    const onClose = testbed.sandbox.stub()
    const subject = testbed.render({
      isOpen: true
    })
    expect(onClose).to.not.have.been.called
    subject.props('isOpen', false, () => {
      expect(onClose).to.have.been.called
    })
  })

  it('should not request close when overlay clicked by default', function () {
    const onRequestClose = testbed.sandbox.stub()
    const subject = testbed.render({
      isOpen: true,
      onRequestClose
    })
    const content = $(subject.unwrap()._content)
    content.trigger('click')
    expect(onRequestClose).to.not.have.been.called
  })

  it('should request close when overlay clicked with prop', function () {
    const onRequestClose = testbed.sandbox.stub()
    const subject = testbed.render({
      isOpen: true,
      shouldCloseOnClick: true,
      onRequestClose
    })
    const content = $(subject.unwrap()._content)
    content.trigger('click')
    expect(onRequestClose).to.have.been.called
  })
})
