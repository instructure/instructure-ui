import { Component, Children, PropTypes } from 'react'
import safeCloneElement from '../../util/safeCloneElement'

export default class PopoverTrigger extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render () {
    const {
      children,
      ...props
    } = this.props

    const child = Children.only(children)

    return safeCloneElement(child, {
      ...props,
      ...child.props /* child props need to come 2nd so we get the defaultProps */
    })
  }
}
