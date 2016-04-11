import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import themeable from '../../util/themeable'

import styles from './ContextBox.css'
import themeVariables from './theme/ContextBox'
import themeStyles from './theme/ContextBox.css'

/**
  Add small overlays of content to display secondary information.

  ```jsx_example
  <ContextBox>Hello World</ContextBox>
  ```
 **/
@themeable(themeVariables, themeStyles)
export default class ContextBox extends Component {
  static propTypes = {
    children:  PropTypes.node.isRequired,
    withAnimation:   PropTypes.bool,
    withArrow: PropTypes.bool,
    positioned:  PropTypes.oneOf(['above', 'below', 'left', 'right'])
  };

// TODO: actual positions should be something like these
// (we should be able to control how the popover is aligned wih the trigger)
// above-center, above-left, above-right
// below-center, below-left, below-right
// left-center, left-top, left-bottom
// right-center, right-top, right-bottom

  static defaultProps = {
    withAnimation: true,
    positioned: 'above',
    withArrow: true
  };

  render () {
    const {
      positioned,
      withAnimation,
      children,
      withArrow
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles['with-arrow']]: withArrow,
      [styles['with-animation']]: withAnimation,
      [styles['positioned--' + positioned]]: true
    }

    return (
      <div className={classnames(classes)}>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    )
  }
}
