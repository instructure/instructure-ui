import React from 'react'
import ReactDOM from 'react-dom'
import lorem from 'lorem-ipsum'

import parseComponents from './utils/parse-components'
import parseDocs from './utils/parse-docs'

import DocsApp from './components/DocsApp'

import placeholderImage from './utils/placeholder-image'

global.lorem = {
  sentence () {
    return lorem({
      count: 1,
      units: 'sentences'
    })
  },
  paragraph () {
    return lorem({
      count: 1,
      units: 'paragraphs'
    })
  },
  paragraphs (count) {
    return lorem({
      count: count || Math.floor(Math.random() * 10),
      units: 'paragraphs'
    })
  }
}

global.placeholderImage = placeholderImage

export function initGlobals (globals = {}) {
  Object.keys(globals).forEach((key) => {
    global[key] = globals[key]
  })
}

export default function renderDocsClient (data, element) {
  const props = {
    library: data.library,
    ...parseComponents(data.components),
    ...parseDocs(data.docs)
  }

  ReactDOM.render(<DocsApp {...props} />, element)
}
