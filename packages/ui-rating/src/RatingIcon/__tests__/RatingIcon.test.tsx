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
import { expect, mount, within } from '@instructure/ui-test-utils'

import { EmotionThemeProvider } from '@instructure/emotion'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@ins... Remove this comment to see the full error message
// eslint-disable-next-line no-restricted-imports
import { TransitionLocator } from '@instructure/ui-motion/es/Transition/TransitionLocator'

import { RatingIcon } from '../index'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<RatingIcon />', async () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('transitions when filled on render and animateFill is true', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; theme: { componentOverr... Remove this comment to see the full error message
      <EmotionThemeProvider
        theme={{
          componentOverrides: {
            Transition: {
              duration: '2s'
            }
          }
        }}
      >
        <RatingIcon filled animateFill />
      </EmotionThemeProvider>
    )
    expect(await TransitionLocator.find()).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('transitions when filled after render and animateFill is true', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; theme: { componentOverr... Remove this comment to see the full error message
      <EmotionThemeProvider
        theme={{
          componentOverrides: {
            Transition: {
              duration: '2s'
            }
          }
        }}
      >
        <RatingIcon filled={false} animateFill={true} />
      </EmotionThemeProvider>
    )

    expect(await TransitionLocator.find({ expectEmpty: true })).to.not.exist()

    await subject.setProps({ filled: true })
    expect(await TransitionLocator.find()).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should meet a11y standards', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(<RatingIcon filled animateFill />)

    const ratingIcon = within(subject.getDOMNode())
    expect(await ratingIcon.accessible()).to.be.true()
  })
})
