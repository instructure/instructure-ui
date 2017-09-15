import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ComponentPlayground from '../ComponentPlayground'

import parseDescription from '../../util/parse-description'

export default class ComponentDescription extends Component {
  static propTypes = {
    themeKey: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    accessible: PropTypes.bool
  }

  static defaultProps = {
    description: null,
    accessible: false
  }

  componentWillUpdate (nextProps) {
    if (nextProps.description !== this.props.description) {
      this.sections = parseDescription(nextProps.description)
    }
  }

  renderDescription () {
    /* eslint-disable react/no-danger, array-callback-return */
    return this.sections.map((section, i) => {
      switch (section.type) {
        case 'code':
          return (
            <ComponentPlayground
              name={this.props.name}
              code={section.content}
              accessible={this.props.accessible}
              themeKey={this.props.themeKey}
              variant={section.variant}
              language={section.language}
              key={section.content}
            />
          )
        case 'html':
          return (
            <div
              dangerouslySetInnerHTML={{__html: section.content}}
              key={section.content}
            />
          )
      }
    })
    /* eslint-enable react/no-danger, array-callback-return */
  }

  render () {
    if (!this.sections) {
      this.sections = parseDescription(this.props.description)
    }
    return (
      <div>
        {this.renderDescription()}
      </div>
    )
  }
}
