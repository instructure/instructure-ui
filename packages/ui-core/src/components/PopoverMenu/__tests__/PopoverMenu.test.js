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
import PopoverMenu from '../index'
import { MenuItem, MenuItemSeparator } from '../../Menu'

describe('<PopoverMenu />', () => {
  const testbed = new Testbed(
    <PopoverMenu
      trigger={<button>More</button>}
    >
      <MenuItem>Learning Mastery</MenuItem>
      <MenuItem disabled>Gradebook</MenuItem>
      <MenuItem type="radio" defaultChecked>
        Default (Grid view)
      </MenuItem>
      <MenuItem type="radio">
        Individual (List view)
      </MenuItem>
      <MenuItem type="checkbox" defaultChecked>
        Include Anchor Standards
      </MenuItem>
      <MenuItemSeparator />
      <MenuItem>Open grading history...</MenuItem>
    </PopoverMenu>
  )

  it('should render', () => {
    const subject = testbed.render()
    expect(subject).to.be.present()
  })

  it('should render when show and onToggle props are set', () => {
    const subject = testbed.render({
      show: true,
      onToggle: () => {}
    })

    expect(subject.instance()['_menu']).to.exist()
  })

  it('should not show by default', () => {
    const subject = testbed.render()

    expect(subject.instance().show).to.be.false()
  })

  it('should accept a default show', () => {
    const subject = testbed.render({
      defaultShow: true
    })

    expect(subject.instance()['_menu']).to.exist()
  })

  it('should provide content ref', () => {
    let content = null

    testbed.render({
      defaultShow: true,
      contentRef: (el) => {
        content = el
      }
    })

    expect(content).to.not.be.null()
  })

  it('should focus the menu', () => {
    const subject = testbed.render({
      defaultShow: true
    })

    testbed.tick()
    testbed.raf()

    expect(subject.ref('_menu').focused()).to.be.true()
  })

  it('should call onToggle on click', () => {
    const onToggle = testbed.stub()
    const subject = testbed.render({
      onToggle
    })

    subject.find('button').simulate('click')

    expect(onToggle).to.have.been.called()
  })

  it('should call onFocus on focus', () => {
    const onFocus = testbed.stub()
    const subject = testbed.render({
      onFocus
    })

    subject.find('button').simulate('focus')

    expect(onFocus).to.have.been.called()
  })

  it('should have an aria-haspopup attribute', () => {
    const subject = testbed.render()
    const btnElem = subject.find('button')

    expect(btnElem.getAttribute('aria-haspopup')).to.equal('true')
  })

  describe('for a11y', () => {
    it('should meet standards when menu is closed', (done) => {
      const subject = testbed.render()

      subject.should.be.accessible(done, {
        ignores: [
          'aria-allowed-role' // TODO: remove this when we fix it
        ]
      })
    })

    it('should meet standards when menu is open', (done) => {
      const subject = testbed.render({
        defaultShow: true
      })

      testbed.tick()
      testbed.raf()

      subject.should.be.accessible(done, {
        ignores: [
          'aria-allowed-role' // TODO: remove this when we fix it
        ]
      })
    })
  })
})
