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

import { useState } from 'react'
import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import { describe, it, expect, vi } from 'vitest'

import { Tabs as TabsLatest } from '@instructure/ui-tabs/latest'
import { Tabs as TabsV1 } from '@instructure/ui-tabs/v11_6'

type TabsComponent = typeof TabsLatest

const tabEl = (name: string) => page.getByText(name).element() as HTMLElement

// v1 and v2 differ only in theming, so both have to pass every assertion here.
function describeKeyboard(name: string, Tabs: TabsComponent) {
  const Example = (props: {
    activationMode?: 'auto' | 'manual'
    onChange?: (index: number) => void
  }) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    return (
      <Tabs
        activationMode={props.activationMode}
        onRequestTabChange={(_event, { index }) => {
          setSelectedIndex(index)
          props.onChange?.(index)
        }}
      >
        <Tabs.Panel
          renderTitle="First Tab"
          id="one"
          isSelected={selectedIndex === 0}
        >
          Tab 1 content
        </Tabs.Panel>
        <Tabs.Panel
          renderTitle="Second Tab"
          id="two"
          isSelected={selectedIndex === 1}
        >
          Tab 2 content
        </Tabs.Panel>
        <Tabs.Panel renderTitle="Disabled Tab" id="three" isDisabled>
          Tab 3 content
        </Tabs.Panel>
        <Tabs.Panel
          renderTitle="Fourth Tab"
          id="four"
          isSelected={selectedIndex === 3}
        >
          Tab 4 content
        </Tabs.Panel>
      </Tabs>
    )
  }

  describe(`<Tabs /> ${name} keyboard navigation`, () => {
    it('moves focus onto the newly selected tab on each arrow press', async () => {
      await render(<Example />)

      tabEl('First Tab').focus()

      await userEvent.keyboard('{ArrowRight}')
      await vi.waitFor(() => {
        expect(document.activeElement).toBe(tabEl('Second Tab'))
      })

      // skips the disabled tab
      await userEvent.keyboard('{ArrowRight}')
      await vi.waitFor(() => {
        expect(document.activeElement).toBe(tabEl('Fourth Tab'))
      })

      await userEvent.keyboard('{ArrowLeft}')
      await vi.waitFor(() => {
        expect(document.activeElement).toBe(tabEl('Second Tab'))
      })
    })

    it('gives unselected tabs tabindex="-1" so they can take focus', async () => {
      await render(<Example />)

      const second = tabEl('Second Tab')

      expect(tabEl('First Tab')).toHaveAttribute('tabindex', '0')
      expect(second).toHaveAttribute('tabindex', '-1')

      second.focus()
      expect(document.activeElement).toBe(second)
    })

    it('reports aria-selected="false" on unselected tabs', async () => {
      await render(<Example />)

      expect(tabEl('First Tab')).toHaveAttribute('aria-selected', 'true')
      expect(tabEl('Second Tab')).toHaveAttribute('aria-selected', 'false')
    })

    it('marks the tablist as horizontally oriented', async () => {
      await render(<Example />)

      expect(page.getByRole('tablist').element()).toHaveAttribute(
        'aria-orientation',
        'horizontal'
      )
    })

    it('selects the first and last enabled tab with Home and End', async () => {
      const onChange = vi.fn()
      await render(<Example onChange={onChange} />)

      tabEl('First Tab').focus()

      await userEvent.keyboard('{End}')
      await vi.waitFor(() => {
        expect(onChange).toHaveBeenLastCalledWith(3)
        expect(document.activeElement).toBe(tabEl('Fourth Tab'))
      })

      await userEvent.keyboard('{Home}')
      await vi.waitFor(() => {
        expect(onChange).toHaveBeenLastCalledWith(0)
        expect(document.activeElement).toBe(tabEl('First Tab'))
      })
    })

    it('does not warn about Focusable while navigating', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      await render(<Example />)

      tabEl('First Tab').focus()
      await userEvent.keyboard('{ArrowRight}')
      await vi.waitFor(() => {
        expect(document.activeElement).toBe(tabEl('Second Tab'))
      })

      const focusableWarnings = warnSpy.mock.calls.filter((args) =>
        /\[Focusable\]/.test(String(args[0]))
      )
      warnSpy.mockRestore()

      expect(focusableWarnings).toEqual([])
    })
  })

  describe(`<Tabs /> ${name} manual activation`, () => {
    it('moves focus without selecting when arrowing', async () => {
      const onChange = vi.fn()
      await render(<Example activationMode="manual" onChange={onChange} />)

      tabEl('First Tab').focus()
      await userEvent.keyboard('{ArrowRight}')

      await vi.waitFor(() => {
        expect(document.activeElement).toBe(tabEl('Second Tab'))
      })
      expect(onChange).not.toHaveBeenCalled()
      expect(tabEl('First Tab')).toHaveAttribute('aria-selected', 'true')
      expect(tabEl('Second Tab')).toHaveAttribute('aria-selected', 'false')
    })

    it('keeps the roving tabindex on the focused tab, not the selected one', async () => {
      await render(<Example activationMode="manual" />)

      tabEl('First Tab').focus()
      await userEvent.keyboard('{ArrowRight}')

      await vi.waitFor(() => {
        expect(tabEl('Second Tab')).toHaveAttribute('tabindex', '0')
        expect(tabEl('First Tab')).toHaveAttribute('tabindex', '-1')
      })
    })

    for (const key of ['{Enter}', '{ }'] as const) {
      it(`selects the focused tab on ${key}`, async () => {
        const onChange = vi.fn()
        await render(<Example activationMode="manual" onChange={onChange} />)

        tabEl('First Tab').focus()
        await userEvent.keyboard('{ArrowRight}')
        await vi.waitFor(() => {
          expect(document.activeElement).toBe(tabEl('Second Tab'))
        })
        expect(onChange).not.toHaveBeenCalled()

        await userEvent.keyboard(key)
        await vi.waitFor(() => {
          expect(onChange).toHaveBeenCalledWith(1)
          expect(tabEl('Second Tab')).toHaveAttribute('aria-selected', 'true')
        })
      })
    }
  })
}

describeKeyboard('v2 (latest)', TabsLatest)
describeKeyboard('v1 (v11_6)', TabsV1 as unknown as TabsComponent)
