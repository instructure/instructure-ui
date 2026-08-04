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

import { CSSProperties } from 'react'
import type { MockInstance } from 'vitest'
import { View } from '@instructure/ui-view/latest'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

describe('<View />', () => {
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

  it('should render', async () => {
    const { container } = await render(
      <View>
        <h1>View Content</h1>
      </View>
    )
    const view = container.querySelector("span[class$='-view']")

    expect(view).toBeInTheDocument()
    expect(view).toHaveTextContent('View Content')
  })

  it('should render children', async () => {
    await render(
      <View>
        <h1>View Content</h1>
      </View>
    )

    const viewContent = page.getByText('View Content').element()

    expect(viewContent).toBeInTheDocument()
    expect(viewContent.tagName).toBe('H1')
  })

  it('should pass whitelisted style attributes', async () => {
    const styleProps: CSSProperties = {
      top: '160px',
      left: '5px',
      minWidth: '20px',
      minHeight: '208px',
      position: 'absolute',
      transform: 'translate(30px, 15px)',
      overflow: 'hidden',
      display: 'block',
      pointerEvents: 'none'
    }

    const { container } = await render(
      <View style={{ ...styleProps }}>
        <h1>View Content</h1>
      </View>
    )

    const view = container.querySelector("span[class$='-view']")
    const styles = getComputedStyle(view!)

    expect(styles['top']).toEqual('160px')
    expect(styles['left']).toEqual('5px')
    expect(styles['minWidth']).toEqual('20px')
    expect(styles['minHeight']).toEqual('208px')
    expect(styles['position']).toEqual('absolute')
    expect(styles['transform']).toEqual('translate(30px, 15px)')
    expect(styles['overflow']).toEqual('hidden')
    expect(styles['display']).toEqual('block')
    expect(styles['pointerEvents']).toEqual('none')
  })

  it('should pass flex style', async () => {
    const { container } = await render(
      <View style={{ flexBasis: '200px' }}>
        <h1>View Content</h1>
      </View>
    )

    const view = container.querySelector("span[class$='-view']")
    const styles = getComputedStyle(view!)

    expect(styles['flexBasis']).toEqual('200px')
  })

  it('should pass className', async () => {
    const className = 'fooBarBaz'

    const { container } = await render(
      <View className={className}>
        <h1>View Content</h1>
      </View>
    )

    const view = container.querySelector("span[class$='-view']")

    expect(view!.classList.contains(className)).toEqual(true)
  })

  it('should provide an elementRef', async () => {
    const elementRef = vi.fn()

    const { container } = await render(
      <View elementRef={elementRef}>
        <h1>View Content</h1>
      </View>
    )
    const view = container.querySelector("span[class$='-view']")

    expect(elementRef).toHaveBeenCalledWith(view)
  })

  it('should pass cursor', async () => {
    const cursor = 'cell'

    const { container } = await render(
      <View cursor={cursor}>
        <h1>View Content</h1>
      </View>
    )

    const view = container.querySelector("span[class$='-view']")
    const styles = getComputedStyle(view!)

    expect(styles['cursor']).toEqual(cursor)
  })

  it('should set overflow', async () => {
    const { container } = await render(
      <View overflowX="hidden" overflowY="auto">
        <h1>View Content</h1>
      </View>
    )

    const view = container.querySelector("span[class$='-view']")
    const styles = getComputedStyle(view!)

    expect(styles.overflowX).toEqual('hidden')
    expect(styles.overflowY).toEqual('auto')
  })

  it('should set CSS position', async () => {
    const { container } = await render(
      <View position="fixed">
        <h1>View Content</h1>
      </View>
    )

    const view = container.querySelector("span[class$='-view']")
    const styles = getComputedStyle(view!)

    expect(styles.position).toEqual('fixed')
  })

  it('should set inline offset (top, bottom, left, right)', async () => {
    const { container } = await render(
      <View
        insetBlockStart="0"
        insetBlockEnd="20px"
        insetInlineStart="2px"
        insetInlineEnd="3px"
      >
        <h1>View Content</h1>
      </View>
    )

    const view = container.querySelector("span[class$='-view']")
    const styles = getComputedStyle(view!)

    expect(styles['top']).toEqual('0px')
    expect(styles['bottom']).toEqual('20px')
    expect(styles['left']).toEqual('2px')
    expect(styles['right']).toEqual('3px')
  })

  it('should override default max-width', async () => {
    const { container, rerender } = await render(
      <View>
        <h1>View Content</h1>
      </View>
    )

    const view = container.querySelector("span[class$='-view']")
    const styles = getComputedStyle(view!)

    expect(styles.maxWidth).toEqual('100%')

    await rerender(
      <View maxWidth="200px">
        <h1>View Content</h1>
      </View>
    )

    const newStyles = getComputedStyle(view!)

    expect(newStyles.maxWidth).toEqual('200px')
  })

  it('should resolve current (era-3) spacing tokens for the margin prop', async () => {
    const { container } = await render(
      <View margin="general.spaceMd">
        <h1>View Content</h1>
      </View>
    )

    const view = container.querySelector("span[class$='-view']")
    const styles = getComputedStyle(view!)

    // general.spaceMd resolves to 0.75rem (12px)
    expect(styles.marginTop).toEqual('0.75rem')
    expect(styles.marginRight).toEqual('0.75rem')
    expect(styles.marginBottom).toEqual('0.75rem')
    expect(styles.marginLeft).toEqual('0.75rem')

    // a known token should not emit the "not found in theme" warning
    expect(consoleWarningMock).not.toHaveBeenCalledWith(
      expect.stringContaining('not found in theme')
    )
  })

  it('should resolve era-3 tokens via CSS-like shorthand for the margin prop', async () => {
    const { container } = await render(
      <View margin="general.spaceLg auto general.spaceXl">
        <h1>View Content</h1>
      </View>
    )

    const view = container.querySelector("span[class$='-view']")
    const styles = getComputedStyle(view!)

    // 3-value shorthand: top | left+right | bottom
    expect(styles.marginTop).toEqual('1rem') // general.spaceLg
    expect(styles.marginRight).toEqual('auto')
    expect(styles.marginBottom).toEqual('1.5rem') // general.spaceXl
    expect(styles.marginLeft).toEqual('auto')
  })

  it('should meet a11y standards', async () => {
    const { container } = await render(<View>View Content</View>)

    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })
})
