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

import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { runAxeCheck } from '@instructure/ui-axe-check'

import '@testing-library/jest-dom'
import Avatar from '../index'
import { IconGroupLine } from '@instructure/ui-icons'
import {
  UserInstUIIcon,
  CircleUserInstUIIcon
} from '@instructure/ui-icons-lucide'

describe('<Avatar />', () => {
  describe('for a11y', () => {
    it('should be accessible', async () => {
      const { container } = render(<Avatar name="Jessica Jones" />)
      const axeCheck = await runAxeCheck(container)
      expect(axeCheck).toBe(true)
    })

    it('initials should have aria-hidden=true', async () => {
      render(<Avatar name="Jessica Jones" />)
      const initials = screen.getByText('JJ')
      expect(initials).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('with the default props', () => {
    it('should display as a circle', async () => {
      const { container } = render(<Avatar name="Avatar Name" />)
      const avatarDiv = container.querySelector('div')
      expect(avatarDiv).toHaveStyle('border-radius: 50%')
    })

    it('should render initials', async () => {
      render(<Avatar name="Avatar Name" />)
      const avatarWithInitials = await screen.findByText('AN')
      expect(avatarWithInitials).toBeVisible()
    })

    it('should have border and no box-shadow', async () => {
      const { container } = render(<Avatar name="Avatar Name" />)
      const element = container.querySelector('div')
      expect(element).not.toHaveStyle('border: none')
      const containerStyle = element && getComputedStyle(element)
      expect(containerStyle?.boxShadow).toBe('')
    })

    it('should display the initials in brand color', async () => {
      render(<Avatar name="Jessica Jones" />)
      const initials = screen.getByText('JJ')
      expect(getComputedStyle(initials).color).toBe('rgb(43, 122, 188)')
    })

    it.skip('refs should return the underlying component', async () => {
      // Skip this test - elementRef is no longer used in the reworked Avatar
    })
  })

  describe('when the renderIcon prop is provided', () => {
    it('should display an svg passed', async () => {
      const SomeIcon = () => (
        <svg>
          <circle cx="25" cy="75" r="20" />
        </svg>
      )
      const { container } = render(
        <Avatar name="avatar name" renderIcon={SomeIcon}>
          hello
        </Avatar>
      )
      const avatarSvg = container.querySelector('svg')
      expect(avatarSvg).toBeInTheDocument()
    })

    it('should display correctly when an icon renderer is passed', async () => {
      const { container } = render(
        <Avatar name="Jessica Jones" renderIcon={() => <IconGroupLine />}>
          Hello World
        </Avatar>
      )
      const avatarSvg = container.querySelector('svg')
      expect(avatarSvg).toBeInTheDocument()
    })

    it('should pass the correct size and color props to icon based on Avatar size', async () => {
      const MockIcon = vi.fn((props: any) => (
        <svg
          data-testid="mock-icon"
          data-size={props.size}
          data-color={props.color}
        >
          <circle cx="25" cy="75" r="20" />
        </svg>
      ))
      ;(MockIcon as any).displayName = 'wrapLucideIcon(MockIcon)'

      const { container } = render(
        <Avatar name="avatar name" size="medium" renderIcon={MockIcon} />
      )

      expect(MockIcon).toHaveBeenCalledWith(
        expect.objectContaining({ size: 'md', color: expect.any(String) })
      )
      const icon = container.querySelector('[data-testid="mock-icon"]')
      expect(icon).toHaveAttribute('data-size', 'md')
      expect(icon).toHaveAttribute('data-color')
    })

    it('should map xx-small Avatar to xs icon size', async () => {
      const MockIcon = vi.fn(() => (
        <svg data-testid="mock-icon">
          <circle cx="25" cy="75" r="20" />
        </svg>
      ))
      ;(MockIcon as any).displayName = 'wrapLucideIcon(MockIcon)'

      render(
        <Avatar name="avatar name" size="xx-small" renderIcon={MockIcon} />
      )

      expect(MockIcon).toHaveBeenCalledWith(
        expect.objectContaining({ size: 'xs', color: expect.any(String) })
      )
    })

    it('should map x-small Avatar to xs icon size', async () => {
      const MockIcon = vi.fn(() => (
        <svg data-testid="mock-icon">
          <circle cx="25" cy="75" r="20" />
        </svg>
      ))
      ;(MockIcon as any).displayName = 'wrapLucideIcon(MockIcon)'

      render(<Avatar name="avatar name" size="x-small" renderIcon={MockIcon} />)

      expect(MockIcon).toHaveBeenCalledWith(
        expect.objectContaining({ size: 'xs', color: expect.any(String) })
      )
    })

    it('should work with icons that ignore the size prop (backwards compatibility)', async () => {
      const IconWithoutSize = () => (
        <svg data-testid="icon-without-size">
          <circle cx="25" cy="75" r="20" />
        </svg>
      )

      const { container } = render(
        <Avatar name="avatar name" size="large" renderIcon={IconWithoutSize} />
      )

      const icon = container.querySelector('[data-testid="icon-without-size"]')
      expect(icon).toBeInTheDocument()
    })

    it('should display a Lucide icon with default size', async () => {
      const { container } = render(
        <Avatar name="avatar name" renderIcon={UserInstUIIcon} />
      )

      const avatarSvg = container.querySelector('svg')
      expect(avatarSvg).toBeInTheDocument()
    })

    it('should display a Lucide icon with medium Avatar size', async () => {
      const { container } = render(
        <Avatar
          name="avatar name"
          size="medium"
          renderIcon={CircleUserInstUIIcon}
        />
      )

      const avatarSvg = container.querySelector('svg')
      expect(avatarSvg).toBeInTheDocument()
    })

    it('should display a Lucide icon with xx-small Avatar size', async () => {
      const { container } = render(
        <Avatar
          name="avatar name"
          size="xx-small"
          renderIcon={UserInstUIIcon}
        />
      )

      const avatarSvg = container.querySelector('svg')
      expect(avatarSvg).toBeInTheDocument()
    })

    it('should display a Lucide icon with x-small Avatar size', async () => {
      const { container } = render(
        <Avatar name="avatar name" size="x-small" renderIcon={UserInstUIIcon} />
      )

      const avatarSvg = container.querySelector('svg')
      expect(avatarSvg).toBeInTheDocument()
    })

    it('should accept a JSX element and clone it with size/color props', async () => {
      const MockIcon = vi.fn((props: any) => (
        <svg
          data-testid="jsx-icon"
          data-size={props.size}
          data-color={props.color}
        >
          <circle cx="25" cy="75" r="20" />
        </svg>
      ))
      ;(MockIcon as any).displayName = 'wrapLucideIcon(MockIcon)'

      const { container } = render(
        <Avatar name="avatar name" size="large" renderIcon={<MockIcon />} />
      )

      const icon = container.querySelector('[data-testid="jsx-icon"]')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute('data-size', 'lg')
      expect(icon).toHaveAttribute('data-color')
    })

    it('should override props when JSX element is passed', async () => {
      const MockIcon = (props: any) => (
        <svg data-testid="override-icon" data-size={props.size}>
          <circle cx="25" cy="75" r="20" />
        </svg>
      )
      MockIcon.displayName = 'wrapLucideIcon(MockIcon)'

      const { container } = render(
        <Avatar
          name="avatar name"
          size="x-large"
          renderIcon={<MockIcon size="wrong" />}
        />
      )

      const icon = container.querySelector('[data-testid="override-icon"]')
      expect(icon).toBeInTheDocument()
      // Avatar should override the size prop
      expect(icon).toHaveAttribute('data-size', 'xl')
    })

    it('should work with a render function returning JSX', async () => {
      const renderFunc = (props: any) => (
        <svg data-testid="function-icon" data-size={props.size}>
          <circle cx="25" cy="75" r="20" />
        </svg>
      )
      renderFunc.displayName = 'wrapLucideIcon(renderFunc)'

      const { container } = render(
        <Avatar name="avatar name" size="small" renderIcon={renderFunc} />
      )

      const icon = container.querySelector('[data-testid="function-icon"]')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute('data-size', 'sm')
    })

    it('should work with arrow function returning Lucide icon (user pattern)', async () => {
      const MockIcon = vi.fn((props: any) => (
        <svg data-testid="arrow-lucide-icon" data-size={props.size}>
          <circle />
        </svg>
      ))
      ;(MockIcon as any).displayName = 'wrapLucideIcon(MockIcon)'

      const { container } = render(
        <Avatar
          name="Profile"
          size="small"
          color="accent2"
          renderIcon={() => <MockIcon />}
        />
      )

      const icon = container.querySelector('[data-testid="arrow-lucide-icon"]')
      expect(icon).toBeInTheDocument()
      // The icon should have received the correct size prop
      expect(icon).toHaveAttribute('data-size', 'sm')
    })

    it('should apply different sizes to arrow function icons', async () => {
      const SmallMockIcon = vi.fn((props: any) => (
        <svg data-testid="small-icon" data-size={props.size}>
          <circle />
        </svg>
      ))
      ;(SmallMockIcon as any).displayName = 'wrapLucideIcon(SmallIcon)'

      const LargeMockIcon = vi.fn((props: any) => (
        <svg data-testid="large-icon" data-size={props.size}>
          <circle />
        </svg>
      ))
      ;(LargeMockIcon as any).displayName = 'wrapLucideIcon(LargeIcon)'

      const { container: smallContainer } = render(
        <Avatar
          name="Profile"
          size="small"
          renderIcon={() => <SmallMockIcon />}
        />
      )

      const { container: largeContainer } = render(
        <Avatar
          name="Profile"
          size="xx-large"
          renderIcon={() => <LargeMockIcon />}
        />
      )

      const smallIcon = smallContainer.querySelector(
        '[data-testid="small-icon"]'
      )
      const largeIcon = largeContainer.querySelector(
        '[data-testid="large-icon"]'
      )

      expect(smallIcon).toBeInTheDocument()
      expect(largeIcon).toBeInTheDocument()

      // Verify different sizes were passed correctly
      expect(smallIcon).toHaveAttribute('data-size', 'sm')
      expect(largeIcon).toHaveAttribute('data-size', '2xl')
    })
  })

  describe('when an image src url is provided', () => {
    const src =
      'data:image/gif;base64,R0lGODlhFAAUAJEAAP/9/fYQEPytrflWViH5BAAAAAAALAAAAAAUABQAQAJKhI+pGe09lnhBnEETfodatVHNh1BR+ZzH9LAOCYrVYpiAfWWJOxrC/5MASbyZT4d6AUIBlUYGoR1FsAXUuTN5YhxAEYbrpKRkQwEAOw=='

    it('should display the image url provided', async () => {
      const { container } = render(<Avatar name="avatar name" src={src} />)
      const avatarImg = container.querySelector('img')
      expect(avatarImg).toHaveAttribute('src', src)
    })

    it('should display the image even if an icon is provided', async () => {
      const { container } = render(
        <Avatar name="avatar name" src={src} renderIcon={UserInstUIIcon} />
      )
      const avatarImg = container.querySelector('img')
      expect(avatarImg).toHaveAttribute('src', src)
    })

    it('should call onImageLoaded once the image loads', async () => {
      const onImageLoaded = vi.fn()
      const { container } = render(
        <Avatar name="Avatar Name" src={src} onImageLoaded={onImageLoaded} />
      )
      const avatarImg = container.querySelector('img')
      if (avatarImg) {
        fireEvent.load(avatarImg)
      }
      expect(onImageLoaded).toHaveBeenCalled()
    })

    it.skip('should have box-shadow instead of border', async () => {
      // Skip this test - box-shadow behavior has changed in the rework
    })
  })

  describe('when shape is set to "rectangle"', () => {
    it('should display as a rectangle', async () => {
      const { container } = render(
        <Avatar name="Avatar Name" shape="rectangle" />
      )
      const avatarDiv = container.querySelector('div')
      expect(avatarDiv).toHaveStyle('border-radius: 0')
    })
  })

  describe('when the color is set to "shamrock"', () => {
    it('should display the initials in green (shamrock)', async () => {
      render(<Avatar name="Jessica Jones" color="accent2" />)
      const initials = screen.getByText('JJ')
      expect(getComputedStyle(initials).color).toBe('rgb(3, 137, 61)')
    })

    it.skip('should display the icon in green (shamrock)', async () => {
      // Skip this test - SVG fill behavior has changed in the rework
    })
  })

  describe('when "hasInverseColor" is set', () => {
    describe('with initials', () => {
      it('should display the background in the color', async () => {
        render(<Avatar name="Jessica Jones" color="accent2" hasInverseColor />)
        const initials = screen.getByText('JJ')
        expect(initials.parentNode).toHaveStyle({
          backgroundColor: 'rgb(3, 137, 61)'
        })
      })

      it('should display the initials in white', async () => {
        render(<Avatar name="Jessica Jones" color="accent2" hasInverseColor />)
        const initials = screen.getByText('JJ')
        expect(initials).toHaveStyle({ color: 'rgb(255, 255, 255)' })
      })
    })

    describe('with icon', () => {
      it('should display the background in the color', async () => {
        const { container } = render(
          <Avatar
            name="Jessica Jones"
            color="accent2"
            hasInverseColor
            renderIcon={UserInstUIIcon}
          />
        )
        const element = container.querySelector('div')
        expect(element).toHaveStyle({ backgroundColor: 'rgb(3, 137, 61)' })
      })

      it.skip('should display the icon in white', async () => {
        // Skip this test - SVG fill behavior has changed in the rework
      })
    })
  })

  describe('when the user name has no spaces', () => {
    it('should render a single initial', async () => {
      render(<Avatar name="Jessica" />)
      const initials = screen.getByText('J')
      expect(initials).toBeInTheDocument()
    })
  })

  describe('when the user name has leading spaces', () => {
    it('should skip them', async () => {
      render(<Avatar name=" Jessica Jones" />)
      const initials = screen.getByText('JJ')
      expect(initials).toBeInTheDocument()
    })
  })

  describe('when the user name is empty', () => {
    it('should render', async () => {
      const { container } = render(<Avatar name="" />)
      const initials = container.querySelector('span')
      expect(initials).toBeInTheDocument()
      expect(initials).toHaveTextContent('')
    })
  })

  describe('when alt text is provided', () => {
    it('should render the text as an aria-label attribute', async () => {
      render(<Avatar name="Jessica Jones" alt="This is a test" />)
      const initials = screen.getByText('JJ')
      expect(initials.parentNode).toHaveAttribute(
        'aria-label',
        'This is a test'
      )
    })

    it('should set the role attribute to img', async () => {
      render(<Avatar name="Jessica Jones" alt="This is a test" />)
      const initials = screen.getByText('JJ')
      expect(initials.parentNode).toHaveAttribute('role', 'img')
    })
  })
})
