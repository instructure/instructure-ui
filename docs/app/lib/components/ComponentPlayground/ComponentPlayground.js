import React, { Component, PropTypes } from 'react'
import CodeEditor from '../CodeEditor'
import ComponentPreview from '../ComponentPreview'
import CodePenButton from '../CodePenButton'
import Button from '../Button'
import { ScreenReaderContent } from 'instructure-ui'
import classnames from 'classnames'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import styles from './ComponentPlayground.css'

export default class ComponentPlayground extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired
  };

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

  handleCodeToggle = () => {
    this.setState({
      showCode: !this.state.showCode
    })
  };

  handleFullScreenToggle = () => {
    this.setState({
      isFullScreen: !this.state.isFullScreen
    })
  };

  handleChange = (newCode) => {
    this.setState({
      code: newCode
    })
  };

  handleKeyDown = (e) => {
    if (this.state.isFullScreen && e.keyCode === 27) {
      this.setState({
        isFullScreen: false
      })
    }
  };

  renderFullScreenIcon () {
    if (this.state.isFullScreen) {
      return (
        <svg className={styles.icon}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em" height="1.5em">
          <path fill="none" d="M0 0h24v24H0z" />
          <g fill="currentColor">
            <path d="M2 2h15v4h2V2c0-1.102-.897-2-2-2H2C.897 0 0 .898 0 2v15c0 1.103.897 2 2 2h4v-2H2V2z" />
            <path d="M10 12h6v2h-6z" />
            <path d="M21.207 19.793l-3.322-3.322C18.585 15.49 19 14.295 19
            13c0-3.31-2.69-6-6-6s-6 2.69-6 6 2.69 6 6 6c1.294 0 2.49-.416
            3.47-1.115l3.323 3.32 1.414-1.412zM9 13c0-2.206 1.794-4 4-4s4 1.794 4 4-1.794 4-4 4-4-1.794-4-4z" />
          </g>
        </svg>
      )
    } else {
      return (
        <svg className={styles.icon}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em">
          <path fill="none" d="M0 0h24v24H0z" />
          <g fill="currentColor">
            <path d="M6 19H2c-1.103 0-2-.897-2-2V2C0 .898.897 0 2 0h15c1.103 0 2 .898 2 2v4h-2V2H2v15h4v2z" />
            <path d="M16 14v-2h-2v-2h-2v2h-2v2h2v2h2v-2" />
            <path d="M21.207 19.793l-3.322-3.322C18.585 15.49 19 14.295
            19 13c0-3.31-2.69-6-6-6s-6 2.69-6 6 2.69 6 6 6c1.294 0 2.49-.416
            3.47-1.115l3.323 3.32 1.414-1.412zM9 13c0-2.206 1.794-4 4-4s4 1.794 4 4-1.794 4-4 4-4-1.794-4-4z" />
          </g>
        </svg>
      )
    }
  }

  renderEditor () {
    const { code } = this.state
    return (
      <div>
        <div className={styles.close}>
          <Button
            size="small"
            theme={{linkTextColor: 'white', linkFocusOutlineColor: 'white'}}
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
    const fullScreenButtonText = this.state.isFullScreen ? 'Minimize' : 'Full Screen'
    const classes = {
      [styles.root]: true,
      [styles['is-fullscreen']]:  this.state.isFullScreen
    }

    return (
      <div className={classnames(classes)} onKeyDown={this.handleKeyDown}>

        <ComponentPreview code={code} name={this.props.name} isFullScreen={this.state.isFullScreen} />

        <ReactCSSTransitionGroup
          transitionName={{
            enter: styles['editor--enter'],
            enterActive: styles['editor--enter-active'],
            leave: styles['editor--leave'],
            leaveActive: styles['editor--leave-active']
          }}
          component="div"
          transitionLeave={false}
          transitionEnterTimeout={300}>
          {this.state.showCode && this.renderEditor()}
        </ReactCSSTransitionGroup>

        <div className={styles.actions}>
          <span className={styles.fullscreenButton}>
            <Button onClick={this.handleFullScreenToggle}>
              <ScreenReaderContent>{fullScreenButtonText}</ScreenReaderContent>
              {this.renderFullScreenIcon()}
            </Button>
          </span>

          <Button onClick={this.handleCodeToggle}>
            <ScreenReaderContent>{this.state.showCode ? 'Hide Code' : 'Show Code'}</ScreenReaderContent>

            <svg aria-hidden="true"
              height="1.5em"
              width="1em"
              fill="currentColor"
              className={styles.icon}>
              <path d="M9.5 3l-1.5 1.5 3.5 3.5L8 11.5l1.5 1.5 4.5-5L9.5
              3zM4.5 3L0 8l4.5 5 1.5-1.5L2.5 8l3.5-3.5L4.5 3z" />
            </svg>
          </Button>

          <CodePenButton code={code} title={this.props.name} />
        </div>
      </div>
    )
  }
}
