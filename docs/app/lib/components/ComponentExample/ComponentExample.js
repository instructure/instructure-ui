import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import { transform } from 'babel-standalone'
import { windowMessageListener } from 'instructure-ui'
import debounce from 'lodash/debounce'
import defer from 'lodash/defer'

import styles from './ComponentExample.css'

import '../../util/load-globals'

const messageHandler = function (message) {
  if (message && typeof message.code === 'string') {
    this.executeCode(message.code, message.variant)
  }
}

@windowMessageListener(messageHandler)
export default class ComponentExample extends Component {
  static propTypes = {
    code: PropTypes.string,
    children: PropTypes.node,
    variant: PropTypes.string
  }

  constructor (props) {
    super(props)
    this.state = {
      error: null,
      variant: props.variant
    }
  }

  componentDidMount () {
    if (this.props.code) {
      this.executeCode(this.props.code)
    }
    if (window.parent) {
      windowMessageListener.postMessage(window.parent, {
        isMounted: true
      })
      this._handleResize = debounce(this.notifyParent, 200)
      window.addEventListener('resize', this._handleResize)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.variant !== this.props.variant) {
      this.setState({
        variant: nextProps.variant
      })
    }
  }

  componentWillUnmount () {
    if (this._handleResize) {
      window.removeEventListener('resize', this._handleResize)
    }
  }

  notifyParent = () => {
    if (window.parent) {
      // need to use scrollHeight of body element to handle components that render into portals
      const owner = document.body
      window.setTimeout(function () {
        windowMessageListener.postMessage(window.parent, {
          contentHeight: owner.scrollHeight
        })
      }, 0)
    }
  }

  compileCode (code) {
    return transform(code, {
      presets: ['es2015', 'stage-1', 'react']
    }).code
  }

  evalCode (code) {
    /* eslint-disable no-eval */
    return eval(code)
    /* eslint-enable no-eval */
  }

  executeCode (code, variant) {
    const mountNode = this.refs.mount

    ReactDOM.unmountComponentAtNode(mountNode)

    this.setState({
      error: null,
      variant
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
        <div className={styles.errorBg} />
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
    const variant = this.state.variant ? this.state.variant : ''
    document.body.setAttribute('data-variant', variant)
    return (
      <div className={styles.root}>
        {this.renderErrorBg()}
        {this.renderExample()}
        {this.renderError()}
      </div>
    )
  }
}
