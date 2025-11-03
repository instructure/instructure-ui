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

import { render, screen, fireEvent, act } from '@testing-library/react'
import { vi } from 'vitest'
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

  it('should not allow de-selecting an option when selectableType = "single"', () => {
    vi.useFakeTimers()
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

    fireEvent.click(selectedOption, { button: 0, detail: 1 })
    act(() => {
      vi.runAllTimers()
    })

    const updatedSelectedOption = screen.getByTestId('three')
    expect(updatedSelectedOption).toHaveAttribute('aria-checked', 'true')

    vi.useRealTimers()
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

    it('should not allow selection if the Drilldown.Group is disabled', () => {
      vi.useFakeTimers()
      render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0" selectableType="multiple" disabled>
              <Drilldown.Option id="opt1">Disabled Option</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )
      const optionItemContainer = screen.getByLabelText('Disabled Option')
      const optionContent = screen.getByText('Disabled Option')

      expect(optionItemContainer).toHaveAttribute('aria-checked', 'false')

      fireEvent.click(optionContent, { button: 0, detail: 1 })
      act(() => {
        vi.runAllTimers()
      })

      expect(optionItemContainer).toHaveAttribute('aria-checked', 'false')
      vi.useRealTimers()
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
    it('should fire "onSelect" callback', () => {
      vi.useFakeTimers()
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

      fireEvent.click(option2, { button: 0, detail: 1 })
      act(() => {
        vi.runAllTimers()
      })

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

      vi.useRealTimers()
    })
  })

  describe('selectedOptions', () => {
    it('should warn if selectableType="single" but multiple values are passed', () => {
      render(
        <Drilldown rootPageId="root">
          <Drilldown.Page id="root">
            <Drilldown.Group
              id="group-single"
              selectableType="single"
              selectedOptions={['a', 'b']}
            >
              <Drilldown.Option id="opt-a" value="a">
                A
              </Drilldown.Option>
              <Drilldown.Option id="opt-b" value="b">
                B
              </Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(consoleErrorMock).toHaveBeenCalledWith(
        expect.stringContaining(
          'Warning: Radio type selectable groups can have only one item selected!'
        ),
        expect.any(String)
      )
    })

    it('should prevent user selection if selectedOptions provided', () => {
      vi.useFakeTimers()
      render(
        <Drilldown rootPageId="root">
          <Drilldown.Page id="root">
            <Drilldown.Group
              id="controlled"
              selectableType="multiple"
              selectedOptions={['val-c-1']}
            >
              <Drilldown.Option id="item-c-1" value="val-c-1">
                C1
              </Drilldown.Option>
              <Drilldown.Option id="item-c-2" value="val-c-2">
                C2
              </Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )
      const options = screen.getAllByRole('menuitemcheckbox')

      expect(options[0]).toHaveAttribute('aria-checked', 'true')
      expect(options[1]).toHaveAttribute('aria-checked', 'false')

      fireEvent.click(screen.getByText('C2'), { button: 0, detail: 1 })
      act(() => {
        vi.runAllTimers()
      })

      expect(options[0]).toHaveAttribute('aria-checked', 'true')
      expect(options[1]).toHaveAttribute('aria-checked', 'false')
      vi.useRealTimers()
    })

    it('should preserve user changes in uncontrolled groups when selectedOptions props change', () => {
      vi.useFakeTimers()
      const { rerender } = render(
        <Drilldown rootPageId="root">
          <Drilldown.Page id="root">
            <Drilldown.Group
              id="controlled"
              selectableType="multiple"
              selectedOptions={['val-c-1']}
            >
              <Drilldown.Option id="c1" value="val-c-1">
                C1
              </Drilldown.Option>
              <Drilldown.Option id="c2" value="val-c-2">
                C2
              </Drilldown.Option>
            </Drilldown.Group>
            <Drilldown.Group
              id="default"
              selectableType="multiple"
              defaultSelected={['val-d-1']}
            >
              <Drilldown.Option id="d1" value="val-d-1">
                D1
              </Drilldown.Option>
              <Drilldown.Option id="d2" value="val-d-2">
                D2
              </Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )
      const options = screen.getAllByRole('menuitemcheckbox')

      expect(options[0]).toHaveAttribute('aria-checked', 'true') // C1 controlled
      expect(options[1]).toHaveAttribute('aria-checked', 'false') // C2 controlled
      expect(options[2]).toHaveAttribute('aria-checked', 'true') // D1 uncontrolled
      expect(options[3]).toHaveAttribute('aria-checked', 'false') // D2 uncontrolled

      // user changes uncontrolled group (select D2)
      fireEvent.click(screen.getByText('D2'), { button: 0, detail: 1 })
      act(() => {
        vi.runAllTimers()
      })
      expect(options[0]).toHaveAttribute('aria-checked', 'true') // C1 controlled
      expect(options[1]).toHaveAttribute('aria-checked', 'false') // C2 controlled
      expect(options[2]).toHaveAttribute('aria-checked', 'true') // D1 uncontrolled
      expect(options[3]).toHaveAttribute('aria-checked', 'true') // D2 uncontrolled

      // controlled selectedOptions prop changes
      rerender(
        <Drilldown rootPageId="root">
          <Drilldown.Page id="root">
            <Drilldown.Group
              id="controlled"
              selectableType="multiple"
              selectedOptions={['val-c-2']}
            >
              <Drilldown.Option id="c1" value="val-c-1">
                C1
              </Drilldown.Option>
              <Drilldown.Option id="c2" value="val-c-2">
                C2
              </Drilldown.Option>
            </Drilldown.Group>
            <Drilldown.Group
              id="default"
              selectableType="multiple"
              defaultSelected={['val-d-1']}
            >
              <Drilldown.Option id="d1" value="val-d-1">
                D1
              </Drilldown.Option>
              <Drilldown.Option id="d2" value="val-d-2">
                D2
              </Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )

      // controlled group updates, uncontrolled keeps user state
      expect(options[0]).toHaveAttribute('aria-checked', 'false') // C1 controlled
      expect(options[1]).toHaveAttribute('aria-checked', 'true') // C2 controlled
      expect(options[2]).toHaveAttribute('aria-checked', 'true') // D1 uncontrolled
      expect(options[3]).toHaveAttribute('aria-checked', 'true') // D2 uncontrolled
      vi.useRealTimers()
    })

    describe('Option selection hierarchy at initial render', () => {
      const TEST_ID = 'opt1'
      const renderSelectionTest = ({ groupProps = {}, optionProps = {} }) => {
        return render(
          <Drilldown rootPageId="root">
            <Drilldown.Page id="root">
              <Drilldown.Group
                id="group1"
                selectableType="multiple"
                {...groupProps}
              >
                <Drilldown.Option
                  id="opt1"
                  data-testid={TEST_ID}
                  {...optionProps}
                >
                  The option being tested
                </Drilldown.Option>
              </Drilldown.Group>
            </Drilldown.Page>
          </Drilldown>
        )
      }

      it('should set correctly when option in selectedOptions prop, in group default prop, option default=false', () => {
        renderSelectionTest({
          groupProps: {
            selectedOptions: ['val1'],
            defaultSelected: ['val1']
          },
          optionProps: { value: 'val1', defaultSelected: false }
        })
        expect(screen.getByTestId(TEST_ID)).toHaveAttribute(
          'aria-checked',
          'true'
        ) // selectedOptions prop wins
      })

      it('should set correctly when option in selectedOptions prop, not in group default prop, option default=false', () => {
        renderSelectionTest({
          groupProps: {
            selectedOptions: ['val1'],
            defaultSelected: ['x']
          },
          optionProps: { value: 'val1', defaultSelected: false }
        })
        expect(screen.getByTestId(TEST_ID)).toHaveAttribute(
          'aria-checked',
          'true'
        ) // selectedOptions prop wins
      })

      it('should set correctly when option not in selectedOptions prop, in group default prop, option default=false', () => {
        renderSelectionTest({
          groupProps: {
            selectedOptions: ['x'],
            defaultSelected: ['val1']
          },
          optionProps: { value: 'val1', defaultSelected: false }
        })
        expect(screen.getByTestId(TEST_ID)).toHaveAttribute(
          'aria-checked',
          'false'
        ) // selectedOptions prop wins
      })

      it('should set correctly when option not in selectedOptions prop, not in group default prop, option default=true', () => {
        renderSelectionTest({
          groupProps: {
            selectedOptions: ['x'],
            defaultSelected: ['x']
          },
          optionProps: { value: 'val1', defaultSelected: true }
        })
        expect(screen.getByTestId(TEST_ID)).toHaveAttribute(
          'aria-checked',
          'false'
        ) // selectedOptions prop wins
      })

      it('should set correctly when option controlled prop not exist, in group default prop, option default=false)', () => {
        renderSelectionTest({
          groupProps: {
            defaultSelected: ['val1']
          },
          optionProps: { value: 'val1', defaultSelected: false }
        })
        expect(screen.getByTestId(TEST_ID)).toHaveAttribute(
          'aria-checked',
          'false'
        ) // option default wins
      })

      it('should set correctly when option controlled prop not exist, not in group default prop, option default=true', () => {
        renderSelectionTest({
          groupProps: {
            defaultSelected: ['x']
          },
          optionProps: { value: 'val1', defaultSelected: true }
        })
        expect(screen.getByTestId(TEST_ID)).toHaveAttribute(
          'aria-checked',
          'true'
        ) // option default wins
      })

      it('should set correctly when option in selectedOptions prop, group default not exist, option default=false', () => {
        renderSelectionTest({
          groupProps: {
            selectedOptions: ['val1']
          },
          optionProps: { value: 'val1', defaultSelected: false }
        })
        expect(screen.getByTestId(TEST_ID)).toHaveAttribute(
          'aria-checked',
          'true'
        ) // selectedOptions prop wins
      })

      it('should set correctly when option not in selectedOptions prop, group default not exist, option default=true', () => {
        renderSelectionTest({
          groupProps: {
            selectedOptions: ['x']
          },
          optionProps: { value: 'val1', defaultSelected: true }
        })
        expect(screen.getByTestId(TEST_ID)).toHaveAttribute(
          'aria-checked',
          'false'
        ) // selectedOptions prop wins
      })

      it('should set correctly when option in selectedOptions prop, not in group default prop, option default not exist', () => {
        renderSelectionTest({
          groupProps: {
            selectedOptions: ['val1'],
            defaultSelected: ['x']
          },
          optionProps: { value: 'val1' }
        })
        expect(screen.getByTestId(TEST_ID)).toHaveAttribute(
          'aria-checked',
          'true'
        ) // selectedOptions prop wins
      })

      it('should set correctly when option not in selectedOptions prop, in group default prop, option default not exist', () => {
        renderSelectionTest({
          groupProps: {
            selectedOptions: ['x'],
            defaultSelected: ['val1']
          },
          optionProps: { value: 'val1' }
        })
        expect(screen.getByTestId(TEST_ID)).toHaveAttribute(
          'aria-checked',
          'false'
        ) // selectedOptions prop wins
      })

      describe('When the selectedOptions prop changes', () => {
        const TEST_ID_1 = 'opt1'
        const TEST_ID_2 = 'opt2'
        const TEST_ID_3 = 'opt3'
        const getDrilldownComponent = ({
          groupProps = {},
          option_1_Props = {},
          option_2_Props = {},
          option_3_Props = {}
        }) => (
          <Drilldown rootPageId="root">
            <Drilldown.Page id="root">
              <Drilldown.Group
                id="group1"
                selectableType="multiple"
                {...groupProps}
              >
                <Drilldown.Option
                  id="opt1"
                  data-testid={TEST_ID_1}
                  {...option_1_Props}
                >
                  Option 1
                </Drilldown.Option>
                <Drilldown.Option
                  id="opt2"
                  data-testid={TEST_ID_2}
                  {...option_2_Props}
                >
                  Option 2
                </Drilldown.Option>
                <Drilldown.Option
                  id="opt3"
                  data-testid={TEST_ID_3}
                  {...option_3_Props}
                >
                  Option 2
                </Drilldown.Option>
              </Drilldown.Group>
            </Drilldown.Page>
          </Drilldown>
        )

        it('should overwrite previous selectedOptions prop selections', () => {
          const { rerender } = render(
            getDrilldownComponent({
              groupProps: {
                selectedOptions: ['val1', 'val2']
              },
              option_1_Props: { value: 'val1' },
              option_2_Props: { value: 'val2' },
              option_3_Props: { value: 'val3' }
            })
          )

          expect(screen.getByTestId(TEST_ID_1)).toHaveAttribute(
            'aria-checked',
            'true'
          )
          expect(screen.getByTestId(TEST_ID_2)).toHaveAttribute(
            'aria-checked',
            'true'
          )
          expect(screen.getByTestId(TEST_ID_3)).toHaveAttribute(
            'aria-checked',
            'false'
          )

          rerender(
            getDrilldownComponent({
              groupProps: {
                selectedOptions: ['val3']
              },
              option_1_Props: { value: 'val1' },
              option_2_Props: { value: 'val2' },
              option_3_Props: { value: 'val3' }
            })
          )

          expect(screen.getByTestId(TEST_ID_1)).toHaveAttribute(
            'aria-checked',
            'false'
          )
          expect(screen.getByTestId(TEST_ID_2)).toHaveAttribute(
            'aria-checked',
            'false'
          )
          expect(screen.getByTestId(TEST_ID_3)).toHaveAttribute(
            'aria-checked',
            'true'
          )
        })

        it('should overwrite group default selection and option default selection', () => {
          const { rerender } = render(
            getDrilldownComponent({
              groupProps: {
                selectedOptions: ['val1'],
                defaultSelected: ['val2']
              },
              option_1_Props: { value: 'val1' },
              option_2_Props: { value: 'val2' },
              option_3_Props: { value: 'val3', defaultSelected: true }
            })
          )

          expect(screen.getByTestId(TEST_ID_1)).toHaveAttribute(
            'aria-checked',
            'true'
          )
          expect(screen.getByTestId(TEST_ID_2)).toHaveAttribute(
            'aria-checked',
            'false'
          )
          expect(screen.getByTestId(TEST_ID_3)).toHaveAttribute(
            'aria-checked',
            'false'
          )

          // Set prop: selectedOptions
          rerender(
            getDrilldownComponent({
              groupProps: {
                selectedOptions: [],
                defaultSelected: ['val2']
              },
              option_1_Props: { value: 'val1' },
              option_2_Props: { value: 'val2' },
              option_3_Props: { value: 'val3', defaultSelected: true }
            })
          )

          expect(screen.getByTestId(TEST_ID_1)).toHaveAttribute(
            'aria-checked',
            'false'
          )
          expect(screen.getByTestId(TEST_ID_2)).toHaveAttribute(
            'aria-checked',
            'false'
          )
          expect(screen.getByTestId(TEST_ID_3)).toHaveAttribute(
            'aria-checked',
            'false'
          )
        })

        it('should overwrite group default selection and option default selection when selectedOptions provided', () => {
          const { rerender } = render(
            getDrilldownComponent({
              groupProps: {
                defaultSelected: ['val2']
              },
              option_1_Props: { value: 'val1' },
              option_2_Props: { value: 'val2' },
              option_3_Props: { value: 'val3', defaultSelected: true }
            })
          )

          expect(screen.getByTestId(TEST_ID_1)).toHaveAttribute(
            'aria-checked',
            'false'
          )
          expect(screen.getByTestId(TEST_ID_2)).toHaveAttribute(
            'aria-checked',
            'true'
          )
          expect(screen.getByTestId(TEST_ID_3)).toHaveAttribute(
            'aria-checked',
            'true'
          )

          // Set new prop: selectedOptions
          rerender(
            getDrilldownComponent({
              groupProps: {
                selectedOptions: [],
                defaultSelected: ['val2']
              },
              option_1_Props: { value: 'val1' },
              option_2_Props: { value: 'val2' },
              option_3_Props: { value: 'val3', defaultSelected: true }
            })
          )

          expect(screen.getByTestId(TEST_ID_1)).toHaveAttribute(
            'aria-checked',
            'false'
          )
          expect(screen.getByTestId(TEST_ID_2)).toHaveAttribute(
            'aria-checked',
            'false'
          )
          expect(screen.getByTestId(TEST_ID_3)).toHaveAttribute(
            'aria-checked',
            'false'
          )
        })
      })
    })
  })
})
