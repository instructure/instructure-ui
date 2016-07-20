import { Component, Children, PropTypes } from 'react'
import safeCloneElement from '../../../util/safeCloneElement'

export default class PopoverTrigger extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render () {
    const {
      children,
      ...props
    } = this.props

    return safeCloneElement(Children.only(children), props)
  }
}
