import React, { Component, PropTypes } from 'react'

import styles from './GuideDoc.css'

export default class GuideDoc extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    html: PropTypes.string.isRequired
  }

  render () {
    return (
      <div className={styles.root} id={this.props.id}>
        <div dangerouslySetInnerHTML={{__html: this.props.html}} />
      </div>
    )
  }
}
