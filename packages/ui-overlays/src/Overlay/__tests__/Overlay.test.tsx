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

import { Overlay } from '@instructure/ui-overlays/latest'
import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import { describe, it, expect, vi } from 'vitest'

describe('<Overlay />', () => {
  it('should render nothing when closed', async () => {
    await render(<Overlay label="Overlay Example" />)
    const overlay = page.getByText('Overlay Example').query()

    expect(overlay).not.toBeInTheDocument()
  })

  it('should render children when open', async () => {
    await render(
      <Overlay open label="Overlay Example">
        Hello World
      </Overlay>
    )
    const overlay = page.getByRole('dialog').element()

    expect(overlay).toHaveTextContent('Hello World')
  })

  it('should fire transition callback props', async () => {
    const onEnter = vi.fn()
    const onEntering = vi.fn()
    const onEntered = vi.fn()

    await render(
      <Overlay
        open
        transition="fade"
        label="Overlay Example"
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
      />
    )

    await vi.waitFor(() => {
      expect(onEnter).toHaveBeenCalled()
      expect(onEntering).toHaveBeenCalled()
      expect(onEntered).toHaveBeenCalled()
    })
  })

  it('should support onOpen prop', async () => {
    const onOpen = vi.fn()

    await render(<Overlay open label="Overlay Example" onOpen={onOpen} />)

    await vi.waitFor(() => {
      expect(onOpen).toHaveBeenCalled()
    })
  })

  it('should support onClose prop', async () => {
    const onClose = vi.fn()

    const { rerender } = await render(
      <Overlay open label="Overlay Example" onClose={onClose} />
    )

    await rerender(
      <Overlay label="Overlay Example" onClose={onClose} open={false} />
    )

    await vi.waitFor(() => {
      expect(onClose).toHaveBeenCalled()
    })
  })
})
