import React from 'react'
import Button from '../../Button'
import Portal from '../../Portal'
import Modal, {ModalHeader, ModalBody, ModalFooter} from '../index'

describe('<Modal />', function () {
  const testbed = new Testbed(
    <Modal transition="fade" label="Modal Dialog" closeButtonLabel="Close">
      <ModalBody />
    </Modal>
  )

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

  it('should support onClose prop', function (done) {
    const onClose = testbed.sandbox.stub()
    const subject = testbed.render({
      onClose,
      isOpen: true
    })

    expect(onClose).to.not.have.been.called

    subject.setProps({ isOpen: false }, () => {
      testbed.sandbox.clock.tick(1000) // exiting -> exited

      setTimeout(() => { // wait for re-render after state change
        expect(onClose).to.have.been.called
        done()
      }, 0)
    })
  })

  it('should not request close when overlay clicked by default', function () {
    const onRequestClose = testbed.sandbox.stub()
    const subject = testbed.render({
      isOpen: true,
      onRequestClose
    })

    subject.ref('_overlay').simulate('click')

    expect(onRequestClose).to.not.have.been.called
  })

  it('should request close when overlay clicked with prop', function () {
    const onRequestClose = testbed.sandbox.stub()
    const subject = testbed.render({
      isOpen: true,
      shouldCloseOnOverlayClick: true,
      onRequestClose
    })

    subject.ref('_overlay').simulate('click')

    expect(onRequestClose).to.have.been.called
  })

  it('should request close when close button is clicked', function () {
    const onRequestClose = testbed.sandbox.stub()
    const subject = testbed.render({
      isOpen: true,
      onRequestClose
    })

    subject.ref('_content').find(Button).simulate('click')

    expect(onRequestClose).to.have.been.called
  })

  it('should render children', function () {
    const subject = testbed.render({
      isOpen: true,
      children: <ModalBody><Button>Cancel</Button></ModalBody>
    })

    // + 1 for x-icon button
    expect(subject.ref('_content').find(Button).length)
      .to.equal(2)
  })

  it('should focus the close button by default', function () {
    const subject = testbed.render({
      isOpen: true
    })

    expect(subject.ref('_content').find(Button).focused())
      .to.be.true
  })

  describe('children validation', function () {
    it('should pass validation when children are valid', function () {
      function render () {
        testbed.render({
          isOpen: true,
          children: [
            <ModalHeader key="header">Hello World</ModalHeader>,
            <ModalBody key="body">Foo Bar Baz</ModalBody>,
            <ModalFooter key="footer"><Button>Cancel</Button></ModalFooter>
          ]
        })
      }

      expect(render).to.not.throw(Error)
    })

    it('should not pass validation when children are invalid', function () {
      function render () {
        testbed.render({
          isOpen: true,
          children: [
            <ModalBody key="body">Foo Bar Baz</ModalBody>,
            <ModalFooter key="footer"><Button>Cancel</Button></ModalFooter>,
            <ModalHeader key="header">Hello World</ModalHeader>
          ]
        })
      }

      expect(render).to.throw(Error)
    })
  })
})
