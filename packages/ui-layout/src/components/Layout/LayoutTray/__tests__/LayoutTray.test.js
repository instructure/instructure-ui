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
import px from '@instructure/ui-utils/lib/px'
import within from '@instructure/ui-utils/lib/within'
import LayoutTray from '../index'
import styles from '../styles.css'

describe('<LayoutTray />', () => {
  const applicationElement = document.createElement('div')
  const testbed = new Testbed(
    <LayoutTray
      label="Layout Tray Test"
      closeButtonLabel="Close"
      applicationElement={() => applicationElement}
    >
      Hello from layout tray
    </LayoutTray>
  )

  function testTrayPlacement (placement) {
    it(`should place the tray correctly at ${placement}`, () => {
      const subject = testbed.render({
        open: true,
        placement
      })

      testbed.tick()
      testbed.tick()

      expect(subject.hasClass(styles[`placement--${placement}`])).to.be.true
    })
  }

  testTrayPlacement('start')
  testTrayPlacement('end')

  it('should render tray content when open', () => {
    const subject = testbed.render({ open: true })

    testbed.tick()
    testbed.tick()

    expect(subject.ref('_trayContent').node).to.exist
  })

  it('should not render tray content when closed', () => {
    const subject = testbed.render()
    expect(subject.ref('_trayContent').node).to.equal(undefined)
  })

  it('should call the contentRef', () => {
    const contentRef = testbed.spy()
    const subject = testbed.render({
      open: true,
      contentRef
    })

    testbed.tick()
    testbed.tick()

    expect(contentRef).to.have.been.calledWith(subject.ref('_trayContent').node)
  })

  it('should call the closeButtonRef', () => {
    const closeButtonRef = testbed.spy()
    const subject = testbed.render({
      open: true,
      closeButtonRef
    })

    testbed.tick()
    testbed.tick()

    expect(closeButtonRef).to.have.been.calledWith(subject.ref('_closeButton').node)
  })

  it('should call onDismiss', () => {
    const onDismiss = testbed.spy()
    const subject = testbed.render({
      open: true,
      onDismiss
    })

    testbed.tick()
    testbed.tick()

    subject.ref('_closeButton').click()
    expect(onDismiss).to.have.been.called
  })

  it('should call onOpen ', (done) => {
    const onOpen = testbed.spy()
    const subject = testbed.render({ onOpen })

    expect(onOpen).to.not.have.been.called

    subject.setProps({ open: true }, () => {
      expect(onOpen).to.have.been.called
      done()
    })
  })

  it('should call onOpen when open initially', () => {
    const onOpen = testbed.spy()
    testbed.render({ onOpen, open: true })

    expect(onOpen).to.have.been.called
  })

  it('calls onSizeChange with the correct width, when open initially', () => {
    const trayWidth = '200px'
    const onSizeChange = testbed.spy()
    testbed.render({
      open: true,
      children: <div style={{width: trayWidth}}>foo</div>,
      onSizeChange
    })

    const calledSize = onSizeChange.lastCall.args[0]
    expect(within(calledSize.width, px(trayWidth), 2)).to.be.true
  })

  it('calls onSizeChange, with the correct width, when going from closed to open', (done) => {
    const trayWidth = '200px'
    const onSizeChange = testbed.spy()
    const subject = testbed.render({
      children: <div style={{width: trayWidth}}>foo</div>,
      onSizeChange
    })

    subject.setProps({ open: true }, () => {
      testbed.tick()
      const calledSize = onSizeChange.lastCall.args[0]
      expect(within(calledSize.width, px(trayWidth), 2)).to.be.true
      done()
    })
  })

  it('calls onSizeChange, with a value of 0, when going from open to closed', (done) => {
    const trayWidth = '200px'
    const onSizeChange = testbed.spy()
    const subject = testbed.render({
      open: true,
      children: <div style={{width: trayWidth}}>foo</div>,
      onSizeChange
    })

    subject.setProps({ open: false }, () => {
      testbed.tick()
      const calledSize = onSizeChange.lastCall.args[0]
      expect(calledSize.width).to.equal(0)
      done()
    })
  })

  it('drops a shadow if the prop is set, and it is overlaying content', (done) => {
    const subject = testbed.render({
      open: true,
      overlay: true,
      shadow: true
    })

    testbed.tick()
    testbed.tick()

    expect(subject.hasClass(styles['shadow'])).to.be.true

    subject.setProps({ overlay: false }, () => {
      testbed.tick()
      expect(subject.hasClass(styles['shadow'])).to.be.false
      done()
    })
  })

  it('should apply the a11y attributes', () => {
    const subject = testbed.render({ open: true })
    const tray = subject.ref('_trayContent').node

    testbed.tick()
    testbed.tick()

    expect(tray.querySelector('[role="region"]')).to.exist
    expect(tray.querySelector('[aria-label="Layout Tray Test"]')).to.exist
  })
})
