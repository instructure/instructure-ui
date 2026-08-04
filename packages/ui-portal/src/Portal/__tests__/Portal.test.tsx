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

import { describe, it, expect, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { Portal } from '../index.js'

describe(`<Portal />`, () => {
  it('should render', async () => {
    await render(<Portal open>Hello World</Portal>)
    const portal = page.getByText('Hello World').element()

    expect(portal).toBeInTheDocument()
  })

  it('should be accessible', async () => {
    const { container } = await render(
      <Portal open data-testid="portal">
        Hello World
      </Portal>
    )
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  it('should support onOpen prop', async () => {
    const onOpen = vi.fn()
    await render(
      <Portal open onOpen={onOpen} data-testid="portal">
        Hello World
      </Portal>
    )
    const portal = page.getByTestId('portal').element()

    expect(onOpen).toHaveBeenCalledWith(portal)
  })

  it('should support onClose prop', async () => {
    const onClose = vi.fn()
    const { rerender } = await render(
      <Portal open onClose={onClose}>
        Hello World
      </Portal>
    )

    expect(onClose).not.toHaveBeenCalled()

    await rerender(
      <Portal open={false} onClose={onClose}>
        Hello World
      </Portal>
    )

    expect(onClose).toHaveBeenCalled()
  })

  it('should add a dir attribute to the root DOM node', async () => {
    const onOpen = vi.fn()
    await render(
      <Portal open onOpen={onOpen} data-testid="portal">
        Hello World
      </Portal>
    )
    const portal = page.getByTestId('portal').element()

    expect(portal).toHaveAttribute('dir', 'ltr')
  })

  it('should not render if children are empty', async () => {
    await render(<Portal open data-testid="portal" />)
    const portal = page.getByTestId('portal').query()

    expect(portal).not.toBeInTheDocument()
  })

  describe('without a mountNode prop', () => {
    it('should render nothing when closed', async () => {
      await render(<Portal>Hello World</Portal>)
      const portal = page.getByTestId('portal').query()

      expect(portal).not.toBeInTheDocument()
    })

    it('should render children and have a node with a parent when open', async () => {
      const onKeyDown = vi.fn()
      await render(
        <Portal open data-testid="portal">
          <button onKeyDown={onKeyDown}>Hello World</button>
        </Portal>
      )
      const portal = page.getByTestId('portal').element()
      const button = page.getByRole('button', { name: 'Hello World' }).element()

      button.focus()
      await userEvent.keyboard('{Enter}')

      await vi.waitFor(() => {
        expect(onKeyDown).toHaveBeenCalled()
      })

      expect(portal).toContainElement(button)
    })
  })

  describe('when a mountNode prop is provided', () => {
    it('should render nothing when closed', async () => {
      await render(
        <div>
          <Portal
            mountNode={() => document.getElementById('portal-mount-node')!}
            data-testid="portal"
          >
            Hello World
          </Portal>
          <div id="portal-mount-node" />
        </div>
      )
      const portal = page.getByTestId('portal').query()

      expect(portal).not.toBeInTheDocument()
    })

    it('should render children and have a node with a parent when open', async () => {
      const mountNode = document.createElement('div')
      mountNode.setAttribute('id', 'portal-mount-node')
      document.body.appendChild(mountNode)

      await render(
        <Portal open mountNode={mountNode} data-testid="portal">
          Hello World
        </Portal>
      )
      const portal = page.getByTestId('portal').element()

      expect(portal.parentElement).toBe(mountNode)
      expect(mountNode.parentElement).toBe(document.body)
    })
  })
})
