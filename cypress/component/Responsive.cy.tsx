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
import { Responsive } from '@instructure/ui'
import { deepEqual } from '@instructure/ui-utils'
import '../support/component'

describe('<Responsive/>', () => {
  it('should merge props correctly when more than one breakpoint is applied', async () => {
    const renderSpy = cy.spy()
    const props = {
      small: { withBorder: true, background: 'transparent' },
      medium: { options: [1, 2, 3], icons: { edit: true, flag: false } },
      large: { margin: 'small', label: 'hello world', describedBy: 'fakeId' }
    }
    cy.mount(
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

    cy.wrap(renderSpy)
      .should('have.been.called')
      .then(() => {
        const expectedProps = Object.assign(
          { ...props.medium },
          { ...props.large }
        )

        expect(deepEqual(renderSpy.lastCall.args[0], expectedProps)).to.equal(
          true
        )
      })
  })

  it('should provide correct props in case of multiple breakpoints in query', async () => {
    const renderSpy = cy.spy()
    const props = {
      small: { withBorder: true, background: 'transparent' },
      medium: { options: [1, 2, 3], icons: { edit: true, flag: false } },
      large: { margin: 'small', label: 'hello world', describedBy: 'fakeId' }
    }
    cy.mount(
      <div style={{ width: 800, height: 400 }}>
        <Responsive
          props={props}
          query={{
            small: { maxWidth: 300 },
            medium: { maxWidth: 800 },
            large: {
              minWidth: 800,
              maxWidth: 1000
            }
          }}
          render={(props, matches) => {
            renderSpy(props, matches)
            return <div>hello</div>
          }}
        />
      </div>
    )

    cy.wrap(renderSpy)
      .should('have.been.called')
      .then(() => {
        const expectedProps = { ...props.medium, ...props.large }

        expect(deepEqual(renderSpy.lastCall.args[0], expectedProps)).to.equal(
          true
        )
      })
  })
})
