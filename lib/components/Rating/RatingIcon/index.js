import React, { Component, PropTypes } from 'react'
import themeable from '../../../util/themeable'
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

  componentDidMount () {
    if (this.props.animateFill) {
      this._animationTimeout = window.setTimeout(this.animateFill, this.props.animationDelay)
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.animateFill && this.props.filled && (this.props.filled !== prevProps.filled)) {
      this.animateFill()
    }
  }

  animateFill = () => {
    this._animation = window.requestAnimationFrame(() => {
      this.setState({
        filled: true
      })
    })
  }

  componentWillUnmount () {
    window.cancelAnimationFrame(this._animation)
    window.clearTimeout(this._animationTimeout)
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
        {
          (this.state.filled && animateFill) ? (
            <Transition in transitionOnMount type="scale">
              <Icon className={styles.icon} />
            </Transition>
          ) : <Icon className={styles.icon} />
        }
      </span>
    )
  }
}
