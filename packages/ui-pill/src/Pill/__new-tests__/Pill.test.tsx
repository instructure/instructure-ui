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
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { Pill } from '../index'
import { IconEyeLine } from '@instructure/ui-icons'

describe('<Pill />', () => {
  it('should render', async () => {
    const { container } = render(<Pill>Overdue</Pill>)
    const pill = container.querySelector('div[class$="-pill"]')

    expect(pill).toBeInTheDocument()
    expect(pill).toHaveTextContent('Overdue')
  })

  it('should display text', async () => {
    const { container } = render(<Pill>Overdue</Pill>)

    expect(container).toHaveTextContent('Overdue')
  })

  it('should display status text', async () => {
    const { container } = render(<Pill statusLabel="Statuslabel">Overdue</Pill>)

    expect(container).toHaveTextContent('Statuslabel:')
    expect(container).toHaveTextContent('Overdue')
  })

  it('should render icon text', async () => {
    const { container } = render(
      <Pill
        statusLabel="Statuslabel"
        renderIcon={<IconEyeLine color="auto" title="Love" />}
      >
        Overdue
      </Pill>
    )

    const svg = container.querySelector('svg')

    expect(container).toHaveTextContent('Statuslabel:')
    expect(container).toHaveTextContent('Overdue')
    expect(svg).toHaveAttribute('name', 'IconEye')
  })

  it('should be accessible', async () => {
    const { container } = render(<Pill>Overdue</Pill>)
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })
})
