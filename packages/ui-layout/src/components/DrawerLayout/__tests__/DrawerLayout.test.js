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

import DrawerLayoutFixture from '../__fixtures__/DrawerLayout.fixture'

describe('<DrawerLayout />', () => {
  const testbed = new Testbed(
    <DrawerLayoutFixture />
  )

  beforeEach(() => {
    testbed.setTextDirection('ltr')
  })

  it('should render', () => {
    const subject = testbed.render()
    expect(subject).to.be.present()
  })

  it(`with no overlay, layout content should have margin equal to tray width with placement=start`, () => {
    const trayWidth = '250px'
    const subject = testbed.render({
      trayWidth,
      trayPlacement: 'start',
      layoutWidth: '800px',
      trayOpen: true
    })

    testbed.tick()
    testbed.tick()

    const node = subject.find('[aria-label="Test DrawerContent"]')

    const margin = px(node.props().style['marginLeft'])

    expect(within(margin, px(trayWidth), 2)).to.be.true() // added some tolerance for client rect measurements
  })

  it(`with no overlay, layout content should have margin equal to tray width with placement=end`, () => {
    const trayWidth = '250px'
    const subject = testbed.render({
      trayWidth,
      trayPlacement: 'end',
      layoutWidth: '800px',
      trayOpen: true
    })

    testbed.tick()
    testbed.tick()

    const node = subject.find('[aria-label="Test DrawerContent"]')

    const margin = px(node.props().style['marginRight'])

    expect(within(margin, px(trayWidth), 2)).to.be.true() // added some tolerance for client rect measurements
  })

  it(`with overlay, layout content should have a margin of zero with placement=start`, () => {
    testbed.render({
      trayWidth: '250px',
      trayPlacement: 'start',
      layoutWidth: '700px',
      trayOpen: true
    })

    testbed.tick()
    testbed.tick()

    const node = document.querySelector('[aria-label="Test DrawerContent"]')

    expect(node.style['marginLeft']).to.equal('0px')
  })

  it(`with overlay, layout content should have a margin of zero with placement=end`, () => {
    testbed.render({
      trayWidth: '250px',
      trayPlacement: 'end',
      layoutWidth: '700px',
      trayOpen: true
    })

    testbed.tick()
    testbed.tick()

    const node = document.querySelector('[aria-label="Test DrawerContent"]')

    expect(node.style['marginRight']).to.equal('0px')
  })

  it('the tray should overlay the content when the content is less than the minWidth', () => {
    const onOverlayTrayChange = testbed.spy()

    const subject = testbed.render({
      trayOpen: true,
      trayWidth: '200px',
      layoutWidth: '800px',
      onOverlayTrayChange
    })

    testbed.tick()
    testbed.tick()

    subject.setProps({
      layoutWidth: '695px'
    })

    testbed.tick()
    testbed.tick()

    onOverlayTrayChange.should.have.been.calledWith(true)
  })

  it('the tray should stop overlaying the content when there is enough space for the content', () => {
    const onOverlayTrayChange = testbed.spy()

    const subject = testbed.render({
      trayOpen: true,
      trayWidth: '200px',
      layoutWidth: '400px',
      onOverlayTrayChange
    })

    testbed.tick()
    testbed.tick()

    subject.setProps({
      layoutWidth: '705px'
    })

    testbed.tick()
    testbed.tick()

    onOverlayTrayChange.should.have.been.calledWith(false)
  })

  it('the tray should be set to overlay when it is opened and there is not enough space', () => {
    const onOverlayTrayChange = testbed.spy()
    const subject = testbed.render({
      trayOpen: false,
      trayWidth: '200px',
      layoutWidth: '695px',
      onOverlayTrayChange
    })

    testbed.tick()
    testbed.tick()

    subject.find('button').click() // opens tray

    testbed.tick()
    testbed.tick()

    onOverlayTrayChange.should.have.been.calledWith(true)
  })

  it('the tray should not overlay on open when there is enough space', () => {
    const onOverlayTrayChange = testbed.spy()
    const subject = testbed.render({
      trayOpen: false,
      trayWidth: '200px',
      layoutWidth: '705px',
      onOverlayTrayChange
    })

    testbed.tick()
    testbed.tick()

    subject.find('button').click() // opens tray

    testbed.tick()
    testbed.tick()

    onOverlayTrayChange.should.have.been.calledWith(false)
  })
})
