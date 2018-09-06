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
import DrawerTray from '../index'
import styles from '../styles.css'

describe('<DrawerTray />', () => {
  const testbed = new Testbed(
    <DrawerTray
      label="DrawerTray Example"
      render={() => {
        return 'Hello from layout tray'
      }}
    />
  )

  it(`should place the tray correctly with placement=start`, () => {
    testbed.render({
      open: true,
      placement: 'start'
    })

    testbed.tick()
    testbed.tick()

    const elementWithPlacementClass = document.querySelector(`.${styles['placement--start']}`)

    expect(elementWithPlacementClass).to.exist()
  })

  it(`should place the tray correctly with placement=end`, () => {
    testbed.render({
      open: true,
      placement: 'end'
    })

    testbed.tick()
    testbed.tick()

    const elementWithPlacementClass = document.querySelector(`.${styles['placement--end']}`)

    expect(elementWithPlacementClass).to.exist()
  })

  it('should render tray content when open', () => {
    testbed.render({ open: true })

    testbed.tick()
    testbed.tick()

    expect(document.querySelector('[aria-label="DrawerTray Example"]')).to.exist()
  })

  it('should not render tray content when closed', () => {
    const subject = testbed.render()
    expect(subject.ref('_trayContent').node).to.equal(undefined) // eslint-disable-line no-undefined
  })

  it('should apply theme overrides when open', () => {
    const subject = testbed.render({
      open: true,
      theme: {
        zIndex: '333'
      }
    })

    testbed.tick()
    testbed.tick()

    const tray = subject.getDOMNode()

    expect(window.getComputedStyle(tray).zIndex)
      .to.equal('333')
  })

  it('should call the contentRef', () => {
    const contentRef = testbed.spy()
    const subject = testbed.render({
      open: true,
      contentRef
    })

    testbed.tick()
    testbed.tick()

    expect(contentRef).to.have.been.calledWith(subject.ref('_content').node)
  })

  it('should call onOpen ', () => {
    const onOpen = testbed.spy()
    const subject = testbed.render({
      open: false,
      onOpen
     })

    testbed.tick()
    testbed.tick()

    expect(onOpen).to.not.have.been.called()

    subject.setProps({
      open: true
    })

    testbed.tick()
    testbed.tick()

    expect(onOpen).to.have.been.called()
  })

  it('should call onOpen when open initially', () => {
    const onOpen = testbed.spy()

    testbed.render({ onOpen, open: true })

    testbed.tick()
    testbed.tick()

    expect(onOpen).to.have.been.called()
  })

  it('should call onClose ', () => {
    const onClose = testbed.spy()
    const subject = testbed.render({ onClose, open: true })

    testbed.tick()
    testbed.tick()

    expect(onClose).to.not.have.been.called()

    subject.setProps({ open: false })

    testbed.tick()
    testbed.tick()

    expect(onClose).to.have.been.called()
  })

  it('drops a shadow if the prop is set, and it is overlaying content', () => {
    const subject = testbed.render({
      open: true,
      shadow: true
    },{
      shouldOverlayTray: true
    })

    testbed.tick()
    testbed.tick()

    expect(subject.hasClass(styles['shadow'])).to.be.true()

    subject.setContext({shouldOverlayTray: false})

    expect(subject.hasClass(styles['shadow'])).to.be.false()
  })

  it('should apply the a11y attributes', () => {
    testbed.render({
      label: 'a tray test',
      open: true
    })

    testbed.tick()
    testbed.tick()

    const tray = document.querySelector('[aria-label="a tray test"]')
    expect(tray.getAttribute('role')).to.equal('dialog')
  })
})
