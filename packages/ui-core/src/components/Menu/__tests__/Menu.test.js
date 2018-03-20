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
import Menu, { MenuItem, MenuItemSeparator, MenuItemGroup } from '../index'

describe('<Menu />', () => {
  const testbed = new Testbed(
    <Menu>
      <MenuItem>Default (Grid view)</MenuItem>
      <MenuItem value="foo">Learning Mastery</MenuItem>
      <MenuItem disabled>Individual (List view)</MenuItem>
      <MenuItem type="checkbox" value="bar">Toggle Me</MenuItem>
      <MenuItemSeparator />
      <MenuItemGroup label="Select one">
        <MenuItem defaultSelected value="one">
          Select me
        </MenuItem>
        <MenuItem value="two">
          Or select me
        </MenuItem>
      </MenuItemGroup>
      <MenuItemSeparator />
      <MenuItemGroup allowMultiple label="Select many">
        <MenuItem defaultSelected value="one">
          Select me
        </MenuItem>
        <MenuItem value="two">
          And select me
        </MenuItem>
        <MenuItem defaultSelected value="three">
          And me
        </MenuItem>
      </MenuItemGroup>
      <MenuItemSeparator />
      <MenuItem value="baz">Open grading history...</MenuItem>
    </Menu>
  )

  it('should render', () => {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('should not allow invalid children', () => {
    let error = false
    try {
      testbed.render({
        children: <div />
      })
    } catch (e) {
      error = true
    }

    expect(error).to.be.true
  })

  it('should call onSelect when menu item is selected', () => {
    const onSelect = testbed.stub()
    const subject = testbed.render({
      onSelect
    })
    subject.find('MenuItem').first().simulate('click')
    expect(onSelect).to.have.been.called
  })

  it('should call onKeyDown when menu item is selected', () => {
    const onSelect = testbed.stub()
    const subject = testbed.render({
      onSelect
    })
    subject.find('MenuItem').first().simulate('click')
    expect(onSelect).to.have.been.called
  })

  it('should not call onSelect when disabled', () => {
    const onSelect = testbed.stub()
    const subject = testbed.render({
      onSelect,
      disabled: true
    })
    subject.find('MenuItem').first().simulate('click')
    expect(onSelect).to.not.have.been.called
  })

  it('should call onDismiss after Esc or Tab press', () => {
    const onDismiss = testbed.stub()
    const subject = testbed.render({
      onDismiss
    })

    subject.keyUp('escape')
    subject.keyDown('tab')

    expect(onDismiss).to.have.been.calledTwice
  })

  it('should have focus index -1 by default', () => {
    const subject = testbed.render()
    expect(subject.instance().focusedIndex).to.equal(-1)
  })

  it('should assign menu focus when focus prop is set', () => {
    const subject = testbed.render()

    subject.instance().focus()

    expect(subject.instance().focused()).to.equal(true)
  })

  it('should move focus properly', () => {
    const subject = testbed.render()

    subject.instance().focus()

    subject.keyDown('up')

    expect(subject.instance().focusedIndex).to.equal(9)

    subject.keyDown('down')

    expect(subject.instance().focusedIndex).to.equal(0)
  })

  it('should focus the first menu item when menu only has one item', () => {
    const subject = testbed.render({
      children: <MenuItem>foo</MenuItem>
    })
    subject.simulate('focus')
    expect(subject.find('[role="menuitem"]').unwrap() === document.activeElement).to.be.true
  })

  it('should set aria attributes and title properly', () => {
    const subject = testbed.render({
      labelledBy: 'id',
      controls: 'id',
      defaultShow: false,
      disabled: true,
      title: 'title'
    })
    expect(subject.getAttribute('aria-labelledby')).to.exist
    expect(subject.getAttribute('aria-controls')).to.exist
    expect(subject.getAttribute('aria-hidden')).to.exist
    expect(subject.getAttribute('aria-disabled')).to.exist
    expect(subject.getAttribute('title')).to.exist
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: [
        'color-contrast' // brand color doesn't meet 4.5:1 contrast req
      ]
    })
  })
})
