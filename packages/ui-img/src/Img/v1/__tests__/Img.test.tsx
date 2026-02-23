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

import { render } from '@testing-library/react'
import type { MockInstance } from 'vitest'
import { vi } from 'vitest'

import '@testing-library/jest-dom'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { Img } from '../index'

describe('<Img />', () => {
  const image =
    'data:image/gif;base64,R0lGODlhFAAUAJEAAP/9/fYQEPytrflWViH5BAAAAAAALAAAAAAUABQAQAJKhI+pGe09lnhBnEETfodatVHNh1BR+ZzH9LAOCYrVYpiAfWWJOxrC/5MASbyZT4d6AUIBlUYGoR1FsAXUuTN5YhxAEYbrpKRkQwEAOw=='
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as MockInstance
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as MockInstance
  })

  afterEach(() => {
    consoleWarningMock.mockRestore()
    consoleErrorMock.mockRestore()
  })

  describe('for a11y', () => {
    it('should meet a11y standards', async () => {
      const { container } = render(<Img src={image} />)
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })

    it('should render an empty alt attribute by default', async () => {
      const { container } = render(<Img src={image} />)
      const img = container.querySelector('img')

      expect(img).toHaveAttribute('alt', '')
    })

    it('should render the provided alt attribute', async () => {
      const altValue = 'Foo'
      const { container } = render(<Img src={image} alt={altValue} />)
      const img = container.querySelector('img')

      expect(img).toHaveAttribute('alt', altValue)
    })
  })

  it('should render an overlay color', async () => {
    const { container } = render(
      <Img src={image} overlay={{ color: '#ff0000', opacity: 7 }} />
    )
    const overlay = container.querySelector('[class*="-img__overlay"]')

    expect(overlay).toBeInTheDocument()
  })

  it('should render a blur filter', async () => {
    const { container } = render(<Img src={image} withBlur={true} />)

    const img = container.querySelector('img')!
    const style = getComputedStyle(img)

    expect(style.filter).toContain('blur')
  })

  it('should render a grayscale filter', async () => {
    const { container } = render(<Img src={image} withGrayscale={true} />)

    const img = container.querySelector('img')!
    const style = getComputedStyle(img)

    expect(style.filter).toContain('grayscale')
  })

  // // If component renders as simple image
  it('should display block-level when display="block"', async () => {
    const { container } = render(<Img src={image} display="block" />)
    const img = container.querySelector('img')!
    const style = getComputedStyle(img)

    expect(style.display).toBe('block')
  })

  // // If component has an overlay and renders as image inside containing element
  it('should display block-level with overlay when display="block"', async () => {
    const { container } = render(
      <Img
        src={image}
        display="block"
        overlay={{ color: 'tomato', opacity: 7 }}
      />
    )
    const img = container.querySelector('img')!
    const imgContainer = container.querySelector('[class*="-img__container"]')!
    const imgStyle = getComputedStyle(img)
    const imgContainerStyle = getComputedStyle(imgContainer)

    expect(imgStyle.display).toBe('block')
    expect(imgContainerStyle.display).toBe('block')
  })

  it('should apply CSS object-fit: cover when constrain="cover"', async () => {
    const { container } = render(
      <div style={{ width: 16, height: 16 }}>
        <Img src={image} constrain="cover" />
      </div>
    )
    const img = container.querySelector('img')!
    const imgStyle = getComputedStyle(img)

    expect(imgStyle.objectFit).toBe('cover')
  })

  it('should apply CSS object-fit: contain when constrain="contain"', async () => {
    const { container } = render(
      <div style={{ width: 16, height: 16 }}>
        <Img src={image} constrain="contain" />
      </div>
    )
    const img = container.querySelector('img')!
    const imgStyle = getComputedStyle(img)

    expect(imgStyle.objectFit).toBe('contain')
  })
})
