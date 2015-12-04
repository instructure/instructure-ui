import React, {Component} from 'react'
import {render} from 'react-dom'

import ComponentDoc from './components/ComponentDoc'
import DocsNav from './components/DocsNav'
import HtmlDoc from './components/HtmlDoc'
import DocsSection from './components/DocsSection'

import styles from './docs.css'

import {index, components, documents} from './util/load-docs'

class DocsApp extends Component {
  constructor (props) {
    super()
    this.state = {
      menuSearch: ''
    }
  }

  render () {
    const componentDocs = components
      .map((component) => {
        return (
          <DocsSection key={component.name} id={component.name}>
            <ComponentDoc name={component.name} doc={component.doc} path={component.path} />
          </DocsSection>
        )
      })

    const docs = documents
      .map((doc) => {
        return (
          <DocsSection key={doc.name} id={doc.name}>
            <HtmlDoc html={doc.html} />
          </DocsSection>
        )
      })

    return (
      <div className={styles.root}>
        <div className={styles.nav}>
          <DocsNav components={components} documents={documents} />
        </div>
        <div className={styles.main}>
          <DocsSection key="Introduction" id="Introduction">
            <HtmlDoc html={index.html} />
          </DocsSection>
          {componentDocs}
          {docs}
        </div>
      </div>
    )
  }
}

render(<DocsApp />, document.getElementById('app'))
