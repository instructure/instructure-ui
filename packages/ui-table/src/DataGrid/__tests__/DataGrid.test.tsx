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

import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import { describe, it, expect } from 'vitest'
import { DataGrid } from '@instructure/ui-table/latest'
import { runAxeCheck } from '@instructure/ui-axe-check'

type Person = { name: string; age: number }

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'age', header: 'Age' }
]
const data: Person[] = [
  { name: 'Ada', age: 36 },
  { name: 'Grace', age: 85 }
]

describe('<DataGrid />', () => {
  it('renders a header cell per column and a row per data item', async () => {
    await render(<DataGrid caption="People" columns={columns} data={data} />)

    expect(page.getByRole('columnheader').elements()).toHaveLength(2)
    expect(page.getByText('Ada').element()).toBeInTheDocument()
    expect(page.getByText('85').element()).toBeInTheDocument()
    // header row + 2 data rows
    expect(page.getByRole('row').elements()).toHaveLength(3)
  })

  it('should meet a11y standards', async () => {
    const { container } = await render(
      <DataGrid caption="People" columns={columns} data={data} />
    )

    expect(await runAxeCheck(container)).toBe(true)
  })
})
