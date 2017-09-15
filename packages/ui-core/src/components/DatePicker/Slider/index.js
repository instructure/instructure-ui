import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IconArrowOpenLeftSolid from 'instructure-icons/lib/Solid/IconArrowOpenLeftSolid'
import IconArrowOpenRightSolid from 'instructure-icons/lib/Solid/IconArrowOpenRightSolid'
import themeable from '@instructure/ui-themeable'

import AccessibleContent from '../../AccessibleContent'
import Button from '../../Button'

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

  handlePrevClick = (e) => {
    this.props.onPrev(e)
  }

  handleNextClick = (e) => {
    this.props.onNext(e)
  }

  render () {
    return (
      <div className={styles.root}>
        <Button
          variant="icon"
          onClick={this.handlePrevClick}
        >
          <IconArrowOpenLeftSolid
            className={styles.arrowIcon}
            title={this.props.previousLabel}
          />
        </Button>
        {this.props.children}
        <Button
          variant="icon"
          onClick={this.handleNextClick}
        >
          <IconArrowOpenRightSolid
            className={styles.arrowIcon}
            title={this.props.nextLabel}
          />
        </Button>
      </div>
    )
  }
}
