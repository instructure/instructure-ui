import React, {Component, PropTypes} from 'react'

import loadExamples from '../../util/load-examples'

import ComponentDescription from '../ComponentDescription'
import ComponentProps from '../ComponentProps'
import ComponentExamples from '../ComponentExamples'

import styles from './ComponentDoc.css'

export default class ComponentDoc extends Component {
  static propTypes = {
    name: PropTypes.string
  }

  render () {
    const doc = require(`!!docgen!lib/components/${this.props.name}/${this.props.name}.js`)

    const props = doc.props && <ComponentProps props={doc.props} />
    const description = doc.description && <ComponentDescription description={doc.description} />

    const examples = loadExamples(this.props.name).map((example, i) => {
      return <ComponentExamples name={this.props.name} path={example.displayPath} key={i} />
    })

    return (
      <div id={this.props.name} className={styles.root}>
        <h2 className={styles.heading}>{this.props.name}</h2>
        <code>
          {doc.path}
        </code>
        { props }
        { description }
        { examples }
      </div>
    )
  }
}
