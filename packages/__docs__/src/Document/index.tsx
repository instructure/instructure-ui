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

import { Component } from 'react'

import { Link } from '@instructure/ui-link'
import { View } from '@instructure/ui-view'
import { Tabs } from '@instructure/ui-tabs'
import type { TabsProps } from '@instructure/ui-tabs'
import { SourceCodeEditor } from '@instructure/ui-source-code-editor'
import { withStyle } from '@instructure/emotion'

import generateStyle from './styles'
import functionalComponentThemes from '../../functionalComponentThemes'

import { Description } from '../Description'
import { Properties } from '../Properties'
import { Params } from '../Params'
import { Returns } from '../Returns'
import { ComponentTheme } from '../ComponentTheme'
import { TableOfContents } from '../TableOfContents'
import { Heading } from '../Heading'

import { allowedProps } from './props'
import type { DocumentProps, DocumentState, DocDataType } from './props'

@withStyle(generateStyle)
class Document extends Component<DocumentProps, DocumentState> {
  static allowedProps = allowedProps

  static defaultProps = {
    description: undefined,
    themeVariables: {},
    repository: undefined,
    layout: 'small'
  }

  state: DocumentState = {
    selectedDetailsTabId: undefined,
    pageRef: null,
    componentTheme: undefined
  }

  ref: HTMLDivElement | null = null

  componentDidMount() {
    this.props.makeStyles?.()
    this.setState({
      pageRef: this.ref,
      selectedDetailsTabId: this.props.doc.id
    })
  }

  fetchGenerateComponentTheme = async () => {
    const { doc, themeVariables } = this.props
    let generateTheme
    if (this.state.selectedDetailsTabId === doc.id) {
      // @ts-ignore todo type
      if (this.props.themeVariables.components?.[doc.id]) {
        // new theme
        // @ts-ignore todo type
        generateTheme = this.props.themeVariables.components[doc.id]
        this.setState({ componentTheme: generateTheme })
        return
      } else {
        // old theme
        generateTheme = doc?.componentInstance?.generateComponentTheme
      }
    } else {
      // TODO make it work for new themes
      generateTheme = doc?.children?.find(
        (value) => value.id === this.state.selectedDetailsTabId
      )?.componentInstance?.generateComponentTheme
    }
    const generateThemeFunctional =
      functionalComponentThemes[
        doc.id as keyof typeof functionalComponentThemes
      ]
    if (typeof generateTheme === 'function' && themeVariables) {
      this.setState({ componentTheme: generateTheme(themeVariables) })
    } else if (generateThemeFunctional && themeVariables) {
      const componentTheme = await generateThemeFunctional(themeVariables)
      this.setState({ componentTheme: componentTheme })
    } else {
      this.setState({ componentTheme: undefined })
    }
  }

  componentDidUpdate(prevProps: typeof this.props, prevState: DocumentState) {
    this.props.makeStyles?.()
    if (
      this.props.themeVariables?.key !== prevProps.themeVariables?.key ||
      this.state.selectedDetailsTabId != prevState.selectedDetailsTabId
    ) {
      this.fetchGenerateComponentTheme()
    }
  }

  handleDetailsTabChange: TabsProps['onRequestTabChange'] = (
    _event,
    tabData
  ) => {
    this.setState({ selectedDetailsTabId: tabData.id })
  }

  renderProps(doc: DocDataType) {
    const { props } = doc
    return props ? (
      <Properties props={props} layout={this.props.layout} />
    ) : null
  }

  renderTheme(doc: DocDataType) {
    const { themeVariables } = this.props
    const { componentTheme } = this.state

    const themeVariableKeys = componentTheme && Object.keys(componentTheme)

    return themeVariables &&
      componentTheme &&
      themeVariableKeys &&
      themeVariableKeys.length > 0 ? (
      <View margin="x-large 0" display="block">
        <Heading level="h2" as="h3" id={`${doc.id}Theme`} margin="0 0 small 0">
          Default Theme Variables
        </Heading>
        {doc.themePath ? (
          <View as="div" margin="0 0 x-small 0">
            See which global theme variables are mapped to the component here:{' '}
            {this.renderThemeLink(doc)}
            <br />
            <br />
            Note: Theme variables with a dot in their name are nested objects,
            to override them you need to override the whole object, for example:
            &nbsp;
            <code>
              themeOverride=
              {`{{ boxShadow: {x: "0.3rem", y: "0.5rem", color: "red"}}}`}
            </code>
          </View>
        ) : null}
        <ComponentTheme
          componentTheme={componentTheme}
          themeVariables={themeVariables}
        />

        <View margin="x-large 0 0" display="block">
          <Heading
            level="h4"
            id={`${doc.id}ThemeOverrideExample`}
            margin="0 0 small 0"
          >
            How to override the default theme
          </Heading>

          <View margin="small 0" display="block">
            In case you need to change the appearance of the{' '}
            <code>{doc.id}</code> component, you can override it&apos;s
            {doc.themePath
              ? this.renderThemeLink(doc, ' default theme variables.')
              : ' default theme variables.'}
          </View>
          <View margin="small 0" display="block">
            The easiest way to do this is to utilize the{' '}
            <code>themeOverride</code> property. See the{' '}
            <Link href="#using-theme-overrides">Using theme overrides</Link>{' '}
            guide for more info and alternative methods.
          </View>

          <SourceCodeEditor
            label="Component theme override example"
            language="js"
            readOnly
            defaultValue={`// theme override example

<${doc.id}
  {...props}
  themeOverride={{
    ${
      // get random theme variable
      themeVariableKeys[Math.floor(Math.random() * themeVariableKeys.length)]
    }: 'custom value'
  }}
/>`}
          />
        </View>
      </View>
    ) : null
  }

  renderDescription(doc: DocDataType, description: string) {
    const { id, title } = doc
    const filteredDescription = description
      .replace('@isWIP', '')
      .replace(/@module [a-zA-Z]+/g, '')
    return this.props.description ? (
      <Description
        id={`${id}Description`}
        content={filteredDescription}
        title={title}
      />
    ) : null
  }

  renderSrcLink() {
    const { srcUrl, srcPath, legacyGitBranch } = this.props.doc
    let legacySrcUrl

    if (!srcUrl) return

    if (legacyGitBranch) {
      legacySrcUrl = srcUrl.replace('/master/', `/${legacyGitBranch}/`)
    }

    return (
      <View as="div" margin="0 0 x-large 0">
        <Link href={legacySrcUrl || srcUrl}>{srcPath}</Link>
      </View>
    )
  }

  renderThemeLink(doc: DocDataType, text?: string) {
    if (doc.themeUrl && doc.themePath) {
      const { themePath, themeUrl, legacyGitBranch } = doc

      let legacySrcUrl

      if (legacyGitBranch) {
        legacySrcUrl = themeUrl.replace('/master/', `/${legacyGitBranch}/`)
      }

      const _text = text ? text : themePath
      return <Link href={legacySrcUrl || themeUrl}>{_text}</Link>
    }
    return null
  }

  renderUsage() {
    const { esPath, id, displayName, packageName, title } = this.props.doc
    const importName = displayName || id

    const example = []

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
          <SourceCodeEditor
            label={`How to install ${title}`}
            defaultValue={`npm install ${packageName}`}
            language="shell"
            readOnly
          />
        </View>
        <SourceCodeEditor
          label={`How to use ${title}`}
          defaultValue={example.join('\n')}
          language="javascript"
          readOnly
        />
      </View>
    )
  }

  renderEditOnGithub() {
    const { srcUrl } = this.props.doc
    const type = srcUrl.split('/')[8]

    return type === 'design' ? (
      <Link target="_blank" href={srcUrl.replace('tree', 'edit')}>
        Edit this page in GitHub
      </Link>
    ) : null
  }

  renderParams(doc: DocDataType) {
    const { id, params, genericParameters } = doc

    return params ? (
      <View margin="small 0" display="block">
        <Heading level="h2" as="h3" id={`${id}Parameters`} margin="0 0 small 0">
          Parameters
        </Heading>
        <Params
          params={params}
          genericParameters={genericParameters}
          layout={this.props.layout}
        />
      </View>
    ) : null
  }

  renderReturns(doc: DocDataType) {
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

  renderDetails(doc: DocDataType) {
    return this.hasDetails(doc) ? (
      <div>
        {this.renderParams(doc)}
        {this.renderReturns(doc)}
        {this.renderProps(doc)}
        {this.renderTheme(doc)}
      </div>
    ) : null
  }

  hasDetails(doc: DocDataType) {
    return doc.params || doc.returns || doc.methods || doc.props
  }

  render() {
    const { doc, repository, layout } = this.props
    const { pageRef } = this.state
    const children = doc.children || []

    let details = null

    if (this.hasDetails(doc)) {
      details =
        children.length > 0 ? (
          <Tabs onRequestTabChange={this.handleDetailsTabChange}>
            <Tabs.Panel
              renderTitle={doc.title}
              key={`${doc.id}TabPanel`}
              id={doc.id}
              isSelected={this.state.selectedDetailsTabId === doc.id}
            >
              {this.renderDetails(doc)}
            </Tabs.Panel>
            {
              // Details of the child components (if any)
              children.map((child) => (
                <Tabs.Panel
                  renderTitle={child.title}
                  key={`${child.id}TabPanel`}
                  id={child.id}
                  isSelected={this.state.selectedDetailsTabId === child.id}
                >
                  {this.renderDescription(child, child.description)}
                  {this.renderDetails(child)}
                </Tabs.Panel>
              ))
            }
          </Tabs>
        ) : (
          this.renderDetails(doc)
        )
    }

    return (
      <div
        ref={(e) => {
          this.ref = e
        }}
      >
        {doc.extension !== '.md' && this.renderSrcLink()}
        {pageRef && <TableOfContents doc={doc} pageElement={pageRef} />}
        {this.renderDescription(doc, this.props.description)}
        {details}
        {['.js', '.ts', '.tsx'].includes(doc.extension) && this.renderUsage()}
        {this.renderEditOnGithub()}
        {repository && layout !== 'small' && (
          <div css={this.props.styles?.githubCorner}>
            <View
              position="relative"
              display="block"
              tabIndex={0}
              href={repository}
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 250 250"
                css={this.props.styles?.githubCornerOctoArm}
              >
                <title>View source on GitHub</title>
                <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
                <path
                  d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,
                  82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,
                  76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,
                  101.9 134.4,103.2"
                  fill="currentColor"
                  id="octoArm"
                />
                <path
                  d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,
                  101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,
                  74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,
                  49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,
                  56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,
                  73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,
                  93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,
                  112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,
                  120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                  fill="currentColor"
                />
              </svg>
            </View>
          </div>
        )}
      </div>
    )
  }
}

export default Document
export { Document }
