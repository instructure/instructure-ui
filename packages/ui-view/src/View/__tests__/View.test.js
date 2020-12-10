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

import { expect, mount, stub, wait, within } from '@instructure/ui-test-utils'
import { View } from '../../index'

import styles from '../styles.css'

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
    const h1 = await view.findAll('h1')

    expect(h1).to.have.length(1)
  })

  it('should pass whitelisted style attributes', async () => {
    const styleProps = {
      top: '10rem',
      left: '5px',
      minWidth: '20px',
      minHeight: '13rem',
      position: 'absolute',
      transform: 'translate(30px, 15px)',
      overflow: 'hidden',
      display: 'block',
      pointerEvents: 'none'
    }

    const subject = await mount(
      <View style={{ ...styleProps }}>
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
    expect(styles['pointerEvents']).to.equal('none')
  })

  it('should pass flex style', async () => {
    const subject = await mount(
      <View style={{ flexBasis: '30rem' }}>
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
      <View style={{ ...styleProps }}>
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

  it('should set overflow', async () => {
    const subject = await mount(
      <View overflowX="hidden" overflowY="auto">
        <h1>Hello!</h1>
      </View>
    )

    const view = within(subject.getDOMNode())

    await wait(() => {
      expect(view.getComputedStyle()['overflow-x']).to.equal('hidden')
      expect(view.getComputedStyle()['overflow-y']).to.equal('auto')
    })
  })

  it('should set CSS position', async () => {
    const subject = await mount(
      <View position="fixed">
        <h1>Hello!</h1>
      </View>
    )

    const view = within(subject.getDOMNode())

    await wait(() => {
      expect(view.getComputedStyle()['position']).to.equal('fixed')
    })
  })

  it('should set inline offset (top, bottom, left, right)', async () => {
    const subject = await mount(
      <View
        insetBlockStart="0"
        insetBlockEnd="20px"
        insetInlineStart="2px"
        insetInlineEnd="3px"
      >
        <h1>Hello!</h1>
      </View>
    )

    const view = within(subject.getDOMNode())

    await wait(() => {
      expect(view.getComputedStyle()['top']).to.equal('0px')
      expect(view.getComputedStyle()['bottom']).to.equal('20px')
      expect(view.getComputedStyle()['left']).to.equal('2px')
      expect(view.getComputedStyle()['right']).to.equal('3px')
    })
  })

  it('should override default max-width', async () => {
    const subject = await mount(
      <View>
        <h1>Hello!</h1>
      </View>
    )

    const view = within(subject.getDOMNode())
    expect(view.getComputedStyle().maxWidth).to.equal('100%')

    await subject.setProps({ maxWidth: '200px' })
    expect(view.getComputedStyle().maxWidth).to.equal('200px')
  })

  describe('withFocusOutline', async () => {
    it('should warn when withFocusOutline is true without position=relative', async () => {
      const consoleError = stub(console, 'error')
      const warning =
        'Warning: [View] the focus outline will only show if the `position` prop is `relative`.'
      await mount(
        <View withFocusOutline>
          <h1>Hello!</h1>
        </View>
      )

      expect(consoleError).to.be.calledWith(warning)
    })

    it('should warn when withFocusOutline is `true`, display is set to `inline`, and focusPosition is set to `offset`', async () => {
      const consoleError = stub(console, 'error')
      const warning =
        'Warning: [View] when display is set to `inline` the focus outline will only show if `focusPosition` is set to `inset`.'
      await mount(
        <View withFocusOutline display="inline" focusPosition="offset">
          <h1>Hello!</h1>
        </View>
      )

      expect(consoleError).to.be.calledWith(warning)
    })

    it('should apply the correct focus ring depending on the border radius', async () => {
      const subject = await mount(
        <View withFocusOutline position="relative" display="block">
          Hello
        </View>
      )

      const view = within(subject.getDOMNode())

      const baseRadiusStyle = 'focusRing--radius'

      expect(view).to.have.className(styles[`${baseRadiusStyle}None`])

      await subject.setProps({ borderRadius: '0' })
      expect(view).to.have.className(styles[`${baseRadiusStyle}None`])

      await subject.setProps({ borderRadius: 'none' })
      expect(view).to.have.className(styles[`${baseRadiusStyle}None`])

      await subject.setProps({ borderRadius: 'circle' })
      expect(view).to.have.className(styles[`${baseRadiusStyle}Inherit`])

      await subject.setProps({ borderRadius: 'pill' })
      expect(view).to.have.className(styles[`${baseRadiusStyle}Inherit`])

      await subject.setProps({ borderRadius: 'small' })
      expect(view).to.have.className(styles[`${baseRadiusStyle}Small`])

      await subject.setProps({ borderRadius: 'medium' })
      expect(view).to.have.className(styles[`${baseRadiusStyle}Medium`])

      await subject.setProps({ borderRadius: 'large' })
      expect(view).to.have.className(styles[`${baseRadiusStyle}Large`])

      await subject.setProps({ borderRadius: 'small small small' })
      expect(view).to.have.className(styles[`${baseRadiusStyle}Small`])

      await subject.setProps({ borderRadius: 'small small small medium' })
      expect(view).to.have.className(styles[`${baseRadiusStyle}None`])
    })

    it('should use the native browser focus management when withFocusOutline is undefined', async () => {
      const subject = await mount(
        <View as="button" position="relative">
          Hello
        </View>
      )

      const view = within(subject.getDOMNode())
      expect(view).to.have.className(styles.shouldUseBrowserFocus)
    })
  })

  it('should meet a11y standards', async () => {
    const subject = await mount(<View>Hello!</View>)

    const view = within(subject.getDOMNode())
    expect(await view.accessible()).to.be.true()
  })
})
