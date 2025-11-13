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

import { useState, memo, useCallback } from 'react'

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
import { X } from '@instructure/ui-icons-lucide'
import { Link } from '@instructure/ui-link'
import { Flex } from '@instructure/ui-flex'

// Get all exported Lucide icons (excluding utilities and types)
const lucideIconNames = Object.keys(LucideIcons).filter(
  (name) =>
    name !== 'withRTL' &&
    name !== 'wrapLucideIcon' &&
    name !== 'LucideProps' &&
    name !== 'LucideIcon' &&
    name !== 'LucideIconWrapperProps' &&
    name !== 'InstUIIconProps' &&
    name !== 'LucideIconTheme' &&
    name !== 'BIDIRECTIONAL_ICONS'
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
    <${iconName} size={24} />
  )
}`
}

// use react memo to improve performance
const LucideIconTile = memo(
  ({ name, rtl, onClick }: LucideIconTileProps) => {
    // @ts-ignore - dynamic import
    const IconComponent = LucideIcons[name]

    // Defensive check - if icon doesn't exist, don't render
    if (!IconComponent) {
      return null
    }

    return (
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          minWidth: '16em',
          flexBasis: '16em',
          flexGrow: 1,
          margin: '0.5rem'
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
              <IconComponent size={32} />
            </button>
          </div>
        </div>
        <Heading level="h4" as="h3">
          {name}
        </Heading>
      </div>
    )
  },
  (prevProps, nextProps) => {
    // only re-render the component if these values change
    return prevProps.name === nextProps.name && prevProps.rtl === nextProps.rtl
  }
)
LucideIconTile.displayName = 'LucideIconTile'

const LucideIconsGallery = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [rtl, setRtl] = useState<boolean>(false)

  // Memoize handlers to prevent unnecessary re-renders
  const handleSearchChange = useCallback(
    (_e: React.ChangeEvent, value: string) => {
      setSearchQuery(value)
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

  const filteredIcons = lucideIconNames.filter((name) => {
    if (!searchQuery) return true
    return name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div>
      {/*<Alert variant="info" margin="0 0 medium 0">*/}
      {/*  <strong>New:</strong> Lucide icons with pure API! These icons use the*/}
      {/*  native Lucide API with RTL support where needed.{' '}*/}
      {/*  <Link href="https://lucide.dev/icons" target="_blank">*/}
      {/*    Browse all 1,500+ icons →*/}
      {/*  </Link>*/}
      {/*</Alert>*/}

      <FormFieldGroup
        layout="columns"
        colSpacing="small"
        description={<ScreenReaderContent>Filter Icons</ScreenReaderContent>}
      >
        <TextInput
          placeholder="Filter icons..."
          value={searchQuery}
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
          display: 'flex',
          flexWrap: 'wrap',
          margin: '0 auto',
          paddingTop: '1rem'
        }}
      >
        {filteredIcons.map((name) => (
          <LucideIconTile
            name={name}
            key={name}
            rtl={rtl}
            onClick={handleIconClick}
          />
        ))}
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
                  renderIcon={() => <X />}
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
                  <code>size</code>: Number (pixels) - e.g., <code>24</code>
                </li>
                <li>
                  <code>color</code>: CSS color - e.g.,{' '}
                  <code>&quot;currentColor&quot;</code>
                </li>
                <li>
                  <code>strokeWidth</code>: Number - e.g., <code>2</code>
                </li>
                <li>Plus all standard SVG props (className, style, etc.)</li>
              </ul>
              <p>
                These icons use the pure Lucide API. See{' '}
                <Link href="https://lucide.dev/guide/" target="_blank">
                  Lucide documentation
                </Link>{' '}
                for more details.
              </p>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  )
}

export default LucideIconsGallery
