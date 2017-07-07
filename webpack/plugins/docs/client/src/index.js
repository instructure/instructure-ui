import React from 'react'
import ReactDOM from 'react-dom'

import parseComponents from './util/parse-components'
import parseDocs from './util/parse-docs'

import DocsApp from './components/DocsApp'

export default function renderDocsApp (data) {
  const props = {
    library: data.library,
    ...parseComponents(data.components),
    ...parseDocs(data.docs)
  }

  ReactDOM.render(<DocsApp {...props} />, document.getElementById('app'))
}
