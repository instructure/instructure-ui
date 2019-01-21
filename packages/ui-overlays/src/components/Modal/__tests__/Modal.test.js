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
import { expect, mount, stub, spy, wait, within } from '@instructure/ui-test-utils'

import Modal, { ModalHeader, ModalBody, ModalFooter } from '../index'
import ModalLocator from '../locator'
import styles from '../styles.css'

describe('<Modal />', async () => {
  it('should render nothing and have a node with no parent when closed', async () => {
    await mount(
      <Modal
        label="Modal Dialog"
        shouldReturnFocus={false}
      >
        <ModalBody>Foo Bar Baz</ModalBody>
      </Modal>
    )
    const modal = await ModalLocator.find(':label(Modal Dialog)', { expectEmpty: true })

    expect(modal).to.not.exist()
  })

  it('should render its own layout wrapper if fullscreen', async () => {
    await mount(
      <Modal
        open
        size="fullscreen"
        label="Modal Dialog"
        shouldReturnFocus={false}
      >
        <ModalBody>Foo Bar Baz</ModalBody>
      </Modal>
    )

    const modal = await ModalLocator.find(':label(Modal Dialog)')
    const layout = await modal.find(`.${styles['fullscreenLayout']}`)

    expect(layout).to.exist()
  })

  it('should apply theme overrides when open', async () => {
    await mount(
      <Modal
        open
        size="small"
        label="Modal Dialog"
        shouldReturnFocus={false}
        theme={{
          smallMaxWidth: '10em'
        }}
      >
        <ModalBody>Foo Bar Baz</ModalBody>
      </Modal>
    )

    const modal = await ModalLocator.find()
    const body = await modal.findBody()

    await wait(() =>  {
      expect(body.getComputedStyle().width)
        .to.equal('158px') // subtract the borders
    })
  })

  it('should render its own positioning context if constrained to parent', async () => {
    await mount(
      <Modal
        open
        label="Modal Dialog"
        shouldReturnFocus={false}
        constrain="parent"
      >
        <ModalBody>Foo Bar Baz</ModalBody>
      </Modal>
    )

    const modal = await ModalLocator.find(':label(Modal Dialog)')
    const constrain = await modal.find(`.${styles['constrainContext']}`)

    expect(constrain).to.exist()
  })

  it('should not inherit its parent\'s font color', async () => {
    await mount(
      <div style={{color: 'rgb(255, 255, 255)'}}>
        <Modal
          open
          label="Modal Dialog"
          shouldReturnFocus={false}
          constrain="parent"
          theme={{
            textColor: 'rgb(0, 0, 0)'
          }}
        >
          <ModalBody>Foo Bar Baz</ModalBody>
        </Modal>
      </div>
    )

    const modal = await ModalLocator.find()
    const body = await modal.findBody()

    expect(body.getComputedStyle().color).to.equal('rgb(0, 0, 0)')
  })

  it('should handle null children', async () => {
    await mount(
      <Modal
        open
        label="Modal Dialog"
        shouldReturnFocus={false}
      >
        {null}
        <ModalBody>Foo Bar Baz</ModalBody>
        {null}
      </Modal>
    )
    const modal = await ModalLocator.find()

    expect(modal).to.exist()
  })

  it('should apply the aria attributes', async () => {
    await mount(
      <Modal
        open
        label="Modal Dialog"
        shouldReturnFocus={false}
      >
        <ModalBody>Foo Bar Baz</ModalBody>
      </Modal>
    )
    const modal = await ModalLocator.find()
    const dialog = await modal.find(':label(Modal Dialog)')

    expect(dialog.getAttribute('role')).to.equal('dialog')
  })

  it('should use transition', async  () => {
    const onEnter = stub()
    const onEntering = stub()
    const onEntered = stub()

    await mount(
      <Modal
        open
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        transition="fade"
        label="Modal Dialog"
        shouldReturnFocus={false}
      >
        <ModalBody>Foo Bar Baz</ModalBody>
      </Modal>
    )

    await wait(() => {
      expect(onEnter).to.have.been.calledOnce()
      expect(onEntering).to.have.been.calledOnce()
      expect(onEntered).to.have.been.calledOnce()
    })
  })

  it('should support onOpen prop', async () => {
    const onOpen = stub()
    await mount(
      <Modal
        open
        onOpen={onOpen}
        label="Modal Dialog"
        shouldReturnFocus={false}
      >
        <ModalBody>Foo Bar Baz</ModalBody>
      </Modal>
    )

    await wait(() => {
      expect(onOpen).to.have.been.calledOnce()
    })
  })

  it('should support onClose prop', async () => {
    const onClose = stub()
    const subject = await mount(
      <Modal
        open
        onClose={onClose}
        label="Modal Dialog"
        shouldReturnFocus={false}
      >
        <ModalBody>Foo Bar Baz</ModalBody>
      </Modal>
    )

    await subject.setProps({ open: false })

    await wait (()  => {
      expect(onClose).to.have.been.calledOnce()
    })
  })

  it('should dismiss when overlay clicked by default', async () => {
    const onDismiss = stub()
    await mount(
      <Modal
        open
        onDismiss={onDismiss}
        label="Modal Dialog"
        shouldReturnFocus={false}
      >
        <ModalBody>Foo Bar Baz <button>click me</button></ModalBody>
      </Modal>
    )

    const modal = await ModalLocator.find()

    await wait(() => {
      expect(modal.containsFocus()).to.be.true()
    })

    await within(modal.getOwnerDocument().documentElement)
      .click()

    await wait (() => {
      expect(onDismiss).to.have.been.calledOnce()
    })
  })

  it('should NOT dismiss when overlay clicked with shouldCloseOnDocumentClick=false', async () => {
    const onDismiss = stub()
    await mount(
      <Modal
        open
        onDismiss={onDismiss}
        label="Modal Dialog"
        shouldReturnFocus={false}
        shouldCloseOnDocumentClick={false}
      >
        <ModalBody>Foo Bar Baz <button>click me</button></ModalBody>
      </Modal>
    )

    let modal = await ModalLocator.find()

    await wait(() => {
      expect(modal.containsFocus()).to.be.true()
    })

    await within(modal.getOwnerDocument().documentElement)
      .click()

    await wait (() => {
      expect(onDismiss).to.not.have.been.called()
    })

    expect(modal).to.exist()
  })

  it('should dismiss when close button is clicked', async () => {
    const onDismiss = stub()
    const consoleWarn = spy(console, 'warn')

    await mount(
      <Modal
        open
        onDismiss={onDismiss}
        label="Modal Dialog"
        closeButtonLabel="Close"
        shouldReturnFocus={false}
      >
        <ModalBody>Foo Bar Baz</ModalBody>
      </Modal>
    )

    expect(consoleWarn)
      .to.have.been.calledWithMatch('Warning: [Modal] `closeButtonLabel` was deprecated in 5.0.0.')

    const modal = await ModalLocator.find(':label(Modal Dialog)')
    const closeButton = await modal.find(':label(Close)')

    await wait(() => {
      expect(modal.containsFocus()).to.be.true()
    })

    await closeButton.click()

    await wait(() => {
      expect(onDismiss).to.have.been.called()
    })
  })

  it('should render children', async () => {
    await mount(
      <Modal
        open
        label="Modal Dialog"
        shouldReturnFocus={false}
      >
        <ModalBody>
          <button>Cancel</button>
        </ModalBody>
      </Modal>
    )
    const modal = await ModalLocator.find(':label(Modal Dialog)')
    const cancelButton = await modal.find(':label(Cancel)')

    expect(cancelButton).to.exist()
  })

  describe('children validation', async () => {
    it('should pass validation when children are valid', async () => {
      await expect(
        mount(
          <Modal
            open
            label="Modal Dialog"
            shouldReturnFocus={false}
          >
            <ModalHeader>Hello World</ModalHeader>
            <ModalBody>Foo Bar Baz</ModalBody>
            <ModalFooter>
              <button>Cancel</button>
            </ModalFooter>
          </Modal>
        )
      ).to.not.be.rejected()
    })

    it('should not pass validation when children are invalid', async () => {
      const consoleError = stub(console, 'error')
      await mount(
        <Modal
          open
          label="Modal Dialog"
          shouldReturnFocus={false}
        >
          <ModalBody>Foo Bar Baz</ModalBody>
          <ModalFooter>
            <button>Cancel</button>
          </ModalFooter>
          <ModalHeader>Hello World</ModalHeader>
        </Modal>
      )
      expect(consoleError)
        .to.have.been.calledWithMatch('Expected children of Modal in one of the following formats:')
    })

    it('should pass inverse variant to children when set', async () => {
      let headerRef
      let bodyRef
      let footerRef

      await mount(
        <Modal
          open
          label="Dark Modal"
          shouldReturnFocus={false}
          variant="inverse"
        >
          <ModalHeader ref={el => headerRef = el}>Hello Dark World</ModalHeader>
          <ModalBody ref={el => bodyRef = el}>Foo Bar Baz</ModalBody>
          <ModalFooter ref={el => footerRef = el}>
            <button>Cancel</button>
          </ModalFooter>
        </Modal>
      )

      expect(headerRef.props.variant).to.equal('inverse')
      expect(bodyRef.props.variant).to.equal('inverse')
      expect(footerRef.props.variant).to.equal('inverse')
    })
  })

  describe('managed focus', async () => {
    class ModalExample extends React.Component {
      static propTypes = {
        ...Modal.propTypes
      }

      render () {
        return (
          <div>
            <input type="text" />
            <Modal {...this.props}>
              <ModalHeader><button>Close</button></ModalHeader>
              <ModalBody>
                <input type="text" id="input-one" />
                <input type="text" id="input-two" />
              </ModalBody>
              <ModalFooter>
                <button>Cancel</button>
              </ModalFooter>
            </Modal>
          </div>
        )
      }
    }

    it('should focus closeButton by default', async () => {
      await mount(
        <ModalExample open label="A Modal" />
      )

      const modal = await ModalLocator.find(':label(A Modal)')
      const closeButton  = await modal.find(':label(Close)')

      await wait(() => {
        expect(closeButton.focused()).to.be.true()
      })
    })

    it('should take a prop for finding default focus', async () => {
      await mount(
        <ModalExample
          open
          label="A Modal"
          defaultFocusElement={() => {
            return document.getElementById('input-one')
          }}
        />
      )

      const modal = await ModalLocator.find(':label(A Modal)')
      const input = await modal.find('#input-one')

      await wait(() => {
        expect(input.focused()).to.be.true()
      })
    })

    it('should call onDismiss prop when Esc key pressed by default', async () => {
      const onDismiss = stub()
      await mount(
        <ModalExample
          open
          onDismiss={onDismiss}
          label="A Modal"
          defaultFocusElement={() => {
            return document.getElementById('input-one')
          }}
        />
      )

      const modal = await ModalLocator.find()

      await wait(() => {
        expect(modal.containsFocus()).to.be.true()
      })

      await within(modal.getOwnerDocument().documentElement)
        .keyUp('escape', null, { focusable: false })

      await wait(() => {
        expect(onDismiss).to.have.been.called()
      })
    })
  })
})
