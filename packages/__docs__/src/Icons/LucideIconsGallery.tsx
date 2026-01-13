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

import { useState, memo, useCallback, useMemo, useRef } from 'react'
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
import * as LucideIcons from '@instructure/ui-icons-lucide'
import { XInstUIIcon } from '@instructure/ui-icons-lucide'
import { Flex } from '@instructure/ui-flex'

// Get all exported Lucide icons (excluding utilities and types)
const lucideIconNames = Object.keys(LucideIcons).filter(
  (name) => name !== 'renderIconWithProps' && name !== 'LucideIconWrapperProps'
)

type LucideIconTileProps = {
  name: string
  rtl: boolean
  onClick: (name: string) => void
}

function getUsageInfo(iconName: string) {
  return `import { ${iconName} } from '@instructure/ui-icons-lucide'

const MyIcon = () => {
  return (
    <${iconName} size={'2xl'}  color='successColor'/>
  )
}`
}

const LucideIconTile = memo(
  ({ name, rtl, onClick }: LucideIconTileProps) => {
    const IconComponent = (LucideIcons as any)[name]

    if (!IconComponent) {
      return null
    }

    return (
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          minWidth: '15em',
          flexBasis: '15em',
          flexGrow: 1,
          margin: '0.5rem 0'
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
              onClick={() => onClick(name)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label={name}
            >
              <IconComponent size="xl" />
            </button>
          </div>
        </div>
        <Heading level="h4" as="h3">
          {name}
        </Heading>
      </div>
    )
  },
  (prevProps, nextProps) =>
    prevProps.name === nextProps.name && prevProps.rtl === nextProps.rtl
)
LucideIconTile.displayName = 'LucideIconTile'

const TILE_WIDTH = 240
const TILE_HEIGHT = 150
const COLUMN_COUNT = 4
const GRID_WIDTH = TILE_WIDTH * COLUMN_COUNT

// Empty object constant for cellProps to maintain referential equality
// and prevent unnecessary re-renders of all cells
const EMPTY_CELL_PROPS = {}

const LucideIconsGallery = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchInput, setSearchInput] = useState<string>('')
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [rtl, setRtl] = useState<boolean>(false)
  const timeoutId = useRef<NodeJS.Timeout | null>(null)

  // Debounced search - only update searchQuery after 300ms of no typing
  const handleSearchChange = useCallback(
    (_e: React.ChangeEvent, value: string) => {
      setSearchInput(value)

      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }

      timeoutId.current = setTimeout(() => {
        setSearchQuery(value)
      }, 300)
    },
    []
  )

  const handleBidirectionToggle = useCallback((e: React.ChangeEvent<any>) => {
    setRtl(e.target.checked)
  }, [])

  const handleIconClick = useCallback((name: string) => {
    setSelectedIcon(name)
  }, [])

  const handleModalDismiss = useCallback(() => {
    setSelectedIcon(null)
  }, [])

  const filteredIcons = useMemo(() => {
    if (!searchQuery) return lucideIconNames
    return lucideIconNames.filter((name) =>
      name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const rowCount = Math.ceil(filteredIcons.length / COLUMN_COUNT)

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
        css={{
          margin: '0 auto',
          paddingTop: '1rem',
          width: '100%',
          maxWidth: `${GRID_WIDTH}px`
        }}
      >
        <Grid
          cellComponent={({ columnIndex, rowIndex, style }) => {
            const index = rowIndex * COLUMN_COUNT + columnIndex
            if (index >= filteredIcons.length) {
              return <div style={style} />
            }

            const iconName = filteredIcons[index]
            return (
              <div style={style}>
                <LucideIconTile
                  name={iconName}
                  rtl={rtl}
                  onClick={handleIconClick}
                />
              </div>
            )
          }}
          cellProps={EMPTY_CELL_PROPS}
          columnCount={COLUMN_COUNT}
          columnWidth={TILE_WIDTH}
          rowCount={rowCount}
          rowHeight={TILE_HEIGHT}
          style={{
            height: '600px',
            width: `${GRID_WIDTH}px`,
            overflowX: 'hidden'
          }}
        />
      </div>

      {selectedIcon && (
        <Modal
          open
          onDismiss={handleModalDismiss}
          label={`Usage: ${selectedIcon}`}
          size="medium"
          shouldCloseOnDocumentClick
        >
          <Modal.Header>
            <Flex justifyItems="space-between">
              <Flex.Item>
                <Heading>{selectedIcon}</Heading>
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
                label={`How to use ${selectedIcon}`}
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

export default LucideIconsGallery
