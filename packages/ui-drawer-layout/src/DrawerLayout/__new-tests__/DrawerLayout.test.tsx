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

import DrawerLayoutFixture from '../__fixtures__/DrawerLayout.fixture'

describe('<DrawerLayout />', () => {
  it('should render', () => {
    const { container } = render(<DrawerLayoutFixture />)

    const layout = container.querySelector('div[class$="-drawerLayout"]')

    expect(layout).toBeInTheDocument()
  })

  it('should render a DrawerTray and DrawerContent', async () => {
    const { container } = render(
      <DrawerLayoutFixture open={true} layoutWidth="800px" trayWidth="250px" />
    )

    const tray = screen.getByText('Hello from tray')
    const contentWrapper = container.querySelector(
      'div[class$="drawerLayout__content"]'
    )

    expect(tray).toBeInTheDocument()
    expect(contentWrapper).toHaveTextContent('Hello from content')
    expect(contentWrapper).toHaveAttribute('aria-label', 'Test DrawerContent')
  })
})
