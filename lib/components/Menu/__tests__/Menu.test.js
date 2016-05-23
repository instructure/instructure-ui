import React from 'react'
import Menu, { MenuItem, MenuItemSeparator } from '../index'

import Checkbox from '../../Checkbox'
import { RadioInput } from '../../RadioInputGroup'
import Link from '../../Link'

describe('<Menu />', function () {
  const testbed = createTestbed(
    <Menu focus labelledBy="foobar">
      <MenuItem><Link>Default (Grid view)</Link></MenuItem>
      <MenuItem><Link>Learning Mastery</Link></MenuItem>
      <MenuItem><Link disabled>Individual (List view)</Link></MenuItem>
      <MenuItem>
        <Checkbox value="foo" name="foobar"
          checked onChange={function () { }}
          label="Foo" />
      </MenuItem>
      <MenuItem>
        <RadioInput value="bar" name="foobar" label="Bar" />
      </MenuItem>
      <MenuItem>
        <Checkbox value="anchor"
          checked onChange={function () { }}
          label="Include Anchor Standards" />
      </MenuItem>
      <MenuItemSeparator />
      <MenuItem><Link>Open grading history...</Link></MenuItem>
    </Menu>
  )

  it('should render', function () {
    const subject = testbed.render()

    expect(subject.dom()).to.exist
  })

  it('should have tests')
})
