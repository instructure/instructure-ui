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

import { expect, mount, spy, stub } from '@instructure/ui-test-utils'
import deepEqual from '@instructure/ui-utils/lib/deepEqual'

import Responsive from '../index'

describe('<Responsive />', async () => {
  it('should call render with the correct matches', async () => {
    const renderSpy = spy()
    await mount(
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

    expect(renderSpy).to.have.been.calledWith(null, ['small', 'medium', 'large'])
  })

  it('should provide correct props for a given breakpoint', async () => {
    const renderSpy = spy()
    const props = {
      small: { withBorder: true, background: 'transparent' },
      medium: { options: [1, 2, 3], icons: { edit: true, flag: false }},
      large: { margin: 'small', label: 'hello world', describedBy: 'fakeId'}
    }
    await mount(
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

    expect(deepEqual(renderSpy.lastCall.args[0], props.small)).to.be.true()
  })

  it('should merge props correctly when more than one breakpoint is applied', async () => {
    const renderSpy = spy()
    const props = {
      small: { withBorder: true, background: 'transparent' },
      medium: { options: [1, 2, 3], icons: { edit: true, flag: false }},
      large: { margin: 'small', label: 'hello world', describedBy: 'fakeId'}
    }
    await mount(
      <Responsive
        props={props}
        query={{
          small: { maxWidth: 300 },
          medium: { minWidth: 300 },
          large: { minWidth: 300 }
        }}
        render={(props, matches) => {
          renderSpy(props, matches)
          return <div>hello</div>
        }}
      />
    )

    expect(deepEqual(renderSpy.lastCall.args[0], Object.assign({...props.medium}, {...props.large}))).to.be.true()
  })

  it('should warn when more than one breakpoint is applied and a prop value is overwritten', async () => {
    const consoleError = stub(console, 'error')
    await mount(
      <div style={{ width: 200 }}>
        <Responsive
          props={{
            small: { withBorder: false, background: 'transparent', labeledBy: 'fakeId' },
            medium: { background: 'solid', border: 'dashed', text: 'hello' }
          }}
          query={{
            small: { maxWidth: 300 },
            medium: { maxWidth: 300 },
            large: { minWidth: 800 }
          }}
          render={(props, matches) => {
            return <div>hello</div>
          }}
        />
      </div>
    )
    const warning = [
      'Warning: [Responsive]',
      'The prop `background` is defined at 2 or more breakpoints',
      'which are currently applied at the same time. Its current value, `transparent`,',
      'will be overwritten as `solid`.'
    ].join(' ')
    expect(consoleError)
      .to.be.calledWithExactly(warning)
  })
})
