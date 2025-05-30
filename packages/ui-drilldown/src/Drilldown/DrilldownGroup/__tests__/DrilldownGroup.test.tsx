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

describe('<Drilldown.Group />', () => {
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

  it('should not allow de-selecting an option when selectableType = "single"', async () => {
    const options = ['one', 'two', 'three']
    const Example = ({ opts }: { opts: typeof options }) => {
      return (
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0" selectableType="single">
              {opts.map((opt) => {
                return (
                  <Drilldown.Option
                    key={opt}
                    value={opt}
                    name={opt}
                    id={opt}
                    defaultSelected={opt === 'three'}
                    data-testid={opt}
                  >
                    {opt}
                  </Drilldown.Option>
                )
              })}
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )
    }

    render(<Example opts={options} />)

    const selectedOption = screen.getByTestId('three')

    expect(selectedOption).toHaveAttribute('aria-checked', 'true')

    await userEvent.click(selectedOption)

    await waitFor(() => {
      const updatedSelectedOption = screen.getByTestId('three')

      expect(updatedSelectedOption).toHaveAttribute('aria-checked', 'true')
    })
  })

  it("shouldn't render non-DrilldownGroup children", async () => {
    render(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0">
          <Drilldown.Group id="group0">
            <div data-testid="testDiv">Div</div>
          </Drilldown.Group>
        </Drilldown.Page>
      </Drilldown>
    )
    const nonGroupChild = screen.queryByTestId('testDiv')
    const childText = screen.queryByText('Div')

    expect(nonGroupChild).not.toBeInTheDocument()
    expect(childText).not.toBeInTheDocument()
  })

  it('elementRef should return ref to the group', async () => {
    const elementRef = vi.fn()
    const { container } = render(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0">
          <Drilldown.Group id="group0" elementRef={elementRef}>
            <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
          </Drilldown.Group>
        </Drilldown.Page>
      </Drilldown>
    )
    const group = container.querySelector('#group0')

    expect(elementRef).toHaveBeenCalledWith(group)
  })

  describe('renderGroupTitle', () => {
    it('should display', async () => {
      render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0" renderGroupTitle="Group Title">
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )
      const title = screen.getByText('Group Title')

      expect(title).toBeInTheDocument()
    })

    it('should display, if function is provided', async () => {
      render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0" renderGroupTitle={() => 'Group Title'}>
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )
      const title = screen.getByText('Group Title')

      expect(title).toBeInTheDocument()
    })
  })

  describe('separators', () => {
    it("shouldn't display, when group is first and/or last item", async () => {
      const { container } = render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0">
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )
      const separators = container.querySelectorAll('[class$="-separator"]')

      expect(separators.length).toBe(0)
    })

    it('should display by default, if group is between other items', async () => {
      const { container } = render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1">Option</Drilldown.Option>
            <Drilldown.Group id="group0">
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
            </Drilldown.Group>
            <Drilldown.Option id="option2">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const separators = container.querySelectorAll('[class$="-separator"]')

      expect(separators.length).toBe(2)
    })

    it("shouldn't display extra separator between groups", async () => {
      const { container } = render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1">Option</Drilldown.Option>
            <Drilldown.Group id="group0">
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
            </Drilldown.Group>
            <Drilldown.Group id="group1">
              <Drilldown.Option id="groupOption11">Option</Drilldown.Option>
            </Drilldown.Group>
            <Drilldown.Option id="option2">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const separators = container.querySelectorAll('[class$="-separator"]')

      expect(separators.length).toBe(3)
    })
  })

  describe('disabled prop', () => {
    it('should disable all items in the group', async () => {
      const { container } = render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1">Option</Drilldown.Option>
            <Drilldown.Group id="group0" disabled>
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
              <Drilldown.Option id="groupOption02">Option</Drilldown.Option>
            </Drilldown.Group>
            <Drilldown.Option id="option2">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const disabledOption_1 = container.querySelector('#groupOption01')
      const disabledOption_2 = container.querySelector('#groupOption02')
      const option_1 = container.querySelector('#option1')
      const option_2 = container.querySelector('#option2')

      expect(disabledOption_1).toHaveAttribute('aria-disabled', 'true')
      expect(disabledOption_2).toHaveAttribute('aria-disabled', 'true')
      expect(option_1).not.toHaveAttribute('aria-disabled')
      expect(option_2).not.toHaveAttribute('aria-disabled')
    })
  })

  describe('role prop', () => {
    it('should be "group" by default', async () => {
      const { container } = render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0">
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
              <Drilldown.Option id="groupOption02">Option</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )
      const group = container.querySelector('#group0')

      expect(group).toHaveAttribute('role', 'group')
    })

    it('should render the group with passed role', async () => {
      const { container } = render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0" role="menu">
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
              <Drilldown.Option id="groupOption02">Option</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )
      const group = container.querySelector('#group0')

      expect(group).toHaveAttribute('role', 'menu')
    })
  })

  describe('as prop', () => {
    it('should inherit Drilldown\'s "ul" by default', async () => {
      const { container } = render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0">
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
              <Drilldown.Option id="groupOption02">Option</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )
      const drilldownContainer = container.querySelector(
        '[id^=Selectable_][id$=-list]'
      )!
      const group = container.querySelector('#group0')!

      expect(drilldownContainer.tagName).toBe('UL')
      expect(group.tagName).toBe('UL')
    })

    it('should inherit Drilldown\'s "as" prop', async () => {
      const { container } = render(
        <Drilldown rootPageId="page0" as="ol">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0">
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
              <Drilldown.Option id="groupOption02">Option</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )
      const drilldownContainer = container.querySelector(
        '[id^=Selectable_][id$=-list]'
      )!
      const group = container.querySelector('#group0')!

      expect(drilldownContainer.tagName).toBe('OL')
      expect(group.tagName).toBe('OL')
    })

    it('should render the group as other element', async () => {
      const { container } = render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0" as="ol">
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
              <Drilldown.Option id="groupOption02">Option</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )
      const drilldownContainer = container.querySelector(
        '[id^=Selectable_][id$=-list]'
      )!
      const group = container.querySelector('#group0')!

      expect(drilldownContainer.tagName).toBe('UL')
      expect(group.tagName).toBe('OL')
    })
  })

  describe('selectableType', () => {
    it('if not set, should render role="menuitem" options without icon by default', async () => {
      const { container } = render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0">
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )
      const icon = container.querySelector('svg[name="IconCheck"]')
      const groupOption = container.querySelector('#groupOption01')

      expect(icon).not.toBeInTheDocument()
      expect(groupOption).toHaveAttribute('role', 'menuitem')
    })

    it('value "single" should render role="menuitemradio" options with icon', async () => {
      const { container } = render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0" selectableType="single">
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )
      const icon = container.querySelector('svg[name="IconCheck"]')
      const groupOption = container.querySelector('#groupOption01')

      expect(icon).toBeInTheDocument()
      expect(groupOption).toHaveAttribute('role', 'menuitemradio')
    })

    it('value "multiple" should render role="menuitemcheckbox" options with icon', async () => {
      const { container } = render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0" selectableType="multiple">
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )
      const icon = container.querySelector('svg[name="IconCheck"]')
      const groupOption = container.querySelector('#groupOption01')

      expect(icon).toBeInTheDocument()
      expect(groupOption).toHaveAttribute('role', 'menuitemcheckbox')
    })
  })

  describe('defaultSelected', () => {
    describe('if not provided', () => {
      it('all group options has to be unselected', async () => {
        render(
          <Drilldown rootPageId="page0">
            <Drilldown.Page id="page0">
              <Drilldown.Group id="group0" selectableType="multiple">
                <Drilldown.Option id="groupOption01" value={1}>
                  Option
                </Drilldown.Option>
                <Drilldown.Option id="groupOption02" value={2}>
                  Option
                </Drilldown.Option>
                <Drilldown.Option id="groupOption03" value={3}>
                  Option
                </Drilldown.Option>
              </Drilldown.Group>
            </Drilldown.Page>
          </Drilldown>
        )
        const options = screen.getAllByRole('menuitemcheckbox')
        expect(options.length).toBe(3)

        options.forEach((option) => {
          expect(option).toHaveAttribute('aria-checked', 'false')
        })
      })

      it('all checkboxes should not be visible', async () => {
        const { container } = render(
          <Drilldown rootPageId="page0">
            <Drilldown.Page id="page0">
              <Drilldown.Group id="group0" selectableType="multiple">
                <Drilldown.Option id="groupOption01" value={1}>
                  Option
                </Drilldown.Option>
                <Drilldown.Option id="groupOption02" value={2}>
                  Option
                </Drilldown.Option>
                <Drilldown.Option id="groupOption03" value={3}>
                  Option
                </Drilldown.Option>
              </Drilldown.Group>
            </Drilldown.Page>
          </Drilldown>
        )
        const icons = container.querySelectorAll('svg[name="IconCheck"]')

        expect(icons.length).toBe(3)

        icons.forEach((icon) => {
          expect(icon).not.toBeVisible()
        })
      })
    })

    describe('if provided', () => {
      it('all selected checkboxes should be visible', async () => {
        const selectedValues = ['item1', 'item3']
        const { container } = render(
          <Drilldown rootPageId="page0">
            <Drilldown.Page id="page0">
              <Drilldown.Group
                id="group0"
                selectableType="multiple"
                defaultSelected={selectedValues}
              >
                <Drilldown.Option id="groupOption01" value="item1">
                  Option
                </Drilldown.Option>
                <Drilldown.Option id="groupOption02" value="item2">
                  Option
                </Drilldown.Option>
                <Drilldown.Option id="groupOption03" value="item3">
                  Option
                </Drilldown.Option>
              </Drilldown.Group>
            </Drilldown.Page>
          </Drilldown>
        )
        const options = screen.getAllByRole('menuitemcheckbox')
        const icons = container.querySelectorAll('svg')

        expect(options[0]).toHaveAttribute('aria-checked', 'true')
        expect(options[1]).toHaveAttribute('aria-checked', 'false')
        expect(options[2]).toHaveAttribute('aria-checked', 'true')

        expect(icons[0]).toBeVisible()
        expect(icons[1]).not.toBeVisible()
        expect(icons[2]).toBeVisible()
      })

      it("should be overridden by the Option's own defaultSelected", async () => {
        const selectedValues = ['item1', 'item3']
        render(
          <Drilldown rootPageId="page0">
            <Drilldown.Page id="page0">
              <Drilldown.Group
                id="group0"
                selectableType="multiple"
                defaultSelected={selectedValues}
              >
                <Drilldown.Option id="groupOption01" value="item1">
                  Option
                </Drilldown.Option>
                <Drilldown.Option
                  id="groupOption02"
                  value="item2"
                  defaultSelected={true}
                >
                  Option
                </Drilldown.Option>
                <Drilldown.Option
                  id="groupOption03"
                  value="item3"
                  defaultSelected={false}
                >
                  Option
                </Drilldown.Option>
              </Drilldown.Group>
            </Drilldown.Page>
          </Drilldown>
        )
        const options = screen.getAllByRole('menuitemcheckbox')

        expect(options[0]).toHaveAttribute('aria-checked', 'true') // from the group,
        expect(options[1]).toHaveAttribute('aria-checked', 'true') // from own prop,
        expect(options[2]).toHaveAttribute('aria-checked', 'false') // override group's
      })

      describe('for "single" selectableType', () => {
        it('the selected option should be checked', async () => {
          const selectedValues = ['item2']
          render(
            <Drilldown rootPageId="page0">
              <Drilldown.Page id="page0">
                <Drilldown.Group
                  id="group0"
                  selectableType="single"
                  defaultSelected={selectedValues}
                >
                  <Drilldown.Option id="groupOption01" value="item1">
                    Option
                  </Drilldown.Option>
                  <Drilldown.Option id="groupOption02" value="item2">
                    Option
                  </Drilldown.Option>
                  <Drilldown.Option id="groupOption03" value="item3">
                    Option
                  </Drilldown.Option>
                </Drilldown.Group>
              </Drilldown.Page>
            </Drilldown>
          )
          const options = screen.getAllByRole('menuitemradio')

          expect(options[0]).toHaveAttribute('aria-checked', 'false')
          expect(options[1]).toHaveAttribute('aria-checked', 'true')
          expect(options[2]).toHaveAttribute('aria-checked', 'false')
        })

        it("should throw error if multiple items are selected, and shouldn't select any item", async () => {
          const selectedValues = ['item1', 'item3']
          render(
            <Drilldown rootPageId="page0">
              <Drilldown.Page id="page0">
                <Drilldown.Group
                  id="group0"
                  selectableType="single"
                  defaultSelected={selectedValues}
                >
                  <Drilldown.Option id="groupOption01" value="item1">
                    Option
                  </Drilldown.Option>
                  <Drilldown.Option id="groupOption02" value="item2">
                    Option
                  </Drilldown.Option>
                  <Drilldown.Option id="groupOption03" value="item3">
                    Option
                  </Drilldown.Option>
                </Drilldown.Group>
              </Drilldown.Page>
            </Drilldown>
          )
          const options = screen.getAllByRole('menuitemradio')

          expect(options[0]).toHaveAttribute('aria-checked', 'false')
          expect(options[1]).toHaveAttribute('aria-checked', 'false')
          expect(options[2]).toHaveAttribute('aria-checked', 'false')

          expect(consoleErrorMock).toHaveBeenCalled()
        })
      })
    })
  })

  describe('selection', () => {
    it('should fire "onSelect" callback', async () => {
      const onSelect = vi.fn()
      render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group
              id="group0"
              selectableType="multiple"
              onSelect={onSelect}
            >
              <Drilldown.Option id="groupOption01" value="item1">
                Option 1
              </Drilldown.Option>
              <Drilldown.Option id="groupOption02" value="item2">
                Option 2
              </Drilldown.Option>
              <Drilldown.Option id="groupOption03" value="item3">
                Option 3
              </Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )
      const option2 = screen.getByText('Option 2')

      await userEvent.click(option2)

      await waitFor(() => {
        expect(onSelect).toHaveBeenCalledTimes(1)

        const args = onSelect.mock.calls[0][1]
        const event = onSelect.mock.calls[0][0]

        expect(args).toHaveProperty('value', ['item2'])
        expect(args).toHaveProperty('isSelected', true)

        expect(args.selectedOption).toBeInstanceOf(Object)
        expect(args.selectedOption.props).toHaveProperty('id', 'groupOption02')
        expect(args.selectedOption.props).toHaveProperty('value', 'item2')

        expect(args.drilldown).toBeInstanceOf(Object)
        expect(args.drilldown.props).toHaveProperty('role', 'menu')
        expect(args.drilldown.hide).toBeInstanceOf(Function)

        expect(event.target).toBe(option2)
      })
    })
  })
})
