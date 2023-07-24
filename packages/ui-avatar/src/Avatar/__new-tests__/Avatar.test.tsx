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

import '@testing-library/jest-dom/extend-expect'
import Avatar from '../index'

describe('ui-avatar component tests', () => {
  it('renders correctly', async () => {
    const { container } = render(<Avatar name="avatar name" />)
    const avatarImg = container.querySelector('img')
    expect(avatarImg).toBeInTheDocument()
  })

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

  it('should display the image url provided', async () => {
    const src =
      'data:image/gif;base64,R0lGODlhFAAUAJEAAP/9/fYQEPytrflWViH5BAAAAAAALAAAAAAUABQAQAJKhI+pGe09lnhBnEETfodatVHNh1BR+ZzH9LAOCYrVYpiAfWWJOxrC/5MASbyZT4d6AUIBlUYGoR1FsAXUuTN5YhxAEYbrpKRkQwEAOw=='
    const { container } = render(<Avatar name="avatar name" src={src} />)
    const avatarImg = container.querySelector('img')
    expect(avatarImg).toHaveAttribute('src', src)
  })
})
