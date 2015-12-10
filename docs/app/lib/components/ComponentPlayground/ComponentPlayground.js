import React, { Component, PropTypes } from 'react'
import CodeEditor from '../CodeEditor'
import ComponentPreview from '../ComponentPreview'

import styles from './ComponentPlayground.css'

export default class ComponentPlayground extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired
  }

  constructor (props) {
    super()
    this.state = {
      code: props.code,
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

  handleToggle = () => {
    this.setState({
      showCode: !this.state.showCode
    })
  }

  handleChange = (newCode) => {
    this.setState({
      code: newCode
    })
  }

  render () {
    const { code } = this.state
    const editor = <CodeEditor code={code} onChange={this.handleChange} />

    return (
      <div className={styles.root}>
        <ComponentPreview code={code} />
        {this.state.showCode && editor}
        <button onClick={this.handleToggle} className={styles.button}>
          {this.state.showCode ? 'hide editor' : 'show editor'}
        </button>
      </div>
    )
  }
}
