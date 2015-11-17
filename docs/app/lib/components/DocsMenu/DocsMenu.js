import React, {Component, PropTypes} from 'react'

import styles from './DocsMenu.css'

export default class DocsMenu extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render () {
    return (
      <div className={styles.root}>
        {this.props.children}
      </div>
    )
  }
}
