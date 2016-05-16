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
    doc: PropTypes.object
  };

  static defaultProps = {
    doc: {}
  };

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
      doc
    } = this.props
    return doc.description ? (
      <div className={styles.description}>
        <ComponentDescription name={name} description={doc.description} />
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
    const libraryName = library.name
    const githubRoot = library.projectUrl + '/tree/master/'

    const componentCSSPath = packageName + '/dist/components/' + name + '.css'

    const es6Example = [
      'import { ' + name + ' } from \'' + packageName + '\'',
      '// or',
      'import ' + name + ' from \'' + packageName + '/lib/components/' + name + '\'',
      '',
      '// include component CSS',
      'import \'' + componentCSSPath + '\''
    ].join('\n')

    const commonJSExample = [
      'var ' + name + ' = require(\'' + packageName + '/lib/components/' + name + '\')',
      '// or',
      'var ' + name + ' = require(\'' + packageName + '\').' + name,
      '',
      '// include component CSS',
      'require(\'' + componentCSSPath + '\')'
    ].join('\n')

    const amdExample = [
      'define([\'' + packageName + '\'], function(' + libraryName + ') {',
      '  var ' + name + ' = ' + libraryName + '.' + name,
      '  ...',
      '})'
    ].join('\n')

    // TODO: globals example

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
        <div>
          <h4 className={styles.sectionSubHeading}>ES6</h4>
          <CodeEditor code={es6Example} readOnly mode="javascript" />

          <h4 className={styles.sectionSubHeading}>CommonJS</h4>
          <CodeEditor code={commonJSExample} readOnly mode="javascript" />

          <h4 className={styles.sectionSubHeading}>AMD</h4>
          <p>
            Note that if you are using AMD you'll have to require the entire component
            library. If you want to consume only specific components, consider using npm and
            CommonJS or ES6 modules instead.
          </p>
          <p>
            You'll need to include the CSS file in <code>{componentCSSPath}</code>
          </p>
          <CodeEditor code={amdExample} readOnly mode="javascript" />
        </div>
      </div>
    )
  }
}
