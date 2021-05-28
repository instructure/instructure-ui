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

import { CheckboxGroupLocator } from '../CheckboxGroupLocator'

import { CheckboxGroup } from '../index'
import { Checkbox } from '../../Checkbox'

describe('<CheckboxGroup />', async () => {
  it('adds the name props to all Checkbox types', async () => {
    await mount(
      <CheckboxGroup name="sports" description="Select your favorite sports">
        <Checkbox label="Football" value="football" />
        <Checkbox label="Basketball" value="basketball" />
        <Checkbox label="Volleyball" value="volleyball" />
        <Checkbox label="Other" value="other" />
      </CheckboxGroup>
    )

    const checkboxGroup = await CheckboxGroupLocator.find()
    const checkboxes = await checkboxGroup.findAll('input[name="sports"]')
    expect(checkboxes.length).to.equal(4)
  })

  it('links the messages to the fieldset via aria-describedby', async () => {
    await mount(
      <CheckboxGroup
        name="sports"
        description="Select your favorite sports"
        messages={[{ text: 'Invalid name', type: 'error' }]}
      >
        <Checkbox label="Football" value="football" />
        <Checkbox label="Basketball" value="basketball" />
        <Checkbox label="Volleyball" value="volleyball" />
        <Checkbox label="Other" value="other" />
      </CheckboxGroup>
    )

    const checkboxGroup = await CheckboxGroupLocator.find()
    const fieldset = await checkboxGroup.find('fieldset')
    const messagesId = fieldset.getAttribute('aria-describedby')
    const messages = await checkboxGroup.find(`#${messagesId}`)

    expect(messages.getTextContent()).to.equal('Invalid name')
  })

  it('displays description message inside the legend', async () => {
    const description = 'You should pick something'

    await mount(
      <CheckboxGroup name="sports" description={description}>
        <Checkbox label="Football" value="football" />
        <Checkbox label="Basketball" value="basketball" />
        <Checkbox label="Volleyball" value="volleyball" />
        <Checkbox label="Other" value="other" />
      </CheckboxGroup>
    )

    const checkboxGroup = await CheckboxGroupLocator.find()
    const legend = await checkboxGroup.find('legend')
    expect(legend.getTextContent()).to.equal(description)
  })

  it('requires an `onChange` prop with a `value` prop', async () => {
    const consoleError = stub(console, 'error')

    await mount(
      <CheckboxGroup
        name="sports"
        description="Select your favorite sports"
        value={['basketball']}
      >
        <Checkbox label="Football" value="football" />
        <Checkbox label="Basketball" value="basketball" />
        <Checkbox label="Volleyball" value="volleyball" />
        <Checkbox label="Other" value="other" />
      </CheckboxGroup>
    )

    expect(consoleError).to.have.been.calledWithMatch(
      `Failed prop type: You provided a 'value' prop without an 'onChange' handler on 'CheckboxGroup'`
    )
  })

  it('does not call the onChange prop when disabled', async () => {
    const onChange = stub()

    await mount(
      <CheckboxGroup
        name="sports"
        description="Select your favorite sports"
        onChange={onChange}
        disabled
      >
        <Checkbox label="Football" value="football" />
        <Checkbox label="Basketball" value="basketball" />
        <Checkbox label="Volleyball" value="volleyball" />
        <Checkbox label="Other" value="other" />
      </CheckboxGroup>
    )

    const checkboxGroup = await CheckboxGroupLocator.find()
    const input = await checkboxGroup.find('input[value="football"]')
    await input.click(null, { clickable: false })

    expect(onChange).to.not.have.been.called()
  })

  it('does not call the onChange prop when readOnly', async () => {
    const onChange = stub()

    await mount(
      <CheckboxGroup
        name="sports"
        description="Select your favorite sports"
        onChange={onChange}
        readOnly
      >
        <Checkbox label="Football" value="football" />
        <Checkbox label="Basketball" value="basketball" />
        <Checkbox label="Volleyball" value="volleyball" />
        <Checkbox label="Other" value="other" />
      </CheckboxGroup>
    )

    const checkboxGroup = await CheckboxGroupLocator.find()
    const input = await checkboxGroup.find('input[value="football"]')
    await input.click()

    expect(onChange).to.not.have.been.called()
  })

  it('should not update the value when the value prop is set', async () => {
    await mount(
      <CheckboxGroup
        name="sports"
        description="Select your favorite sports"
        value={['tester']}
        onChange={stub()}
      >
        <Checkbox label="Football" value="football" />
        <Checkbox label="Basketball" value="basketball" />
        <Checkbox label="Volleyball" value="volleyball" />
        <Checkbox label="Other" value="other" />
      </CheckboxGroup>
    )

    const checkboxGroup = await CheckboxGroupLocator.find()
    const inputs = await checkboxGroup.findAll('input')
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'input' implicitly has an 'any' type.
    inputs.forEach((input) => {
      expect(input.getDOMNode().checked).to.be.false()
    })

    const input = await checkboxGroup.find('input[value="football"]')
    await input.click()

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'input' implicitly has an 'any' type.
    inputs.forEach((input) => {
      expect(input.getDOMNode().checked).to.be.false()
    })
  })

  it('should add the checkbox value to the value list when it is checked', async () => {
    const onChange = stub()
    await mount(
      <CheckboxGroup
        name="sports"
        description="Select your favorite sports"
        onChange={onChange}
      >
        <Checkbox label="Football" value="football" />
        <Checkbox label="Basketball" value="basketball" />
        <Checkbox label="Volleyball" value="volleyball" />
        <Checkbox label="Other" value="other" />
      </CheckboxGroup>
    )

    const checkboxGroup = await CheckboxGroupLocator.find()
    const input = await checkboxGroup.find('input[value="football"]')
    await input.click()

    expect(onChange.lastCall.args[0]).to.deep.equal(['football'])
  })

  it('should check the checkboxes based on the defaultValue prop', async () => {
    const defaultValue = ['football', 'volleyball']
    await mount(
      <CheckboxGroup
        name="sports"
        description="Select your favorite sports"
        defaultValue={defaultValue}
      >
        <Checkbox label="Football" value="football" />
        <Checkbox label="Basketball" value="basketball" />
        <Checkbox label="Volleyball" value="volleyball" />
        <Checkbox label="Other" value="other" />
      </CheckboxGroup>
    )

    const checkboxGroup = await CheckboxGroupLocator.find()
    const inputs = await checkboxGroup.findAll('input')

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'input' implicitly has an 'any' type.
    inputs.forEach((input) => {
      if (defaultValue.includes(input.getAttribute('value'))) {
        expect(input.getDOMNode().checked).to.be.true()
      } else {
        expect(input.getDOMNode().checked).to.be.false()
      }
    })
  })

  it('should remove the checkbox value from the value list when it is unchecked', async () => {
    const onChange = stub()

    await mount(
      <CheckboxGroup
        name="sports"
        description="Select your favorite sports"
        defaultValue={['football', 'basketball', 'volleyball']}
        onChange={onChange}
      >
        <Checkbox label="Football" value="football" />
        <Checkbox label="Basketball" value="basketball" />
        <Checkbox label="Volleyball" value="volleyball" />
        <Checkbox label="Other" value="other" />
      </CheckboxGroup>
    )

    const checkboxGroup = await CheckboxGroupLocator.find()
    const input = await checkboxGroup.find('input[value="football"]')
    await input.click()

    expect(onChange.lastCall.args[0]).to.deep.equal([
      'basketball',
      'volleyball'
    ])
  })

  it('passes the array of selected values to onChange handler', async () => {
    const onChange = stub()

    await mount(
      <CheckboxGroup
        name="sports"
        description="Select your favorite sports"
        defaultValue={['football', 'basketball', 'volleyball']}
        onChange={onChange}
      >
        <Checkbox label="Football" value="football" />
        <Checkbox label="Basketball" value="basketball" />
        <Checkbox label="Volleyball" value="volleyball" />
        <Checkbox label="Other" value="other" />
      </CheckboxGroup>
    )

    const checkboxGroup = await CheckboxGroupLocator.find()
    const input1 = await checkboxGroup.find('input[value="football"]')
    const input2 = await checkboxGroup.find('input[value="other"]')

    await input1.click()
    expect(onChange.lastCall.args[0]).to.deep.equal([
      'basketball',
      'volleyball'
    ])

    await input2.click()
    expect(onChange.lastCall.args[0]).to.deep.equal([
      'basketball',
      'volleyball',
      'other'
    ])
  })

  describe('for a11y', async () => {
    it('should meet standards', async () => {
      await mount(
        <CheckboxGroup name="sports" description="Select your favorite sports">
          <Checkbox label="Football" value="football" />
          <Checkbox label="Basketball" value="basketball" />
          <Checkbox label="Volleyball" value="volleyball" />
          <Checkbox label="Other" value="other" />
        </CheckboxGroup>
      )

      const checkboxGroup = await CheckboxGroupLocator.find()
      expect(
        await checkboxGroup.accessible({
          ignores: [
            'checkboxgroup'
          ] /* https://github.com/dequelabs/axe-core/issues/176 */
        })
      ).to.be.true()
    })
  })
})
