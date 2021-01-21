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
import GithubCorner from 'react-github-corner'
import { Link } from '@instructure/ui-link'
import { View } from '@instructure/ui-view'
import { Tabs } from '@instructure/ui-tabs'
import { CodeEditor } from '@instructure/ui-code-editor'
import { ThemeRegistry, themeable } from '@instructure/ui-themeable'

import { Description } from '../Description'
import { Properties } from '../Properties'
import { Params } from '../Params'
import { Returns } from '../Returns'
import { Methods } from '../Methods'
import { ComponentTheme } from '../ComponentTheme'
import { Heading } from '../Heading'

import { DocPropType } from '../propTypes'

import theme from './theme'

@themeable(theme, null)
class Document extends Component {
  static propTypes = {
    doc: DocPropType.isRequired,
    description: PropTypes.string,
    themeKey: PropTypes.string,
    repository: PropTypes.string,
    layout: PropTypes.string
  }

  static defaultProps = {
    description: undefined,
    themeKey: undefined,
    repository: undefined,
    layout: 'small'
  }

  state = {
    selectedDetailsTabIndex: 0
  }

  handleDetailsTabChange = (event, { index }) => {
    this.setState({
      selectedDetailsTabIndex: index
    })
  }

  renderProps(doc) {
    const { id, props } = doc
    return props ? (
      <View margin="x-large 0" display="block">
        <Heading level="h2" as="h3" id={`${id}Properties`} margin="0 0 small 0">
          Properties
        </Heading>
        <Properties props={props} layout={this.props.layout} />
      </View>
    ) : null
  }

  renderTheme(doc) {
    const { themeKey } = this.props
    const generateComponentTheme = doc?.resource?.generateComponentTheme

    const themeVariables = ThemeRegistry.getRegisteredTheme(themeKey).variables
    const theme =
      typeof generateComponentTheme === 'function' &&
      generateComponentTheme(themeVariables)

    return theme && Object.keys(theme).length > 0 ? (
      <View margin="x-large 0" display="block">
        <Heading level="h2" as="h3" id={`${doc.id}Theme`} margin="0 0 small 0">
          Default Theme Variables
        </Heading>
        <ComponentTheme theme={theme} />
      </View>
    ) : null
  }

  renderDescription(doc, description) {
    const { id, title } = doc

    return this.props.description ? (
      <Description
        id={`${id}Description`}
        content={description}
        title={title}
      />
    ) : null
  }

  renderSrcLink() {
    const { srcUrl, srcPath } = this.props.doc

    if (!srcUrl) return

    return (
      <View as="div" margin="0 0 x-large 0">
        <Link href={srcUrl}>{srcPath}</Link>
      </View>
    )
  }

  renderUsage() {
    const {
      esPath,
      id,
      displayName,
      packageName,
      title,
      resource
    } = this.props.doc
    const importName = displayName || resource.displayName || id

    let example = []

    if (packageName) {
      example.push(`\
/*** ES Modules (with tree shaking) ***/
import { ${importName} } from '${packageName}'
`)
    }

    if (esPath) {
      example.push(`\
/*** ES Modules (without tree shaking) ***/
import { ${importName} } from '${esPath}'
`)
    }

    if (example.length === 0) return

    return (
      <View margin="xx-large 0" display="block">
        <Heading level="h2" as="h3" id={`${id}Usage`} margin="0 0 small 0">
          Usage
        </Heading>
        <View margin="0 0 small 0" display="block">
          <CodeEditor
            label={`How to install ${title}`}
            value={`yarn add ${packageName}`}
            language="shell"
            readOnly
          />
        </View>
        <CodeEditor
          label={`How to use ${title}`}
          value={example.join('\n')}
          language="javascript"
          readOnly
        />
      </View>
    )
  }

  renderParams(doc) {
    const { id, params } = doc

    return params ? (
      <View margin="small 0" display="block">
        <Heading level="h2" as="h3" id={`${id}Parameters`} margin="0 0 small 0">
          Parameters
        </Heading>
        <Params params={params} layout={this.props.layout} />
      </View>
    ) : null
  }

  renderReturns(doc) {
    const { id, returns } = doc

    return returns ? (
      <View margin="small 0" display="block">
        <Heading level="h2" as="h3" id={`${id}Returns`} margin="0 0 small 0">
          Returns
        </Heading>
        <Returns types={returns} />
      </View>
    ) : null
  }

  renderMethods(doc) {
    const { id, methods } = doc

    return methods && methods.length > 0 ? (
      <View margin="small 0" display="block">
        <Heading level="h2" as="h3" id={`${id}Methods`} margin="0 0 small 0">
          Methods
        </Heading>
        <Methods methods={methods} />
      </View>
    ) : null
  }

  renderDetails(doc) {
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

  hasDetails(doc) {
    return (
      doc.params || doc.returns || doc.methods || doc.props || doc.generateTheme
    )
  }

  render() {
    const { doc, repository, layout } = this.props
    const children = doc.children || []

    let details = null

    if (this.hasDetails(doc)) {
      details =
        children.length > 0 ? (
          <Tabs onRequestTabChange={this.handleDetailsTabChange}>
            <Tabs.Panel
              renderTitle={doc.title}
              key={`${doc.id}TabPanel`}
              isSelected={this.state.selectedDetailsTabIndex === 0}
            >
              {this.renderDetails(doc)}
            </Tabs.Panel>
            {children.map((child, index) => (
              <Tabs.Panel
                renderTitle={child.title}
                key={`${child.id}TabPanel`}
                isSelected={this.state.selectedDetailsTabIndex === index + 1}
              >
                {this.renderDescription(child, child.description)}
                {this.renderDetails(child)}
              </Tabs.Panel>
            ))}
          </Tabs>
        ) : (
          this.renderDetails(doc)
        )
    }

    let sections

    if (doc.sections) {
      sections = doc.sections.map((section) => (
        <View
          margin="small 0"
          display="block"
          key={`${doc.id}.${section.name}`}
        >
          <Heading
            level="h2"
            as="h3"
            color="secondary"
            id={`${doc.id}.${section.name}`}
            margin="large 0 small 0"
          >
            {section.kind && <code>{section.kind}</code>}
            {section.title}
          </Heading>
          {this.renderDescription(section, section.description)}
          {this.renderDetails(section)}
        </View>
      ))
    }

    return (
      <div>
        {doc.extension !== '.md' && this.renderSrcLink()}
        {this.renderDescription(doc, this.props.description)}
        {details}
        {sections}
        {doc.resource && this.renderUsage()}
        {repository && layout !== 'small' && (
          <GithubCorner
            href={repository}
            bannerColor={this.theme.githubCornerColor}
          />
        )}
      </div>
    )
  }
}

export default Document
export { Document }
