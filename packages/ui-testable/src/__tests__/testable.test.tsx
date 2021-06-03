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

import { mount, expect, find, findAll } from '@instructure/ui-test-utils'

import { testable } from '../index'

class Component extends React.Component {
  static propTypes = {
    hide: PropTypes.bool,
    children: PropTypes.node
  }
  static defaultProps = {
    hide: false,
    children: (
      <div id="componentRoot">
        <input type="text" />
        <input type="password" />
      </div>
    )
  }
  static displayName = 'Component'
  render() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'hide' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    const { hide, children } = this.props
    return !hide ? children : null
  }
}

describe('@testable', async () => {
  it('should define a component selector', async () => {
    const TestableComponent = testable()(Component)

    expect(TestableComponent.selector).to.equal('[data-cid~="Component"]')
  })

  it('should handle components that render `null`', async () => {
    const TestableComponent = testable()(Component)

    await mount(<TestableComponent hide />)

    expect(
      await findAll(TestableComponent.selector, { expectEmpty: true })
    ).to.have.length(0)
  })

  it('should still apply the attribute/value when the root element changes', async () => {
    const TestableComponent = testable()(Component)

    const subject = await mount(<TestableComponent />)

    expect(await find(TestableComponent.selector)).to.exist()

    subject.setProps({
      children: (
        <ul>
          <li>foo</li>
        </ul>
      )
    })

    expect(await find(TestableComponent.selector)).to.exist()
  })
})
