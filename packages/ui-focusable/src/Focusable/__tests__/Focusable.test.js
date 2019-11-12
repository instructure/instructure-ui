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

import { expect, find, mount, spy, stub, wait } from '@instructure/ui-test-utils'

import { Focusable } from '../index'

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
          return <button type="button">foo</button>
        }}
      </Focusable>
    )

    const focusable = await find(':focusable')

    await wait(() => {
      expect(lastCall(renderSpy).focused).to.be.false()
      expect(lastCall(renderSpy).focusable).to.equal(focusable.getDOMNode())
      expect(lastCall(renderSpy).focusVisible).to.be.false()
    })

    await focusable.keyDown() // make sure we're back in keyboard mode
    await focusable.focus()

    await wait(() => {
      expect(focusable.focused()).to.be.true()
      expect(lastCall(renderSpy).focused).to.be.true()
      expect(lastCall(renderSpy).focusable).to.equal(focusable.getDOMNode())

      expect(lastCall(renderSpy).focusVisible).to.be.true()
    })

    await focusable.blur({}, { simulate: true })

    await wait(() => {
      expect(focusable.focused()).to.be.false()
      expect(lastCall(renderSpy).focused).to.equal(false)
      expect(lastCall(renderSpy).focusable).to.equal(focusable.getDOMNode())
      expect(lastCall(renderSpy).focusVisible).to.equal(false)
    })
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

    await wait(() =>{
      expect(lastCall(renderSpy).focused).to.equal(true)
      expect(lastCall(renderSpy).focusVisible).to.equal(false)
    })
  })

  it('should handle conditionally rendered focus elements', async () => {
    const props = {
      /* eslint-disable react/display-name */
      /* eslint-disable react/prop-types */
      render: ({ focused }) => {
        return (
          <div>
            {focused
              ? <input type="text" />
              : <a href="http://focus.net">Click</a>
            }
          </div>
        )
      }
      /* eslint-enable react/prop-types */
      /* eslint-enable react/display-name */
    }

    const renderSpy = spy(props, 'render')

    await mount(
      <Focusable {...props} />
    )

    const firstFocusable = await find(':focusable')

    expect(firstFocusable.getTagName()).to.equal('a')
    expect(firstFocusable.focused()).to.be.false()

    await wait(() => {
      expect(lastCall(renderSpy).focused).to.be.false()
      expect(lastCall(renderSpy).focusable).to.equal(firstFocusable.getDOMNode())
    })

    await firstFocusable.focus()

    const nextFocusable = await find(':focusable')

    expect(nextFocusable.getTagName()).to.equal('input')
    expect(nextFocusable.focused()).to.be.true()

    await wait(() => {
      expect(lastCall(renderSpy).focused).to.be.true()
      expect(lastCall(renderSpy).focusable).to.equal(nextFocusable.getDOMNode())
    })

    await nextFocusable.blur({}, { simulate: true })

    const lastFocusable = await find(':focusable')

    expect(lastFocusable.getTagName()).to.equal('a')
    expect(lastFocusable.focused()).to.be.false()

    await wait(() => {
      expect(lastCall(renderSpy).focused).to.be.false()
      expect(lastCall(renderSpy).focusable).to.equal(lastFocusable.getDOMNode())
    })
  })

  it('should maintain focus when the focus element changes', async () => {
    const props = {
      /* eslint-disable react/display-name */
      render: () => { return <a href="http://focus.net">Click</a> }
      /* eslint-enable react/display-name */
    }

    const renderSpy = spy(props, 'render')

    const subject = await mount(
      <Focusable {...props} />
    )

    const firstFocusable = await find(':focusable')
    await firstFocusable.focus()

    await wait(() => {
      expect(firstFocusable.focused()).to.be.true()
      expect(lastCall(renderSpy).focused).to.be.true()
      expect(lastCall(renderSpy).focusable).to.equal(firstFocusable.getDOMNode())
    })

    /* eslint-disable react/display-name */
    const nextProps = { render: () => <button>Click</button> }
    /* eslint-enable react/display-name */

    const nextRenderSpy = spy(nextProps, 'render')
    await subject.setProps(nextProps)

    const nextFocusable = await find(':focusable')
    expect(nextFocusable.getTagName()).to.equal('button')
    expect(nextFocusable.focused()).to.be.true()

    await wait(() => {
      expect(lastCall(nextRenderSpy).focused).to.be.true()
      expect(lastCall(nextRenderSpy).focusable).to.equal(nextFocusable.getDOMNode())
    })
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

    await wait(() => {
      expect(lastCall(renderSpy).focused).to.equal(true)
    })

    await firstButton.blur({}, { simulate: true })

    await wait(() => {
      expect(lastCall(renderSpy).focused).to.equal(false)
    })

    await subject.setProps({
      children: (args) => { // eslint-disable-line react/display-name
        renderSpy(args)
        return <span>some content text<button>bar</button></span>
      }
    })

    const secondButton = await find('button:label(bar)')

    await secondButton.focus()

    await wait(() => {
      expect(lastCall(renderSpy).focused).to.equal(true)
    })
  })

  it('should warn when there is more than one focusable descendant', async () => {
    const consoleWarn = stub(console, 'warn')
    const warning = 'Warning: [Focusable] Exactly one focusable child is required (2 found).'
    await mount(
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
    expect(consoleWarn)
      .to.be.calledWith(warning)
  })

  it('should warn when there are no focusable descendants', async () => {
    const consoleWarn = stub(console, 'warn')
    const warning = 'Warning: [Focusable] Exactly one focusable child is required (0 found).'
    await mount(
      <Focusable>
        {(args) => {
          return (
            <span>hello!</span>
          )
        }}
      </Focusable>
    )
    expect(consoleWarn)
      .to.be.calledWith(warning)
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

    await wait(() => {
      expect(lastCall(renderSpy).focused).to.equal(true)
    })
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

  it('should properly restore the event handlers', async () => {
    let inputRef

    class TestComponent extends Component {
      render() {
        const { changeValue } = this.props

        return (
          <Focusable>
            {
              ({focusVisible}) => {
                return (
                  <input
                    readOnly
                    ref={(el) => { inputRef = el }}
                    value={`${focusVisible}_${changeValue}`} />
                )
              }
            }
          </Focusable>
        )
      }
    }

    const subject = await mount(<TestComponent changeValue="A" />)
    await wait(() => {
      expect(inputRef.value).to.equal('false_A')
    })

    await subject.setProps({
      changeValue: 'B'
    })

    await inputRef.focus()

    await wait(() => {
      expect(inputRef.value).to.equal('true_B')
    })
  })

  it('should properly clear the focusable / focused state when focus is unexpectedly lost', async () => {
    let buttonRef, focusableRef, labelRef

    class TestComponent extends Component {
      state = {
        checked: false,
        disabled: false
      }

      render() {
        const { checked, disabled } = this.state

        return (
          <div>
            <Focusable ref={(el) => { focusableRef = el }}>
              {
                () => {
                  return (
                    <label ref={(el) => { labelRef = el }}>
                      <input
                        checked={checked}
                        disabled={disabled}
                        onChange={()=> { this.setState({ checked: true }) }}
                        type="checkbox"
                      />
                    </label>
                  )
                }
              }
            </Focusable>
            <button
              onClick={() => { this.setState({ disabled: true }) }}
              ref={(el) => { buttonRef = el }}
            >
              hello world
            </button>
          </div>
        )
      }
    }

    await mount(<TestComponent />)
    await wait(() => {
      expect(focusableRef.focused).to.equal(false)
    })

    const input = await find('input[type="checkbox"]')

    await labelRef.click()
    await wait(() => {
      expect(input.focused()).to.equal(true)
    })

    await buttonRef.click()
    await wait(() => {
      expect(input.focused()).to.equal(false)
    })
  })
})
