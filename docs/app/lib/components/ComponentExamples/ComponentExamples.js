import React, {Component, PropTypes} from 'react'

import styles from './ComponentExamples.css'

export default class ComponentExamples extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  }

  constructor (props) {
    super()
    this.state = {
      showExamples: false
    }
  }

  handleToggle = () => {
    this.setState({
      showExamples: !this.state.showExamples
    })
  }

  render () {
    const example = (
      <div>
        <code className={styles.path}>{this.props.path}</code>
        <a href={this.props.name} target="_blank" className={styles.link}>
          View in a new window/tab
        </a>
        <iframe className={styles.example} src={this.props.name}></iframe>
      </div>
    )

    return (
      <div className={styles.root}>
        {this.state.showExamples && example}
        <button onClick={this.handleToggle}>
          {this.state.showExamples ? 'hide examples' : 'show examples'}
        </button>
      </div>
    )
  }
}
