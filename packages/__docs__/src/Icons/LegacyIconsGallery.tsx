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

import { useState, useRef, memo, useCallback, useMemo } from 'react'
import { Grid } from 'react-window'

import { InlineSVG } from '@instructure/ui-svg-images'
import { Heading } from '@instructure/ui-heading'
import { TextInput } from '@instructure/ui-text-input'
import { SimpleSelect } from '@instructure/ui-simple-select'
import { Checkbox } from '@instructure/ui-checkbox'
import { FormFieldGroup } from '@instructure/ui-form-field'
import { IconButton } from '@instructure/ui-buttons'
import { Alert } from '@instructure/ui-alerts'
import {
  ScreenReaderContent,
  AccessibleContent
} from '@instructure/ui-a11y-content'
import { Modal } from '@instructure/ui-modal'
import { SourceCodeEditor } from '@instructure/ui-source-code-editor'
import * as InstIcons from '@instructure/ui-icons'
import { IconXSolid } from '@instructure/ui-icons'
import { Link } from '@instructure/ui-link'
import { Flex } from '@instructure/ui-flex'
import { Glyph } from '../../buildScripts/DataTypes.mjs'

type Format = 'react' | 'svg' | 'font'

type IconTileProps = {
  glyph: Glyph
  format: Format
  rtl: boolean
  onClick: (glyph: Glyph, styleType: StyleType) => void
}

type LegacyIconsGalleryProps = {
  glyphs: Glyph[]
}

type StyleType = 'line' | 'solid'

function getUsageInfo(
  selectedGlyph: { glyph: Glyph; styleType: StyleType },
  format: Format
) {
  const {
    glyph: { name, lineSrc, solidSrc, glyphName },
    styleType
  } = selectedGlyph
  const styleTypeTitleCase = styleType === 'line' ? 'Line' : 'Solid'
  if (format === 'react') {
    const componentName = `${name}${styleTypeTitleCase}`
    return `import { ${componentName} } from '@instructure/ui-icons'

const MyIcon = () => {
  return (
    <${componentName} />
  )
}`
  } else if (format === 'svg') {
    return styleType === 'line' ? lineSrc : solidSrc
  }

  return `import '@instructure/ui-icons/es/icon-font/${styleTypeTitleCase}/InstructureIcons-${styleTypeTitleCase}.css'

const MyIcon = () => {
  return (
    <i className="icon-${styleType} icon-${styleType}-${glyphName}" aria-hidden="true" />
  )
}`
}

const IconTile = memo(
  ({ format, glyph, rtl, onClick }: IconTileProps) => {
    const { name, glyphName, lineSrc, solidSrc } = glyph
    const getIconNode = (styleType: StyleType) => {
      if (format === 'react') {
        const componentName = `${name}${
          styleType === 'line' ? 'Line' : 'Solid'
        }`
        const IconComponent = (InstIcons as any)[componentName]
        return <IconComponent />
      } else if (format === 'svg') {
        const src = styleType === 'line' ? lineSrc : solidSrc
        return <InlineSVG src={src} />
      }
      return (
        <span css={{ height: '1em' }}>
          <i
            className={`icon-${styleType} icon-${styleType}-${glyphName}`}
            aria-hidden="true"
          />
        </span>
      )
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
            <IconButton
              withBackground={false}
              withBorder={false}
              screenReaderLabel={name}
              size="large"
              margin="xx-small 0 xx-small 0"
              onClick={() => onClick(glyph, 'line')}
            >
              {getIconNode('line')}
            </IconButton>
            <IconButton
              withBackground={false}
              withBorder={false}
              screenReaderLabel={name}
              size="large"
              margin="xx-small 0 xx-small 0"
              onClick={() => onClick(glyph, 'solid')}
            >
              {getIconNode('solid')}
            </IconButton>
          </div>
        </div>
        <Heading level="h4" as="h3">
          {glyphName.toLowerCase()}
        </Heading>
      </div>
    )
  },
  (prevProps, nextProps) =>
    prevProps.format === nextProps.format &&
    prevProps.glyph.glyphName === nextProps.glyph.glyphName &&
    prevProps.rtl === nextProps.rtl
)
IconTile.displayName = 'IconTile'

const TILE_WIDTH = 240
const TILE_HEIGHT = 180
const COLUMN_COUNT = 4
const GRID_WIDTH = TILE_WIDTH * COLUMN_COUNT

// Empty object constant for cellProps to maintain referential equality
// and prevent unnecessary re-renders of all cells
const EMPTY_CELL_PROPS = {}

const LegacyIconsGallery = ({ glyphs }: LegacyIconsGalleryProps) => {
  const [selectedFormat, setSelectedFormat] = useState<Format>('react')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchInput, setSearchInput] = useState<string>('')
  const [selectedGlyph, setSelectedGlyph] = useState<{
    glyph: Glyph
    styleType: StyleType
  } | null>(null)
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

  const handleFormatChange = useCallback(
    (_e: React.SyntheticEvent, { value }: { value?: string | number }) => {
      setSelectedFormat(value as Format)
    },
    []
  )

  const handleIconClick = useCallback((glyph: Glyph, styleType: StyleType) => {
    setSelectedGlyph({ glyph, styleType })
  }, [])

  const handleModalDismiss = useCallback(() => {
    setSelectedGlyph(null)
  }, [])

  const formats = {
    react: 'React',
    svg: 'SVG',
    font: 'Icon Font'
  }

  const filteredGlyphs = useMemo(() => {
    if (!searchQuery) return glyphs
    return glyphs.filter((g) =>
      g.glyphName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [glyphs, searchQuery])

  const rowCount = Math.ceil(filteredGlyphs.length / COLUMN_COUNT)

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
        <SimpleSelect
          name="format"
          renderLabel={<ScreenReaderContent>Icon Format</ScreenReaderContent>}
          onChange={handleFormatChange}
        >
          {Object.keys(formats).map((f) => (
            <SimpleSelect.Option value={f} id={f} key={f}>
              {formats[f as keyof typeof formats]}
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
      {selectedFormat === 'font' && (
        <Alert variant="warning" margin="small 0">
          Icon Font is a deprecated format and only here for compatibility
          reasons. It doesn&apos;t have right-to-left support and some icons
          have visual artifacts due to svg-to-ttf conversion. We recommend using
          the React format.
        </Alert>
      )}
      {selectedFormat === 'svg' && (
        <Alert variant="info" margin="small 0">
          The SVG format doesn&apos;t have right-to-left support. If you need
          that, please use the React format.
        </Alert>
      )}

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
            if (index >= filteredGlyphs.length) {
              return <div style={style} />
            }

            const glyph = filteredGlyphs[index]
            return (
              <div style={style}>
                <IconTile
                  glyph={glyph}
                  format={selectedFormat}
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
      {selectedGlyph && (
        <Modal
          open
          onDismiss={handleModalDismiss}
          label={`Usage: ...`}
          size="medium"
          shouldCloseOnDocumentClick
        >
          <Modal.Header>
            <Flex justifyItems="space-between">
              <Flex.Item>
                <Heading>
                  {selectedGlyph.glyph.glyphName} ({selectedGlyph.styleType})
                </Heading>
              </Flex.Item>
              <Flex.Item>
                <IconButton
                  onClick={handleModalDismiss}
                  screenReaderLabel="Close"
                  renderIcon={IconXSolid}
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
                label={`How to use`}
                defaultValue={getUsageInfo(selectedGlyph, selectedFormat)}
                language="javascript"
                readOnly
              />
              {selectedFormat === 'react' && (
                <p>
                  See the <Link href="#SVGIcon">SVGIcon</Link> component for
                  props and examples.
                </p>
              )}
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  )
}

export default LegacyIconsGallery
