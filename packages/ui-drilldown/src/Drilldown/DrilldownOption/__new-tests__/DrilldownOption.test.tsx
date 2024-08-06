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
import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { IconCheckSolid } from '@instructure/ui-icons'

import { Drilldown } from '../../index'

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
    render(
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
    const selectedOption = screen.getByLabelText('Option - 2')

    expect(selectedOption).toBeInTheDocument()
    expect(selectedOption).toHaveAttribute('id', 'groupOption02')
    expect(selectedOption).toHaveAttribute('aria-checked', 'true')
  })

  describe('id prop', () => {
    it('should throw warning the id is not provided', async () => {
      render(
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
      render(
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
      render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1">Option1</Drilldown.Option>
            <Drilldown.Option id="option1">Option2</Drilldown.Option>
            <Drilldown.Option id="option1">Option3</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const menuitems = screen.queryAllByRole('menuitem')
      const option = screen.queryByText('Option2')

      expect(menuitems.length).toBe(0)
      expect(option).not.toBeInTheDocument()
    })
  })

  describe('children function prop', () => {
    it('should throw warning if it returns nothing', async () => {
      render(
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

      render(
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
      const { container } = render(
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
      const { container } = render(
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
      expect(icon).toHaveAttribute('name', 'IconArrowOpenEnd')
    })

    it('should indicate subpage fo SR', async () => {
      render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" subPageId="page1">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option = screen.getByLabelText('Option')

      expect(option).toHaveAttribute('role', 'button')
      expect(option).toHaveAttribute('aria-haspopup', 'true')
    })
  })

  describe('disabled prop', () => {
    it('should mark option as disabled for SR', async () => {
      render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" disabled>
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option = screen.getByLabelText('Option')

      expect(option).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('href prop', () => {
    it('should display option as link', async () => {
      render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" href="/helloWorld">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option = screen.getByLabelText('Option')

      expect(option.tagName).toBe('A')
      expect(option).toHaveAttribute('href', '/helloWorld')
    })

    it('should throw warning if subPageId is provided too', async () => {
      render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" href="/helloWorld" subPageId="page1">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option = screen.getByLabelText('Option')
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
      render(
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
      const option = screen.getByLabelText('Option')
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
      render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option = screen.getByLabelText('Option')
      const wrapper = option.parentElement

      expect(option).toHaveAttribute('id', 'option1')
      expect(wrapper?.tagName).toBe('LI')
    })

    it('should force option to be `li` while the parent is "ul" or "ol"', async () => {
      render(
        <Drilldown rootPageId="page0" as="ol">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" as="div">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option = screen.getByLabelText('Option')
      const wrapper = option.parentElement

      expect(option).toHaveAttribute('id', 'option1')
      expect(wrapper?.tagName).toBe('LI')
    })

    it('should render option as specified html element, when the parent in non-list element', async () => {
      render(
        <Drilldown rootPageId="page0" as="div">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" as="div">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option = screen.getByLabelText('Option')
      const wrapper = option.parentElement

      expect(option).toHaveAttribute('id', 'option1')
      expect(wrapper?.tagName).toBe('DIV')
    })
  })

  describe('role prop', () => {
    it('should be "menuitem" by default', async () => {
      render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option = screen.getByLabelText('Option')

      expect(option).toHaveAttribute('role', 'menuitem')
    })

    it('should be applied on prop', async () => {
      render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" role="presentation">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option = screen.getByLabelText('Option')

      expect(option).toHaveAttribute('role', 'presentation')
    })
  })

  describe('renderLabelInfo prop', () => {
    it('should display tag next to the label', async () => {
      const { container } = render(
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
      render(
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
      const { container } = render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option
              id="option1"
              renderBeforeLabel={<IconCheckSolid />}
            >
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const icon = container.querySelector('svg')

      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute('name', 'IconCheck')
    })

    it('as function should have option props as params', async () => {
      const beforeLabelFunction = vi.fn(() => <IconCheckSolid />)
      render(
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
      render(
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
      const { container } = render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option
              id="option1"
              renderAfterLabel={<IconCheckSolid />}
            >
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const icon = container.querySelector('svg')

      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute('name', 'IconCheck')
    })

    it('as function should have option props as params', async () => {
      const beforeLabelFunction = vi.fn(() => <IconCheckSolid />)
      render(
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
      render(
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
      render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" description="This is a description.">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const description = screen.getByText('This is a description.')

      expect(description).toBeInTheDocument()
    })

    it('as a function should display description under the option', async () => {
      render(
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
      const description = screen.getByText('This is a description.')

      expect(description).toBeInTheDocument()
    })
  })

  describe('descriptionRole prop', () => {
    it('should set the role of description', async () => {
      render(
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
      const description = screen.getByText('This is a description.')

      expect(description).toHaveAttribute('role', 'button')
    })
  })

  describe('onOptionClick callback', () => {
    it('should fire on click with correct params', async () => {
      const onOptionClick = vi.fn()
      render(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" onOptionClick={onOptionClick}>
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const option = screen.getByText('Option')

      await userEvent.click(option)

      await waitFor(() => {
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
      render(
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
      const option = screen.getByText('Option')

      await userEvent.click(option)

      await waitFor(() => {
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
        render(
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
        const option = screen.getByText('Option')

        await userEvent.click(option)

        await waitFor(() => {
          const expectedErrorMessage =
            'Warning: Cannot go to page because page with id: "page1" doesn\'t exist.'

          expect(consoleWarningMock).toHaveBeenCalledWith(
            expect.stringContaining(expectedErrorMessage),
            expect.any(String)
          )
        })
      })

      it('should throws warning if if no page id is provided', async () => {
        render(
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
        const option = screen.getByText('Option')

        await userEvent.click(option)

        await waitFor(() => {
          const expectedErrorMessage =
            'Warning: Cannot go to page because there was no page id provided.'

          expect(consoleWarningMock).toHaveBeenCalledWith(
            expect.stringContaining(expectedErrorMessage),
            expect.any(String)
          )
        })
      })

      it('should throws warning if parameter is not string', async () => {
        render(
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
        const option = screen.getByText('Option')

        await userEvent.click(option)

        await waitFor(() => {
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
})
