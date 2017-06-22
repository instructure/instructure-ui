import React, { Component } from 'react'
import PropTypes from 'prop-types'
import parseDescription from '../../util/parse-description'

import ComponentPlayground from '../ComponentPlayground'

export default class ComponentDescription extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    themeKey: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    accessible: PropTypes.bool
  }
  /* eslint-enable react/require-default-props */

  componentWillUpdate (nextProps) {
    if (nextProps.description !== this.props.description) {
      this.sections = parseDescription(nextProps.description)
    }
  }

  renderDescription () {
    /* eslint-disable react/no-danger, react/no-array-index-key, array-callback-return */
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
              key={i} />
          )
        case 'html':
          return (
            <div dangerouslySetInnerHTML={{__html: section.content}} key={i} />
          )
      }
    })
    /* eslint-enable react/no-danger, react/no-array-index-key, array-callback-return */
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
