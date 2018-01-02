import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Controller extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  static defaultProps = {
    children: []
  }

  render () {
    const style = {
      flex: '1',
      width: '753px',
      backgroundColor: 'grey',
      opacity: '0.5',
      borderRadius: '3px'
    }

    return (
      <div style={style}>
        {this.props.children}
      </div>
    )
  }
}
