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

import { getComputedStyle } from '@instructure/ui-dom-utils'
import { expect, mount, stub, wait } from '@instructure/ui-test-utils'
import { SourceCodeEditor } from '../index'

import { SourceCodeEditorLocator } from '../SourceCodeEditorLocator'

describe('<SourceCodeEditor />', async () => {
  describe('defaultValue', async () => {
    it('should be applied on load', async () => {
      await mount(<SourceCodeEditor label="foo" defaultValue="hello" />)

      const editor = await SourceCodeEditorLocator.find()
      const input = await editor.findInput()

      expect(input.getTextContent()).to.include('hello')
    })

    it('should behave uncontrolled', async () => {
      const onChange = stub()
      await mount(
        <SourceCodeEditor
          label="foo"
          defaultValue="hello"
          onChange={onChange}
        />
      )

      const editor = await SourceCodeEditorLocator.find()
      const input = await editor.findInput()

      await input.change({ target: { textContent: 'hello world' } })

      await wait(() => {
        expect(onChange).to.have.been.calledWith('hello world')
        expect(input.getTextContent()).to.include('hello world')
      })
    })
  })

  describe('value', async () => {
    it('should behave controlled', async () => {
      const onChange = stub()
      const subject = await mount(
        <SourceCodeEditor label="foo" value="hello" onChange={onChange} />
      )

      const editor = await SourceCodeEditorLocator.find()
      const input = await editor.findInput()

      await input.change({ target: { textContent: 'hello world' } })

      await wait(() => {
        expect(onChange).to.have.been.calledWith('hello world')
        expect(input.getTextContent()).to.include('hello')
        expect(input.getTextContent()).to.not.include('world')
      })

      await subject.setProps({ value: 'hello world' })

      await wait(() => {
        expect(input.getTextContent()).to.include('hello world')
      })
    })
  })

  describe('autofocus', async () => {
    it('should focus editor on load', async () => {
      let componentRef: SourceCodeEditor | null = null
      await mount(
        <SourceCodeEditor
          label="foo"
          autofocus
          //@ts-expect-error TODO this is coming from ReactComponentWrapper
          componentRef={(component: SourceCodeEditor) => {
            componentRef = component
          }}
        />
      )
      const editor = await SourceCodeEditorLocator.find()
      const input = await editor.findInput()

      await wait(() => {
        expect(componentRef!.hasFocus).to.be.true()
        expect(document.activeElement).to.equal(input.getDOMNode())
      })
    })
  })

  describe('spellcheck', async () => {
    it('should set `spellcheck="true"` on the input', async () => {
      await mount(<SourceCodeEditor label="foo" spellcheck />)
      const editor = await SourceCodeEditorLocator.find()
      const input = await editor.findInput()

      expect(input.getAttribute('spellcheck')).to.equal('true')
    })
  })

  describe('readOnly', async () => {
    it("shouldn't update value when typing", async () => {
      await mount(<SourceCodeEditor label="foo" readOnly />)
      const editor = await SourceCodeEditorLocator.find()
      const input = await editor.findInput()

      await input.change({ target: { textContent: 'hello world' } })

      await wait(() => {
        expect(input.getTextContent()).to.not.include('hello world')
      })
    })

    it('should still update value when value prop changes', async () => {
      const onChange = stub()
      const subject = await mount(
        <SourceCodeEditor
          label="foo"
          readOnly
          value="hello"
          onChange={onChange}
        />
      )
      const editor = await SourceCodeEditorLocator.find()
      const input = await editor.findInput()

      await subject.setProps({ value: 'hello world' })

      await wait(() => {
        expect(input.getTextContent()).to.include('hello world')
      })
    })

    it('should still be focusable', async () => {
      let componentRef: SourceCodeEditor | null = null

      await mount(
        <SourceCodeEditor
          label="foo"
          readOnly
          //@ts-expect-error TODO this is coming from ReactComponentWrapper
          componentRef={(component: SourceCodeEditor) => {
            componentRef = component
          }}
        />
      )

      const editor = await SourceCodeEditorLocator.find()
      const input = await editor.findInput()

      await componentRef!.focus()

      await wait(() => {
        expect(componentRef!.hasFocus).to.be.true()
        expect(document.activeElement).to.equal(input.getDOMNode())
      })
    })
  })

  describe('editable turned off', async () => {
    it('should set `contenteditable` to false', async () => {
      await mount(<SourceCodeEditor label="foo" editable={false} />)
      const editor = await SourceCodeEditorLocator.find()
      const input = await editor.findInput()

      expect(input.getAttribute('contenteditable')).to.equal('false')
    })

    it('should not be focusable', async () => {
      let componentRef: SourceCodeEditor | null = null

      await mount(
        <SourceCodeEditor
          label="foo"
          editable={false}
          //@ts-expect-error TODO this is coming from ReactComponentWrapper
          componentRef={(component: SourceCodeEditor) => {
            componentRef = component
          }}
        />
      )

      const editor = await SourceCodeEditorLocator.find()
      const input = await editor.findInput()

      await componentRef!.focus()

      await wait(() => {
        expect(componentRef!.hasFocus).to.equal(false)
        expect(document.activeElement).to.not.equal(input.getDOMNode())
      })
    })
  })

  describe('lineNumbers', async () => {
    it('should display line numbers', async () => {
      await mount(
        <SourceCodeEditor
          label="foo"
          defaultValue={`line1
line2
line3`}
          lineNumbers
        />
      )
      const editor = await SourceCodeEditorLocator.find()
      const gutter = await editor.findGutter()

      expect(gutter).to.be.visible()
      expect(gutter.getTextContent()).to.include('123')
    })
  })

  describe('foldGutter', async () => {
    it('should display fold icons', async () => {
      await mount(
        <SourceCodeEditor
          label="foo"
          defaultValue={`const func = () => {
  console.log('foo')
}`}
          foldGutter
        />
      )
      const editor = await SourceCodeEditorLocator.find()
      const gutter = await editor.findGutter()
      const gutterIcon = await gutter.find('[title="Fold line"]')

      expect(gutterIcon).to.be.visible()
    })

    it('should fold lines on click', async () => {
      await mount(
        <SourceCodeEditor
          label="foo"
          defaultValue={`const func = () => {
  console.log('foo')
}`}
          foldGutter
        />
      )
      const editor = await SourceCodeEditorLocator.find()
      const gutter = await editor.findGutter()
      const gutterIcon = await gutter.find('[title="Fold line"]')

      await gutterIcon.click()

      const unfoldIcons = await gutter.findAll('[title="Unfold line"]')

      expect(editor.getTextContent()).to.not.contain("console.log('foo')")
      expect(unfoldIcons[1]).to.be.visible()
    })
  })

  describe('highlightActiveLine', async () => {
    it('should not highlight line by default', async () => {
      await mount(
        <SourceCodeEditor label="foo" defaultValue={`const myNumber = 8`} />
      )
      const editor = await SourceCodeEditorLocator.find()
      const allLines = await editor.findAllLines()

      expect(allLines[0].hasClass('cm-activeLine')).to.be.false()
    })

    it('should highlight line when true', async () => {
      await mount(
        <SourceCodeEditor
          label="foo"
          defaultValue={`const myNumber = 8`}
          highlightActiveLine
        />
      )
      const editor = await SourceCodeEditorLocator.find()
      const allLines = await editor.findAllLines()

      expect(allLines[0].hasClass('cm-activeLine')).to.be.true()
    })
  })

  describe('highlightActiveLineGutter', async () => {
    it('should not highlight gutter element by default', async () => {
      await mount(
        <SourceCodeEditor
          label="foo"
          defaultValue={`const myNumber = 8`}
          lineNumbers
        />
      )
      const editor = await SourceCodeEditorLocator.find()
      const allGutterElements = await editor.findAllGutterElements()

      expect(allGutterElements[0].hasClass('cm-activeLineGutter')).to.be.false()
    })

    it('should highlight gutter element when true', async () => {
      await mount(
        <SourceCodeEditor
          label="foo"
          defaultValue={`const myNumber = 8`}
          lineNumbers
          highlightActiveLineGutter
        />
      )
      const editor = await SourceCodeEditorLocator.find()
      const allGutterElements = await editor.findAllGutterElements()

      expect(allGutterElements[0].hasClass('cm-activeLineGutter')).to.be.true()
    })
  })

  describe('lineWrapping', async () => {
    const longText =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in aliquam erat, sit amet imperdiet arcu. Curabitur cursus et diam in pharetra.'

    it('should not wrap lines by default', async () => {
      await mount(<SourceCodeEditor label="foo" defaultValue={longText} />)
      const editor = await SourceCodeEditorLocator.find()
      const scroller = await editor.findScroller()
      const { scrollWidth, clientWidth } = scroller.getDOMNode()

      expect(scrollWidth > clientWidth).to.be.true()
    })

    it('should wrap lines when true', async () => {
      await mount(
        <SourceCodeEditor label="foo" defaultValue={longText} lineWrapping />
      )
      const editor = await SourceCodeEditorLocator.find()
      const scroller = await editor.findScroller()
      const { scrollWidth, clientWidth } = scroller.getDOMNode()

      expect(scrollWidth > clientWidth).to.be.false()
    })
  })

  describe('direction', async () => {
    it('rtl should apply', async () => {
      await mount(
        <SourceCodeEditor label="foo" defaultValue="hello" direction={'rtl'} />
      )
      const editor = await SourceCodeEditorLocator.find()
      const input = await editor.findInput()

      expect(input.getAttribute('dir')).to.equal('rtl')
    })
  })

  describe('label', async () => {
    it('should be inserted in the ScreenReaderContent', async () => {
      await mount(
        <SourceCodeEditor
          label="this is a label for the SR"
          defaultValue="hello"
        />
      )
      const editor = await SourceCodeEditorLocator.find()
      const label = await editor.findLabel()

      expect(label.getTextContent()).to.equal('this is a label for the SR')
    })
  })

  describe('width', async () => {
    it('should apply and update width', async () => {
      const testValue1 = '300px'
      const testValue2 = '500px'

      const subject = await mount(
        <SourceCodeEditor
          label="this is a label for the SR"
          defaultValue="hello"
          width={testValue1}
        />
      )

      const editor = await SourceCodeEditorLocator.find()
      const cmRoot = await editor.findCodeMirrorRoot()
      const input = await editor.findInput()

      expect(getComputedStyle(editor.getDOMNode()).width).to.equal(testValue1)
      expect(getComputedStyle(cmRoot.getDOMNode()).width).to.equal(testValue1)
      expect(getComputedStyle(input.getDOMNode()).width).to.equal(testValue1)

      await subject.setProps({ width: testValue2 })

      expect(getComputedStyle(editor.getDOMNode()).width).to.equal(testValue2)
      expect(getComputedStyle(cmRoot.getDOMNode()).width).to.equal(testValue2)
      expect(getComputedStyle(input.getDOMNode()).width).to.equal(testValue2)
    })
  })

  describe('height', async () => {
    it('should apply and update height', async () => {
      const testValue1 = '300px'
      const testValue2 = '500px'

      const subject = await mount(
        <SourceCodeEditor
          label="this is a label for the SR"
          defaultValue="hello"
          height={testValue1}
        />
      )

      const editor = await SourceCodeEditorLocator.find()
      const cmRoot = await editor.findCodeMirrorRoot()

      expect(getComputedStyle(editor.getDOMNode()).height).to.equal(testValue1)
      expect(getComputedStyle(cmRoot.getDOMNode()).height).to.equal(testValue1)

      await subject.setProps({ height: testValue2 })

      expect(getComputedStyle(editor.getDOMNode()).height).to.equal(testValue2)
      expect(getComputedStyle(cmRoot.getDOMNode()).height).to.equal(testValue2)
    })
  })

  describe('elementRef', async () => {
    it('should return with the root element', async () => {
      const elementRef = stub()
      await mount(
        <SourceCodeEditor
          label="foo"
          defaultValue="hello"
          elementRef={elementRef}
        />
      )
      const editor = await SourceCodeEditorLocator.find()

      expect(elementRef).to.have.been.calledWith(editor.getDOMNode())
    })
  })

  describe('containerRef', async () => {
    it('should return with the root element', async () => {
      const containerRef = stub()
      await mount(
        <SourceCodeEditor
          label="foo"
          defaultValue="hello"
          containerRef={containerRef}
        />
      )
      const editor = await SourceCodeEditorLocator.find()
      const container = await editor.findContainer()

      expect(containerRef).to.have.been.calledWith(container.getDOMNode())
    })
  })
})
