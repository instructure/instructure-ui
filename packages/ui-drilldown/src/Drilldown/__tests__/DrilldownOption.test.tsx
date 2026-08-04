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
import { page, userEvent } from 'vitest/browser'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import { CheckInstUIIcon } from '@instructure/ui-icons'

import { Drilldown } from '@instructure/ui-drilldown/latest'

describe('<Drilldown.Option />', () => {
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

  it('should allow setting "selected" property on Options', async () => {
    await render(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0">
          <Drilldown.Group id="group0">
            <Drilldown.Option id="groupOption01">Option - 1</Drilldown.Option>
            <Drilldown.Option selected id="groupOption02">
              Option - 2
            </Drilldown.Option>
            <Drilldown.Option id="groupOption03">Option - 3</Drilldown.Option>
            <Drilldown.Option id="groupOption04">Option - 4</Drilldown.Option>
          </Drilldown.Group>
        </Drilldown.Page>
      </Drilldown>
    )
    const selectedOption = page.getByLabelText('Option - 2').element()

    expect(selectedOption).toBeInTheDocument()
    expect(selectedOption).toHaveAttribute('id', 'groupOption02')
    expect(selectedOption).toHaveAttribute('aria-checked', 'true')
  })

  describe('id prop', () => {
    it('should throw warning the id is not provided', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            {/* @ts-expect-error: Testing behavior when `id` is missing */}
            <Drilldown.Option>Option1</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const expectedErrorMessage =
        "Warning: Drilldown.Option without id won't be rendered. It is needed to internally track the options."

      expect(consoleWarningMock).toHaveBeenCalledWith(
        expect.stringContaining(expectedErrorMessage),
        expect.any(String)
      )
    })

    it('should throw warning the id is duplicated', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1">Option1</Drilldown.Option>
            <Drilldown.Option id="option1">Option2</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const expectedErrorMessage =
        'Warning: Duplicate id: "option1"! Make sure all options have unique ids, otherwise they won\'t be rendered.'

      expect(consoleWarningMock).toHaveBeenCalledWith(
        expect.stringContaining(expectedErrorMessage),
        expect.any(String)
      )
    })

    it('should not render the options with duplicated id', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1">Option1</Drilldown.Option>
            <Drilldown.Option id="option1">Option2</Drilldown.Option>
            <Drilldown.Option id="option1">Option3</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const menuitems = page.getByRole('menuitem').elements()
      const option = page.getByText('Option2').query()

      expect(menuitems.length).toBe(0)
      expect(option).not.toBeInTheDocument()
    })
  })

  describe('children function prop', () => {
    it('should throw warning if it returns nothing', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1">{() => null}</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const expectedErrorMessage =
        'Warning: There are no "children" prop provided for option with id: "option1", so it won\'t be rendered.'

      expect(consoleWarningMock).toHaveBeenCalledWith(
        expect.stringContaining(expectedErrorMessage),
        expect.any(String)
      )
    })

    it('should provide props as parameters', async () => {
      const childrenFunction = vi.fn(() => 'Option')

      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1">{childrenFunction}</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(childrenFunction).toHaveBeenCalledWith({
        id: 'option1',
        variant: 'default',
        isSelected: false
      })
    })
  })

  describe('elementRef prop', () => {
    it('should give back to ref for the option wrapper (Options.Item)', async () => {
      const elementRef = vi.fn()
      const { container } = await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" elementRef={elementRef}>
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option = container.querySelector('li')

      expect(elementRef).toHaveBeenCalledWith(option)
    })
  })

  describe('subPageId prop', () => {
    it('should display arrow icon', async () => {
      const { container } = await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" subPageId="page1">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const icon = container.querySelector('svg')

      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute('name', 'ChevronRight')
    })

    it('should indicate subpage fo SR', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" subPageId="page1">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option = page.getByLabelText('Option').element()

      expect(option).toHaveAttribute('role', 'menuitem')
      expect(option).toHaveAttribute('aria-haspopup', 'true')
    })
  })

  describe('disabled prop', () => {
    it('should mark option as disabled for SR', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" disabled>
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option = page.getByLabelText('Option').element()

      expect(option).toHaveAttribute('aria-disabled', 'true')
    })

    it('should not allow selection if the Drilldown.Option itself is disabled', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0" selectableType="multiple">
              <Drilldown.Option id="opt1" disabled>
                Disabled Option
              </Drilldown.Option>
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
  })

  describe('href prop', () => {
    it('should display option as link', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" href="/helloWorld">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option = page.getByLabelText('Option').element()

      expect(option.tagName).toBe('A')
      expect(option).toHaveAttribute('href', '/helloWorld')
    })

    it('should throw warning if subPageId is provided too', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" href="/helloWorld" subPageId="page1">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option = page.getByLabelText('Option').element()
      const expectedErrorMessage =
        'Warning: Drilldown.Option with id "option1" has subPageId, so it will ignore the "href" property.'

      expect(consoleWarningMock).toHaveBeenCalledWith(
        expect.stringContaining(expectedErrorMessage),
        expect.any(String)
      )

      expect(option.tagName).not.toBe('A')
      expect(option).not.toHaveAttribute('href')
    })

    it('should throw warning if option is in selectable group', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0" selectableType="multiple">
              <Drilldown.Option id="groupOption01" href="/helloWorld">
                Option
              </Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )
      const option = page.getByLabelText('Option').element()
      const expectedErrorMessage =
        'Warning: Drilldown.Option with id "groupOption01" is in a selectable group, so it will ignore the "href" property.'

      expect(consoleWarningMock).toHaveBeenCalledWith(
        expect.stringContaining(expectedErrorMessage),
        expect.any(String)
      )

      expect(option.tagName).not.toBe('A')
      expect(option).not.toHaveAttribute('href')
    })
  })

  describe('as prop', () => {
    it('should render option as `li` by default', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option = page.getByLabelText('Option').element()
      const wrapper = option.parentElement

      expect(option).toHaveAttribute('id', 'option1')
      expect(wrapper?.tagName).toBe('LI')
    })

    it('should force option to be `li` while the parent is "ul" or "ol"', async () => {
      await render(
        <Drilldown rootPageId="page0" as="ol">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" as="div">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option = page.getByLabelText('Option').element()
      const wrapper = option.parentElement

      expect(option).toHaveAttribute('id', 'option1')
      expect(wrapper?.tagName).toBe('LI')
    })

    it('should render option as specified html element, when the parent in non-list element', async () => {
      await render(
        <Drilldown rootPageId="page0" as="div">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" as="div">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option = page.getByLabelText('Option').element()
      const wrapper = option.parentElement

      expect(option).toHaveAttribute('id', 'option1')
      expect(wrapper?.tagName).toBe('DIV')
    })
  })

  describe('role prop', () => {
    it('should be "menuitem" by default', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option = page.getByLabelText('Option').element()

      expect(option).toHaveAttribute('role', 'menuitem')
    })

    it('should be applied on prop', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" role="presentation">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option = page.getByLabelText('Option').element()

      expect(option).toHaveAttribute('role', 'presentation')
    })
  })

  describe('renderLabelInfo prop', () => {
    it('should display tag next to the label', async () => {
      const { container } = await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" renderLabelInfo="Info">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const tag = container.querySelector('[class$="optionLabelInfo"]')

      expect(tag).toBeInTheDocument()
      expect(tag).toHaveTextContent('Info')
    })

    it('as function should have option props as params', async () => {
      const infoFunction = vi.fn(() => 'Info')
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" renderLabelInfo={infoFunction}>
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(infoFunction).toHaveBeenCalledWith({
        variant: 'default',
        vAlign: 'start',
        as: 'li',
        role: 'menuitem',
        isSelected: false
      })
    })
  })

  describe('renderBeforeLabel prop', () => {
    it('should display icon before the label', async () => {
      const { container } = await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option
              id="option1"
              renderBeforeLabel={<CheckInstUIIcon />}
            >
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const icon = container.querySelector('svg')

      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute('name', 'Check')
    })

    it('as function should have option props as params', async () => {
      const beforeLabelFunction = vi.fn(() => <CheckInstUIIcon />)
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option
              id="option1"
              renderBeforeLabel={beforeLabelFunction}
            >
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(beforeLabelFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          variant: 'default',
          vAlign: 'start',
          as: 'li',
          role: 'menuitem',
          isSelected: false
        }),
        expect.any(Object)
      )
    })

    it('should throw warning if it is in selectable group', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group1" selectableType="multiple">
              <Drilldown.Option id="groupOption1" renderBeforeLabel="Before">
                Option
              </Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )
      const expectedErrorMessage =
        'Warning: The prop "renderBeforeLabel" is reserved on item with id: "groupOption1". When this option is a selectable member of a Drilldown.Group, selection indicator will render before the label.'

      expect(consoleWarningMock).toHaveBeenCalledWith(
        expect.stringContaining(expectedErrorMessage),
        expect.any(String)
      )
    })
  })

  describe('renderAfterLabel prop', () => {
    it('should display icon before the label', async () => {
      const { container } = await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option
              id="option1"
              renderAfterLabel={<CheckInstUIIcon />}
            >
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const icon = container.querySelector('svg')

      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute('name', 'Check')
    })

    it('as function should have option props as params', async () => {
      const beforeLabelFunction = vi.fn(() => <CheckInstUIIcon />)
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option
              id="option1"
              renderAfterLabel={beforeLabelFunction}
            >
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(beforeLabelFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          variant: 'default',
          vAlign: 'start',
          as: 'li',
          role: 'menuitem',
          isSelected: false
        }),
        expect.any(Object)
      )
    })

    it('should throw warning if it has subPageId', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option
              id="option1"
              subPageId="page1"
              renderAfterLabel="after"
            >
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const expectedErrorMessage =
        'Warning: The prop "renderAfterLabel" is reserved on item with id: "option1". When it has "subPageId" provided, a navigation arrow will render after the label.'

      expect(consoleWarningMock).toHaveBeenCalledWith(
        expect.stringContaining(expectedErrorMessage),
        expect.any(String)
      )
    })
  })

  describe('description prop', () => {
    it('should display description under the option', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" description="This is a description.">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const description = page.getByText('This is a description.').element()

      expect(description).toBeInTheDocument()
    })

    it('as a function should display description under the option', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option
              id="option1"
              description={() => 'This is a description.'}
            >
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const description = page.getByText('This is a description.').element()

      expect(description).toBeInTheDocument()
    })
  })

  describe('descriptionRole prop', () => {
    it('should set the role of description', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option
              id="option1"
              description="This is a description."
              descriptionRole="button"
            >
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const description = page.getByText('This is a description.').element()

      expect(description).toHaveAttribute('role', 'button')
    })
  })

  describe('onOptionClick callback', () => {
    it('should fire on click with correct params', async () => {
      const onOptionClick = vi.fn()
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" onOptionClick={onOptionClick}>
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option = page.getByText('Option').element()

      await userEvent.click(option)

      await vi.waitFor(() => {
        expect(onOptionClick).toHaveBeenCalledTimes(1)

        const args = onOptionClick.mock.calls[0][1]

        expect(args).toHaveProperty('optionId', 'option1')
        expect(args).toHaveProperty('pageHistory', ['page0'])

        expect(args.drilldown).toBeInstanceOf(Object)
        expect(args.drilldown.props).toHaveProperty('role', 'menu')

        expect(args.goToPage).toBeInstanceOf(Function)
        expect(args.goToPreviousPage).toBeInstanceOf(Function)
      })
    })

    it('should provide goToPreviousPage method that throws a warning, if there is no previous page', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option
              id="option01"
              onOptionClick={(_e, { goToPreviousPage }) => {
                goToPreviousPage()
              }}
            >
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option = page.getByText('Option').element()

      await userEvent.click(option)

      await vi.waitFor(() => {
        const expectedErrorMessage =
          'Warning: There is no previous page to go to. The current page history is: [page0].'

        expect(consoleWarningMock).toHaveBeenCalledWith(
          expect.stringContaining(expectedErrorMessage),
          expect.any(String)
        )
      })
    })

    describe('provide goToPage method', () => {
      it("should throws warning if page doesn't exist", async () => {
        await render(
          <Drilldown rootPageId="page0">
            <Drilldown.Page id="page0">
              <Drilldown.Option
                id="option01"
                onOptionClick={(_e, { goToPage }) => {
                  goToPage('page1')
                }}
              >
                Option
              </Drilldown.Option>
            </Drilldown.Page>
          </Drilldown>
        )
        const option = page.getByText('Option').element()

        await userEvent.click(option)

        await vi.waitFor(() => {
          const expectedErrorMessage =
            'Warning: Cannot go to page because page with id: "page1" doesn\'t exist.'

          expect(consoleWarningMock).toHaveBeenCalledWith(
            expect.stringContaining(expectedErrorMessage),
            expect.any(String)
          )
        })
      })

      it('should throws warning if if no page id is provided', async () => {
        await render(
          <Drilldown rootPageId="page0">
            <Drilldown.Page id="page0">
              <Drilldown.Option
                id="option01"
                onOptionClick={(_e, { goToPage }) => {
                  // @ts-expect-error we want this to fail
                  goToPage()
                }}
              >
                Option
              </Drilldown.Option>
            </Drilldown.Page>
          </Drilldown>
        )
        const option = page.getByText('Option').element()

        await userEvent.click(option)

        await vi.waitFor(() => {
          const expectedErrorMessage =
            'Warning: Cannot go to page because there was no page id provided.'

          expect(consoleWarningMock).toHaveBeenCalledWith(
            expect.stringContaining(expectedErrorMessage),
            expect.any(String)
          )
        })
      })

      it('should throws warning if parameter is not string', async () => {
        await render(
          <Drilldown rootPageId="page0">
            <Drilldown.Page id="page0">
              <Drilldown.Option
                id="option01"
                onOptionClick={(_e, { goToPage }) => {
                  // @ts-expect-error we want this to fail
                  goToPage({ page: 'page1' })
                }}
              >
                Option
              </Drilldown.Option>
            </Drilldown.Page>
          </Drilldown>
        )
        const option = page.getByText('Option').element()

        await userEvent.click(option)

        await vi.waitFor(() => {
          const expectedErrorMessage =
            'Warning: Cannot go to page because parameter newPageId has to be string (valid page id). Current newPageId is "object".'

          expect(consoleWarningMock).toHaveBeenCalledWith(
            expect.stringContaining(expectedErrorMessage),
            expect.any(String)
          )
        })
      })
    })
  })

  describe('Component tests', () => {
    const optionItemWithText = (text: string) =>
      Array.from(
        document.querySelectorAll<HTMLElement>('li[class$="-optionItem"]')
      ).find((item) => item.textContent?.includes(text))!

    afterEach(() => {
      // the href tests navigate via the hash, clear it so it doesn't leak
      window.location.hash = ''
    })

    it('should allow controlled behaviour', async () => {
      const options = ['one', 'two', 'three']
      const Example = ({
        opts,
        selected
      }: {
        opts: typeof options
        selected: string
      }) => {
        return (
          <Drilldown rootPageId="page0">
            <Drilldown.Page id="page0">
              <Drilldown.Group id="group0">
                {opts.map((opt) => {
                  return (
                    <Drilldown.Option
                      key={opt}
                      value={opt}
                      name={opt}
                      id={opt}
                      selected={selected === opt}
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
      const { rerender } = await render(
        <Example opts={options} selected="two" />
      )

      const menuItems = page.getByRole('menuitem').elements()

      expect(menuItems[0]).toHaveAttribute('aria-checked', 'false')
      expect(menuItems[1]).toHaveAttribute('aria-checked', 'true')
      expect(menuItems[2]).toHaveAttribute('aria-checked', 'false')

      await rerender(<Example opts={options} selected="three" />)

      await vi.waitFor(() => {
        const updatedMenuItems = page.getByRole('menuitem').elements()

        expect(updatedMenuItems[0]).toHaveAttribute('aria-checked', 'false')
        expect(updatedMenuItems[1]).toHaveAttribute('aria-checked', 'false')
        expect(updatedMenuItems[2]).toHaveAttribute('aria-checked', 'true')
      })
    })

    it('should navigate to subPage on select', async () => {
      await render(
        <Drilldown rootPageId="page0">
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
      expect(page.getByText('Sub-Option').query()).not.toBeInTheDocument()
      expect(page.getByText('Option01').element()).toBeVisible()

      await userEvent.click(page.getByText('Option01'))

      await vi.waitFor(() => {
        expect(page.getByText('Sub-Option').element()).toBeVisible()
        expect(page.getByText('Option01').query()).not.toBeInTheDocument()
      })
    })

    it('should disabled prop apply disabled css style', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" disabled>
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option = document.querySelector<HTMLElement>('#option1')!

      expect(option).toHaveAttribute('aria-disabled', 'true')
      expect(getComputedStyle(option).cursor).toBe('not-allowed')
    })

    it('should navigate to url on Focus + Space', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" href="#helloWorld">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      document.querySelector<HTMLElement>('#option1')!.focus()

      await userEvent.keyboard(' ')

      await vi.waitFor(() => {
        expect(window.location.hash).toBe('#helloWorld')
      })
    })

    it('should navigate to url on Click', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" href="#helloWorld">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      await userEvent.click(page.getByText('Option'))

      await vi.waitFor(() => {
        expect(window.location.hash).toBe('#helloWorld')
      })
    })

    it("shouldn't navigate to url, if disabled", async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" href="#helloWorld" disabled>
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      await userEvent.click(page.getByText('Option'))

      expect(window.location.hash).not.toBe('#helloWorld')
    })

    it('should renderLabelInfo prop affected by afterLabelContentVAlign prop', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option
              id="option1"
              renderLabelInfo="Info"
              afterLabelContentVAlign="end"
            >
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const labelInfo = document.querySelector<HTMLElement>(
        '[class$=-drilldown__optionLabelInfo]'
      )!

      expect(labelInfo).toHaveTextContent('Info')
      expect(getComputedStyle(labelInfo).alignSelf).toBe('flex-end')
    })

    it('should provide goToPreviousPage method that goes back to the previous page', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01" subPageId="page1">
              Option01
            </Drilldown.Option>
          </Drilldown.Page>

          <Drilldown.Page id="page1">
            <Drilldown.Option
              id="option11"
              onOptionClick={(_e, { goToPreviousPage }) => {
                goToPreviousPage()
              }}
            >
              Option11
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      expect(page.getByText('Option01').element()).toBeVisible()

      await userEvent.click(page.getByText('Option01'))

      await vi.waitFor(() => {
        expect(page.getByText('Option01').query()).not.toBeInTheDocument()
        expect(page.getByText('Option11').element()).toBeVisible()
      })

      await userEvent.click(page.getByText('Option11'))

      await vi.waitFor(() => {
        expect(page.getByText('Option01').element()).toBeVisible()
        expect(page.getByText('Option11').query()).not.toBeInTheDocument()
      })
    })

    it('should provide goToPage method that can be used to go back a page', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01" subPageId="page1">
              Option01
            </Drilldown.Option>
          </Drilldown.Page>

          <Drilldown.Page id="page1">
            <Drilldown.Option
              id="option11"
              onOptionClick={(_e, { pageHistory, goToPage }) => {
                goToPage(pageHistory[0])
              }}
            >
              Option11
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      expect(page.getByText('Option01').element()).toBeVisible()

      await userEvent.click(page.getByText('Option01'))

      await vi.waitFor(() => {
        expect(page.getByText('Option01').query()).not.toBeInTheDocument()
        expect(page.getByText('Option11').element()).toBeVisible()
      })

      await userEvent.click(page.getByText('Option11'))

      await vi.waitFor(() => {
        expect(page.getByText('Option01').element()).toBeVisible()
        expect(page.getByText('Option11').query()).not.toBeInTheDocument()
      })
    })

    it('should provide goToPage method that can be used to go to a new, existing page', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option
              id="option01"
              onOptionClick={(_e, { goToPage }) => {
                goToPage('page1')
              }}
            >
              Option01
            </Drilldown.Option>
          </Drilldown.Page>

          <Drilldown.Page id="page1">
            <Drilldown.Option id="option11">Option11</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      expect(page.getByText('Option01').element()).toBeVisible()

      await userEvent.click(page.getByText('Option01'))

      await vi.waitFor(() => {
        expect(page.getByText('Option01').query()).not.toBeInTheDocument()
        expect(page.getByText('Option11').element()).toBeVisible()
      })
    })

    it('should themeOverride prop passed to the Options.Item component', async () => {
      await render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option
              id="option01"
              themeOverride={{
                color: 'rgb(0, 0, 100)',
                background: 'rgb(200, 200, 200)',
                // If the Drilldown happens to take focus before we assert, the
                // option switches to the `highlighted` variant, whose colours
                // are applied after the two above and would win. Override them
                // to the same values so the assertion does not depend on
                // whether that focus lands first.
                highlightedLabelColor: 'rgb(0, 0, 100)',
                highlightedBackground: 'rgb(200, 200, 200)'
              }}
            >
              Option01
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const optionItem = optionItemWithText('Option01')
      const style = getComputedStyle(optionItem)

      expect(style.color).toBe('rgb(0, 0, 100)')
      expect(style.backgroundColor).toBe('rgb(200, 200, 200)')
    })
  })
})
