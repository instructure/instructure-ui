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

import React from 'react'

import { Tabs } from '../index'
import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import type { MockInstance } from 'vitest'

import '@testing-library/jest-dom'

const TabExample = (props: { onIndexChange: (arg: number) => void }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
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

  it('should render the correct number of panels', () => {
    const { container } = render(
      <Tabs>
        <Tabs.Panel renderTitle="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled>
          Tab 3 content
        </Tabs.Panel>
      </Tabs>
    )

    expect(container.firstChild).toBeInTheDocument()
  })

  it('should render same content for other tabs as for the active one', () => {
    const { container } = render(
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

    const tabContent = screen.getByText('CONTENT')

    expect(container).toBeInTheDocument()
    expect(tabContent).toBeInTheDocument()

    const childContent = screen.queryByText('Child')

    expect(childContent).toBeNull()
  })

  it('should render the same content in second tab when selected', () => {
    const onIndexChange = vi.fn()

    const { container } = render(<TabExample onIndexChange={onIndexChange} />)
    expect(container).toBeInTheDocument()

    const secondTab = screen.getAllByRole('tab')[1]

    fireEvent.click(secondTab)

    expect(onIndexChange).toHaveBeenCalledWith(1)

    const panelContent = screen.queryByText('CONTENT')

    expect(panelContent).toBeInTheDocument()
  })

  it('should warn if multiple active tabs exist', () => {
    const { container } = render(
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
})
