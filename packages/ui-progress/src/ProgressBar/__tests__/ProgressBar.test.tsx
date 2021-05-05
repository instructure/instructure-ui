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

import { ProgressBar } from '../index'
import { ProgressBarLocator } from '../ProgressBarLocator'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<ProgressBar />', async () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <ProgressBar
        screenReaderLabel="Chapters read"
        valueMax={60}
        valueNow={30}
      />
    )
    expect(await ProgressBarLocator.find()).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render a progress element with correct aria attributes', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <ProgressBar
        screenReaderLabel="Chapters read"
        valueMax={60}
        valueNow={30}
      />
    )

    const componentRoot = await ProgressBarLocator.find()
    const progress = await componentRoot.find('progress')

    expect(progress).to.exist()
    expect(progress.getAttribute('value')).to.equal('30')
    expect(progress.getAttribute('aria-valuemax')).to.equal('60')
    expect(progress.getAttribute('aria-valuetext')).to.equal('30 / 60')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should format aria-valuetext', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <ProgressBar
        screenReaderLabel="Chapters read"
        valueMax={60}
        valueNow={30}
        formatScreenReaderValue={({ valueNow, valueMax }) =>
          `${valueNow} chapters out of ${valueMax}`
        }
      />
    )
    const componentRoot = await ProgressBarLocator.find()
    const progress = await componentRoot.find('progress')

    expect(progress.getAttribute('aria-valuetext')).to.equal(
      '30 chapters out of 60'
    )
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should format the displayed text', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <ProgressBar
        screenReaderLabel="Chapters read"
        valueMax={60}
        valueNow={30}
        renderValue={({ valueNow, valueMax }) => `${valueNow} of ${valueMax}`}
      />
    )
    expect(await ProgressBarLocator.find(':contains(30 of 60)')).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should meet a11y standards', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <ProgressBar
        screenReaderLabel="Chapters read"
        valueMax={60}
        valueNow={30}
      />
    )
    const progress = await ProgressBarLocator.find()
    expect(await progress.accessible()).to.be.true()
  })
})
