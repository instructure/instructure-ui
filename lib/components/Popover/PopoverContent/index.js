import React, { Component, PropTypes } from 'react'
import ContextBox from '../../ContextBox'
import { pickProps } from '../../../util/passthroughProps'

export default class PopoverContent extends Component {
  static propTypes = {
    variant: PropTypes.oneOf(['default', 'inverse']),
    placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    show: PropTypes.bool,
    children: PropTypes.node
  };

  static defaultProps = {
    show: false,
    variant: 'default'
  }

  render () {
    const props = pickProps(this.props, ContextBox.propTypes)

    return (
      <ContextBox {...props} aria-hidden={this.props.show ? null : 'true'}>
        {this.props.children}
      </ContextBox>
    )
  }
}
