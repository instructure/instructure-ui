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
import { expect, mount, stub, wait } from '@instructure/ui-test-utils'

import DrawerLayoutFixture from '../__fixtures__/DrawerLayout.fixture'
import DrawerLayoutLocator from '../locator'

describe('<DrawerLayout />', async () => {
  it('should render', async () => {
    await mount(
      <DrawerLayoutFixture />
    )
    const layout = await DrawerLayoutLocator.find()

    expect(layout).to.exist()
  })

  it('should render a DrawerTray and DrawerContent', async () => {
    await mount(
      <DrawerLayoutFixture
        open={true}
        layoutWidth="800px"
        trayWidth="250px"
      />
    )

    const layout = await DrawerLayoutLocator.find()
    const tray = await layout.findTray(':contains(Hello from tray)')
    const content = await layout.findContent(':label(Test DrawerContent)')

    expect(tray).to.exist()
    expect(content).to.exist()
  })

  it(`with no overlay, layout content should have margin equal to tray width with placement=start`, async () => {
    await mount(
      <DrawerLayoutFixture
        open={true}
        layoutWidth="800px"
        trayWidth="250px"
      />
    )

    const layout = await DrawerLayoutLocator.find()
    const content = await layout.findContent()

    await wait(() => {
      const margin = px(content.getComputedStyle().marginLeft)
      expect(within(margin, 250, 2)).to.be.true()
    })
  })

  it(`with no overlay, layout content should have margin equal to tray width with placement=end`, async () => {
    await mount(
      <DrawerLayoutFixture
        open={true}
        placement="end"
        layoutWidth="800px"
        trayWidth="250px"
      />
    )

    const layout = await DrawerLayoutLocator.find()
    const content = await layout.findContent()

    await wait(() => {
      const margin = px(content.getComputedStyle().marginRight)
      expect(within(margin, 250, 2)).to.be.true()
    })
  })

  it(`with overlay, layout content should have a margin of zero with placement=start`, async () => {
    await mount(
      <DrawerLayoutFixture
        open={true}
        layoutWidth="700px"
        trayWidth="250px"
      />
    )

    const layout = await DrawerLayoutLocator.find()
    const content = await layout.findContent()

    await wait(() => {
      const margin = px(content.getComputedStyle().marginLeft)
      expect(margin).to.equal(0)
    })
  })

  it(`with overlay, layout content should have a margin of zero with placement=end`, async () => {
    await mount(
      <DrawerLayoutFixture
        open={true}
        placement="end"
        layoutWidth="700px"
        trayWidth="250px"
      />
    )

    const layout = await DrawerLayoutLocator.find()
    const content = await layout.findContent(':label(Test DrawerContent)')

    await wait(() => {
      const margin = px(content.getComputedStyle().marginRight)
      expect(margin).to.equal(0)
    })
  })

  it('the tray should overlay the content when the content is less than the minWidth', async () => {
    const onOverlayTrayChange = stub()
    const subject = await mount(
      <DrawerLayoutFixture
        open={true}
        layoutWidth="800px"
        onOverlayTrayChange={onOverlayTrayChange}
      />
    )

    subject.setProps({
      layoutWidth: '295px'
    })

    await wait(() => {
      expect(onOverlayTrayChange.lastCall.args[0]).to.be.true()
    })
  })

  it('the tray should stop overlaying the content when there is enough space for the content', async () => {
    const onOverlayTrayChange = stub()
    const subject = await mount(
      <DrawerLayoutFixture
        open={true}
        layoutWidth="400px"
        onOverlayTrayChange={onOverlayTrayChange}
      />
    )

    subject.setProps({
      layoutWidth: '705px'
    })

    await wait(() => {
      expect(onOverlayTrayChange.lastCall.args[0]).to.be.false()
    })
  })

  it('the tray should be set to overlay when it is opened and there is not enough space', async () => {
    const onOverlayTrayChange = stub()
    const subject = await mount(
      <DrawerLayoutFixture
        open={true}
        layoutWidth="295px"
        onOverlayTrayChange={onOverlayTrayChange}
      />
    )

    subject.setProps({ open: true })

    await wait(() => {
      expect(onOverlayTrayChange.lastCall.args[0]).to.be.true()
    })
  })

  it('the tray should not overlay on open when there is enough space', async() => {
    const onOverlayTrayChange = stub()
    const subject = await mount(
      <DrawerLayoutFixture
        open={true}
        layoutWidth="705px"
        onOverlayTrayChange={onOverlayTrayChange}
      />
    )

    subject.setProps({open: true})

    await wait(() => {
      expect(onOverlayTrayChange.lastCall.args[0]).to.be.false()
    })
  })
})
