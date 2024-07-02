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

import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

import { InPlaceEdit } from '../index'
import type { InPlaceEditProps } from '../props'
import { runAxeCheck } from '@instructure/ui-axe-check'

const VIEWER_TEXT = 'viewer-text'
const EDIT_BUTTON_TEXT = 'edit-button-text'

const renderViewer = () => <div>{VIEWER_TEXT}</div>
const renderEditor: InPlaceEditProps['renderEditor'] = ({
  editorRef,
  onBlur
}) => {
  // eslint-disable-line react/prop-types
  return (
    <input
      data-testid="input-editor"
      ref={editorRef}
      onBlur={onBlur}
      defaultValue="textvalue"
      aria-label="Editor"
    />
  )
}
const renderEditButton: InPlaceEditProps['renderEditButton'] = (props) => {
  const elementRef = props.elementRef as (el: Element | null) => void
  const { onClick, onFocus, onBlur, isVisible, readOnly } = props
  return InPlaceEdit.renderDefaultEditButton({
    isVisible,
    readOnly,
    label: EDIT_BUTTON_TEXT,
    ...{ onClick, onFocus, onBlur, elementRef }
  })
}

describe('<InPlaceEdit />', () => {
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

  it('should render view mode', () => {
    render(
      <InPlaceEdit
        mode="view"
        onChangeMode={vi.fn()}
        renderViewer={renderViewer}
        renderEditor={renderEditor}
        renderEditButton={renderEditButton}
      />
    )
    const viewModeText = screen.getByText(VIEWER_TEXT)
    const editButton = screen.getByRole('button')

    expect(viewModeText).toBeInTheDocument()
    expect(editButton).toBeInTheDocument()
    expect(editButton).toHaveTextContent(EDIT_BUTTON_TEXT)
  })

  it('should render view mode with string button label', () => {
    const { container } = render(
      <InPlaceEdit
        mode="view"
        onChangeMode={vi.fn()}
        renderViewer={renderViewer}
        renderEditor={renderEditor}
        renderEditButton={renderEditButton}
      />
    )
    const viewModeText = screen.getByText(VIEWER_TEXT)
    const editButton = screen.getByRole('button')
    const buttonLabel = container.querySelector(
      "[class$='-screenReaderContent']"
    ) as HTMLElement

    expect(viewModeText).toBeInTheDocument()
    expect(editButton).toBeInTheDocument()
    expect(editButton).toContainElement(buttonLabel!)
    expect(buttonLabel).toHaveTextContent(EDIT_BUTTON_TEXT)
  })

  it('should render edit mode', () => {
    render(
      <InPlaceEdit
        mode="edit"
        onChangeMode={vi.fn()}
        renderViewer={renderViewer}
        renderEditor={renderEditor}
        renderEditButton={renderEditButton}
      />
    )
    const inputForEdit = screen.getByTestId('input-editor')

    expect(inputForEdit).toBeInTheDocument()
    expect(document.activeElement).toBe(inputForEdit)
  })

  it('should render a custom edit button', () => {
    const customButtonText = 'custom-button-text'
    render(
      <InPlaceEdit
        mode="view"
        onChangeMode={vi.fn()}
        renderViewer={renderViewer}
        renderEditor={renderEditor}
        renderEditButton={() => {
          return <button data-testid="custom_button">{customButtonText}</button>
        }}
      />
    )
    const viewModeText = screen.getByText(VIEWER_TEXT)
    const customEditButton = screen.getByTestId('custom_button')

    expect(viewModeText).toBeInTheDocument()
    expect(customEditButton).toBeInTheDocument()
    expect(customEditButton).toHaveTextContent(customButtonText)
  })

  it('should switch mode to edit via props, and focus the editor', () => {
    const { rerender, container } = render(
      <InPlaceEdit
        mode="view"
        onChangeMode={vi.fn()}
        renderViewer={renderViewer}
        renderEditor={renderEditor}
        renderEditButton={renderEditButton}
      />
    )
    const viewModeText = screen.getByText(VIEWER_TEXT)
    expect(viewModeText).toBeInTheDocument()

    // Simulate mode prop change
    rerender(
      <InPlaceEdit
        mode="edit"
        onChangeMode={vi.fn()}
        renderViewer={renderViewer}
        renderEditor={renderEditor}
        renderEditButton={renderEditButton}
      />
    )
    const inputForEdit = screen.getByTestId('input-editor')

    expect(container).not.toHaveTextContent(VIEWER_TEXT)
    expect(inputForEdit).toBeInTheDocument()
    expect(document.activeElement).toBe(inputForEdit)
  })

  it('should switch mode to view via props, and focus the edit button', () => {
    const { rerender, container } = render(
      <InPlaceEdit
        mode="edit"
        onChangeMode={vi.fn()}
        renderViewer={renderViewer}
        renderEditor={renderEditor}
        renderEditButton={renderEditButton}
      />
    )
    const inputForEdit = screen.getByTestId('input-editor')

    expect(container).not.toHaveTextContent(VIEWER_TEXT)
    expect(inputForEdit).toBeInTheDocument()

    // Simulate mode prop change
    rerender(
      <InPlaceEdit
        mode="view"
        onChangeMode={vi.fn()}
        renderViewer={renderViewer}
        renderEditor={renderEditor}
        renderEditButton={renderEditButton}
      />
    )
    const inputForEditAfterModeChange = container.querySelector(
      "[id='input-editor']"
    )
    const editButton = screen.getByRole('button')

    expect(container).toHaveTextContent(VIEWER_TEXT)
    expect(inputForEditAfterModeChange).not.toBeInTheDocument()
    expect(editButton).toBeInTheDocument()
    expect(editButton).toHaveTextContent(EDIT_BUTTON_TEXT)
    expect(document.activeElement).toBe(editButton)
  })

  it('should meet a11y standards in view mode', async () => {
    const { container } = render(
      <InPlaceEdit
        mode="view"
        onChangeMode={vi.fn()}
        renderViewer={renderViewer}
        renderEditor={renderEditor}
        renderEditButton={renderEditButton}
      />
    )
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  it('should meet a11y standards in edit mode', async () => {
    const { container } = render(
      <InPlaceEdit
        mode="edit"
        onChangeMode={vi.fn()}
        renderViewer={renderViewer}
        renderEditor={renderEditor}
        renderEditButton={renderEditButton}
      />
    )
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })
})
