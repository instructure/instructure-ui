import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import themeable from '@instructure/ui-themeable'
import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent'
import PresentationContent from '@instructure/ui-core/lib/components/PresentationContent'

import styles from './styles.css'
import theme from './theme'

function formatTime (time) {
  return new Date(1000 * (time || 0)).toISOString().substr(14, 5)
}

@themeable(theme, styles)
export default class Timebar extends Component {
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
    onClick: PropTypes.func
  }

  static defaultProps = {
    duration: 0,
    buffered: 0,
    currentTime: 0,
    onClick: (time) => {}
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
    const { duration, buffered, currentTime, videoId } = this.props

    const viewedPercent = (currentTime / duration) * 100 || 0
    const bufferedPercent = ((buffered / duration) * 100) - viewedPercent || 0
    const currentTimeText = formatTime(currentTime)

    const timebarProps = {
      className: styles.container,
      onMouseMove: this.handleTimebarScrub,
      onMouseLeave: this.handleTimebarLeave,
      onClick: this.handleTimebarClick,
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
