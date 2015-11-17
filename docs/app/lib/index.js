import React, {Component} from 'react'
import {render} from 'react-dom'

import ComponentDoc from './components/ComponentDoc'
import DocsNav from './components/DocsNav'
import GuideDoc from './components/GuideDoc'

import InstructureUI from 'instructure-ui'
import loadGuides, {guidesContext} from './util/load-guides'

import styles from './docs.css'

const components = Object.keys(InstructureUI).sort()

/* These need to be globals to render examples */
global.React = React
global.InstructureUI = InstructureUI

components.forEach((component) => {
  global[component] = InstructureUI[component]
})

const guides = loadGuides()

class DocsApp extends Component {
  constructor (props) {
    super()
    this.state = {
      menuSearch: ''
    }
  }

  render () {
    const componentDocs = components
      .map(name => <ComponentDoc key={name} name={name} />)
    const guideDocs = guides
      .map(guide => <GuideDoc key={guide.id} id={guide.id} html={guidesContext(guide.path)} />)

    return (
      <div className={styles.root}>
        <div className={styles.nav}>
          <DocsNav components={components} guides={guides} />
        </div>
        <div className={styles.main}>
          {componentDocs}
          {guideDocs}
        </div>
      </div>
    )
  }
}

render(<DocsApp />, document.getElementById('app'))
