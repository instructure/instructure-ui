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

import '@testing-library/jest-dom'
import { TreeButton } from '../index'

describe('<TreeButton />', () => {
  it('should render', async () => {
    const { container } = render(<TreeButton id="1" />)
    const treeButton = container.querySelector('button[class$="-treeButton"]')

    expect(treeButton).toBeInTheDocument()
  })

  describe('containerRef', () => {
    it('should call with parent element', async () => {
      const containerRef = vi.fn()

      render(
        <div data-testid="1">
          <TreeButton id="2" containerRef={containerRef} />
        </div>
      )
      const div = screen.getByTestId('1')

      expect(containerRef).toHaveBeenCalledWith(div)
    })
  })

  describe('descriptor', () => {
    it('should not render a descriptor element if no descriptor passed', async () => {
      const { container } = render(<TreeButton id="1" />)

      const descriptor = container.querySelector(
        '[class$="-treeButton__textDescriptor"]'
      )
      expect(descriptor).not.toBeInTheDocument()
    })

    it('should render a descriptor element if descriptor passed', async () => {
      const { container } = render(
        <TreeButton id="1" descriptor="Some Descriptor" />
      )
      const descriptor = container.querySelector(
        '[class$="-treeButton__textDescriptor"]'
      )

      expect(descriptor).toBeInTheDocument()
      expect(descriptor).toHaveTextContent('Some Descriptor')
    })
  })

  describe('icons', () => {
    const Icon = (
      <svg height="100" width="100" data-testid="custom-icon">
        <title data-testid="custom-icon-title">Test icon</title>
        <circle cx="50" cy="50" r="40" />
      </svg>
    )

    it('should render a collection icon', async () => {
      render(
        <TreeButton id="1" type="collection" collectionIcon={() => Icon} />
      )
      const icon = screen.getByTestId('custom-icon')
      const iconTitle = screen.getByTestId('custom-icon-title')

      expect(icon).toBeInTheDocument()
      expect(icon).toHaveTextContent('Test icon')
      expect(iconTitle).toBeInTheDocument()
    })

    it('should render an item icon', async () => {
      render(<TreeButton id="1" type="item" itemIcon={() => Icon} />)
      const icon = screen.getByTestId('custom-icon')

      expect(icon).toBeInTheDocument()
      expect(icon).toHaveTextContent('Test icon')
    })

    it('should render no icon if no icon prop passed', async () => {
      const { container } = render(<TreeButton id="1" />)
      const icon = container.querySelector('svg')

      expect(icon).not.toBeInTheDocument()
    })

    it('should render a thumbnail instead of an icon if a thumbnail URL is passed', async () => {
      const { container } = render(
        <TreeButton
          id="1"
          type="item"
          thumbnail="data:image/gif;base64,R0lGODlhFAAUAJEAAP/9/fYQEPytrflWViH5BAAAAAAALAAAAAAUABQAQAJKhI+pGe09lnhBnEETfodatVHNh1BR+ZzH9LAOCYrVYpiAfWWJOxrC/5MASbyZT4d6AUIBlUYGoR1FsAXUuTN5YhxAEYbrpKRkQwEAOw=="
        />
      )
      const img = container.querySelector('img')

      expect(img).toBeInTheDocument()
    })

    it('should not render a thumbnail if no thumbnail URL is passed', async () => {
      const { container } = render(<TreeButton id="1" type="item" />)
      const thumbnail = container.querySelector('img')

      expect(thumbnail).not.toBeInTheDocument()
    })

    it('should render a thumbnail if a thumbnail and an icon are passed', async () => {
      const { container } = render(
        <TreeButton
          id="1"
          type="item"
          itemIcon={() => Icon}
          thumbnail="data:image/gif;base64,R0lGODlhFAAUAJEAAP/9/fYQEPytrflWViH5BAAAAAAALAAAAAAUABQAQAJKhI+pGe09lnhBnEETfodatVHNh1BR+ZzH9LAOCYrVYpiAfWWJOxrC/5MASbyZT4d6AUIBlUYGoR1FsAXUuTN5YhxAEYbrpKRkQwEAOw=="
        />
      )
      const thumbnail = container.querySelector('img')
      const icon = container.querySelector('svg')

      expect(thumbnail).toBeInTheDocument()
      expect(icon).not.toBeInTheDocument()
    })
  })

  describe('renderContent', () => {
    it('should render the content passed to renderContent', async () => {
      const { container } = render(
        <TreeButton
          id="1"
          renderContent={() => <div className="test1">abcd</div>}
        />
      )
      const customElement = container.querySelector('div[class="test1"]')

      expect(customElement).toBeInTheDocument()
    })
  })
})
