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

import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import '@testing-library/jest-dom'
import { within } from '@instructure/ui-utils'

import { Position } from '../index'

describe('<Position />', () => {
  const parentDefaults = {
    width: 500,
    height: 150,
    padding: 100,
    overflow: 'auto'
  }

  it('should render', () => {
    render(
      <div style={{ padding: '50px' }}>
        <div style={{ ...parentDefaults }}>
          <Position
            constrain="window"
            renderTarget={<button data-testid="target-btn">Target</button>}
          >
            <div data-testid="content">
              <div>Content</div>
            </div>
          </Position>
        </div>
      </div>
    )

    const target = screen.getByTestId('target-btn')
    const content = screen.getByTestId('content')

    expect(target).toBeInTheDocument()
    expect(target).toHaveTextContent('Target')
    expect(content).toBeInTheDocument()
    expect(content).toHaveTextContent('Content')
  })

  it('should absolutely position content', () => {
    render(
      <div style={{ padding: '50px' }}>
        <div style={{ ...parentDefaults }}>
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

    const content = screen.getByTestId('content')
    const style = window.getComputedStyle(content)

    expect(style.position).toBe('absolute')
  })

  it('should render right of target', async () => {
    const onPositionChanged = vi.fn()
    render(
      <div style={{ padding: '50px' }}>
        <div style={{ ...parentDefaults }}>
          <Position
            placement="end"
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

    const target = screen.getByTestId('target')
    const content = screen.getByTestId('content')

    await waitFor(() => {
      expect(onPositionChanged).toHaveBeenCalled()
    })

    const targetRect = target.getBoundingClientRect()
    const contentRect = content.getBoundingClientRect()

    expect(
      within(Math.floor(contentRect.left), Math.floor(targetRect.right))
    ).toBe(true)
  })

  it('should render below target', async () => {
    const onPositionChanged = vi.fn()
    render(
      <div style={{ padding: '50px' }}>
        <div style={{ ...parentDefaults }}>
          <Position
            placement="bottom"
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

    const target = screen.getByTestId('target')
    const content = screen.getByTestId('content')

    await waitFor(() => {
      expect(onPositionChanged).toHaveBeenCalled()
    })

    const targetRect = target.getBoundingClientRect()
    const contentRect = content.getBoundingClientRect()

    expect(
      within(Math.floor(contentRect.top), Math.floor(targetRect.bottom), 1)
    ).toBe(true)
  })

  it('should render left of target', async () => {
    const onPositionChanged = vi.fn()
    render(
      <div style={{ padding: '50px' }}>
        <div style={{ ...parentDefaults }}>
          <Position
            placement="start"
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

    const target = screen.getByTestId('target')
    const content = screen.getByTestId('content')

    await waitFor(() => {
      expect(onPositionChanged).toHaveBeenCalled()
    })

    const targetRect = target.getBoundingClientRect()
    const contentRect = content.getBoundingClientRect()

    expect(
      within(Math.floor(contentRect.right), Math.floor(targetRect.left))
    ).toBe(true)
  })

  it('should render above target', async () => {
    const onPositionChanged = vi.fn()
    render(
      <div style={{ padding: '50px' }}>
        <div style={{ ...parentDefaults }}>
          <Position
            placement="top"
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

    const target = screen.getByTestId('target')
    const content = screen.getByTestId('content')

    await waitFor(() => {
      expect(onPositionChanged).toHaveBeenCalled()
    })

    const targetRect = target.getBoundingClientRect()
    const contentRect = content.getBoundingClientRect()

    expect(Math.floor(contentRect.bottom)).toEqual(Math.floor(targetRect.top))
  })

  it('should center vertically', async () => {
    const onPositionChanged = vi.fn()
    render(
      <div style={{ padding: '50px' }}>
        <div style={{ ...parentDefaults }}>
          <Position
            placement="end"
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

    const target = screen.getByTestId('target')
    const content = screen.getByTestId('content')

    await waitFor(() => {
      expect(onPositionChanged).toHaveBeenCalled()
    })

    const targetRect = target.getBoundingClientRect()
    const contentRect = content.getBoundingClientRect()

    const top = Math.floor(contentRect.top)
    const center = Math.floor(
      targetRect.top + (targetRect.height / 2 - contentRect.height / 2)
    )

    expect(within(top, center)).toBe(true)
  })

  it('should center horizontally', async () => {
    const onPositionChanged = vi.fn()
    render(
      <div style={{ padding: '50px' }}>
        <div style={{ ...parentDefaults }}>
          <Position
            placement="bottom"
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

    const target = screen.getByTestId('target')
    const content = screen.getByTestId('content')

    await waitFor(() => {
      expect(onPositionChanged).toHaveBeenCalled()
    })

    const targetRect = target.getBoundingClientRect()
    const contentRect = content.getBoundingClientRect()

    const left = Math.floor(contentRect.left)
    const targetCenter = targetRect.width / 2
    const contentCenter = contentRect.width / 2
    const center = Math.floor(targetRect.left + (targetCenter - contentCenter))

    expect(within(left, center)).toBe(true)
  })

  describe('when constrained to scroll-parent', () => {
    it('should re-position below target', async () => {
      const onPositionChanged = vi.fn()

      render(
        <div style={{ padding: '50px' }}>
          <div data-testid="mountNode">mount</div>
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
              mountNode={() => document.getElementById('mountNode')}
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

      const target = screen.getByTestId('target')
      const content = screen.getByTestId('content')

      await waitFor(() => {
        expect(onPositionChanged).toHaveBeenCalled()
      })

      const targetRect = target.getBoundingClientRect()
      const contentRect = content.getBoundingClientRect()

      expect(
        within(Math.floor(contentRect.top), Math.floor(targetRect.bottom), 1)
      ).toBe(true)
    })

    it('should re-position above target', async () => {
      const onPositionChanged = vi.fn()

      render(
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
              mountNode={() => document.getElementById('mountNode')}
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

      const target = screen.getByTestId('target')
      const content = screen.getByTestId('content')

      await waitFor(() => {
        expect(onPositionChanged).toHaveBeenCalled()
      })

      const targetRect = target.getBoundingClientRect()
      const contentRect = content.getBoundingClientRect()

      expect(
        within(Math.floor(contentRect.bottom), Math.floor(targetRect.top), 1)
      ).toBe(true)
    })

    it('should re-position after target', async () => {
      const onPositionChanged = vi.fn()

      render(
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
              mountNode={() => document.getElementById('mountNode')}
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

      const target = screen.getByTestId('target')
      const content = screen.getByTestId('content')

      await waitFor(() => {
        expect(onPositionChanged).toHaveBeenCalled()
      })

      const targetRect = target.getBoundingClientRect()
      const contentRect = content.getBoundingClientRect()

      expect(
        within(Math.floor(contentRect.left), Math.floor(targetRect.right), 1)
      ).toBe(true)
    })

    it('should re-position before target', async () => {
      const onPositionChanged = vi.fn()

      render(
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
              mountNode={() => document.getElementById('mountNode')}
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

      const target = screen.getByTestId('target')
      const content = screen.getByTestId('content')

      await waitFor(() => {
        expect(onPositionChanged).toHaveBeenCalled()
      })

      const targetRect = target.getBoundingClientRect()
      const contentRect = content.getBoundingClientRect()

      expect(
        within(Math.floor(contentRect.right), Math.floor(targetRect.left), 1)
      ).toBe(true)
    })
  })

  describe('when the documentElement is offset', () => {
    beforeEach(() => {
      document.documentElement.style.position = 'fixed'
      document.documentElement.style.top = '-100px'
    })

    afterEach(() => {
      document.documentElement.style.position = ''
      document.documentElement.style.top = ''
    })

    it('should position correctly', async () => {
      render(
        <div style={{ padding: '100px' }}>
          <Position
            placement="bottom"
            renderTarget={<button data-testid="target">Target</button>}
          >
            <div data-testid="content">
              <div>Content</div>
            </div>
          </Position>
        </div>
      )

      const target = screen.getByTestId('target')
      const content = screen.getByTestId('content')

      await waitFor(() => {
        expect(content.getBoundingClientRect().top).toEqual(
          target.getBoundingClientRect().bottom
        )
      })
    })

    it('should position correctly with mountNode', async () => {
      render(
        <div style={{ padding: '100px' }}>
          <div data-testid="mountNode">mount</div>
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
              mountNode={() => document.getElementById('mountNode')}
              renderTarget={<button data-testid="target">Target</button>}
            >
              <div data-testid="content">
                <div>Content</div>
              </div>
            </Position>
          </div>
        </div>
      )

      const target = screen.getByTestId('target')
      const content = screen.getByTestId('content')

      await waitFor(() => {
        expect(content.getBoundingClientRect().top).toEqual(
          target.getBoundingClientRect().bottom
        )
      })
    })
  })

  describe('containerDisplay prop', () => {
    it('should apply "inline-block"', () => {
      const { container } = render(
        <div style={{ padding: '50px' }}>
          <div style={{ ...parentDefaults }}>
            <Position
              constrain="window"
              renderTarget={<button data-testid="target">Target</button>}
              containerDisplay="inline-block"
            >
              <div data-testid="content">
                <div>Content</div>
              </div>
            </Position>
          </div>
        </div>
      )

      const position = container.querySelector("span[class$='-position']")
      const style = getComputedStyle(position!)

      expect(style.display).toEqual('inline-block')
    })

    it('should apply "block"', () => {
      const { container } = render(
        <div style={{ padding: '50px' }}>
          <div style={{ ...parentDefaults }}>
            <Position
              constrain="window"
              renderTarget={<button data-testid="target">Target</button>}
              containerDisplay="block"
            >
              <div data-testid="content">
                <div>Content</div>
              </div>
            </Position>
          </div>
        </div>
      )

      const position = container.querySelector("span[class$='-position']")
      const style = getComputedStyle(position!)

      expect(style.display).toEqual('block')
    })
  })
})
