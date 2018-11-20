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

import React from 'react'

import { expect, mount, wait, stub } from '@instructure/ui-test-utils'
import within from '@instructure/ui-utils/lib/within'

import Position, { PositionTarget, PositionContent } from '../index'
import PositionLocator from '../locator'

describe('<Position />', async () => {
  const parentDefaults = {
    parentWidth: 500,
    parentHeight: 150,
    parentPadding: 100,
    paddingOverflow: 'auto'
  }

  it('should render', async () => {
    await mount(
      <div style={{padding: '50px'}}>
        <div style={{...parentDefaults}}>
          <Position constrain="window">
            <PositionTarget>
              <button>Target</button>
            </PositionTarget>
            <PositionContent>
              <div id="content">
                <div>Content</div>
              </div>
            </PositionContent>
          </Position>
        </div>
      </div>
    )

    const position = await PositionLocator.find()
    const target = await position.findTarget(':contains(Target)')
    const content = await position.findContent(':contains(Content)')

    expect(target).to.exist()
    expect(content).to.exist()
  })

  it('should absolutely position content', async () => {
    await mount(
      <div style={{padding: '50px'}}>
        <div style={{...parentDefaults}}>
          <Position constrain="window">
            <PositionTarget>
              <button>Target</button>
            </PositionTarget>
            <PositionContent>
              <div id="content">
                <div>Content</div>
              </div>
            </PositionContent>
          </Position>
        </div>
      </div>
    )

    const position = await PositionLocator.find()
    const content = await position.findContent(':contains(Content)')
    expect(content.getDOMNode().style.position).to.equal('absolute')
  })

  it('should render right of target', async () => {
    const onPositionChanged = stub()
    await mount(
      <div style={{padding: '50px'}}>
        <div style={{...parentDefaults}}>
          <Position placement="end" onPositionChanged={onPositionChanged}>
            <PositionTarget>
              <button>Target</button>
            </PositionTarget>
            <PositionContent>
              <div id="content">
                <div>Content</div>
              </div>
            </PositionContent>
          </Position>
        </div>
      </div>
    )

    const position = await PositionLocator.find()
    const target = await position.findTarget(':contains(Target)')
    const content = await position.findContent(':contains(Content)')
    // wait for positioning
    await wait(() => {
      expect(onPositionChanged).to.have.been.called()
    })

    const targetRect = target.getBoundingClientRect()
    const contentRect = content.getBoundingClientRect()

    expect(within(Math.floor(contentRect.left), Math.floor(targetRect.right))).to.be.true()
  })

  it('should render top stretched inside of target', async () => {
    const onPositionChanged = stub()
    await mount(
      <div style={{padding: '50px'}}>
        <div style={{...parentDefaults}}>
          <Position placement="top stretch" over={true} onPositionChanged={onPositionChanged}>
            <PositionTarget>
              <button>Target</button>
            </PositionTarget>
            <PositionContent>
              <div id="content">
                <div>Content</div>
              </div>
            </PositionContent>
          </Position>
        </div>
      </div>
    )

    const position = await PositionLocator.find()
    const target = await position.findTarget(':contains(Target)')
    const content = await position.findContent(':contains(Content)')
    // wait for positioning
    await wait(() => {
      expect(onPositionChanged).to.have.been.called()
    })

    const targetRect = target.getBoundingClientRect()
    const contentRect = content.getBoundingClientRect()

    expect(within(Math.floor(contentRect.top), Math.floor(targetRect.top), 1)).to.be.true()
    expect(within(Math.floor(contentRect.width), Math.floor(targetRect.width), 1)).to.be.true()
  })

  it('should render below target', async () => {
    const onPositionChanged = stub()
    await mount(
      <div style={{padding: '50px'}}>
        <div style={{...parentDefaults}}>
          <Position placement="bottom" onPositionChanged={onPositionChanged}>
            <PositionTarget>
              <button>Target</button>
            </PositionTarget>
            <PositionContent>
              <div id="content">
                <div>Content</div>
              </div>
            </PositionContent>
          </Position>
        </div>
      </div>
    )

    const position = await PositionLocator.find()
    const target = await position.findTarget(':contains(Target)')
    const content = await position.findContent(':contains(Content)')
    // wait for positioning
    await wait(() => {
      expect(onPositionChanged).to.have.been.called()
    })

    const targetRect = target.getBoundingClientRect()
    const contentRect = content.getBoundingClientRect()

    expect(within(Math.floor(contentRect.top), Math.floor(targetRect.bottom), 1)).to.be.true()
  })

  it('should render left of target', async () => {
    const onPositionChanged = stub()
    await mount(
      <div style={{padding: '50px'}}>
        <div style={{...parentDefaults}}>
          <Position placement="start" onPositionChanged={onPositionChanged}>
            <PositionTarget>
              <button>Target</button>
            </PositionTarget>
            <PositionContent>
              <div id="content">
                <div>Content</div>
              </div>
            </PositionContent>
          </Position>
        </div>
      </div>
    )

    const position = await PositionLocator.find()
    const target = await position.findTarget(':contains(Target)')
    const content = await position.findContent(':contains(Content)')
    // wait for positioning
    await wait(() => {
      expect(onPositionChanged).to.have.been.called()
    })

    const targetRect = target.getBoundingClientRect()
    const contentRect = content.getBoundingClientRect()

    expect(within(Math.floor(contentRect.right), Math.floor(targetRect.left))).to.be.true()
  })

  it('should render above target', async () => {
    const onPositionChanged = stub()
    await mount(
      <div style={{padding: '50px'}}>
        <div style={{...parentDefaults}}>
          <Position placement="top" onPositionChanged={onPositionChanged}>
            <PositionTarget>
              <button>Target</button>
            </PositionTarget>
            <PositionContent>
              <div id="content">
                <div>Content</div>
              </div>
            </PositionContent>
          </Position>
        </div>
      </div>
    )

    const position = await PositionLocator.find()
    const target = await position.findTarget(':contains(Target)')
    const content = await position.findContent(':contains(Content)')
    // wait for positioning
    await wait(() => {
      expect(onPositionChanged).to.have.been.called()
    })

    const targetRect = target.getBoundingClientRect()
    const contentRect = content.getBoundingClientRect()

    expect(Math.floor(contentRect.bottom)).to.equal(Math.floor(targetRect.top))
  })

  it('should center vertically', async () => {
    const onPositionChanged = stub()
    await mount(
      <div style={{padding: '50px'}}>
        <div style={{...parentDefaults}}>
          <Position placement="end" onPositionChanged={onPositionChanged}>
            <PositionTarget>
              <button>Target</button>
            </PositionTarget>
            <PositionContent>
              <div id="content">
                <div>Content</div>
              </div>
            </PositionContent>
          </Position>
        </div>
      </div>
    )

    const position = await PositionLocator.find()
    const target = await position.findTarget(':contains(Target)')
    const content = await position.findContent(':contains(Content)')
    // wait for positioning
    await wait(() => {
      expect(onPositionChanged).to.have.been.called()
    })

    const targetRect = target.getBoundingClientRect()
    const contentRect = content.getBoundingClientRect()

    const top = Math.floor(contentRect.top)
    const center = Math.floor(targetRect.top + (targetRect.height / 2 - contentRect.height / 2))

    expect(within(top, center)).to.be.true()
  })

  it('should center horizontally', async () => {
    const onPositionChanged = stub()
    await mount(
      <div style={{padding: '50px'}}>
        <div style={{...parentDefaults}}>
          <Position placement="bottom" onPositionChanged={onPositionChanged}>
            <PositionTarget>
              <button>Target</button>
            </PositionTarget>
            <PositionContent>
              <div id="content">
                <div>Content</div>
              </div>
            </PositionContent>
          </Position>
        </div>
      </div>
    )

    const position = await PositionLocator.find()
    const target = await position.findTarget(':contains(Target)')
    const content = await position.findContent(':contains(Content)')
    // wait for positioning
    await wait(() => {
      expect(onPositionChanged).to.have.been.called()
    })

    const targetRect = target.getBoundingClientRect()
    const contentRect = content.getBoundingClientRect()

    const left = Math.floor(contentRect.left)
    const targetCenter = targetRect.width / 2
    const contentCenter = contentRect.width / 2
    const center = Math.floor(targetRect.left + (targetCenter - contentCenter))

    expect(within(left, center)).to.be.true()
  })

  describe('with offset props', () => {
    function assertOffset (placement, offset, assertion) {
      it(`should render offset for ${placement}`, async () => {
        const onPositionChanged = stub()
        const subject = await mount (
          <Position
            constrain="none"
            placement={placement}
            onPositionChanged={onPositionChanged}
          >
            <PositionTarget>
              <button>Target</button>
            </PositionTarget>
            <PositionContent>
              <div id="content">
                <div>Content</div>
              </div>
            </PositionContent>
          </Position>
        )

        const position = await PositionLocator.find()
        const content = await position.findContent(':contains(Content)')

        await wait(() => {
          expect(onPositionChanged).to.have.been.called()
        })

        const contentRect = content.getBoundingClientRect()
        const { top, left } = contentRect
        const offsetX = offset
        const offsetY = offset

        await subject.setProps({ offsetX, offsetY })
        await wait(() => {
          expect(onPositionChanged).to.have.been.called()
        })

        const newContentRect = content.getBoundingClientRect()
        assertion(newContentRect, top, left)
      })
    }

    assertOffset('top', 10, (contentRect, top, left) => {
      expect(within(contentRect.top, top - 10, 1)).to.be.true()
      expect(within(contentRect.left, left - 10, 1)).to.be.true()
    })

    assertOffset('start', '10px', (contentRect, top, left) => {
      expect(within(contentRect.top, top - 10, 1)).to.be.true()
      expect(within(contentRect.left, left - 10, 1)).to.be.true()
    })

    assertOffset('end', 10, (contentRect, top, left) => {
      expect(within(contentRect.top, top - 10, 1)).to.be.true()
      expect(within(contentRect.left, left + 10, 1)).to.be.true()
    })

    assertOffset('bottom', 10, (contentRect, top, left) => {
      expect(within(contentRect.top, top + 10, 1)).to.be.true()
      expect(within(contentRect.left, left - 10, 1)).to.be.true()
    })
  })

  describe('when constrained to scroll-parent', async () => {
    it('should re-position below target', async () => {
      const onPositionChanged = stub()
      await mount(
        <div style={{padding: '50px'}}>
          <div id="mountNode">mount</div>
          <div style={{width: '50px', height: '50px', overflow: 'scroll', padding: '0 50px 50px 50px'}}>
            <Position
              placement="top"
              constrain="scroll-parent"
              mountNode={el => document.getElementById('mountNode')}
              onPositionChanged={onPositionChanged}
            >
              <PositionTarget>
                <button>Target</button>
              </PositionTarget>
              <PositionContent>
                <div id="content">
                  <div>Content</div>
                </div>
              </PositionContent>
            </Position>
          </div>
        </div>
      )

      const position = await PositionLocator.find()
      const target = await position.findTarget(':contains(Target)')
      const content = await position.findContent(':contains(Content)')
      // wait for positioning
      await wait(() => {
        expect(onPositionChanged).to.have.been.called()
      })

      const targetRect = target.getBoundingClientRect()
      const contentRect = content.getBoundingClientRect()

      expect(within(Math.floor(contentRect.top), Math.floor(targetRect.bottom), 1)).to.be.true()
    })

    it('should re-position above target', async () => {
      const onPositionChanged = stub()
      await mount(
        <div style={{padding: '50px'}}>
          <div id="mountNode">mount</div>
          <div style={{width: '50px', height: '0px', overflow: 'scroll', padding: '50px 50px 0 50px'}}>
            <Position
              placement="bottom"
              constrain="scroll-parent"
              mountNode={el => document.getElementById('mountNode')}
              onPositionChanged={onPositionChanged}
            >
              <PositionTarget>
                <button>Target</button>
              </PositionTarget>
              <PositionContent>
                <div id="content">
                  <div>Content</div>
                </div>
              </PositionContent>
            </Position>
          </div>
        </div>
      )

      const position = await PositionLocator.find()
      const target = await position.findTarget(':contains(Target)')
      const content = await position.findContent(':contains(Content)')
      // wait for positioning
      await wait(() => {
        expect(onPositionChanged).to.have.been.called()
      })

      const targetRect = target.getBoundingClientRect()
      const contentRect = content.getBoundingClientRect()

      expect(within(Math.floor(contentRect.bottom), Math.floor(targetRect.top), 1)).to.be.true()
    })

    it('should re-position after target', async () => {
      const onPositionChanged = stub()
      await mount(
        <div style={{padding: '50px'}}>
          <div id="mountNode">mount</div>
          <div style={{width: '50px', height: '50px', overflow: 'scroll', padding: '50px 80px 50px 0'}}>
            <Position
              placement="start"
              constrain="scroll-parent"
              mountNode={el => document.getElementById('mountNode')}
              onPositionChanged={onPositionChanged}
            >
              <PositionTarget>
                <button>Target</button>
              </PositionTarget>
              <PositionContent>
                <div id="content">
                  <div>Content</div>
                </div>
              </PositionContent>
            </Position>
          </div>
        </div>
      )

      const position = await PositionLocator.find()
      const target = await position.findTarget(':contains(Target)')
      const content = await position.findContent(':contains(Content)')
      // wait for positioning
      await wait(() => {
        expect(onPositionChanged).to.have.been.called()
      })

      const targetRect = target.getBoundingClientRect()
      const contentRect = content.getBoundingClientRect()

      expect(within(Math.floor(contentRect.left), Math.floor(targetRect.right), 1)).to.be.true()
    })

    it('should re-position before target', async () => {
      const onPositionChanged = stub()
      await mount(
        <div style={{padding: '50px'}}>
          <div id="mountNode">mount</div>
          <div style={{width: '50px', height: '50px', overflow: 'scroll', padding: '50px 0px 50px 80px'}}>
            <Position
              placement="end"
              constrain="scroll-parent"
              mountNode={el => document.getElementById('mountNode')}
              onPositionChanged={onPositionChanged}
            >
              <PositionTarget>
                <button>Target</button>
              </PositionTarget>
              <PositionContent>
                <div id="content">
                  <div>Content</div>
                </div>
              </PositionContent>
            </Position>
          </div>
        </div>
      )

      const position = await PositionLocator.find()
      const target = await position.findTarget(':contains(Target)')
      const content = await position.findContent(':contains(Content)')
      // wait for positioning
      await wait(() => {
        expect(onPositionChanged).to.have.been.called()
      })

      const targetRect = target.getBoundingClientRect()
      const contentRect = content.getBoundingClientRect()

      expect(within(Math.floor(contentRect.right), Math.floor(targetRect.left), 1)).to.be.true()
    })
  })
})
