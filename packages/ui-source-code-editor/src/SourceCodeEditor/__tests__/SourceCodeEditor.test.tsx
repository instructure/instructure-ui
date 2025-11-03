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
import { fireEvent, render, screen, act } from '@testing-library/react'
import { vi } from 'vitest'
import type { MockInstance } from 'vitest'

import '@testing-library/jest-dom'
import SourceCodeEditor from '../index'

describe('<SourceCodeEditor />', () => {
  describe('syntax highlight', () => {
    it('should highlight jsx code', async () => {
      const { container } = render(
        <SourceCodeEditor
          label="test"
          language="jsx"
          defaultValue="const a = 2;"
        />
      )

      const activeLine = container.querySelectorAll('.cm-content span')

      expect(activeLine).toHaveLength(3)
      expect(activeLine[0]).toHaveStyle({ color: '#770088' })
      expect(activeLine[1]).toHaveStyle({ color: '#0000ff' })
      expect(activeLine[2]).toHaveStyle({ color: '#116644' })
    })

    it('should link editor element to label using aria-labelledby attribute', async () => {
      const { container } = render(
        <SourceCodeEditor
          label="test"
          language="jsx"
          defaultValue="const a = 2;"
        />
      )
      const editorElement = container.querySelector('[role="textbox"]')
      const labelId = container.querySelector('[class$="-label"]')?.id

      expect(editorElement).toHaveAttribute('aria-labelledby', labelId)
    })
  })

  describe('defaultValue', () => {
    let consoleWarningMock: ReturnType<typeof vi.spyOn>
    let consoleErrorMock: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
      // Mocking console to prevent test output pollution
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
    })

    it('should be applied on load', async () => {
      render(<SourceCodeEditor label="foo" defaultValue="hello" />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveTextContent('hello')
    })
  })

  describe('spellcheck', () => {
    it('should set `spellcheck="true"` on the input', async () => {
      render(<SourceCodeEditor label="foo" spellcheck />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('spellcheck', 'true')
    })
  })

  describe('readOnly', () => {
    it('should still update value when value prop changes', async () => {
      const onChange = vi.fn()
      const { rerender } = render(
        <SourceCodeEditor
          label="foo"
          readOnly
          value="hello"
          onChange={onChange}
        />
      )
      const input = screen.getByRole('textbox')
      expect(input).not.toHaveTextContent('hello world')

      rerender(
        <SourceCodeEditor
          label="foo"
          readOnly
          value="hello world"
          onChange={onChange}
        />
      )

      const inputUpdated = screen.getByRole('textbox')
      expect(inputUpdated).toHaveTextContent('hello world')
    })

    it('should still be focusable', () => {
      vi.useFakeTimers()
      let elementRef: SourceCodeEditor | null = null

      render(
        <SourceCodeEditor
          label="foo"
          readOnly
          ref={(component: SourceCodeEditor) => {
            elementRef = component
          }}
        />
      )
      const input = screen.getByRole('textbox')

      elementRef!.focus()
      act(() => {
        vi.runAllTimers()
      })

      expect(input).toHaveFocus()
      expect(document.activeElement).toBe(input)

      vi.useRealTimers()
    })
  })

  describe('editable turned off', () => {
    it('should set `contenteditable` to false', async () => {
      render(<SourceCodeEditor label="foo" editable={false} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('contenteditable', 'false')
    })

    it('should not be focusable', () => {
      vi.useFakeTimers()
      let elementRef: HTMLDivElement | null = null

      render(
        <SourceCodeEditor
          label="foo"
          editable={false}
          elementRef={(component: HTMLDivElement | null) => {
            elementRef = component
          }}
        />
      )

      const input = screen.getByRole('textbox')

      elementRef!.focus()
      act(() => {
        vi.runAllTimers()
      })

      expect(elementRef).not.toHaveFocus()
      expect(document.activeElement).not.toBe(input)

      vi.useRealTimers()
    })
  })

  describe('lineNumbers', () => {
    it('should display line numbers', async () => {
      const { container } = render(
        <SourceCodeEditor
          label="foo"
          defaultValue={`
            line1
            line2
            line3
          `}
          lineNumbers
        />
      )
      const lineNumbers = container.querySelector('[class$="-lineNumbers"]')!

      expect(lineNumbers).toBeInTheDocument()
      expect(lineNumbers).toBeVisible()
      expect(lineNumbers).toHaveTextContent('123')
    })
  })

  describe('foldGutter', () => {
    it('should display fold icons', async () => {
      render(
        <SourceCodeEditor
          label="foo"
          defaultValue={`const func = () => {
              console.log('foo')
            }`}
          foldGutter
        />
      )

      const gutterIcon = screen.getByTitle('Fold line')

      expect(gutterIcon).toBeInTheDocument()
      expect(gutterIcon).toBeVisible()
    })

    it('should fold lines on click', () => {
      vi.useFakeTimers()
      const { container } = render(
        <SourceCodeEditor
          label="foo"
          defaultValue={`const func = () => {
  console.log('foo')
}`}
          foldGutter
        />
      )
      const editor = container.querySelector('[class$="-codeEditor"]')
      const gutterIcon = screen.getByTitle('Fold line')

      expect(gutterIcon).toBeInTheDocument()

      fireEvent.click(gutterIcon, { button: 0, detail: 1 })
      act(() => {
        vi.runAllTimers()
      })

      const unfoldIcons = screen.getAllByTitle('Unfold line')

      expect(editor).not.toHaveTextContent("console.log('foo')")
      expect(unfoldIcons[1]).toBeVisible()

      vi.useRealTimers()
    })
  })

  describe('highlightActiveLine', () => {
    it('should not highlight line by default', async () => {
      const { container } = render(
        <SourceCodeEditor label="foo" defaultValue={`const myNumber = 8`} />
      )
      const allLines = container.querySelectorAll('[class="cm-line"]')!

      expect(allLines[0]).not.toHaveClass('cm-activeLine')
    })

    it('should highlight line when true', async () => {
      const { container } = render(
        <SourceCodeEditor
          label="foo"
          defaultValue={`const myNumber = 8`}
          highlightActiveLine
        />
      )
      const allLines = container.querySelectorAll('[class$="cm-line"]')!

      expect(allLines[0]).toHaveClass('cm-activeLine')
    })
  })

  describe('highlightActiveLineGutter', () => {
    it('should not highlight gutter element by default', async () => {
      const { container } = render(
        <SourceCodeEditor
          label="foo"
          defaultValue={`const myNumber = 8`}
          lineNumbers
        />
      )
      const allGutterElements = container.querySelectorAll(
        '[class$="cm-gutterElement"]'
      )!

      expect(allGutterElements[0]).not.toHaveClass('cm-activeLineGutter')
    })

    it('should highlight gutter element when true', async () => {
      const { container } = render(
        <SourceCodeEditor
          label="foo"
          defaultValue={`const myNumber = 8`}
          lineNumbers
          highlightActiveLineGutter
        />
      )
      const allGutterElements = container.querySelectorAll(
        '[class^="cm-gutterElement"]'
      )!

      expect(allGutterElements[1]).toHaveClass('cm-activeLineGutter')
    })
  })

  describe('direction', () => {
    it('rtl should apply', async () => {
      render(
        <SourceCodeEditor label="foo" defaultValue="hello" direction={'rtl'} />
      )
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('dir', 'rtl')
    })
  })

  describe('label', () => {
    it('should be inserted in the ScreenReaderContent', async () => {
      const { container } = render(
        <SourceCodeEditor
          label="this is a label for the SR"
          defaultValue="hello"
        />
      )
      const label = container.querySelector('[class$="-screenReaderContent"]')

      expect(label).toHaveTextContent('this is a label for the SR')
    })
  })

  describe('elementRef', () => {
    it('should return with the root element', async () => {
      const elementRef = vi.fn()
      const { container } = render(
        <SourceCodeEditor
          label="foo"
          defaultValue="hello"
          elementRef={elementRef}
        />
      )
      const editor = container.querySelector('[class$="-codeEditor"]')

      expect(elementRef).toHaveBeenCalledWith(editor)
    })
  })

  describe('containerRef', () => {
    it('should return with the root element', async () => {
      const containerRef = vi.fn()
      const { container } = render(
        <SourceCodeEditor
          label="foo"
          defaultValue="hello"
          containerRef={containerRef}
        />
      )
      const editorContainer = container.querySelector(
        '[class$="-codeEditorContainer"]'
      )

      expect(containerRef).toHaveBeenCalledWith(editorContainer)
    })
  })
})
