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
import { expect, mount, stub } from '@instructure/ui-test-utils'
import Select from '../index'
import SelectLocator from '../locator'

describe('<Select />', async () => {
  it('should render', async () => {
    await mount(
      <Select
        label="Choose a vacation destination"
      >
        <option value="0">Aruba</option>
        <option value="1">Jamaica</option>
        <option value="2">Oh I want to take ya</option>
      </Select>
    )

    const select = await SelectLocator.find()

    expect(select).to.exist()
  })

  it('should focus the input when focus is called', async () => {
    let selectRef
    await mount(
      <Select
        label="Choose a vacation destination"
        componentRef={(el) => { selectRef = el }}
      >
        <option value="0">Aruba</option>
        <option value="1">Jamaica</option>
        <option value="2">Oh I want to take ya</option>
      </Select>
    )

    const input = await SelectLocator.findInput()

    selectRef.focus()

    expect(input.focused()).to.be.true()
  })

  it('should provide an focused getter', async () => {
    let selectRef
    await mount(
      <Select
        label="Choose a vacation destination"
        componentRef={(el) => { selectRef = el }}
      >
        <option value="0">Aruba</option>
        <option value="1">Jamaica</option>
        <option value="2">Oh I want to take ya</option>
      </Select>
    )
    expect(selectRef.focused).to.be.false()

    selectRef.focus()

    expect(selectRef.focused).to.be.true()
   })

   it('should provide an invalid getter', async () => {
     let selectRef
     await mount(
       <Select
         label="Choose a vacation destination"
         componentRef={(el) => { selectRef = el }}
       >
         <option value="0">Aruba</option>
         <option value="1">Jamaica</option>
         <option value="2">Oh I want to take ya</option>
       </Select>
     )

     expect(selectRef.invalid).to.be.false()
   })

  it('should be invalid if given error messages', async () => {
    await mount(
      <Select
        label="Choose a vacation destination"
        messages={[{text: 'Invalid name', type: 'error' }]}
      >
        <option value="0">Aruba</option>
        <option value="1">Jamaica</option>
        <option value="2">Oh I want to take ya</option>
      </Select>
    )

    const input = await SelectLocator.findInput()

    expect(input.getAttribute('aria-invalid')).to.equal('true')
  })

  it('should provide an inputRef prop', async () => {
    const inputRef = stub()
    await mount(
      <Select
        label="Choose a vacation destination"
        inputRef={inputRef}
      >
        <option value="0">Aruba</option>
        <option value="1">Jamaica</option>
        <option value="2">Oh I want to take ya</option>
      </Select>
    )

    const select = await SelectLocator.find()
    const input = await select.findInput()

    expect(inputRef).to.have.been.calledWith(input.getDOMNode())
  })

  it('recalculates options when children change', async () => {
    const items = [{
      value: '3', label: 'Bermuda', icon: null, disabled: null, groupLabel: null, groupItem: null
    }, {
      value: '4', label: 'Bahama', icon: null, disabled: null, groupLabel: null, groupItem: null
    }, {
      value: '5', label: 'come on pretty mama', icon: null, disabled: null, groupLabel: null, groupItem: null
    }]

    const subject = await mount(
      <Select
        label="Choose a vacation destination"
        editable={true}
      >
        {items.map((i) => <option key={i} value={i.value}>{i.label}</option>)}
      </Select>
    )
    const select = await SelectLocator.find()
    await select.click()

    expect((await select.findAllOptions()).length).to.equal(3)

    await subject.setProps({
      children: items.slice(1).map((i) => <option key={i} value={i.value}>{i.label}</option>)
    })

    expect((await select.findAllOptions()).length).to.equal(2)
  })

  it('should allow optgroup tags as children', async () => {
    const consoleError = stub(console, 'error')
    await mount(
      <Select
        label="Choose a vacation destination"
      >
        <optgroup key="one" label="Group One">
          <option value="item1">Item One</option>
          <option value="item2">Item Two</option>
        </optgroup>
      </Select>
    )

    expect(consoleError).to.not.have.been.calledWithMatch('Failed prop type')
  })

  it('should reject children that are not option or optgroup tags', async () => {
    const consoleError = stub(console, 'error')
    await mount(
      <Select
        label="Choose a vacation destination"
      >
        <span key="invalid">Invalid!!!</span>
      </Select>
    )

    expect(consoleError).to.have.been.calledWithMatch('Expected one of option, optgroup')
  })

  it('should include group value or label in onChange', async () => {
    const onChange = stub()
    await mount(
      <Select
        label="Choose a vacation destination"
        onChange={onChange}
      >
        <optgroup key="one" label="Group One" value="group-1">
          <option value="item1">Item One</option>
        </optgroup>
        <optgroup key="two" label="Group Two">
          <option value="item2">Item Two</option>
        </optgroup>
      </Select>
    )

    const select = await SelectLocator.find()
    const input = await select.findInput()
    // select first item
    await input.keyDown('down')
    await input.keyDown('enter')

    expect(onChange.getCall(0).args[1].group).to.equal('group-1')

    // select second item
    await input.keyDown('down')
    await input.keyDown('down')
    await input.keyDown('enter')

    expect(onChange.getCall(1).args[1].group).to.equal('Group Two')
  })

  describe('for a11y', async () => {
    it('should meet standards when closed', async () => {
      await mount(
        <Select
          label="Choose a vacation destination"
        >
          <option value="0">Aruba</option>
          <option value="1">Jamaica</option>
          <option value="2">Oh I want to take ya</option>
        </Select>
      )
      const select = await SelectLocator.find()

      expect(await select.accessible({
        ignores: [
          'aria-allowed-role' // TODO: remove this when we fix it
        ]
      })).to.be.true()
    })

    it('should meet standards when open', async () => {
      await mount(
        <Select
          label="Choose a vacation destination"
        >
          <option value="0">Aruba</option>
          <option value="1">Jamaica</option>
          <option value="2">Oh I want to take ya</option>
        </Select>
      )
      const select = await SelectLocator.find()

      await select.click()

      expect(await select.accessible({
        ignores: [
          'aria-allowed-role' // TODO: remove this when we fix it
        ]
      })).to.be.true()
    })

    it('should set aria-invalid when errors prop is set', async () => {
      await mount(
        <Select
          label="Choose a vacation destination"
          messages={[{ type: 'error', text: 'some error message' }]}
        >
          <option value="0">Aruba</option>
          <option value="1">Jamaica</option>
          <option value="2">Oh I want to take ya</option>
        </Select>
      )
      const select = await SelectLocator.find()

      await select.click()

      expect(await select.accessible({
        ignores: [
          'aria-allowed-role' // TODO: remove this when we fix it
        ]
      })).to.be.true()
    })
  })
})
/*  eslint-enable mocha/no-synchronous-tests */
