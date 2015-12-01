import React, { Component, PropTypes } from 'react'

export default class HtmlDoc extends Component {
  static propTypes = {
    html: PropTypes.string.isRequired
  }

  render () {
    return (
      <div dangerouslySetInnerHTML={{__html: this.props.html}} />
    )
  }
}
