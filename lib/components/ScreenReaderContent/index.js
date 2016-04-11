import React, { Component, PropTypes } from 'react'
import styles from './ScreenReaderContent.css'

/**
  The ScreenReaderContent component renders content that is accessible to
  screen readers, but is not visible.

  ```jsx_example
  <ScreenReaderContent>
    This content is not visible.
  </ScreenReaderContent>
  ```
**/
export default class ScreenReaderContent extends Component {
  static propTypes = {
    /**
    * the html tag to use for the root element
    */
    tag: PropTypes.string,
    /**
    * content meant for screen readers only
    */
    children: PropTypes.node
  };

  static defaultProps = {
    tag: 'div'
  };

  render () {
    /* eslint-disable no-unused-vars, react/prop-types */
    const {
      tag,
      className, // remove className prop
      ...props } = this.props
    /* eslint-enable no-unused-vars, react/prop-types */

    props.className = styles.root

    return React.createElement(tag, props)
  }
}
