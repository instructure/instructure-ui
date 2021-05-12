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

import { expect, mount } from '@instructure/ui-test-utils'

import { Grid } from '../index'

describe('<Grid />', async () => {
  it('should render content in each column', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <Grid>
        <Grid.Row>
          <Grid.Col>Foo</Grid.Col>
          <Grid.Col>Bar</Grid.Col>
          <Grid.Col>Baz</Grid.Col>
        </Grid.Row>
      </Grid>
    )

    expect(subject.getDOMNode().textContent).to.equal('FooBarBaz')
  })

  it('should pass aria and role attributes to underlying DOM elements', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <Grid role="grid" aria-hidden="true">
        {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
        <Grid.Row aria-live="polite" role="presentation">
          {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
          <Grid.Col role="presentation">Foo</Grid.Col>
        </Grid.Row>
      </Grid>
    )

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'find'.
    expect(await find('[role="grid"][aria-hidden]')).to.exist()
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'find'.
    expect(await find('[role="presentation"][aria-live="polite"]')).to.exist()
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'find'.
    expect(await find('[role="presentation"][aria-disabled]')).to.exist()
  })
})
