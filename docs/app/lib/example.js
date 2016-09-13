import React from 'react'
import ReactDOM from 'react-dom'
import ComponentExample from './components/ComponentExample'

import 'babel-polyfill'

if (process.env.NODE_ENV !== 'production') {
  const axe = require('react-axe')

  axe(React, ReactDOM, 1000, {
    rules: [
      { id: 'radiogroup', enabled: false } /* https://github.com/dequelabs/axe-core/issues/176 */
    ]
  })
}

ReactDOM.render(<ComponentExample />, document.getElementById('example'))
