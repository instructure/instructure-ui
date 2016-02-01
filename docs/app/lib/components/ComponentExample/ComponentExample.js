import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import { transform } from 'babel-standalone'
import WindowMessageListener from '../WindowMessageListener'
import debounce from 'lodash/function/debounce'
import defer from 'lodash/function/defer'
import window from 'global/window'

import styles from './ComponentExample.css'

import docs from '../../util/load-docs'

export default class ComponentExample extends Component {
  static propTypes = {
    code: PropTypes.string,
    children: PropTypes.node
  };

  constructor () {
    super()
    this.state = {
      error: null
    }
  }

  componentDidMount () {
    docs.globalize()

    if (this.props.code) {
      this.executeCode(this.props.code)
    }
    if (window.parent) {
      WindowMessageListener.postMessage(window.parent, {
        isMounted: true
      })
      this._handleResize = debounce(this.notifyParent, 200)
      window.addEventListener('resize', this._handleResize)
    }
  }

  componentWillUnmount () {
    if (this._handleResize) {
      window.removeEventListener('resize', this._handleResize)
    }
  }

  handleMessage = (message) => {
    if (message && typeof message.code === 'string') {
      this.executeCode(message.code)
    }
  };

  notifyParent = () => {
    if (window.parent) {
      const node = ReactDOM.findDOMNode(this)
      window.setTimeout(function () {
        WindowMessageListener.postMessage(window.parent, {
          contentHeight: node.offsetHeight
        })
      }, 0)
    }
  };

  compileCode (code) {
    return transform(code, require('json!babel-config')).code
  }

  evalCode (code) {
    /* eslint-disable no-eval */
    return eval(code)
    /* eslint-disable no-eval */
  }

  executeCode (code) {
    const mountNode = this.refs.mount

    ReactDOM.unmountComponentAtNode(mountNode)

    this.setState({
      error: null
    })

    if (!code) {
      return
    }

    try {
      const compiledCode = this.compileCode(code)
      const component = this.evalCode(compiledCode)

      ReactDOM.render(component, mountNode, () => {
        defer(this.notifyParent)
      })
    } catch (err) {
      this.handleError(err)
    }
  }

  handleError (err) {
    ReactDOM.unmountComponentAtNode(this.refs.mount)
    this.setState({
      error: err.toString()
    })
    defer(this.notifyParent)
  }

  renderError () {
    const { error } = this.state
    if (error) {
      return (
        <pre className={styles.error}>{error}</pre>
      )
    } else {
      return null
    }
  }

  renderErrorBg () {
    const { error } = this.state
    if (error) {
      return (
        <div className={styles.errorBg}></div>
      )
    } else {
      return null
    }
  }

  renderExample () {
    return (
      <div ref="mount" className={styles.example}>
        {this.props.children}
      </div>
    )
  }

  render () {
    return (
      <WindowMessageListener onReceiveMessage={this.handleMessage} className={styles.root}>
        { this.renderErrorBg() }
        { this.renderExample() }
        { this.renderError() }
      </WindowMessageListener>
    )
  }
}
