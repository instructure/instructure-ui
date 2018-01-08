import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import themeable from '@instructure/ui-themeable'
import debounce from '@instructure/ui-utils/lib/debounce'

import PlayPauseButton from '../PlayPauseButton'
import Timebar from '../Timebar'

import styles from './styles.css'

import * as VideoStates from '../../videoStates'

@themeable({}, styles)
export default class VideoPlayerControls extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      seek: PropTypes.func.isRequired,
      togglePlay: PropTypes.func.isRequired
    }).isRequired,
    /**
     * Id of the video element. Used to ensure
     * correct aria properties are applied.
     */
    videoId: PropTypes.string.isRequired,
    state: PropTypes.oneOf(Object.values(VideoStates)).isRequired,
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
    showControls: PropTypes.bool
  }

  static defaultProps = {
    showControls: false,
    duration: 0,
    buffered: 0,
    currentTime: 0
  }

  preventBubbling (e) {
    e.stopPropagation()
  }

  handleTimebarClick = (time) => {
    this.props.actions.seek(time)
  }

  render () {
    const {
      state,
      duration,
      buffered,
      currentTime,
      showControls,
      actions,
      videoId
    } = this.props

    const classes = {
      [styles.container]: true,
      [styles.hidden]: !showControls
    }

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div className={classnames(classes)} onClick={this.preventBubbling}>
        <PlayPauseButton variant={state} onClick={actions.togglePlay} videoId={videoId} />
        <Timebar
          duration={duration}
          currentTime={currentTime}
          buffered={buffered}
          videoId={videoId}
          onClick={this.handleTimebarClick}
        />
      </div>
    )
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}
