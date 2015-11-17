import React from 'react'
import ReactDom from 'react-dom'
import Foo from '../index'

const Examples = React.createClass({
  render () {
    return (
      <div>
        <Foo />
      </div>
    )
  }
})

ReactDom.render(<Examples/>, document.getElementById('examples'))
