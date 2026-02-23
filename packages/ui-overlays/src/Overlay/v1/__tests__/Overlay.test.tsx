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

import { Overlay } from '../index'

describe('<Overlay />', () => {
  it('should render nothing when closed', () => {
    render(<Overlay label="Overlay Example" />)
    const overlay = screen.queryByText('Overlay Example')

    expect(overlay).not.toBeInTheDocument()
  })

  it('should render children when open', () => {
    render(
      <Overlay open label="Overlay Example">
        Hello World
      </Overlay>
    )
    const overlay = screen.getByRole('dialog')

    expect(overlay).toHaveTextContent('Hello World')
  })

  it('should fire transition callback props', async () => {
    const onEnter = vi.fn()
    const onEntering = vi.fn()
    const onEntered = vi.fn()

    render(
      <Overlay
        open
        transition="fade"
        label="Overlay Example"
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
      />
    )

    await waitFor(() => {
      expect(onEnter).toHaveBeenCalled()
      expect(onEntering).toHaveBeenCalled()
      expect(onEntered).toHaveBeenCalled()
    })
  })

  it('should support onOpen prop', async () => {
    const onOpen = vi.fn()

    render(<Overlay open label="Overlay Example" onOpen={onOpen} />)

    await waitFor(() => {
      expect(onOpen).toHaveBeenCalled()
    })
  })

  it('should support onClose prop', async () => {
    const onClose = vi.fn()

    const { rerender } = render(
      <Overlay open label="Overlay Example" onClose={onClose} />
    )

    rerender(<Overlay label="Overlay Example" onClose={onClose} open={false} />)

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled()
    })
  })
})
