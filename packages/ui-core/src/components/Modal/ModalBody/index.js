import React, { Component } from 'react'
import PropTypes from 'prop-types'

import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'

import Container from '../../Container'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class ModalBody extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    children: PropTypes.node,
    padding: CustomPropTypes.spacing
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    padding: 'medium'
  }

  render () {
    return (
      <Container
        as="div"
        className={styles.root}
        padding={this.props.padding}
      >
        <div className={styles.content}>
          {this.props.children}
        </div>
      </Container>
    )
  }
}
