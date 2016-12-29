import React, { Children, Component, PropTypes } from 'react'
import themeable from '../../../util/themeable'

import styles from './styles.css'
import theme from './theme.js'

import classnames from 'classnames'
import ScreenReaderContent from '../../ScreenReaderContent'

/**
  This is a helper component that is used by most of the custom form
  components. In most cases it shouldn't be used directly.

  ```jsx_example
  <FormFieldLabel>Hello</FormFieldLabel>
  ```
**/
@themeable(theme, styles)
export default class FormFieldLabel extends Component {
  static propTypes = {
    tag: PropTypes.string,
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    tag: 'span'
  }

  hasVisibleContent (children) {
    const childCount = Children.count(children)
    let hasVisibleContent = childCount > 0

    if (childCount === 1 && typeof children !== 'string') {
      const onlyChild = Children.only(children)
      hasVisibleContent = onlyChild.type !== ScreenReaderContent
    }

    return hasVisibleContent
  }

  render () {
    const {
      tag,
      ...props
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles.marginBottom]: this.hasVisibleContent(this.props.children)
    }

    props.className = classnames(classes)

    return React.createElement(tag, props)
  }
}
