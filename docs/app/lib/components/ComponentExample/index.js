import React, {Component, PropTypes} from 'react'
import { ApplyTheme, generateTheme } from 'instructure-ui'
import { transform } from 'babel-standalone'

import styles from './ComponentExample.css'

export default class ComponentExample extends Component {
  static propTypes = {
    code: PropTypes.string,
    variant: PropTypes.string,
    brand: PropTypes.string
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

    if (this.props.variant) {
      this.setVariantAttribute()
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.code !== prevProps.code) {
      this.executeCode(this.props.code)
    }

    if (this.props.variant !== prevProps.variant) {
      this.setVariantAttribute()
    }
  }

  setVariantAttribute () {
    document.body.setAttribute('data-variant', this.props.variant)
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
    if (!code) {
      return
    }

    try {
      const compiledCode = this.compileCode(code)
      const example = this.evalCode(compiledCode)

      this.setState({
        error: null,
        variant,
        example
      })
    } catch (err) {
      this.handleError(err)
    }
  }

  handleError (err) {
    this.setState({
      error: err.toString(),
      example: null
    })
  }

  render () {
    const { error, example } = this.state

    return (
      <div className={styles.root}>
        {example && <ApplyTheme defaultTheme={generateTheme(this.props.brand)}>{example}</ApplyTheme>}
        {error && <div className={styles.errorBg} />}
        {error && <pre className={styles.error}>{error}</pre>}
      </div>
    )
  }
}
