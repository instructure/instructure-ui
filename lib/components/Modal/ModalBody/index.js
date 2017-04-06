import React, { Component, PropTypes } from 'react'
import themeable from '../../../themeable'
import CustomPropTypes from '../../../util/CustomPropTypes'
import Container from '../../Container'

import styles from './styles.css'
import theme from './theme.js'

@themeable(theme, styles)
export default class ModalBody extends Component {
  static propTypes = {
    children: PropTypes.node,
    padding: CustomPropTypes.spacing
  }
  static defaultProps = {
    padding: 'medium'
  }

  render () {
    return (
      <Container as="div" className={styles.root} padding={this.props.padding}>
        {this.props.children}
      </Container>
    )
  }
}
