import React, { Component } from 'react'
import PropTypes from 'prop-types'

import themeable from '@instructure/ui-themeable'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class HtmlDoc extends Component {
  static propTypes = {
    html: PropTypes.string.isRequired
  }

  render () {
    /* eslint-disable react/no-danger */
    return (
      <div className={styles.root} dangerouslySetInnerHTML={{__html: this.props.html}} />
    )
    /* eslint-enable react/no-danger */
  }
}
