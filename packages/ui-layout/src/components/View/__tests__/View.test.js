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
import View from '../index'

describe('<View />', () => {
  const testbed = new Testbed(
    <View>
      <h1>Hello!</h1>
    </View>
  )

  it('should render', () => {
    const subject = testbed.render()
    expect(subject).to.be.present
  })

  it('should render children', () => {
    const subject = testbed.render()
    expect(subject.find('h1')).to.have.length(1)
  })

  it('should warn when as=span, display=auto, and margins are set', () => {
    const warning = testbed.spy(console, 'warn')

    testbed.render({
      as: 'span',
      display: 'auto',
      margin: 'small'
    })

    expect(
      warning.lastCall.args[0].includes(
        `element of type 'span' and display 'auto' is inline and will allow for horizontal margins only`
      )
    ).to.be.true
  })

  it('should pass position style attributes', () => {
    const subject = testbed.render({
      style: {
        top: '10rem',
        left: '5px',
        minWidth: '20px',
        minHeight: '13rem',
        position: 'absolute',
        transform: 'translate(30px, 15px)',
        overflow: 'hidden',
        display: 'none'
      }
    })

    const styles = subject.getDOMNode().style
    expect(styles['top']).to.equal('10rem')
    expect(styles['left']).to.equal('5px')
    expect(styles['minWidth']).to.equal('20px')
    expect(styles['minHeight']).to.equal('13rem')
    expect(styles['position']).to.equal('absolute')
    expect(styles['transform']).to.equal('translate(30px, 15px)')
    expect(styles['overflow']).to.equal('hidden')
    expect(styles['display']).to.equal('none')
  })

  it('should pass flex style', () => {
    const subject = testbed.render({
      style: {
        flexBasis: '30rem'
      }
    })

    const styles = subject.getDOMNode().style
    expect(styles['flexBasis']).to.equal('30rem')
  })

  it('should not pass all styles', () => {
    const subject = testbed.render({
      style: {
        backgroundColor: 'red',
        borderStyle: 'dotted',
        opacity: '0.5'
      }
    })

    const styles = subject.getDOMNode().style
    expect(styles['backgroundColor']).to.equal('')
    expect(styles['borderStyle']).to.equal('')
    expect(styles['opacity']).to.equal('')
  })

  it('should pass className', () => {
    const className = 'fooBarBaz'
    const subject = testbed.render({
      className
    })
    expect(subject.getDOMNode().classList.contains(className))
  })

  it('should provide an elementRef', () => {
    const elementRef = testbed.spy()
    const subject = testbed.render({
      elementRef
    })
    expect(elementRef).to.have.been.calledWith(subject.getDOMNode())
  })

  it('should pass cursor', () => {
    const cursor = 'cell'
    const subject = testbed.render({
      cursor
    })
    const styles = subject.getDOMNode().style
    expect(styles['cursor']).to.equal(cursor)
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: []
    })
  })
})
