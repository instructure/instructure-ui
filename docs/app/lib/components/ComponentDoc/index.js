import React, {Component, PropTypes} from 'react'

import ComponentDescription from '../ComponentDescription'
import ComponentProps from '../ComponentProps'
import ComponentTheme from '../ComponentTheme'

import CodeEditor from '../CodeEditor'

import Link from 'instructure-ui/lib/components/Link'

import styles from './ComponentDoc.css'

import { pkg } from 'config-loader!'

export default class ComponentDoc extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    themeKey: PropTypes.string,
    doc: PropTypes.object,
    theme: PropTypes.object
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

  renderTheme () {
    const {
      theme
    } = this.props
    return theme && Object.keys(theme).length > 0 ? (
      <div>
        <h3 className={styles.sectionHeading} id={name + 'Theme'}>
          Theme Variables
        </h3>
        <ComponentTheme theme={theme} />
      </div>
    ) : null
  }

  renderDescription () {
    const {
      name,
      themeKey,
      doc
    } = this.props
    return doc.description ? (
      <div className={styles.description}>
        <ComponentDescription name={name} themeKey={themeKey} description={doc.description} />
      </div>
    ) : null
  }

  render () {
    const {
      name,
      path
    } = this.props

    const packageName = pkg.name
    const githubRoot = pkg.repository.url.replace('.git', '') + '/tree/master/'

    const example = `/*** es6 ***/
import ${name} from '${packageName}/lib/components/${name}'

/*** CommonJS ***/
var ${name} = require('${packageName}/lib/components/${name}')

/*** AMD ***/
define(['${packageName}/${name}'], function({ default: ${name} }) {
  // ...
})`

    return (
      <div className={styles.root}>
        <h2 className={styles.heading}>
          {name}
        </h2>
        <div className={styles.path}>
          <Link href={githubRoot + path}>
            {path}
          </Link>
        </div>
        {this.renderDescription()}
        {this.renderProps()}
        {this.renderTheme()}
        <h3 className={styles.sectionHeading} id={name + 'Usage'}>
          Usage
        </h3>
        <p>
          <code>npm install --save {packageName}</code>
        </p>
        <div className={styles.usage}>
          <CodeEditor readOnly code={example} mode="javascript" />
        </div>
      </div>
    )
  }
}
