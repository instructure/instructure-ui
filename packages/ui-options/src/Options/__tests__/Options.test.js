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
import { expect, mount, generateA11yTests } from '@instructure/ui-test-utils'

import { Options } from '../index'
import OptionsLocator from '../locator'
import styles from '../Item/styles.css'
import OptionsExamples from '../__examples__/Options.examples'

describe('<Options />', async () => {
  it('should render', async () => {
    await mount(<Options />)
    const options = OptionsLocator.find()

    expect(options).to.exist()
  })

  it('should render items', async () => {
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

  it('should render designated tag if `as` prop is specified', async () => {
    await mount(
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
    await mount(
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
    await mount(
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
    let error = false
    try {
      await mount(
        <Options>
          <span />
        </Options>
      )
    } catch (e) {
      error = true
    }

    expect(error).to.be.true()
  })

  it('should allow null children', async () => {
    await mount(
      <Options />
    )
    const options = await OptionsLocator.find()
    expect(options).to.exist()
  })

  it('should render nested options properly', async () => {
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
    const items = await options.findAllItems()
    const nestedItem = await options.findItem(':contains(Nested list)')
    const nestedLabel = await nestedItem.find(':textContent(Nested list)')

    expect(items.length).to.equal(5)
    expect(nestedLabel).to.exist()
    expect(nestedItem.hasClass(styles.containsList)).to.be.true()
  })

  describe('with generated examples', async () => {
    generateA11yTests(OptionsExamples)
  })
})
