import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Link from '@instructure/ui-core/lib/components/Link'
import Heading from '@instructure/ui-core/lib/components/Heading'
import Typography from '@instructure/ui-core/lib/components/Typography'
import Container from '@instructure/ui-core/lib/components/Container'

import ComponentDescription from '../ComponentDescription'
import ComponentProps from '../ComponentProps'
import ComponentTheme from '../ComponentTheme'
import CodeEditor from '../CodeEditor'

import { library } from '../DocsApp/propTypes'

export default class ComponentDoc extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    themeKey: PropTypes.string,
    accessible: PropTypes.bool,
    doc: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    theme: PropTypes.object // eslint-disable-line react/forbid-prop-types
  }

  static defaultProps = {
    themeKey: undefined,
    accessible: false,
    theme: undefined,
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
        <Heading level="h3" id={`${name}Properties`} margin="0 0 small 0">
          Properties
        </Heading>
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
        <Heading level="h3" id={`${name}Theme`} margin="large 0 small 0">
          Theme Variables
        </Heading>
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
      <ComponentDescription
        name={name}
        themeKey={themeKey}
        description={doc.description}
        accessible={accessible}
      />
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
      <div>
        <Heading level="h2">
          {name}
        </Heading>
        <Typography size="small">
          <Link href={githubRoot + path}>
            {path}
          </Link>
        </Typography>
        {this.renderDescription()}
        {this.renderProps()}
        {this.renderTheme()}
        <Heading level="h3" id={`${name}Usage`} margin="large 0 small 0">
          Usage
        </Heading>
        <Container margin="0 0 small 0" display="block">
          <code>npm install --save {packageName}</code>
        </Container>
        <CodeEditor code={example} readOnly />
      </div>
    )
  }
}
