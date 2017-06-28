import React from 'react'
import Button from '../../Button'
import Portal from '../../Portal'
import Modal, {ModalHeader, ModalBody, ModalFooter} from '../index'

describe('<Modal />', () => {
  const testbed = new Testbed(
    <Modal transition="fade" label="Modal Dialog" closeButtonLabel="Close">
      <ModalBody />
    </Modal>
  )

  it('should render nothing and have a node with no parent when closed', () => {
    const subject = testbed.render()
    const node = subject.find(Portal).unwrap().node
    expect(node).to.equal(undefined)
  })

  it('should render children and have a node with a parent when open', () => {
    const subject = testbed.render({
      open: true
    })
    const portal = subject.find(Portal).unwrap()
    expect(portal.node.parentNode).to.equal(document.body)
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

  it('should support onClose prop', (done) => {
    const onClose = testbed.stub()
    const subject = testbed.render({
      onClose,
      open: true
    })

    expect(onClose).to.not.have.been.called

    subject.setProps({ open: false }, () => {
      testbed.tick() // exiting -> exited

      testbed.defer(() => { // wait for re-render after state change
        expect(onClose).to.have.been.called
        done()
      })
    })
  })

  it('should not dismiss when overlay clicked by default', () => {
    const onDismiss = testbed.stub()
    const subject = testbed.render({
      open: true,
      onDismiss
    })

    subject.ref('_overlay').simulate('click')

    expect(onDismiss).to.not.have.been.called
  })

  it('should dismiss when overlay clicked with prop', () => {
    const onDismiss = testbed.stub()
    const subject = testbed.render({
      open: true,
      shouldCloseOnOverlayClick: true,
      onDismiss
    })

    subject.ref('_overlay').simulate('click')

    expect(onDismiss).to.have.been.called
  })

  it('should dismiss when close button is clicked', () => {
    const onDismiss = testbed.stub()
    const subject = testbed.render({
      open: true,
      onDismiss
    })

    subject.ref('_content').find(Button).simulate('click')

    expect(onDismiss).to.have.been.called
  })

  it('should render children', () => {
    const subject = testbed.render({
      open: true,
      children: <ModalBody><Button>Cancel</Button></ModalBody>
    })

    // + 1 for x-icon button
    expect(subject.ref('_content').find(Button).length)
      .to.equal(2)
  })

  describe('children validation', () => {
    it('should pass validation when children are valid', () => {
      function render () {
        testbed.render({
          open: true,
          children: [
            <ModalHeader key="header">Hello World</ModalHeader>,
            <ModalBody key="body">Foo Bar Baz</ModalBody>,
            <ModalFooter key="footer"><Button>Cancel</Button></ModalFooter>
          ]
        })
      }

      expect(render).to.not.throw(Error)
    })

    it('should not pass validation when children are invalid', () => {
      function render () {
        testbed.render({
          open: true,
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

describe('<Modal /> managed focus', () => {
  class ModalExample extends React.Component {
    static propTypes = {
      ...Modal.PropTypes
    }

    render () {
      return (
        <div>
          <input type="text" />
          <Modal
            {...this.props}
            label="A Modal"
            closeButtonLabel="close"
          >
            <ModalBody>
              <input type="text" id="input-one" />
              <input type="text" id="input-two" />
            </ModalBody>
          </Modal>
        </div>
      )
    }
  }

  const testbed = new Testbed(<ModalExample />)

  it('should focus closeButton by default', () => {
    let closeButton

    testbed.render({
      open: true,
      closeButtonRef: (el) => { closeButton = el }
    })

    testbed.tick()

    expect(closeButton === document.activeElement).to.be.true
  })

  it('should take a prop for finding default focus', () => {
    testbed.render({
      open: true,
      defaultFocusElement: function () {
        return document.getElementById('input-one')
      }
    })

    testbed.tick()

    expect(document.getElementById('input-one') === document.activeElement).to.be.true
  })

  it('should call onDismiss prop when Esc key pressed', () => {
    const onDismiss = testbed.stub()
    let contentEl
    testbed.render({
      open: true,
      onDismiss,
      contentRef: (el) => { contentEl = el }
    })

    testbed.tick()

    Testbed.wrap(contentEl).keyDown('esc')

    expect(onDismiss).to.have.been.called
  })
})
