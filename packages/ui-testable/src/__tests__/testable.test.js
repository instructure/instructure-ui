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

import testable from '../index'

const locator = {
  attribute: 'data-ui-testable',
  value: 'Component'
}

@testable()
class Component extends React.Component {
  static propTypes = {
   hide: PropTypes.bool,
   children: PropTypes.node
  }
  static defaultProps = {
   hide: false,
   children: (
     <div id="componentRoot">
       <input type="text"/>
       <input type="password" />
     </div>
   )
  }
  static displayName = 'Component'
  render () {
    const { hide, children } = this.props
    return !hide ? children : null
  }
}

describe('@testable', async () => {
  it('should handle components that render `null`', async () => {
    await mount(<Component hide />)
    expect(await findAll({ locator, expectEmpty: true })).to.have.length(0)
  })
  it('should still find the component root element even when the root element changes', async () => {
    const subject = await mount(<Component />)
    expect(await find({ locator })).to.exist()
    subject.setProps({ children: <ul><li>foo</li></ul> })
    expect(await find({ locator })).to.exist()
  })
})
