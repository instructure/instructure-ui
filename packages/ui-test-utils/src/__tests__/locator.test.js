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
import PropTypes from 'prop-types'

import {
  querySelectorAll,
  matchesSelector,
  findAllByQuery,
  mount,
  expect,
  locator
} from '../index'

const componentLocator = {
  attribute: 'data-test-id',
  value: 'Component'
}

const props = {
  [componentLocator.attribute]: componentLocator.value
}

class Component extends React.Component {
  static displayName = 'Component'
  static selector = `[${componentLocator.attribute}~="${componentLocator.value}"]`

  static propTypes = {
    hide: PropTypes.bool,
    children: PropTypes.node
  }

  static defaultProps = {
    hide: false,
    children: (
      <div id="componentRoot" {...props}>
        <input type="text"/>
        <input type="password" />
      </div>
    )
  }

  render () {
    const { hide, children } = this.props
    return !hide ? children : null
  }
}

const ComponentLocator = locator(Component.selector, {
  findAllInputs: (...args) => {
    return findAllByQuery((element, selector, options) => {
      let results = querySelectorAll(element, 'input')
      if (selector) {
        results = results
          .filter(input => matchesSelector(input, selector, options))
      }
      return {
        results,
        selector: ['input', selector].join(', ')
      }
    }, ...args)
  }
})

describe('locator', async () => {
  it('should handle components that render `null`', async () => {
    await mount(<Component hide />)
    expect(await ComponentLocator.findAll({ expectEmpty: true })).to.have.length(0)
  })

  it('should find component root elements without a selector', async () => {
    await mount(<Component />)
    expect(await ComponentLocator.findAll()).to.have.length(1)
  })

  it('should filter out non-matching components with a selector', async () => {
    await mount(<Component />)
    expect(await ComponentLocator.findAll('a', { expectEmpty: true }))
      .to.have.length(0)
  })

  it('should return no results when expected', async () => {
    await mount(<div />)
    expect(await ComponentLocator.findAll({ expectEmpty: true }))
      .to.have.length(0)
  })

  it('can find an element by attribute name and value', async () => {
    await mount(<Component />)
    expect(await ComponentLocator.findAll('input[type="password"]')).to.have.length(1)
  })

  it('should support custom queries', async () => {
    await mount(<Component />)
    const component = await ComponentLocator.find()
    expect(await component.findAllInputs()).to.have.length(2)
  })

  it('should always return the component root node', async () => {
    await mount(<Component />)
    const result = await ComponentLocator.find('input')
    expect(result.getDOMNode()).to.equal(document.querySelector('#componentRoot'))
  })
})
