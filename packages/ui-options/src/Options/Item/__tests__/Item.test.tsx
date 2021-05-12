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
import {
  expect,
  mount,
  stub,
  wait,
  generateA11yTests
} from '@instructure/ui-test-utils'

import { IconCheckSolid } from '@instructure/ui-icons'
import { Options } from '../../index'
import { Item } from '../index'
import { OptionsItemLocator as ItemLocator } from '../OptionsItemLocator'
import ItemExamples from '../__examples__/Item.examples'

describe('<Item />', async () => {
  it('should render', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<Item />)
    const item = await ItemLocator.find()

    expect(item).to.exist()
  })

  it('should render not render as a listitem by default', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<Item>Hello World</Item>)
    const item = await ItemLocator.find()
    expect(item.getTagName()).to.not.equal('li')
  })

  it('should render designated tag if `as` prop is specified', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<Item as="li">Hello World</Item>)
    const item = await ItemLocator.find()
    expect(item.getTagName()).to.equal('li')
  })

  it('should render children properly', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Item>
        <span id="customContent">Hello World</span>
      </Item>
    )
    const item = await ItemLocator.find()

    expect(await item.find('#customContent')).to.have.text('Hello World')
  })

  it('should render role attributes appropriately when given a role', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<Item role="option">Hello World</Item>)
    const item = await ItemLocator.find()
    const child = await item.find('[role="option"]')

    expect(item.getAttribute('role')).to.equal('none')
    expect(child).to.exist()
  })

  it('should pass props through to label', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <Item role="option" tabIndex="-1" data-custom-attr="true">
        Hello World
      </Item>
    )
    const item = await ItemLocator.find()
    const label = await item.findWithText('Hello World')

    expect(item.getAttribute('role')).to.equal('none')
    expect(label.getAttribute('role')).to.equal('option')
    expect(label.getAttribute('tabindex')).to.equal('-1')
    expect(label.getAttribute('data-custom-attr')).to.equal('true')
  })

  it('should pass event handlers through to label', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const onClick = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<Item onClick={onClick}>Hello World</Item>)
    const item = await ItemLocator.find()
    const label = await item.findWithText('Hello World')

    await item.click()
    expect(onClick).to.not.have.been.called()

    await label.click()
    expect(onClick).to.have.been.calledOnce()
  })

  it('should allow label to recieve focus', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const onFocus = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <Item tabIndex="-1" onFocus={onFocus}>
        Hello World
      </Item>
    )
    const item = await ItemLocator.find()
    const label = await item.findWithText('Hello World')

    await item.focus()
    await wait(() => {
      expect(onFocus).to.have.been.called()
      expect(label.focused()).to.be.true()
    })
  })

  it('should render content before label', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<Item renderBeforeLabel={<IconCheckSolid />}>Hello World</Item>)
    const item = await ItemLocator.find()
    const content = await item.find('[class$=-optionItem__content--before]')
    const icon = await content.find('svg[name="IconCheck"]')

    expect(content).to.exist()
    expect(icon).to.exist()
  })

  it('should render content after label', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<Item renderAfterLabel={<IconCheckSolid />}>Hello World</Item>)
    const item = await ItemLocator.find()
    const content = await item.find('[class$=-optionItem__content--after]')
    const icon = await content.find('svg[name="IconCheck"]')

    expect(content).to.exist()
    expect(icon).to.exist()
  })

  it('should render nested lists', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Item>
        {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
        <Options as="ul" renderLabel={'Nested list'}>
          <Item>Sub item</Item>
        </Options>
      </Item>
    )
    const item = await ItemLocator.find()
    const options = await item.findNestedOptions()
    const nestedList = await options.find('ul')
    const nestedItem = await options.findItem(':textContent("Sub item")')

    expect(nestedList).to.exist()
    expect(nestedItem).to.exist()
  })

  describe('with generated examples', async () => {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ maxExamplesPerPage: number; pr... Remove this comment to see the full error message
    generateA11yTests(ItemExamples)
  })
})
