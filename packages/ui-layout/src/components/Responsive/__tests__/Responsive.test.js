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

import { expect, mount, stub, spy } from '@instructure/ui-test-utils'
import deepEqual from '@instructure/ui-utils/lib/deepEqual'

import Responsive from '../index'

describe('<Responsive />', async () => {
  const props = {
    small: { withBorder: true, background: 'transparent' },
    medium: { options: [1, 2, 3], icons: { edit: true, flag: false }},
    large: { margin: 'small', label: 'hello world', describedBy: 'fakeId'}
  }

  const query = {
    small: { maxWidth: 300 },
    medium: { minWidth: 300 },
    large: { minWidth: 800 }
  }

  let updateMatches

  beforeEach(async () => {
    stub(Responsive.prototype, 'addMatchListener', (query, updateResponsiveMatches) => {
      updateMatches = updateResponsiveMatches
      return {
        remove () {}
      }
    })
  })

  it('should call render with the correct matches', async () => {
    const renderSpy = spy()
    await mount(
      <Responsive
        query={query}
        render={(props, matches) => {
          renderSpy(props, matches)
          return <div>hello</div>
        }}
      />
    )

    updateMatches(['small', 'medium', 'large'], () => {
      expect(renderSpy).to.have.been.calledWith(null, ['small', 'medium', 'large'])

      updateMatches(['medium'], () => {
        expect(renderSpy).to.have.been.calledWith(null, ['medium'])
      })
    })
  })

  it('should provide correct props for a given breakpoint', async () => {
    const renderSpy = spy()
    await mount(
      <Responsive
        props={props}
        query={query}
        render={(props, matches) => {
          renderSpy(props, matches)
          return <div>hello</div>
        }}
      />
    )

    updateMatches(['small'], () => {
      expect(deepEqual(renderSpy.lastCall.args[0], props.small)).to.be.true()

      updateMatches(['large'], () => {
        expect(deepEqual(renderSpy.lastCall.args[0], props.large)).to.be.true()

        updateMatches(['medium'], () => {
          expect(deepEqual(renderSpy.lastCall.args[0], props.medium)).to.be.true()
        })
      })
    })
  })

  it('should merge props correctly when more than one breakpoint is applied', async () => {
    const renderSpy = spy()
    await mount(
      <Responsive
        props={props}
        query={query}
        render={(props, matches) => {
          renderSpy(props, matches)
          return <div>hello</div>
        }}
      />
    )

    updateMatches(['medium', 'large'], () => {
      expect(deepEqual(renderSpy.lastCall.args[0], Object.assign({...props.medium}, {...props.large}))).to.be.true()

      updateMatches(['small', 'medium', 'large'], () => {
        expect(
          deepEqual(
            renderSpy.lastCall.args[0],
            Object.assign({...props.small}, Object.assign({...props.medium}, {...props.large}))
          )
        ).to.be.true()
      })
    })
  })

  it('should warn when more than one breakpoint is applied and a prop value is overwritten', async () => {
    const warning = spy(console, 'warn')

    await mount(
      <Responsive
        props={{
          small: { withBorder: false, background: 'transparent', labeledBy: 'fakeId' },
          medium: { background: 'solid', border: 'dashed', text: 'hello' }
        }}
        query={query}
        render={(props, matches) => {
          return <div>hello</div>
        }}
      />
    )

    updateMatches(['small', 'medium'], () => {
      expect(
        warning.lastCall.args[0].includes('The prop `background` is defined at 2 or more breakpoints')
      ).to.be.true()
    })
  })
})
