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
import safeCloneElement from '../safeCloneElement'
import createChainedFunction from '../../createChainedFunction'

describe('safeCloneElement', () => {
  const SafeClone = function ({ element, props, children }) {
    return safeCloneElement(element, props, children)
  }

  const testbed = new Testbed(<SafeClone />)

  it('should preserve refs', () => {
    const origRef = testbed.stub()
    const cloneRef = testbed.stub()

    const div = testbed.render({
      element: <div ref={origRef} />,
      props: { ref: cloneRef }
    })

    expect(origRef).to.have.been.called
    expect(cloneRef).to.have.been.called
  })

  it('should throw an error for string refs', () => {
    function render () {
      return testbed.render({
        element: <div ref="foo" /> // eslint-disable-line react/no-string-refs
      })
    }

    expect(render).to.throw(Error)
  })

  it('should preserve event handlers', () => {
    const onClickA = testbed.spy()
    const onClickB = testbed.spy()

    const subject = testbed.render({
      element: <button onClick={onClickA} />,
      props: { onClick: onClickB }
    })

    subject.find('button').click()

    expect(onClickA).to.have.been.called
    expect(onClickB).to.have.been.called
  })

  it('should preserve already chained functions', () => {
    const onClickA = testbed.spy()
    const onClickB = testbed.spy()
    const onClickC = testbed.spy()

    const subject = testbed.render({
      element: <button onClick={onClickA} />,
      props: { onClick: createChainedFunction(onClickB, onClickC) }
    })

    subject.find('button').click()

    expect(onClickA).to.have.been.called
    expect(onClickB).to.have.been.called
    expect(onClickC).to.have.been.called
  })
})
