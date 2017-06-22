import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

export default class DocsSection extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    id: PropTypes.string.isRequired,
    heading: PropTypes.string,
    children: PropTypes.node
  };
  /* eslint-enable react/require-default-props */

  render () {
    const heading = this.props.heading && (
      <h2 className={styles.heading}>{this.props.heading}</h2>
    )
    return (
      <div className={styles.root} id={this.props.id}>
        {heading}
        {this.props.children}
      </div>
    )
  }
}
