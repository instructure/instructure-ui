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

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import type { MockInstance } from 'vitest'
import { runAxeCheck } from '@instructure/ui-axe-check'

import '@testing-library/jest-dom'
import { TreeBrowser } from '../index'
import { TreeNode } from '../TreeNode'

const COLLECTIONS_DATA = {
  2: { id: 2, name: 'Root Directory', collections: [3, 4], items: [1] },
  3: { id: 3, name: 'Sub Root 1', collections: [5] },
  4: { id: 4, name: 'Sub Root 2' },
  5: { id: 5, name: 'Nested Sub Collection' }
}

const COLLECTIONS_DATA_WITH_ZERO = {
  0: { id: 0, name: 'Root Directory', collections: [3, 4], items: [1] },
  3: { id: 3, name: 'Sub Root 1', collections: [5] },
  4: { id: 4, name: 'Sub Root 2' },
  5: { id: 5, name: 'Nested Sub Collection' }
}

const COLLECTIONS_DATA_WITH_STRING_IDS = {
  '2': { id: '2', name: 'Root Directory', collections: ['3', '4'], items: [1] },
  '3': { id: '3', name: 'Sub Root 1', collections: ['5'] },
  '4': { id: '4', name: 'Sub Root 2' },
  '5': { id: '5', name: 'Nested Sub Collection' }
}

const ITEMS_DATA = {
  1: { id: 1, name: 'Item 1' }
}

describe('<TreeBrowser />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as MockInstance

    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as MockInstance
  })

  afterEach(() => {
    consoleWarningMock.mockRestore()
    consoleErrorMock.mockRestore()
  })

  it('should render a tree', async () => {
    const { container } = render(
      <TreeBrowser
        collections={COLLECTIONS_DATA}
        items={ITEMS_DATA}
        rootId={2}
      />
    )
    const tree = container.querySelector('[class$="-treeBrowser"]')

    expect(tree).toBeInTheDocument()
  })

  it('should render subcollections', async () => {
    render(
      <TreeBrowser
        collections={COLLECTIONS_DATA}
        items={ITEMS_DATA}
        rootId={2}
      />
    )
    const items = screen.getAllByRole('treeitem')

    expect(items.length).toEqual(1)

    await userEvent.click(items[0])

    await waitFor(() => {
      const itemsAfterClick = screen.getAllByRole('treeitem')
      expect(itemsAfterClick.length).toEqual(4)
    })
  })

  it('should render all collections at top level if showRootCollection is true and rootId is undefined', async () => {
    render(
      <TreeBrowser
        collections={COLLECTIONS_DATA}
        items={ITEMS_DATA}
        rootId={undefined}
      />
    )
    const items = screen.getAllByRole('treeitem')

    expect(items.length).toEqual(4)
  })

  describe('expanded', () => {
    it('should not expand collections or items without defaultExpanded prop', async () => {
      render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
        />
      )
      const items = screen.getAllByRole('treeitem')

      expect(items.length).toEqual(1)
      expect(items[0]).toHaveTextContent('Root Directory')
    })

    it('should accept an array of default expanded collections', async () => {
      render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          defaultExpanded={[2, 3]}
        />
      )
      const items = screen.getAllByRole('treeitem')
      const subRoot2 = screen.getByLabelText('Sub Root 2')
      const nestedSub = screen.getByLabelText('Nested Sub Collection')

      expect(items.length).toEqual(5)

      expect(subRoot2).toHaveAttribute('aria-label', 'Sub Root 2')
      expect(subRoot2).toHaveTextContent('Sub Root 2')

      expect(nestedSub).toHaveAttribute('aria-label', 'Nested Sub Collection')
      expect(nestedSub).toHaveTextContent('Nested Sub Collection')
    })
  })

  describe('selected', () => {
    it('should not show the selection if selectionType is none', async () => {
      render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
        />
      )
      const item = screen.getByRole('treeitem')

      await userEvent.click(item)

      await waitFor(() => {
        expect(item).not.toHaveAttribute('aria-selected')
      })
    })

    it('should show the selection indicator on last clicked collection or item', async () => {
      render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          selectionType="single"
        />
      )
      const item = screen.getByLabelText('Root Directory')

      await userEvent.click(item)

      await waitFor(() => {
        expect(item).toHaveAttribute('aria-selected')
      })

      const nestedItem = screen.getByLabelText('Item 1')

      await userEvent.click(nestedItem)

      await waitFor(() => {
        expect(nestedItem).toHaveAttribute('aria-selected')
      })
    })
  })

  describe('collections', () => {
    it('should render collections with string-keyed ids', async () => {
      render(
        <TreeBrowser
          collections={COLLECTIONS_DATA_WITH_STRING_IDS}
          items={ITEMS_DATA}
          rootId={'2'}
          showRootCollection={true}
        />
      )
      const item = screen.getByLabelText('Root Directory')

      expect(item).toBeInTheDocument()
    })

    it('should not show the first keyed collection if showRootCollection is false', async () => {
      render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          showRootCollection={false}
        />
      )
      const items = screen.getAllByRole('treeitem')

      expect(items.length).toEqual(3)
    })

    it('should render first keyed collection if showRootCollection is true and rootId specified', async () => {
      render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
        />
      )
      const item = screen.getByLabelText('Root Directory')

      expect(item).toBeInTheDocument()
    })

    it('should not show the first keyed collection if showRootCollection is false and rootId is 0', async () => {
      render(
        <TreeBrowser
          collections={COLLECTIONS_DATA_WITH_ZERO}
          items={ITEMS_DATA}
          rootId={0}
          showRootCollection={false}
        />
      )
      const items = screen.getAllByRole('treeitem')

      expect(items.length).toEqual(3)
    })

    it('should render a folder icon by default', async () => {
      const { container } = render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
        />
      )
      const iconFolder = container.querySelectorAll('svg[name="IconFolder"]')

      expect(iconFolder.length).toEqual(1)
    })

    it('should render a custom icon', async () => {
      const IconCustom = (
        <svg height="100" width="100" data-testid="icon-custom">
          <title data-testid="icon-custom-title">Custom icon</title>
          <circle cx="50" cy="50" r="40" />
        </svg>
      )

      render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          collectionIcon={() => IconCustom}
        />
      )
      const iconCustom = screen.getByTestId('icon-custom')
      const title = screen.getByTestId('icon-custom-title')

      expect(iconCustom).toBeInTheDocument()
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('Custom icon')
    })

    it('should render without icon if set to null', async () => {
      const { container } = render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          collectionIcon={null}
        />
      )
      const icon = container.querySelector('svg')

      expect(icon).not.toBeInTheDocument()
    })

    it('should call onCollectionToggle when expanding and collapsing with mouse', async () => {
      const onCollectionToggle = vi.fn()

      render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          onCollectionToggle={onCollectionToggle}
        />
      )
      const item = screen.getByRole('treeitem')

      await userEvent.click(item)

      await waitFor(() => {
        expect(onCollectionToggle).toHaveBeenCalled()
      })
    })

    it('should call onCollectionClick on button activation (space/enter or click)', async () => {
      const onCollectionClick = vi.fn()

      render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          onCollectionClick={onCollectionClick}
        />
      )
      const item = screen.getByLabelText('Root Directory')

      await userEvent.click(item)
      await userEvent.type(item, '{space}')
      await userEvent.type(item, '{enter}')

      await waitFor(() => {
        expect(onCollectionClick).toHaveBeenCalledTimes(3)
      })
    })

    it('should render before, after nodes of the provided collection', async () => {
      const { container } = render(
        <TreeBrowser
          collections={{
            2: {
              id: 2,
              name: 'Root Directory',
              collections: [],
              items: [],
              renderBeforeItems: (
                <TreeNode>
                  <input id="input-before" />
                </TreeNode>
              ),
              renderAfterItems: (
                <TreeNode>
                  <input id="input-after" />
                </TreeNode>
              )
            }
          }}
          items={{}}
          expanded={[2]}
          rootId={2}
        />
      )
      const contentBefore = container.querySelector('#input-before')
      const contentAfter = container.querySelector('#input-after')

      expect(contentBefore).toBeInTheDocument()
      expect(contentAfter).toBeInTheDocument()
    })
  })

  describe('items', () => {
    it('should render a document icon by default', async () => {
      const { container } = render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          defaultExpanded={[2]}
        />
      )
      const iconDocument = container.querySelectorAll(
        'svg[name="IconDocument"]'
      )

      expect(iconDocument.length).toEqual(1)
    })

    it('should render a custom icon', async () => {
      const IconCustom = (
        <svg height="100" width="100" data-testid="icon-custom">
          <title data-testid="icon-custom-title">Custom icon</title>
          <circle cx="50" cy="50" r="40" />
        </svg>
      )

      render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          defaultExpanded={[2]}
          itemIcon={() => IconCustom}
        />
      )
      const iconCustom = screen.getByTestId('icon-custom')
      const title = screen.getByTestId('icon-custom-title')

      expect(iconCustom).toBeInTheDocument()
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('Custom icon')
    })

    it('should render without icon if set to null', async () => {
      const { container } = render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
        />
      )
      const iconDocument = container.querySelector('svg[name="IconDocument"]')

      expect(iconDocument).not.toBeInTheDocument()
    })
  })

  describe('for a11y', () => {
    it('should meet a11y standards', async () => {
      const { container } = render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
        />
      )
      const axeCheck = await runAxeCheck(container)
      expect(axeCheck).toBe(true)
    })

    it('should accept a treeLabel prop', async () => {
      render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          treeLabel="Test treeLabel"
        />
      )
      const tree = screen.getByLabelText('Test treeLabel')
      expect(tree).toBeInTheDocument()
    })

    it('should toggle aria-expanded', async () => {
      render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
        />
      )
      const item = screen.getByRole('treeitem')

      expect(item).toHaveAttribute('aria-expanded', 'false')

      await userEvent.click(item)

      await waitFor(() => {
        expect(item).toHaveAttribute('aria-expanded', 'true')
      })
    })

    it('should use aria-selected when selectionType is not none', async () => {
      render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          selectionType="single"
        />
      )
      const item = screen.getByRole('treeitem')
      expect(item).not.toHaveAttribute('aria-selected')

      await userEvent.click(item)

      await waitFor(() => {
        expect(item).toHaveAttribute('aria-selected', 'true')
      })

      const nestedItem = screen.getByLabelText('Sub Root 1')
      expect(nestedItem).toHaveAttribute('aria-selected', 'false')
    })
  })

  describe('sorting', () => {
    it("should present collections and items in alphabetical order, in spite of the order of 'collections' and 'items' arrays", async () => {
      render(
        <TreeBrowser
          collections={{
            1: {
              id: 1,
              name: 'Assignments',
              collections: [5, 3, 2, 4],
              items: [3, 5, 2, 1, 4]
            },
            2: {
              id: 2,
              name: 'English Assignments',
              collections: [],
              items: []
            },
            3: { id: 3, name: 'Math Assignments', collections: [], items: [] },
            4: {
              id: 4,
              name: 'Reading Assignments',
              collections: [],
              items: []
            },
            5: { id: 5, name: 'Advanced Math Assignments', items: [] }
          }}
          items={{
            1: { id: 1, name: 'Addition Worksheet' },
            2: { id: 2, name: 'Subtraction Worksheet' },
            3: { id: 3, name: 'General Questions' },
            4: { id: 4, name: 'Vogon Poetry' },
            5: { id: 5, name: 'Bistromath' }
          }}
          rootId={1}
          defaultExpanded={[1]}
          sortOrder={(a, b) => {
            return a.name.localeCompare(b.name)
          }}
        />
      )
      const items = screen.getAllByRole('treeitem')

      const arr = items.map((item) => item.textContent)
      expect(arr.slice(1, 5)).toStrictEqual([
        'Advanced Math Assignments',
        'English Assignments',
        'Math Assignments',
        'Reading Assignments'
      ])

      expect(arr.slice(5)).toStrictEqual([
        'Addition Worksheet',
        'Bistromath',
        'General Questions',
        'Subtraction Worksheet',
        'Vogon Poetry'
      ])
    })
  })
})
