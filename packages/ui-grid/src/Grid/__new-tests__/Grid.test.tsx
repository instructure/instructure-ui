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

import { Grid } from '../index'

describe('<Grid />', () => {
  it('should render content in each column', async () => {
    const { container } = render(
      <Grid>
        <Grid.Row>
          <Grid.Col>Foo</Grid.Col>
          <Grid.Col>Bar</Grid.Col>
          <Grid.Col>Baz</Grid.Col>
        </Grid.Row>
      </Grid>
    )

    expect(container).toHaveTextContent('FooBarBaz')
  })

  it('should pass aria and role attributes to underlying DOM elements', async () => {
    render(
      <Grid data-testid="grid" role="grid" aria-hidden="true">
        <Grid.Row data-testid="grid-row" aria-live="polite" role="presentation">
          <Grid.Col data-testid="grid-col" aria-disabled="true">
            Foo
          </Grid.Col>
        </Grid.Row>
      </Grid>
    )

    expect(screen.getByTestId('grid')).toHaveAttribute('aria-hidden')
    expect(screen.getByTestId('grid-row')).toHaveAttribute(
      'aria-live',
      'polite'
    )
    expect(screen.getByTestId('grid-col')).toHaveAttribute('aria-disabled')
  })
})
