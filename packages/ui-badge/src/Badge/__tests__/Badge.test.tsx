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

import { Badge } from '../index'
import { BadgeLocator } from '../BadgeLocator'

describe('<Badge />', () => {
  it('should be accessible', async () => {
    await mount(
      <Badge count={100}>
        <button type="button">Inbox</button>
      </Badge>
    )

    const badge = await BadgeLocator.find()

    expect(await badge.accessible()).to.be.true()
  })

  it('should show the count', async () => {
    await mount(
      <Badge count={100}>
        <button type="button">Inbox</button>
      </Badge>
    )

    const badge = await BadgeLocator.find()

    expect(await badge.find(':contains(100)')).to.exist()
  })

  it('should truncate the count via countUntil', async () => {
    await mount(
      <Badge count={100} countUntil={100}>
        <button type="button">Inbox</button>
      </Badge>
    )

    const badge = await BadgeLocator.find()

    expect(await badge.find(':contains(99 +)')).to.exist()
  })

  it('should change postion based on the placement prop', async () => {
    const countOffset = '5px'
    await mount(
      <Badge count={3} placement="bottom start" themeOverride={{ countOffset }}>
        <button type="button">Inbox</button>
      </Badge>
    )

    const badgeWrapper = await BadgeLocator.find()
    const badge = await badgeWrapper.find('[class$=-badge]')

    expect(badge.getComputedStyle().bottom).to.equal(`-${countOffset}`)
    expect(badge.getComputedStyle().left).to.equal(`-${countOffset}`)
  })

  it('should not render a wrapper for a standalone Badge', async () => {
    await mount(
      <Badge count={100} as="li" standalone={true}>
        <button type="button">Inbox</button>
      </Badge>
    )

    const badge = await BadgeLocator.find()

    expect(await badge.find('li', { expectEmpty: true })).to.not.exist()
  })

  it('should change its output via the formatOutput prop', async () => {
    const formatOutput = (formattedCount: string) => {
      return `${formattedCount}!`
    }

    await mount(
      <Badge count={15} formatOutput={formatOutput}>
        <button type="button">Inbox</button>
      </Badge>
    )

    const badge = await BadgeLocator.find()

    expect(await badge.findWithText('15!')).to.exist()
  })
})
