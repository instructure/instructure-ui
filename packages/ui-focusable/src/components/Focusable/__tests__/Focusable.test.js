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
import Focusable from '../index'

describe('<Focusable />', () => {
  const testbed = new Testbed(
    <Focusable>
      {() => <button>hello world</button>}
    </Focusable>
  )

  const lastCall = spy => spy.lastCall.args[0]

  it('should render', () => {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('should call children function with focused when element receives focus', () => {
    const renderSpy = testbed.spy()
    let button

    testbed.render({
      children: (args) => { // eslint-disable-line react/display-name
        renderSpy(args)
        return <button ref={(el) => { button = el}}>foo</button>
      }
    })

    expect(lastCall(renderSpy).focused).to.equal(false)
    expect(lastCall(renderSpy).focusable).to.equal(button)
    expect(lastCall(renderSpy).focusVisible).to.equal(false)

    button.focus()
    testbed.tick()

    expect(lastCall(renderSpy).focused).to.equal(true)
    expect(lastCall(renderSpy).focusable).to.equal(button)
    expect(lastCall(renderSpy).focusVisible).to.equal(true)

    button.blur()
    testbed.tick()

    expect(lastCall(renderSpy).focused).to.equal(false)
    expect(lastCall(renderSpy).focusable).to.equal(button)
    expect(lastCall(renderSpy).focusVisible).to.equal(false)
  })

  it(`should populate the focusVisible argument`, () => {
    const renderSpy = testbed.spy()
    let button

    testbed.render({
      children: (args) => { // eslint-disable-line react/display-name
        renderSpy(args)
        return <button ref={(el) => { button = el}}>foo</button>
      }
    })

    const buttonWrapper = Testbed.wrap(button)
    buttonWrapper.dispatchNativeMouseEvent('mousedown')

    button.focus()
    testbed.tick()

    expect(lastCall(renderSpy).focused).to.equal(true)
    expect(lastCall(renderSpy).focusVisible).to.equal(false)
  })

  it('should update the focus element correctly', (done) => {
    const renderSpy = testbed.spy()
    let firstButton
    let secondButton

    const firstButtonRef = (el) => {
      firstButton = el
    }

    const secondButtonRef = (el) => {
      secondButton = el
    }

    const childrenFunc = (render) => {
      return (args) => { // eslint-disable-line react/display-name
        renderSpy(args)
        return render()
      }
    }

    const subject = testbed.render({
      children: childrenFunc(() => {
        return <button ref={firstButtonRef}>foo</button>
      })
    })

    firstButton.focus()
    testbed.tick()

    expect(lastCall(renderSpy).focused).to.equal(true)

    firstButton.blur()
    testbed.tick()

    expect(lastCall(renderSpy).focused).to.equal(false)

    subject.setProps({
      children: childrenFunc(() => {
        return <span>some content text<button ref={secondButtonRef}>bar</button></span>
      })
    }, () => {
      secondButton.focus()
      testbed.defer(() => {
        expect(lastCall(renderSpy).focused).to.equal(true)
        done()
      })
    })
  })

  it('should warn when there is not exactly 1 focusable descendant', (done) => {
    const warning = testbed.spy(console, 'warn')
    const subject = testbed.render({
      children: (args) => ( // eslint-disable-line react/display-name
        <span>
          <button>foo</button>
          <span>
            <button>bar</button>
          </span>
        </span>
      )
    })

    expect(
      lastCall(warning).includes('Exactly one focusable child is required (2 found)')
    ).to.be.true

    subject.setProps({
      children: (args) => <span>hello!</span> // eslint-disable-line react/display-name
    }, () => {
      expect(
        lastCall(warning).includes('Exactly one focusable child is required (0 found)')
      ).to.be.true
      done()
    })
  })

  it('should attach event listener correctly even when the focusable element is not the root', () => {
    const renderSpy = testbed.spy()
    let button

    testbed.render({
      children: (args) => { // eslint-disable-line react/display-name
        renderSpy(args)
        return (
          <span>
            <h1>hello world</h1>
            <p>some content</p>
            <span>
              <button ref={(el) => { button = el}}>foo</button>
            </span>
          </span>
        )
      }
    })

    expect(lastCall(renderSpy).focused).to.equal(false)

    button.focus()
    testbed.tick()

    expect(lastCall(renderSpy).focused).to.equal(true)
  })

  it('should provide a focus method', () => {
    let button

    const subject = testbed.render({
      children: (args) => { // eslint-disable-line react/display-name
        return <span><button ref={(el) => { button = el}}>foo</button></span>
      }
    })

    subject.instance().focus()

    expect(button).to.equal(document.activeElement)
  })

  it('should provide a focused getter', () => {
    let button

    const subject = testbed.render({
      children: (args) => { // eslint-disable-line react/display-name
        return <span><button ref={(el) => { button = el}}>foo</button></span>
      }
    })

    button.focus()

    expect(subject.instance().focused).to.equal(true)
  })
})
