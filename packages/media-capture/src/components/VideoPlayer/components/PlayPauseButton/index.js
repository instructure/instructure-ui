import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '@instructure/ui-themeable'

import IconPlaySolid from 'instructure-icons/lib/Solid/IconPlaySolid'
import IconPauseSolid from 'instructure-icons/lib/Solid/IconPauseSolid'
import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent'
import * as VideoStates from '../../videoStates'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class PlayPauseButton extends Component {
  static propTypes = {
    /**
     * Id of the video element. Used to ensure
     * correct aria properties are applied.
     */
    videoId: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(Object.values(VideoStates)),
    onClick: PropTypes.func
  }

  static defaultProps = {
    variant: VideoStates.PAUSED,
    onClick: (e) => {}
  }

  config (variant) {
    const VARIANTS = {
      [VideoStates.PAUSED]: {
        // TODO: needs i18n
        label: 'Play',
        Icon: IconPlaySolid
      },
      [VideoStates.ENDED]: {
        // TODO: needs i18n
        label: 'Play',
        Icon: IconPlaySolid
      },
      [VideoStates.PLAYING]: {
        // TODO: needs i18n
        label: 'Pause',
        Icon: IconPauseSolid
      }
    }

    return VARIANTS[variant]
  }

  render () {
    const { variant, onClick, videoId } = this.props

    const { label, Icon } = this.config(variant)

    return (
      <button className={styles.button} onClick={onClick} aria-controls={videoId}>
        <ScreenReaderContent>{label}</ScreenReaderContent>
        <Icon width="1.5em" height="1.5em" />
      </button>
    )
  }
}
