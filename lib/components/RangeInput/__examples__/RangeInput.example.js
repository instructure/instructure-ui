import React from 'react'
import {RangeInput} from 'instructure-ui'

export default function RangeInputExample () {
  return (
    <RangeInput labelText="Opacity" defaultValue={25} name="opacity" max={100} min={0} />
  )
}
