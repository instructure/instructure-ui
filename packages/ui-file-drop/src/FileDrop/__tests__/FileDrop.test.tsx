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
import { render } from 'vitest-browser-react'
import { userEvent } from 'vitest/browser'
import { describe, it, expect, vi } from 'vitest'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { FileDrop } from '@instructure/ui-file-drop/latest'
import type { FileDropProps } from '@instructure/ui-file-drop/latest'
import { act } from 'react'

describe('<FileDrop/>', () => {
  it('should focus the input when focus is called', async () => {
    let inputEl: HTMLInputElement | null | undefined
    const { container } = await render(
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
    const { container } = await render(
      <FileDrop renderLabel="filedrop" inputRef={inputRef} />
    )
    const input = container.querySelector('input[class$="-fileDrop__input"]')

    expect(inputRef).toHaveBeenCalledWith(input)
  })

  it('should render', async () => {
    const { container } = await render(<FileDrop renderLabel="fake label" />)
    const fileDrop = container.querySelector('[class$="-fileDrop__input"]')

    expect(fileDrop).toBeInTheDocument()
  })

  it('should meet a11y standards', async () => {
    const { container } = await render(<FileDrop renderLabel="fake label" />)
    const axeCheck = await runAxeCheck(container)
    expect(axeCheck).toBe(true)
  })

  describe('interactions', async () => {
    it('should functionally disable the input if `interaction` is set to disabled', async () => {
      const { container } = await render(
        <FileDrop renderLabel="Some label" interaction="disabled" />
      )
      const fileDrop = container.querySelector('[class$="-fileDrop__input"]')

      expect(fileDrop).toBeDisabled()
    })

    it('should functionally disable the input if `disabled` is set', async () => {
      const { container } = await render(
        <FileDrop renderLabel="Some label" disabled />
      )
      const fileDrop = container.querySelector('[class$="-fileDrop__input"]')

      expect(fileDrop).toBeDisabled()
    })

    it('should functionally disable the input if `interaction` is set to readonly', async () => {
      const { container } = await render(
        <FileDrop renderLabel="Some label" interaction="readonly" />
      )
      const fileDrop = container.querySelector('[class$="-fileDrop__input"]')

      expect(fileDrop).toBeDisabled()
    })

    it('should functionally disable the input if `readOnly` is set', async () => {
      const { container } = await render(
        <FileDrop renderLabel="Some label" readOnly />
      )
      const fileDrop = container.querySelector('[class$="-fileDrop__input"]')

      expect(fileDrop).toBeDisabled()
    })
  })

  describe('label handling', async () => {
    it('renders element label directly', async () => {
      const label = <section id="test-id">This is an element label</section>
      const { container } = await render(<FileDrop renderLabel={label} />)

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

      await render(<FileDrop renderLabel={label} />)

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

      await render(<FileDrop renderLabel={label} />)

      expect(result.isDragAccepted).toBe(false)
      expect(result.isDragRejected).toBe(false)
    })
  })

  describe('Component tests', () => {
    // Chrome's `DragEvent` constructor ignores the `dataTransfer` passed in
    // its init dict, so the drop event has to be assembled by hand
    const dropFile = (target: Element, file: File) => {
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)
      const event = new Event('drop', { bubbles: true, cancelable: true })
      Object.defineProperty(event, 'dataTransfer', { value: dataTransfer })
      target.dispatchEvent(event)
    }

    describe('file-type checking when onDrop', () => {
      it('responds to drop event', async () => {
        const onDrop = vi.fn()
        const { container } = await render(
          <FileDrop renderLabel="fake label" onDrop={onDrop} />
        )

        fireEvent.drop(container.querySelector('label')!)

        expect(onDrop).toHaveBeenCalled()
      })

      it('responds to change event', async () => {
        const onDrop = vi.fn()
        const { container } = await render(
          <FileDrop renderLabel="fake label" onDrop={onDrop} />
        )

        fireEvent.change(container.querySelector('input[type="file"]')!)

        expect(onDrop).toHaveBeenCalled()
      })

      it('accepts correct files using mimetypes', async () => {
        const onDrop = vi.fn()
        const onDropAccepted = vi.fn()
        const onDropRejected = vi.fn()
        const { container } = await render(
          <FileDrop
            renderLabel="fake label"
            accept="image/*"
            onDrop={onDrop}
            onDropAccepted={onDropAccepted}
            onDropRejected={onDropRejected}
          />
        )
        const file = new File([''], 'napoleon.png', { type: 'image/png' })

        dropFile(container.querySelector('label')!, file)

        expect(onDrop).toHaveBeenCalled()
        const [accepted, rejected] = onDrop.mock.lastCall!
        expect(accepted).toEqual([file])
        expect(rejected).toEqual([])

        expect(onDropAccepted).toHaveBeenCalled()
        expect(onDropRejected).not.toHaveBeenCalled()
      })

      it('rejects incorrect files using mimetypes and shouldEnablePreview', async () => {
        const onDrop = vi.fn()
        const onDropAccepted = vi.fn()
        const onDropRejected = vi.fn()
        const { container } = await render(
          <FileDrop
            renderLabel="fake label"
            shouldEnablePreview
            accept="image/*"
            onDrop={onDrop}
            onDropAccepted={onDropAccepted}
            onDropRejected={onDropRejected}
          />
        )
        const file = new File([''], 'napoleon.pdf', {
          type: 'application/pdf'
        })

        dropFile(container.querySelector('label')!, file)

        expect(onDrop).toHaveBeenCalled()
        const [accepted, rejected] = onDrop.mock.lastCall!
        expect(accepted).toEqual([])
        expect(rejected).toEqual([file])

        expect(onDropAccepted).not.toHaveBeenCalled()
        expect(onDropRejected).toHaveBeenCalled()
      })

      it('accepts correct files using mimetypes and enablePreview', async () => {
        const onDrop = vi.fn()
        const onDropAccepted = vi.fn()
        const onDropRejected = vi.fn()
        const { container } = await render(
          <FileDrop
            renderLabel="fake label"
            accept="image/*"
            shouldEnablePreview
            onDrop={onDrop}
            onDropAccepted={onDropAccepted}
            onDropRejected={onDropRejected}
          />
        )
        const file = new File([''], 'napoleon.png', { type: 'image/png' })

        dropFile(container.querySelector('label')!, file)

        expect(onDrop).toHaveBeenCalled()
        const [accepted, rejected] = onDrop.mock.lastCall!
        expect(accepted).toEqual([file])
        expect(rejected).toEqual([])

        expect(onDropAccepted).toHaveBeenCalled()
        expect(onDropRejected).not.toHaveBeenCalled()
      })

      it('accepts correct files using extensions', async () => {
        const onDrop = vi.fn()
        const onDropAccepted = vi.fn()
        const onDropRejected = vi.fn()
        const { container } = await render(
          <FileDrop
            renderLabel="fake label"
            accept="jpeg"
            onDrop={onDrop}
            onDropAccepted={onDropAccepted}
            onDropRejected={onDropRejected}
          />
        )
        const file = new File([''], 'napoleon.jpeg', { type: 'image/jpeg' })

        dropFile(container.querySelector('label')!, file)

        expect(onDrop).toHaveBeenCalled()
        const [accepted, rejected] = onDrop.mock.lastCall!
        expect(accepted).toEqual([file])
        expect(rejected).toEqual([])

        expect(onDropAccepted).toHaveBeenCalled()
        expect(onDropRejected).not.toHaveBeenCalled()
      })

      it('rejects incorrect files using mimetypes', async () => {
        const onDrop = vi.fn()
        const onDropAccepted = vi.fn()
        const onDropRejected = vi.fn()
        const { container } = await render(
          <FileDrop
            renderLabel="fake label"
            accept="image/*"
            onDrop={onDrop}
            onDropAccepted={onDropAccepted}
            onDropRejected={onDropRejected}
          />
        )
        const file = new File([''], 'napoleon.pdf', {
          type: 'application/pdf'
        })

        dropFile(container.querySelector('label')!, file)

        expect(onDrop).toHaveBeenCalled()
        const [accepted, rejected] = onDrop.mock.lastCall!
        expect(accepted).toEqual([])
        expect(rejected).toEqual([file])

        expect(onDropAccepted).not.toHaveBeenCalled()
        expect(onDropRejected).toHaveBeenCalled()
      })

      it('rejects incorrect files using extensions', async () => {
        const onDrop = vi.fn()
        const onDropAccepted = vi.fn()
        const onDropRejected = vi.fn()
        const { container } = await render(
          <FileDrop
            renderLabel="fake label"
            accept="jpeg"
            onDrop={onDrop}
            onDropAccepted={onDropAccepted}
            onDropRejected={onDropRejected}
          />
        )
        const file = new File([''], 'napoleon.pdf', {
          type: 'application/pdf'
        })

        dropFile(container.querySelector('label')!, file)

        expect(onDrop).toHaveBeenCalled()
        const [accepted, rejected] = onDrop.mock.lastCall!
        expect(accepted).toEqual([])
        expect(rejected).toEqual([file])

        expect(onDropAccepted).not.toHaveBeenCalled()
        expect(onDropRejected).toHaveBeenCalled()
      })
    })

    describe('onDrag events', () => {
      it('responds to onDragEnter event', async () => {
        const onDragEnter = vi.fn()
        const { container } = await render(
          <FileDrop renderLabel="fake label" onDragEnter={onDragEnter} />
        )

        fireEvent.dragEnter(container.querySelector('label')!)

        expect(onDragEnter).toHaveBeenCalled()
      })

      it('responds to onDragOver event', async () => {
        const onDragOver = vi.fn()
        const { container } = await render(
          <FileDrop renderLabel="fake label" onDragOver={onDragOver} />
        )

        fireEvent.dragOver(container.querySelector('label')!)

        expect(onDragOver).toHaveBeenCalled()
      })

      it('responds to onDragLeave event', async () => {
        const onDragLeave = vi.fn()
        const { container } = await render(
          <FileDrop renderLabel="fake label" onDragLeave={onDragLeave} />
        )

        fireEvent.dragLeave(container.querySelector('label')!)

        expect(onDragLeave).toHaveBeenCalled()
      })
    })

    it('stops propagation when the ESC key is released and file browser is open', async () => {
      const { container } = await render(<FileDrop renderLabel="fake label" />)
      const input = container.querySelector('input')!

      // clicking the label would open the real file browser dialog, so the
      // input's click handler (it flags the dialog as open) is fired directly
      fireEvent.click(input, { button: 0, detail: 1 })
      await vi.waitFor(() => expect(input).toHaveFocus())

      const stopPropagationSpy = vi.fn()
      input.addEventListener('keyup', (event) => {
        // eslint-disable-next-line no-param-reassign
        event.stopPropagation = stopPropagationSpy
      })

      await userEvent.keyboard('{Escape}')

      expect(stopPropagationSpy).toHaveBeenCalled()
    })
  })
})
