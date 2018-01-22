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
import Button from '@instructure/ui-buttons/lib/components/Button'
import Portal from '@instructure/ui-portal/lib/components/Portal'

import Modal, { ModalHeader, ModalBody, ModalFooter } from '../index'

describe('<Modal />', () => {
  const applicationElement = document.createElement('div')
  const testbed = new Testbed(
    (
      <Modal
        transition="fade"
        label="Modal Dialog"
        closeButtonLabel="Close"
        applicationElement={() => applicationElement}
        shouldReturnFocus={false}
      >
        <ModalBody />
      </Modal>
    )
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

  it('should apply the a11y attributes', () => {
    const subject = testbed.render({ open: true })
    const portal = subject.find(Portal).unwrap()
    expect(portal.node.querySelector('[role="region"]')).to.exist
    expect(portal.node.querySelector('[aria-label="Modal Dialog"]')).to.exist
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

    testbed.tick()

    subject.setProps({ open: false }, () => {
      testbed.defer(() => {
        // wait for re-render after state change
        testbed.tick()
        testbed.tick()
        expect(onClose).to.have.been.called
        done()
      })
    })
  })

  it('should dismiss when overlay clicked by default', () => {
    const onDismiss = testbed.stub()
    const subject = testbed.render({
      open: true,
      onDismiss
    })

    testbed.tick()

    const mask = subject.ref('_content').node.parentNode
    mask.click()

    expect(onDismiss).to.have.been.called
  })

  it('should dismiss when overlay clicked with prop', () => {
    const onDismiss = testbed.stub()
    const subject = testbed.render({
      open: true,
      shouldCloseOnOverlayClick: false,
      onDismiss
    })

    testbed.tick()

    const mask = subject.ref('_content').node.parentNode
    mask.click()

    expect(onDismiss).to.not.have.been.called
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
      children: (
        <ModalBody>
          <Button>Cancel</Button>
        </ModalBody>
      )
    })

    // + 1 for x-icon button
    expect(subject.ref('_content').find(Button).length).to.equal(2)
  })

  describe('children validation', () => {
    it('should pass validation when children are valid', () => {
      function render () {
        testbed.render({
          open: true,
          children: [
            <ModalHeader key="header">Hello World</ModalHeader>,
            <ModalBody key="body">Foo Bar Baz</ModalBody>,
            <ModalFooter key="footer">
              <Button>Cancel</Button>
            </ModalFooter>
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
            <ModalFooter key="footer">
              <Button>Cancel</Button>
            </ModalFooter>,
            <ModalHeader key="header">Hello World</ModalHeader>
          ]
        })
      }

      expect(render).to.throw(Error)
    })
  })
})

describe('<Modal /> managed focus', () => {
  const applicationElement = document.createElement('div')
  class ModalExample extends React.Component {
    static propTypes = {
      ...Modal.PropTypes
    }

    render () {
      return (
        <div>
          <input type="text" />
          <Modal {...this.props} label="A Modal" closeButtonLabel="close" applicationElement={() => applicationElement}>
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
      closeButtonRef: el => {
        closeButton = el
      }
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

  it('should call onDismiss prop when Esc key pressed by default', () => {
    const onDismiss = testbed.stub()
    testbed.render({
      open: true,
      onDismiss
    })

    testbed.tick()

    testbed.wrapper.dispatchNativeKeyboardEvent('keyup', 'escape')

    expect(onDismiss).to.have.been.called
  })
})
