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

import { render } from '@testing-library/react'
import { vi } from 'vitest'
import { runAxeCheck } from '@instructure/ui-axe-check'
import '@testing-library/jest-dom'

import { FileDrop } from '../index'
import { FileDropProps } from '../props'
import { act } from '@testing-library/react'

describe('<FileDrop/>', () => {
  it('should focus the input when focus is called', async () => {
    let inputEl: HTMLInputElement | null | undefined
    const { container } = render(
      <FileDrop
        renderLabel="filedrop"
        inputRef={(el: HTMLInputElement | null) => {
          inputEl = el
        }}
      />
    )
    const input = container.querySelector('input[class$="-fileDrop__input"]')
    act(() => {
      inputEl!.focus()
    })
    expect(input).toHaveFocus()
  })

  it('should provide an inputRef prop', async () => {
    const inputRef = vi.fn()
    const { container } = render(
      <FileDrop renderLabel="filedrop" inputRef={inputRef} />
    )
    const input = container.querySelector('input[class$="-fileDrop__input"]')

    expect(inputRef).toHaveBeenCalledWith(input)
  })

  it('should render', async () => {
    const { container } = render(<FileDrop renderLabel="fake label" />)
    const fileDrop = container.querySelector('[class$="-fileDrop__input"]')

    expect(fileDrop).toBeInTheDocument()
  })

  it('should meet a11y standards', async () => {
    const { container } = render(<FileDrop renderLabel="fake label" />)
    const axeCheck = await runAxeCheck(container)
    expect(axeCheck).toBe(true)
  })

  describe('interactions', async () => {
    it('should functionally disable the input if `interaction` is set to disabled', async () => {
      const { container } = render(
        <FileDrop renderLabel="Some label" interaction="disabled" />
      )
      const fileDrop = container.querySelector('[class$="-fileDrop__input"]')

      expect(fileDrop).toBeDisabled()
    })

    it('should functionally disable the input if `disabled` is set', async () => {
      const { container } = render(
        <FileDrop renderLabel="Some label" disabled />
      )
      const fileDrop = container.querySelector('[class$="-fileDrop__input"]')

      expect(fileDrop).toBeDisabled()
    })

    it('should functionally disable the input if `interaction` is set to readonly', async () => {
      const { container } = render(
        <FileDrop renderLabel="Some label" interaction="readonly" />
      )
      const fileDrop = container.querySelector('[class$="-fileDrop__input"]')

      expect(fileDrop).toBeDisabled()
    })

    it('should functionally disable the input if `readOnly` is set', async () => {
      const { container } = render(
        <FileDrop renderLabel="Some label" readOnly />
      )
      const fileDrop = container.querySelector('[class$="-fileDrop__input"]')

      expect(fileDrop).toBeDisabled()
    })
  })

  describe('label handling', async () => {
    it('renders element label directly', async () => {
      const label = <section id="test-id">This is an element label</section>
      const { container } = render(<FileDrop renderLabel={label} />)

      const renderedLabel = container.querySelector('[id="test-id"]')

      expect(renderedLabel).toBeInTheDocument()
    })

    it('passes isDragAccepted and isDragRejected boolean props to component label', async () => {
      type RenderLabelProps = {
        isDragAccepted: boolean
        isDragRejected: boolean
        interaction?: string
      }
      let result: RenderLabelProps = {} as RenderLabelProps
      const label: FileDropProps['renderLabel'] = (props) => {
        result = { ...props }
        return null
      }

      render(<FileDrop renderLabel={label} />)

      expect(typeof result.isDragAccepted).toBe('boolean')
      expect(typeof result.isDragRejected).toBe('boolean')
    })

    it(`label component's props are false by default`, async () => {
      type RenderLabelProps = {
        isDragAccepted: boolean
        isDragRejected: boolean
        interaction?: string
      }
      let result: RenderLabelProps = {} as RenderLabelProps
      const label: FileDropProps['renderLabel'] = (props) => {
        result = { ...props }
        return null
      }

      render(<FileDrop renderLabel={label} />)

      expect(result.isDragAccepted).toBe(false)
      expect(result.isDragRejected).toBe(false)
    })
  })
})
