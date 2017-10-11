import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Link from '@instructure/ui-core/lib/components/Link'
import Heading from '@instructure/ui-core/lib/components/Heading'
import Text from '@instructure/ui-core/lib/components/Text'
import Container from '@instructure/ui-core/lib/components/Container'

import Table from '@instructure/ui-core/lib/components/Table'
import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent'
import TabList, { TabPanel } from '@instructure/ui-core/lib/components/TabList'

import Description from '../Description'
import Properties from '../Properties'
import Params from '../Params'
import Returns from '../Returns'
import Methods from '../Methods'
import ComponentTheme from '../ComponentTheme'
import CodeEditor from '../CodeEditor'

import compileMarkdown from '../../utils/compileMarkdown'

import { DocPropType } from '../App/propTypes'

export default class Document extends Component {
  static propTypes = {
    doc: DocPropType.isRequired, // eslint-disable-line react/forbid-prop-types
    themeKey: PropTypes.string
  }

  static defaultProps = {
    themeKey: null
  }

  renderProps (doc) {
    const {
      id,
      props
    } = doc
    return props ? (
      <Container margin="small">
        <Heading level="h3" id={`${id}Properties`} margin="0 0 small 0">
          Properties
        </Heading>
        <Properties props={props} />
      </Container>
    ) : null
  }

  renderTheme (doc) {
    const { themeKey } = this.props
    const generateTheme = doc.component && doc.component.generateTheme
    const theme = generateTheme && generateTheme(themeKey)

    return theme && Object.keys(theme).length > 0 ? (
      <Container margin="small">
        <Heading level="h3" id={`${doc.id}Theme`} margin="large 0 small 0">
          Theme Variables
        </Heading>
        <ComponentTheme theme={theme} />
      </Container>
    ) : null
  }

  renderDescription () {
    const {
      srcUrl,
      description,
      id,
      title,
      undocumented
    } = this.props.doc

    return description && !undocumented ? (
      <Description
        id={id}
        content={description}
        title={title}
      />
    ) : null
  }

  renderSrcLink () {
    const { srcUrl, srcPath } = this.props.doc

    if (!srcUrl) return

    return (
      <Text size="small">
        <Link href={srcUrl}>
          {srcPath}
        </Link>
      </Text>
    )
  }

  renderUsage () {
    const { requirePath, id, packageName } = this.props.doc

    if (!requirePath) return

    const example = `\
/*** ES Modules ***/
import ${id} from '${requirePath}'

/*** CommonJS ***/
const ${id} = require('${requirePath}')
`
    return (
      <Container margin="small">
        <Heading level="h3" id={`${id}Usage`} margin="large 0 small 0">
          Usage
        </Heading>
        <Container margin="0 0 small 0" display="block">
          <code>yarn add {packageName}</code>
        </Container>
        <CodeEditor code={example} readOnly />
      </Container>
    )
  }

  renderParams (doc) {
    const {
      id,
      params
    } = doc
    return params ? (
      <Container margin="small">
        <Heading level="h3" id={`${id}Parameters`} margin="0 0 small 0">
          Parameters
        </Heading>
        <Params params={params} />
      </Container>
    ) : null
  }

  renderReturns (doc) {
    const {
      id,
      returns
    } = doc
    return returns ? (
      <Container margin="small">
        <Heading level="h3" id={`${id}Returns`} margin="0 0 small 0">
          Returns
        </Heading>
        <Returns types={returns} />
      </Container>
    ) : null
  }

  renderMethods (doc) {
    const {
      id
    } = doc

    const methods = (this.props.doc.methods || []).filter(method => method.docblock !== null)

    return (methods.length > 0) ? (
      <Container margin="small">
        <Heading level="h3" id={`${id}Returns`} margin="0 0 small 0">
          Methods
        </Heading>
        <Methods methods={methods} />
      </Container>
    ) : null
  }

  renderDoc (doc) {
    return (
      <div>
        {this.renderParams(doc)}
        {this.renderReturns(doc)}
        {this.renderMethods(doc)}
        {this.renderProps(doc)}
        {this.renderTheme(doc)}
      </div>
    )
  }

  renderDetails () {
    const { doc } = this.props
    const children = doc.children || []

    if (children.length > 0) {
      return (
        <TabList>
          <TabPanel title={doc.title} key={`${doc.id}TabPanel`}>
            {this.renderDoc(doc)}
          </TabPanel>
          {children.map(child => (
            <TabPanel title={child.title} key={`${child.id}TabPanel`}>
              {this.renderDoc(child)}
            </TabPanel>
          ))}
        </TabList>
      )
    } else {
      return this.renderDoc(doc)
    }
  }

  render () {
    return (
      <div>
        { this.props.doc.documentType !== 'markdown' && this.renderSrcLink() }
        {this.renderDescription()}
        {this.renderDetails()}
        {this.renderUsage()}
      </div>
    )
  }
}
