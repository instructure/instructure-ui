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
import { expect, mount, spy } from '@instructure/ui-test-utils'

import { Expandable } from '../index'

describe('<Expandable />', async () => {
  it('should set expanded to false by default', async () => {
    const props = {
      // eslint-disable-next-line react/display-name
      render: () => <div>hello</div>
    }
    const renderSpy = spy(props, 'render')
    await mount(<Expandable {...props} />)
    const lastCallArgs: Expandable[] = renderSpy.lastCall.args as Expandable[]
    expect(lastCallArgs[0].expanded).to.be.false()
  })

  it('should correctly provide the aria-expanded attribute', async () => {
    const props = {
      // eslint-disable-next-line react/display-name
      render: () => <div>hello</div>
    }
    const renderSpy = spy(props, 'render')

    await mount(<Expandable {...props} />)
    const lastCallArgs: any[] = renderSpy.lastCall.args
    const ariaExpanded = lastCallArgs[0].getToggleProps()['aria-expanded']
    expect(ariaExpanded).to.be.false()
  })

  it('should provide the toggle and details with a shared, unique id', async () => {
    const props = {
      // eslint-disable-next-line react/display-name
      render: () => <div>hello</div>
    }
    const renderSpy = spy(props, 'render')

    await mount(<Expandable {...props} />)

    const lastCallArgs: any[] = renderSpy.lastCall.args
    const toggleId = lastCallArgs[0].getToggleProps()['aria-controls']
    const detailsId = lastCallArgs[0].getDetailsProps()['id']

    expect(toggleId).to.exist()
    expect(detailsId).to.exist()

    expect(toggleId).to.equal(detailsId)
  })

  it('should call onToggle when onClick is called', async () => {
    const onToggleSpy = spy()

    const props = {
      // eslint-disable-next-line react/display-name
      render: () => <div>hello</div>,
      onToggle: onToggleSpy,
      expanded: false
    }
    const renderSpy = spy(props, 'render')

    await mount(<Expandable {...props} />)

    const lastCallArgs: any[] = renderSpy.lastCall.args
    const onClick = lastCallArgs[0].getToggleProps().onClick
    onClick(new Event('click'))

    const firstCallArgs: any[] = onToggleSpy.firstCall.args
    expect(firstCallArgs[0].type).to.equal('click')
    expect(firstCallArgs[1]).to.be.true()
  })

  it('should set expanded to true when defaultExpanded is true', async () => {
    const props = {
      // eslint-disable-next-line react/display-name
      render: () => <div>hello</div>,
      defaultExpanded: true
    }
    const renderSpy = spy(props, 'render')

    await mount(<Expandable {...props} />)

    const lastCallArgs: Expandable[] = renderSpy.lastCall.args as Expandable[]
    expect(lastCallArgs[0].expanded).to.be.true()
  })
})
