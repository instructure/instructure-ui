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
import {
  expect,
  mount,
  stub,
  generateA11yTests
} from '@instructure/ui-test-utils'

import { IconSearchLine } from '@instructure/ui-icons'

import {
  getUser,
  avatarExample,
  SmallViewportModeWrapper
} from '../../utils/exampleHelpers'
import type { TopNavBarItemProps } from '../../TopNavBarItem/props'

import { TopNavBarUser } from '../index'
import { TopNavBarUserLocator } from '../TopNavBarUserLocator'
import TopNavBarUserExamples from '../__examples__/TopNavBarUser.examples'

describe('<TopNavBarUser />', async () => {
  describe('children prop', async () => {
    const variants: TopNavBarItemProps['variant'][] = [
      'default',
      'button',
      'icon',
      'avatar'
    ]

    variants.forEach((variant) => {
      if (variant === 'icon') {
        it(`should not allow "${variant}" variant`, async () => {
          const consoleError = stub(console, 'error')
          await mount(
            getUser({
              // @ts-expect-error intentionally wrong
              userVariant: variant,
              userId: 'UserTest',
              userItemProps: {
                renderIcon: variant === 'icon' ? IconSearchLine : undefined
              }
            })
          )
          const component = await TopNavBarUserLocator.find({
            expectEmpty: true
          })

          expect(consoleError).to.have.been.calledWith(
            `Warning: Item with id "UserTest" has "${variant}" variant, but only the following variants are allowed in <TopNavBarUser>: default, button, avatar.`
          )
          expect(component).to.not.exist()
        })
      } else {
        it(`should allow "${variant}" variant`, async () => {
          await mount(
            getUser({
              userVariant: variant,
              userId: 'UserTest',
              userItemProps: {
                renderAvatar: variant === 'avatar' ? avatarExample : undefined
              }
            })
          )
          const component = await TopNavBarUserLocator.find()
          const item = await component.find('[id="UserTest"]')

          expect(item).to.exist()
        })
      }
    })

    describe('should not render', async () => {
      it('when there are no children passed', async () => {
        await mount(getUser({ userProps: { children: undefined } }))
        const component = await TopNavBarUserLocator.find({ expectEmpty: true })

        expect(component).to.not.exist()
      })

      it('in "smallViewport" mode (it is exported to a drilldown)', async () => {
        await mount(
          <SmallViewportModeWrapper>
            {getUser({ userProps: { children: undefined } })}
          </SmallViewportModeWrapper>
        )
        const component = await TopNavBarUserLocator.find({ expectEmpty: true })

        expect(component).to.not.exist()
      })
    })
  })

  describe('elementRef prop', async () => {
    it('should return with the root element', async () => {
      const elementRef = stub()
      await mount(getUser({ userProps: { elementRef } }))
      const component = await TopNavBarUserLocator.find()

      expect(elementRef).to.have.been.calledWith(component.getDOMNode())
    })
  })

  describe('should be accessible', async () => {
    generateA11yTests(TopNavBarUser, TopNavBarUserExamples)

    it('a11y', async () => {
      await mount(getUser())
      const topNavBarUser = await TopNavBarUserLocator.find()
      expect(await topNavBarUser.accessible()).to.be.true()
    })
  })
})
