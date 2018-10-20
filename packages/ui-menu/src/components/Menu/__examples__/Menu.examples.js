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
import View from '@instructure/ui-layout/lib/components/View'
import Flex, { FlexItem } from '@instructure/ui-layout/lib/components/Flex'

import Menu, { MenuItem, MenuItemSeparator, MenuItemGroup } from '../index'

const getMenuChildren = (defaultFlyoutOpen = false) => {
  return [
    <MenuItem key="1" value="mastery">Learning Mastery</MenuItem>,
    <Menu
      key="3"
      label="More Options"
      defaultShow={defaultFlyoutOpen}
    >
      <MenuItemGroup
        allowMultiple
        label="Select Many"
      >
        <MenuItem value="optionOne">
          Option 1
        </MenuItem>
      </MenuItemGroup>
      <MenuItemSeparator />
      <MenuItem value="navigation">Navigation</MenuItem>
    </Menu>,
    <MenuItemSeparator key="4" />,
    <MenuItemGroup
      key="5"
      label="Select One"
    >
      <MenuItem value="itemOne">
        Item 1
      </MenuItem>
      <MenuItem value="itemTwo">
        Item 2
      </MenuItem>
    </MenuItemGroup>,
    <MenuItemSeparator key="6" />,
    <MenuItem key="7" value="baz" disabled>Open grading history...</MenuItem>
  ]
}

export default {
  permutations: [
    { trigger: [ <button key="open">Open Menu</button>, null ] },
    { placement: [
      'top start',
      'start top',
      'start center',
      'start bottom',
      'bottom start',
      'bottom center',
      'bottom end',
      'end bottom',
      'end center',
      'end top',
      'top end',
      'top center',
      'center end',
      'center start'
    ]},
    { children: [getMenuChildren(), getMenuChildren(true)]}
  ],
  renderProps: (props) => {
    return {
      componentProps: {
        label: `Menu example`,
        defaultShow: true,
        constrain: 'none'
      },
      filter: !props.trigger && props.placement !== 'top start'
    }
  },
  /* eslint-disable react/display-name */
  renderExample: (Component, componentProps, exampleProps, key) => {
    let example = <Component {...componentProps} />

    return componentProps.trigger ? (
      <Flex
        key={key}
        alignItems="center"
        justifyItems="center"
        height="30rem"
      >
        <FlexItem>
          {example}
        </FlexItem>
      </Flex>
    ) : (
      <View
        key={key}
        display="block"
        padding="small"
      >
        {example}
      </View>
    )
  }
  /* eslint-enable react/display-name */
}
