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

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { Alert } from '@instructure/ui-alerts/latest'
import type { AlertProps } from '@instructure/ui-alerts/latest'
import { GroupInstUIIcon } from '@instructure/ui-icons'

describe('<Alert />', () => {
  let srdiv: HTMLDivElement | null
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(async () => {
    // Mocking console to prevent test output pollution and expect
    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as any
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as any
    srdiv = document.createElement('div')
    srdiv.id = '_alertLiveRegion'
    srdiv.setAttribute('role', 'alert')
    srdiv.setAttribute('aria-live', 'assertive')
    srdiv.setAttribute('aria-relevant', 'additions text')
    srdiv.setAttribute('aria-atomic', 'false')
    document.body.appendChild(srdiv)
  })

  afterEach(async () => {
    srdiv?.parentNode?.removeChild(srdiv)
    srdiv = null
    consoleWarningMock.mockRestore()
    consoleErrorMock.mockRestore()
  })

  it('should render', async () => {
    await render(<Alert variant="success">Success: Sample alert text.</Alert>)
    const text = page.getByText('Success: Sample alert text.')
    await expect.element(text).toBeInTheDocument()
  })

  it('should not render the Close button when `renderCloseButtonLabel` is not provided', async () => {
    await render(<Alert variant="success">Success: Sample alert text.</Alert>)
    const closeButton = page.getByRole('button')

    await expect.element(closeButton).not.toBeInTheDocument()
  })

  it('should call `onDismiss` when the close button is clicked with renderCloseButtonLabel', async () => {
    const onDismiss = vi.fn()
    await render(
      <Alert
        variant="success"
        renderCloseButtonLabel={<div>Close</div>}
        onDismiss={onDismiss}
      >
        Success: Sample alert text.
      </Alert>
    )
    const closeButton = page.getByRole('button')

    await userEvent.click(closeButton)

    await vi.waitFor(() => {
      expect(onDismiss).toHaveBeenCalled()
    })
  })

  const iconComponentsVariants: Record<
    NonNullable<AlertProps['variant']>,
    string
  > = {
    error: 'CircleX',
    info: 'Info',
    success: 'CircleCheck',
    warning: 'TriangleAlert'
  }

  ;(
    Object.entries(iconComponentsVariants) as [
      NonNullable<AlertProps['variant']>,
      string
    ][]
  ).forEach(([variant, iconComponent]) => {
    it(`"${variant}" variant should have icon "${iconComponent}".`, async () => {
      const { container } = await render(
        <Alert variant={variant} transition="none">
          Success: Sample alert text.
        </Alert>
      )
      const icon = container.querySelector('svg[class^="lucide"]')

      expect(icon).toHaveAttribute('name', iconComponent)
    })
  })

  it('should meet a11y standards', async () => {
    const { container } = await render(
      <Alert variant="success" transition="none">
        Success: Sample alert text.
      </Alert>
    )
    const axeCheck = await runAxeCheck(container)
    expect(axeCheck).toBe(true)
  })

  it('should add alert text to aria live region, when present', async () => {
    const liveRegion = document.getElementById('_alertLiveRegion')!
    await render(
      <Alert
        variant="success"
        transition="none"
        liveRegion={() => liveRegion}
        liveRegionPoliteness="polite"
      >
        Success: Sample alert text.
      </Alert>
    )

    await vi.waitFor(() => {
      expect(liveRegion).toHaveTextContent('Success: Sample alert text.')
    })
    expect(liveRegion).toHaveAttribute('aria-live', 'polite')
  })

  it('should accept a direct DOM element as liveRegion', async () => {
    const liveRegion = document.getElementById('_alertLiveRegion')!
    await render(
      <Alert
        variant="success"
        transition="none"
        liveRegion={liveRegion}
        liveRegionPoliteness="polite"
        isLiveRegionAtomic
      >
        Success: Sample alert text.
      </Alert>
    )

    await vi.waitFor(() => {
      expect(liveRegion).toHaveTextContent('Success: Sample alert text.')
    })
    expect(liveRegion).toHaveAttribute('aria-atomic', 'true')
  })

  it('should render an icon when provided as the `renderIcon` prop', async () => {
    const { container } = await render(
      <Alert renderCustomIcon={<GroupInstUIIcon />} />
    )
    const icon = container.querySelector('svg[class^="lucide"]')

    expect(icon).toHaveAttribute('name', 'Group')
    expect(icon).toBeInTheDocument()
  })

  describe('with `screenReaderOnly', () => {
    it('should not render anything when using `liveRegion`', async () => {
      const liveRegion = document.getElementById('_alertLiveRegion')!
      const { container } = await render(
        <Alert
          variant="success"
          liveRegion={() => liveRegion}
          screenReaderOnly={true}
        >
          Success: Sample alert text. asdsfds
        </Alert>
      )

      expect(container.children.length).toBe(0)
      await vi.waitFor(() => {
        expect(liveRegion.children.length).toBe(1)
      })
    })

    it('should warn if `liveRegion` is not defined', async () => {
      const consoleWarningSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {})
      const warning =
        "Warning: [Alert] The 'screenReaderOnly' prop must be used in conjunction with 'liveRegion'."
      await render(
        <Alert variant="success" screenReaderOnly={true}>
          Success: Sample alert text.
        </Alert>
      )

      await vi.waitFor(() => {
        expect(consoleWarningSpy.mock.calls[0][0]).toEqual(
          expect.stringContaining(warning)
        )
      })
    })

    it('should set aria-atomic to the aria live region when isLiveRegionAtomic is present', async () => {
      const liveRegion = document.getElementById('_alertLiveRegion')!
      await render(
        <Alert
          variant="success"
          transition="none"
          liveRegion={() => liveRegion}
          liveRegionPoliteness="polite"
          isLiveRegionAtomic
        >
          Success: Sample alert text.
        </Alert>
      )

      await vi.waitFor(() => {
        expect(liveRegion).toHaveTextContent('Success: Sample alert text.')
      })
      expect(liveRegion).toHaveAttribute('aria-atomic', 'true')
    })

    it('should close when told to, with transition', async () => {
      const liveRegion = document.getElementById('_alertLiveRegion')!
      const { rerender } = await render(
        <Alert variant="success" liveRegion={() => liveRegion}>
          Success: Sample alert text.
        </Alert>
      )

      await vi.waitFor(() => {
        expect(liveRegion.children.length).toBe(1)
      })

      //set open to false
      await rerender(
        <Alert variant="success" open={false} liveRegion={() => liveRegion}>
          Success: Sample alert text.
        </Alert>
      )

      await vi.waitFor(() => {
        expect(liveRegion.children.length).toBe(0)
      })
    })

    it('should close when told to, without transition', async () => {
      const liveRegion = document.getElementById('_alertLiveRegion')!
      const { rerender, container } = await render(
        <Alert
          variant="success"
          transition="none"
          liveRegion={() => liveRegion}
        >
          Success: Sample alert text.
        </Alert>
      )

      await vi.waitFor(() => {
        expect(liveRegion.children.length).toBe(1)
      })

      //set open to false
      await rerender(
        <Alert
          open={false}
          variant="success"
          transition="none"
          liveRegion={() => liveRegion}
        >
          Success: Sample alert text.
        </Alert>
      )

      await vi.waitFor(() => {
        expect(container).not.toHaveTextContent('Success: Sample alert text.')
        expect(liveRegion.children.length).toBe(0)
      })
    })
  })

  describe('Component tests', () => {
    it('should have shadow by default', async () => {
      const { container } = await render(
        <Alert variant="info" transition="none">
          Success: Sample alert text.
        </Alert>
      )
      const view = container.querySelector<HTMLElement>(
        'div[class$="-view-alert"]'
      )!
      const boxShadow = getComputedStyle(view).boxShadow
      expect(boxShadow).not.toBe('none')
    })

    it("shouldn't have shadow, when `hasShadow` is set to false", async () => {
      const { container } = await render(
        <Alert variant="info" transition="none" hasShadow={false}>
          Success: Sample alert text.
        </Alert>
      )
      const view = container.querySelector<HTMLElement>(
        'div[class$="-view-alert"]'
      )!

      const boxShadow = getComputedStyle(view).boxShadow
      expect(boxShadow).toBe('none')
    })
  })
})
