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

import {
  useState,
  memo,
  useCallback,
  useMemo,
  useRef,
  type SyntheticEvent
} from 'react'
import type { ChangeEvent } from 'react'

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
import {
  LucideIcons,
  CustomIcons,
  ParchmentGraphics,
  ParchmentIcons,
  ParchmentVectors
} from '@instructure/ui-icons'
import { XInstUIIcon } from '@instructure/ui-icons'
import { Flex } from '@instructure/ui-flex'
import { SimpleSelect } from '@instructure/ui-simple-select'

type OrgType = 'Instructure' | 'Parchment'

type IconCategory = 'Icons' | 'Graphics' | 'Vectors'

type IconInfo = {
  name: string
  component: React.ComponentType<any>
  org: OrgType
  iconCategory?: IconCategory
  importPath: string
}

type IconTileProps = {
  icon: IconInfo
  rtl: boolean
  onClick: (icon: IconInfo) => void
}

const allIcons: IconInfo[] = [
  ...Object.entries(LucideIcons).map(([name, component]) => ({
    name,
    component: component as React.ComponentType<any>,
    org: 'Instructure' as OrgType,
    importPath: '@instructure/ui-icons'
  })),
  ...Object.entries(CustomIcons).map(([name, component]) => ({
    name,
    component: component as React.ComponentType<any>,
    org: 'Instructure' as OrgType,
    importPath: '@instructure/ui-icons'
  })),
  ...Object.entries(ParchmentGraphics).map(([name, component]) => ({
    name,
    component: component as React.ComponentType<any>,
    org: 'Parchment' as OrgType,
    iconCategory: 'Graphics',
    importPath: '@instructure/ui-icons'
  })),
  ...Object.entries(ParchmentIcons).map(([name, component]) => ({
    name,
    component: component as React.ComponentType<any>,
    org: 'Parchment' as OrgType,
    iconCategory: 'Icons',
    importPath: '@instructure/ui-icons'
  })),
  ...Object.entries(ParchmentVectors).map(([name, component]) => ({
    name,
    component: component as React.ComponentType<any>,
    org: 'Parchment' as OrgType,
    iconCategory: 'Vectors',
    importPath: '@instructure/ui-icons'
  }))
]

function getUsageInfo(icon: IconInfo) {
  return `import { ${icon.name} } from '${icon.importPath}'

const MyIcon = () => {
  return (
    <${icon.name} size="2xl" color="successColor" />
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
          minWidth: '14em',
          flexBasis: '14em',
          flexGrow: 1
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

const IconsGallery = () => {
  const orgs = ['Instructure', 'Parchment'] as OrgType[]
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedOrg, setSelectedOrg] = useState<OrgType>('Instructure')
  const [selectedCategory, setSelectedCategory] = useState<
    IconCategory | undefined
  >(undefined)
  const [selectedIcon, setSelectedIcon] = useState<IconInfo | null>(null)
  const [rtl, setRtl] = useState<boolean>(false)
  const searchTimeoutId = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSearchChange = (_e: ChangeEvent, value: string) => {
    // Instant update when extending query (typing adds characters)
    if (value.startsWith(searchQuery)) {
      setSearchQuery(value)
      return
    }

    // Debounce when deleting (reveals more icons = heavier re-render)
    if (searchTimeoutId.current) {
      clearTimeout(searchTimeoutId.current)
    }

    searchTimeoutId.current = setTimeout(() => {
      setSearchQuery(value)
    }, 500)
  }

  const handleOrgChange = useCallback(
    (_e: SyntheticEvent, { value }: { value?: string | number }) => {
      setSelectedOrg(value as OrgType)

      if (value === 'Parchment') {
        setSelectedCategory('Icons')
      } else {
        setSelectedCategory(undefined)
      }
    },
    []
  )

  const handleCategoryChange = useCallback(
    (_e: SyntheticEvent, { value }: { value?: string | number }) => {
      setSelectedCategory(value as IconCategory)
    },
    []
  )

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
    const iconsByOrgAndCategory = allIcons
      .filter((icon) => icon.org === selectedOrg)
      .filter(
        (icon) => !selectedCategory || icon.iconCategory === selectedCategory
      )

    return searchQuery
      ? iconsByOrgAndCategory.filter((icon) =>
          icon.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : iconsByOrgAndCategory
  }, [searchQuery, selectedCategory, selectedOrg])

  return (
    <div>
      <FormFieldGroup
        layout="columns"
        colSpacing="small"
        description={<ScreenReaderContent>Filter Icons</ScreenReaderContent>}
      >
        <TextInput
          placeholder="Filter icons..."
          onChange={handleSearchChange}
          renderLabel={<ScreenReaderContent>Icon Name</ScreenReaderContent>}
        />
        <SimpleSelect
          name="org-select"
          renderLabel={<ScreenReaderContent>Icon Format</ScreenReaderContent>}
          onChange={handleOrgChange}
        >
          {orgs.map((org) => (
            <SimpleSelect.Option value={org} id={org} key={org}>
              {`${org} Icons`}
            </SimpleSelect.Option>
          ))}
        </SimpleSelect>
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
      {selectedOrg === 'Parchment' && (
        <>
          <br />
          <SimpleSelect
            name="category-select"
            renderLabel={
              <ScreenReaderContent>
                Icon Category (only for Parchment)
              </ScreenReaderContent>
            }
            onChange={handleCategoryChange}
          >
            {['Icons', 'Graphics', 'Vectors'].map((category) => (
              <SimpleSelect.Option
                value={category}
                id={category}
                key={category}
              >
                {category}
              </SimpleSelect.Option>
            ))}
          </SimpleSelect>
        </>
      )}

      <div
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          margin: '0 auto',
          paddingTop: '1rem',
          gap: '1rem'
        }}
      >
        {filteredIcons.map((icon) => (
          <IconTile
            key={icon.name}
            icon={icon}
            rtl={rtl}
            onClick={handleIconClick}
          />
        ))}
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
