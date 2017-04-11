import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import ApplyTheme from 'instructure-ui/lib/components/ApplyTheme'
import { transform } from 'babel-standalone'
import classnames from 'classnames'

import styles from './styles.css'

export default class ComponentExample extends Component {
  static propTypes = {
    code: PropTypes.string,
    variant: PropTypes.string,
    themeKey: PropTypes.string,
    isFullScreen: PropTypes.bool
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
    if (this.props.code !== prevProps.code || this.props.themeKey !== prevProps.themeKey) {
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

  evalCode (code) {
    return eval(code) // eslint-disable-line no-eval
  }

  executeCode (code) {
    const mountNode = this._mountNode

    ReactDOM.unmountComponentAtNode(mountNode)

    this.setState({ error: null })

    if (!code) {
      return
    }

    try {
      const compiledCode = this.compileCode(code)
      const component = this.evalCode(compiledCode)

      ReactDOM.render(
        <ApplyTheme theme={ApplyTheme.generateTheme(this.props.themeKey)}>
          {component}
        </ApplyTheme>,
        mountNode
      )
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
      [styles[this.props.variant]]: this.props.variant,
      [styles.error]: this.state.error,
      [styles.fullscreen]: this.props.isFullScreen
    }

    return (
      <div className={classnames(classes)}>
        <div ref={(el) => { this._mountNode = el }} />
        {this.state.error && <pre className={styles.error}>{this.state.error}</pre>}
      </div>
    )
  }
}
