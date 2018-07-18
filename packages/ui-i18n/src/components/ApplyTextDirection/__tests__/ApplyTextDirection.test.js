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
import ApplyTextDirection from '../index'
import bidirectional from '../../../bidirectional'
import { makeTextDirectionContext } from '../../../TextDirectionContextTypes'
import getTextDirection from '../../../utils/getTextDirection'

describe('<ApplyTextDirection />', () => {
  @bidirectional()
  class BidirectionalComponent extends React.Component {
    render () {
      return <div>Hello World</div>
    }
  }

  const getDirection = (subject) => {
    return subject.getDOMNode().getAttribute('dir')
  }

  const testbed = new Testbed(
    <ApplyTextDirection>
      Hello world
    </ApplyTextDirection>
  )

  beforeEach(() => {
    testbed.setTextDirection('rtl')
    getTextDirection.resetDefault()
  })

  it('should take on the direction of the document element by default', () => {
    const subject = testbed.render()
    expect(getDirection(subject)).to.equal('rtl')
  })

  it('should take on the context direction if dir prop is not supplied', () => {
    const context = makeTextDirectionContext('ltr')
    const subject = testbed.render({}, context)

    expect(getDirection(subject)).to.equal('ltr')
  })

  it('should give dir prop preference over context and default document element when supplied', () => {
    const context = makeTextDirectionContext('rtl')
    const subject = testbed.render({ dir: 'ltr' }, context)

    expect(getDirection(subject)).to.equal('ltr')
  })

  it('should pass direction via context to bidirectional children', () => {
    let bidirectionalComponent

    testbed.render({
      dir: 'ltr',
      children: (
        <BidirectionalComponent ref={(el) => { bidirectionalComponent = el }} />
      )
    })

    expect(bidirectionalComponent.dir).to.equal('ltr')
  })

  it('when nested, should override parent ApplyTextDirection context', () => {
    let bidirectionalComponent

    testbed.render({
      dir: 'ltr',
      children: (
        <ApplyTextDirection dir="rtl">
          <BidirectionalComponent ref={(el) => { bidirectionalComponent = el }} />
        </ApplyTextDirection>
      )
    })

    expect(bidirectionalComponent.dir).to.equal('rtl')
  })
})
