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
import type { MockInstance } from 'vitest'

import { SourceCodeEditor } from '@instructure/ui-source-code-editor/latest'

describe('<SourceCodeEditor />', () => {
  describe('syntax highlight', () => {
    it('should highlight jsx code', async () => {
      const { container } = await render(
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
      const { container } = await render(
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
      await render(<SourceCodeEditor label="foo" defaultValue="hello" />)
      const input = page.getByRole('textbox').element()

      expect(input).toHaveTextContent('hello')
    })
  })

  describe('spellcheck', () => {
    it('should set `spellcheck="true"` on the input', async () => {
      await render(<SourceCodeEditor label="foo" spellcheck />)
      const input = page.getByRole('textbox').element()

      expect(input).toHaveAttribute('spellcheck', 'true')
    })
  })

  describe('readOnly', () => {
    it('should still update value when value prop changes', async () => {
      const onChange = vi.fn()
      const { rerender } = await render(
        <SourceCodeEditor
          label="foo"
          readOnly
          value="hello"
          onChange={onChange}
        />
      )
      const input = page.getByRole('textbox').element()
      expect(input).not.toHaveTextContent('hello world')

      await rerender(
        <SourceCodeEditor
          label="foo"
          readOnly
          value="hello world"
          onChange={onChange}
        />
      )

      const inputUpdated = page.getByRole('textbox').element()
      expect(inputUpdated).toHaveTextContent('hello world')
    })

    it('should still be focusable', async () => {
      let elementRef: SourceCodeEditor | null = null

      await render(
        <SourceCodeEditor
          label="foo"
          readOnly
          ref={(component: SourceCodeEditor) => {
            elementRef = component
          }}
        />
      )
      const input = page.getByRole('textbox').element()

      elementRef!.focus()

      await vi.waitFor(() => {
        expect(input).toHaveFocus()
        expect(document.activeElement).toBe(input)
      })
    })
  })

  describe('editable turned off', () => {
    it('should set `contenteditable` to false', async () => {
      await render(<SourceCodeEditor label="foo" editable={false} />)

      const input = page.getByRole('textbox').element()
      expect(input).toHaveAttribute('contenteditable', 'false')
    })

    it('should not be focusable', async () => {
      let elementRef: HTMLDivElement | null = null

      await render(
        <SourceCodeEditor
          label="foo"
          editable={false}
          elementRef={(component: HTMLDivElement | null) => {
            elementRef = component
          }}
        />
      )

      const input = page.getByRole('textbox').element()

      elementRef!.focus()

      await vi.waitFor(() => {
        expect(elementRef).not.toHaveFocus()
        expect(document.activeElement).not.toBe(input)
      })
    })
  })

  describe('lineNumbers', () => {
    it('should display line numbers', async () => {
      const { container } = await render(
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
      await render(
        <SourceCodeEditor
          label="foo"
          defaultValue={`const func = () => {
              console.log('foo')
            }`}
          foldGutter
        />
      )

      const gutterIcon = page.getByTitle('Fold line', { exact: true }).element()

      expect(gutterIcon).toBeInTheDocument()
      expect(gutterIcon).toBeVisible()
    })

    it('should fold lines on click', async () => {
      const { container } = await render(
        <SourceCodeEditor
          label="foo"
          defaultValue={`const func = () => {
  console.log('foo')
}`}
          foldGutter
        />
      )
      const editor = container.querySelector('[class$="-codeEditor"]')
      const gutterIcon = page.getByTitle('Fold line', { exact: true }).element()

      expect(gutterIcon).toBeInTheDocument()

      await userEvent.click(gutterIcon)

      const unfoldIcons = page.getByTitle('Unfold line').elements()

      expect(editor).not.toHaveTextContent("console.log('foo')")
      expect(unfoldIcons[1]).toBeVisible()
    })
  })

  describe('highlightActiveLine', () => {
    it('should not highlight line by default', async () => {
      const { container } = await render(
        <SourceCodeEditor label="foo" defaultValue={`const myNumber = 8`} />
      )
      const allLines = container.querySelectorAll('[class="cm-line"]')!

      expect(allLines[0]).not.toHaveClass('cm-activeLine')
    })

    it('should highlight line when true', async () => {
      const { container } = await render(
        <SourceCodeEditor
          label="foo"
          defaultValue={`const myNumber = 8`}
          highlightActiveLine
        />
      )
      const allLines = container.querySelectorAll('.cm-line')!
      expect(allLines[0]).toHaveClass('cm-activeLine')
    })
  })

  describe('highlightActiveLineGutter', () => {
    it('should not highlight gutter element by default', async () => {
      const { container } = await render(
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
      const { container } = await render(
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
      await render(
        <SourceCodeEditor label="foo" defaultValue="hello" direction={'rtl'} />
      )
      const input = page.getByRole('textbox').element()

      expect(input).toHaveAttribute('dir', 'rtl')
    })
  })

  describe('label', () => {
    it('should be inserted in the ScreenReaderContent', async () => {
      const { container } = await render(
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
      const { container } = await render(
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
      const { container } = await render(
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

  describe('Component tests', () => {
    const LONG_TEXT =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in aliquam erat, sit amet imperdiet arcu. Curabitur cursus et diam in pharetra.'

    it('should behave uncontrolled', async () => {
      const onChange = vi.fn()

      await render(
        <SourceCodeEditor
          label="foo"
          defaultValue="hello"
          onChange={onChange}
        />
      )
      const input = page.getByRole('textbox').element()

      expect(input).toHaveTextContent('hello')

      await userEvent.click(input)
      await userEvent.keyboard(' world')

      await vi.waitFor(() => {
        expect(onChange).toHaveBeenCalledWith('hello world')
      })
      expect(input).toHaveTextContent('hello world')
    })

    it('should behave controlled', async () => {
      const onChange = vi.fn()

      const { rerender } = await render(
        <SourceCodeEditor label="foo" value="hello" onChange={onChange} />
      )
      const input = page.getByRole('textbox').element()

      expect(input).toHaveTextContent('hello')

      await userEvent.click(input)
      await userEvent.keyboard('w')

      await vi.waitFor(() => {
        expect(onChange).toHaveBeenCalledWith('hellow')
      })
      expect(input.textContent).toBe('hello')

      // Set prop: value
      await rerender(
        <SourceCodeEditor label="foo" value="hello world" onChange={onChange} />
      )

      await vi.waitFor(() => {
        expect(page.getByRole('textbox').element().textContent).toBe(
          'hello world'
        )
      })
    })

    it('should focus editor on load', async () => {
      await render(<SourceCodeEditor label="foo" autofocus />)
      const input = page.getByRole('textbox').element()

      await vi.waitFor(() => {
        expect(input).toHaveFocus()
      })
    })

    it("shouldn't update value when typing if readOnly", async () => {
      await render(<SourceCodeEditor label="foo" readOnly />)
      const input = page.getByRole('textbox').element()

      expect(input).not.toHaveTextContent('w')

      await userEvent.click(input)
      await userEvent.keyboard('w')

      expect(input).not.toHaveTextContent('w')
    })

    it('should wrap lines when lineWrapping is true', async () => {
      const { rerender } = await render(
        <SourceCodeEditor label="foo" defaultValue={LONG_TEXT} />
      )
      const styles = window.getComputedStyle(
        page.getByRole('textbox').element()
      )
      const boxWidth = parseFloat(styles.width)
      const boxHeight = parseFloat(styles.height)

      // Set prop: lineWrapping
      await rerender(
        <SourceCodeEditor label="foo" defaultValue={LONG_TEXT} lineWrapping />
      )
      const wrappedStyles = window.getComputedStyle(
        page.getByRole('textbox').element()
      )

      expect(parseFloat(wrappedStyles.width)).toBeLessThan(boxWidth)
      expect(parseFloat(wrappedStyles.height)).toBeGreaterThan(boxHeight)
    })

    it('should apply and update width', async () => {
      const testValue1 = '300px'
      const testValue2 = '500px'

      const { container, rerender } = await render(
        <SourceCodeEditor
          label="this is a label for the SR"
          defaultValue="hello"
          width={testValue1}
        />
      )
      const codeEditor = () =>
        container.querySelector('[class$="-codeEditor"]')!
      const cmEditor = () => container.querySelector('.cm-editor')!
      const textbox = () => page.getByRole('textbox').element()

      expect(window.getComputedStyle(codeEditor()).width).toBe(testValue1)
      expect(window.getComputedStyle(cmEditor()).width).toBe(testValue1)
      expect(window.getComputedStyle(textbox()).width).toBe(testValue1)

      // Set prop: width
      await rerender(
        <SourceCodeEditor
          label="this is a label for the SR"
          defaultValue="hello"
          width={testValue2}
        />
      )

      expect(window.getComputedStyle(codeEditor()).width).toBe(testValue2)
      expect(window.getComputedStyle(cmEditor()).width).toBe(testValue2)
      expect(window.getComputedStyle(textbox()).width).toBe(testValue2)
    })

    it('should apply and update height', async () => {
      const testValue1 = '300px'
      const testValue2 = '500px'

      const { container, rerender } = await render(
        <SourceCodeEditor
          label="this is a label for the SR"
          defaultValue="hello"
          height={testValue1}
        />
      )
      const codeEditor = () =>
        container.querySelector('[class$="-codeEditor"]')!
      const cmEditor = () => container.querySelector('.cm-editor')!
      const textbox = () => page.getByRole('textbox').element()

      expect(window.getComputedStyle(codeEditor()).height).toBe(testValue1)
      expect(window.getComputedStyle(cmEditor()).height).toBe(testValue1)
      expect(window.getComputedStyle(textbox()).height).toBe(testValue1)

      // Set prop: height
      await rerender(
        <SourceCodeEditor
          label="this is a label for the SR"
          defaultValue="hello"
          height={testValue2}
        />
      )

      expect(window.getComputedStyle(codeEditor()).height).toBe(testValue2)
      expect(window.getComputedStyle(cmEditor()).height).toBe(testValue2)
      expect(window.getComputedStyle(textbox()).height).toBe(testValue2)
    })
  })
})
