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
import { Component } from 'react'
import ReactDOM from 'react-dom'

import { Tabs } from '@instructure/ui-tabs'
import { Modal } from '@instructure/ui-modal'
import { Tooltip } from '@instructure/ui-tooltip'
import { AccessibleContent } from '@instructure/ui-a11y-content'
import { SVGIcon } from '@instructure/ui-svg-images'
import { SourceCodeEditor } from '@instructure/ui-source-code-editor'
import { Checkbox } from '@instructure/ui-checkbox'
import { Flex } from '@instructure/ui-flex'
import { IconButton, CloseButton } from '@instructure/ui-buttons'
import { IconXLine } from '@instructure/ui-icons'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { AppContext } from '../App'
import { Preview, PreviewErrorBoundary } from '../Preview'
import { CodeSandboxButton } from '../CodeSandboxButton'
import type { PlaygroundProps, PlaygroundState } from './props'
import { propTypes, allowedProps } from './props'
import type { MainDocsData } from '../../buildScripts/DataTypes.mjs'

/* eslint-disable max-len */
const codeIconPath = (
  <path d="M14,6c0-0.984-0.813-2-2-2c-0.531,0-0.994,0.193-1.38,0.58l-9.958,9.958C0.334,14.866,0,15.271,0,16s0.279,1.08,0.646,1.447  l9.974,9.973C11.006,27.807,11.469,28,12,28c1.188,0,2-1.016,2-2c0-0.516-0.186-0.986-0.58-1.38L4.8,16l8.62-8.62  C13.814,6.986,14,6.516,14,6z M31.338,14.538L21.38,4.58C20.994,4.193,20.531,4,20,4c-1.188,0-2,1.016-2,2  c0,0.516,0.186,0.986,0.58,1.38L27.2,16l-8.62,8.62C18.186,25.014,18,25.484,18,26c0,0.984,0.813,2,2,2  c0.531,0,0.994-0.193,1.38-0.58l9.974-9.973C31.721,17.08,32,16.729,32,16S31.666,14.866,31.338,14.538z" />
)
const fullScreenIconPath = (
  <path d="M12,0v2h8.6L8.3,14.3l1.4,1.4L22,3.4v8.5h2V0H12z M18,22H2V6h10l2-2H0v20h20V10l-2,2V22z" />
)
/* eslint-enable max-len */

@withStyle(generateStyle, generateComponentTheme)
class Playground extends Component<PlaygroundProps, PlaygroundState> {
  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    background: 'checkerboard',
    readOnly: false,
    language: 'jsx'
  }

  _fullScreenButton: IconButton | null = null

  constructor(props: PlaygroundProps) {
    super(props)
    this.state = {
      defaultCode: props.code, // to track changes to code
      code: props.code,
      fullscreen: false,
      showCode: false,
      rtl: false,
      selectedTab: 0
    }
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate(_prevProps: PlaygroundProps, prevState: PlaygroundState) {
    if (prevState.fullscreen === true && this.state.fullscreen === false) {
      ;(
        ReactDOM.findDOMNode(this._fullScreenButton) as HTMLButtonElement
      ).focus() // eslint-disable-line react/no-find-dom-node
    }

    this.props.makeStyles?.()
  }

  static getDerivedStateFromProps(
    nextProps: Readonly<PlaygroundProps>,
    prevState: Readonly<PlaygroundState>
  ) {
    if (nextProps.code !== prevState.defaultCode) {
      // code prop was updated, reset defaultCode and actual code state
      return {
        code: nextProps.code,
        defaultCode: nextProps.code
      }
    } else {
      return null
    }
  }

  mutliExample = () => typeof this.props.code !== 'string'

  handleCodeToggle = () => {
    this.setState({
      showCode: !this.state.showCode
    })
  }

  handleBidirectionToggle = () => {
    this.setState({
      rtl: !this.state.rtl
    })
  }

  handleMaximize = () => {
    this.setState({
      fullscreen: true
    })
  }

  handleChange = (newCode: string) => {
    let code: string | [string, string] = newCode
    if (this.mutliExample()) {
      const codeArr = [...this.state.code] as [string, string]
      codeArr[this.state.selectedTab] = newCode
      code = codeArr
    }

    this.setState({
      code
    })
  }

  handleMinimize = () => {
    this.setState({
      fullscreen: false
    })
  }

  renderEditor() {
    const { styles, title, readOnly } = this.props
    const { selectedTab } = this.state
    const code = this.mutliExample()
      ? this.state.code[selectedTab]
      : this.state.code
    return (
      <div>
        <div css={styles?.close}>
          <IconButton
            size="small"
            onClick={this.handleCodeToggle}
            screenReaderLabel="Hide Code"
            withBorder={false}
            withBackground={false}
            renderIcon={IconXLine}
          />
        </div>
        <SourceCodeEditor
          label={`${title} Example Code`}
          defaultValue={code as string}
          key={selectedTab}
          onChange={this.handleChange}
          readOnly={readOnly}
          attachment="bottom"
          language="jsx"
          lineNumbers
          lineWrapping
          foldGutter
          highlightActiveLine
          highlightActiveLineGutter
        />
      </div>
    )
  }

  renderBidirectionToggle() {
    return (
      <Checkbox
        label={
          <AccessibleContent alt="Render component with right-to-left text direction">
            RTL
          </AccessibleContent>
        }
        variant="toggle"
        size="small"
        onChange={this.handleBidirectionToggle}
      />
    )
  }

  renderPreview = (
    code: string,
    themeKey: string,
    themes: MainDocsData['themes']
  ) => {
    const { fullscreen, rtl } = this.state

    return (
      <PreviewErrorBoundary>
        <Preview
          code={code}
          language={this.props.language}
          background={
            typeof this.props.background === 'string'
              ? this.props.background
              : 'light'
          }
          fullscreen={fullscreen}
          rtl={rtl}
          themeKey={themeKey}
          themes={themes}
        />
      </PreviewErrorBoundary>
    )
  }

  renderTabPanel = (themeKey: any, themes: any) => {
    const { selectedTab, code } = this.state

    return (
      <Tabs
        margin="large auto"
        padding="medium"
        onRequestTabChange={(_event, { index }) => {
          this.setState({
            selectedTab: index
          })
        }}
      >
        <Tabs.Panel
          id="tabA"
          renderTitle="Class"
          isSelected={selectedTab === 0}
        >
          {this.renderPreview(code[0], themeKey, themes)}
        </Tabs.Panel>
        <Tabs.Panel
          id="tabB"
          renderTitle="Function"
          isSelected={selectedTab === 1}
        >
          {this.renderPreview(code[1], themeKey, themes)}
        </Tabs.Panel>
      </Tabs>
    )
  }

  render() {
    const { styles } = this.props
    const { fullscreen } = this.state
    return (
      <AppContext.Consumer>
        {({ themeKey, themes }) => (
          <div css={styles?.playground}>
            {fullscreen ? (
              <Modal
                open
                label={`Full screen view`}
                size="fullscreen"
                onDismiss={this.handleMinimize}
              >
                <Modal.Body padding="0">
                  <CloseButton
                    placement="end"
                    offset="medium"
                    onClick={this.handleMinimize}
                    screenReaderLabel="Close"
                  />
                  {this.renderTabPanel(themeKey, themes)}
                </Modal.Body>
              </Modal>
            ) : this.mutliExample() ? (
              this.renderTabPanel(themeKey, themes)
            ) : (
              this.renderPreview(this.state.code as string, themeKey, themes)
            )}

            {this.state.showCode && this.renderEditor()}

            <Flex alignItems="center" padding="xx-small 0 0">
              <Flex.Item shouldShrink shouldGrow>
                <Flex>
                  <Flex.Item>
                    <Tooltip renderTip="Fullscreen" placement="bottom">
                      <IconButton
                        onClick={this.handleMaximize}
                        ref={(c) => {
                          this._fullScreenButton = c
                        }}
                        size="small"
                        withBorder={false}
                        withBackground={false}
                        screenReaderLabel="Full screen view"
                        renderIcon={
                          <SVGIcon viewBox="0 0 24 24">
                            {fullScreenIconPath}
                          </SVGIcon>
                        }
                      />
                    </Tooltip>
                  </Flex.Item>
                  <Flex.Item>
                    <Tooltip
                      renderTip={
                        this.state.showCode ? 'Hide Code' : 'Show Code'
                      }
                      placement="bottom"
                    >
                      <IconButton
                        margin="0 x-small"
                        onClick={this.handleCodeToggle}
                        size="small"
                        withBorder={false}
                        withBackground={false}
                        screenReaderLabel={
                          this.state.showCode ? 'Hide Code' : 'Show Code'
                        }
                        renderIcon={
                          <SVGIcon viewBox="0 0 32 32">{codeIconPath}</SVGIcon>
                        }
                      />
                    </Tooltip>
                  </Flex.Item>
                  {
                    <Flex.Item>
                      <CodeSandboxButton
                        code={
                          this.mutliExample()
                            ? this.state.code[this.state.selectedTab]
                            : (this.state.code as string)
                        }
                        title={`${this.props.title} Example`}
                        language={this.props.language}
                      />
                    </Flex.Item>
                  }
                </Flex>
              </Flex.Item>

              <Flex.Item>{this.renderBidirectionToggle()}</Flex.Item>
            </Flex>
          </div>
        )}
      </AppContext.Consumer>
    )
  }
}

export default Playground
export { Playground }
