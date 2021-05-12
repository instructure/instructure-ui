/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2021 - present Instructure, Inc.
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
import {
  expect,
  mount,
  locator,
  within,
  stub,
  wait
} from '@instructure/ui-test-utils'
import { color2hex } from '@instructure/ui-color-utils'
import { TreeNode } from '../index'

// @ts-expect-error ts-migrate(2339) FIXME: Property 'selector' does not exist on type 'typeof... Remove this comment to see the full error message
const TreeNodeLocator = locator(TreeNode.selector)

describe('<TreeNode />', async () => {
  it('should render children', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <TreeNode>
        <button>Hello World</button>
      </TreeNode>
    )
    const item = within(subject.getDOMNode())
    expect(item.find('Hello World')).to.exist()
  })

  it('supports containerRef prop', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const containerRef = stub()
    const node = (
      <div id="1">
        <TreeNode containerRef={containerRef}>
          <button>Hello World</button>
        </TreeNode>
      </div>
    )
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(node)
    const div = document.getElementById('1')
    expect(containerRef).to.have.been.calledWith(div)
  })

  describe('selected', async () => {
    it('should take the selected CSS props if it is selected', async () => {
      const pink = '#FF00FF'
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <TreeNode
          id="1"
          selected={true}
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
          themeOverride={{ selectedBackgroundColor: pink }}
        >
          <div> Hello!</div>
        </TreeNode>
      )
      const item = await TreeNodeLocator.find()
      expect(item).to.exist()
      expect(color2hex(item.getComputedStyle().backgroundColor)).to.equal(pink)
    })

    it('should take the focused class if it is focused', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <TreeNode id="1" focused={true}>
          <input />
        </TreeNode>
      )
      const item = await TreeNodeLocator.find()
      expect(item).to.exist()
      await wait(() => {
        expect(item.getComputedStyle(item, ':after').opacity).to.equal('1')
      })
    })
  })
})
