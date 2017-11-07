import React from 'react'
import ReactDOM from 'react-dom'

import '@instructure/ui-themes/lib/canvas'

import App from './components/App'

export default function renderDocsClient (data, element) {
  ReactDOM.render(<App {...data} />, element)
}
