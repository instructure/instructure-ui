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
import '@testing-library/jest-dom/extend-expect'
import SimpleSelect from '../index'
import * as utils from '@instructure/ui-utils'

type ExampleOption = 'foo' | 'bar' | 'baz'
jest.mock('@instructure/ui-utils', () => {
  const originalModule = jest.requireActual('@instructure/ui-utils')

  return {
    __esModule: true,
    ...originalModule,
    isSafari: jest.fn(() => true)
  }
})

const mockUtils = utils as jest.Mocked<typeof utils>

describe('<SimpleSelect />', () => {
  const defaultOptions: ExampleOption[] = ['foo', 'bar', 'baz']

  const getOptions = (disabled?: ExampleOption) =>
    defaultOptions.map((opt) => (
      <SimpleSelect.Option
        id={opt}
        key={opt}
        value={opt}
        isDisabled={opt === disabled}
      >
        {opt}
      </SimpleSelect.Option>
    ))

  it('should have role button in Safari', async () => {
    const { container } = render(
      <SimpleSelect renderLabel="Choose an option">{getOptions()}</SimpleSelect>
    )
    const input = container.querySelector('input')
    expect(input).toHaveAttribute('role', 'button')
  })

  it('should have role combobox in different browsers than Safari', async () => {
    mockUtils.isSafari = jest.fn(() => false)

    const { container } = render(
      <SimpleSelect renderLabel="Choose an option">{getOptions()}</SimpleSelect>
    )
    const input = container.querySelector('input')
    expect(input).toHaveAttribute('role', 'combobox')
  })
})
