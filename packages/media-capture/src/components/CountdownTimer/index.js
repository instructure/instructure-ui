import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as CaptureActions from '../../actions'

export default class CountdownTimer extends Component {
  static propTypes = {
    countdownFrom: PropTypes.number,
    actions: PropTypes.shape({
      countdownComplete: PropTypes.func
    })
  }

  static defaultProps = {
    countdownFrom: 3,
    actions: {
      countdownComplete: () => {}
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      currentValue: props.countdownFrom
    }

    this.startCountdown = this.startCountdown.bind(this)
    this.clearCountdown = this.clearCountdown.bind(this)
  }

  componentDidMount () {
    this.startCountdown()
  }

  componentWillUnmount () {
    this.clearCountdown()
  }

  startCountdown () {
    this.timer = setInterval(() => {
      this.setState({
        currentValue: this.state.currentValue - 1
      }, () => {
        if (this.state.currentValue === 0) {
          this.clearCountdown()
          this.props.actions.countdownComplete()
        }
      })
    }, 1000)
  }

  clearCountdown () {
    if (this.timer) clearInterval(this.timer)
  }

  render () {
    // TODO: add SR announcements, needs i18n
    return <span>{ this.state.currentValue }</span>
  }
}
