import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Container from '../../Container'
import Transition from '../../Transition'
import CustomPropTypes from '../../../util/CustomPropTypes'
import themeable from '../../../themeable'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class TabPanel extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    title: PropTypes.node.isRequired,
    children: PropTypes.node,
    variant: PropTypes.oneOf(['simple', 'accordion', 'minimal']),
    maxHeight: PropTypes.string,
    id: PropTypes.string,
    labelledBy: PropTypes.string,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    padding: CustomPropTypes.spacing,
    textAlign: PropTypes.oneOf(['start', 'center', 'end'])
  };
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    id: null,
    variant: 'simple',
    labelledBy: null,
    selected: false,
    padding: 'small'
  };

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.variant]]: true
    }
    const isHidden = !this.props.selected || !!this.props.disabled

    const style = this.props.maxHeight ? {
      maxHeight: this.props.maxHeight,
      overflow: 'auto'
    } : null

    return (
      <div
        className={classnames(classes)}
        role="tabpanel"
        id={this.props.id}
        aria-labelledby={this.props.labelledBy}
        aria-hidden={isHidden ? 'true' : null}
      >
        <Transition
          type={this.props.variant === 'accordion' ? 'slide-down' : 'fade'}
          in={!isHidden}
          unmountOnExit
          transitionExit={false}
        >
          <Container
            className={styles.content}
            style={style}
            as="div"
            padding={this.props.padding}
            textAlign={this.props.textAlign}
          >
            {this.props.children}
          </Container>
        </Transition>
      </div>
    )
  }
}
