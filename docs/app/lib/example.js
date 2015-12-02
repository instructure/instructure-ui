import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import babel from 'babel-core/browser'
import InstructureUI from 'instructure-ui'

import MessageListener from './components/MessageListener'

import styles from './example.css'

const components = Object.keys(InstructureUI).sort()

/* These need to be globals to render examples */
global.React = React

components.forEach((component) => {
  global[component] = InstructureUI[component]
})

class ExampleApp extends Component {
  constructor () {
    super()
    this.state = {
      error: null
    }
  }

  componentDidMount () {
    MessageListener.postMessage(window.parent, { isMounted: true })
  }

  handleMessage = (message) => {
    if (message && typeof message.code === 'string') {
      this.executeCode(message.code)
    }
  }

  compileCode (code) {
    return babel.transform(code, {stage: 0}).code
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

      ReactDOM.render(component, mountNode)
    } catch (err) {
      ReactDOM.unmountComponentAtNode(mountNode)
      this.setState({
        error: err.toString()
      })
    }
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
      <MessageListener onReceiveMessage={this.handleMessage}>
        <div ref="mount"></div>
        { this.renderError() }
      </MessageListener>
    )
  }
}

ReactDOM.render(<ExampleApp />, document.getElementById('app'))
