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
import { Menu } from '@instructure/ui'

import React from 'react'
const MENU_IUI = () => {
  const state = {
    singleSelection: ['itemOne'],
    multipleSelection: ['optionOne', 'optionThree']
  }

  const handleSingleSelect = (e, newSelected) => {}

  const handleMultipleSelect = (e, newSelected) => {}

  return (
    <Menu>
      <Menu.Item value="mastery">Learning Mastery</Menu.Item>
      <Menu.Item href="https://instructure.github.io/instructure-ui/">
        Default (Grid view)
      </Menu.Item>
      <Menu.Item disabled>Individual (List view)</Menu.Item>
      <Menu label="More Options">
        <Menu.Group
          allowMultiple
          label="Select Many"
          selected={state.multipleSelection}
          onSelect={handleMultipleSelect}
        >
          <Menu.Item value="optionOne">Option 1</Menu.Item>
          <Menu.Item value="optionTwo">Option 2</Menu.Item>
          <Menu.Item value="optionThree">Option 3</Menu.Item>
        </Menu.Group>
        <Menu.Separator />
        <Menu.Item value="navigation">Navigation</Menu.Item>
        <Menu.Item value="set">Set as default</Menu.Item>
      </Menu>
      <Menu.Separator />
      <Menu.Group
        label="Select One"
        selected={state.singleSelection}
        onSelect={handleSingleSelect}
      >
        <Menu.Item value="itemOne">Item 1</Menu.Item>
        <Menu.Item value="itemTwo">Item 2</Menu.Item>
      </Menu.Group>
      <Menu.Separator />
      <Menu.Item value="baz">Open grading history...</Menu.Item>
    </Menu>
  )
}

export default MENU_IUI
