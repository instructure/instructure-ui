import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

export default function renderDocsClient (data, element) {
  ReactDOM.render(<App {...data} />, element)
}
