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
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Provider, Consumer } from '../VideoPlayerContext'
import providerStateForTest from './fixtures/providerStateForTest'
import { PLAYING } from '../../../constants'

class ComponentWithConsumer extends Component {
  static propTypes = {
    customRenderProp: PropTypes.func
  }

  render() {
    return (
      <Consumer>
        {this.props.customRenderProp}
      </Consumer>
    )
  }
}

describe('VideoPlayerContext', () => {
  const providerState = { ...providerStateForTest }

  const testbed = new Testbed(
    <Provider value={providerState}>
      <ComponentWithConsumer />
    </Provider>
  )
  let customStub
  beforeEach(() => {
    customStub = testbed.stub()
    customStub.returns(<div />)
  })

  it('should propagate providerState down to Consumer', () => {
    testbed.render({ children: <ComponentWithConsumer customRenderProp={customStub} /> })
    expect(customStub).to.have.been.calledWith(providerState)
  })

  it('rerenders everytime state changes', (done) => {
    expect(customStub).not.to.have.been.called()
    const component = testbed.render({ children: <ComponentWithConsumer customRenderProp={customStub} /> })
    expect(customStub.callCount).to.eql(1)

    const newState = {
      ...providerState,
      state: {
        ...providerState.state,
        videoState: PLAYING
      }
    }
    component.setProps({ value: newState }, () => {
      expect(customStub.callCount).to.eql(2)
      done()
    })
  })
})
