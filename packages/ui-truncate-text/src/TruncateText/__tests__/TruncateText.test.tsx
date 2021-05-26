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
import { expect, mount, stub, wait, within } from '@instructure/ui-test-utils'
// eslint-disable-next-line instructure-ui/no-relative-package-imports
import { Text } from '../../../../ui-text/es/Text'

import { TruncateText } from '../index'

describe('<TruncateText />', async () => {
  const defaultText = 'Hello world! This is a long string that should truncate'

  it('should truncate text', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <div style={{ width: '200px' }}>
        <TruncateText>{defaultText}</TruncateText>
      </div>
    )

    const renderedContent = within(subject.getDOMNode())
    const text = renderedContent.getTextContent()!

    expect(text.indexOf('truncate')).to.equal(-1)
    expect(text.indexOf('\u2026')).to.not.equal(-1)
  })

  it('should recalculate when parent width changes', async () => {
    let container
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <div
        style={{ width: '200px' }}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; style: { width: string;... Remove this comment to see the full error message
        componentRef={(el) => {
          container = el
        }}
      >
        <TruncateText>{defaultText}</TruncateText>
      </div>
    )

    const renderedContent = within(subject.getDOMNode())
    const text1 = renderedContent.getTextContent()

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    container.style.width = '100px'

    // @ts-expect-error ts-migrate(7034) FIXME: Variable 'text2' implicitly has type 'any' in some... Remove this comment to see the full error message
    let text2
    await wait(() => {
      text2 = renderedContent.getTextContent()
      expect(text1).to.not.equal(text2)
    })

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    container.style.width = '400px'

    await wait(() => {
      // @ts-expect-error ts-migrate(7005) FIXME: Variable 'text2' implicitly has an 'any' type.
      expect(renderedContent.getTextContent()).to.not.equal(text2)
    })
  })

  it('should preserve node structure', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <div style={{ width: '200px' }}>
        <TruncateText>
          <p className="testClass">
            Hello world! <strong>This is a</strong> long string that{' '}
            <em>should truncate</em>
          </p>
        </TruncateText>
      </div>
    )

    const renderedContent = within(subject.getDOMNode())
    const paragraph = await renderedContent.find('p')

    expect(await paragraph.find('strong')).to.exist()
    expect(await paragraph.find('em')).to.exist()

    expect(paragraph.hasClass('testClass')).to.be.true()
    expect(paragraph.getDOMNode().children.length).to.equal(3)
  })

  it('should recalculate if props change', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <div style={{ width: '200px' }}>
        <TruncateText>{defaultText}</TruncateText>
      </div>
    )

    const renderedContent = within(subject.getDOMNode())
    const text = renderedContent.getTextContent()

    await subject.setProps({
      children: (
        <TruncateText position="middle" ellipsis="(...)">
          {defaultText}
        </TruncateText>
      )
    })

    await wait(() => {
      expect(renderedContent.getTextContent()).to.not.equal(text)
    })
  })

  it('should re-render with new children if children change', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <TruncateText>
        <span>{defaultText}</span>
      </TruncateText>
    )

    const renderedContent = within(subject.getDOMNode())
    const text = renderedContent.getTextContent()

    await subject.setProps({
      children: <span>This is a different string of text</span>
    })

    await wait(() => {
      expect(renderedContent.getTextContent()).to.not.equal(text)
    })
  })

  it('should call onUpdate when text changes', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const onUpdate = stub()

    let container
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div
        style={{ width: '700px' }}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; style: { width: string;... Remove this comment to see the full error message
        componentRef={(el) => {
          container = el
        }}
      >
        <TruncateText onUpdate={onUpdate}>{defaultText}</TruncateText>
      </div>
    )

    expect(onUpdate).to.not.have.been.called()

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    container.style.width = '100px'
    await wait(() => {
      expect(onUpdate).to.have.been.calledWith(true)
    })

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    container.style.width = '800px'
    await wait(() => {
      expect(onUpdate).to.have.been.calledWith(false)
    })
  })

  it('should warn if children prop receives too deep of a node tree', async () => {
    const consoleError = stub(console, 'error')
    const warning =
      'Some children are too deep in the node tree and will not render.'
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div style={{ width: '200px' }}>
        <TruncateText>
          Hello world!{' '}
          <strong>
            <span>This is a</span>
          </strong>{' '}
          long string that should truncate
        </TruncateText>
      </div>
    )
    await wait(() => {
      expect(consoleError).to.have.been.calledWithMatch(warning)
    })
  })

  it('should render text at any size with no lineHeight set', async () => {
    let stage
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div style={{ width: '200px' }}>
        <span
          ref={(el) => {
            stage = el
          }}
        >
          <Text size="x-small">
            <TruncateText>xsmall</TruncateText>
          </Text>
          <Text size="small">
            <TruncateText>small</TruncateText>
          </Text>
          <Text size="medium">
            <TruncateText>medium</TruncateText>
          </Text>
          <Text size="large">
            <TruncateText>large</TruncateText>
          </Text>
          <Text size="x-large">
            <TruncateText>xlarge</TruncateText>
          </Text>
          <Text size="xx-large">
            <TruncateText>xxlarge</TruncateText>
          </Text>
        </span>
      </div>
    )

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    expect(stage.textContent).to.equal('xsmallsmallmediumlargexlargexxlarge')
  })

  it('should handle the empty string as a child', async () => {
    let error = false

    try {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const subject = await mount(<TruncateText>{''}</TruncateText>)

      await subject.setProps({ children: 'hello world' })
      await subject.setProps({ children: '' })
    } catch (e) {
      error = true
    }

    expect(error).to.be.false()
  })

  it('should meet a11y standards', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <div style={{ width: '200px' }}>
        <TruncateText>{defaultText}</TruncateText>
      </div>
    )
    const renderedContent = within(subject.getDOMNode())
    expect(await renderedContent.accessible()).to.be.true()
  })
})
