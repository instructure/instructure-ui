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
      const avatarImg = container.querySelector('span[name="Avatar Name"]')
      expect(avatarImg).toHaveAttribute('shape', 'circle')
    })

    it('should render initials', async () => {
      render(<Avatar name="Avatar Name" />)
      const avatarWithInitials = await screen.findByText('AN')
      expect(avatarWithInitials).toBeVisible()
    })

    it('should have border and no box-shadow', async () => {
      const { container } = render(<Avatar name="Avatar Name" />)
      const element = container.querySelector('span')
      expect(element).not.toHaveStyle('border-width: 0px')
      const containerStyle = element && getComputedStyle(element)
      expect(containerStyle?.boxShadow).toBe('')
    })

    it('should display the initials in brand color', async () => {
      render(<Avatar name="Jessica Jones" />)
      const initials = screen.getByText('JJ')
      expect(getComputedStyle(initials).color).toBe('rgb(43, 122, 188)')
    })

    it('should return the underlying component', async () => {
      const elementRef = vi.fn()
      const { container } = render(
        <Avatar name="Avatar Name" elementRef={elementRef} />
      )
      expect(elementRef).toHaveBeenCalledWith(container.firstChild)
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

    it('should display an InstUI icon passed', async () => {
      const { container } = render(
        <Avatar name="avatar name" renderIcon={<IconGroupLine />}>
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
        <Avatar name="avatar name" src={src} renderIcon={<IconGroupLine />} />
      )
      const avatarImg = container.querySelector('img')
      expect(avatarImg).toHaveAttribute('src', src)
    })

    it('should call onImageLoaded once the image loads', async () => {
      const onImageLoaded = vi.fn()
      const { container } = render(
        <Avatar name="Avatar Name" onImageLoaded={onImageLoaded} />
      )
      const avatarImg = container.querySelector('img')
      if (avatarImg) {
        fireEvent.load(avatarImg)
      }
      expect(onImageLoaded).toHaveBeenCalled()
    })

    it('should have box-shadow instead of border', async () => {
      const { container } = render(<Avatar name="Avatar Name" src={src} />)
      const element = container.querySelector('span')
      const avatarImg = container.querySelector('img')
      if (avatarImg) {
        fireEvent.load(avatarImg)
      }
      expect(element).toHaveStyle('border-width: 0px')
      const containerStyle = element && window.getComputedStyle(element)
      expect(containerStyle?.boxShadow).not.toBe('')
    })
  })

  describe('when shape is set to "rectangle"', () => {
    it('should display as a rectangle', async () => {
      const { container } = render(
        <Avatar name="Avatar Name" shape="rectangle" />
      )
      const avatarImg = container.querySelector('span[name="Avatar Name"]')
      expect(avatarImg).toHaveAttribute('shape', 'rectangle')
    })
  })

  describe('when the color is set to "shamrock"', () => {
    it('should display the initials in green (shamrock)', async () => {
      render(<Avatar name="Jessica Jones" color="shamrock" />)
      const initials = screen.getByText('JJ')
      expect(getComputedStyle(initials).color).toBe('rgb(3, 137, 61)')
    })

    it('should display the icon in green (shamrock)', async () => {
      const { container } = render(
        <Avatar
          name="Jessica Jones"
          renderIcon={<IconGroupLine />}
          color="fire"
        >
          Hello World
        </Avatar>
      )
      const avatarSvg = container.querySelector('svg')
      expect(avatarSvg).toHaveStyle({ fill: '#CF4A00' })
    })
  })

  describe('when "hasInverseColor" is set', () => {
    describe('with initials', () => {
      it('should display the background in the color', async () => {
        render(<Avatar name="Jessica Jones" color="shamrock" hasInverseColor />)
        const initials = screen.getByText('JJ')
        expect(initials.parentNode).toHaveStyle({
          backgroundColor: 'rgb(3, 137, 61)'
        })
      })

      it('should display the initials in white', async () => {
        render(<Avatar name="Jessica Jones" color="shamrock" hasInverseColor />)
        const initials = screen.getByText('JJ')
        expect(initials).toHaveStyle({ color: 'rgb(255, 255, 255)' })
      })
    })

    describe('with icon', () => {
      it('should display the background in the color', async () => {
        const { container } = render(
          <Avatar
            name="Jessica Jones"
            color="shamrock"
            hasInverseColor
            renderIcon={<IconGroupLine />}
          />
        )
        const element = container.querySelector('span')
        expect(element).toHaveStyle({ backgroundColor: 'rgb(3, 137, 61)' })
      })

      it('should display the icon in white', async () => {
        const { container } = render(
          <Avatar
            name="Jessica Jones"
            renderIcon={<IconGroupLine />}
            hasInverseColor
            color="fire"
          >
            Hello World
          </Avatar>
        )
        const avatarSvg = container.querySelector('svg')
        expect(avatarSvg).toHaveStyle({ fill: '#FFFFFF' })
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
      const initials = container.querySelector('[class$="-avatar__initials"]')
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
