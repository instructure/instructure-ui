import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AccessibleContent from '../../AccessibleContent'
import themeable from '../../../themeable'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class Slider extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    previousLabel: PropTypes.string.isRequired,
    nextLabel: PropTypes.string.isRequired,
    onPrev: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    children: PropTypes.node
  }
  /* eslint-enable react/require-default-props */

  handlePrevClick = () => {
    this.props.onPrev()
  }

  handleNextClick = () => {
    this.props.onNext()
  }

  render () {
    return (
      <div className={styles.root}>
        <button
          className={styles.prev}
          onClick={this.handlePrevClick}
        >
          <AccessibleContent alt={this.props.previousLabel}>
            &lsaquo;
          </AccessibleContent>
        </button>
        {this.props.children}
        <button
          className={styles.next}
          onClick={this.handleNextClick}
        >
          <AccessibleContent alt={this.props.nextLabel}>
            &rsaquo;
          </AccessibleContent>
        </button>
      </div>
    )
  }
}
