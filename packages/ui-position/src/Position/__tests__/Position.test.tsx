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
import { expect, mount, wait, stub } from '@instructure/ui-test-utils'
import { within } from '@instructure/ui-utils'

import { Position } from '../index'
import { PositionLocator } from '../PositionLocator'

describe('<Position />', async () => {
  const parentDefaults = {
    parentWidth: 500,
    parentHeight: 150,
    parentPadding: 100,
    paddingOverflow: 'auto'
  }

  beforeEach(async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    stub(console, 'warn') // suppress experimental warnings
  })

  it('should render', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div style={{ padding: '50px' }}>
        {/* @ts-expect-error ts-migrate(2559) FIXME: Type '{ parentWidth: number; parentHeight: number;... Remove this comment to see the full error message */}
        <div style={{ ...parentDefaults }}>
          <Position constrain="window" renderTarget={<button>Target</button>}>
            <div id="content">
              <div>Content</div>
            </div>
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
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div style={{ padding: '50px' }}>
        {/* @ts-expect-error ts-migrate(2559) FIXME: Type '{ parentWidth: number; parentHeight: number;... Remove this comment to see the full error message */}
        <div style={{ ...parentDefaults }}>
          <Position constrain="window" renderTarget={<button>Target</button>}>
            <div id="content">
              <div>Content</div>
            </div>
          </Position>
        </div>
      </div>
    )

    const position = await PositionLocator.find()
    const content = await position.findContent(':contains(Content)')
    expect(content.getDOMNode().style.position).to.equal('absolute')
  })

  it('should render right of target', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const onPositionChanged = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div style={{ padding: '50px' }}>
        {/* @ts-expect-error ts-migrate(2559) FIXME: Type '{ parentWidth: number; parentHeight: number;... Remove this comment to see the full error message */}
        <div style={{ ...parentDefaults }}>
          <Position
            placement="end"
            onPositionChanged={onPositionChanged}
            renderTarget={<button>Target</button>}
          >
            <div id="content">
              <div>Content</div>
            </div>
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

    expect(
      within(Math.floor(contentRect.left), Math.floor(targetRect.right))
    ).to.be.true()
  })

  it('should render top stretched inside of target', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const onPositionChanged = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div style={{ padding: '50px' }}>
        {/* @ts-expect-error ts-migrate(2559) FIXME: Type '{ parentWidth: number; parentHeight: number;... Remove this comment to see the full error message */}
        <div style={{ ...parentDefaults }}>
          <Position
            placement="top stretch"
            shouldPositionOverTarget
            onPositionChanged={onPositionChanged}
            renderTarget={<button>Target</button>}
          >
            <div id="content">
              <div>Content</div>
            </div>
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

    expect(
      within(Math.floor(contentRect.top), Math.floor(targetRect.top), 1)
    ).to.be.true()
    expect(
      within(Math.floor(contentRect.width), Math.floor(targetRect.width), 1)
    ).to.be.true()
  })

  it('should render below target', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const onPositionChanged = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div style={{ padding: '50px' }}>
        {/* @ts-expect-error ts-migrate(2559) FIXME: Type '{ parentWidth: number; parentHeight: number;... Remove this comment to see the full error message */}
        <div style={{ ...parentDefaults }}>
          <Position
            placement="bottom"
            onPositionChanged={onPositionChanged}
            renderTarget={<button>Target</button>}
          >
            <div id="content">
              <div>Content</div>
            </div>
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

    expect(
      within(Math.floor(contentRect.top), Math.floor(targetRect.bottom), 1)
    ).to.be.true()
  })

  it('should render left of target', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const onPositionChanged = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div style={{ padding: '50px' }}>
        {/* @ts-expect-error ts-migrate(2559) FIXME: Type '{ parentWidth: number; parentHeight: number;... Remove this comment to see the full error message */}
        <div style={{ ...parentDefaults }}>
          <Position
            placement="start"
            onPositionChanged={onPositionChanged}
            renderTarget={<button>Target</button>}
          >
            <div id="content">
              <div>Content</div>
            </div>
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

    expect(
      within(Math.floor(contentRect.right), Math.floor(targetRect.left))
    ).to.be.true()
  })

  it('should render above target', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const onPositionChanged = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div style={{ padding: '50px' }}>
        {/* @ts-expect-error ts-migrate(2559) FIXME: Type '{ parentWidth: number; parentHeight: number;... Remove this comment to see the full error message */}
        <div style={{ ...parentDefaults }}>
          <Position
            placement="top"
            onPositionChanged={onPositionChanged}
            renderTarget={<button>Target</button>}
          >
            <div id="content">
              <div>Content</div>
            </div>
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
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const onPositionChanged = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div style={{ padding: '50px' }}>
        {/* @ts-expect-error ts-migrate(2559) FIXME: Type '{ parentWidth: number; parentHeight: number;... Remove this comment to see the full error message */}
        <div style={{ ...parentDefaults }}>
          <Position
            placement="end"
            onPositionChanged={onPositionChanged}
            renderTarget={<button>Target</button>}
          >
            <div id="content">
              <div>Content</div>
            </div>
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
    const center = Math.floor(
      targetRect.top + (targetRect.height / 2 - contentRect.height / 2)
    )

    expect(within(top, center)).to.be.true()
  })

  it('should center horizontally', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const onPositionChanged = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div style={{ padding: '50px' }}>
        {/* @ts-expect-error ts-migrate(2559) FIXME: Type '{ parentWidth: number; parentHeight: number;... Remove this comment to see the full error message */}
        <div style={{ ...parentDefaults }}>
          <Position
            placement="bottom"
            onPositionChanged={onPositionChanged}
            renderTarget={<button>Target</button>}
          >
            <div id="content">
              <div>Content</div>
            </div>
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
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'placement' implicitly has an 'any' type... Remove this comment to see the full error message
    function assertOffset(placement, offset, assertion) {
      it(`should render offset for ${placement}`, async () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
        const onPositionChanged = stub()
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        const subject = await mount(
          <Position
            constrain="none"
            placement={placement}
            onPositionChanged={onPositionChanged}
            renderTarget={<button>Target</button>}
          >
            <div id="content">
              <div>Content</div>
            </div>
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

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'contentRect' implicitly has an 'any' ty... Remove this comment to see the full error message
    assertOffset('top', 10, (contentRect, top, left) => {
      expect(within(contentRect.top, top - 10, 1)).to.be.true()
      expect(within(contentRect.left, left - 10, 1)).to.be.true()
    })

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'contentRect' implicitly has an 'any' ty... Remove this comment to see the full error message
    assertOffset('start', '10px', (contentRect, top, left) => {
      expect(within(contentRect.top, top - 10, 1)).to.be.true()
      expect(within(contentRect.left, left - 10, 1)).to.be.true()
    })

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'contentRect' implicitly has an 'any' ty... Remove this comment to see the full error message
    assertOffset('end', 10, (contentRect, top, left) => {
      expect(within(contentRect.top, top - 10, 1)).to.be.true()
      expect(within(contentRect.left, left + 10, 1)).to.be.true()
    })

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'contentRect' implicitly has an 'any' ty... Remove this comment to see the full error message
    assertOffset('bottom', 10, (contentRect, top, left) => {
      expect(within(contentRect.top, top + 10, 1)).to.be.true()
      expect(within(contentRect.left, left - 10, 1)).to.be.true()
    })
  })

  describe('when constrained to scroll-parent', async () => {
    it('should re-position below target', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onPositionChanged = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <div style={{ padding: '50px' }}>
          <div id="mountNode">mount</div>
          <div
            style={{
              width: '50px',
              height: '50px',
              overflow: 'scroll',
              padding: '0 50px 50px 50px'
            }}
          >
            <Position
              placement="top"
              constrain="scroll-parent"
              // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
              mountNode={(el) => document.getElementById('mountNode')}
              onPositionChanged={onPositionChanged}
              renderTarget={<button>Target</button>}
            >
              <div id="content">
                <div>Content</div>
              </div>
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

      expect(
        within(Math.floor(contentRect.top), Math.floor(targetRect.bottom), 1)
      ).to.be.true()
    })

    it('should re-position above target', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onPositionChanged = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <div style={{ padding: '50px' }}>
          <div id="mountNode">mount</div>
          <div
            style={{
              width: '50px',
              height: '0px',
              overflow: 'scroll',
              padding: '50px 50px 0 50px'
            }}
          >
            <Position
              placement="bottom"
              constrain="scroll-parent"
              // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
              mountNode={(el) => document.getElementById('mountNode')}
              onPositionChanged={onPositionChanged}
              renderTarget={<button>Target</button>}
            >
              <div id="content">
                <div>Content</div>
              </div>
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

      expect(
        within(Math.floor(contentRect.bottom), Math.floor(targetRect.top), 1)
      ).to.be.true()
    })

    it('should re-position after target', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onPositionChanged = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <div style={{ padding: '50px' }}>
          <div id="mountNode">mount</div>
          <div
            style={{
              width: '50px',
              height: '50px',
              overflow: 'scroll',
              padding: '50px 80px 50px 0'
            }}
          >
            <Position
              placement="start"
              constrain="scroll-parent"
              // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
              mountNode={(el) => document.getElementById('mountNode')}
              onPositionChanged={onPositionChanged}
              renderTarget={<button>Target</button>}
            >
              <div id="content">
                <div>Content</div>
              </div>
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

      expect(
        within(Math.floor(contentRect.left), Math.floor(targetRect.right), 1)
      ).to.be.true()
    })

    it('should re-position before target', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onPositionChanged = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <div style={{ padding: '50px' }}>
          <div id="mountNode">mount</div>
          <div
            style={{
              width: '50px',
              height: '50px',
              overflow: 'scroll',
              padding: '50px 0px 50px 80px'
            }}
          >
            <Position
              placement="end"
              constrain="scroll-parent"
              // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
              mountNode={(el) => document.getElementById('mountNode')}
              onPositionChanged={onPositionChanged}
              renderTarget={<button>Target</button>}
            >
              <div id="content">
                <div>Content</div>
              </div>
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

      expect(
        within(Math.floor(contentRect.right), Math.floor(targetRect.left), 1)
      ).to.be.true()
    })
  })

  describe('when the documentElement is offset', async () => {
    beforeEach(async () => {
      document.documentElement.style.position = 'fixed'
      document.documentElement.style.top = '-100px'
    })

    it('should position correctly', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <div style={{ padding: '100px' }}>
          <Position placement="bottom" renderTarget={<button>Target</button>}>
            <div id="content">
              <div>Content</div>
            </div>
          </Position>
        </div>
      )

      const position = await PositionLocator.find()
      const target = await position.findTarget(':contains(Target)')
      const content = await position.findContent(':contains(Content)')

      await wait(() => {
        expect(content.getBoundingClientRect().top).to.equal(
          target.getBoundingClientRect().bottom
        )
      })
    })

    it('should position correctly with mountNode', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <div style={{ padding: '100px' }}>
          <div id="mountNode">mount</div>
          <div
            style={{
              width: '50px',
              height: '50px',
              overflow: 'scroll',
              padding: '50px'
            }}
          >
            <Position
              placement="bottom"
              constrain="scroll-parent"
              // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
              mountNode={(el) => document.getElementById('mountNode')}
              renderTarget={<button>Target</button>}
            >
              <div id="content">
                <div>Content</div>
              </div>
            </Position>
          </div>
        </div>
      )

      const position = await PositionLocator.find()
      const target = await position.findTarget(':contains(Target)')
      const content = await position.findContent(':contains(Content)')

      await wait(() => {
        expect(content.getBoundingClientRect().top).to.equal(
          target.getBoundingClientRect().bottom
        )
      })
    })
  })
})
