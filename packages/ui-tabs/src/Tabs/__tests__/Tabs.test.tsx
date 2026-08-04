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
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import type { MockInstance } from 'vitest'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { Tabs } from '@instructure/ui-tabs/latest'

const TabExample = (props: { onIndexChange: (arg: number) => void }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  return (
    <Tabs
      onRequestTabChange={(_event, { index }) => {
        setSelectedIndex(index)
        props.onIndexChange(index)
      }}
      variant="default"
      margin="medium"
    >
      <Tabs.Panel
        renderTitle="First Tab"
        id="first"
        isSelected={selectedIndex === 0}
        active
      >
        <p>CONTENT</p>
      </Tabs.Panel>
      <Tabs.Panel
        renderTitle="Second Tab"
        id="second"
        isSelected={selectedIndex === 1}
      />
      <Tabs.Panel
        renderTitle="Third Tab"
        id="third"
        isSelected={selectedIndex === 2}
      />
    </Tabs>
  )
}

describe('<Tabs />', () => {
  const tab1Content = 'Tab 1 content'
  const tab2Content = 'Tab 2 content'
  const tab3Content = 'Tab 3 content'

  let consoleErrorMock: ReturnType<typeof vi.spyOn>
  let consoleWarningMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as MockInstance

    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as MockInstance
  })

  afterEach(() => {
    consoleErrorMock.mockRestore()
    consoleWarningMock.mockRestore()
  })

  it('should render the correct number of panels', async () => {
    const { container } = await render(
      <Tabs>
        <Tabs.Panel renderTitle="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled>
          Tab 3 content
        </Tabs.Panel>
      </Tabs>
    )
    const panels = container.querySelectorAll('[role="tabpanel"]')

    expect(panels.length).toBe(3)
  })

  it('should render with null children', async () => {
    const { container } = await render(
      <Tabs>
        <Tabs.Panel renderTitle="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled>
          Tab 3 content
        </Tabs.Panel>
        {null}
      </Tabs>
    )
    const panels = container.querySelectorAll('[role="tabpanel"]')

    expect(panels.length).toBe(3)
  })

  it('should be okay with rendering without any children', async () => {
    await render(<Tabs></Tabs>)

    expect(consoleErrorMock).not.toHaveBeenCalled()
  })

  it('should render correct number of tabs', async () => {
    await render(
      <Tabs>
        <Tabs.Panel renderTitle="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled>
          Tab 3 content
        </Tabs.Panel>
      </Tabs>
    )
    const tabs = page.getByRole('tab').elements()

    expect(tabs.length).toBe(3)
  })

  it('should render same content for other tabs as for the active one', async () => {
    const { container } = await render(
      <Tabs>
        <Tabs.Panel renderTitle="First Tab" active>
          CONTENT
        </Tabs.Panel>
        <Tabs.Panel id="secondTab" renderTitle="Second Tab" isSelected>
          Child
        </Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab">Child</Tabs.Panel>
      </Tabs>
    )

    const tabContent = page.getByText('CONTENT').element()

    expect(container).toBeInTheDocument()
    expect(tabContent).toBeInTheDocument()

    const childContent = page.getByText('Child').query()

    expect(childContent).toBeNull()
  })

  it('should render the same content in second tab when selected', async () => {
    const onIndexChange = vi.fn()

    const { container } = await render(
      <TabExample onIndexChange={onIndexChange} />
    )
    expect(container).toBeInTheDocument()

    const secondTab = page.getByRole('tab').elements()[1]

    await userEvent.click(secondTab)

    await vi.waitFor(() => {
      expect(onIndexChange).toHaveBeenCalledWith(1)
    })

    const panelContent = page.getByText('CONTENT').element()

    expect(panelContent).toBeInTheDocument()
  })

  it('should warn if multiple active tabs exist', async () => {
    const { container } = await render(
      <Tabs>
        <Tabs.Panel renderTitle="First Tab" active>
          Tab 1 content
        </Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab" active>
          Tab 2 content
        </Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled>
          Tab 3 content
        </Tabs.Panel>
      </Tabs>
    )

    expect(container.firstChild).toBeInTheDocument()

    expect(consoleErrorMock.mock.calls[0][0]).toEqual(
      'Warning: [Tabs] Only one Panel can be marked as active.'
    )
  })

  it('should default to selecting the first tab', async () => {
    const { container } = await render(
      <Tabs>
        <Tabs.Panel renderTitle="First Tab">{tab1Content}</Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab">{tab2Content}</Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled>
          {tab3Content}
        </Tabs.Panel>
      </Tabs>
    )
    const panelsContainer = container.querySelector(
      '[class$="panelsContainer"]'
    )

    expect(panelsContainer).toHaveTextContent(tab1Content)
    expect(page.getByText(tab1Content).element()).toBeVisible()

    expect(panelsContainer).not.toHaveTextContent(tab2Content)
    expect(panelsContainer).not.toHaveTextContent(tab3Content)
  })

  it('should honor the isSelected prop', async () => {
    const { container } = await render(
      <Tabs>
        <Tabs.Panel renderTitle="First Tab">{tab1Content}</Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab" isSelected>
          {tab2Content}
        </Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled>
          {tab3Content}
        </Tabs.Panel>
      </Tabs>
    )
    const panelsContainer = container.querySelector(
      '[class$="panelsContainer"]'
    )

    expect(panelsContainer).toHaveTextContent(tab2Content)
    expect(page.getByText(tab2Content).element()).toBeVisible()

    expect(panelsContainer).not.toHaveTextContent(tab1Content)
    expect(panelsContainer).not.toHaveTextContent(tab3Content)
  })

  it('should not allow selecting a disabled tab', async () => {
    const { container } = await render(
      <Tabs>
        <Tabs.Panel renderTitle="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled isSelected>
          Tab 3 content
        </Tabs.Panel>
      </Tabs>
    )
    const panelsContainer = container.querySelector(
      '[class$="panelsContainer"]'
    )
    const panels = container.querySelectorAll('[role="tabpanel"]')

    expect(panelsContainer).toHaveTextContent(tab1Content)
    expect(page.getByText(tab1Content).element()).toBeVisible()

    expect(panelsContainer).not.toHaveTextContent(tab2Content)
    expect(panelsContainer).not.toHaveTextContent(tab3Content)

    expect(panels.length).toBe(3)
    expect(panels[0]).not.toHaveAttribute('aria-hidden', 'true')
    expect(panels[1]).toHaveAttribute('aria-hidden', 'true')
    expect(panels[2]).toHaveAttribute('aria-hidden', 'true')
  })

  it('should call onRequestTabChange when selection changes via click', async () => {
    const onChange = vi.fn()

    await render(
      <Tabs onRequestTabChange={onChange}>
        <Tabs.Panel renderTitle="First Tab" isSelected id="one">
          Tab 1 content
        </Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab" id="two">
          Tab 2 content
        </Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled id="three">
          Tab 3 content
        </Tabs.Panel>
      </Tabs>
    )
    const secondTab = page.getByText('Second Tab').element()

    await userEvent.click(secondTab)

    await vi.waitFor(() => {
      expect(onChange).toHaveBeenCalled()

      const args = onChange.mock.calls[0][1]

      expect(args).toHaveProperty('index', 1)
      expect(args).toHaveProperty('id', 'two')
    })
  })

  it('should focus the selected tab when shouldFocusOnRender is set', async () => {
    await render(
      <Tabs shouldFocusOnRender>
        <Tabs.Panel renderTitle="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab" isSelected>
          Tab 2 content
        </Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled>
          Tab 3 content
        </Tabs.Panel>
      </Tabs>
    )
    const secondTab = page.getByText('Second Tab').element()

    await vi.waitFor(() => {
      expect(document.activeElement).toBe(secondTab)
    })
  })

  it('should not call onRequestTabChange when clicking a disabled tab', async () => {
    const onChange = vi.fn()
    await render(
      <Tabs onRequestTabChange={onChange}>
        <Tabs.Panel renderTitle="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled>
          Tab 3 content
        </Tabs.Panel>
      </Tabs>
    )
    const thirdTab = page.getByText('Third Tab').element()

    await userEvent.click(thirdTab, { force: true })

    await vi.waitFor(() => {
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  it('should meet a11y standards when set to the secondary variant', async () => {
    const { container } = await render(
      <Tabs variant="secondary">
        <Tabs.Panel renderTitle="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled>
          Tab 3 content
        </Tabs.Panel>
      </Tabs>
    )
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  it('should meet a11y standards when set to the default variant', async () => {
    const { container } = await render(
      <Tabs variant="default">
        <Tabs.Panel renderTitle="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled>
          Tab 3 content
        </Tabs.Panel>
      </Tabs>
    )
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  it('should link tabs with the corresponding panels via ids', async () => {
    const { container } = await render(
      <Tabs>
        <Tabs.Panel renderTitle="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled>
          Tab 3 content
        </Tabs.Panel>
      </Tabs>
    )
    const firstTab = page.getByText('First Tab').element()
    const firstPanel = container.querySelectorAll('[role="tabpanel"]')[0]

    expect(firstTab).toHaveAttribute('aria-controls', firstPanel.id)
    expect(firstPanel).toHaveAttribute('aria-labelledby', firstTab.id)
  })

  describe('with duplicate-named tabs', () => {
    it('should still render the correct number of panels', async () => {
      const { container } = await render(
        <Tabs>
          <Tabs.Panel renderTitle="A Tab">Contents of first tab.</Tabs.Panel>
          <Tabs.Panel renderTitle="A Tab">Contents of second tab.</Tabs.Panel>
          <Tabs.Panel renderTitle="A Tab" isDisabled>
            Contents of third tab.
          </Tabs.Panel>
        </Tabs>
      )
      const tabPanels = container.querySelectorAll('[role="tabpanel"]')

      expect(tabPanels.length).toBe(3)
    })
  })

  describe('with nodes as tab titles', () => {
    it('should still render the correct number of panels', async () => {
      const { container } = await render(
        <Tabs>
          <Tabs.Panel renderTitle={<div />}>Contents of first tab.</Tabs.Panel>
          <Tabs.Panel renderTitle={<span />}>
            Contents of second tab.
          </Tabs.Panel>
          <Tabs.Panel renderTitle={<img alt="example" />} isDisabled>
            Contents of third tab.
          </Tabs.Panel>
        </Tabs>
      )
      const tabPanels = container.querySelectorAll('[role="tabpanel"]')

      expect(tabPanels.length).toBe(3)
    })
  })

  describe('Component tests', () => {
    it('should call onRequestTabChange with keyboard arrow keys', async () => {
      const onChange = vi.fn()

      await render(
        <Tabs onRequestTabChange={onChange}>
          <Tabs.Panel renderTitle="First Tab">Tab 1 content</Tabs.Panel>
          <Tabs.Panel renderTitle="Second Tab">Tab 2 content</Tabs.Panel>
          <Tabs.Panel renderTitle="Third Tab" isDisabled>
            Tab 3 content
          </Tabs.Panel>
        </Tabs>
      )
      const selectedTab = page
        .getByRole('tab', { selected: true })
        .element() as HTMLElement

      for (const key of [
        '{ArrowLeft}',
        '{ArrowRight}',
        '{ArrowUp}',
        '{ArrowDown}'
      ]) {
        onChange.mockClear()

        selectedTab.focus()
        await userEvent.keyboard(key)

        await vi.waitFor(() => {
          expect(onChange).toHaveBeenCalledOnce()
          expect(onChange.mock.lastCall![1].index).toBe(1)
        })
      }
    })

    it('should keep non-selected panel hidden when unmountOnExit is false', async () => {
      // Tabs is a controlled component: a tab click only fires onRequestTabChange,
      // so the parent must own the selected index for the panel to actually switch.
      const Example = () => {
        const [selectedIndex, setSelectedIndex] = useState(0)
        return (
          <Tabs
            onRequestTabChange={(_event, { index }) => setSelectedIndex(index)}
          >
            <Tabs.Panel
              renderTitle="First Tab"
              isSelected={selectedIndex === 0}
              unmountOnExit={false}
            >
              Tab 1 content
            </Tabs.Panel>
            <Tabs.Panel
              renderTitle="Second Tab"
              isSelected={selectedIndex === 1}
            >
              Tab 2 content
            </Tabs.Panel>
          </Tabs>
        )
      }

      await render(<Example />)
      const panels = () => page.getByRole('tabpanel', { includeHidden: true })

      expect(panels().elements().length).toBe(2)
      expect(panels().elements()[0]).not.toHaveStyle({ display: 'none' })
      expect(panels().elements()[1]).toHaveStyle({ display: 'none' })

      await userEvent.click(page.getByRole('tab', { name: 'Second Tab' }))

      await vi.waitFor(() => {
        expect(panels().elements()[1]).not.toHaveStyle({ display: 'none' })
        expect(panels().elements()[0]).toHaveStyle({ display: 'none' })
      })
    })

    it('should render a fade-out gradient when tabOverflow set to scroll and Tabs overflow', async () => {
      const Example = ({ width }: { width: string }) => (
        <div style={{ width }}>
          <Tabs tabOverflow="scroll">
            <Tabs.Panel renderTitle="Tab1">Contents of panel</Tabs.Panel>
            <Tabs.Panel renderTitle="Tab2">Contents of panel</Tabs.Panel>
            <Tabs.Panel renderTitle="Tab3">Contents of panel</Tabs.Panel>
            <Tabs.Panel renderTitle="Tab4">Contents of panel</Tabs.Panel>
            <Tabs.Panel renderTitle="Tab5">Contents of panel</Tabs.Panel>
          </Tabs>
        </div>
      )

      const { container, rerender } = await render(<Example width="150px" />)

      await vi.waitFor(() => {
        expect(
          container.querySelector('[class$="-tabs__startScrollOverlay"]')
        ).toBeInTheDocument()
        expect(
          container.querySelector('[class$="-tabs__endScrollOverlay"]')
        ).toBeInTheDocument()
      })

      await rerender(<Example width="550px" />)

      await vi.waitFor(() => {
        expect(
          container.querySelector('[class$="-tabs__startScrollOverlay"]')
        ).not.toBeInTheDocument()
        expect(
          container.querySelector('[class$="-tabs__endScrollOverlay"]')
        ).not.toBeInTheDocument()
      })
    })
  })
})
