/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import themeable from '@instructure/ui-themeable'

import styles from './styles.css'
import theme from './theme'

function formatTime (time) {
  if (time && typeof time === 'number' && time < Infinity) {
    return new Date(1000 * time).toISOString().substr(14, 5)
  }

  return '00:00'
}

/**
---
private: true
---
**/
@themeable(theme, styles)
class Timebar extends Component {
  static propTypes = {
    /**
     * Id of the video element. Used to ensure
     * correct aria properties are applied.
     */
    videoId: PropTypes.string.isRequired,
    /**
     * Number of seconds that have been buffered.
     */
    buffered: PropTypes.number,
    /**
     * The current playback time in seconds.
     */
    currentTime: PropTypes.number,
    /**
     * The length of the video in seconds.
     */
    duration: PropTypes.number,
    /**
     * Function invoked when timebar is clicked.
     * Invoked with time (in seconds) at the coordinates clicked.
     */
    onClick: PropTypes.func,
    forwardRef: PropTypes.func
  }

  static defaultProps = {
    duration: 0,
    buffered: 0,
    currentTime: 0,
    onClick: (time) => {},
    forwardRef: (ref) => { }
  }

  constructor (props) {
    super(props)

    this.state = {
      timebarHoverTime: null,
      timebarTooltipPosition: null
    }
  }

  handleTimebarScrub = (e) => {
    const relativeCoordinate = e.pageX - e.currentTarget.getBoundingClientRect().left
    const position = relativeCoordinate / e.currentTarget.offsetWidth
    const timestamp = position * this.props.duration


    if (timestamp < 0 || timestamp > this.props.duration) {
      // Since the tooltip is techincally inside of the container, we have to
      // manually dismiss the tooltip if the user moves the pointer outside of
      // the container.
      this.handleTimebarLeave()
    } else {
      const tooltipCenterOffset = this.tooltip.offsetWidth / 2
      this.setState({
        hoverTime: timestamp,
        tooltipPosition: Math.min(relativeCoordinate, e.currentTarget.offsetWidth) - tooltipCenterOffset
      })
    }
  }

  handleTimebarLeave = () => {
    this.setState({ hoverTime: null, tooltipPosition: null })
  }

  handleTimebarClick = () => {
    if (this.state.hoverTime) {
      this.props.onClick(this.state.hoverTime)
    }
  }

  render () {
    const { duration, buffered, currentTime, videoId, forwardRef } = this.props

    const viewedPercent = (currentTime / duration) * 100 || 0
    const bufferedPercent = ((buffered / duration) * 100) - viewedPercent || 0
    const currentTimeText = formatTime(currentTime)

    const timebarProps = {
      className: styles.container,
      onMouseMove: this.handleTimebarScrub,
      onMouseLeave: this.handleTimebarLeave,
      onClick: this.handleTimebarClick,
      ref: forwardRef,
      tabIndex: '0',
      role: 'slider',
      'aria-valuemin': 0,
      'aria-valuemax': duration,
      'aria-valuenow': currentTime,
      'aria-valuetext': currentTimeText,
      'aria-controls': videoId
    }

    const tooltipClasses = {
      [styles.tooltipContainer]: true,
      [styles.hidden]: !this.state.hoverTime
    }

    return (
      <div {...timebarProps}>
        <div className={styles.timebarContent}>
          <time>{currentTimeText}</time>
          <time>{formatTime(duration)}</time>
        </div>
        <div className={styles.viewed} style={{ flexBasis: `${viewedPercent}%` }} />
        <div className={styles.buffered} style={{ flexBasis: `${bufferedPercent}%` }} />
        <div className={styles.rest} />
        <div
          className={classnames(tooltipClasses)}
          style={{ left: `${this.state.tooltipPosition}px` }}
          ref={e => { this.tooltip = e }}
          tabIndex="-1"
        >
          <div className={styles.tooltipContent}>
            <div className={styles.tooltip}>
              {formatTime(this.state.hoverTime)}
            </div>
            <div className={styles.tooltipCaret} />
          </div>
        </div>
      </div>
    )
  }
}

export default Timebar
