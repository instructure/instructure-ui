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
