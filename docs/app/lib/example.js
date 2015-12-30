import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { transform } from 'babel-standalone'
import MessageListener from './components/MessageListener'
import debounce from 'lodash/function/debounce'
import defer from 'lodash/function/defer'

import styles from './example.css'

import docs from './util/load-docs'

docs.globalize()

class ExampleApp extends Component {
  constructor () {
    super()
    this.state = {
      error: null
    }
  }

  componentDidMount () {
    MessageListener.postMessage(window.parent, {
      isMounted: true
    })
    this._handleResize = debounce(this.notifyParent, 200)
    window.addEventListener('resize', this._handleResize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._handleResize)
  }

  handleMessage = (message) => {
    if (message && typeof message.code === 'string') {
      this.executeCode(message.code)
    }
  };

  compileCode (code) {
    // TODO: load babel presets and plugins from config
    return transform(code, { presets: ['es2015', 'stage-1', 'react'] }).code
  }

  evalCode (code) {
    /* eslint-disable no-eval */
    return eval(code)
    /* eslint-disable no-eval */
  }

  notifyParent = () => {
    const node = ReactDOM.findDOMNode(this)
    window.setTimeout(function () {
      MessageListener.postMessage(window.parent, {
        contentHeight: node.offsetHeight
      })
    }, 0)
  };

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

      ReactDOM.render(component, mountNode)
    } catch (err) {
      ReactDOM.unmountComponentAtNode(mountNode)
      this.setState({
        error: err.toString()
      })
    }

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

  render () {
    return (
      <MessageListener onReceiveMessage={this.handleMessage} className={styles.root}>
        <div ref="mount"></div>
        { this.renderError() }
      </MessageListener>
    )
  }
}

ReactDOM.render(<ExampleApp />, document.getElementById('app'))
