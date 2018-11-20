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

import { expect, find, mount, spy } from '@instructure/ui-test-utils'

import Focusable from '../index'

describe('<Focusable />', async () => {
  const lastCall = spy => spy.lastCall.args[0]

  it('should render', async () => {
    const subject = await mount(
      <Focusable>
        {() => <button>hello world</button>}
      </Focusable>
    )

    expect(subject.getDOMNode()).to.exist()
  })

  it('should call children function with focused when element receives focus', async () => {
    const renderSpy = spy()

    await mount(
      <Focusable>
        {(args) => {
          renderSpy(args)
          return <button>foo</button>
        }}
      </Focusable>
    )

    const focusable = await find(':focusable')

    expect(lastCall(renderSpy).focused).to.equal(false)
    expect(lastCall(renderSpy).focusable).to.equal(focusable.getDOMNode())
    expect(lastCall(renderSpy).focusVisible).to.equal(false)

    await focusable.keyDown() // make sure we're back in keyboard mode
    await focusable.focus()

    expect(lastCall(renderSpy).focused).to.equal(true)
    expect(lastCall(renderSpy).focusable).to.equal(focusable.getDOMNode())
    expect(lastCall(renderSpy).focusVisible).to.equal(true)

    await focusable.blur()

    expect(lastCall(renderSpy).focused).to.equal(false)
    expect(lastCall(renderSpy).focusable).to.equal(focusable.getDOMNode())
    expect(lastCall(renderSpy).focusVisible).to.equal(false)
  })

  it('should populate the focusVisible argument', async () => {
    const renderSpy = spy()

    await mount(
      <Focusable>
        {(args) => {
          renderSpy(args)
          return <button>foo</button>
        }}
      </Focusable>
    )

    const focusable = await find(':focusable')

    await focusable.mouseDown()
    await focusable.focus()

    expect(lastCall(renderSpy).focused).to.equal(true)
    expect(lastCall(renderSpy).focusVisible).to.equal(false)
  })

  it('should update the focus element correctly', async () => {
    const renderSpy = spy()

    const subject = await mount(
      <Focusable>
        {(args) => {
          renderSpy(args)
          return <button>foo</button>
        }}
      </Focusable>
    )

    const firstButton = await find('button:label(foo)')

    await firstButton.focus()

    expect(lastCall(renderSpy).focused).to.equal(true)

    await firstButton.blur()

    expect(lastCall(renderSpy).focused).to.equal(false)

    await subject.setProps({
      children: (args) => { // eslint-disable-line react/display-name
        renderSpy(args)
        return <span>some content text<button>bar</button></span>
      }
    })

    const secondButton = await find('button:label(bar)')

    await secondButton.focus()

    expect(lastCall(renderSpy).focused).to.equal(true)
  })

  it('should warn when there is not exactly 1 focusable descendant', async () => {
    const warning = spy(console, 'warn')

    const subject = await mount(
      <Focusable>
        {(args) => {
          return (
            <span>
              <button>foo</button>
              <span>
                <button>bar</button>
              </span>
            </span>
          )
        }}
      </Focusable>
    )

    expect(
      lastCall(warning).includes('Exactly one focusable child is required (2 found)')
    ).to.be.true()

    await subject.setProps({
      children: (args) => <span>hello!</span> // eslint-disable-line react/display-name
    })

    expect(
      lastCall(warning).includes('Exactly one focusable child is required (0 found)')
    ).to.be.true()
  })

  it('should attach event listener correctly even when the focusable element is not the root', async () => {
    const renderSpy = spy()

    await mount(
      <Focusable>
        {(args) => {
          renderSpy(args)
          return (
            <span>
              <h1>hello world</h1>
              <p>some content</p>
              <span>
                <button>foo</button>
              </span>
            </span>
          )
        }}
      </Focusable>
    )

    expect(lastCall(renderSpy).focused).to.equal(false)

    const button = await find('button:label(foo)')
    await button.focus()

    expect(lastCall(renderSpy).focused).to.equal(true)
  })

  it('should provide a focus method', async () => {
    let focusable
    await mount(
      <Focusable componentRef={(el) => { focusable = el }}>
        {() => <button>hello world</button>}
      </Focusable>
    )

    await focusable.focus()

    const button = await find('button:label(hello world)')

    expect(button.getDOMNode()).to.equal(document.activeElement)
  })

  it('should provide a focused getter', async () => {
    let focusable

    await mount(
      <Focusable componentRef={(el) => { focusable = el }}>
        {() => <button>hello world</button>}
      </Focusable>
    )

    await focusable.focus()

    expect(focusable.focused).to.equal(true)
  })
})
