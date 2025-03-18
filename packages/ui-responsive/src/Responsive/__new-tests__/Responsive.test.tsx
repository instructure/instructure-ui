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
import { render } from '@testing-library/react'
import { vi, expect } from 'vitest'
import type { MockInstance } from 'vitest'
import '@testing-library/jest-dom'

import { deepEqual } from '@instructure/ui-utils'
import { Responsive } from '../index'

describe('<Responsive />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as MockInstance
  })

  afterEach(() => {
    consoleWarningMock.mockRestore()
  })

  it('should call render with the correct matches', async () => {
    const renderSpy = vi.fn()
    render(
      <div style={{ width: 200 }}>
        <Responsive
          query={{
            small: { maxWidth: 300 },
            medium: { maxWidth: 300 },
            large: { maxWidth: 300 }
          }}
          render={(props, matches) => {
            renderSpy(props, matches)
            return <div>hello</div>
          }}
        />
      </div>
    )

    expect(renderSpy).toHaveBeenCalledWith(null, ['small', 'medium', 'large'])
  })

  it('should provide correct props for a given breakpoint', async () => {
    const renderSpy = vi.fn()
    const props = {
      small: { withBorder: true, background: 'transparent' },
      medium: { options: [1, 2, 3], icons: { edit: true, flag: false } },
      large: { margin: 'small', label: 'hello world', describedBy: 'fakeId' }
    }
    render(
      <div style={{ width: 200 }}>
        <Responsive
          props={props}
          query={{
            small: { maxWidth: 300 },
            medium: { minWidth: 300 },
            large: { minWidth: 800 }
          }}
          render={(props, matches) => {
            renderSpy(props, matches)
            return <div>hello</div>
          }}
        />
      </div>
    )

    expect(renderSpy).toHaveBeenCalledOnce()
    expect(deepEqual(renderSpy.mock.calls[0][0], props.small)).toBe(true)
  })

  it('should warn when more than one breakpoint is applied and a prop value is overwritten', async () => {
    render(
      <div style={{ width: 200 }}>
        <Responsive
          props={{
            small: {
              withBorder: false,
              background: 'transparent',
              labeledBy: 'fakeId'
            },
            medium: { background: 'solid', border: 'dashed', text: 'hello' }
          }}
          query={{
            small: { maxWidth: 300 },
            medium: { maxWidth: 300 },
            large: { minWidth: 800 }
          }}
          render={() => {
            return <div>hello</div>
          }}
        />
      </div>
    )
    const expectedWarningMessage = [
      'Warning: [Responsive]',
      'The prop `background` is defined at 2 or more breakpoints',
      'which are currently applied at the same time. Its current value, `transparent`,',
      'will be overwritten as `solid`.'
    ].join(' ')

    expect(consoleWarningMock).toHaveBeenCalledWith(
      expect.stringContaining(expectedWarningMessage),
      expect.any(String)
    )
  })

  it('should call render prop only once', async () => {
    const renderSpy = vi.fn()
    render(
      <div style={{ width: 200 }}>
        <Responsive
          query={{
            small: { maxWidth: 300 },
            medium: { minWidth: 300 },
            large: { minWidth: 800 }
          }}
          render={(props, matches) => {
            renderSpy(props, matches)
            return <div>hello</div>
          }}
        />
      </div>
    )

    expect(renderSpy).toHaveBeenCalledOnce()
  })

  it('should apply the `display` prop', async () => {
    const renderSpy = vi.fn()
    const { container } = render(
      <div style={{ width: 200 }} id="testContainer">
        <Responsive
          query={{
            small: { maxWidth: 300 },
            medium: { minWidth: 300 },
            large: { minWidth: 800 }
          }}
          render={(props, matches) => {
            renderSpy(props, matches)
            return <div>hello</div>
          }}
          display="inline-flex"
        />
      </div>
    )
    const responsiveContainer = container.querySelector('[id="testContainer"]')
    const responsiveDiv = responsiveContainer?.firstChild

    expect(responsiveDiv).toHaveStyle('display: inline-flex')
  })
})
