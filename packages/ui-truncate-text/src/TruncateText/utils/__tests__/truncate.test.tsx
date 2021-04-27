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
import { expect, mount, spy } from '@instructure/ui-test-utils'
import { within } from '@instructure/ui-utils'

import truncate from '../truncate'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('truncate', () => {
  const defaultText = 'Hello world! This is a long string that should truncate'

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should truncate text when no options are given', async () => {
    let stage
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div style={{ width: '200px' }}>
        <span
          ref={(el) => {
            stage = el
          }}
        >
          {defaultText}
        </span>
      </div>
    )

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    truncate(stage)
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const text = stage.textContent

    expect(text.indexOf('truncate')).to.equal(-1)
    expect(text.indexOf('\u2026')).to.not.equal(-1)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should truncate in the middle of a string', async () => {
    let stage
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div style={{ width: '200px' }}>
        <span
          ref={(el) => {
            stage = el
          }}
        >
          {defaultText}
        </span>
      </div>
    )

    truncate(stage, { position: 'middle' })
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const text = stage.textContent

    expect(text.indexOf('long')).to.equal(-1)
    expect(text.indexOf('Hello')).to.not.equal(-1)
    expect(text.indexOf('truncate')).to.not.equal(-1)
    expect(text.indexOf('\u2026')).to.not.equal(-1)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should truncate at words', async () => {
    let stage
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div style={{ width: '220px' }}>
        <span
          ref={(el) => {
            stage = el
          }}
        >
          {defaultText}
        </span>
      </div>
    )

    truncate(stage, { truncate: 'word' })

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const text = stage.textContent

    expect(text.indexOf('string')).to.equal(-1)
    expect(text.indexOf('st')).to.equal(-1)
    expect(text.indexOf('long')).to.not.equal(-1)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should allow custom ellipsis', async () => {
    let stage
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div style={{ width: '200px' }}>
        <span
          ref={(el) => {
            stage = el
          }}
        >
          {defaultText}
        </span>
      </div>
    )

    truncate(stage, { ellipsis: '(...)' })
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const text = stage.textContent

    expect(text.slice(-5)).to.equal('(...)')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should preserve node structure', async () => {
    let stage
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div style={{ width: '200px' }}>
        <p
          ref={(el) => {
            stage = el
          }}
          className="testClass"
        >
          Hello world! <strong>This is a</strong> long string that{' '}
          <em>should truncate</em>
        </p>
      </div>
    )

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    truncate(stage)

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    expect(stage.childNodes[1].nodeType).to.equal(1)
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    expect(stage.childNodes[2].nodeType).to.equal(3)
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    expect(stage.children.length).to.equal(2)
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    expect(stage.nodeName).to.equal('P')
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    expect(stage.className).to.equal('testClass')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should preserve attributes on nodes', async () => {
    let stage
    let link
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div style={{ width: '200px' }}>
        <span
          ref={(el) => {
            stage = el
          }}
        >
          This is a{' '}
          <a
            ref={(el) => {
              link = el
            }}
            href="http://google.com"
            className="tester"
          >
            text link
          </a>{' '}
          with classes and an href.
        </span>
      </div>
    )

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    truncate(stage)

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    expect(link.attributes.length).to.equal(2)
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    expect(link.attributes.href).to.exist()
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    expect(link.attributes.class).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should calculate max width properly', async () => {
    let textContainer, stage
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div style={{ width: 'auto' }}>
        <div>
          <span
            ref={(el) => {
              textContainer = el
            }}
          >
            {defaultText}
          </span>
          <div style={{ width: '100px' }}>
            <div
              ref={(el) => {
                stage = el
              }}
            >
              {defaultText}
            </div>
          </div>
        </div>
      </div>
    )

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const result = truncate(stage)

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const maxWidth = result.constraints.width
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const actualMax = textContainer.getBoundingClientRect().width

    expect(within(maxWidth, actualMax, 1)).to.be.true()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should calculate `maxLines: auto` correctly', async () => {
    let stage
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div style={{ width: '50px', height: '180px', lineHeight: 2.8 }}>
        <span
          ref={(el) => {
            stage = el
          }}
        >
          {defaultText}
        </span>
      </div>
    )

    const result = truncate(stage, { maxLines: 'auto' })
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const text = stage.textContent

    expect(text).to.not.equal({ defaultText })
    expect(text.length).to.not.equal(1)
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    expect(result.constraints.lines).to.equal(4)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should calculate height correctly when `maxLines` is not `auto`', async () => {
    let stage
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div style={{ width: '200px', height: '200px', lineHeight: 1.4 }}>
        <span
          ref={(el) => {
            stage = el
          }}
        >
          {defaultText}
        </span>
      </div>
    )

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const result = truncate(stage)
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const text = stage.textContent

    expect(text.length).to.not.equal(1)
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    expect(result.constraints.height).to.equal(22.4)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should escape node content', async () => {
    const log = spy(console, 'log')
    const content = '"><img src=a onerror=console.log("hello world") />'

    let stage
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div style={{ width: '1000px', height: '200px' }}>
        <span
          ref={(el) => {
            stage = el
          }}
        >
          {content}
        </span>
      </div>
    )

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    truncate(stage)

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    expect(stage.textContent).to.equal(content)
    expect(log).to.not.have.been.calledWith('hello world')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should truncate when visually hidden', async () => {
    let stage
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div style={{ width: '200px', opacity: 0 }}>
        <span
          ref={(el) => {
            stage = el
          }}
        >
          {defaultText}
        </span>
      </div>
    )

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    truncate(stage)
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const text = stage.textContent

    expect(text.indexOf('truncate')).to.equal(-1)
    expect(text.indexOf('\u2026')).to.not.equal(-1)
  })
})
