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
import { mount, expect } from '../../index'
import testable from '../testable'

class Component extends React.Component {
  render () {
    return (
      <div id="componentRoot">
        <input type="text"/>
        <input type="password" />
      </div>
    )
  }
}

const TestableComponent = testable()(Component)

describe('@testable', () => {
  it('can find an element by attribute name and value', async () => {
    await mount(<TestableComponent />)
    expect(await TestableComponent.findAll({
      tag: 'input',
      attribute: { name: 'type', value: 'password' }
    })).to.have.length(1)
  })
  it('adds a custom method to find the component root element', async () => {
    await mount(<TestableComponent />)
    const component = await TestableComponent.find({
      tag: 'input',
      attribute: { name: 'type', value: 'password' }
    })
    expect(component.getComponentRoot().getDOMNode())
      .to.equal(document.getElementById('componentRoot'))
  })
})
