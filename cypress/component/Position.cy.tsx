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

import 'cypress-real-events'

import '../support/component'
import { Position } from '@instructure/ui'
import { within } from '@instructure/ui-utils'

const parentDefaults = {
  width: 500,
  height: 150,
  padding: 100,
  overflow: 'auto'
}

describe('<Position/>', () => {
  it('should render top stretched inside of target', async () => {
    const onPositionChanged = cy.spy()
    cy.mount(
      <div style={{ padding: '50px' }}>
        <div style={{ ...parentDefaults }}>
          <Position
            placement="top stretch"
            shouldPositionOverTarget
            onPositionChanged={onPositionChanged}
            renderTarget={<button data-testid="target">Target</button>}
          >
            <div data-testid="content">
              <div>Content</div>
            </div>
          </Position>
        </div>
      </div>
    )

    cy.get('[data-testid="target"]').then(($target) => {
      const targetRect = $target[0].getBoundingClientRect()

      cy.get('[data-testid="content"]').then(($content) => {
        const contentRect = $content[0].getBoundingClientRect()

        cy.wrap(onPositionChanged).should('have.been.called')

        expect(
          within(Math.floor(contentRect.top), Math.floor(targetRect.top), 1)
        ).to.equal(true)
        expect(
          within(Math.floor(contentRect.width), Math.floor(targetRect.width), 1)
        ).to.equal(true)
      })
    })
  })

  it('should be <span> default when containerDisplay prop unset', () => {
    cy.mount(
      <div style={{ padding: '50px' }}>
        <div data-testid="positionContainer" style={{ ...parentDefaults }}>
          <Position
            constrain="window"
            renderTarget={<button data-testid="target">Target</button>}
          >
            <div data-testid="content">
              <div>Content</div>
            </div>
          </Position>
        </div>
      </div>
    )

    cy.get("span[class$='-position']").then(($span) => {
      const style = $span.css('display')

      expect(style).to.equal('inline')
    })
  })

  describe('with offset props', () => {
    function assertOffset(
      placement: any,
      offset: number | string,
      assertion: (newContentRect: DOMRect, top: number, left: number) => void
    ) {
      it(`should render offset for ${placement}`, async () => {
        const onPositionChanged = cy.spy()

        cy.mount(
          <Position
            constrain="none"
            placement={placement}
            onPositionChanged={onPositionChanged}
            renderTarget={<button data-testid="target">Target</button>}
          >
            <div data-testid="content">
              <div>Content</div>
            </div>
          </Position>
        )

        cy.get('[data-testid="content"]').then(($content) => {
          const contentRect = $content[0].getBoundingClientRect()
          const { top, left } = contentRect
          cy.wrap(onPositionChanged).should('have.been.called')

          // Set new offset props
          cy.mount(
            <Position
              offsetX={offset}
              offsetY={offset}
              constrain="none"
              placement={placement}
              onPositionChanged={onPositionChanged}
              renderTarget={<button data-testid="target">Target</button>}
            >
              <div data-testid="content-updated">
                <div>Content</div>
              </div>
            </Position>
          )

          cy.wrap(onPositionChanged).should('have.callCount', 2)

          cy.get('[data-testid="content-updated"]').then(($updatedContent) => {
            const newContentRect = $updatedContent[0].getBoundingClientRect()

            assertion(newContentRect, top, left)
          })
        })
      })
    }

    assertOffset('top', 10, (contentRect, top, left) => {
      expect(within(contentRect.top, top - 10, 1)).to.equal(true)
      expect(within(contentRect.left, left - 10, 1)).to.equal(true)
    })

    assertOffset('start', '10px', (contentRect, top, left) => {
      expect(within(contentRect.top, top - 10, 1)).to.equal(true)
      expect(within(contentRect.left, left - 10, 1)).to.equal(true)
    })

    assertOffset('end', 10, (contentRect, top, left) => {
      expect(within(contentRect.top, top - 10, 1)).to.equal(true)
      expect(within(contentRect.left, left + 10, 1)).to.equal(true)
    })

    assertOffset('bottom', 10, (contentRect, top, left) => {
      expect(within(contentRect.top, top + 10, 1)).to.equal(true)
      expect(within(contentRect.left, left - 10, 1)).to.equal(true)
    })
  })
})
