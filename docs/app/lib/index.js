import React, {Component} from 'react'
import {render} from 'react-dom'

import ComponentDoc from './components/ComponentDoc'
import DocsNav from './components/DocsNav'
import HtmlDoc from './components/HtmlDoc'
import DocsSection from './components/DocsSection'

import styles from './docs.css'

import documentsMap, { documentsList } from './util/load-docs'
import componentsMap, { componentsList } from './util/load-components'

class DocsApp extends Component {
  constructor (props) {
    super()
    this.state = {
      menuSearch: ''
    }
  }

  updateKey = () => {
    this.setState({
      key: window.location.hash.slice(1) || 'index'
    })
  };

  componentDidMount () {
    this.updateKey()

    window.addEventListener('hashchange', this.updateKey, false)
  }

  componentWillUnmount () {
    window.removeEventListener('hashchange', this.updateKey, false)
  }

  renderComponent (component) {
    return (
      <DocsSection id={component.name}>
        <ComponentDoc name={component.name} doc={component.doc} path={component.path} />
      </DocsSection>
    )
  }

  renderDoc (doc) {
    const heading = doc.title !== 'Index' ? doc.title : null
    return (
      <DocsSection id={doc.name} heading={heading}>
        <HtmlDoc html={doc.html} />
      </DocsSection>
    )
  }

  renderError (key) {
    return (
      <DocsSection id="error">
        <h2>Document not found</h2>
      </DocsSection>
    )
  }

  renderContent (key) {
    const component = componentsMap[key]
    const doc = documentsMap[key]

    if (component) {
      return this.renderComponent(component)
    } else if (doc) {
      return this.renderDoc(doc)
    } else {
      return this.renderError(key)
    }
  }

  render () {
    return (
      <div className={styles.root}>
        <div className={styles.nav}>
          <DocsNav selected={this.state.key} components={componentsList} documents={documentsList} />
        </div>
        <div className={styles.main} role="main">
          {this.renderContent(this.state.key)}
        </div>
      </div>
    )
  }
}

render(<DocsApp />, document.getElementById('app'))
