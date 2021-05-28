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

import { expect, mount, stub, wait } from '@instructure/ui-test-utils'
import { DrawerContent } from '../index'

import { DrawerContentLocator } from '../DrawerContentLocator'

describe('<DrawerContent />', async () => {
  it('should render', async () => {
    await mount(
      <DrawerContent label="DrawerContentTest">Hello World</DrawerContent>
    )
    const drawerContent = await DrawerContentLocator.find()

    expect(drawerContent).to.exist()
  })

  it('should not have a transition class if `shouldTransition` is set to false', async () => {
    const subject = await mount(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <DrawerContent label="DrawerContentTest" shouldTransition={false}>
        Hello World
      </DrawerContent>
    )
    const tr = await DrawerContentLocator.find('[class*=-transition]', {
      expectEmpty: true
    })
    expect(tr).to.not.exist()
    subject.setProps({
      shouldTransition: true,
      label: 'test'
    })
    await wait(() => {
      const drawerContent = DrawerContentLocator.find('[class*=-transition]')
      expect(drawerContent).to.exist()
    })
  })

  it('should call the content ref', async () => {
    const contentRef = stub()
    await mount(
      <DrawerContent label="DrawerContentTest" contentRef={contentRef}>
        Hello World
      </DrawerContent>
    )
    const drawerContent = (await DrawerContentLocator.find()).getDOMNode()

    expect(contentRef).to.have.been.calledWith(drawerContent)
  })
})
