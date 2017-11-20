import React, { Component } from 'react'
import Media from '../Media'
import Controller from '../Controller'

export default class MediaCapture extends Component {
  render () {
    return (
      <div>
        <Media />
        <Controller />
      </div>
    )
  }
}
