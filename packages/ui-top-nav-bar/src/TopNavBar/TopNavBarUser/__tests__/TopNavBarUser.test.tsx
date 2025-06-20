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

import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import type { MockInstance } from 'vitest'
import '@testing-library/jest-dom'

import {
  getUser,
  avatarExample,
  SmallViewportModeWrapper
} from '../../utils/exampleHelpers'

import { runAxeCheck } from '@instructure/ui-axe-check'
import type { TopNavBarItemProps } from '../../TopNavBarItem/props'
import { IconSearchLine } from '@instructure/ui-icons'

describe('<TopNavBarUser />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as MockInstance
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as MockInstance
  })

  afterEach(() => {
    consoleWarningMock.mockRestore()
    consoleErrorMock.mockRestore()
  })
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
          expect(consoleErrorMock).toHaveBeenCalledWith(
            expect.stringContaining(expectedErrorMessage),
            expect.any(String)
          )
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
      const elementRef = vi.fn()
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
  })
})
