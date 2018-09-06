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
import Grid, { GridRow, GridCol } from '../index'

describe('<Grid />', () => {
  const testbed = new Testbed(
    <Grid>
      <GridRow>
        <GridCol>
          Foo
        </GridCol>
        <GridCol>
          Bar
        </GridCol>
        <GridCol>
          Baz
        </GridCol>
      </GridRow>
    </Grid>
  )

  it('should render content in each column', () => {
    const subject = testbed.render()

    expect(subject.text()).to.equal('FooBarBaz')
  })

  it('should pass aria and role attributes to underlying DOM elements', () => {
    const children = (
      <GridRow aria-live="polite" role="presentation">
        <GridCol aria-disabled="true" role="presentation">
          Foo
        </GridCol>
      </GridRow>
    )

    const subject = testbed.render({
      role: 'grid',
      'aria-hidden': true,
      children
    })

    expect(subject.find('span[role="grid"][aria-hidden]')).to.be.present()
    expect(subject.find('span[role="presentation"][aria-live="polite"]')).to.be.present()
    expect(subject.find('span[role="presentation"][aria-disabled]')).to.be.present()
  })
})
