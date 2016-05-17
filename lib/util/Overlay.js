import React, { Component, PropTypes } from 'react'
import BaseOverlay from 'react-overlays/lib/Overlay'
import { elementType } from 'react-prop-types'
import Transition from '../components/Transition'

export default class Overlay extends Component {

  static propTypes = {
    ...BaseOverlay.propTypes,

    /**
     * Set the visibility of the Overlay
     */
    show: PropTypes.bool,
    /**
     * Specify whether the overlay should trigger onHide when the user clicks outside the overlay
     */
    rootClose: PropTypes.bool,
    /**
     * A callback invoked by the overlay when it wishes to be hidden. Required if
     * `rootClose` is specified.
     */
    onHide: PropTypes.func,

    /**
     * Use animation
     */
    transition: PropTypes.oneOfType([
      PropTypes.bool,
      elementType
    ])
  };

  static defaultProps = {
    animation: Transition,
    rootClose: false,
    show: false
  };

  render () {
    const {
      children,
      ...props
    } = this.props

    return (
      <BaseOverlay {...props}>
        {children}
      </BaseOverlay>
    )
  }
}
