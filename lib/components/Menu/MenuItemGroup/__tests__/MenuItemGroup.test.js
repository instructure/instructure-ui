import React from 'react'
import MenuItemGroup from '../index'
import MenuItem from '../../MenuItem'
import MenuItemSeparator from '../../MenuItemSeparator'

describe('<MenuItemGroup />', function () {
  const testbed = new Testbed(
    <MenuItemGroup label="Select one">
      <MenuItem>Foo</MenuItem>
      <MenuItem>Bar</MenuItem>
      <MenuItemSeparator />
    </MenuItemGroup>
  )

  it('should render', function () {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('should set the role to "group"', function () {
    const subject = testbed.render()

    expect(subject.find('[role="group"]')).to.be.present
  })

  it('should render the label and aria-labelledby attributes', function () {
    const subject = testbed.render()
    const label = subject.findText('Select one').filterWhere(n => n.prop('id'))
    const id = label.prop('id')

    expect(subject.find(`[aria-labelledby="${id}"]`).length).to.equal(1)
  })

  it('should default to children with type "radio"', function () {
    const subject = testbed.render()

    expect(subject.find('[role="menuitemradio"]').length).to.equal(2)
  })

  it('should render children with type "checkbox" if allowMultiple is true', function () {
    const subject = testbed.render({
      allowMultiple: true
    })

    expect(subject.find('[role="menuitemcheckbox"]').length).to.equal(2)
  })

  it('should set aria-disabled', function () {
    const subject = testbed.render({
      disabled: true
    })

    expect(subject.find('[aria-disabled="true"]').length).to.equal(3)
  })

  it('should set selected from defaultSelected prop', function () {
    const subject = testbed.render({
      defaultSelected: [1]
    })

    expect(subject.find('[aria-checked="true"]').length)
      .to.equal(1)
  })

  it('should set selected from selected prop', function () {
    const subject = testbed.render({
      onSelect: testbed.stub(),
      selected: [1]
    })

    expect(subject.find('[aria-checked="true"]').length)
      .to.equal(1)
  })

  it('should set selected from children', function () {
    const subject = testbed.render({
      allowMultiple: true,
      children: [
        <MenuItem defaultSelected>Foo</MenuItem>,
        <MenuItem selected>Bar</MenuItem>
      ]
    })

    expect(subject.find('[aria-checked="true"]').length)
      .to.equal(2)
  })

  it('should honor the allowMultiple prop', function () {
    const subject = testbed.render({
      allowMultiple: false,
      children: [
        <MenuItem defaultSelected>Foo</MenuItem>,
        <MenuItem selected>Bar</MenuItem>
      ]
    })

    expect(subject.find('[aria-checked="true"]').length)
      .to.equal(1)
  })

  it('calls onSelect when items are selected', function () {
    const onSelect = testbed.stub()
    const subject = testbed.render({
      onSelect
    })

    subject.find('span[role="menuitemradio"]').first().simulate('click')

    expect(onSelect).to.have.been.called
    expect(onSelect.args[0][1]).to.deep.equal([0])
  })

  it('does not call onSelect when disabled', function () {
    const onSelect = testbed.stub()
    const subject = testbed.render({
      onSelect,
      disabled: true
    })

    subject.find(MenuItem).first().simulate('click')

    expect(onSelect).to.not.have.been.called
  })

  it('updates the selected items when allowMultiple is true', function () {
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

  it('updates the selected items when allowMultiple is false', function () {
    const subject = testbed.render({
      allowMultiple: false
    })

    subject.find('span[role="menuitemradio"]').first().simulate('click')
    subject.find('span[role="menuitemradio"]').last().simulate('click')

    expect(subject.instance().selected)
      .to.deep.equal([1])
  })
})
