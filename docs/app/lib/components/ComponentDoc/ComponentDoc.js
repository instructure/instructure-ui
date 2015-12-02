import React, {Component, PropTypes} from 'react'

import ComponentDescription from '../ComponentDescription'
import ComponentProps from '../ComponentProps'

import styles from './ComponentDoc.css'

export default class ComponentDoc extends Component {
  static propTypes = {
    name: PropTypes.string
  }

  render () {
    // load docs using the docgen webpack loader (./webpack/loaders/docgen.js)
    const doc = require(`!!docgen!lib/components/${this.props.name}/${this.props.name}.js`)

    const props = doc.props && <ComponentProps props={doc.props} />
    const description = doc.description && <ComponentDescription description={doc.description} />

    return (
      <div>
        <h2 className={styles.heading}>{this.props.name}</h2>
        <code>
          {doc.path}
        </code>
        { props }
        { description }
      </div>
    )
  }
}
