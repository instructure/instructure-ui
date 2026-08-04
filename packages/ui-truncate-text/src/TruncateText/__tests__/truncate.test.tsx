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
import { describe, it, expect, vi } from 'vitest'

import { within } from '@instructure/ui-utils'
import truncate from '../v2/utils/truncate.js'

describe('truncate', () => {
  const defaultText = 'Hello world! This is a long string that should truncate'
  const baseStyle = {
    fontSize: '16px',
    fontFamily: 'Arial',
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 'normal'
  }

  it('should truncate text when no options are given', async () => {
    const { container } = await render(
      <div id="stage" style={{ ...baseStyle, width: '200px' }}>
        {defaultText}
      </div>
    )
    const stage = container.querySelector('#stage') as HTMLElement

    truncate(stage)
    const text = stage.textContent!

    expect(text.indexOf('truncate')).toEqual(-1)
    expect(text.indexOf('…')).not.toEqual(-1)
    expect(text).toEqual('Hello world! This is a long…')
  })

  it('should truncate in the middle of a string', async () => {
    const { container } = await render(
      <div id="stage" style={{ ...baseStyle, width: '200px' }}>
        {defaultText}
      </div>
    )
    const stage = container.querySelector('#stage') as HTMLElement

    truncate(stage, { position: 'middle' })
    const text = stage.textContent!

    expect(text.indexOf('long')).toEqual(-1)
    expect(text.indexOf('Hello')).not.toEqual(-1)
    expect(text.indexOf('truncate')).not.toEqual(-1)
    expect(text.indexOf('…')).not.toEqual(-1)
    expect(text).toEqual('Hello world! …ould truncate')
  })

  it('should truncate at words', async () => {
    const { container } = await render(
      <div id="stage" style={{ ...baseStyle, width: '220px' }}>
        {defaultText}
      </div>
    )
    const stage = container.querySelector('#stage') as HTMLElement

    truncate(stage, { truncate: 'word' })
    const text = stage.textContent!

    expect(text.indexOf('string')).toEqual(-1)
    expect(text.indexOf('st')).toEqual(-1)
    expect(text.indexOf('long')).not.toEqual(-1)
    expect(text).toEqual('Hello world! This is a long …')
  })

  it('should allow custom ellipsis', async () => {
    const { container } = await render(
      <div id="stage" style={{ ...baseStyle, width: '200px' }}>
        {defaultText}
      </div>
    )
    const stage = container.querySelector('#stage') as HTMLElement

    truncate(stage, { ellipsis: '(...)' })
    const text = stage.textContent!

    expect(text.slice(-5)).toEqual('(...)')
    expect(text).toEqual('Hello world! This is a lon(...)')
  })

  it('should preserve node structure', async () => {
    const { container } = await render(
      <div style={{ ...baseStyle, width: '200px' }}>
        <p id="stage" className="testClass">
          Hello world! <strong>This is a</strong> long string that{' '}
          <em>should truncate</em>
        </p>
      </div>
    )
    const stage = container.querySelector('#stage') as HTMLElement

    truncate(stage)

    expect(stage.childNodes[1].nodeType).toEqual(1)
    expect(stage.childNodes[2].nodeType).toEqual(3)
    expect(stage.children.length).toEqual(2)
    expect(stage.className).toEqual('testClass')
    expect(stage.tagName).toEqual('P')
    expect(stage.querySelector('strong')).toBeInTheDocument()
    expect(stage.textContent).toEqual('Hello world! This is a lon…')
  })

  it('should preserve attributes on nodes', async () => {
    const { container } = await render(
      <div style={{ ...baseStyle, width: '200px' }}>
        <span id="stage">
          This is a{' '}
          <a id="link" href="http://google.com" className="tester">
            text link
          </a>{' '}
          with classes and an href.
        </span>
      </div>
    )
    const stage = container.querySelector('#stage') as HTMLElement

    truncate(stage)

    const link = container.querySelector('#link')!

    expect(link).toHaveAttribute('href', 'http://google.com')
    expect(link).toHaveAttribute('class', 'tester')
    expect(link).toHaveAttribute('id', 'link')
    expect(link.attributes.length).toEqual(3)
  })

  it('should calculate max width properly', async () => {
    const { container } = await render(
      <div style={{ ...baseStyle, width: 'auto' }}>
        <div>
          <span id="textContainer">{defaultText}</span>
          <div style={{ ...baseStyle, width: '100px' }}>
            <div id="stage">{defaultText}</div>
          </div>
        </div>
      </div>
    )
    const stage = container.querySelector('#stage') as HTMLElement
    const textContainer = container.querySelector('#textContainer')!

    const result = truncate(stage)
    const maxWidth = result!.constraints.width
    const actualMax = textContainer.getBoundingClientRect().width

    expect(within(maxWidth, actualMax, 1)).toEqual(true)
  })

  it('should calculate `maxLines: auto` correctly', async () => {
    const { container } = await render(
      <div
        style={{
          ...baseStyle,
          width: '50px',
          height: '180px',
          lineHeight: 2.8
        }}
      >
        <span id="stage">{defaultText}</span>
      </div>
    )
    const stage = container.querySelector('#stage') as HTMLElement

    const result = truncate(stage, { maxLines: 'auto' })
    const text = stage.textContent!

    expect(text).not.toEqual(defaultText)
    expect(text.length).not.toEqual(1)
    expect(result!.constraints.lines).toEqual(4)
  })

  it('should calculate height correctly when `maxLines` is not `auto`', async () => {
    const { container } = await render(
      <div
        style={{
          ...baseStyle,
          width: '200px',
          height: '200px',
          lineHeight: 1.4
        }}
      >
        <span id="stage">{defaultText}</span>
      </div>
    )
    const stage = container.querySelector('#stage') as HTMLElement

    const result = truncate(stage)
    const text = stage.textContent!

    expect(text.length).not.toEqual(1)
    expect(text).not.toEqual(defaultText)
    expect(result!.constraints.height).toEqual(22.4)
  })

  it('should escape node content', async () => {
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const content = '"><img src=a onerror=console.log("hello world") />'

    const { container } = await render(
      <div style={{ ...baseStyle, width: '1000px', height: '200px' }}>
        <span id="stage">{content}</span>
      </div>
    )
    const stage = container.querySelector('#stage') as HTMLElement

    truncate(stage)

    expect(stage.textContent).toEqual(content)
    expect(consoleLogSpy).not.toHaveBeenCalledWith('hello world')
  })

  it('should truncate when visually hidden', async () => {
    const { container } = await render(
      <div
        id="stage-wrapper"
        style={{ ...baseStyle, width: '200px', opacity: 0 }}
      >
        <span id="stage">{defaultText}</span>
      </div>
    )
    const wrapper = container.querySelector('#stage-wrapper') as HTMLElement
    const stage = container.querySelector('#stage') as HTMLElement

    truncate(stage)
    const text = stage.textContent!

    expect(text.indexOf('truncate')).toEqual(-1)
    expect(text.indexOf('…')).not.toEqual(-1)
    expect(window.getComputedStyle(wrapper).opacity).toEqual('0')
    expect(text).toEqual('Hello world! This is a long…')
  })

  it('should account for font size styles', async () => {
    const { container } = await render(
      <div
        id="stage"
        style={{ ...baseStyle, width: '200px', fontSize: '16px' }}
      >
        {defaultText}
      </div>
    )
    const stage = container.querySelector('#stage') as HTMLElement

    truncate(stage)

    expect(stage.textContent).toEqual('Hello world! This is a long…')

    // Update font size
    stage.style.fontSize = '24px'

    truncate(stage)

    expect(stage.textContent).toEqual('Hello world! This…')
  })
})
