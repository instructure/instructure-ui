import React, { Component } from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved, import/extensions
import Link from 'instructure-ui/lib/components/Link'

import ComponentDescription from '../ComponentDescription'
import ComponentProps from '../ComponentProps'
import ComponentTheme from '../ComponentTheme'

import CodeEditor from '../CodeEditor'

import styles from './styles.css'

import { library } from '../DocsApp/propTypes'

export default class ComponentDoc extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    themeKey: PropTypes.string,
    accessible: PropTypes.bool,
    doc: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    theme: PropTypes.object // eslint-disable-line react/forbid-prop-types
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    doc: {}
  }

  static contextTypes = {
    library
  }

  renderProps () {
    const {
      props
    } = this.props.doc
    return props ? (
      <div>
        <h3 className={styles.sectionHeading} id={`${name}Properties`}>
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
        <h3 className={styles.sectionHeading} id={`${name}Theme`}>
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
      doc,
      accessible
    } = this.props

    return doc.description ? (
      <div className={styles.description}>
        <ComponentDescription
          name={name}
          themeKey={themeKey}
          description={doc.description}
          accessible={accessible}
        />
      </div>
    ) : null
  }

  render () {
    const {
      name,
      path
    } = this.props

    const packageName = this.context.library.packageName
    const githubRoot = `${this.context.library.repository.replace('.git', '')}/tree/master/`

    // TODO: get the output path in the webpack plugin
    const srcPath = 'lib/components'

    const example = `\
/*** es6 ***/
import ${name} from '${packageName}/${srcPath}/${name}'

/*** CommonJS ***/
var ${name} = require('${packageName}/${srcPath}/${name}')
`

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
        <h3 className={styles.sectionHeading} id={`${name}Usage`}>
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
