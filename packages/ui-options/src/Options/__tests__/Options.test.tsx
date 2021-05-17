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
  generateA11yTests,
  spy
} from '@instructure/ui-test-utils'

import { Options } from '../index'
import { OptionsLocator } from '../OptionsLocator'
import OptionsExamples from '../__examples__/Options.examples'

describe('<Options />', async () => {
  it('should render', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<Options />)
    const options = OptionsLocator.find()

    expect(options).to.exist()
  })

  it('should render items', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Options>
        <Options.Item>Option one</Options.Item>
        <Options.Item>Option two</Options.Item>
      </Options>
    )
    const options = await OptionsLocator.find()
    const items = await options.findAllItems()

    expect(items.length).to.equal(2)
  })

  it('should provide elementRef', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const elementRef = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <Options elementRef={elementRef} as="ul">
        <Options.Item>Option one</Options.Item>
        <Options.Item>Option two</Options.Item>
      </Options>
    )
    const options = await OptionsLocator.find()
    const list = await options.find('ul')

    expect(elementRef).to.have.been.calledWith(list.getDOMNode())
  })

  it('should render designated tag if `as` prop is specified', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <Options as="ol">
        <Options.Item>Option one</Options.Item>
        <Options.Item>Option two</Options.Item>
      </Options>
    )
    const options = await OptionsLocator.find()
    const list = await options.find('ol')

    expect(list).to.exist()
  })

  it('should render children as listitems when appropriate', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <Options as="ul">
        <Options.Item>Option one</Options.Item>
        <Options.Item>Option two</Options.Item>
      </Options>
    )
    const options = await OptionsLocator.find()
    const list = await options.find('ul')
    const items = await list.findAll('li')

    expect(list).to.exist()
    expect(items.length).to.equal(2)
  })

  it('should pass props through to list', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <Options as="ul" role="listbox" data-custom-attr="true">
        <Options.Item>Option one</Options.Item>
        <Options.Item>Option two</Options.Item>
      </Options>
    )
    const options = await OptionsLocator.find()
    const list = await options.find('ul')

    expect(list.getAttribute('role')).to.equal('listbox')
    expect(list.getAttribute('data-custom-attr')).to.equal('true')
  })

  it('should render root with appropriate role', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Options role="listbox">
        <Options.Item>Option one</Options.Item>
        <Options.Item>Option two</Options.Item>
      </Options>
    )
    const options = await OptionsLocator.find()

    expect(options.getAttribute('role')).to.equal('presentation')
  })

  it('should not allow invalid children', async () => {
    const cs = spy(console, 'error')
    const warning =
      "Warning: Failed prop type: Expected one of Options, Item, Separator in Options but found 'span'"

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Options>
        <span />
      </Options>
    )
    expect(cs).to.have.been.calledWithMatch(warning)
  })

  it('should allow null children', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<Options />)
    const options = await OptionsLocator.find()
    expect(options).to.exist()
  })

  it('should render nested options properly', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Options>
        <Options.Item>Option one</Options.Item>
        <Options.Item>Option two</Options.Item>
        <Options renderLabel={'Nested list'}>
          <Options.Item>Nested option one</Options.Item>
          <Options.Item>Nested option two</Options.Item>
        </Options>
      </Options>
    )
    const options = await OptionsLocator.find()
    const items = await options.findAll('[class$=-optionItem]')
    const nestedItem = await options.findItem(':contains(Nested list)')
    const nestedLabel = await nestedItem.findWithText('Nested list')
    const nestedList = await nestedItem.find('[class$=-options__list]')
    const nestedListItems = await nestedList.findAll('[class$=-optionItem]')

    expect(items.length).to.equal(5)
    expect(nestedLabel).to.exist()
    expect(nestedList).to.exist()
    expect(nestedListItems.length).to.equal(2)
  })

  describe('with generated examples', async () => {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ maxExamplesPerPage: number; pr... Remove this comment to see the full error message
    generateA11yTests(OptionsExamples)
  })
})
