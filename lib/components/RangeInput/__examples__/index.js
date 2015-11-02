import React from 'react'
import ReactDom from 'react-dom'
import RangeInput from '../index'

const Examples = React.createClass({
  render () {
    return (
      <div>
        <RangeInput labelText="Opacity" defaultValue={25} name="opacity" max={100} min={0} />
      </div>
    )
  }
})

ReactDom.render(<Examples/>, document.getElementById('examples'))
