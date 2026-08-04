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

import { fireEvent } from '@testing-library/dom'
import { render, cleanup } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { CheckInstUIIcon } from '@instructure/ui-icons'
import { Popover } from '@instructure/ui-popover/latest'

import { Drilldown } from '@instructure/ui-drilldown/latest'

const data = Array(5)
  .fill(0)
  .map((_v, ind) => ({
    label: `option ${ind}`,
    id: `opt_${ind}`
  }))

describe('<Drilldown />', () => {
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

  describe('rootPageId prop', () => {
    it('should set the initial page and render it', async () => {
      await render(
        <Drilldown rootPageId="page1">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option-01</Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page id="page1">
            <Drilldown.Option id="option11">Option-11</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = page.getByRole('menu').element()
      const options = page.getByRole('menuitem').elements()
      const rootlessOption = page.getByText('Option-01').query()

      expect(drilldown).toBeInTheDocument()
      expect(rootlessOption).not.toBeInTheDocument()

      expect(options.length).toBe(1)
      expect(options[0]).toHaveTextContent('Option-11')
      expect(options[0]).toHaveAttribute('id', 'option11')
    })
  })

  describe('children prop', () => {
    it('should not allow non-DrilldownPage children', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <div id="testDiv">DIV-child</div>
        </Drilldown>
      )

      const drilldown = page.getByRole('menu').query()
      const options = page.getByRole('menuitem').elements()
      const notAllowedChild = page.getByText('DIV-child').query()

      expect(drilldown).not.toBeInTheDocument()
      expect(options.length).toBe(0)
      expect(notAllowedChild).not.toBeInTheDocument()
    })

    it('should not crash for weird option ids', async () => {
      const onSelect = vi.fn()
      const weirdID = 'some"_weird!@#$%^&*()\\|`id'
      await render(
        <Drilldown rootPageId="page0" onSelect={onSelect}>
          <Drilldown.Page id="page0">
            {data.map((option) => (
              <Drilldown.Option
                id={weirdID + option.id}
                value={weirdID + option.id}
                key={weirdID + option.id}
                data-testid={weirdID + option.id}
              >
                {option.label}
              </Drilldown.Option>
            ))}
          </Drilldown.Page>
        </Drilldown>
      )
      const option_1 = page.getByTestId(weirdID + 'opt_1').element()
      await userEvent.click(option_1)

      await vi.waitFor(() => {
        expect(onSelect).toHaveBeenCalled()
      })
    })
  })

  describe('id prop', () => {
    it('should put id attr on the drilldown', async () => {
      await render(
        <Drilldown rootPageId="page0" id="testId">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = page.getByRole('menu').element()

      expect(drilldown).toBeInTheDocument()
      expect(drilldown).toHaveAttribute('id', 'testId')
    })
  })

  describe('label prop', () => {
    it('should be added as aria-label', async () => {
      await render(
        <Drilldown rootPageId="page0" label="testLabel">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = page.getByRole('menu').element()

      expect(drilldown).toBeInTheDocument()
      expect(drilldown).toHaveAttribute('aria-label', 'testLabel')
    })
  })

  describe('disabled prop', () => {
    it('should disable all options', async () => {
      await render(
        <Drilldown rootPageId="page0" disabled>
          <Drilldown.Page id="page0" renderActionLabel="Action">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
            <Drilldown.Option id="option02">Option</Drilldown.Option>
            <Drilldown.Option id="option03">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const options = page.getByRole('menuitem').elements()

      expect(options.length).toBe(4) // header action + 3 options

      options.forEach((option) => {
        expect(option).toHaveAttribute('aria-disabled', 'true')
      })
    })

    it('should not allow selection if the main Drilldown is disabled', async () => {
      await render(
        <Drilldown rootPageId="page0" disabled>
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0" selectableType="multiple">
              <Drilldown.Option id="opt1">Disabled Option</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )
      const optionItemContainer = page
        .getByLabelText('Disabled Option')
        .element()
      const optionContent = page.getByText('Disabled Option').element()

      expect(optionItemContainer).toHaveAttribute('aria-checked', 'false')

      await userEvent.click(optionContent)

      expect(optionItemContainer).toHaveAttribute('aria-checked', 'false')
    })

    it('should always allow back navigation even if the page is disabled', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderTitle="First Page">
            <Drilldown.Option id="opt1" subPageId="page1">
              Go to Disabled Page
            </Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page
            id="page1"
            renderTitle="Disabled Page"
            disabled
          ></Drilldown.Page>
        </Drilldown>
      )

      // 1. Navigate to the disabled page
      await userEvent.click(page.getByText('Go to Disabled Page').element())
      expect(page.getByText('Disabled Page').element()).toBeInTheDocument()

      await userEvent.click(page.getByText('Back').element())

      // 4. Verify we have successfully navigated back
      expect(page.getByText('First Page').element()).toBeInTheDocument()
    })
  })

  describe('as prop', () => {
    it('should be "ul" by default', async () => {
      const { container } = await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const drilldownList = container.querySelector('[class$="-options__list"]')

      expect(drilldownList?.tagName).toBe('UL')
    })

    it('should render as passed element', async () => {
      const { container } = await render(
        <Drilldown rootPageId="page0" as="ol">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const drilldownList = container.querySelector('[class$="-options__list"]')

      expect(drilldownList?.tagName).toBe('OL')
    })
  })

  describe('role prop', () => {
    it('should be "menu" by default', async () => {
      const { container } = await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const drilldown = container.querySelector('div[id^="Drilldown_"]')

      expect(drilldown).toHaveAttribute('role', 'menu')
    })

    it('should apply passed role', async () => {
      const { container } = await render(
        <Drilldown rootPageId="page0" role="list">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const drilldown = container.querySelector('div[id^="Drilldown_"]')

      expect(drilldown).toHaveAttribute('role', 'list')
    })
  })

  describe('elementRef prop (and ref static prop)', () => {
    it('should give back the drilldown element when there is no trigger', async () => {
      const elementRef = vi.fn()

      await render(
        <Drilldown rootPageId="page0" elementRef={elementRef}>
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const drilldown = page.getByRole('menu').element()

      expect(drilldown).toBeInTheDocument()
      expect(elementRef).toHaveBeenCalledWith(drilldown)
    })

    it('should give back the Popover root when drilldown has trigger and is closed', async () => {
      const elementRef = vi.fn()
      const { container } = await render(
        <Drilldown
          rootPageId="page0"
          elementRef={elementRef}
          trigger={<button>Toggle</button>}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const trigger = page.getByText('Toggle').element()
      const positionId = trigger.getAttribute('data-position-target')
      const drilldownRoot = container.querySelector(
        `span[data-position="${positionId}"]`
      )

      expect(drilldownRoot).toBeInTheDocument()
      expect(elementRef).toHaveBeenCalledWith(drilldownRoot)
    })

    it('should give back the the Popover root when drilldown has trigger and is open', async () => {
      const elementRef = vi.fn()
      const { container } = await render(
        <Drilldown
          rootPageId="page0"
          elementRef={elementRef}
          trigger={<button>Toggle</button>}
          defaultShow
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const trigger = page.getByText('Toggle').element()
      const positionId = trigger.getAttribute('data-position-target')
      const drilldownRoot = container.querySelector(
        `span[data-position="${positionId}"]`
      )

      expect(drilldownRoot).toBeInTheDocument()
      expect(elementRef).toHaveBeenCalledWith(drilldownRoot)
    })
  })

  describe('drilldownRef prop', () => {
    it('should give back the drilldown element when there is no trigger', async () => {
      const drilldownRef = vi.fn()
      await render(
        <Drilldown rootPageId="page0" drilldownRef={drilldownRef}>
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const drilldown = page.getByRole('menu').element()

      expect(drilldownRef).toHaveBeenCalledWith(drilldown)
    })

    it("shouldn't be called when drilldown has trigger and is closed", async () => {
      const drilldownRef = vi.fn()
      await render(
        <Drilldown
          rootPageId="page0"
          drilldownRef={drilldownRef}
          trigger={<button>Toggle</button>}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(drilldownRef).not.toHaveBeenCalled()
    })

    it('should give back the drilldown element when drilldown has trigger and is open', async () => {
      const drilldownRef = vi.fn()
      await render(
        <Drilldown
          rootPageId="page0"
          drilldownRef={drilldownRef}
          trigger={<button>Toggle</button>}
          defaultShow
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const drilldown = page.getByRole('menu').element()

      expect(drilldownRef).toHaveBeenCalledWith(drilldown)
    })
  })

  describe('popoverRef prop', () => {
    it('should not be called when there is no trigger', async () => {
      const popoverRef = vi.fn()
      await render(
        <Drilldown rootPageId="page0" popoverRef={popoverRef}>
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(popoverRef).not.toHaveBeenCalled()
    })

    it('should give back the Popover component when drilldown has trigger and is closed', async () => {
      const popoverRef = vi.fn()
      const { container } = await render(
        <Drilldown
          rootPageId="page0"
          popoverRef={popoverRef}
          trigger={<button>Toggle</button>}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const trigger = page.getByText('Toggle').element()
      const positionId = trigger.getAttribute('data-position-target')
      const popoverRoot = container.querySelector(
        `span[data-position="${positionId}"]`
      )

      expect(popoverRoot).toBeInTheDocument()
      expect(popoverRef).toHaveBeenCalled()

      // Popover component's public ref prop
      expect(popoverRef.mock.calls[0][0].ref).toBe(popoverRoot)
    })

    it('should give back the Popover component when drilldown has trigger and is open', async () => {
      const popoverRef = vi.fn()
      const { container } = await render(
        <Drilldown
          rootPageId="page0"
          popoverRef={popoverRef}
          trigger={<button>Toggle</button>}
          defaultShow
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const trigger = page.getByText('Toggle').element()
      const positionId = trigger.getAttribute('data-position-target')
      const popoverRoot = container.querySelector(
        `span[data-position="${positionId}"]`
      )

      expect(popoverRoot).toBeInTheDocument()
      expect(popoverRef).toHaveBeenCalled()

      // Popover component's public ref prop
      expect(popoverRef.mock.calls[0][0].ref).toBe(popoverRoot)
    })
  })

  describe('onSelect prop', () => {
    it('should fire when option is selected', async () => {
      const onSelect = vi.fn()
      await render(
        <Drilldown rootPageId="page0" onSelect={onSelect}>
          <Drilldown.Page id="page0">
            {data.map((option) => (
              <Drilldown.Option
                id={option.id}
                value={option.id}
                key={option.id}
                data-testid={option.id}
              >
                {option.label}
              </Drilldown.Option>
            ))}
          </Drilldown.Page>
        </Drilldown>
      )
      const option_1 = page.getByTestId('opt_1').element()

      await userEvent.click(option_1)

      await vi.waitFor(() => {
        expect(onSelect).toHaveBeenCalled()

        const args = onSelect.mock.calls[0][1]
        const event = onSelect.mock.calls[0][0]

        expect(args.value).toBe('opt_1')
        expect(args.isSelected).toBe(true)

        expect(args.selectedOption.props).toHaveProperty('id', 'opt_1')
        expect(args.selectedOption.props).toHaveProperty('role', 'menuitem')
        expect(args.selectedOption.props).toHaveProperty('value', 'opt_1')

        expect(args.drilldown.props).toHaveProperty('role', 'menu')
        expect(args.drilldown.hide).toBeInstanceOf(Function)

        // a real click lands on the innermost label element
        expect(option_1).toContainElement(event.target)
      })
    })

    it('should not fire when drilldown is disabled', async () => {
      const onSelect = vi.fn()
      await render(
        <Drilldown rootPageId="page0" onSelect={onSelect} disabled>
          <Drilldown.Page id="page0">
            {data.map((option) => (
              <Drilldown.Option
                id={option.id}
                key={option.id}
                data-testid={option.id}
              >
                {option.label}
              </Drilldown.Option>
            ))}
          </Drilldown.Page>
        </Drilldown>
      )
      // the option itself is aria-disabled, so click its label content
      await userEvent.click(page.getByText('option 1'))

      await vi.waitFor(() => {
        expect(onSelect).not.toHaveBeenCalled()
      })
    })
  })

  describe('with a trigger', () => {
    it('should not show content by default', async () => {
      await render(
        <Drilldown rootPageId="page0" trigger={<button>click me</button>}>
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option0">Option 0</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option_0 = page.getByText('Option 0').query()

      expect(option_0).not.toBeInTheDocument()
    })

    it('should render into a mountNode', async () => {
      const container = document.createElement('div')
      container.setAttribute('data-testid', 'container')
      document.body.appendChild(container)

      await render(
        <Drilldown
          rootPageId="page0"
          mountNode={container}
          trigger={<button>Options</button>}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option0">Option 0</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const optionsContainer = page.getByTestId('container').element()
      const trigger = page.getByRole('button').element()

      expect(optionsContainer).not.toHaveTextContent('Option 0')

      await userEvent.click(trigger)

      await vi.waitFor(() => {
        const updatedOptionsContainer = page.getByTestId('container').element()

        expect(updatedOptionsContainer).toHaveTextContent('Option 0')
      })
    })

    it('should have an aria-haspopup attribute', async () => {
      await render(
        <Drilldown rootPageId="page0" trigger={<button>Options</button>}>
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option0">Option 0</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const trigger = page.getByRole('button').element()

      expect(trigger).toHaveAttribute('aria-haspopup')
    })

    it('should call onToggle when Drilldown is opened', async () => {
      const onToggle = vi.fn()
      await render(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Options</button>}
          onToggle={onToggle}
          data-testid="drilldown"
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option0">Option 0</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const trigger = page.getByRole('button').element()

      await userEvent.click(trigger)

      await vi.waitFor(() => {
        expect(onToggle).toHaveBeenCalled()

        const args = onToggle.mock.calls[0][1]

        expect(args).toHaveProperty('shown', true)
        expect(args).toHaveProperty('pageHistory', ['page0'])

        expect(args.goToPage).toBeInstanceOf(Function)
        expect(args.goToPreviousPage).toBeInstanceOf(Function)

        expect(args.drilldown.props).toHaveProperty('role', 'menu')
        expect(args.drilldown.props).toHaveProperty('data-testid', 'drilldown')
      })
    })

    it('should call onToggle when Drilldown is closed', async () => {
      const onToggle = vi.fn()
      await render(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Options</button>}
          onToggle={onToggle}
          defaultShow
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option0">Option 0</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const trigger = page.getByRole('button').element()

      await userEvent.click(trigger)

      await vi.waitFor(() => {
        expect(onToggle).toHaveBeenCalled()

        const args = onToggle.mock.calls[0][1]

        expect(args).toHaveProperty('shown', false)
        expect(args).toHaveProperty('pageHistory', ['page0'])
        expect(args).toHaveProperty('drilldown')

        expect(args.goToPage).toBeInstanceOf(Function)
        expect(args.goToPreviousPage).toBeInstanceOf(Function)
      })
    })
  })

  describe('placement prop', () => {
    it('should be passed to Popover', async () => {
      let popoverRef: Popover | null = null
      await render(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          defaultShow
          popoverRef={(e) => {
            popoverRef = e
          }}
          placement={'top start'}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const popoverProps = popoverRef!.props

      expect(popoverProps.placement).toBe('top start')
    })
  })

  describe('defaultShow prop', () => {
    it('should display Popover on render', async () => {
      await render(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          defaultShow
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const popoverContent = page.getByText('Option').element()

      expect(popoverContent).toBeVisible()
    })
  })

  describe('show prop', () => {
    it('should display popover', async () => {
      const onToggle = vi.fn()
      await render(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          show
          onToggle={onToggle}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const popoverContent = page.getByText('Option').element()

      expect(popoverContent).toBeVisible()
    })
  })

  describe('onFocus prop', () => {
    it('should be passed to Popover', async () => {
      let popoverRef: Popover | null = null
      const onFocus = vi.fn()
      await render(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          popoverRef={(e) => {
            popoverRef = e
          }}
          onFocus={onFocus}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const popoverProps = popoverRef!.props

      expect(popoverProps.onFocus).toEqual(onFocus)
    })
  })

  describe('onMouseOver prop', () => {
    it('should be passed to Popover', async () => {
      let popoverRef: Popover | null = null
      const onMouseOver = vi.fn()
      await render(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          popoverRef={(e) => {
            popoverRef = e
          }}
          onMouseOver={onMouseOver}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const popoverProps = popoverRef!.props

      expect(popoverProps.onMouseOver).toEqual(onMouseOver)
    })
  })

  describe('shouldContainFocus prop', () => {
    it('should be passed to Popover', async () => {
      let popoverRef: Popover | null = null
      await render(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          popoverRef={(e) => {
            popoverRef = e
          }}
          shouldContainFocus={true}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const popoverProps = popoverRef!.props

      expect(popoverProps.shouldContainFocus).toEqual(true)
    })
  })

  describe('shouldReturnFocus prop', () => {
    it('should be passed to Popover', async () => {
      let popoverRef: Popover | null = null
      await render(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          popoverRef={(e) => {
            popoverRef = e
          }}
          shouldReturnFocus={false}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const popoverProps = popoverRef!.props

      expect(popoverProps.shouldReturnFocus).toEqual(false)
    })
  })

  describe('withArrow prop', () => {
    it('should be passed to Popover', async () => {
      let popoverRef: Popover | null = null
      await render(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          popoverRef={(e) => {
            popoverRef = e
          }}
          withArrow={false}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const popoverProps = popoverRef!.props

      expect(popoverProps.withArrow).toEqual(false)
    })
  })

  describe('offsetX prop', () => {
    it('should be passed to Popover', async () => {
      let popoverRef: Popover | null = null
      await render(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          popoverRef={(e) => {
            popoverRef = e
          }}
          offsetX={'2rem'}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const popoverProps = popoverRef!.props

      expect(popoverProps.offsetX).toEqual('2rem')
    })
  })

  describe('offsetY prop', () => {
    it('should be passed to Popover', async () => {
      let popoverRef: Popover | null = null
      await render(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          popoverRef={(e) => {
            popoverRef = e
          }}
          offsetY={'2rem'}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const popoverProps = popoverRef!.props

      expect(popoverProps.offsetY).toEqual('2rem')
    })
  })

  describe('positionContainerDisplay prop', () => {
    it('should be passed to Popover', async () => {
      let popoverRef: Popover | null = null
      await render(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          popoverRef={(e) => {
            popoverRef = e
          }}
          positionContainerDisplay="block"
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const popoverProps = popoverRef!.props

      expect(popoverProps.positionContainerDisplay).toEqual('block')
    })
  })

  describe('for a11y', () => {
    it('should be accessible', async () => {
      const { container } = await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page
            id="page0"
            renderTitle="Page Title"
            renderActionLabel="Action Label"
          >
            <Drilldown.Option id="item01">Item1</Drilldown.Option>
            <Drilldown.Option id="item02" subPageId="page1">
              Item2
            </Drilldown.Option>
            <Drilldown.Option id="item03" description="This is a description">
              Item3
            </Drilldown.Option>
            <Drilldown.Option id="item04" renderLabelInfo="After">
              Item4
            </Drilldown.Option>
            <Drilldown.Option id="item05" disabled>
              Item5
            </Drilldown.Option>
            <Drilldown.Option id="item06" href="/">
              Item6
            </Drilldown.Option>
            <Drilldown.Option
              id="item07"
              renderBeforeLabel={<CheckInstUIIcon />}
            >
              Item7
            </Drilldown.Option>
            <Drilldown.Option
              id="item08"
              renderAfterLabel={<CheckInstUIIcon />}
            >
              Item8
            </Drilldown.Option>

            <Drilldown.Separator id="sep1" />

            <Drilldown.Group
              id="group1"
              renderGroupTitle="Multi-select group"
              selectableType="multiple"
            >
              <Drilldown.Option id="groupItem11">GroupItem</Drilldown.Option>
              <Drilldown.Option id="groupItem12">GroupItem</Drilldown.Option>
              <Drilldown.Option id="groupItem13">GroupItem</Drilldown.Option>
            </Drilldown.Group>

            <Drilldown.Group
              id="group2"
              renderGroupTitle="Single-select group"
              selectableType="single"
            >
              <Drilldown.Option id="groupItem21">GroupItem</Drilldown.Option>
              <Drilldown.Option id="groupItem22">GroupItem</Drilldown.Option>
              <Drilldown.Option id="groupItem23">GroupItem</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>

          <Drilldown.Page id="page1">
            <Drilldown.Option id="item11">Item1</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      // axe-check is more strict now, and expects "list" role to have "listitem" children, but we use "role='none'" children. After discussing it with the A11y team, we agreed to ignore this error because the screen readers can read the component perfectly.
      // TODO: try to remove this ignore if axe-check is updated and isn't this strict anymore
      // https://dequeuniversity.com/rules/axe/4.6/aria-required-children?application=axeAPI
      const axeCheck = await runAxeCheck(container, {
        ignores: ['aria-required-children']
      })

      expect(axeCheck).toBe(true)
    })

    it('should meet a11y standarts when drilldown is open', async () => {
      const { container } = await render(
        <Drilldown defaultShow rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option0">Option 0</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })
  })

  describe('Component tests', () => {
    const renderOptions = (pageName: string) =>
      data.map((option) => (
        <Drilldown.Option id={option.id} key={option.id}>
          {option.label} - {pageName}
        </Drilldown.Option>
      ))

    const menuEl = () => document.querySelector<HTMLElement>('div[role="menu"]')
    const drilldownContainer = () =>
      document.querySelector<HTMLElement>('[class$="-drilldown__container"]')!
    const headerTitle = () =>
      document.querySelector<HTMLElement>('[id^="DrilldownHeader-Title_"]')
    const activeId = () => document.activeElement?.id

    // The Popover's FocusRegion blurs the menu again shortly after mount, and a
    // real key event sent in that window lands on `body` instead of the
    // drilldown. So re-focus until the focus survives a frame.
    const focusMenu = async () => {
      await vi.waitFor(async () => {
        menuEl()!.focus()
        await new Promise((resolve) => requestAnimationFrame(resolve))
        expect(menuEl()!.contains(document.activeElement)).toBe(true)
      })
    }

    // Focus can still be stolen mid-sequence, which drops a move. Press, give
    // the focus time to land, and only press again if it never did — checking
    // too eagerly and re-pressing would overshoot the target instead.
    const navPress = async (key: string, targetId: string) => {
      for (let attempt = 0; attempt < 5; attempt++) {
        if (activeId() === targetId) {
          return
        }
        if (!menuEl()!.contains(document.activeElement)) {
          await focusMenu()
        }
        await userEvent.keyboard(key)
        try {
          await vi.waitFor(() => expect(activeId()).toBe(targetId), {
            timeout: 500
          })
          return
        } catch {
          // the key event never landed, press it again
        }
      }
      expect(activeId()).toBe(targetId)
    }

    afterEach(async () => {
      // the Popover's FocusRegion schedules an async focus return on unmount,
      // let it drain so it can't disturb the next test's keyboard navigation
      cleanup()
      await new Promise((resolve) => setTimeout(resolve, 100))
    })

    it('should disabled prop prevent option actions', async () => {
      await render(
        <Drilldown rootPageId="page0" disabled>
          <Drilldown.Page id="page0" renderActionLabel="Action">
            <Drilldown.Option id="page0option" subPageId="page1">
              Option-0
            </Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page id="page1">
            <Drilldown.Option id="page1option">Option-1</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      await userEvent.click(page.getByText('Option-0'))

      expect(page.getByText('Option-0').element()).toBeVisible()
      expect(page.getByText('Option-1').query()).not.toBeInTheDocument()
    })

    it('should disabled trigger, if disabled prop provided', async () => {
      await render(
        <Drilldown
          rootPageId="page0"
          disabled
          trigger={<button data-test-id="toggleButton">Toggle</button>}
        >
          <Drilldown.Page id="page0" renderActionLabel="Action">
            <Drilldown.Option id="page0option">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const toggleButton = document.querySelector<HTMLButtonElement>(
        '[data-test-id="toggleButton"]'
      )!

      expect(toggleButton).toHaveAttribute('aria-disabled', 'true')
      expect(toggleButton).toBeDisabled()

      // a real click can't be sent to a disabled button, so dispatch the event
      fireEvent.click(toggleButton, { button: 0, detail: 1 })

      expect(document.querySelector('#page0option')).not.toBeInTheDocument()
    })

    it('should rotate focus in the drilldown by default', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option1</Drilldown.Option>
            <Drilldown.Option id="option02">Option2</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      await focusMenu()

      await navPress('{ArrowDown}', 'option01')
      await navPress('{ArrowDown}', 'option02')
      await navPress('{ArrowDown}', 'option01')

      // rotated back around to the first option
      expect(activeId()).toBe('option01')
    })

    it('should prevent focus rotation in the drilldown with "false"', async () => {
      await render(
        <Drilldown rootPageId="page0" rotateFocus={false}>
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
            <Drilldown.Option id="option02">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      await focusMenu()
      await navPress('{ArrowDown}', 'option02')
      await navPress('{ArrowDown}', 'option02')
      await navPress('{ArrowDown}', 'option02')
      expect(activeId()).toBe('option02')
    })

    it('should set the width of the drilldown', async () => {
      await render(
        <Drilldown rootPageId="page0" width="320px">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(getComputedStyle(menuEl()!).width).toBe('320px')
    })

    it('should set the width of the drilldown in the popover', async () => {
      await render(
        <Drilldown
          rootPageId="page0"
          width="320px"
          trigger={<button>Toggle</button>}
          defaultShow
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(getComputedStyle(drilldownContainer()).width).toBe('320px')
    })

    it('should be overruled by maxWidth prop', async () => {
      await render(
        <Drilldown rootPageId="page0" width="300px" maxWidth="160px">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(getComputedStyle(drilldownContainer()).width).toBe('160px')
    })

    it('should be affected by overflowX prop', async () => {
      await render(
        <Drilldown rootPageId="page0" width="320px" overflowX="auto">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">
              <div style={{ whiteSpace: 'nowrap' }}>
                Option with a very long label so that it has to break
              </div>
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const container = drilldownContainer()
      const style = getComputedStyle(container)

      // 318px, not 320px: the container renders a 1px border each side
      // (borderWidth="small") with box-sizing border-box, so the computed
      // content width is 320 - 2 = 318.
      expect(style.width).toBe('318px')
      expect(style.overflowX).toBe('auto')
      expect(container.scrollWidth).toBeGreaterThan(container.clientWidth)
    })

    it('should set minWidth in popover mode', async () => {
      await render(
        <Drilldown
          rootPageId="page0"
          minWidth="336px"
          trigger={<button>Trigger</button>}
          show
          onToggle={vi.fn()}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(getComputedStyle(drilldownContainer()).width).toBe('336px')
    })

    it('should set the height of the drilldown', async () => {
      await render(
        <Drilldown rootPageId="page0" height="320px">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(getComputedStyle(drilldownContainer()).height).toBe('320px')
    })

    it('should set the height of the drilldown in the popover', async () => {
      await render(
        <Drilldown
          rootPageId="page0"
          height="320px"
          trigger={<button>Toggle</button>}
          defaultShow
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(getComputedStyle(drilldownContainer()).height).toBe('320px')
    })

    it('should be overruled by maxHeight prop', async () => {
      await render(
        <Drilldown rootPageId="page0" height="300px" maxHeight="160px">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(getComputedStyle(drilldownContainer()).height).toBe('160px')
    })

    it('should be affected by overflowY prop', async () => {
      await render(
        <Drilldown rootPageId="page0" height="160px" overflowY="auto">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
            <Drilldown.Option id="option02">Option</Drilldown.Option>
            <Drilldown.Option id="option03">Option</Drilldown.Option>
            <Drilldown.Option id="option04">Option</Drilldown.Option>
            <Drilldown.Option id="option05">Option</Drilldown.Option>
            <Drilldown.Option id="option06">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const container = drilldownContainer()
      const style = getComputedStyle(container)

      expect(style.height).toBe('160px')
      expect(style.overflowY).toBe('auto')
      expect(container.scrollHeight).toBeGreaterThan(container.clientHeight)
    })

    it('should minHeight prop set height', async () => {
      await render(
        <Drilldown rootPageId="page0" minHeight="336px">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(getComputedStyle(drilldownContainer()).height).toBe('336px')
    })

    it('should minHeight prop set height in popover mode', async () => {
      await render(
        <Drilldown
          rootPageId="page0"
          minHeight="336px"
          trigger={<button>Trigger</button>}
          show
          onToggle={vi.fn()}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(getComputedStyle(drilldownContainer()).height).toBe('336px')
    })

    it('should call onDismiss when Drilldown is closed', async () => {
      const onDismiss = vi.fn()
      await render(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Options</button>}
          onDismiss={onDismiss}
          defaultShow
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option0">Option 0</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      await focusMenu()

      await userEvent.keyboard('{Escape}')

      await vi.waitFor(() => {
        expect(onDismiss).toHaveBeenCalled()
        expect(onDismiss.mock.calls[0][0]).toBeInstanceOf(Event)
        expect(onDismiss.mock.calls[0][1]).toBe(false)
      })
    })

    it('should shouldHideOnSelect prop be true by default', async () => {
      await render(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          defaultShow
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option-01</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      expect(document.querySelector('#option01')).toBeInTheDocument()

      await userEvent.click(page.getByText('Option-01'))

      await vi.waitFor(() => {
        expect(document.querySelector('#option01')).not.toBeInTheDocument()
      })
    })

    it('should not close on subPage nav, even if shouldHideOnSelect is "true"', async () => {
      await render(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          defaultShow
          shouldHideOnSelect={true}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01" subPageId="page1">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page id="page1">
            <Drilldown.Option id="option11">Sub-Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      expect(document.querySelector('#option01')).toBeInTheDocument()
      expect(document.querySelector('#option11')).not.toBeInTheDocument()

      await userEvent.click(page.getByText('Option'))

      await vi.waitFor(() => {
        expect(document.querySelector('#option01')).not.toBeInTheDocument()
        expect(document.querySelector('#option11')).toBeInTheDocument()
      })
    })

    it('should not close on Back nav, even if shouldHideOnSelect is "true"', async () => {
      await render(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          defaultShow
          shouldHideOnSelect={true}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01" subPageId="page1">
              Option01
            </Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page id="page1">
            <Drilldown.Option id="option11">Sub-Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      expect(page.getByText('Option01').element()).toBeVisible()

      await userEvent.click(page.getByText('Option01'))

      await vi.waitFor(() => {
        expect(page.getByText('Option01').query()).not.toBeInTheDocument()
        expect(page.getByText('Sub-Option').element()).toBeVisible()
      })

      await userEvent.click(page.getByText('Back'))

      await vi.waitFor(() => {
        expect(page.getByText('Sub-Option').query()).not.toBeInTheDocument()
        expect(page.getByText('Option01').element()).toBeVisible()
      })
    })

    it('should prevent closing when shouldHideOnSelect is "false"', async () => {
      await render(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Toggle</button>}
          defaultShow
          shouldHideOnSelect={false}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option01</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      expect(page.getByText('Option01').element()).toBeVisible()

      await userEvent.click(page.getByText('Option01'))

      expect(page.getByText('Option01').element()).toBeVisible()
    })

    it('should be able to navigate between options with up/down arrows', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            {data.map((option) => (
              <Drilldown.Option id={option.id} key={option.id}>
                {option.label}
              </Drilldown.Option>
            ))}
          </Drilldown.Page>
        </Drilldown>
      )
      await focusMenu()

      await navPress('{ArrowDown}', 'opt_0')
      await navPress('{ArrowDown}', 'opt_1')
      await navPress('{ArrowDown}', 'opt_2')

      await navPress('{ArrowUp}', 'opt_1')

      expect(activeId()).toBe('opt_1')
    })

    it('should be able to navigate forward between pages with right arrow', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderTitle={'Page 0'}>
            <Drilldown.Option id="opt0" subPageId="page1">
              To Page 1
            </Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page id="page1" renderTitle={'Page 1'}>
            {[
              <Drilldown.Option key="opt5" id="opt5" subPageId="page2">
                To Page 2
              </Drilldown.Option>,
              ...renderOptions('page 1')
            ]}
          </Drilldown.Page>

          <Drilldown.Page id="page2" renderTitle="Page 2">
            {renderOptions('page 2')}
          </Drilldown.Page>
        </Drilldown>
      )
      await focusMenu()

      // the option which navigates to next page should be focused
      await navPress('{ArrowDown}', 'opt0')
      expect(document.activeElement).toHaveTextContent('To Page 1')

      // go to Page 1
      await userEvent.keyboard('{ArrowRight}')
      await vi.waitFor(() => expect(headerTitle()).toHaveTextContent('Page 1'))

      // focus takes a moment to land on the new page's menu
      await focusMenu()

      // on the Page 1 the 1st option is the `Back` button
      await userEvent.keyboard('{ArrowDown}')
      await vi.waitFor(() =>
        expect(document.activeElement).toHaveTextContent('Back')
      )

      // next arrowDown should skip the header Title and focus on 'To Page 2' option
      await navPress('{ArrowDown}', 'opt5')
      expect(document.activeElement).toHaveTextContent('To Page 2')

      // go to Page 2
      await userEvent.keyboard('{ArrowRight}')

      // on Page 2 the header title should be 'Page 2'
      await vi.waitFor(() => expect(headerTitle()).toHaveTextContent('Page 2'))
    })

    it('should be able to navigate back to previous page with left arrow', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderTitle={'Page 0'}>
            <Drilldown.Option id="opt0" subPageId="page1">
              To Page 1
            </Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page id="page1" renderTitle={'Page 1'}>
            {[
              <Drilldown.Option key="opt5" id="opt5" subPageId="page2">
                To Page 2
              </Drilldown.Option>,
              ...renderOptions('page 1')
            ]}
          </Drilldown.Page>

          <Drilldown.Page id="page2" renderTitle="Page 2">
            {renderOptions('page 2')}
          </Drilldown.Page>
        </Drilldown>
      )
      await focusMenu()

      // go to Page 1
      await navPress('{ArrowDown}', 'opt0')
      await userEvent.keyboard('{ArrowRight}')

      // on Page 1 should be visible header title
      await vi.waitFor(() => expect(headerTitle()).toHaveTextContent('Page 1'))

      // focus takes a moment to land on the new page's menu
      await focusMenu()

      // go to Page 0
      await userEvent.keyboard('{ArrowLeft}')

      // on Page 0 should be visible header title
      await vi.waitFor(() => expect(headerTitle()).toHaveTextContent('Page 0'))
    })

    it('should close the drilldown on root page and left arrow is pressed', async () => {
      await render(
        <Drilldown
          rootPageId="page0"
          trigger={<button>options</button>}
          defaultShow
        >
          <Drilldown.Page id="page0" renderTitle={'Page 0'}>
            <Drilldown.Option id="opt0" subPageId="page1">
              To Page 1
            </Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page id="page1" renderTitle={'Page 1'}>
            {[
              <Drilldown.Option key="opt5" id="opt5" subPageId="page2">
                To Page 2
              </Drilldown.Option>,
              ...renderOptions('page 1')
            ]}
          </Drilldown.Page>

          <Drilldown.Page id="page2" renderTitle="Page 2">
            {renderOptions('page 2')}
          </Drilldown.Page>
        </Drilldown>
      )
      await focusMenu()
      expect(headerTitle()).toHaveTextContent('Page 0')

      // on the root page ArrowLeft can only ever close the drilldown, so it is
      // safe to re-press it until it is gone
      await vi.waitFor(
        async () => {
          const menu = menuEl()

          if (menu) {
            if (!menu.contains(document.activeElement)) {
              menu.focus()
            }
            await userEvent.keyboard('{ArrowLeft}')
          }
          expect(headerTitle()).not.toBeInTheDocument()
          expect(menuEl()).not.toBeInTheDocument()
        },
        { timeout: 4000 }
      )
    })

    it('should correctly return focus when "trigger" and "shouldReturnFocus" is set', async () => {
      await render(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Options</button>}
          shouldReturnFocus
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option0">Option-0</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const trigger = page
        .getByRole('button', { name: 'Options' })
        .element() as HTMLElement

      // the focus can be taken away again right after mount, so make it stick
      await vi.waitFor(async () => {
        trigger.focus()
        await new Promise((resolve) => requestAnimationFrame(resolve))
        expect(document.activeElement).toBe(trigger)
      })
      expect(page.getByText('Option-0').query()).not.toBeInTheDocument()

      // Space toggles the drilldown, so only press it while it is still closed
      await vi.waitFor(
        async () => {
          if (!page.getByText('Option-0').query()) {
            await userEvent.keyboard(' ')
          }
          expect(page.getByText('Option-0').element()).toBeVisible()
        },
        { timeout: 4000 }
      )

      await vi.waitFor(
        async () => {
          if (page.getByText('Option-0').query()) {
            await userEvent.keyboard('{Escape}')
          }
          expect(page.getByText('Option-0').query()).not.toBeInTheDocument()
          expect(document.activeElement).toBe(trigger)
        },
        { timeout: 4000 }
      )
    })
  })
})
