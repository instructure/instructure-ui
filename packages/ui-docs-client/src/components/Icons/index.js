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

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CloseButton from '@instructure/ui-buttons/lib/components/CloseButton'
import Heading from '@instructure/ui-elements/lib/components/Heading'
import TextInput from '@instructure/ui-forms/lib/components/TextInput'
import Link from '@instructure/ui-elements/lib/components/Link'
import Select from '@instructure/ui-forms/lib/components/Select'
import FormFieldGroup from '@instructure/ui-form-field/lib/components/FormFieldGroup'
import ScreenReaderContent from '@instructure/ui-a11y/lib/ScreenReaderContent'
import Modal, { ModalHeader, ModalBody } from '@instructure/ui-overlays/lib/components/Modal'
import CodeEditor from '@instructure/ui-code-editor/lib/components/CodeEditor'
import Checkbox from '@instructure/ui-forms/lib/components/Checkbox'
import AccessibleContent from '@instructure/ui-a11y/lib/AccessibleContent'

import themeable from '@instructure/ui-themeable'

import Glyph from '../Glyph'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class Icons extends Component {
  static propTypes = {
    selectedFormat: PropTypes.string.isRequired,
    formats: PropTypes.object.isRequired,
    packageName: PropTypes.string.isRequired
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      query: '',
      name: null,
      variant: null,
      glyph: null,
      rtl: false
    }
  }

  get selectedFormatKey () {
    const { formats, selectedFormat } = this.props
    const keys = Object.keys(formats)

    if (selectedFormat && formats[selectedFormat]) {
      return selectedFormat
    } else if (formats['icons-react']) {
      return 'icons-react'
    } else {
      return keys[0]
    }
  }

  get selectedFormat () {
    const { formats } = this.props
    return formats[this.selectedFormatKey]
  }

  get selectedGlyphs () {
    const glyphs = {}

    Object.keys(this.selectedFormat.glyphs).forEach((glyphName) => {
      const glyph = this.selectedFormat.glyphs[glyphName]

      glyphs[glyph.glyphName] = glyphs[glyph.glyphName] || {}
      glyphs[glyph.glyphName][glyph.variant] = glyph
    })

    return glyphs
  }

  handleSearchChange = (e) => this.setState({query: e.target.value})

  handleFormatChange = (e, o) => {
    window.location.hash = `#${o.value}`
  }

  handleVariantClick = (e, name, variant, glyph) => {
    this.setState({ name, variant, glyph })
  }

  handleModalDismiss = (e) => {
    this.setState({ name: null, variant: null, glyph: null })
  }

  handleBidirectionToggle = () => {
    this.setState({
      rtl: !this.state.rtl
    })
  }

  renderHeader () {
    const { formats } = this.props
    return (
      <div className={styles.header}>
        <FormFieldGroup
          layout="columns"
          colSpacing="small"
          description={<ScreenReaderContent>Filter Icons</ScreenReaderContent>}
          hAlign="end"
        >
          <TextInput
            placeholder="Filter icons..."
            defaultValue={this.state.query}
            onChange={this.handleSearchChange}
            label={<ScreenReaderContent>Icon Name</ScreenReaderContent>}
            size="large"
          />
          <Select
            name="format"
            label={<ScreenReaderContent>Icon Format</ScreenReaderContent>}
            onChange={this.handleFormatChange}
            size="large"
            value={this.selectedFormatKey}
          >
            {Object.keys(formats).map(key => (
              <option value={key} key={`${key}`}>{formats[key].format}</option>
            ))}
          </Select>
          {this.renderBidirectionToggle()}
        </FormFieldGroup>
      </div>
    )
  }

  renderFooter () {
    return (
      <div>
        <Heading level="h3" margin="medium 0">
          Installation
        </Heading>
        <CodeEditor
          label={`How to install`}
          value={`yarn add ${this.props.packageName}`}
          language="shell"
          readOnly
        />
      </div>
    )
  }

  renderBidirectionToggle () {
    return (
      <Checkbox
        label={
          <AccessibleContent alt="Render icons with right-to-left text direction">
            RTL
          </AccessibleContent>
        }
        variant="toggle"
        size="small"
        onChange={this.handleBidirectionToggle}
      />
    )
  }

  renderUsage (name, variant, glyph) {
    const { requirePath } = this.selectedFormat

    let example

    if (glyph.cssFile) {
      example = `\
import '${requirePath}/${variant}/${glyph.cssFile}'

class MyIcon extends React.Component {
  render() {
    return <i className="${glyph.classes.join(' ')}" aria-hidden="true" />
  }
}`
    } else if (glyph.displayName) {
      example = `\
import ${glyph.displayName} from '${requirePath}/${glyph.displayName}'

class MyIcon extends React.Component {
  render() {
    return <${glyph.displayName} />
  }
}`
    } else {
      example = glyph.src
    }

    return (
      <div key={`${name}-${variant}`}>
        <Heading level="h3" margin="small 0">
          Usage
        </Heading>
        <CodeEditor
          label={`How to use`}
          value={example}
          language="javascript"
          readOnly
        />
        { glyph.displayName && <p>See the <Link href="#SVGIcon">SVGIcon</Link> component for props and examples.</p> }
      </div>
    )
  }

  renderGlyph (name, variants) {
    const firstVariant = variants[Object.keys(variants)[0]]
    return firstVariant.deprecated ? null : (
      <div className={styles.glyph} key={name}>
        <Glyph
          name={name}
          variants={variants}
          onClick={this.handleVariantClick}
          rtl={this.state.rtl}
        />
      </div>
    )
  }

  render () {
    const { name, variant, glyph } = this.state

    return (
      <div className={styles.root}>
        {this.renderHeader()}
        <div className={styles.glyphs}>
          {
            Object.keys(this.selectedGlyphs)
              .filter(name => new RegExp(this.state.query, 'i').test(name))
              .map(name => this.renderGlyph(name, this.selectedGlyphs[name]))
          }
        </div>
        {this.renderFooter()}
        {
          (name && variant && glyph) ? (
            <Modal
              open
              onDismiss={this.handleModalDismiss}
              label={`Usage: ${name} ${variant}`}
              size="medium"
              shouldCloseOnDocumentClick
            >
              <ModalHeader>
                <CloseButton
                  placement="end"
                  offset="medium"
                  variant="icon"
                  onClick={this.handleModalDismiss}
                >
                  Close
                </CloseButton>
                <Heading>{`${glyph.glyphName} (${variant})`}</Heading>
              </ModalHeader>
              <ModalBody>
                {this.renderUsage(name, variant, glyph)}
              </ModalBody>
            </Modal>
          ) : null
        }
      </div>
    )
  }
}
