import React from 'react'
import ReactDOM from 'react-dom'
import lorem from 'lorem-ipsum'

import App from './components/App'

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

global.React = React
global.ReactDOM = ReactDOM

export default function renderDocsClient (data, element) {
  ReactDOM.render(<App {...data} />, element)
}
