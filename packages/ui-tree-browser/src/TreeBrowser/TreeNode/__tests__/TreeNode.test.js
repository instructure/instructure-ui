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
  stub
} from '@instructure/ui-test-utils'

import { TreeNode } from '../index'
import styles from '../../TreeButton/styles.css'

const TreeNodeLocator = locator(TreeNode.selector)

describe('<TreeNode />', async () => {
  it('should render children', async () => {
    const subject = await mount(
      <TreeNode>
        <button>Hello World</button>
      </TreeNode>
    )
    const item = within(subject.getDOMNode())
    expect(item.find('Hello World')).to.exist()
  })

  it('supports containerRef prop', async () => {
    const containerRef = stub()
    const node = (
      <div id="1">
        <TreeNode containerRef={containerRef}>
          <button>Hello World</button>
        </TreeNode>
      </div>
    )
    await mount(node)
    const div = document.getElementById('1')
    expect(containerRef).to.have.been.calledWith(div)
  })

  describe('selected', async () => {
    it('should take the selected class if it is selected', async () => {
      await mount(
        <TreeNode id="1" selected={true}>
          <div> Hello!</div>
        </TreeNode>
      )
      const item = await TreeNodeLocator.find()
      expect(item.hasClass(styles['selected'])).to.be.true()
    })

    it('should take the focused class if it is focused', async () => {
      await mount(
        <TreeNode id="1" focused={true}>
          <input />
        </TreeNode>
      )
      const item = await TreeNodeLocator.find()
      expect(item.hasClass(styles['focused'])).to.be.true()
    })
  })
})
