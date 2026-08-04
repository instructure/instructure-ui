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

import type { MockInstance } from 'vitest'
import { Editable } from '@instructure/ui-editable/latest'
import type { EditableRenderProps } from '../v1/props'
import { fireEvent } from '@testing-library/dom'
import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

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
    await render(
      <Editable mode="view" onChangeMode={vi.fn()} render={childRender} />
    )
    const currentMode = childRender.mock.calls[0][0].mode
    const viewModeText = page.getByText(TEXT_VIEW).element()
    const editButton = page.getByRole('button', { name: TEXT_EDIT }).element()

    expect(childRender).toHaveBeenCalled()
    expect(currentMode).toBe('view')

    expect(viewModeText).toBeInTheDocument()
    expect(editButton).toBeInTheDocument()
  })

  it('should render edit mode', async () => {
    await render(
      <Editable mode="edit" onChangeMode={vi.fn()} render={childRender} />
    )
    const currentMode = childRender.mock.calls[0][0].mode
    const inputForEdit = page.getByTestId('edit-mode-input').element()
    const editButton = page.getByRole('button', { name: TEXT_EDIT }).element()

    expect(childRender).toHaveBeenCalled()
    expect(currentMode).toBe('edit')

    expect(inputForEdit).toBeInTheDocument()
    expect(editButton).toBeInTheDocument()
  })

  it('should change to edit mode on button click', async () => {
    const onChangeModeSpy = vi.fn()

    await render(
      <Editable
        mode="view"
        onChangeMode={onChangeModeSpy}
        render={childRender}
      />
    )
    const viewModeText = page.getByText(TEXT_VIEW).element()
    const editButton = page.getByRole('button').element()

    expect(viewModeText).toBeInTheDocument()

    fireEvent.click(editButton)

    expect(onChangeModeSpy).toHaveBeenCalledWith('edit')
  })

  it('should change to edit mode on component click', async () => {
    const onChangeModeSpy = vi.fn()

    await render(
      <Editable
        mode="view"
        onChangeMode={onChangeModeSpy}
        render={childRender}
      />
    )
    const childContainer = page.getByTestId('child-container').element()

    await userEvent.click(childContainer)

    await vi.waitFor(() => expect(onChangeModeSpy).toHaveBeenCalledWith('edit'))
  })

  it('should set the button to visible on mouse over', async () => {
    const onChangeModeSpy = vi.fn()

    await render(
      <Editable
        mode="view"
        onChangeMode={onChangeModeSpy}
        render={childRender}
      />
    )
    const editButton = page.getByRole('button').element()

    expect(editButton).toHaveClass('test-hidden')

    fireEvent.mouseOver(editButton)

    await vi.waitFor(() => {
      expect(editButton).toHaveClass('test-visible')
    })

    fireEvent.mouseOut(editButton)

    await vi.waitFor(() => {
      expect(editButton).toHaveClass('test-hidden')
    })
  })

  it('should change to view mode on editor blur', async () => {
    const onChangeModeSpy = vi.fn()

    await render(
      <Editable
        mode="edit"
        onChangeMode={onChangeModeSpy}
        render={childRender}
      />
    )
    const inputForEdit = page.getByTestId('edit-mode-input').element()

    fireEvent.focus(inputForEdit)
    fireEvent.blur(inputForEdit)

    expect(onChangeModeSpy).toHaveBeenCalledWith('view')
  })

  it('should change to view mode on escape', async () => {
    const onChangeModeSpy = vi.fn()

    await render(
      <Editable
        mode="edit"
        onChangeMode={onChangeModeSpy}
        render={childRender}
      />
    )
    const inputForEdit = page.getByTestId('edit-mode-input').element()

    fireEvent.keyUp(inputForEdit, { key: 'Escape', code: 'Escape' })

    expect(onChangeModeSpy).toHaveBeenCalledWith('view')
  })

  it('should call onChange when the user is finished editing', async () => {
    const onChangeSpy = vi.fn()

    const { rerender } = await render(
      <Editable
        mode="edit"
        onChangeMode={vi.fn()}
        render={childRender}
        value="initial_value"
        onChange={onChangeSpy}
      />
    )
    const inputForEdit = page.getByTestId('edit-mode-input').element()

    fireEvent.change(inputForEdit, { target: { value: 'updated_value' } })

    expect(onChangeSpy).not.toHaveBeenCalled()

    // Simulate mode prop change
    await rerender(
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

  it('should warn if readOnly + mode="edit"', async () => {
    const consoleWarningSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {})

    await render(
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
