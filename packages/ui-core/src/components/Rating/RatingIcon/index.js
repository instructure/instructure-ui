import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconStar from '@instructure/ui-icons/lib/Solid/IconStar'
import IconStarLight from '@instructure/ui-icons/lib/Solid/IconStarLight'
import classnames from 'classnames'

import themeable from '@instructure/ui-themeable'
import requestAnimationFrame from '@instructure/ui-utils/lib/dom/requestAnimationFrame'

import Transition from '../../Transition'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Rating
---
**/
@themeable(theme, styles)
export default class RatingIcon extends Component {
  static propTypes = {
    animationDelay: PropTypes.number,
    animateFill: PropTypes.bool,
    filled: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  }

  static defaultProps = {
    animationDelay: 200,
    animateFill: false,
    filled: false,
    size: 'medium'
  }

  constructor (props) {
    super()

    this.state = {
      filled: props.filled && !props.animateFill
    }
  }

  _timeouts = []

  componentDidMount () {
    if (this.props.animateFill) {
      this._timeouts.push(setTimeout(this.fill, this.props.animationDelay))
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.animateFill && this.props.filled && (this.props.filled !== prevProps.filled)) {
      this.fill()
    }
  }

  componentWillUnmount () {
    this._animation && this._animation.cancel()
    this._timeouts.forEach((timeout) => clearTimeout(timeout))
  }

  fill = () => {
    this._animation = requestAnimationFrame(() => {
      this.setState({
        filled: true
      })
    })
  }

  handleTransitionEnter = () => {
    this.applyTheme()
  }

  render () {
    const {
      size,
      animateFill
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[size]]: true,
      [styles.filled]: this.state.filled,
      [styles.empty]: !this.state.filled
    }

    const Icon = this.state.filled ? IconStar : IconStarLight

    return (
      <span className={classnames(classes)}>
        <span>
          {
            (this.state.filled && animateFill) ? (
              <Transition
                in
                transitionOnMount
                type="scale"
                onEnter={this.handleTransitionEnter}
              >
                <Icon className={styles.icon} />
              </Transition>
            ) : <Icon className={styles.icon} />
          }
        </span>
      </span>
    )
  }
}
