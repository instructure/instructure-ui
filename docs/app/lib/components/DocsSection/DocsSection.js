import React, { Component, PropTypes } from 'react'

import styles from './DocsSection.css'

export default class DocsSection extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node
  }

  render () {
    return (
      <div className={styles.root} id={this.props.id}>
        {this.props.children}
      </div>
    )
  }
}
