import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import CodeEditor from '../CodeEditor'
import ComponentPreview from '../ComponentPreview'
import CodePenButton from '../CodePenButton'
import Button from '../Button'
import { ScreenReaderContent, Transition } from 'instructure-ui'
import classnames from 'classnames'

import styles from './ComponentPlayground.css'

export default class ComponentPlayground extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    themeKey: PropTypes.string,
    variant: PropTypes.string,
    language: PropTypes.string
  }

  constructor (props) {
    super()
    this.state = {
      code: props.code,
      isFullScreen: false,
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
    if (prevState.isFullScreen === true && this.state.isFullScreen === false) {
      ReactDOM.findDOMNode(this.refs.fullScreenButton).focus()
    }
  }

  handleCodeToggle = () => {
    this.setState({
      showCode: !this.state.showCode
    })
  }

  handleMaximize = () => {
    this.setState({
      isFullScreen: true
    })
  }

  handleChange = (newCode) => {
    this.setState({
      code: newCode
    })
  }

  handleMinimize = () => {
    this.setState({
      isFullScreen: false
    })
  }

  renderEditor () {
    const { code } = this.state

    return (
      <div>
        <div className={styles.close}>
          <Button
            size="small"
            variant="icon-inverse"
            onClick={this.handleCodeToggle}>
            <ScreenReaderContent>Hide Code</ScreenReaderContent>
            <svg
              aria-hidden="true"
              height="1em"
              width="1em"
              viewBox="0 0 24 24"
              className={styles.icon}>
              <path fill="none" d="M0 0h24v24H0z" />
              <path fill="currentColor" d="M21.414 5.414l-2.828-2.828L12 9.172 5.414 2.586 2.586
               5.414 9.172 12l-6.586 6.586 2.828 2.828L12 14.828l6.586 6.586 2.828-2.828L14.828 12" />
            </svg>
          </Button>
        </div>
        <CodeEditor code={code} style="playground" onChange={this.handleChange} />
      </div>
    )
  }

  render () {
    const { code } = this.state
    const classes = {
      [styles.root]: true
    }

    return (
      <div className={classnames(classes)}>

        <ComponentPreview
          code={code}
          variant={this.props.variant}
          themeKey={this.props.themeKey}
          onMinimize={this.handleMinimize}
          name={this.props.name}
          isFullScreen={this.state.isFullScreen} />

        <Transition in={this.state.showCode} transitionOnMount type="slide-up">
          {this.state.showCode ? this.renderEditor() : null}
        </Transition>

        <div className={styles.actions}>
          <Button onClick={this.handleMaximize} ref="fullScreenButton">
            <ScreenReaderContent>Full Screen</ScreenReaderContent>
            <svg
              className={styles.icon}
              aria-hidden="true"
              width="1em"
              height="1em">
              <path fill="none" d="M0 0h24v24H0z" />
              <g fill="currentColor">
                <path d="M6 19H2c-1.103 0-2-.897-2-2V2C0 .898.897 0 2 0h15c1.103 0 2 .898 2 2v4h-2V2H2v15h4v2z" />
                <path d="M16 14v-2h-2v-2h-2v2h-2v2h2v2h2v-2" />
                <path d="M21.207 19.793l-3.322-3.322C18.585 15.49 19 14.295
                19 13c0-3.31-2.69-6-6-6s-6 2.69-6 6 2.69 6 6 6c1.294 0 2.49-.416
                3.47-1.115l3.323 3.32 1.414-1.412zM9 13c0-2.206 1.794-4 4-4s4 1.794 4 4-1.794 4-4 4-4-1.794-4-4z" />
              </g>
            </svg>
          </Button>

          <Button onClick={this.handleCodeToggle}>
            <ScreenReaderContent>{this.state.showCode ? 'Hide Code' : 'Show Code'}</ScreenReaderContent>

            <svg aria-hidden="true"
              height="0.7em"
              width="0.6em"
              fill="currentColor"
              className={styles.icon}>
              <path d="M9.5 3l-1.5 1.5 3.5 3.5L8 11.5l1.5 1.5 4.5-5L9.5
              3zM4.5 3L0 8l4.5 5 1.5-1.5L2.5 8l3.5-3.5L4.5 3z" />
            </svg>
          </Button>

          <CodePenButton code={code} title={this.props.name} language={this.props.language} />
        </div>
      </div>
    )
  }
}
