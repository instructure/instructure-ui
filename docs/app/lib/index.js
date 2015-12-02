import React, {Component} from 'react'
import {render} from 'react-dom'

import ComponentDoc from './components/ComponentDoc'
import DocsNav from './components/DocsNav'
import HtmlDoc from './components/HtmlDoc'
import DocsSection from './components/DocsSection'

import InstructureUI from 'instructure-ui'

import loadGuides, {guidesContext} from './util/load-guides'
const components = Object.keys(InstructureUI).sort()

import styles from './docs.css'

const guides = loadGuides()

class DocsApp extends Component {
  constructor (props) {
    super()
    this.state = {
      menuSearch: ''
    }
  }

  render () {
    const introduction = (
      <DocsSection key="Introduction" id="Introduction" >
        <HtmlDoc html={require('docs/index.md')} />
      </DocsSection>
    )

    const componentDocs = components
      .map(name => <DocsSection key={name} id={name}><ComponentDoc name={name} /></DocsSection>)

    const guideDocs = guides
      .map((guide) => {
        return (
          <DocsSection key={guide.id} id={guide.id}>
            <HtmlDoc html={guidesContext(guide.path)} />
          </DocsSection>
        )
      })

    return (
      <div className={styles.root}>
        <div className={styles.nav}>
          <DocsNav components={components} guides={guides} />
        </div>
        <div className={styles.main}>
          {introduction}
          {componentDocs}
          {guideDocs}
        </div>
      </div>
    )
  }
}

render(<DocsApp />, document.getElementById('app'))
