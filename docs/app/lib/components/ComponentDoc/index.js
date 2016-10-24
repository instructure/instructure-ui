import React, {Component, PropTypes} from 'react'

import ComponentDescription from '../ComponentDescription'
import ComponentProps from '../ComponentProps'

import CodeEditor from '../CodeEditor'

import { Link } from 'instructure-ui'

import styles from './ComponentDoc.css'

import config from 'config!'

export default class ComponentDoc extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    brand: PropTypes.string,
    doc: PropTypes.object
  }

  static defaultProps = {
    doc: {}
  }

  renderProps () {
    const {
      props
    } = this.props.doc
    return props ? (
      <div>
        <h3 className={styles.sectionHeading} id={name + 'Properties'}>
          Properties
        </h3>
        <ComponentProps props={props} />
      </div>
    ) : null
  }

  renderDescription () {
    const {
      name,
      brand,
      doc
    } = this.props
    return doc.description ? (
      <div className={styles.description}>
        <ComponentDescription name={name} brand={brand} description={doc.description} />
      </div>
    ) : null
  }

  render () {
    const {
      name,
      path
    } = this.props

    const { library } = config

    const packageName = library.packageName
    const githubRoot = library.projectUrl + '/tree/master/'

    const example = [
      '/*** es6 ***/',
      'import { ' + name + ' } from \'' + packageName + '\'',
      '// or single component:',
      'import ' + name + ' from \'' + packageName + '/lib/components/' + name + '\'',
      '',
      '',
      '/*** CommonJS ***/',
      'var ' + name + ' = require(\'' + packageName + '\').' + name,
      '// or single component:',
      'var ' + name + ' = require(\'' + packageName + '/lib/components/' + name + '\')',
      '',
      '',
      '/*** AMD ***/',
      'define([\'' + packageName + '/' + name + '\'], function({ default: ' + name + ' }) {',
      '  ...',
      '})'
    ].join('\n')

    return (
      <div className={styles.root}>
        <h2 className={styles.heading}>
          {name}
        </h2>
        <div className={styles.path}>
          <Link theme={{textColor: '#25a19f'}} href={githubRoot + path}>
            {path}
          </Link>
        </div>
        {this.renderDescription()}
        {this.renderProps()}
        <h3 className={styles.sectionHeading} id={name + 'Usage'}>
          Usage
        </h3>
        <p>
          <code>npm install --save {packageName}</code>
        </p>
        <div className={styles.usage}>
          <CodeEditor code={example} readOnly mode="javascript" />
        </div>
      </div>
    )
  }
}
