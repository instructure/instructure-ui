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
import { page, userEvent } from 'vitest/browser'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import type { MockInstance } from 'vitest'
import { runAxeCheck } from '@instructure/ui-axe-check'

import { TreeBrowser, TreeNode } from '@instructure/ui-tree-browser/latest'

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
    const { container } = await render(
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
    await render(
      <TreeBrowser
        collections={COLLECTIONS_DATA}
        items={ITEMS_DATA}
        rootId={2}
      />
    )
    const items = page.getByRole('treeitem').elements()

    expect(items.length).toEqual(1)

    await userEvent.click(items[0])

    await vi.waitFor(() => {
      const itemsAfterClick = page.getByRole('treeitem').elements()
      expect(itemsAfterClick.length).toEqual(4)
    })
  })

  it('should render all collections at top level if showRootCollection is true and rootId is undefined', async () => {
    await render(
      <TreeBrowser
        collections={COLLECTIONS_DATA}
        items={ITEMS_DATA}
        rootId={undefined}
      />
    )
    const items = page.getByRole('treeitem').elements()

    expect(items.length).toEqual(4)
  })

  describe('expanded', () => {
    it('should not expand collections or items without defaultExpanded prop', async () => {
      await render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
        />
      )
      const items = page.getByRole('treeitem').elements()

      expect(items.length).toEqual(1)
      expect(items[0]).toHaveTextContent('Root Directory')
    })

    it('should accept an array of default expanded collections', async () => {
      await render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          defaultExpanded={[2, 3]}
        />
      )
      const items = page.getByRole('treeitem').elements()
      const subRoot2 = page.getByLabelText('Sub Root 2').element()
      const nestedSub = page.getByLabelText('Nested Sub Collection').element()

      expect(items.length).toEqual(5)

      expect(subRoot2).toHaveAttribute('aria-label', 'Sub Root 2')
      expect(subRoot2).toHaveTextContent('Sub Root 2')

      expect(nestedSub).toHaveAttribute('aria-label', 'Nested Sub Collection')
      expect(nestedSub).toHaveTextContent('Nested Sub Collection')
    })
  })

  describe('selected', () => {
    it('should not show the selection if selectionType is none', async () => {
      await render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
        />
      )
      const item = page.getByRole('treeitem').element()

      await userEvent.click(item)

      await vi.waitFor(() => {
        expect(item).not.toHaveAttribute('aria-selected')
      })
    })

    it('should show the selection indicator on last clicked collection or item', async () => {
      await render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          selectionType="single"
        />
      )
      const item = page.getByLabelText('Root Directory').element()

      await userEvent.click(item)

      await vi.waitFor(() => {
        expect(item).toHaveAttribute('aria-selected')
      })

      const nestedItem = page.getByLabelText('Item 1').element()

      await userEvent.click(nestedItem)

      await vi.waitFor(() => {
        expect(nestedItem).toHaveAttribute('aria-selected')
      })
    })
  })

  describe('collections', () => {
    it('should render collections with string-keyed ids', async () => {
      await render(
        <TreeBrowser
          collections={COLLECTIONS_DATA_WITH_STRING_IDS}
          items={ITEMS_DATA}
          rootId={'2'}
          showRootCollection={true}
        />
      )
      const item = page.getByLabelText('Root Directory').element()

      expect(item).toBeInTheDocument()
    })

    it('should not show the first keyed collection if showRootCollection is false', async () => {
      await render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          showRootCollection={false}
        />
      )
      const items = page.getByRole('treeitem').elements()

      expect(items.length).toEqual(3)
    })

    it('should render first keyed collection if showRootCollection is true and rootId specified', async () => {
      await render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
        />
      )
      const item = page.getByLabelText('Root Directory').element()

      expect(item).toBeInTheDocument()
    })

    it('should not show the first keyed collection if showRootCollection is false and rootId is 0', async () => {
      await render(
        <TreeBrowser
          collections={COLLECTIONS_DATA_WITH_ZERO}
          items={ITEMS_DATA}
          rootId={0}
          showRootCollection={false}
        />
      )
      const items = page.getByRole('treeitem').elements()

      expect(items.length).toEqual(3)
    })

    it('should render a folder icon by default', async () => {
      const { container } = await render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
        />
      )
      const iconFolder = container.querySelectorAll('svg[name="FolderClosed"]')

      expect(iconFolder.length).toEqual(1)
    })

    it('should render a custom icon', async () => {
      const IconCustom = (
        <svg height="100" width="100" data-testid="icon-custom">
          <title data-testid="icon-custom-title">Custom icon</title>
          <circle cx="50" cy="50" r="40" />
        </svg>
      )

      await render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          collectionIcon={() => IconCustom}
        />
      )
      const iconCustom = page.getByTestId('icon-custom').element()
      const title = page.getByTestId('icon-custom-title').element()

      expect(iconCustom).toBeInTheDocument()
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('Custom icon')
    })

    it('should render without icon if set to null', async () => {
      const { container } = await render(
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

      await render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          onCollectionToggle={onCollectionToggle}
        />
      )
      const item = page.getByRole('treeitem').element()

      await userEvent.click(item)

      await vi.waitFor(() => {
        expect(onCollectionToggle).toHaveBeenCalled()
      })
    })

    it('should call onCollectionClick on button activation (space/enter or click)', async () => {
      const onCollectionClick = vi.fn()

      await render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          onCollectionClick={onCollectionClick}
        />
      )
      const item = page.getByLabelText('Root Directory').element()

      await userEvent.click(item)
      item.focus()
      await userEvent.keyboard(' ')
      await userEvent.keyboard('{Enter}')

      await vi.waitFor(() => {
        expect(onCollectionClick).toHaveBeenCalledTimes(3)
      })
    })

    it('should render before, after nodes of the provided collection', async () => {
      const { container } = await render(
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
      const { container } = await render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          defaultExpanded={[2]}
        />
      )
      const iconDocument = container.querySelectorAll('svg[name="FileText"]')

      expect(iconDocument.length).toEqual(1)
    })

    it('should render a custom icon', async () => {
      const IconCustom = (
        <svg height="100" width="100" data-testid="icon-custom">
          <title data-testid="icon-custom-title">Custom icon</title>
          <circle cx="50" cy="50" r="40" />
        </svg>
      )

      await render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          defaultExpanded={[2]}
          itemIcon={() => IconCustom}
        />
      )
      const iconCustom = page.getByTestId('icon-custom').element()
      const title = page.getByTestId('icon-custom-title').element()

      expect(iconCustom).toBeInTheDocument()
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('Custom icon')
    })

    it('should render without icon if set to null', async () => {
      const { container } = await render(
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
      const { container } = await render(
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
      await render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          treeLabel="Test treeLabel"
        />
      )
      const tree = page.getByLabelText('Test treeLabel').element()
      expect(tree).toBeInTheDocument()
    })

    it('should toggle aria-expanded', async () => {
      await render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
        />
      )
      const item = page.getByRole('treeitem').element()

      expect(item).toHaveAttribute('aria-expanded', 'false')

      await userEvent.click(item)

      await vi.waitFor(() => {
        expect(item).toHaveAttribute('aria-expanded', 'true')
      })
    })

    it('should use aria-selected when selectionType is not none', async () => {
      await render(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          selectionType="single"
        />
      )
      const item = page.getByRole('treeitem').element()
      expect(item).not.toHaveAttribute('aria-selected')

      await userEvent.click(item)

      await vi.waitFor(() => {
        expect(item).toHaveAttribute('aria-selected', 'true')
      })

      const nestedItem = page.getByLabelText('Sub Root 1').element()
      expect(nestedItem).toHaveAttribute('aria-selected', 'false')
    })
  })

  describe('sorting', () => {
    it("should present collections and items in alphabetical order, in spite of the order of 'collections' and 'items' arrays", async () => {
      await render(
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
      const items = page.getByRole('treeitem').elements()

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
