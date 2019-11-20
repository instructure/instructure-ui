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

import { expect, mount, stub, wait, locator } from '@instructure/ui-test-utils'
import { DrawerTray } from '../index'
import styles from '../styles.css'

const DrawerTrayLocator = locator(DrawerTray.selector)

describe('<DrawerTray />', async () => {
  it(`should place the tray correctly with placement=start`, async () => {
    await mount(
      <DrawerTray
        label="DrawerTray Example"
        open={true}
        placement="start"
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )
    const drawerTray = await DrawerTrayLocator.find()

    expect(drawerTray).to.exist()
    expect(drawerTray.hasClass(styles['placement--start'])).to.be.true()
  })

  it(`should place the tray correctly with placement=end`, async () => {
    await mount(
      <DrawerTray
        label="DrawerTray Example"
        open={true}
        placement="end"
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )
    const drawerTray = await DrawerTrayLocator.find()

    expect(drawerTray).to.exist()
    expect(drawerTray.hasClass(styles['placement--end'])).to.be.true()
  })

  it('should render tray content when open', async () => {
    await mount(
      <DrawerTray
        label="DrawerTray Example"
        open={true}
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )
    const drawerTray = await DrawerTrayLocator.find(
      ':label(DrawerTray Example):contains(Hello from layout tray)'
    )

    expect(drawerTray).to.exist()
  })

  it('should not render tray content when closed', async () => {
    await mount(
      <DrawerTray
        label="DrawerTray Example"
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )
    const drawerTray = await DrawerTrayLocator.find({ expectEmpty: true })

    expect(drawerTray).to.not.exist()
  })

  it('should apply theme overrides when open', async () => {
    await mount(
      <DrawerTray
        label="DrawerTray Example"
        open={true}
        theme={{
          zIndex: '333'
        }}
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )
    const drawerTray = await DrawerTrayLocator.find()

    expect(drawerTray).to.exist()
    expect(drawerTray.getComputedStyle().zIndex).to.equal('333')
  })

  it('should call the contentRef', async () => {
    const contentRef = stub()
    await mount(
      <DrawerTray
        label="DrawerTray Example"
        open={true}
        contentRef={contentRef}
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )
    const drawerTray = (await DrawerTrayLocator.find()).getDOMNode()

    expect(contentRef).to.have.been.calledWith(drawerTray)
  })

  it('should call onOpen ', async () => {
    const onOpen = stub()
    const subject = await mount(
      <DrawerTray
        label="DrawerTray Example"
        open={false}
        onOpen={onOpen}
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )

    expect(onOpen).to.not.have.been.called()

    subject.setProps({
      open: true
    })

    await wait(() => {
      expect(onOpen).to.have.been.called()
    })
  })

  it('should call onOpen when open initially', async () => {
    const onOpen = stub()
    await mount(
      <DrawerTray
        label="DrawerTray Example"
        open={true}
        onOpen={onOpen}
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )

    await wait(() => {
      expect(onOpen).to.have.been.called()
    })
  })

  it('should call onClose ', async () => {
    const onClose = stub()
    const subject = await mount(
      <DrawerTray
        label="DrawerTray Example"
        open={true}
        onClose={onClose}
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )

    expect(onClose).to.not.have.been.called()

    subject.setProps({
      open: false
    })

    await wait(() => {
      expect(onClose).to.have.been.called()
    })
  })

  it('drops a shadow if the prop is set, and it is overlaying content', async () => {
    const onEntered = stub()
    const subject = await mount(
      <DrawerTray
        label="DrawerTray Example"
        open={true}
        shadow={true}
        onEntered={onEntered}
        render={() => {
          return 'Hello from layout tray'
        }}
      />)

    const drawerTray = await DrawerTrayLocator.find()

    subject.setContext({
      shouldOverlayTray: true
    })

    await wait(() => {
      expect(drawerTray.hasClass(styles['shadow'])).to.be.true()
    })
  })

  it('should apply the a11y attributes', async () => {
    await mount(
      <DrawerTray
        label="a tray test"
        open={true}
        render={() => {
          return 'Hello from layout tray'
        }}
      />
    )
    const drawerTray = await DrawerTrayLocator.find()
    const dialog = await drawerTray.find(':label(a tray test)')

    expect(dialog).to.exist()
    expect(dialog.getAttribute('role')).to.equal('dialog')
  })
})
