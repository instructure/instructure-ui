import React, {Component, PropTypes} from 'react'

import ComponentDescription from '../ComponentDescription'
import ComponentProps from '../ComponentProps'

import styles from './ComponentDoc.css'

export default class ComponentDoc extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    doc: PropTypes.object
  };

  static defaultProps = {
    doc: {}
  };

  render () {
    const {
      name,
      doc,
      path
    } = this.props

    const props = doc.props && <ComponentProps props={doc.props} />
    const description = doc.description && <ComponentDescription name={name} description={doc.description} />
    // TODO: display warning/info message when component needs docs
    return (
      <div className={styles.root}>
        <div className={styles.heading}>
          <h2>
            {name}
          </h2>
          <div className={styles.path}>
            {path}
          </div>
        </div>
        <div className={styles.description}>
          { description }
        </div>
        <div className={styles.props}>
          { props }
        </div>
      </div>
    )
  }
}
