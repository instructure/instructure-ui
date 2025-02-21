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
import type { MockInstance } from 'vitest'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

// eslint-disable-next-line no-restricted-imports
import { generateA11yTests } from '@instructure/ui-scripts/lib/test/generateA11yTests'
import { runAxeCheck } from '@instructure/ui-axe-check'
import Select from '../index'
import SelectExamples from '../__examples__/Select.examples'
import * as utils from '@instructure/ui-utils'
import {
  IconAddLine,
  IconCheckSolid,
  IconDownloadSolid,
  IconEyeSolid
} from '@instructure/ui-icons'

type ExampleOption = 'foo' | 'bar' | 'baz'
const defaultOptions: ExampleOption[] = ['foo', 'bar', 'baz']
const getOptions = (
  highlighted?: ExampleOption,
  selected?: ExampleOption,
  disabled?: ExampleOption
) =>
  defaultOptions.map((opt) => (
    <Select.Option
      id={opt}
      key={opt}
      value={opt}
      isHighlighted={opt === highlighted}
      isSelected={opt === selected}
      isDisabled={opt === disabled}
    >
      {opt}
    </Select.Option>
  ))

type ExampleOptionWithContent = 'opt1' | 'op2' | 'opt3'
type GroupExampleOptionWithContent =
  | 'opt1'
  | 'op2'
  | 'opt3'
  | 'opt4'
  | 'op5'
  | 'opt6'

type groupOptionWithBeforeContent = {
  id: string
  label: string
  renderBeforeLabel: string | React.ReactNode
}
type groupOptionWithAfterContent = {
  id: string
  label: string
  renderAfterLabel: string | React.ReactNode
}

const optionsWithBeforeContent = [
  {
    id: 'opt1',
    label: 'Text',
    renderBeforeLabel: 'XY'
  },
  {
    id: 'opt2',
    label: 'Icon',
    renderBeforeLabel: <IconCheckSolid />
  },
  {
    id: 'opt3',
    label: 'Colored Icon',
    renderBeforeLabel: <IconEyeSolid />
  }
]

const groupOptionsWithBeforeContent: {
  [key: string]: groupOptionWithBeforeContent[]
} = {
  Options1: [
    {
      id: 'opt1',
      label: 'Text1',
      renderBeforeLabel: 'XY'
    },
    {
      id: 'opt2',
      label: 'Icon1',
      renderBeforeLabel: <IconCheckSolid />
    },
    {
      id: 'opt3',
      label: 'Colored Icon1',
      renderBeforeLabel: <IconEyeSolid />
    }
  ],
  Options2: [
    {
      id: 'opt4',
      label: 'Text2',
      renderBeforeLabel: 'AB'
    },
    {
      id: 'opt5',
      label: 'Icon2',
      renderBeforeLabel: <IconAddLine />
    },
    {
      id: 'opt6',
      label: 'Colored Icon2',
      renderBeforeLabel: <IconDownloadSolid />
    }
  ]
}

const optionsWithAfterContent = [
  {
    id: 'opt1',
    label: 'Text',
    renderAfterLabel: 'XY'
  },
  {
    id: 'opt2',
    label: 'Icon',
    renderAfterLabel: <IconCheckSolid />
  },
  {
    id: 'opt3',
    label: 'Colored Icon',
    renderAfterLabel: <IconEyeSolid />
  }
]

const groupOptionsWithAfterContent: {
  [key: string]: groupOptionWithAfterContent[]
} = {
  Options1: [
    {
      id: 'opt1',
      label: 'Text1',
      renderAfterLabel: 'XY'
    },
    {
      id: 'opt2',
      label: 'Icon1',
      renderAfterLabel: <IconCheckSolid />
    },
    {
      id: 'opt3',
      label: 'Colored Icon1',
      renderAfterLabel: <IconEyeSolid />
    }
  ],
  Options2: [
    {
      id: 'opt4',
      label: 'Text2',
      renderAfterLabel: 'AB'
    },
    {
      id: 'opt5',
      label: 'Icon2',
      renderAfterLabel: <IconAddLine />
    },
    {
      id: 'opt6',
      label: 'Colored Icon2',
      renderAfterLabel: <IconDownloadSolid />
    }
  ]
}

const optionsWithBeforeAndAfterContent = [
  {
    id: 'opt1',
    label: 'Text',
    renderBeforeLabel: 'XY',
    renderAfterLabel: 'ZZ'
  },
  {
    id: 'opt2',
    label: 'Icon',
    renderAfterLabel: <IconCheckSolid />,
    renderBeforeLabel: <IconEyeSolid />
  },
  {
    id: 'opt3',
    label: 'Colored Icon',
    renderBeforeLabel: <IconEyeSolid />,
    renderAfterLabel: <IconCheckSolid />
  }
]

const getOptionsWithBeforeContent = (selected: ExampleOptionWithContent) =>
  optionsWithBeforeContent.map((opt) => (
    <Select.Option {...opt} key={opt.id} isSelected={opt.id === selected} />
  ))

const getGroupOptionsWithBeforeContent = (
  selected: GroupExampleOptionWithContent
) => {
  return Object.keys(groupOptionsWithBeforeContent).map((key, index) => {
    return (
      <Select.Group key={index} renderLabel={key}>
        {groupOptionsWithBeforeContent[key].map(
          (opt: groupOptionWithBeforeContent) => (
            <Select.Option
              id={opt.id}
              key={opt.id}
              value={opt.label}
              renderBeforeLabel={opt.renderBeforeLabel}
              isSelected={opt.id === selected}
            ></Select.Option>
          )
        )}
      </Select.Group>
    )
  })
}

const getOptionsWithAfterContent = (selected: ExampleOptionWithContent) =>
  optionsWithAfterContent.map((opt) => (
    <Select.Option
      id={opt.id}
      key={opt.id}
      value={opt.label}
      renderAfterLabel={opt.renderAfterLabel}
      isSelected={opt.id === selected}
    ></Select.Option>
  ))

const getGroupOptionsWithAfterContent = (
  selected: GroupExampleOptionWithContent
) => {
  return Object.keys(groupOptionsWithAfterContent).map((key, index) => {
    return (
      <Select.Group key={index} renderLabel={key}>
        {groupOptionsWithAfterContent[key].map(
          (opt: groupOptionWithAfterContent) => (
            <Select.Option
              id={opt.id}
              key={opt.id}
              value={opt.label}
              renderAfterLabel={opt.renderAfterLabel}
              isSelected={opt.id === selected}
            ></Select.Option>
          )
        )}
      </Select.Group>
    )
  })
}

const getOptionsWithBeforeAndAfterContent = (
  selected: ExampleOptionWithContent
) =>
  optionsWithBeforeAndAfterContent.map((opt) => (
    <Select.Option
      id={opt.id}
      key={opt.id}
      value={opt.label}
      renderBeforeLabel={opt.renderBeforeLabel}
      renderAfterLabel={opt.renderAfterLabel}
      isSelected={opt.id === selected}
    ></Select.Option>
  ))

vi.mock('@instructure/ui-utils', async (importOriginal) => {
  const originalModule = (await importOriginal()) as any
  return {
    __esModule: true,
    ...originalModule,
    isSafari: vi.fn(() => true)
  }
})

const mockUtils = utils as any

describe('<Select />', () => {
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

  it('should have role button in Safari without onInputChange', async () => {
    const { container } = render(
      <Select renderLabel="Choose an option">{getOptions()}</Select>
    )
    const input = container.querySelector('input')
    expect(input).toHaveAttribute('role', 'button')
  })

  it('should have role combobox in different browsers than Safari without onInputChange', async () => {
    mockUtils.isSafari = vi.fn(() => false)

    const { container } = render(
      <Select renderLabel="Choose an option">{getOptions()}</Select>
    )
    const input = container.querySelector('input')
    expect(input).toHaveAttribute('role', 'combobox')
  })

  it('should have role combobox with onInputChange', async () => {
    const { container } = render(
      <Select renderLabel="Choose an option" onInputChange={() => {}}>
        {getOptions()}
      </Select>
    )
    const input = container.querySelector('input')
    expect(input).toHaveAttribute('role', 'combobox')
  })

  it('should render an input and a list', async () => {
    const { container } = render(
      <Select
        renderLabel="Choose an option"
        isShowingOptions
        data-testid="subidubi"
      >
        {getOptions()}
      </Select>
    )

    const select = container.querySelector('span[class$="-select"]')
    const label = screen.getByLabelText('Choose an option')
    const input = container.querySelector('input[id^="Select_"]')
    const list = screen.getByRole('listbox')

    const options = screen.getAllByRole('option')
    const optionsCount = defaultOptions.length

    expect(select).toBeInTheDocument()
    expect(label).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(list).toBeInTheDocument()

    expect(options.length).toBe(optionsCount)
    expect(options[0]).toHaveTextContent(defaultOptions[0])
    expect(options[1]).toHaveTextContent(defaultOptions[1])
    expect(options[2]).toHaveTextContent(defaultOptions[2])
  })

  it('should render groups', async () => {
    render(
      <Select renderLabel="Choose an option" isShowingOptions>
        <Select.Option id="0">ungrouped option one</Select.Option>
        <Select.Group renderLabel="Group one">
          <Select.Option id="1">grouped option one</Select.Option>
        </Select.Group>
        <Select.Group renderLabel="Group two">
          <Select.Option id="2">grouped option two</Select.Option>
        </Select.Group>
        <Select.Option id="3">ungrouped option two</Select.Option>
      </Select>
    )

    const groups = screen.getAllByRole('group')
    const groupLabel = screen.getByText('Group one')

    expect(groupLabel).toHaveAttribute('role', 'presentation')
    expect(groups[0].getAttribute('aria-labelledby')).toEqual(
      groupLabel.getAttribute('id')
    )
    expect(groups.length).toBe(2)
  })

  it('should ignore invalid children', async () => {
    render(
      <Select renderLabel="Choose an option" isShowingOptions>
        <Select.Option id="0">valid</Select.Option>
        <div>invalid</div>
      </Select>
    )
    const invalidChild = screen.queryByText('invalid')

    expect(invalidChild).not.toBeInTheDocument()

    const expectedErrorMessage = 'Expected one of Group, Option'

    expect(consoleErrorMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.stringContaining(expectedErrorMessage),
      expect.any(String)
    )
  })

  it('should provide a focus method', async () => {
    const ref = React.createRef<Select>()
    render(
      <Select renderLabel="Choose an option" ref={ref}>
        {getOptions()}
      </Select>
    )

    const input = screen.getByLabelText('Choose an option')

    ref.current?.focus()

    await waitFor(() => {
      expect(document.activeElement).toBe(input)
    })
  })

  it('should provide a focused getter', async () => {
    const ref = React.createRef<Select>()

    render(
      <Select renderLabel="Choose an option" ref={ref}>
        {getOptions()}
      </Select>
    )
    expect(ref.current?.focused).toBe(false)

    ref.current?.focus()

    await waitFor(() => {
      expect(ref.current?.focused).toBe(true)
    })
  })

  describe('input', () => {
    it('should render with a generated id by default', () => {
      const { container } = render(<Select renderLabel="Choose an option" />)
      const input = container.querySelector('input[id^="Select_"]')

      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('id', expect.stringContaining('Select_'))
    })

    it('should render with a custom id if given', () => {
      const { container } = render(
        <Select renderLabel="Choose an option" id="customSelect" />
      )
      const input = container.querySelector('input[id^="customSelect"]')

      expect(input).toBeInTheDocument()
      expect(input!.getAttribute('id')).toEqual('customSelect')
    })

    it('should render readonly when interaction="enabled" with no onInputChange', () => {
      render(<Select renderLabel="Choose an option" />)
      const input = screen.getByLabelText('Choose an option')

      expect(input).toHaveAttribute('readonly')
      expect(input).not.toHaveAttribute('disabled')
    })

    it('should not render readonly when interaction="enabled" with onInputChange', () => {
      render(<Select renderLabel="Choose an option" onInputChange={() => {}} />)
      const input = screen.getByLabelText('Choose an option')

      expect(input).not.toHaveAttribute('readonly')
      expect(input).not.toHaveAttribute('disabled')
    })

    it('should render readonly when interaction="readonly"', () => {
      render(
        <Select
          renderLabel="Choose an option"
          interaction="readonly"
          onInputChange={() => {}}
        />
      )
      const input = screen.getByLabelText('Choose an option')

      expect(input).toHaveAttribute('readonly')
      expect(input).not.toHaveAttribute('disabled')
    })

    it('should render disabled when interaction="disabled"', () => {
      render(
        <Select
          renderLabel="Choose an option"
          interaction="disabled"
          onInputChange={() => {}}
        />
      )
      const input = screen.getByLabelText('Choose an option')

      expect(input).toHaveAttribute('disabled')
      expect(input).not.toHaveAttribute('readonly')
    })

    it('should not render readonly when disabled', () => {
      render(<Select renderLabel="Choose an option" interaction="disabled" />)
      const input = screen.getByLabelText('Choose an option')

      expect(input).toHaveAttribute('disabled')
      expect(input).not.toHaveAttribute('readonly')
    })

    it('should render required when isRequired={true}', () => {
      render(<Select renderLabel="Choose an option" isRequired />)
      const input = screen.getByLabelText('Choose an option *')

      expect(input).toHaveAttribute('required')
    })

    it('should render with inputValue', () => {
      const val = 'hello world'

      render(<Select renderLabel="Choose an option" inputValue={val} />)
      const input = screen.getByLabelText('Choose an option')

      expect(input).toHaveAttribute('value', val)
    })

    it('should set aria-activedescendant based on the highlighted option', () => {
      render(
        <Select renderLabel="Choose an option" isShowingOptions>
          {getOptions(defaultOptions[1])}
        </Select>
      )
      const input = screen.getByLabelText('Choose an option')

      expect(input).toHaveAttribute('aria-activedescendant', defaultOptions[1])
    })

    it('should not set aria-activedescendant when not showing options', () => {
      render(
        <Select renderLabel="Choose an option">
          {getOptions(defaultOptions[1])}
        </Select>
      )
      const input = screen.getByLabelText('Choose an option')

      expect(input).not.toHaveAttribute('aria-activedescendant')
    })

    it('should allow assistive text', () => {
      render(
        <Select renderLabel="Choose an option" assistiveText="hello world">
          {getOptions()}
        </Select>
      )
      const input = screen.getByLabelText('Choose an option')
      const assistiveText = screen.getByText('hello world')
      const assistiveTextId = assistiveText.getAttribute('id')

      expect(input).toHaveAttribute('aria-describedby', assistiveTextId)
    })

    it('should allow custom props to pass through', () => {
      render(
        <Select renderLabel="Choose an option" data-custom-attr="true">
          {getOptions()}
        </Select>
      )
      const input = screen.getByLabelText('Choose an option')

      expect(input).toHaveAttribute('data-custom-attr', 'true')
    })

    it('should allow override of autoComplete prop', () => {
      const { rerender } = render(
        <Select renderLabel="Choose an option">{getOptions()}</Select>
      )
      const input = screen.getByLabelText('Choose an option')

      expect(input).toHaveAttribute('autocomplete', 'off')

      rerender(
        <Select renderLabel="Choose an option" autoComplete="false">
          {getOptions()}
        </Select>
      )

      expect(input).toHaveAttribute('autocomplete', 'false')
    })

    it('should provide a ref to the input element', async () => {
      const inputRef = vi.fn()

      render(
        <Select renderLabel="Choose an option" inputRef={inputRef}>
          {getOptions()}
        </Select>
      )

      const input = screen.getByLabelText('Choose an option')

      await waitFor(() => {
        expect(inputRef).toHaveBeenCalledWith(input)
      })
    })

    it("should not render option's before content in input field when isOptionContentAppliedToInput is set to false ", async () => {
      const { container } = render(
        <Select
          renderLabel="Choose an option"
          isOptionContentAppliedToInput={false}
          inputValue={optionsWithBeforeContent[0].label}
        >
          {getOptionsWithBeforeContent('opt1')}
        </Select>
      )

      const beforeContent = container.querySelector(
        'span[class$="-textInput__layout"]'
      )

      expect(beforeContent).not.toHaveTextContent('XY')
    })

    it('should render arrow in input field when isOptionContentAppliedToInput is set to false', async () => {
      const { container } = render(
        <Select
          renderLabel="Choose an option"
          isOptionContentAppliedToInput={false}
          inputValue={optionsWithBeforeContent[0].label}
        >
          {getOptionsWithBeforeContent('opt1')}
        </Select>
      )

      const spanElement = container.querySelector(
        'span[class$="-textInput__afterElement"]'
      )
      const svgElement = spanElement!.querySelector(
        'svg[name="IconArrowOpenDown"]'
      )
      expect(svgElement).toBeInTheDocument()
    })

    it("should render option's before content in input field when isOptionContentAppliedToInput is set to true", async () => {
      const { container } = render(
        <Select
          renderLabel="Choose an option"
          isOptionContentAppliedToInput={true}
          inputValue={optionsWithBeforeContent[0].label}
        >
          {getOptionsWithBeforeContent('opt1')}
        </Select>
      )

      const beforeContent = container.querySelector(
        'span[class$="-textInput__layout"]'
      )

      expect(beforeContent).toHaveTextContent('XY')
    })

    it('should render arrow icon when isOptionContentAppliedToInput is set to true with before content', async () => {
      const { container } = render(
        <Select
          renderLabel="Choose an option"
          isOptionContentAppliedToInput={true}
          inputValue={optionsWithBeforeContent[0].label}
        >
          {getOptionsWithBeforeContent('opt1')}
        </Select>
      )

      const spanElement = container.querySelector(
        'span[class$="-textInput__afterElement"]'
      )
      const svgElement = spanElement!.querySelector(
        'svg[name="IconArrowOpenDown"]'
      )
      expect(svgElement).toBeInTheDocument()
    })

    it("should render option's after content in input field when isOptionContentAppliedToInput is set to true", async () => {
      const { container } = render(
        <Select
          renderLabel="Choose an option"
          isOptionContentAppliedToInput={true}
          inputValue={optionsWithAfterContent[0].label}
        >
          {getOptionsWithAfterContent('opt1')}
        </Select>
      )

      const beforeContent = container.querySelector(
        'span[class$="-textInput__afterElement"]'
      )
      expect(beforeContent).toHaveTextContent('XY')
    })

    it("should render option's before content in input field when isOptionContentAppliedToInput is set to true but renderBeforeInput is also set", async () => {
      const { container } = render(
        <Select
          renderLabel="Choose an option"
          isOptionContentAppliedToInput={true}
          inputValue={optionsWithBeforeContent[0].label}
          renderBeforeInput="ZZ"
        >
          {getOptionsWithBeforeContent('opt1')}
        </Select>
      )

      const beforeContent = container.querySelector(
        'span[class$="-textInput__layout"]'
      )

      expect(beforeContent).toHaveTextContent('XY')
    })

    it("should render option's after content in input field when isOptionContentAppliedToInput is set to true but renderAfterInput is also set", async () => {
      const { container } = render(
        <Select
          renderLabel="Choose an option"
          isOptionContentAppliedToInput={true}
          inputValue={optionsWithAfterContent[0].label}
          renderAfterInput="ZZ"
        >
          {getOptionsWithAfterContent('opt1')}
        </Select>
      )

      const afterContent = container.querySelector(
        'span[class$="-textInput__afterElement"]'
      )
      expect(afterContent).toHaveTextContent('XY')
    })

    it("should not render option's before content in input field when isOptionContentAppliedToInput is set to true but inputValue is not set", async () => {
      const { container } = render(
        <Select
          renderLabel="Choose an option"
          isOptionContentAppliedToInput={true}
        >
          {getOptionsWithBeforeContent('opt1')}
        </Select>
      )

      const beforeContent = container.querySelector(
        'span[class$="-textInput__layout"]'
      )

      expect(beforeContent).not.toHaveTextContent('XY')
    })

    it("should render option's before content in input field when isOptionContentAppliedToInput is set to true and both optionBeforeContent and optionAfterContent are provided", async () => {
      const { container } = render(
        <Select
          renderLabel="Choose an option"
          isOptionContentAppliedToInput={true}
          inputValue={optionsWithBeforeAndAfterContent[0].label}
        >
          {getOptionsWithBeforeAndAfterContent('opt1')}
        </Select>
      )

      const beforeContent = container.querySelector(
        'span[class$="-textInput__layout"]'
      )

      expect(beforeContent).toHaveTextContent('XY')
    })

    it("should render option's after content in input field when isOptionContentAppliedToInput is set to true and both optionBeforeContent and optionAfterContent are provided", async () => {
      const { container } = render(
        <Select
          renderLabel="Choose an option"
          isOptionContentAppliedToInput={true}
          inputValue={optionsWithBeforeAndAfterContent[0].label}
        >
          {getOptionsWithBeforeAndAfterContent('opt1')}
        </Select>
      )

      const afterContent = container.querySelector(
        'span[class$="-textInput__afterElement"]'
      )
      expect(afterContent).toHaveTextContent('ZZ')
    })

    it('should render arrow in input field when isOptionContentAppliedToInput is set to true but inputValue is not set', async () => {
      const { container } = render(
        <Select
          renderLabel="Choose an option"
          isOptionContentAppliedToInput={true}
        >
          {getOptionsWithBeforeContent('opt1')}
        </Select>
      )

      const spanElement = container.querySelector(
        'span[class$="-textInput__afterElement"]'
      )
      const svgElement = spanElement!.querySelector(
        'svg[name="IconArrowOpenDown"]'
      )

      expect(svgElement).toBeInTheDocument()
    })

    it("should not render option's after content in input field when isOptionContentAppliedToInput is set to true but inputValue is not set", async () => {
      const { container } = render(
        <Select
          renderLabel="Choose an option"
          isOptionContentAppliedToInput={true}
        >
          {getOptionsWithBeforeContent('opt1')}
        </Select>
      )

      const afterContent = container.querySelector(
        'span[class$="-textInput__afterElement"]'
      )

      expect(afterContent).not.toHaveTextContent('XY')
    })

    it("should render option's before content input field when isOptionContentAppliedToInput is set to true with group options", async () => {
      const { container } = render(
        <Select
          renderLabel="Choose an option"
          isOptionContentAppliedToInput={true}
          inputValue={groupOptionsWithBeforeContent.Options1[0].label}
        >
          {getGroupOptionsWithBeforeContent('opt1')}
        </Select>
      )

      const beforeContent = container.querySelector(
        'span[class$="-textInput__layout"]'
      )

      expect(beforeContent).toHaveTextContent('XY')
    })

    it('should render arrow icon when isOptionContentAppliedToInput is set to true with before content and group options', async () => {
      const { container } = render(
        <Select
          renderLabel="Choose an option"
          isOptionContentAppliedToInput={true}
          inputValue={groupOptionsWithBeforeContent.Options1[0].label}
        >
          {getGroupOptionsWithBeforeContent('opt1')}
        </Select>
      )

      const spanElement = container.querySelector(
        'span[class$="-textInput__afterElement"]'
      )
      const svgElement = spanElement!.querySelector(
        'svg[name="IconArrowOpenDown"]'
      )
      expect(svgElement).toBeInTheDocument()
    })

    it("should render option's after content input field when isOptionContentAppliedToInput is set to true with group options", async () => {
      const { container } = render(
        <Select
          renderLabel="Choose an option"
          isOptionContentAppliedToInput={true}
          inputValue={groupOptionsWithAfterContent.Options2[0].label}
        >
          {getGroupOptionsWithAfterContent('opt4')}
        </Select>
      )

      const afterContent = container.querySelector(
        'span[class$="-textInput__afterElement"]'
      )

      expect(afterContent).toHaveTextContent('AB')
    })
  })

  describe('list', () => {
    it('should set aria-selected on options with isSelected={true}', () => {
      render(
        <Select renderLabel="Choose an option" isShowingOptions>
          {getOptions(undefined, defaultOptions[1])}
        </Select>
      )
      const options = screen.getAllByRole('option')

      expect(options[1].getAttribute('aria-selected')).toEqual('true')
    })

    it('should set aria-disabled on options when isDisabled={true}', () => {
      render(
        <Select renderLabel="Choose an option" isShowingOptions>
          {getOptions(undefined, undefined, defaultOptions[2])}
        </Select>
      )
      const options = screen.getAllByRole('option')

      expect(options[0]).not.toHaveAttribute('aria-disabled')
      expect(options[2]).toHaveAttribute('aria-disabled', 'true')
    })

    it('should set list element role to "listbox"', async () => {
      render(
        <Select renderLabel="Choose an option" isShowingOptions>
          {getOptions()}
        </Select>
      )
      const listbox = screen.getByRole('listbox')

      expect(listbox).toBeInTheDocument()
      expect(listbox.tagName).toBe('UL')
    })

    it('should provide a ref to the list element', async () => {
      const listRef = vi.fn()

      render(
        <Select
          renderLabel="Choose an option"
          isShowingOptions
          listRef={listRef}
        >
          {getOptions()}
        </Select>
      )

      const listbox = screen.getByRole('listbox')

      await waitFor(() => {
        expect(listRef).toHaveBeenCalledWith(listbox)
      })
    })
  })

  describe('with callbacks', () => {
    describe('should fire onRequestShowOptions', () => {
      it('when root is clicked', async () => {
        const onRequestShowOptions = vi.fn()

        const { container, rerender } = render(
          <Select
            renderLabel="Choose an option"
            onRequestShowOptions={onRequestShowOptions}
          >
            {getOptions()}
          </Select>
        )

        const icon = container.querySelector('svg[name="IconArrowOpenDown"]')
        const label = screen.getByText('Choose an option')

        expect(icon).toBeInTheDocument()
        expect(label).toBeInTheDocument()

        await userEvent.click(label)
        await waitFor(() => {
          expect(onRequestShowOptions).toHaveBeenCalledTimes(1)
        })

        await userEvent.click(icon!)
        await waitFor(() => {
          expect(onRequestShowOptions).toHaveBeenCalledTimes(2)
        })

        rerender(
          <Select
            renderLabel="Choose an option"
            onRequestShowOptions={onRequestShowOptions}
            isShowingOptions={true}
          >
            {getOptions()}
          </Select>
        )

        await userEvent.click(label)
        await waitFor(() => {
          expect(onRequestShowOptions).toHaveBeenCalledTimes(2)
        })
      })

      it('when input is clicked', async () => {
        const onRequestShowOptions = vi.fn()

        const { rerender } = render(
          <Select
            renderLabel="Choose an option"
            onRequestShowOptions={onRequestShowOptions}
          >
            {getOptions()}
          </Select>
        )
        const input = screen.getByLabelText('Choose an option')

        await userEvent.click(input)
        await waitFor(() => {
          expect(onRequestShowOptions).toHaveBeenCalledTimes(1)
        })

        rerender(
          <Select
            renderLabel="Choose an option"
            onRequestShowOptions={onRequestShowOptions}
            isShowingOptions={true}
          >
            {getOptions()}
          </Select>
        )

        await userEvent.click(input)
        await waitFor(() => {
          expect(onRequestShowOptions).toHaveBeenCalledTimes(1)
        })
      })

      it('when up/down arrows are pressed', async () => {
        const onRequestShowOptions = vi.fn()

        render(
          <Select
            renderLabel="Choose an option"
            onRequestShowOptions={onRequestShowOptions}
          >
            {getOptions()}
          </Select>
        )

        const input = screen.getByLabelText('Choose an option')

        await userEvent.type(input, '{arrowdown}')
        await waitFor(() => {
          expect(onRequestShowOptions).toHaveBeenCalledTimes(1)
        })

        await userEvent.type(input, '{arrowup}')
        await waitFor(() => {
          expect(onRequestShowOptions).toHaveBeenCalledTimes(2)
        })
      })

      it('when space is pressed', async () => {
        const onRequestShowOptions = vi.fn()

        const { rerender } = render(
          <Select
            renderLabel="Choose an option"
            onRequestShowOptions={onRequestShowOptions}
          >
            {getOptions()}
          </Select>
        )

        const input = screen.getByLabelText('Choose an option')

        await userEvent.type(input, '{space}')
        await waitFor(() => {
          expect(onRequestShowOptions).toHaveBeenCalledTimes(1)
        })

        rerender(
          <Select
            renderLabel="Choose an option"
            onRequestShowOptions={onRequestShowOptions}
            isShowingOptions={true}
          >
            {getOptions()}
          </Select>
        )

        await userEvent.type(input, '{space}')
        await waitFor(() => {
          expect(onRequestShowOptions).toHaveBeenCalledTimes(1)
        })
      })
    })

    describe('should fire onRequestHideOptions', () => {
      it('when root is clicked and isShowingOptions is true', async () => {
        const onRequestHideOptions = vi.fn()

        const { container } = render(
          <Select
            renderLabel="Choose an option"
            isShowingOptions
            onRequestHideOptions={onRequestHideOptions}
          >
            {getOptions()}
          </Select>
        )

        const icon = container.querySelector('svg[name="IconArrowOpenUp"]')
        const label = screen.getByText('Choose an option')

        expect(icon).toBeInTheDocument()
        expect(label).toBeInTheDocument()

        await userEvent.click(label)
        await waitFor(() => {
          expect(onRequestHideOptions).toHaveBeenCalledTimes(1)
        })

        await userEvent.click(icon!)
        await waitFor(() => {
          expect(onRequestHideOptions).toHaveBeenCalledTimes(2)
        })
      })

      it('when root is clicked and isShowingOptions is false should NOT fire onRequestHideOptions', async () => {
        const onRequestHideOptions = vi.fn()

        render(
          <Select
            renderLabel="Choose an option"
            isShowingOptions={false}
            onRequestHideOptions={onRequestHideOptions}
          >
            {getOptions()}
          </Select>
        )

        const label = screen.getByText('Choose an option')

        expect(label).toBeInTheDocument()

        await userEvent.click(label)
        await waitFor(() => {
          expect(onRequestHideOptions).not.toHaveBeenCalled()
        })
      })

      it('when input is clicked', async () => {
        const onRequestHideOptions = vi.fn()

        const { rerender } = render(
          <Select
            renderLabel="Choose an option"
            isShowingOptions
            onRequestHideOptions={onRequestHideOptions}
          >
            {getOptions()}
          </Select>
        )

        const input = screen.getByLabelText('Choose an option')

        await userEvent.click(input)
        await waitFor(() => {
          expect(onRequestHideOptions).toHaveBeenCalledTimes(1)
        })

        rerender(
          <Select
            renderLabel="Choose an option"
            isShowingOptions={false}
            onRequestHideOptions={onRequestHideOptions}
          >
            {getOptions()}
          </Select>
        )
        await userEvent.click(input)
        await waitFor(() => {
          expect(onRequestHideOptions).toHaveBeenCalledTimes(1)
        })
      })

      it('when escape is pressed', async () => {
        const onRequestHideOptions = vi.fn()

        render(
          <Select
            renderLabel="Choose an option"
            isShowingOptions
            onRequestHideOptions={onRequestHideOptions}
          >
            {getOptions()}
          </Select>
        )

        const input = screen.getByLabelText('Choose an option')

        await userEvent.type(input, '{esc}')
        await waitFor(() => {
          expect(onRequestHideOptions).toHaveBeenCalledTimes(1)
        })
      })
    })

    describe('should fire onRequestHighlightOption', () => {
      it('when options are hovered', async () => {
        const onRequestHighlightOption = vi.fn()

        render(
          <Select
            renderLabel="Choose an option"
            isShowingOptions
            onRequestHighlightOption={onRequestHighlightOption}
          >
            {getOptions()}
          </Select>
        )
        const options = screen.getAllByRole('option')

        await userEvent.hover(options[0])
        await waitFor(() => {
          expect(onRequestHighlightOption).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({
              id: defaultOptions[0]
            })
          )
        })

        await userEvent.hover(options[1])
        await waitFor(() => {
          expect(onRequestHighlightOption).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({
              id: defaultOptions[1]
            })
          )
        })
      })
    })

    describe('input callbacks', () => {
      it('should fire onInputChange when input is typed in', async () => {
        const onInputChange = vi.fn()

        render(
          <Select renderLabel="Choose an option" onInputChange={onInputChange}>
            {getOptions()}
          </Select>
        )

        const input = screen.getByLabelText('Choose an option')

        await userEvent.type(input, 'h')
        await waitFor(() => {
          expect(onInputChange).toHaveBeenCalled()
        })
      })

      it('should fire onFocus when input gains focus', async () => {
        const onFocus = vi.fn()

        render(
          <Select renderLabel="Choose an option" onFocus={onFocus}>
            {getOptions()}
          </Select>
        )

        const input = screen.getByLabelText('Choose an option')

        input.focus()
        await waitFor(() => {
          expect(onFocus).toHaveBeenCalled()
        })
      })
    })
  })

  describe('with generated examples', () => {
    const generatedComponents = generateA11yTests(Select, SelectExamples)

    it.each(generatedComponents)(
      'should be accessible with example: $description',
      async ({ content }) => {
        const { container } = render(content)
        const axeCheck = await runAxeCheck(container)
        expect(axeCheck).toBe(true)
      }
    )
  })
})
