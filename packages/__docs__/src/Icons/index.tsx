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

/** @jsx jsx */
import { useState, useRef, memo } from 'react'

import { jsx } from '@instructure/emotion'

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
  onClick: (styleType: StyleType) => void
}

type IconsPageProps = {
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

// use react memo to improve performance
const IconTile = memo(
  ({ format, glyph, rtl, onClick }: IconTileProps) => {
    const { name, glyphName, lineSrc, solidSrc } = glyph
    const getIconNode = (styleType: StyleType) => {
      if (format === 'react') {
        const componentName = `${name}${
          styleType === 'line' ? 'Line' : 'Solid'
        }`
        // @ts-ignore TS cant type import *
        const IconComponent = InstIcons[componentName]
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
            <IconButton
              withBackground={false}
              withBorder={false}
              screenReaderLabel={name}
              size="large"
              margin="xx-small 0 xx-small 0"
              onClick={() => onClick('line')}
            >
              {getIconNode('line')}
            </IconButton>
            <IconButton
              withBackground={false}
              withBorder={false}
              screenReaderLabel={name}
              size="large"
              margin="xx-small 0 xx-small 0"
              onClick={() => onClick('solid')}
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
  (prevProps, nextProps) => {
    // only re-render the component if these values change
    return (
      prevProps.format === nextProps.format &&
      prevProps.glyph.glyphName === nextProps.glyph.glyphName &&
      prevProps.rtl === nextProps.rtl
    )
  }
)

const IconsPage = ({ glyphs }: IconsPageProps) => {
  const [selectedFormat, setSelectedFormat] = useState<Format>('react')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedGlyph, setSelectedGlyph] = useState<{
    glyph: Glyph
    styleType: StyleType
  } | null>(null)
  const [rtl, setRtl] = useState<boolean>(false)
  const timeoutId = useRef<NodeJS.Timeout | null>(null)

  const handleSearchChange = (_e: React.ChangeEvent, value: string) => {
    // don't debounce when typing, it should be instant because of React.memo
    if (value.startsWith(searchQuery)) {
      setSearchQuery(value)
      return
    }

    // clear already running timeout on search query change
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }

    // 500ms debounce so the UI doesn't lag when reloading all icons
    timeoutId.current = setTimeout(() => {
      setSearchQuery(value)
    }, 500)
  }

  const handleBidirectionToggle = (e: React.ChangeEvent<any>) => {
    // 0ms timeout so the UI doesn't freeze
    setTimeout(() => {
      setRtl(e.target.checked)
    }, 0)
  }

  const handleFormatChange = (
    _e: React.SyntheticEvent,
    { value }: { value?: string | number }
  ) => {
    // 0ms timeout so the UI doesn't freeze
    setTimeout(() => {
      setSelectedFormat(value as Format)
    }, 0)
  }

  const formats = {
    react: 'React',
    svg: 'SVG',
    font: 'Icon Font'
  }
  const allMatch = glyphs.filter((g) => {
    if (!searchQuery) return true
    return g.glyphName.toLowerCase().includes(searchQuery.toLowerCase())
  })

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
          display: 'flex',
          flexWrap: 'wrap',
          margin: '0 auto',
          paddingTop: '1rem'
        }}
      >
        {allMatch.map((g) => (
          <IconTile
            glyph={g}
            format={selectedFormat}
            key={g.name}
            rtl={rtl}
            onClick={(styleType) => setSelectedGlyph({ glyph: g, styleType })}
          />
        ))}
      </div>
      {selectedGlyph && (
        <Modal
          open
          onDismiss={() => setSelectedGlyph(null)}
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
                  onClick={() => setSelectedGlyph(null)}
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

export default IconsPage
