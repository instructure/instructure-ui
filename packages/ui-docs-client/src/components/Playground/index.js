import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import themeable from '@instructure/ui-themeable'

import Modal, { ModalBody } from '@instructure/ui-core/lib/components/Modal'
import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent'
import SVGIcon from '@instructure/ui-core/lib/components/SVGIcon'
import Tooltip from '@instructure/ui-core/lib/components/Tooltip'

import classnames from 'classnames'
import CodeEditor from '../CodeEditor'
import Preview from '../Preview'
import CodePenButton from '../CodePenButton'
import Button from '../Button'

import { LibraryPropType } from '../App/propTypes'

import styles from './styles.css'
import theme from './theme'

/* eslint-disable max-len */
const closeIconPath = <path d="M1743.858.012L959.869 783.877 176.005.012 0 176.142l783.74 783.989L0 1743.87 176.005 1920l783.864-783.74L1743.858 1920l176.13-176.13-783.865-783.74 783.865-783.988z" stroke="none" strokeWidth="1" fillRule="evenodd" />
const codeIconPath = <path d="M14,6c0-0.984-0.813-2-2-2c-0.531,0-0.994,0.193-1.38,0.58l-9.958,9.958C0.334,14.866,0,15.271,0,16s0.279,1.08,0.646,1.447  l9.974,9.973C11.006,27.807,11.469,28,12,28c1.188,0,2-1.016,2-2c0-0.516-0.186-0.986-0.58-1.38L4.8,16l8.62-8.62  C13.814,6.986,14,6.516,14,6z M31.338,14.538L21.38,4.58C20.994,4.193,20.531,4,20,4c-1.188,0-2,1.016-2,2  c0,0.516,0.186,0.986,0.58,1.38L27.2,16l-8.62,8.62C18.186,25.014,18,25.484,18,26c0,0.984,0.813,2,2,2  c0.531,0,0.994-0.193,1.38-0.58l9.974-9.973C31.721,17.08,32,16.729,32,16S31.666,14.866,31.338,14.538z" />
const fullScreenIconPath = <path d="M12,0v2h8.6L8.3,14.3l1.4,1.4L22,3.4v8.5h2V0H12z M18,22H2V6h10l2-2H0v20h20V10l-2,2V22z" />
/* eslint-enable max-len */

@themeable(theme, styles)
export default class Playground extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    render: PropTypes.bool,
    inverse: PropTypes.bool,
    readOnly: PropTypes.bool
  }

  static defaultProps = {
    render: true,
    inverse: false,
    readOnly: false
  }

  static contextTypes = {
    library: LibraryPropType
  }

  constructor (props) {
    super()
    this.state = {
      code: props.code,
      fullscreen: false,
      showCode: false
    }
  }

  componentWillReceiveProps (nextProps) {
    const { code } = nextProps
    if (code) {
      this.setState({
        code
      })
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.fullscreen === true && this.state.fullscreen === false) {
      ReactDOM.findDOMNode(this._fullScreenButton).focus() // eslint-disable-line react/no-find-dom-node
    }
  }

  handleCodeToggle = () => {
    this.setState({
      showCode: !this.state.showCode
    })
  }

  handleMaximize = () => {
    this.setState({
      fullscreen: true
    })
  }

  handleChange = (newCode) => {
    this.setState({
      code: newCode
    })
  }

  handleMinimize = () => {
    this.setState({
      fullscreen: false
    })
  }

  renderEditor () {
    const { code } = this.state

    return (
      <div className={styles.editor}>
        <div className={styles.close}>
          <Button
            size="small"
            variant="icon-inverse"
            onClick={this.handleCodeToggle}
          >
            <ScreenReaderContent>Hide Code</ScreenReaderContent>
            <SVGIcon viewBox="0 0 2000 2000">
              {closeIconPath}
            </SVGIcon>
          </Button>
        </div>
        <CodeEditor
          label={`${this.props.title} Example Code`}
          code={code}
          variant="playground"
          onChange={this.handleChange}
          readOnly={this.props.readOnly}
        />
      </div>
    )
  }

  render () {
    const { code, fullscreen } = this.state

    const preview = (
      <Preview
        code={code}
        render={this.props.render}
        language={this.props.language}
        inverse={this.props.inverse}
        fullscreen={fullscreen}
      />
    )

    return (
      <div className={styles.root}>
        {
          fullscreen ? (
            <Modal
              open
              label={`Full screen view`}
              closeButtonLabel="Close full screen view"
              size="fullscreen"
              onDismiss={this.handleMinimize}
              applicationElement={() => [
                document.getElementById('app'),
                document.getElementById('flash-messages'),
                document.getElementById('nav')
              ]}
            >
              <ModalBody padding="0">
                {preview}
              </ModalBody>
            </Modal>
          ) : preview
        }

        { this.state.showCode && this.renderEditor() }

        <div className={styles.actions}>
          <Tooltip variant="inverse" tip="Fullscreen" placement="bottom">
            <Button
              onClick={this.handleMaximize}
              ref={(c) => { this._fullScreenButton = c }}
              size="small"
            >
              <SVGIcon viewBox="0 0 24 24" title="Full screen view">
                {fullScreenIconPath}
              </SVGIcon>
            </Button>
          </Tooltip>

          <Tooltip variant="inverse" tip={this.state.showCode ? 'Hide Code' : 'Show Code'} placement="bottom">
            <Button margin="0 small" onClick={this.handleCodeToggle} size="small">
              <SVGIcon viewBox="0 0 32 32" title="Code">
                {codeIconPath}
              </SVGIcon>
            </Button>
          </Tooltip>

          { this.context.library.codepen && <CodePenButton
            code={code}
            title={`${this.props.title} Example`}
            language={this.props.language}
            render={this.props.render}
            options={this.context.library.codepen}
          /> }
        </div>
      </div>
    )
  }
}
