// Based on https://github.com/joelburget/react-live-editor/blob/master/live-compile.jsx
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import babel from 'babel-core/browser'

import styles from './ComponentPreview.css'

export default class ComponentPreview extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired
  }

  constructor () {
    super()
    this.state = {
      error: null
    }
  }

  componentDidMount () {
    this.executeCode()
  }

  componentDidUpdate (prevProps) {
    if (this.props.code !== prevProps.code) {
      this.executeCode()
    }
  }

  compileCode (code) {
    return babel.transform(code, {stage: 0}).code
  }

  executeCode () {
    const mountNode = this.refs.mount

    ReactDOM.unmountComponentAtNode(mountNode)

    this.setState({
      error: null
    })

    const { code } = this.props
    if (!code) {
      return
    }

    try {
      const compiledCode = this.compileCode(code)

      /* eslint-disable no-eval */
      const component = eval(compiledCode)
      /* eslint-disable no-eval */

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
      <div className={styles.root}>
        <div ref="mount"></div>
        { this.renderError() }
      </div>
    )
  }
}
