import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Heading from '@instructure/ui-core/lib/components/Heading'
import TextInput from '@instructure/ui-core/lib/components/TextInput'
import Select from '@instructure/ui-core/lib/components/Select'
import FormFieldGroup from '@instructure/ui-core/lib/components/FormFieldGroup'
import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent'
import Modal, { ModalHeader, ModalBody, ModalFooter } from '@instructure/ui-core/lib/components/Modal'
import IconSearch from '@instructure/ui-icons/lib/Solid/IconSearch'

import themeable from '@instructure/ui-themeable'

import CodeEditor from '../CodeEditor'
import Glyph from '../Glyph'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class Icons extends Component {
  static propTypes = {
    selectedFormat: PropTypes.string.isRequired,
    formats: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    packageName: PropTypes.string.isRequired
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      query: '',
      name: null,
      variant: null,
      glyph: null
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

  handleSearchChange = (e) => this.setState({query: e.target.value})

  handleFormatChange = (e) => {
    window.location.hash = `#${e.target.value}`
  }

  handleVariantClick = (e, name, variant, glyph) => {
    this.setState({ name, variant, glyph })
  }

  handleModalDismiss = (e) => {
    this.setState({ name: null, variant: null, glyph: null })
  }

  renderHeader () {
    const { formats } = this.props
    return (
      <div className={styles.header}>
        <div className="filters">
          <FormFieldGroup
            layout="columns"
            colSpacing="small"
            description={<ScreenReaderContent>Filter Icons</ScreenReaderContent>}
            hAlign="end"
          >
            <TextInput
              placeholder="Filter Icons"
              defaultValue={this.state.query}
              onChange={this.handleSearchChange}
              label={<ScreenReaderContent>Icon Name</ScreenReaderContent>}
              size="large"
              icon={IconSearch}
            />
            <Select
              name="format"
              label={<ScreenReaderContent>Icon Format</ScreenReaderContent>}
              onChange={this.handleFormatChange}
              size="large"
              value={this.props.selectedFormat}
            >
              {Object.keys(formats).map(key => (
                <option value={key} key={`${key}`}>{formats[key].format}</option>
              ))}
            </Select>
          </FormFieldGroup>
        </div>
      </div>
    )
  }

  renderFooter () {
    return (
      <div>
        <Heading level="h3" margin="medium 0">
          Installation
        </Heading>
        <CodeEditor label={`How to install`} code={`yarn add ${this.props.packageName}`} language="sh" readOnly />
      </div>
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
import ${glyph.displayName} from '${requirePath}/${variant}/${glyph.displayName}'

class MyIcon extends React.Component {
  render() {
    return <${glyph.displayName} />
  }
}`
    } else {
      example = `\
import InlineSVG from '@instructure/ui-svg-images/lib/components/InlineSVG'
import { ${name} } from '${requirePath}'

class MyIcon extends React.Component {
  render() {
    return <InlineSVG src={${name}.${variant}.src} width="2em" height="2em" />
  }
}`
    }

    return (
      <div key={`${name}-${variant}`}>
        <Heading level="h3" margin="small 0">
          Usage
        </Heading>
        <CodeEditor label={`How to use`} code={example} language="js" readOnly />
      </div>
    )
  }

  renderGlyph (name, variants) {
    return (
      <div className={styles.glyph} key={name}>
        <Glyph
          name={name}
          variants={variants}
          onClick={this.handleVariantClick}
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
            Object.keys(this.selectedFormat.glyphs)
              .filter(name => new RegExp(this.state.query, 'i').test(name))
              .map(name => this.renderGlyph(name, this.selectedFormat.glyphs[name]))
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
              shouldCloseOnOverlayClick
              closeButtonLabel="Close"
              applicationElement={() => [
                document.getElementById('app'),
                document.getElementById('flash-messages'),
                document.getElementById('nav')
              ]}
            >
              <ModalHeader>
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
