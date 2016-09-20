import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import { transform } from 'babel-standalone'
import { windowMessageListener } from 'instructure-ui'
import defer from 'lodash/defer'
import { override, after } from '../../util/monkey-patch'

import styles from './ComponentExample.css'

import '../../util/load-globals'

const _createElement = React.createElement

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

    const overrideComponentInstance = (instance) => {
      override(instance, 'componentDidMount', after(this.handleComponentChange))
      override(instance, 'componentDidUpdate', after(this.handleComponentChange))
    }

    React.createElement = function () {
      const el = _createElement.apply(this, arguments)

      if (el._owner && el._owner._instance) {
        overrideComponentInstance(el._owner._instance)
      }

      return el
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
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.variant !== this.props.variant) {
      this.setState({
        variant: nextProps.variant
      })
    }
  }

  handleComponentChange = () => {
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

      ReactDOM.render(component, mountNode)
    } catch (err) {
      this.handleError(err)
    }
  }

  handleError (err) {
    ReactDOM.unmountComponentAtNode(this.refs.mount)
    this.setState({
      error: err.toString()
    })
    defer(this.handleComponentChange)
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
