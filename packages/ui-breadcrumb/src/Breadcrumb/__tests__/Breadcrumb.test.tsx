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

import { expect, mount, generateA11yTests } from '@instructure/ui-test-utils'

import { Breadcrumb } from '../index'
import { BreadcrumbLocator } from '../BreadcrumbLocator'
import BreadcrumbExamples from '../__examples__/Breadcrumb.examples'

describe('<Breadcrumb />', async () => {
  it('should render the label as an aria-label attribute', async () => {
    await mount(
      <Breadcrumb label="Settings">
        <Breadcrumb.Link>Account</Breadcrumb.Link>
      </Breadcrumb>
    )
    const breadcrumb = await BreadcrumbLocator.find()
    const label = await breadcrumb.find(':label(Settings)')

    expect(label.getAttribute('aria-label')).to.equal('Settings')
  })

  describe('with generated examples', async () => {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ propValues: { children: Elemen... Remove this comment to see the full error message
    generateA11yTests(BreadcrumbExamples)
  })

  it('should render an icon as a separator', async () => {
    await mount(
      <Breadcrumb label="Settings">
        <Breadcrumb.Link href="#">Account</Breadcrumb.Link>
        <Breadcrumb.Link>Settings</Breadcrumb.Link>
      </Breadcrumb>
    )
    const breadcrumb = await BreadcrumbLocator.find()
    const icon = await breadcrumb.find('svg')

    expect(icon.getAttribute('aria-hidden')).to.equal('true')
  })
})
