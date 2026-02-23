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
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { Drilldown } from '../../index'

describe('<Drilldown.Page />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as any
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as any
  })

  afterEach(() => {
    consoleWarningMock.mockRestore()
    consoleErrorMock.mockRestore()
  })

  it("shouldn't render non-DrilldownPage children", async () => {
    render(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0">
          <div id="testDiv">Div</div>
        </Drilldown.Page>
      </Drilldown>
    )
    const nonPageChild = screen.queryByText('DIV')

    expect(nonPageChild).not.toBeInTheDocument()
  })

  describe('header title', () => {
    it('should be displayed in the header', async () => {
      const { container } = render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderTitle="HeaderTitleString">
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const titleContainer = container.querySelector(
        '[id^="DrilldownHeader-Title-Label_"]'
      )
      const title = screen.queryByText('HeaderTitleString')

      expect(titleContainer).toBeInTheDocument()
      expect(title).toBeInTheDocument()
    })

    it('should be displayed when function is passed', async () => {
      render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderTitle={() => 'HeaderTitleFunction'}>
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const title = screen.queryByText('HeaderTitleFunction')

      expect(title).toBeInTheDocument()
    })

    it("shouldn't be displayed when function has no return value", async () => {
      const { container } = render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderTitle={() => null}>
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const title = container.querySelector(
        '[id^="DrilldownHeader-Title-Label_"]'
      )
      const listItem = container.querySelector('li')

      expect(title).not.toBeInTheDocument()
      expect(listItem).toBeInTheDocument()
    })
  })

  describe('header action label', () => {
    it('should be displayed in the header', async () => {
      render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page
            id="page0"
            renderActionLabel="HeaderActionLabelString"
          >
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const actionLabel = screen.queryByText('HeaderActionLabelString')

      expect(actionLabel).toBeInTheDocument()
    })

    it('should be displayed when function is passed', async () => {
      render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page
            id="page0"
            renderActionLabel={() => 'HeaderActionLabelFunction'}
          >
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const actionLabel = screen.queryByText('HeaderActionLabelFunction')

      expect(actionLabel).toBeInTheDocument()
    })

    it("shouldn't be displayed when function has no return value", async () => {
      const { container } = render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderActionLabel={() => null}>
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const listItem = container.querySelector('li')
      const title = container.querySelector(
        '[id^="DrilldownHeader-Title-Label_"]'
      )

      expect(listItem).toBeInTheDocument()
      expect(title).not.toBeInTheDocument()
    })

    it('should fire header action callback', async () => {
      const actionCallback = vi.fn()
      render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page
            id="page0"
            renderActionLabel="ActionWithCallback"
            onHeaderActionClicked={actionCallback}
          >
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const actionLabel = screen.getByText('ActionWithCallback')

      await userEvent.click(actionLabel)

      await waitFor(() => {
        expect(actionCallback).toHaveBeenCalled()
      })
    })
  })

  describe('header back navigation', () => {
    it('should not be displayed on root page', async () => {
      render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderBackButtonLabel="HeaderBackString">
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const label = screen.queryByText('HeaderBackString')

      expect(label).not.toBeInTheDocument()
    })

    it('should be displayed on subpages', async () => {
      render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" subPageId="page2">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page id="page2" renderBackButtonLabel="HeaderBackString">
            <Drilldown.Option id="option2">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option = screen.getByText('Option')

      await userEvent.click(option)

      await waitFor(() => {
        const label = screen.queryByText('HeaderBackString')

        expect(label).toBeInTheDocument()
      })
    })

    it('should be displayed when function is passed, and can use former page title', async () => {
      const pageTitle = 'Page Title'
      render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderTitle={pageTitle}>
            <Drilldown.Option id="option1" subPageId="page2">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page
            id="page2"
            renderBackButtonLabel={(prevPageTitle) =>
              `Back to ${prevPageTitle}`
            }
          >
            <Drilldown.Option id="option2">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option = screen.getByText('Option')

      await userEvent.click(option)

      await waitFor(() => {
        const label = screen.queryByText(`Back to ${pageTitle}`)

        expect(label).toBeInTheDocument()
      })
    })
  })

  describe('header separator', () => {
    it('should not be displayed, if no item is on the header', async () => {
      const { container } = render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const separator = container.querySelector(
        '[id^="DrilldownHeader-Separator_"]'
      )

      expect(separator).not.toBeInTheDocument()
    })

    it('should be displayed, if there are items in the header', async () => {
      const { container } = render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderTitle="Title">
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const separator = container.querySelector(
        '[id^="DrilldownHeader-Separator_"]'
      )

      expect(separator).toBeInTheDocument()
    })

    it('should not be displayed, if withoutHeaderSeparator is set', async () => {
      const { container } = render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderTitle="Title" withoutHeaderSeparator>
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const separator = container.querySelector(
        '[id^="DrilldownHeader-Separator_"]'
      )

      expect(separator).not.toBeInTheDocument()
    })
  })

  describe('disabled prop', () => {
    it('should make all options disabled', async () => {
      render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderActionLabel="Action Label" disabled>
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const allOptions = screen.getAllByRole('menuitem')

      allOptions.forEach((option) => {
        expect(option).toHaveAttribute('aria-disabled', 'true')
      })
    })

    it('should not allow selection if the Drilldown.Page is disabled', async () => {
      render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" disabled>
            <Drilldown.Group id="group0" selectableType="multiple">
              <Drilldown.Option id="opt1">Disabled Option</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )
      const optionItemContainer = screen.getByLabelText('Disabled Option')
      const optionContent = screen.getByText('Disabled Option')

      expect(optionItemContainer).toHaveAttribute('aria-checked', 'false')

      await userEvent.click(optionContent)

      expect(optionItemContainer).toHaveAttribute('aria-checked', 'false')
    })

    it("shouldn't make header Back options disabled", async () => {
      render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" subPageId="page2">
              Option1
            </Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page
            id="page2"
            disabled
            renderBackButtonLabel="HeaderBackString"
          >
            <Drilldown.Option id="option2">Option2</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const subPageOption = screen.getByText('Option1')

      await userEvent.click(subPageOption)

      await waitFor(() => {
        const option2 = screen.getByLabelText('Option2')
        const backOption = screen.getByLabelText('HeaderBackString')

        expect(option2).toHaveAttribute('role', 'menuitem')
        expect(option2).toHaveAttribute('aria-disabled', 'true')

        expect(backOption).toHaveAttribute('role', 'menuitem')
        expect(backOption).not.toHaveAttribute('aria-disabled')
      })
    })
  })
})
