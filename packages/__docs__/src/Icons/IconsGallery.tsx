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

import { useState, memo, useCallback, useMemo, useRef, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import { Grid } from 'react-window'

import { Heading } from '@instructure/ui-heading'
import { TextInput } from '@instructure/ui-text-input'
import { Checkbox } from '@instructure/ui-checkbox'
import { FormFieldGroup } from '@instructure/ui-form-field'
import { IconButton } from '@instructure/ui-buttons'
import {
  ScreenReaderContent,
  AccessibleContent
} from '@instructure/ui-a11y-content'
import { Modal } from '@instructure/ui-modal'
import { SourceCodeEditor } from '@instructure/ui-source-code-editor'
import { LucideIcons, CustomIcons } from '@instructure/ui-icons'
import { XInstUIIcon } from '@instructure/ui-icons'
import { Flex } from '@instructure/ui-flex'

type IconSource = 'lucide' | 'custom'

type IconInfo = {
  name: string
  component: React.ComponentType<any>
  source: IconSource
  importPath: string
}

type IconTileProps = {
  icon: IconInfo
  rtl: boolean
  onClick: (icon: IconInfo) => void
}

// Get all stroke icons
const strokeIconNames = Object.keys(LucideIcons).filter((name) =>
  name.endsWith('InstUIIcon')
)

// Get all custom icons
const customIconNames = Object.keys(CustomIcons).filter((name) =>
  name.endsWith('InstUIIcon')
)

// Combine all icons with metadata
const allIcons: IconInfo[] = [
  ...strokeIconNames.map((name) => ({
    name,
    component: (LucideIcons as any)[name],
    source: 'lucide' as const,
    importPath: '@instructure/ui-icons'
  })),
  ...customIconNames.map((name) => ({
    name,
    component: (CustomIcons as any)[name],
    source: 'custom' as const,
    importPath: '@instructure/ui-icons'
  }))
]

function getUsageInfo(icon: IconInfo) {
  return `import { ${icon.name} } from '${icon.importPath}'

const MyIcon = () => {
  return (
    <${icon.name} size={'2xl'} color='successColor' />
  )
}`
}

const IconTile = memo(
  ({ icon, rtl, onClick }: IconTileProps) => {
    const IconComponent = icon.component

    if (!IconComponent) {
      return null
    }

    return (
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
          padding: '0.5rem',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}
      >
        <div
          css={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            backgroundImage:
              'linear-gradient(45deg, rgb(238, 238, 238) 25%, transparent 25%, transparent 75%, rgb(238, 238, 238) 75%, rgb(238, 238, 238)), linear-gradient(45deg, rgb(238, 238, 238) 25%, transparent 25%, transparent 75%, rgb(238, 238, 238) 75%, rgb(238, 238, 238))',
            backgroundPosition: '0px 0px, calc(0.5rem) calc(0.5rem)',
            backgroundSize: `1rem 1rem`,
            border: '0.0625rem solid rgb(238, 238, 238)',
            borderRadius: '0.25rem',
            marginBottom: '0.5rem'
          }}
        >
          <div dir={rtl ? 'rtl' : undefined}>
            <button
              onClick={() => onClick(icon)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label={icon.name}
            >
              <IconComponent size="xl" />
            </button>
          </div>
        </div>
        <div
          css={{
            width: '100%',
            maxWidth: '100%',
            padding: '0 0.5rem',
            boxSizing: 'border-box',
            textAlign: 'center',
            fontSize: '0.7rem',
            fontWeight: 700,
            lineHeight: '1.3',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            hyphens: 'auto',
            margin: 0,
            overflow: 'hidden',
            display: 'block'
          }}
        >
          {icon.name}
        </div>
      </div>
    )
  },
  (prevProps, nextProps) =>
    prevProps.icon.name === nextProps.icon.name &&
    prevProps.rtl === nextProps.rtl
)
IconTile.displayName = 'IconTile'

const TILE_HEIGHT = 180

// Empty object constant for cellProps to maintain referential equality
// and prevent unnecessary re-renders of all cells
const EMPTY_CELL_PROPS = {}

// Helper function to determine column count based on window width
// Breakpoints based on TILE_WIDTH (300px) to ensure tiles fit properly
function getColumnCountForWidth(width: number): number {
  if (width < 600) return 1 // Mobile - fits 1 tile (300px + padding)
  if (width < 900) return 2 // Tablet - fits 2 tiles (600px + padding)
  return 3 // Desktop - fits 3 tiles (900px + padding)
}

const IconsGallery = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchInput, setSearchInput] = useState<string>('')
  const [selectedIcon, setSelectedIcon] = useState<IconInfo | null>(null)
  const [rtl, setRtl] = useState<boolean>(false)
  const [containerWidth, setContainerWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 900
  )
  const searchTimeoutId = useRef<NodeJS.Timeout | null>(null)
  const resizeTimeoutId = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Debounced search
  const handleSearchChange = useCallback((_e: ChangeEvent, value: string) => {
    setSearchInput(value)

    if (searchTimeoutId.current) {
      clearTimeout(searchTimeoutId.current)
    }

    searchTimeoutId.current = setTimeout(() => {
      setSearchQuery(value)
    }, 300)
  }, [])

  const handleBidirectionToggle = useCallback((e: ChangeEvent<any>) => {
    setRtl(e.target.checked)
  }, [])

  const handleIconClick = useCallback((icon: IconInfo) => {
    setSelectedIcon(icon)
  }, [])

  const handleModalDismiss = useCallback(() => {
    setSelectedIcon(null)
  }, [])

  const filteredIcons = useMemo(() => {
    if (!searchQuery) return allIcons
    return allIcons.filter((icon) =>
      icon.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  // Update container width on resize with debouncing
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      } else {
        setContainerWidth(window.innerWidth)
      }
    }

    const handleResize = () => {
      if (resizeTimeoutId.current) {
        clearTimeout(resizeTimeoutId.current)
      }

      resizeTimeoutId.current = setTimeout(() => {
        updateWidth()
      }, 150)
    }

    // Initial measurement
    updateWidth()

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeTimeoutId.current) {
        clearTimeout(resizeTimeoutId.current)
      }
    }
  }, [])

  // Calculate column count and tile width based on container width
  const columnCount = getColumnCountForWidth(containerWidth)
  const tileWidth = Math.floor(containerWidth / columnCount)
  const gridWidth = tileWidth * columnCount
  const rowCount = Math.ceil(filteredIcons.length / columnCount)
  const gridHeight = rowCount * TILE_HEIGHT

  // Memoized cell renderer to prevent unnecessary re-renders
  const CellRenderer = useCallback(
    ({ columnIndex, rowIndex, style }: any) => {
      const index = rowIndex * columnCount + columnIndex
      if (index >= filteredIcons.length) {
        return <div style={style} />
      }

      const icon = filteredIcons[index]
      return (
        <div style={{ ...style, overflow: 'hidden' }}>
          <IconTile icon={icon} rtl={rtl} onClick={handleIconClick} />
        </div>
      )
    },
    [columnCount, filteredIcons, rtl, handleIconClick]
  )

  return (
    <div css={{ overflowX: 'hidden' }}>
      <FormFieldGroup
        layout="columns"
        colSpacing="small"
        description={<ScreenReaderContent>Filter Icons</ScreenReaderContent>}
      >
        <TextInput
          placeholder="Filter icons..."
          value={searchInput}
          onChange={handleSearchChange}
          renderLabel={<ScreenReaderContent>Icon Name</ScreenReaderContent>}
        />
        <Checkbox
          label={
            <AccessibleContent alt="Render icons with right-to-left text direction">
              RTL
            </AccessibleContent>
          }
          variant="toggle"
          size="small"
          onChange={handleBidirectionToggle}
        />
      </FormFieldGroup>

      <div
        ref={containerRef}
        css={{
          margin: '0 auto',
          paddingTop: '1rem',
          width: '100%',
          maxWidth: '1200px'
        }}
      >
        <Grid
          key={`grid-${columnCount}`}
          cellComponent={CellRenderer}
          cellProps={EMPTY_CELL_PROPS}
          columnCount={columnCount}
          columnWidth={tileWidth}
          rowCount={rowCount}
          rowHeight={TILE_HEIGHT}
          style={{
            height: `${gridHeight}px`,
            width: `${gridWidth}px`,
            overflowX: 'hidden'
          }}
        />
      </div>

      {selectedIcon && (
        <Modal
          open
          onDismiss={handleModalDismiss}
          label={`Usage: ${selectedIcon.name}`}
          size="medium"
          shouldCloseOnDocumentClick
        >
          <Modal.Header>
            <Flex justifyItems="space-between">
              <Flex.Item>
                <Heading>{selectedIcon.name}</Heading>
              </Flex.Item>
              <Flex.Item>
                <IconButton
                  onClick={handleModalDismiss}
                  screenReaderLabel="Close"
                  renderIcon={() => <XInstUIIcon />}
                  withBorder={false}
                  withBackground={false}
                />
              </Flex.Item>
            </Flex>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Heading level="h3" margin="small 0">
                Usage
              </Heading>
              <SourceCodeEditor
                label={`How to use ${selectedIcon.name}`}
                defaultValue={getUsageInfo(selectedIcon)}
                language="javascript"
                readOnly
              />
              <Heading level="h4" margin="medium 0 small 0">
                Available Props
              </Heading>
              <ul>
                <li>
                  <code>size</code>: Semantic token - e.g.,{' '}
                  <code>&quot;sm&quot;</code>, <code>&quot;md&quot;</code>,{' '}
                  <code>&quot;lg&quot;</code>
                  <br />
                  <em>
                    Note: Stroke width is automatically derived from size for
                    consistent pixel-perfect rendering across all icon sizes.
                  </em>
                </li>
                <li>
                  <code>color</code>: Semantic token - e.g.,{' '}
                  <code>&quot;successColor&quot;</code>,{' '}
                  <code>&quot;baseColor&quot;</code>
                </li>
                <li>
                  Plus all standard SVG props (except for className, style, css,
                  children etc.)
                </li>
              </ul>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  )
}

export default IconsGallery
