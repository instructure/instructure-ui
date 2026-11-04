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
import { userEvent } from 'vitest/browser'
import { describe, it, expect, vi } from 'vitest'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { SegmentedControl } from '@instructure/ui-segmented-control/latest'

const renderControl = (
  props: Partial<React.ComponentProps<typeof SegmentedControl>> = {}
) =>
  render(
    <SegmentedControl aria-label="View" {...props}>
      <SegmentedControl.Option value="day" renderLabel="Day" />
      <SegmentedControl.Option value="week" renderLabel="Week" />
      <SegmentedControl.Option value="month" renderLabel="Month" />
    </SegmentedControl>
  )

const getRadios = (container: Element) =>
  Array.from(container.querySelectorAll<HTMLButtonElement>('[role="radio"]'))

const renderOverflown = (
  props: Partial<React.ComponentProps<typeof SegmentedControl>> = {},
  width = 200
) =>
  render(
    <div style={{ width }}>
      <SegmentedControl
        aria-label="Months"
        isOverflown
        renderPreviousLabel="Previous options"
        renderNextLabel="Next options"
        defaultValue="jan"
        {...props}
      >
        {['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug'].map((m) => (
          <SegmentedControl.Option key={m} value={m} renderLabel={m} />
        ))}
      </SegmentedControl>
    </div>
  )

const getArrow = (container: Element, name: string) =>
  Array.from(
    container.querySelectorAll<HTMLButtonElement>(
      '[data-cid~="SegmentedControlArrow"]'
    )
  ).find((arrow) => arrow.textContent === name)

describe('<SegmentedControl />', () => {
  it('should render a radiogroup with one radio per option', async () => {
    const { container } = await renderControl()

    expect(container.querySelector('[role="radiogroup"]')).toHaveAttribute(
      'aria-label',
      'View'
    )
    expect(getRadios(container)).toHaveLength(3)
  })

  it('should select the defaultValue option', async () => {
    const { container } = await renderControl({ defaultValue: 'week' })

    expect(getRadios(container).map((r) => r.ariaChecked)).toEqual([
      'false',
      'true',
      'false'
    ])
  })

  it('should select an option on click and call onChange with its value', async () => {
    const onChange = vi.fn()
    const { container } = await renderControl({
      defaultValue: 'day',
      onChange
    })

    await userEvent.click(getRadios(container)[2])

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][1]).toBe('month')
    expect(getRadios(container)[2]).toHaveAttribute('aria-checked', 'true')
  })

  it('should not call onChange when the selected option is clicked again', async () => {
    const onChange = vi.fn()
    const { container } = await renderControl({
      defaultValue: 'day',
      onChange
    })

    await userEvent.click(getRadios(container)[0])

    expect(onChange).not.toHaveBeenCalled()
  })

  it('should follow the value prop when controlled', async () => {
    const onChange = vi.fn()
    const { container } = await renderControl({ value: 'day', onChange })

    await userEvent.click(getRadios(container)[1])

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(getRadios(container)[0]).toHaveAttribute('aria-checked', 'true')
    expect(getRadios(container)[1]).toHaveAttribute('aria-checked', 'false')
  })

  it('should keep only the selected option in the tab order', async () => {
    const { container } = await renderControl({ defaultValue: 'week' })

    expect(getRadios(container).map((r) => r.tabIndex)).toEqual([-1, 0, -1])
  })

  it('should put the first enabled option in the tab order without a selection', async () => {
    const { container } = await render(
      <SegmentedControl aria-label="View">
        <SegmentedControl.Option value="day" renderLabel="Day" isDisabled />
        <SegmentedControl.Option value="week" renderLabel="Week" />
      </SegmentedControl>
    )

    expect(getRadios(container).map((r) => r.tabIndex)).toEqual([-1, 0])
  })

  it('should move focus and selection with the arrow keys, wrapping around', async () => {
    const onChange = vi.fn()
    const { container } = await renderControl({
      defaultValue: 'day',
      onChange
    })
    const radios = getRadios(container)

    radios[0].focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(document.activeElement).toBe(radios[1])
    expect(radios[1]).toHaveAttribute('aria-checked', 'true')
    expect(onChange.mock.calls[0][1]).toBe('week')

    await userEvent.keyboard('{ArrowLeft}{ArrowLeft}')
    expect(document.activeElement).toBe(radios[2])
    expect(radios[2]).toHaveAttribute('aria-checked', 'true')
  })

  it('should move focus and selection to the first and last option with Home and End', async () => {
    const { container } = await renderControl({ defaultValue: 'week' })
    const radios = getRadios(container)

    radios[1].focus()
    await userEvent.keyboard('{End}')
    expect(document.activeElement).toBe(radios[2])
    expect(radios[2]).toHaveAttribute('aria-checked', 'true')

    await userEvent.keyboard('{Home}')
    expect(document.activeElement).toBe(radios[0])
    expect(radios[0]).toHaveAttribute('aria-checked', 'true')
  })

  it('should select the focused option with Space and Enter', async () => {
    const onChange = vi.fn()
    const { container } = await renderControl({
      defaultValue: 'day',
      onChange
    })
    const radios = getRadios(container)

    radios[1].focus()
    await userEvent.keyboard(' ')
    expect(onChange.mock.calls[0][1]).toBe('week')

    radios[2].focus()
    await userEvent.keyboard('{Enter}')
    expect(onChange.mock.calls[1][1]).toBe('month')
  })

  it('should skip disabled options when moving with the arrow keys', async () => {
    const { container } = await render(
      <SegmentedControl aria-label="View" defaultValue="day">
        <SegmentedControl.Option value="day" renderLabel="Day" />
        <SegmentedControl.Option value="week" renderLabel="Week" isDisabled />
        <SegmentedControl.Option value="month" renderLabel="Month" />
      </SegmentedControl>
    )
    const radios = getRadios(container)

    radios[0].focus()
    await userEvent.keyboard('{ArrowRight}')

    expect(document.activeElement).toBe(radios[2])
    expect(radios[1]).toHaveAttribute('aria-checked', 'false')
  })

  it('should not select a disabled option', async () => {
    const onChange = vi.fn()
    const { container } = await render(
      <SegmentedControl aria-label="View" onChange={onChange}>
        <SegmentedControl.Option value="day" renderLabel="Day" isDisabled />
        <SegmentedControl.Option value="week" renderLabel="Week" />
      </SegmentedControl>
    )

    await userEvent.click(getRadios(container)[0], { force: true })

    expect(onChange).not.toHaveBeenCalled()
  })

  it('should disable every option when isDisabled is set', async () => {
    const { container } = await renderControl({ isDisabled: true })

    expect(getRadios(container).every((r) => r.disabled)).toBe(true)
    expect(container.querySelector('[role="radiogroup"]')).toHaveAttribute(
      'aria-disabled',
      'true'
    )
  })

  it('should name an icon-only option with screenReaderLabel', async () => {
    const { container } = await render(
      <SegmentedControl aria-label="View">
        <SegmentedControl.Option
          value="list"
          renderIcon={<svg />}
          screenReaderLabel="List view"
        />
        <SegmentedControl.Option
          value="grid"
          renderIcon={<svg />}
          screenReaderLabel="Grid view"
        />
      </SegmentedControl>
    )

    expect(getRadios(container)[0]).toHaveAttribute('aria-label', 'List view')
  })

  it('should forward the ref to the root element', async () => {
    const ref = { current: null as HTMLDivElement | null }
    await render(
      <SegmentedControl aria-label="View" ref={ref}>
        <SegmentedControl.Option value="day" renderLabel="Day" />
      </SegmentedControl>
    )

    expect(ref.current).toHaveAttribute('data-cid', 'SegmentedControl')
  })

  it('should log an error when value is set without onChange', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)

    await renderControl({ value: 'day' })

    expect(consoleError.mock.calls[0][0]).toContain(
      '[SegmentedControl] The `value` prop requires'
    )
    consoleError.mockRestore()
  })

  describe('when isOverflown', () => {
    it('should not render arrows when the options fit', async () => {
      const { container } = await renderOverflown({}, 1000)

      expect(
        container.querySelectorAll('[data-cid~="SegmentedControlArrow"]')
      ).toHaveLength(0)
    })

    it('should not render arrows without isOverflown', async () => {
      const { container } = await renderOverflown({ isOverflown: false })

      expect(
        container.querySelectorAll('[data-cid~="SegmentedControlArrow"]')
      ).toHaveLength(0)
    })

    it('should render only the next arrow at the start', async () => {
      const { container } = await renderOverflown()

      await expect.poll(() => getArrow(container, 'Next options')).toBeTruthy()
      expect(getArrow(container, 'Previous options')).toBeFalsy()
    })

    it('should scroll the options and show the previous arrow when the next arrow is clicked', async () => {
      const { container } = await renderOverflown()
      const track = container.querySelector<HTMLElement>('[role="radiogroup"]')!

      await expect.poll(() => getArrow(container, 'Next options')).toBeTruthy()
      await userEvent.click(getArrow(container, 'Next options')!)

      await expect.poll(() => track.scrollLeft).toBeGreaterThan(0)
      await expect
        .poll(() => getArrow(container, 'Previous options'))
        .toBeTruthy()
    })

    it('should only hide the next arrow once the last option is reached', async () => {
      const { container } = await renderOverflown({ defaultValue: 'aug' })

      await expect
        .poll(() => getArrow(container, 'Previous options'))
        .toBeTruthy()
      expect(getArrow(container, 'Next options')).toBeFalsy()
    })

    it('should stay at the end after the next arrow hands focus to the selected option', async () => {
      const { container } = await renderOverflown()
      const track = container.querySelector<HTMLElement>('[role="radiogroup"]')!

      await expect.poll(() => getArrow(container, 'Next options')).toBeTruthy()
      // the arrow unmounts once the end is reached, so a pointer click on it can race
      for (
        let arrow = getArrow(container, 'Next options');
        arrow;
        arrow = getArrow(container, 'Next options')
      ) {
        arrow.focus()
        arrow.click()
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
      await new Promise((resolve) => setTimeout(resolve, 300))

      expect(document.activeElement).toBe(getRadios(container)[0])
      expect(track.scrollLeft).toBeGreaterThan(track.clientWidth / 2)
    })

    it('should not change the selection when an arrow is clicked', async () => {
      const onChange = vi.fn()
      const { container } = await renderOverflown({ onChange })

      await expect.poll(() => getArrow(container, 'Next options')).toBeTruthy()
      await userEvent.click(getArrow(container, 'Next options')!)

      expect(onChange).not.toHaveBeenCalled()
    })

    it('should scroll a keyboard-selected option into view', async () => {
      const { container } = await renderOverflown()
      const radios = getRadios(container)

      radios[0].focus()
      await userEvent.keyboard('{End}')

      await expect
        .poll(() => getArrow(container, 'Previous options'))
        .toBeTruthy()
      expect(radios[7]).toHaveAttribute('aria-checked', 'true')
    })

    it('should keep every option as a radio outside of the arrows', async () => {
      const { container } = await renderOverflown()

      expect(getRadios(container)).toHaveLength(8)
      expect(
        container
          .querySelector('[role="radiogroup"]')!
          .querySelector('[data-cid~="SegmentedControlArrow"]')
      ).toBeNull()
    })

    it('should log an error without arrow labels', async () => {
      const consoleError = vi
        .spyOn(console, 'error')
        .mockImplementation(() => undefined)

      await renderOverflown({
        renderPreviousLabel: undefined,
        renderNextLabel: undefined
      })

      expect(consoleError.mock.calls[0][0]).toContain(
        '`isOverflown` needs `renderPreviousLabel`'
      )
      consoleError.mockRestore()
    })

    describe('option changes', () => {
      const tree = (prefix: string, values: string[], width = 200) => (
        <div style={{ width }}>
          <SegmentedControl
            aria-label="Months"
            isOverflown
            renderPreviousLabel="Previous options"
            renderNextLabel="Next options"
            defaultValue="jan"
          >
            {values.map((m) => (
              <SegmentedControl.Option
                key={prefix + m}
                value={m}
                renderLabel={m}
              />
            ))}
          </SegmentedControl>
        </div>
      )
      const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug']

      it('should keep tracking the ends when the options are recreated with the same values', async () => {
        const { container, rerender } = await render(tree('a-', months))
        await expect
          .poll(() => getArrow(container, 'Next options'))
          .toBeTruthy()

        await rerender(tree('b-', months))
        const track = container.querySelector<HTMLElement>(
          '[role="radiogroup"]'
        )!

        await expect
          .poll(() => getArrow(container, 'Previous options'))
          .toBeFalsy()
        expect(getArrow(container, 'Next options')).toBeTruthy()

        track.scrollTo({ left: track.scrollWidth, behavior: 'instant' })

        await expect
          .poll(() => getArrow(container, 'Previous options'))
          .toBeTruthy()
        await expect.poll(() => getArrow(container, 'Next options')).toBeFalsy()
      })

      it('should show the next arrow when an option appended at the end overflows the track', async () => {
        const { container, rerender } = await render(
          tree('a-', months.slice(0, 2), 400)
        )
        expect(getArrow(container, 'Next options')).toBeFalsy()

        await rerender(tree('a-', months, 200))

        await expect
          .poll(() => getArrow(container, 'Next options'))
          .toBeTruthy()
      })

      it('should not render arrows for a single option that fits', async () => {
        const { container } = await render(tree('a-', ['jan'], 400))

        expect(getArrow(container, 'Next options')).toBeFalsy()
        expect(getArrow(container, 'Previous options')).toBeFalsy()
      })

      it('should disconnect the observer on unmount', async () => {
        const disconnect = vi.spyOn(
          IntersectionObserver.prototype,
          'disconnect'
        )
        const { unmount } = await render(tree('a-', months))
        disconnect.mockClear()

        await unmount()

        expect(disconnect).toHaveBeenCalled()
        disconnect.mockRestore()
      })
    })

    it('should scroll without animation when reduced motion is preferred', async () => {
      const { container } = await renderOverflown()
      const track = container.querySelector<HTMLElement>('[role="radiogroup"]')!
      await expect.poll(() => getArrow(container, 'Next options')).toBeTruthy()

      const matchMedia = window.matchMedia.bind(window)
      const spy = vi
        .spyOn(window, 'matchMedia')
        .mockImplementation((query) =>
          query.includes('prefers-reduced-motion')
            ? ({ matches: true } as MediaQueryList)
            : matchMedia(query)
        )
      await userEvent.click(getArrow(container, 'Next options')!)

      expect(track.scrollLeft).toBeCloseTo(track.clientWidth * 0.75, 0)
      spy.mockRestore()
    })

    it('should meet a11y standards', async () => {
      const { container } = await renderOverflown({ defaultValue: 'jun' })

      await expect.poll(() => getArrow(container, 'Next options')).toBeTruthy()
      expect(await runAxeCheck(container)).toBe(true)
    })
  })

  it('should ignore arrow keys pressed with a modifier key', async () => {
    const onChange = vi.fn()
    const { container } = await renderControl({
      defaultValue: 'day',
      onChange
    })
    const radios = getRadios(container)

    radios[0].focus()
    await userEvent.keyboard('{Alt>}{ArrowRight}{/Alt}')
    await userEvent.keyboard('{Meta>}{End}{/Meta}')

    expect(document.activeElement).toBe(radios[0])
    expect(onChange).not.toHaveBeenCalled()
  })

  it('should log an error and not throw on keyboard input when options are wrapped', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)
    const { container } = await render(
      <SegmentedControl aria-label="View" defaultValue="day">
        <>
          <SegmentedControl.Option value="day" renderLabel="Day" />
          <SegmentedControl.Option value="week" renderLabel="Week" />
        </>
      </SegmentedControl>
    )
    const radios = getRadios(container)

    radios[0].focus()
    await userEvent.keyboard('{ArrowRight}')

    expect(consoleError.mock.calls[0][0]).toContain(
      '[SegmentedControl] Every child must be a `SegmentedControl.Option`'
    )
    expect(document.activeElement).toBe(radios[0])
    consoleError.mockRestore()
  })

  it('should call the onClick and onKeyDown passed to an option', async () => {
    const onClick = vi.fn()
    const onKeyDown = vi.fn()
    const onChange = vi.fn()
    const { container } = await render(
      <SegmentedControl
        aria-label="View"
        defaultValue="day"
        onChange={onChange}
      >
        <SegmentedControl.Option value="day" renderLabel="Day" />
        <SegmentedControl.Option
          value="week"
          renderLabel="Week"
          onClick={onClick}
          onKeyDown={onKeyDown}
        />
      </SegmentedControl>
    )

    await userEvent.click(getRadios(container)[1])
    await userEvent.keyboard('{Home}')

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onKeyDown).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][1]).toBe('week')
  })

  it('should pass an aria-label on an option through when it has no screenReaderLabel', async () => {
    const { container } = await render(
      <SegmentedControl aria-label="View">
        <SegmentedControl.Option
          value="day"
          renderLabel="Day"
          aria-label="Show the day view"
        />
      </SegmentedControl>
    )

    expect(getRadios(container)[0]).toHaveAttribute(
      'aria-label',
      'Show the day view'
    )
  })

  it('should meet a11y standards', async () => {
    const { container } = await renderControl({ defaultValue: 'day' })

    expect(await runAxeCheck(container)).toBe(true)
  })

  it('should meet a11y standards when disabled', async () => {
    const { container } = await renderControl({
      defaultValue: 'day',
      isDisabled: true
    })

    expect(await runAxeCheck(container)).toBe(true)
  })
})
