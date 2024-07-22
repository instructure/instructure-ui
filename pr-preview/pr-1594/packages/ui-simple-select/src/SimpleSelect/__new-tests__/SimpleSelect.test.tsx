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
import { vi } from 'vitest'
import '@testing-library/jest-dom'
import SimpleSelect from '../index'
import * as utils from '@instructure/ui-utils'

type ExampleOption = 'foo' | 'bar' | 'baz'
vi.mock('@instructure/ui-utils', async (importOriginal) => {
  const originalModule = (await importOriginal()) as any
  return {
    __esModule: true,
    ...originalModule,
    isSafari: vi.fn(() => true)
  }
})

const mockUtils = utils as any

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

  // convert to e2e fail in vitest
  // it('should have role button in Safari', async () => {
  //   const { container } = render(
  //     <SimpleSelect renderLabel="Choose an option">{getOptions()}</SimpleSelect>
  //   )
  //   const input = container.querySelector('input')
  //   expect(input).toHaveAttribute('role', 'button')
  // })

  it('should have role combobox in different browsers than Safari', async () => {
    mockUtils.isSafari = vi.fn(() => false)

    const { container } = render(
      <SimpleSelect renderLabel="Choose an option">{getOptions()}</SimpleSelect>
    )
    const input = container.querySelector('input')
    expect(input).toHaveAttribute('role', 'combobox')
  })
})
