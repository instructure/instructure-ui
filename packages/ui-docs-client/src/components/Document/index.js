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

import Link from '@instructure/ui-elements/lib/components/Link'
import Heading from '@instructure/ui-elements/lib/components/Heading'
import Text from '@instructure/ui-elements/lib/components/Text'
import Container from '@instructure/ui-container/lib/components/Container'
import { darken } from '@instructure/ui-themeable/lib/utils/color'
import TabList, { TabPanel } from '@instructure/ui-core/lib/components/TabList'

import Description from '../Description'
import Properties from '../Properties'
import Params from '../Params'
import Returns from '../Returns'
import Methods from '../Methods'
import ComponentTheme from '../ComponentTheme'
import CodeEditor from '../CodeEditor'

import { DocPropType } from '../App/propTypes'

export default class Document extends Component {
  static propTypes = {
    doc: DocPropType.isRequired,
    description: PropTypes.string,
    themeKey: PropTypes.string
  }

  static defaultProps = {
    description: undefined,
    themeKey: undefined
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
    const { generateTheme } = doc
    const theme = (typeof generateTheme === 'function') && generateTheme(themeKey)

    return theme && Object.keys(theme).length > 0 ? (
      <Container margin="small">
        <Heading level="h3" id={`${doc.id}Theme`} margin="large 0 small 0">
          Theme Variables
        </Heading>
        <ComponentTheme theme={theme} />
      </Container>
    ) : null
  }

  renderDescription (doc, description) {
    const {
      id,
      title
    } = doc

    return this.props.description ? (
      <Description
        id={`${id}Description`}
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
        <Link href={srcUrl} theme={{ color: '#005A8F', hoverColor: darken('#005A8F', 10) }}>
          {srcPath}
        </Link>
      </Text>
    )
  }

  renderUsage () {
    const { requirePath, id, displayName, packageName, title, resource } = this.props.doc

    if (!requirePath) return

    const example = `\
/*** ES Modules ***/
import ${displayName || resource.name} from '${requirePath}'

/*** CommonJS ***/
const ${displayName || resource.name} = require('${requirePath}')
`
    return (
      <Container margin="small">
        <Heading level="h3" id={`${id}Usage`} margin="large 0 small 0">
          Usage
        </Heading>
        <Container margin="0 0 small 0" display="block">
          <CodeEditor label={`How to install ${title}`} code={`yarn add ${packageName}`} language="sh" readOnly />
        </Container>
        <CodeEditor label={`How to use ${title}`} code={example} language="js" readOnly />
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
      id,
      methods
    } = doc

    return (methods && methods.length > 0) ? (
      <Container margin="small">
        <Heading level="h3" id={`${id}Methods`} margin="0 0 small 0">
          Methods
        </Heading>
        <Methods methods={methods} />
      </Container>
    ) : null
  }

  renderDetails (doc) {
    return this.hasDetails(doc) ? (
      <div>
        {this.renderParams(doc)}
        {this.renderReturns(doc)}
        {this.renderMethods(doc)}
        {this.renderProps(doc)}
        {this.renderTheme(doc)}
      </div>
    ) : null
  }

  hasDetails (doc) {
    return doc.params || doc.returns || doc.methods || doc.props || doc.generateTheme
  }

  render () {
    const { doc } = this.props
    const children = doc.children || []
    let details = null

    if (this.hasDetails(doc)) {
      details = (children.length > 0) ? (
        <TabList>
          <TabPanel title={doc.title} key={`${doc.id}TabPanel`}>
            {this.renderDetails(doc)}
          </TabPanel>
          {children.map(child => (
            <TabPanel title={child.title} key={`${child.id}TabPanel`}>
              {this.renderDescription(child, child.description)}
              {this.renderDetails(child)}
            </TabPanel>
          ))}
        </TabList>
      ) : this.renderDetails(doc)
    }

    let sections

    if (doc.sections) {
      sections = doc.sections.map(section => (
        <Container margin="small" key={`${doc.id}.${section.name}`}>
          <Heading level="h3" id={`${doc.id}.${section.name}`} margin="large 0 small 0">
            { section.kind && <code>{section.kind}</code> }
            {section.title}
          </Heading>
          {this.renderDescription(section, section.description)}
          {this.renderDetails(section)}
        </Container>
      ))
    }

    return (
      <div>
        { doc.extension !== '.md' && this.renderSrcLink() }
        { this.renderDescription(doc, this.props.description) }
        { details }
        { sections }
        { doc.resource && this.renderUsage() }
      </div>
    )
  }
}
