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

import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import type { MockInstance } from 'vitest'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { TruncateText } from '@instructure/ui-truncate-text/latest'
import { Text } from '@instructure/ui-text/latest'

const defaultText = 'Hello world! This is a long string that should truncate'

describe('<TruncateText />', () => {
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as MockInstance
  })

  afterEach(() => {
    consoleErrorMock.mockRestore()
  })

  it('should warn if children prop receives too deep of a node tree', async () => {
    await render(
      <div style={{ width: '200px' }}>
        <TruncateText>
          Hello world!{' '}
          <strong>
            <span>This is a</span>
          </strong>{' '}
          long string that should truncate
        </TruncateText>
      </div>
    )

    const expectedErrorMessage =
      'Some children are too deep in the node tree and will not render.'

    await vi.waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledWith(
        expect.stringContaining(expectedErrorMessage),
        expect.any(String)
      )
    })
  })

  it('should handle the empty string as a child', async () => {
    let error = false

    try {
      const { rerender } = await render(<TruncateText>{''}</TruncateText>)

      await rerender(<TruncateText>{'hello world'}</TruncateText>)
      await rerender(<TruncateText>{''}</TruncateText>)
    } catch (_e) {
      error = true
    }

    expect(error).toBe(false)
  })

  it('should meet a11y standards', async () => {
    const { container } = await render(
      <div style={{ width: '200px' }}>
        <TruncateText>{defaultText}</TruncateText>
      </div>
    )
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  describe('Component tests', () => {
    const baseStyle = {
      fontSize: '16px',
      fontFamily: 'Arial',
      fontWeight: 'normal',
      fontStyle: 'normal',
      letterSpacing: 'normal'
    }
    const getTruncatedText = (container: HTMLElement) =>
      container.querySelector('[class$="-truncateText"]')!.textContent!

    // TODO unskip these, when the lineHeight style token issue is fixed.
    // (it should accept strings like '150%' and divide them by 100)
    it.skip('should truncate text', async () => {
      const { container } = await render(
        <div style={{ ...baseStyle, width: '200px' }}>
          <TruncateText>{defaultText}</TruncateText>
        </div>
      )

      await vi.waitFor(() => {
        const text = getTruncatedText(container)

        expect(text).not.toContain('truncate')
        expect(text).toContain('…')
      })
    })

    it.skip('should recalculate when parent width changes', async () => {
      const { container } = await render(
        <div style={{ ...baseStyle, width: '200px' }} data-testid="container">
          <TruncateText>{defaultText}</TruncateText>
        </div>
      )
      const parent = page.getByTestId('container').element() as HTMLElement
      const text1 = getTruncatedText(container)

      parent.style.width = '100px'

      await vi.waitFor(() => {
        expect(getTruncatedText(container)).not.toEqual(text1)
      })
      const text2 = getTruncatedText(container)

      parent.style.width = '400px'

      await vi.waitFor(() => {
        expect(getTruncatedText(container)).not.toEqual(text2)
      })
    })

    it.skip('should preserve node structure', async () => {
      const { container } = await render(
        <div style={{ ...baseStyle, width: '200px' }}>
          <TruncateText>
            <p className="testClass">
              Hello world! <strong>This is a</strong> long string that{' '}
              <em>should truncate</em>
            </p>
          </TruncateText>
        </div>
      )

      await vi.waitFor(() => {
        const paragraph = container.querySelector('p.testClass')!

        expect(paragraph).toBeInTheDocument()
        expect(paragraph.querySelector('strong')).toBeInTheDocument()
        expect(paragraph.querySelector('em')).toBeInTheDocument()
        expect(paragraph.children.length).toEqual(3)
      })
    })

    it.skip('should recalculate if props change', async () => {
      const { container, rerender } = await render(
        <div style={{ ...baseStyle, width: '200px' }}>
          <TruncateText>{defaultText}</TruncateText>
        </div>
      )
      const textBeforeUpdate = getTruncatedText(container)

      // Set props: position, ellipsis
      await rerender(
        <div style={{ ...baseStyle, width: '200px' }}>
          <TruncateText position="middle" ellipsis="(...)">
            {defaultText}
          </TruncateText>
        </div>
      )

      await vi.waitFor(() => {
        expect(getTruncatedText(container)).not.toEqual(textBeforeUpdate)
      })
    })

    it('should re-render with new children if children change', async () => {
      const { container, rerender } = await render(
        <TruncateText>
          <span style={{ ...baseStyle }}>{defaultText}</span>
        </TruncateText>
      )
      const textBeforeUpdate = getTruncatedText(container)

      // Set child
      await rerender(
        <div style={{ ...baseStyle }}>
          <TruncateText>
            <span>This is a different string of text</span>
          </TruncateText>
        </div>
      )

      await vi.waitFor(() => {
        expect(getTruncatedText(container)).not.toEqual(textBeforeUpdate)
      })
    })

    it.skip('should call onUpdate when text changes', async () => {
      const onUpdate = vi.fn()

      await render(
        <div data-testid="container" style={{ ...baseStyle, width: '700px' }}>
          <TruncateText onUpdate={onUpdate}>{defaultText}</TruncateText>
        </div>
      )
      const parent = page.getByTestId('container').element() as HTMLElement

      expect(onUpdate).not.toHaveBeenCalled()

      // Set container width
      parent.style.width = '100px'

      await vi.waitFor(() => {
        expect(onUpdate).toHaveBeenCalledWith(true)
      })

      // Set container width
      parent.style.width = '800px'

      await vi.waitFor(() => {
        expect(onUpdate).toHaveBeenCalledWith(false)
      })
    })

    it('should render text at any size with no lineHeight set', async () => {
      await render(
        <div data-testid="container" style={{ ...baseStyle, width: '200px' }}>
          <span>
            <Text size="x-small">
              <TruncateText>xsmall</TruncateText>
            </Text>
            <Text size="small">
              <TruncateText>small</TruncateText>
            </Text>
            <Text size="medium">
              <TruncateText>medium</TruncateText>
            </Text>
            <Text size="large">
              <TruncateText>large</TruncateText>
            </Text>
            <Text size="x-large">
              <TruncateText>xlarge</TruncateText>
            </Text>
            <Text size="xx-large">
              <TruncateText>xxlarge</TruncateText>
            </Text>
          </span>
        </div>
      )

      await expect
        .element(page.getByTestId('container'))
        .toHaveTextContent('xsmallsmallmediumlargexlargexxlarge')
    })
  })
})
