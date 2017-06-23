import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '../../../themeable'
import requestAnimationFrame from '../../../util/dom/requestAnimationFrame'
import classnames from 'classnames'

import Transition from '../../Transition'
import IconStarSolid from 'instructure-icons/lib/Solid/IconStarSolid'
import IconStarLightSolid from 'instructure-icons/lib/Solid/IconStarLightSolid'

import styles from './styles.css'
import theme from './theme.js'

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

    const Icon = this.state.filled ? IconStarSolid : IconStarLightSolid

    return (
      <span className={classnames(classes)}>
        <span>
          {
            (this.state.filled && animateFill) ? (
              <Transition in
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
