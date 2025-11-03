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

import { fireEvent, render, screen, act } from '@testing-library/react'
import { vi } from 'vitest'
import type { MockInstance } from 'vitest'

import '@testing-library/jest-dom'
import { TreeCollection } from '../index'

const IconFolder = (
  <svg height="100" width="100">
    <title>Folder icon</title>
    <circle cx="50" cy="50" r="40" />
  </svg>
)

const IconDocument = (
  <svg height="100" width="100">
    <title>Document icon</title>
    <circle cx="50" cy="50" r="40" />
  </svg>
)

const IconUser = (
  <svg height="100" width="100">
    <title>User icon</title>
    <circle cx="50" cy="50" r="40" />
  </svg>
)

describe('<TreeCollection />', () => {
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

  it('should render', async () => {
    const { container } = render(
      <TreeCollection
        level={1}
        id={1}
        name="Coll 1"
        collections={[
          { id: 2, name: 'Coll 2', descriptor: 'Another Descriptor' }
        ]}
        items={[{ id: 1, name: 'Item 1' }]}
      />
    )
    const collection = container.querySelector('[class$="-treeCollection"]')

    expect(collection).toBeInTheDocument()
  })

  describe('collections', () => {
    it('should render icons on children', async () => {
      render(
        <TreeCollection
          level={1}
          id={1}
          name="Coll 1"
          collections={[
            { id: 2, name: 'Coll 2', descriptor: 'Another Descriptor' }
          ]}
          items={[{ id: 1, name: 'Item 1' }]}
          collectionIcon={() => IconFolder}
          collectionIconExpanded={() => IconFolder}
          itemIcon={() => IconDocument}
          expanded={true}
        />
      )
      const folderIcons = await screen.findAllByTitle('Folder icon')
      expect(folderIcons.length).toBe(2)

      const documentIcons = await screen.findAllByTitle('Document icon')
      expect(documentIcons.length).toBe(1)
    })

    it('should support the containerRef prop', async () => {
      const containerRef = vi.fn()

      const { container } = render(
        <TreeCollection
          level={1}
          id={1}
          containerRef={containerRef}
          name="Coll 1"
          collections={[
            { id: 2, name: 'Coll 2', descriptor: 'Another Descriptor' }
          ]}
          items={[{ id: 1, name: 'Item 1' }]}
        />
      )
      const collection = container.querySelector('[class$="-treeCollection"]')

      expect(containerRef).toHaveBeenCalledWith(collection)
    })

    it('should pass an aria-expanded attribute to its list item', async () => {
      render(
        <TreeCollection
          level={1}
          id={1}
          name="Coll 1"
          collections={[
            { id: 2, name: 'Coll 2', descriptor: 'Another Descriptor' }
          ]}
          items={[{ id: 1, name: 'Item 1' }]}
        />
      )
      const item = screen.getByRole('treeitem')

      expect(item).toHaveAttribute('aria-expanded')
    })

    it('should pass an aria-selected attribute to its list item', async () => {
      render(
        <TreeCollection
          level={1}
          id={1}
          name="Coll 1"
          collections={[
            { id: 2, name: 'Coll 2', descriptor: 'Another Descriptor' }
          ]}
          items={[{ id: 1, name: 'Item 1' }]}
          selection="collection_1"
        />
      )
      const item = screen.getByRole('treeitem')

      expect(item).toHaveAttribute('aria-selected')
    })

    it('should correctly evaluate `getCollectionProps` for each item', async () => {
      const { container } = render(
        <TreeCollection
          level={1}
          id={1}
          name="Coll 1"
          collections={[
            { id: 2, name: 'Coll 2', descriptor: 'Another Descriptor' }
          ]}
          items={[
            { id: 1, name: 'Item 1', icon: () => IconFolder },
            { id: 2, name: 'Item 2', icon: () => IconUser },
            { id: 2, name: 'Item 3' }
          ]}
          collectionIcon={IconFolder}
          getCollectionProps={({ ...props }) => {
            let icon = props.collectionIcon
            if (props.name === 'Coll 2') {
              icon = IconUser
            }
            return {
              ...props,
              collectionIcon: icon
            }
          }}
          expanded={true}
        />
      )
      const svgIconUser = screen.getByTitle('User icon')
      const item1 = container.querySelectorAll('button')[1]

      expect(svgIconUser).toBeInTheDocument()
      expect(item1).toContainElement(svgIconUser)
      expect(item1).toHaveTextContent('Coll 2')
    })

    describe('onCollectionClick', () => {
      it('should return the correct collection params on click', () => {
        vi.useFakeTimers()
        const onCollectionClick = vi.fn()

        render(
          <TreeCollection
            level={1}
            id={1}
            name="Coll 1"
            collections={[
              { id: 2, name: 'Coll 2', descriptor: 'Another Descriptor' }
            ]}
            items={[{ id: 1, name: 'Item 1' }]}
            onCollectionClick={onCollectionClick}
          />
        )
        const item = screen.getByRole('treeitem')

        fireEvent.click(item, { button: 0, detail: 1 })
        act(() => {
          vi.runAllTimers()
        })

        const args = onCollectionClick.mock.calls[0][1]

        expect(onCollectionClick).toHaveBeenCalledTimes(1)
        expect(args).toStrictEqual({
          id: 1,
          expanded: true,
          type: 'collection'
        })

        vi.useRealTimers()
      })
    })
  })

  describe('items', () => {
    it('should not pass an aria-expanded attribute to its button', async () => {
      render(
        <TreeCollection
          level={1}
          id={1}
          name="Coll 1"
          collections={[
            { id: 2, name: 'Coll 2', descriptor: 'Another Descriptor' }
          ]}
          items={[{ id: 1, name: 'Item 1' }]}
          expanded={true}
        />
      )
      const item = screen.getAllByLabelText('Coll 1')[0]
      const button = item.firstChild as HTMLElement

      expect(item).toHaveAttribute('aria-expanded', 'true')
      expect(button.tagName).toBe('BUTTON')
      expect(button).not.toHaveAttribute('aria-expanded')
    })

    it('should call custom functions passed by onItemClick', () => {
      vi.useFakeTimers()
      const onItemClick = vi.fn()

      render(
        <TreeCollection
          level={1}
          id={1}
          name="Coll 1"
          collections={[
            { id: 2, name: 'Coll 2', descriptor: 'Another Descriptor' }
          ]}
          items={[{ id: 1, name: 'Item 1' }]}
          onItemClick={onItemClick}
          expanded={true}
        />
      )
      const item = screen.getByLabelText('Item 1')

      fireEvent.click(item, { button: 0, detail: 1 })
      act(() => {
        vi.runAllTimers()
      })

      const args = onItemClick.mock.calls[0][1]

      expect(onItemClick).toHaveBeenCalledTimes(1)
      expect(args).toStrictEqual({
        id: 1,
        type: 'item'
      })

      vi.useRealTimers()
    })

    it('should correctly evaluate `getItemProps` for each item', async () => {
      render(
        <TreeCollection
          level={1}
          id={1}
          name="Coll 1"
          collections={[
            { id: 2, name: 'Coll 2', descriptor: 'Another Descriptor' }
          ]}
          items={[
            { id: 1, name: 'Item 1', icon: () => IconFolder },
            { id: 2, name: 'Item 2', icon: () => IconUser },
            { id: 2, name: 'Item 3' }
          ]}
          getItemProps={({ name, ...props }) => {
            let itemIcon = IconDocument
            if (name === 'Item 1') {
              itemIcon = IconFolder
            }
            if (name === 'Item 2') {
              itemIcon = IconUser
            }
            return {
              ...props,
              itemIcon,
              name
            }
          }}
          expanded={true}
        />
      )

      expect(screen.getByTitle('Folder icon')).toBeInTheDocument()
      expect(screen.getByTitle('User icon')).toBeInTheDocument()
      expect(screen.getByTitle('Document icon')).toBeInTheDocument()
    })
  })

  describe('sorting', () => {
    it('should show the items and subcollections in alphabetical order', async () => {
      const { container } = render(
        <TreeCollection
          level={1}
          id={1}
          name="Root"
          collections={[
            { id: 2, name: 'A', descriptor: 'Collection A' },
            { id: 3, name: 'B', descriptor: 'Collection B' },
            { id: 4, name: 'C', descriptor: 'Collection A' }
          ]}
          items={[
            { id: 1, name: 'A1' },
            { id: 2, name: 'B1' },
            { id: 2, name: 'C1' }
          ]}
          getItemProps={({ name, ...props }) => {
            const itemIcon = IconDocument
            return {
              ...props,
              itemIcon,
              name
            }
          }}
          expanded={true}
          compareFunc={(a, b) => {
            return a.name.localeCompare(b.name)
          }}
        />
      )
      const childNames = container.querySelectorAll(
        'span[class$="treeButton__textName"]'
      )
      const childNameArr = Array.from(childNames)
        .map((element) => element.textContent)
        .slice(1)

      expect(childNameArr).toEqual(['A', 'A1', 'B', 'B1', 'C', 'C1'])
    })

    it('should show the items before the collections', async () => {
      const { container } = render(
        <TreeCollection
          level={1}
          id={1}
          name="Root"
          collections={[
            { id: 2, name: 'Coll A', descriptor: 'Collection A' },
            { id: 3, name: 'Coll B', descriptor: 'Collection B' },
            { id: 4, name: 'Coll C', descriptor: 'Collection A' }
          ]}
          items={[
            { id: 1, name: 'Item A' },
            { id: 2, name: 'Item B' },
            { id: 2, name: 'Item C' }
          ]}
          getItemProps={({ name, ...props }) => {
            const itemIcon = IconDocument
            return {
              ...props,
              itemIcon,
              name
            }
          }}
          expanded={true}
          compareFunc={(a, b) => {
            if (a.type === 'item' && b.type === 'collection') return -1

            if (a.type === 'collection' && b.type === 'item') return 1

            return 0
          }}
        />
      )
      const childNames = container.querySelectorAll(
        'span[class$="treeButton__textName"]'
      )
      const childNameArr = Array.from(childNames)
        .map((element) => element.textContent)
        .slice(1)

      expect(childNameArr).toEqual([
        'Item A',
        'Item B',
        'Item C',
        'Coll A',
        'Coll B',
        'Coll C'
      ])
    })
  })
})
