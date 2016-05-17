import React from 'react'
import Menu, { MenuItem, MenuItemSeparator } from '../index'

import Checkbox from '../../Checkbox'
import { RadioInput } from '../../RadioInputGroup'
import Link from '../../Link'

describe('<Menu />', function () {
  const testbed = createTestbed(Menu, {
    children: [
      <MenuItem key="m1"><Link>Default (Grid view)</Link></MenuItem>,
      <MenuItem key="m2"><Link>Learning Mastery</Link></MenuItem>,
      <MenuItem key="m3"><Link disabled>Individual (List view)</Link></MenuItem>,
      <MenuItem key="m4">
        <Checkbox value="foo" name="foobar" defaultChecked label="Foo" />
      </MenuItem>,
      <MenuItem key="m5">
        <RadioInput value="bar" name="foobar" label="Bar" />
      </MenuItem>,
      <MenuItem key="m6">
        <Checkbox value="anchor" defaultChecked label="Include Anchor Standards" />
      </MenuItem>,
      <MenuItemSeparator key="m7" />,
      <MenuItem key="m8"><Link>Open grading history...</Link></MenuItem>
    ]
  })

  /* example test (replace me) */
  it('should render', function () {
    testbed.render(/* override default props here */)

    expect(testbed.dom.node).to.exist
  })

  it('should have tests')
})
