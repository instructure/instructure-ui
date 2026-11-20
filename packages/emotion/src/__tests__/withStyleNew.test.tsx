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

import { Component } from 'react'
import { describe, it, expect } from 'vitest'
import { render } from 'vitest-browser-react'

import { withStyleNew } from '../index.js'

type Props = {
  color?: string
  styles?: { label: string }
}

const received: Props[] = []

const generateStyle = (_theme: unknown, props: Props) => {
  received.push(props)
  return { label: props.color ?? 'unset' }
}

@withStyleNew(generateStyle)
class Example extends Component<Props> {
  static componentId = 'ExampleForDefaults'
  static defaultProps = { color: 'primary' }

  render() {
    return <span data-testid="example">{this.props.styles?.label}</span>
  }
}

describe('withStyleNew', () => {
  // React 19 does not resolve defaultProps on forwardRef components, so the
  // wrapper's render function is called directly to get the same behavior
  const Wrapper = (props: Props) => (Example as any).render(props, null)

  it('should fall back to the default prop when the prop is undefined', async () => {
    received.length = 0
    const { container } = await render(<Wrapper color={undefined} />)

    expect(received[0].color).toBe('primary')
    expect(container.textContent).toBe('primary')
  })

  it('should let an explicit prop override the default', async () => {
    received.length = 0
    await render(<Wrapper color="secondary" />)

    expect(received[0].color).toBe('secondary')
  })
})
