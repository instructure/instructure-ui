/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 - present Instructure, Inc.
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

import { fireEvent, render, screen, act } from '@testing-library/react'
import { vi } from 'vitest'
import type { MockInstance } from 'vitest'
import '@testing-library/jest-dom'

import { Editable } from '../index'
import type { EditableRenderProps } from '../props'

const TEXT_VIEW = 'text-view'
const TEXT_EDIT = 'text-edit'

const childRender = vi.fn(
  ({
    mode,
    getContainerProps,
    getViewerProps,
    getEditorProps,
    getEditButtonProps
  }: EditableRenderProps) => {
    const { isVisible, buttonRef, ...buttonProps } = getEditButtonProps()
    const { onBlur, editorRef } = getEditorProps()
    return (
      <div data-testid="child-container" {...getContainerProps()}>
        {mode === 'view' && <div {...getViewerProps()}>{TEXT_VIEW}</div>}
        {mode === 'edit' && (
          <input
            ref={editorRef}
            onBlur={onBlur}
            defaultValue="textvalue"
            data-testid="edit-mode-input"
          />
        )}
        {
          <button
            {...buttonProps}
            className={isVisible ? 'test-visible' : 'test-hidden'}
          >
            {TEXT_EDIT}
          </button>
        }
      </div>
    )
  }
)

describe('<Editable />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as MockInstance
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as MockInstance
  })

  afterEach(() => {
    consoleWarningMock.mockRestore()
    consoleErrorMock.mockRestore()
    childRender.mockClear()
  })

  it('should render view mode', async () => {
    render(<Editable mode="view" onChangeMode={vi.fn()} render={childRender} />)
    const currentMode = childRender.mock.calls[0][0].mode
    const viewModeText = screen.getByText(TEXT_VIEW)
    const editButton = screen.getByRole('button', { name: TEXT_EDIT })

    expect(childRender).toHaveBeenCalled()
    expect(currentMode).toBe('view')

    expect(viewModeText).toBeInTheDocument()
    expect(editButton).toBeInTheDocument()
  })

  it('should render edit mode', async () => {
    render(<Editable mode="edit" onChangeMode={vi.fn()} render={childRender} />)
    const currentMode = childRender.mock.calls[0][0].mode
    const inputForEdit = screen.getByTestId('edit-mode-input')
    const editButton = screen.getByRole('button', { name: TEXT_EDIT })

    expect(childRender).toHaveBeenCalled()
    expect(currentMode).toBe('edit')

    expect(inputForEdit).toBeInTheDocument()
    expect(editButton).toBeInTheDocument()
  })

  it('should change to edit mode on button click', () => {
    const onChangeModeSpy = vi.fn()

    render(
      <Editable
        mode="view"
        onChangeMode={onChangeModeSpy}
        render={childRender}
      />
    )
    const viewModeText = screen.getByText(TEXT_VIEW)
    const editButton = screen.getByRole('button')

    expect(viewModeText).toBeInTheDocument()

    fireEvent.click(editButton)

    expect(onChangeModeSpy).toHaveBeenCalledWith('edit')
  })

  it('should change to edit mode on component click', () => {
    vi.useFakeTimers()
    const onChangeModeSpy = vi.fn()

    render(
      <Editable
        mode="view"
        onChangeMode={onChangeModeSpy}
        render={childRender}
      />
    )
    const childContainer = screen.getByTestId('child-container')

    fireEvent.mouseDown(childContainer, { buttons: 1 })
    act(() => {
      vi.runAllTimers()
    })

    expect(onChangeModeSpy).toHaveBeenCalledWith('edit')
    vi.useRealTimers()
  })

  it('should set the button to visible on mouse over', () => {
    vi.useFakeTimers()
    const onChangeModeSpy = vi.fn()

    render(
      <Editable
        mode="view"
        onChangeMode={onChangeModeSpy}
        render={childRender}
      />
    )
    const editButton = screen.getByRole('button')

    expect(editButton).toHaveClass('test-hidden')

    fireEvent.mouseOver(editButton)
    act(() => {
      vi.runAllTimers()
    })

    expect(editButton).toHaveClass('test-visible')

    fireEvent.mouseOut(editButton)
    act(() => {
      vi.runAllTimers()
    })

    expect(editButton).toHaveClass('test-hidden')
    vi.useRealTimers()
  })

  it('should change to view mode on editor blur', () => {
    const onChangeModeSpy = vi.fn()

    render(
      <Editable
        mode="edit"
        onChangeMode={onChangeModeSpy}
        render={childRender}
      />
    )
    const inputForEdit = screen.getByTestId('edit-mode-input')

    fireEvent.focus(inputForEdit)
    fireEvent.blur(inputForEdit)

    expect(onChangeModeSpy).toHaveBeenCalledWith('view')
  })

  it('should change to view mode on escape', () => {
    const onChangeModeSpy = vi.fn()

    render(
      <Editable
        mode="edit"
        onChangeMode={onChangeModeSpy}
        render={childRender}
      />
    )
    const inputForEdit = screen.getByTestId('edit-mode-input')

    fireEvent.keyUp(inputForEdit, { key: 'Escape', code: 'Escape' })

    expect(onChangeModeSpy).toHaveBeenCalledWith('view')
  })

  it('should call onChange when the user is finished editing', () => {
    const onChangeSpy = vi.fn()

    const { rerender } = render(
      <Editable
        mode="edit"
        onChangeMode={vi.fn()}
        render={childRender}
        value="initial_value"
        onChange={onChangeSpy}
      />
    )
    const inputForEdit = screen.getByTestId('edit-mode-input')

    fireEvent.change(inputForEdit, { target: { value: 'updated_value' } })

    expect(onChangeSpy).not.toHaveBeenCalled()

    // Simulate mode prop change
    rerender(
      <Editable
        mode="view"
        onChangeMode={vi.fn()}
        render={childRender}
        value="updated_value"
        onChange={onChangeSpy}
      />
    )

    expect(onChangeSpy).toHaveBeenCalledWith('updated_value')
  })

  it('should warn if readOnly + mode="edit"', () => {
    const consoleWarningSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {})

    render(
      <Editable
        mode="edit"
        onChangeMode={vi.fn()}
        render={childRender}
        value="foo"
        readOnly
      />
    )
    const expectedErrorMessage = 'When readOnly is true, mode must be "view"'

    expect(consoleWarningSpy).toHaveBeenCalledWith(
      expect.stringContaining(expectedErrorMessage),
      expect.any(String)
    )

    consoleWarningSpy.mockRestore()
  })
})
