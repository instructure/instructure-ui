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

import { expect, mount, stub, spy, within } from '@instructure/ui-test-utils'
import View from '../index'

describe('<View />', async () => {
  it('should render', async () => {
    const subject = await mount(
      <View>
        <h1>Hello!</h1>
      </View>
    )

    expect(subject.getDOMNode()).to.exist()
  })

  it('should render children', async () => {
    const subject = await mount(
      <View>
        <h1>Hello!</h1>
      </View>
    )

    const view = within(subject.getDOMNode())
    const h1 = await view.findAll({tag: 'h1'})

    expect(h1).to.have.length(1)
  })

  it('should warn when as=span, display=auto, and vertical margins are set', async () => {
    const warning = spy(console, 'warn')
    const subject = await mount(
      <View as="span" display="auto" margin="0 0 small 0">
        <h1>Hello!</h1>
      </View>
    )

    expect(
      warning.lastCall.args[0].includes(
        `element of type 'span' and display 'auto' is inline and will allow for horizontal margins only`
      )
    ).to.be.true()

    subject.setProps({
      margin: 'none small'
    })

    expect(warning).to.have.been.calledOnce()
  })

  it('should pass position style attributes', async () => {
    const styleProps = {
      top: '10rem',
      left: '5px',
      minWidth: '20px',
      minHeight: '13rem',
      position: 'absolute',
      transform: 'translate(30px, 15px)',
      overflow: 'hidden',
      display: 'block'
    }

    const subject = await mount(
      <View style={{...styleProps}}>
        <h1>Hello!</h1>
      </View>
    )

    const styles = subject.getDOMNode().style

    expect(styles['top']).to.equal('10rem')
    expect(styles['left']).to.equal('5px')
    expect(styles['minWidth']).to.equal('20px')
    expect(styles['minHeight']).to.equal('13rem')
    expect(styles['position']).to.equal('absolute')
    expect(styles['transform']).to.equal('translate(30px, 15px)')
    expect(styles['overflow']).to.equal('hidden')
    expect(styles['display']).to.equal('block')
  })

  it('should pass flex style', async () => {
    const subject = await mount(
      <View style={{flexBasis: '30rem'}}>
        <h1>Hello!</h1>
      </View>
    )

    const styles = subject.getDOMNode().style
    expect(styles['flexBasis']).to.equal('30rem')
  })

  it('should not pass all styles', async () => {
    const styleProps = {
      backgroundColor: 'red',
      borderStyle: 'dotted',
      opacity: '0.5'
    }

    const subject = await mount(
      <View style={{...styleProps}}>
        <h1>Hello!</h1>
      </View>
    )

    const styles = subject.getDOMNode().style

    expect(styles['backgroundColor']).to.equal('')
    expect(styles['borderStyle']).to.equal('')
    expect(styles['opacity']).to.equal('')
  })

  it('should pass className', async () => {
    const className = 'fooBarBaz'
    const subject = await mount(
      <View className={className}>
        <h1>Hello!</h1>
      </View>
    )

    expect(subject.getDOMNode().classList.contains(className))
  })

  it('should provide an elementRef', async () => {
    const elementRef = stub()
    const subject = await mount(
      <View elementRef={elementRef}>
        <h1>Hello!</h1>
      </View>
    )

    expect(elementRef).to.have.been.calledWith(subject.getDOMNode())
  })

  it('should pass cursor', async () => {
    const cursor = 'cell'
    const subject = await mount(
      <View cursor={cursor}>
        <h1>Hello!</h1>
      </View>
    )

    const styles = subject.getDOMNode().style
    expect(styles['cursor']).to.equal(cursor)
  })

  it('should meet a11y standards', async () => {
    const subject = await mount(
      <View>
        <h1>Hello!</h1>
      </View>
    )

    const view = within(subject.getDOMNode())
    expect(await view.accessible()).to.be.true()
  })
})
