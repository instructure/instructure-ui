import React, {Component, PropTypes} from 'react'

import ComponentDescription from '../ComponentDescription'
import ComponentProps from '../ComponentProps'

import CodeEditor from '../CodeEditor'

import { Link, ScreenReaderContent } from 'instructure-ui'

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

  render () {
    const {
      name,
      doc,
      path
    } = this.props

    const { library } = config

    const packageName = library.packageName
    const libraryName = library.name
    const props = doc.props && <ComponentProps props={doc.props} />
    const description = doc.description && <ComponentDescription name={name} description={doc.description} />
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
        <ScreenReaderContent>
          <a href={'#' + name + 'Properties'}>Skip to properties</a>
        </ScreenReaderContent>
        <div className={styles.path}>
          <Link theme={{textColor: '#239ebd'}} href={githubRoot + path}>
            {path}
          </Link>
        </div>
        <div className={styles.description}>
          {description}
        </div>
        <h3 className={styles.sectionHeading} id={name + 'Properties'} >
          Properties
        </h3>
        <div className={styles.props}>
          {props}
        </div>
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
