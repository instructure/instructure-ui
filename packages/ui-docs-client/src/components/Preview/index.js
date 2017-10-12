import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

import { transform } from 'babel-standalone'

import ApplyTheme from '@instructure/ui-core/lib/components/ApplyTheme'
import themeable from '@instructure/ui-themeable'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class Preview extends Component {

  static propTypes = {
    code: PropTypes.string.isRequired,
    render: PropTypes.bool,
    language: PropTypes.string.isRequired,
    fullscreen: PropTypes.bool,
    inverse: PropTypes.bool
  }

  static defaultProps = {
    render: true,
    fullscreen: false,
    inverse: false
  }

  static contextTypes = {
    themes: PropTypes.object,
    themeKey: PropTypes.string
  }

  constructor (props) {
    super(props)

    this.state = {
      error: null
    }
  }

  componentDidMount () {
    if (this.props.code) {
      this.executeCode(this.props.code)
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.code !== prevProps.code) {
      this.executeCode(this.props.code)
    }
  }

  componentWillUnmount () {
    if (this._mountNode) {
      ReactDOM.unmountComponentAtNode(this._mountNode)
    }
  }

  compileCode (code) {
    return transform(code, {
      presets: ['es2015', 'stage-1', 'react']
    }).code
  }

  executeCode (code) {
    const mountNode = this._mountNode

    ReactDOM.unmountComponentAtNode(mountNode)

    this.setState({ error: null })

    if (!code) {
      return
    }

    const render = (el) => {
      const { themeKey, themes } = this.context
      let elToRender = el

      if (themeKey && themes[themeKey]) {
        elToRender = (
          <ApplyTheme
            theme={ApplyTheme.generateTheme(themeKey)}
            immutable={themes[themeKey].accessible}
          >
            {elToRender}
          </ApplyTheme>
        )
      }

      ReactDOM.render(elToRender, mountNode)
    }

    try {
      const compiledCode = this.compileCode(code)
      const el = eval(compiledCode) // eslint-disable-line no-eval

      if (this.props.render !== false) {
        render(el)
      }
    } catch (err) {
      this.handleError(err)
    }
  }

  handleError (err) {
    ReactDOM.unmountComponentAtNode(this._mountNode)
    this.setState({
      error: err.toString()
    })
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles.inverse]: this.props.inverse,
      [styles.error]: this.state.error,
      [styles.fullscreen]: this.props.fullscreen
    }

    return (
      <div className={classnames(classes)}>
        <div ref={(el) => { this._mountNode = el }} />
        {this.state.error && <pre className={styles.error}>{this.state.error}</pre>}
      </div>
    )
  }
}
