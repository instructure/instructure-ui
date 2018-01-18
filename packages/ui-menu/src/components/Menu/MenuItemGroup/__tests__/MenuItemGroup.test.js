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
import MenuItemGroup from '../index'
import MenuItem from '../../MenuItem'
import MenuItemSeparator from '../../MenuItemSeparator'

describe('<MenuItemGroup />', () => {
  const testbed = new Testbed(
    <MenuItemGroup label="Select one">
      <MenuItem>Foo</MenuItem>
      <MenuItem>Bar</MenuItem>
      <MenuItemSeparator />
    </MenuItemGroup>
  )

  it('should render', () => {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('should set the role to "group"', () => {
    const subject = testbed.render()

    expect(subject.find('[role="group"]')).to.be.present
  })

  it('should render the label and aria-labelledby attributes', () => {
    const subject = testbed.render()
    const label = subject.findText('Select one').filterWhere(n => n.prop('id'))
    const id = label.prop('id')

    expect(subject.find(`[aria-labelledby="${id}"]`).length).to.equal(1)
  })

  it('should default to children with type "radio"', () => {
    const subject = testbed.render()

    expect(subject.find('[role="menuitemradio"]').length).to.equal(2)
  })

  it('should render children with type "checkbox" if allowMultiple is true', () => {
    const subject = testbed.render({
      allowMultiple: true
    })

    expect(subject.find('[role="menuitemcheckbox"]').length).to.equal(2)
  })

  it('should set aria-disabled', () => {
    const subject = testbed.render({
      disabled: true
    })

    expect(subject.find('[aria-disabled="true"]').length).to.equal(3)
  })

  it('should set selected from defaultSelected prop', () => {
    const subject = testbed.render({
      defaultSelected: [1]
    })

    expect(subject.find('[aria-checked="true"]').length)
      .to.equal(1)
  })

  it('should set selected from selected prop', () => {
    const subject = testbed.render({
      onSelect: testbed.stub(),
      selected: [1]
    })

    expect(subject.find('[aria-checked="true"]').length)
      .to.equal(1)
  })

  it('should set selected from children', () => {
    const subject = testbed.render({
      allowMultiple: true,
      children: [
        <MenuItem key="foo" defaultSelected>Foo</MenuItem>,
        <MenuItem key="bar" selected>Bar</MenuItem>
      ]
    })

    expect(subject.find('[aria-checked="true"]').length)
      .to.equal(2)
  })

  it('should honor the allowMultiple prop', () => {
    const subject = testbed.render({
      allowMultiple: false,
      children: [
        <MenuItem key="foo" defaultSelected>Foo</MenuItem>,
        <MenuItem key="bar" selected>Bar</MenuItem>
      ]
    })

    expect(subject.find('[aria-checked="true"]').length)
      .to.equal(1)
  })

  it('calls onSelect when items are selected', () => {
    const onSelect = testbed.stub()
    const subject = testbed.render({
      onSelect
    })

    subject.find('span[role="menuitemradio"]').first().simulate('click')

    expect(onSelect).to.have.been.called
    expect(onSelect.args[0][1]).to.deep.equal([0])
  })

  it('does not call onSelect when disabled', () => {
    const onSelect = testbed.stub()
    const subject = testbed.render({
      onSelect,
      disabled: true
    })

    subject.find(MenuItem).first().simulate('click')

    expect(onSelect).to.not.have.been.called
  })

  it('updates the selected items when allowMultiple is true', () => {
    const subject = testbed.render({
      allowMultiple: true
    })

    subject.find('span[role="menuitemcheckbox"]').first().simulate('click')

    expect(subject.instance().selected)
      .to.deep.equal([0])

    subject.find('span[role="menuitemcheckbox"]').last().simulate('click')

    expect(subject.instance().selected)
      .to.deep.equal([0, 1])

    subject.find('span[role="menuitemcheckbox"]').first().simulate('click')

    expect(subject.instance().selected)
      .to.deep.equal([1])
  })

  it('updates the selected items when allowMultiple is false', () => {
    const subject = testbed.render({
      allowMultiple: false
    })

    subject.find('span[role="menuitemradio"]').first().simulate('click')
    subject.find('span[role="menuitemradio"]').last().simulate('click')

    expect(subject.instance().selected)
      .to.deep.equal([1])
  })
})
