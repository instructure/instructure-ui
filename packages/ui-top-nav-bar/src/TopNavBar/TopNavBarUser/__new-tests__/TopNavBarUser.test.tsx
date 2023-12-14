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
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import {
  getUser,
  avatarExample,
  SmallViewportModeWrapper
} from '../../utils/exampleHelpers'

// eslint-disable-next-line no-restricted-imports
import { generateA11yTests } from '@instructure/ui-scripts/lib/test/generateA11yTests'
import { runAxeCheck } from '@instructure/ui-axe-check'
import type { TopNavBarItemProps } from '../../TopNavBarItem/props'
import { IconSearchLine } from '@instructure/ui-icons'
import { TopNavBarUser } from '../index'
import TopNavBarUserExamples from '../__examples__/TopNavBarUser.examples'

describe('<TopNavBarUser />', () => {
  describe('children prop', () => {
    const variants: TopNavBarItemProps['variant'][] = [
      'default',
      'button',
      'icon',
      'avatar',
      'forceIconWithLabel'
    ]

    variants.forEach((variant) => {
      if (variant === 'icon' || variant === 'forceIconWithLabel') {
        it(`should not allow "${variant}" variant`, () => {
          const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {})
          const { container } = render(
            getUser({
              // @ts-expect-error intentionally wrong
              userVariant: variant,
              userId: 'UserTest',
              userItemProps: {
                renderIcon: variant === 'icon' ? IconSearchLine : undefined
              }
            })
          )
          const expectedErrorMessage = `Warning: Item with id "UserTest" has "${variant}" variant, but only the following variants are allowed in <TopNavBarUser>: default, button, avatar.`

          expect(container.firstChild).not.toBeInTheDocument()
          expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining(expectedErrorMessage),
            expect.any(String)
          )

          consoleErrorSpy.mockRestore()
        })
      } else {
        it(`should allow "${variant}" variant`, () => {
          render(
            getUser({
              userVariant: variant,
              userId: 'UserTest',
              userItemProps: {
                renderAvatar: variant === 'avatar' ? avatarExample : undefined
              }
            })
          )
          const item = screen.getByRole('link')
          expect(item).toBeInTheDocument()
          expect(item.id).toBe('UserTest')
        })
      }
    })

    describe('should not render', () => {
      it('when there are no children passed', () => {
        const { container } = render(
          getUser({
            userProps: {
              children: undefined
            }
          })
        )

        expect(container.firstChild).not.toBeInTheDocument()
      })

      it('in "smallViewport" mode (it is exported to a drilldown)', () => {
        const { container } = render(
          <SmallViewportModeWrapper>
            {getUser({
              userProps: {
                children: undefined
              }
            })}
          </SmallViewportModeWrapper>
        )

        expect(container.firstChild).not.toBeInTheDocument()
      })
    })
  })

  describe('elementRef prop', () => {
    it('should return with the root element', () => {
      const elementRef = jest.fn()
      const { container } = render(getUser({ userProps: { elementRef } }))

      expect(elementRef).toHaveBeenCalledWith(container.firstChild)
    })
  })

  describe('should be accessible', () => {
    it('a11y', async () => {
      const { container } = render(getUser())
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })

    describe('with generated examples', () => {
      const generatedComponents = generateA11yTests(
        TopNavBarUser,
        TopNavBarUserExamples
      )

      it.each(generatedComponents)(
        'should be accessible with example: $description',
        async ({ content }) => {
          const { container } = render(content)
          const axeCheck = await runAxeCheck(container)
          expect(axeCheck).toBe(true)
        }
      )
    })
  })
})
