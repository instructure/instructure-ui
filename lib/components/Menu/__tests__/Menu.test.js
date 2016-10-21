import React from 'react'
import Menu, { MenuItem, MenuItemSeparator } from '../index'

describe('<Menu />', function () {
  const testbed = createTestbed(
    <Menu labelledBy="foobar">
      <MenuItem>Default (Grid view)</MenuItem>
      <MenuItem>Learning Mastery</MenuItem>
      <MenuItem disabled>Individual (List view)</MenuItem>
      <MenuItem type="radio" defaultChecked>
        Select me
      </MenuItem>
      <MenuItem type="radio">
        Or select me
      </MenuItem>
      <MenuItem type="checkbox" defaultChecked>
        Include Anchor Standards
      </MenuItem>
      <MenuItemSeparator />
      <MenuItem>Open grading history...</MenuItem>
    </Menu>
  )

  it('should render', function () {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('should have tests')
})
