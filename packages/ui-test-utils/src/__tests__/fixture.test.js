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
import testable from '@instructure/ui-testable'

import { querySelectorAll, findAllByQuery, mount, expect, fixture } from '../index'

@testable()
class Component extends React.Component {
  static displayName = 'Component'
  render () {
    return (
      <div id="componentRoot">
        <input type="text"/>
        <input type="password" />
      </div>
    )
  }
}

const ComponentFixture = fixture(Component.displayName)

ComponentFixture.findAllInputs = async (...args) => {
  const query = (element, selector, options) => {
    return querySelectorAll(element, { ...selector, tag: 'input' }, options)
  }
  return findAllByQuery(query, ...args)
}

describe('@testable, fixture', async () => {
  it('should find component root elements without a selector', async () => {
    await mount(<Component />)
    expect(await ComponentFixture.findAll()).to.have.length(1)
  })
  it('should filter out non-matching components with a selector', async () => {
    await mount(<Component />)
    expect(await ComponentFixture.findAll({ tag: 'a', expectEmpty: true }))
      .to.have.length(0)
  })
  it('should return no results when expected', async () => {
    await mount(<div />)
    expect(await ComponentFixture.findAll({ expectEmpty: true }))
      .to.have.length(0)
  })
  it('can find an element by attribute name and value', async () => {
    await mount(<Component />)
    expect(await ComponentFixture.findAll({
      tag: 'input',
      attribute: { name: 'type', value: 'password' }
    })).to.have.length(1)
  })
  it('adds a custom method to find the component root element', async () => {
    await mount(<Component />)
    const component = await ComponentFixture.find({
      tag: 'input',
      attribute: { name: 'type', value: 'password' }
    })
    expect(component.getComponentRoot())
      .to.equal(document.getElementById('componentRoot'))
  })
  it('should support custom queries', async () => {
    await mount(<Component />)
    expect(await ComponentFixture.findAllInputs()).to.have.length(2)
  })
})
