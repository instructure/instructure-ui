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

import { ApplyTheme } from '@instructure/ui-themeable'
import { Transition } from '@instructure/ui-motion'
// eslint-disable-next-line no-restricted-imports
import { TransitionLocator } from '@instructure/ui-motion/es/Transition/TransitionLocator'

import { RatingIcon } from '../index'

describe('<RatingIcon />', async () => {
  it('transitions when filled on render and animateFill is true', async () => {
    await mount(
      <ApplyTheme theme={{ [Transition.theme]: {
        duration: '2s'
      }}}>
        <RatingIcon filled animateFill />
      </ApplyTheme>
    )
    expect(await TransitionLocator.find()).to.exist()
  })

  it('transitions when filled after render and animateFill is true', async () => {
    const subject = await mount(
      <ApplyTheme theme={{ [Transition.theme]: {
        duration: '2s'
      }}}>
        <RatingIcon
          filled={false}
          animateFill={true}
        />
      </ApplyTheme>
    )

    expect(await TransitionLocator.find({ expectEmpty: true })).to.not.exist()

    await subject.setProps({ filled: true })
    expect(await TransitionLocator.find()).to.exist()
  })

  it('should meet a11y standards', async () => {
    const subject = await mount(<RatingIcon filled animateFill />)

    const ratingIcon = within(subject.getDOMNode())
    expect(await ratingIcon.accessible()).to.be.true()
  })
})
