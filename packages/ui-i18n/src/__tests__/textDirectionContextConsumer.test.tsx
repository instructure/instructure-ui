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
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi, expect } from 'vitest'
import type { MockInstance } from 'vitest'

import {
  textDirectionContextConsumer,
  TextDirectionContextConsumerProps
} from '../textDirectionContextConsumer'
import { TextDirectionContext } from '../TextDirectionContext'

@textDirectionContextConsumer()
class TextDirectionContextConsumerComponent extends Component<TextDirectionContextConsumerProps> {
  render() {
    return (
      <div
        data-dir={this.props.dir}
        dir={this.props.dir}
        data-testid="test-consumer"
      >
        {this.props.children}
      </div>
    )
  }
}

class WrapperComponent extends Component {
  render() {
    return (
      <div>
        <TextDirectionContextConsumerComponent />
      </div>
    )
  }
}

describe('@textDirectionContextConsumer', () => {
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as MockInstance
  })

  afterEach(() => {
    consoleErrorMock.mockRestore()
  })

  it('should take on the direction of the document by default', async () => {
    const { container } = render(<TextDirectionContextConsumerComponent />)

    expect(container.firstChild).toHaveAttribute('data-dir', 'ltr')
  })

  it('should render correctly', async () => {
    render(<WrapperComponent />)

    const foundComponent = screen.getByTestId('test-consumer')

    expect(foundComponent).toBeInTheDocument()
    expect(foundComponent).toHaveAttribute('data-dir')
  })

  it('should set the text direction via props', async () => {
    const { container } = render(
      <TextDirectionContextConsumerComponent dir="rtl" />
    )
    expect(container.firstChild).toHaveAttribute('data-dir', 'rtl')
  })

  /* TODO re-enable this test when we allow 'auto' text direction
  it('setting "auto" from context figures out text direction from the text', async () => {
    const subject = await mount(
      <TextDirectionContextConsumerComponent dir="auto">
        <span>
          هذه الفقرة باللغة العربية ، لذا يجب الانتقال من اليمين إلى اليسار.
        </span>
      </TextDirectionContextConsumerComponent>
    )
    expect(
      getComputedStyle(subject.getDOMNode().childNodes[0] as Element).direction
    ).to.equal('rtl')
  })
  */

  it('should give props preference when context and context are present', async () => {
    const { container } = render(
      <TextDirectionContext.Provider value="ltr">
        <TextDirectionContextConsumerComponent dir="rtl" />
      </TextDirectionContext.Provider>
    )
    expect(container.firstChild).toHaveAttribute('data-dir', 'rtl')
  })
})
