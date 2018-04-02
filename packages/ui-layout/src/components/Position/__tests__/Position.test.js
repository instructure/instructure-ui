/*
 * The MIT License (MIT)
 *
 * Copyright (c) 21 - present Instructure, Inc.
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

import within from '@instructure/ui-utils/lib/within'

import Position, { PositionTarget, PositionContent } from '../index'

function findAll (subject) {
  const position = subject.find(Position)
  const target = subject.find('button').unwrap()
  const content = subject.ref('_content').getDOMNode()

  const targetRect = target.getBoundingClientRect()
  const contentRect = content.getBoundingClientRect()

  return { position, target, content, targetRect, contentRect }
}

describe('<Position />', () => {
  class App extends Component {
    static propTypes = {
      ...Position.propTypes
    }

    render () {
      const { ...props } = this.props

      delete props.children

      return (
        <div
          style={{
            width: 500,
            height: 150,
            padding: 100,
            textAlign: 'center'
          }}
        >
          <Position {...props}>
            <PositionTarget>
              <button>Target</button>
            </PositionTarget>
            <PositionContent>
              <div
                ref={el => {
                  this._content = el
                }}
              >
                <div>Content</div>
              </div>
            </PositionContent>
          </Position>
        </div>
      )
    }
  }

  const testbed = new Testbed(<App />)

  beforeEach(() => {
    testbed.enableCSSTransitions()
  })

  it('should render', () => {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('should absolutely position content', () => {
    const subject = testbed.render()

    const { content } = findAll(subject)

    expect(content.style.position).to.equal('absolute')
  })

  it('should render `bottom center` placement by default', () => {
    const subject = testbed.render()
    testbed.tick() // portal

    const { position } = findAll(subject)
    expect(position.prop('placement')).to.equal('bottom center')
  })

  it('should render right of target', () => {
    const subject = testbed.render({ placement: 'end' })

    testbed.tick()

    const { targetRect, contentRect } = findAll(subject)

    expect(within(Math.floor(contentRect.left), Math.floor(targetRect.right))).to.be.true
  })

  it('should render top stretched inside of target', () => {
    const subject = testbed.render({ placement: 'top stretch', over: true })

    testbed.tick()

    const { targetRect, contentRect } = findAll(subject)

    expect(within(Math.floor(contentRect.top), Math.floor(targetRect.top), 1)).to.be.true
    expect(within(Math.floor(contentRect.width), Math.floor(targetRect.width), 1)).to.be.true
  })

  it('should render below target', () => {
    const subject = testbed.render({ placement: 'bottom' })

    testbed.tick()

    const { targetRect, contentRect } = findAll(subject)

    expect(within(Math.floor(contentRect.top), Math.floor(targetRect.bottom), 1)).to.be.true
  })

  it('should render left of target', () => {
    const subject = testbed.render({ placement: 'start' })

    testbed.tick()

    const { targetRect, contentRect } = findAll(subject)

    expect(within(Math.floor(contentRect.right), Math.floor(targetRect.left))).to.be.true
  })

  it('should render above target', () => {
    const subject = testbed.render({ placement: 'top' })

    testbed.tick()

    const { targetRect, contentRect } = findAll(subject)

    expect(Math.floor(contentRect.bottom)).to.equal(Math.floor(targetRect.top))
  })

  it('should center vertically', () => {
    const subject = testbed.render({ placement: 'end' })

    testbed.tick()

    const { targetRect, contentRect } = findAll(subject)
    const top = Math.floor(contentRect.top)
    // eslint-disable-next-line no-mixed-operators
    const center = Math.floor(targetRect.top + (targetRect.height / 2 - contentRect.height / 2))

    expect(within(top, center)).to.be.true
  })

  it('should center horizontally', () => {
    const subject = testbed.render({ placement: 'bottom' })

    testbed.tick()

    const { targetRect, contentRect } = findAll(subject)

    const left = Math.floor(contentRect.left)
    const targetCenter = targetRect.width / 2
    const contentCenter = contentRect.width / 2
    const center = Math.floor(targetRect.left + (targetCenter - contentCenter))

    expect(within(left, center)).to.be.true
  })

  describe('with offset props', () => {
    function assertOffset (placement, offset, assertion) {
      it(`should render offset for ${placement}`, done => {
        const subject = testbed.render({ placement, constrain: 'none' })

        testbed.tick()

        const { contentRect } = findAll(subject)
        const { top, left } = contentRect
        const offsetX = offset
        const offsetY = offset

        subject.setProps({ offsetX, offsetY }, () => {
          testbed.tick()
          testbed.defer(() => {
            const { contentRect } = findAll(subject)

            assertion(contentRect, top, left)

            done()
          })
        })
      })
    }

    assertOffset('top', 10, (contentRect, top, left) => {
      expect(within(contentRect.top, top - 10, 1)).to.be.true
      expect(within(contentRect.left, left - 10, 1)).to.be.true
    })

    assertOffset('start', '10px', (contentRect, top, left) => {
      expect(within(contentRect.top, top - 10, 1)).to.be.true
      expect(within(contentRect.left, left - 10, 1)).to.be.true
    })

    assertOffset('end', 10, (contentRect, top, left) => {
      expect(within(contentRect.top, top - 10, 1)).to.be.true
      expect(within(contentRect.left, left + 10, 1)).to.be.true
    })

    assertOffset('bottom', 10, (contentRect, top, left) => {
      expect(within(contentRect.top, top + 10, 1)).to.be.true
      expect(within(contentRect.left, left - 10, 1)).to.be.true
    })
  })
})
