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
import { getClassList } from '../getClassList'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('getClassList', async () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should provide classlist methods', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(<span className="foo bar baz">hello</span>)
    const classes = getClassList(subject.getDOMNode())

    expect(classes.toArray().length).to.equal(3)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'contains' does not exist on type '{ toAr... Remove this comment to see the full error message
    expect(classes.contains('foo')).to.be.true()
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'contains' does not exist on type '{ toAr... Remove this comment to see the full error message
    expect(classes.contains('lorem')).to.be.false()

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'add' does not exist on type '{ toArray()... Remove this comment to see the full error message
    classes.add('lorem')
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'contains' does not exist on type '{ toAr... Remove this comment to see the full error message
    expect(classes.contains('lorem')).to.be.true()

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'remove' does not exist on type '{ toArra... Remove this comment to see the full error message
    classes.remove('lorem')
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'contains' does not exist on type '{ toAr... Remove this comment to see the full error message
    expect(classes.contains('lorem')).to.be.false()
  })
})
