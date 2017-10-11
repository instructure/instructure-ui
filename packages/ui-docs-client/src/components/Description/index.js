import React, { Component } from 'react'
import PropTypes from 'prop-types'

import compileMarkdown from '../../utils/compileMarkdown'

export default class Description extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }

  render () {
    const { id, title, content } = this.props

    return (
      <div id={`${id}Description`}>
        { compileMarkdown(content, { title }) }
      </div>
    )
  }
}
