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

import { Menu, MenuItem, MenuItemSeparator, MenuItemGroup } from '../index'

export default {
  sectionProp: 'placement',
  maxExamplesPerPage: 20,
  maxExamples: 200,
  excludeProps: [
    'defaultShow',
    'shouldFocusTriggerOnClose',
    'shouldHideOnSelect'
  ],
  propValues: {
    trigger: [<button key="open">Open Menu</button>, null],
    placement: [
      'bottom end',
      'bottom center',
      'bottom start',
      'center start',
      'center end',
      'top center',
      'top end',
      'end top',
      'end center',
      'end bottom',
      'start bottom',
      'start center',
      'start top',
      'top start'
    ],
    children: [getMenuChildren()]
  },
  // @ts-expect-error ts-migrate(6133) FIXME: 'props' is declared but its value is never read.
  getComponentProps: (props) => {
    return {
      label: `Menu example`,
      defaultShow: true,
      constrain: 'none'
    }
  },
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  getExampleProps: (props) => {
    return {
      dir: props.dir,
      as: 'div',
      width: '100%',
      height: '30rem',
      margin: 'large',
      padding: 'large',
      textAlign: 'center'
    }
  },
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  filter: (props) => {
    return !props.trigger && props.placement !== 'top start'
  }
}

function getMenuChildren(defaultFlyoutOpen = false) {
  return [
    <MenuItem key="1" value="mastery">
      Learning Mastery
    </MenuItem>,
    <Menu key="3" label="More Options" defaultShow={defaultFlyoutOpen}>
      <MenuItemGroup allowMultiple label="Select Many">
        <MenuItem value="optionOne">Option 1</MenuItem>
      </MenuItemGroup>
      <MenuItemSeparator />
      <MenuItem value="navigation">Navigation</MenuItem>
    </Menu>,
    <MenuItemSeparator key="4" />,
    <MenuItemGroup key="5" label="Select One">
      <MenuItem value="itemOne">Item 1</MenuItem>
      <MenuItem value="itemTwo">Item 2</MenuItem>
    </MenuItemGroup>,
    <MenuItemSeparator key="6" />,
    <MenuItem key="7" value="baz" disabled>
      Open grading history...
    </MenuItem>
  ]
}
