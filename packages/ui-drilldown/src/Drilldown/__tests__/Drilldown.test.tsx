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

import { runAxeCheck } from '@instructure/ui-axe-check'
import { IconCheckSolid } from '@instructure/ui-icons'
import { Popover } from '@instructure/ui-popover'

import { Drilldown } from '../index'

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
      render(
        <Drilldown rootPageId="page1">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option-01</Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page id="page1">
            <Drilldown.Option id="option11">Option-11</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = screen.getByRole('menu')
      const options = screen.getAllByRole('menuitem')
      const rootlessOption = screen.queryByText('Option-01')

      expect(drilldown).toBeInTheDocument()
      expect(rootlessOption).not.toBeInTheDocument()

      expect(options.length).toBe(1)
      expect(options[0]).toHaveTextContent('Option-11')
      expect(options[0]).toHaveAttribute('id', 'option11')
    })
  })

  describe('children prop', () => {
    it('should not allow non-DrilldownPage children', async () => {
      render(
        <Drilldown rootPageId="page0">
          <div id="testDiv">DIV-child</div>
        </Drilldown>
      )

      const drilldown = screen.queryByRole('menu')
      const options = screen.queryAllByRole('menuitem')
      const notAllowedChild = screen.queryByText('DIV-child')

      expect(drilldown).not.toBeInTheDocument()
      expect(options.length).toBe(0)
      expect(notAllowedChild).not.toBeInTheDocument()
    })

    it('should not crash for weird option ids', async () => {
      const onSelect = vi.fn()
      const weirdID = 'some"_weird!@#$%^&*()\\|`id'
      render(
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
      const option_1 = screen.getByTestId(weirdID + 'opt_1')
      await userEvent.click(option_1)

      await waitFor(() => {
        expect(onSelect).toHaveBeenCalled()
      })
    })
  })

  describe('id prop', () => {
    it('should put id attr on the drilldown', async () => {
      render(
        <Drilldown rootPageId="page0" id="testId">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = screen.getByRole('menu')

      expect(drilldown).toBeInTheDocument()
      expect(drilldown).toHaveAttribute('id', 'testId')
    })
  })

  describe('label prop', () => {
    it('should be added as aria-label', async () => {
      render(
        <Drilldown rootPageId="page0" label="testLabel">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = screen.getByRole('menu')

      expect(drilldown).toBeInTheDocument()
      expect(drilldown).toHaveAttribute('aria-label', 'testLabel')
    })
  })

  describe('disabled prop', () => {
    it('should disable all options', async () => {
      render(
        <Drilldown rootPageId="page0" disabled>
          <Drilldown.Page id="page0" renderActionLabel="Action">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
            <Drilldown.Option id="option02">Option</Drilldown.Option>
            <Drilldown.Option id="option03">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const options = screen.getAllByRole('menuitem')

      expect(options.length).toBe(4) // header action + 3 options

      options.forEach((option) => {
        expect(option).toHaveAttribute('aria-disabled', 'true')
      })
    })

    it('should not allow selection if the main Drilldown is disabled', async () => {
      render(
        <Drilldown rootPageId="page0" disabled>
          <Drilldown.Page id="page0">
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

    it('should always allow back navigation even if the page is disabled', async () => {
      render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderTitle="First Page">
            <Drilldown.Option id="opt1" subPageId="page1">
              Go to Disabled Page
            </Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page id="page1" renderTitle="Disabled Page" disabled>
          </Drilldown.Page>
        </Drilldown>
      )
    
      // 1. Navigate to the disabled page
      await userEvent.click(screen.getByText('Go to Disabled Page'))
      expect(screen.getByText('Disabled Page')).toBeInTheDocument()
    
      await userEvent.click(screen.getByText('Back'))
    
      // 4. Verify we have successfully navigated back
      expect(screen.getByText('First Page')).toBeInTheDocument()
    })
  })

  describe('as prop', () => {
    it('should be "ul" by default', async () => {
      const { container } = render(
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
      const { container } = render(
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
      const { container } = render(
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
      const { container } = render(
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

      render(
        <Drilldown rootPageId="page0" elementRef={elementRef}>
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const drilldown = screen.getByRole('menu')

      expect(drilldown).toBeInTheDocument()
      expect(elementRef).toHaveBeenCalledWith(drilldown)
    })

    it('should give back the Popover root when drilldown has trigger and is closed', async () => {
      const elementRef = vi.fn()
      const { container } = render(
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
      const trigger = screen.getByText('Toggle')
      const positionId = trigger.getAttribute('data-position-target')
      const drilldownRoot = container.querySelector(
        `span[data-position="${positionId}"]`
      )

      expect(drilldownRoot).toBeInTheDocument()
      expect(elementRef).toHaveBeenCalledWith(drilldownRoot)
    })

    it('should give back the the Popover root when drilldown has trigger and is open', async () => {
      const elementRef = vi.fn()
      const { container } = render(
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
      const trigger = screen.getByText('Toggle')
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
      render(
        <Drilldown rootPageId="page0" drilldownRef={drilldownRef}>
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const drilldown = screen.getByRole('menu')

      expect(drilldownRef).toHaveBeenCalledWith(drilldown)
    })

    it("shouldn't be called when drilldown has trigger and is closed", async () => {
      const drilldownRef = vi.fn()
      render(
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
      render(
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
      const drilldown = screen.getByRole('menu')

      expect(drilldownRef).toHaveBeenCalledWith(drilldown)
    })
  })

  describe('popoverRef prop', () => {
    it('should not be called when there is no trigger', async () => {
      const popoverRef = vi.fn()
      render(
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
      const { container } = render(
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
      const trigger = screen.getByText('Toggle')
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
      const { container } = render(
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
      const trigger = screen.getByText('Toggle')
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
      render(
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
      const option_1 = screen.getByTestId('opt_1')

      await userEvent.click(option_1)

      await waitFor(() => {
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

        expect(event.target).toBe(option_1)
      })
    })

    it('should not fire when drilldown is disabled', async () => {
      const onSelect = vi.fn()
      render(
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
      const option_1 = screen.getByTestId('opt_1')

      await userEvent.click(option_1)

      await waitFor(() => {
        expect(onSelect).not.toHaveBeenCalled()
      })
    })
  })

  describe('with a trigger', () => {
    it('should not show content by default', async () => {
      render(
        <Drilldown rootPageId="page0" trigger={<button>click me</button>}>
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option0">Option 0</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option_0 = screen.queryByText('Option 0')

      expect(option_0).not.toBeInTheDocument()
    })

    it('should render into a mountNode', async () => {
      const container = document.createElement('div')
      container.setAttribute('data-testid', 'container')
      document.body.appendChild(container)

      render(
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
      const optionsContainer = screen.getByTestId('container')
      const trigger = screen.getByRole('button')

      expect(optionsContainer).not.toHaveTextContent('Option 0')

      await userEvent.click(trigger)

      await waitFor(() => {
        const updatedOptionsContainer = screen.getByTestId('container')

        expect(updatedOptionsContainer).toHaveTextContent('Option 0')
      })
    })

    it('should have an aria-haspopup attribute', async () => {
      render(
        <Drilldown rootPageId="page0" trigger={<button>Options</button>}>
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option0">Option 0</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const trigger = screen.getByRole('button')

      expect(trigger).toHaveAttribute('aria-haspopup')
    })

    it('should call onToggle when Drilldown is opened', async () => {
      const onToggle = vi.fn()
      render(
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
      const trigger = screen.getByRole('button')

      await userEvent.click(trigger)

      await waitFor(() => {
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
      render(
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
      const trigger = screen.getByRole('button')

      await userEvent.click(trigger)

      await waitFor(() => {
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
      render(
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
      render(
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
      const popoverContent = screen.getByText('Option')

      expect(popoverContent).toBeVisible()
    })
  })

  describe('show prop', () => {
    it('should display popover', async () => {
      const onToggle = vi.fn()
      render(
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
      const popoverContent = screen.getByText('Option')

      expect(popoverContent).toBeVisible()
    })

    it('should give error if onToggle is not provided (controllable)', async () => {
      render(
        <Drilldown rootPageId="page0" trigger={<button>Toggle</button>} show>
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const popoverContent = screen.getByText('Option')

      expect(popoverContent).toBeVisible()

      expect(popoverContent).toBeVisible()
      expect(consoleErrorMock).toHaveBeenCalled()
    })
  })

  describe('onFocus prop', () => {
    it('should be passed to Popover', async () => {
      let popoverRef: Popover | null = null
      const onFocus = vi.fn()
      render(
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
      render(
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
      render(
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
      render(
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
      render(
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
      render(
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
      render(
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
      render(
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
      const { container } = render(
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
              renderBeforeLabel={<IconCheckSolid />}
            >
              Item7
            </Drilldown.Option>
            <Drilldown.Option id="item08" renderAfterLabel={<IconCheckSolid />}>
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
      const { container } = render(
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
})
