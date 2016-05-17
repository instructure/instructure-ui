import React, { Children, Component, PropTypes } from 'react'
import ContextBox from '../ContextBox'
import RootCloseWrapper from '../../util/RootCloseWrapper'
import safeCloneElement from '../../util/safeCloneElement'

export default class PopoverContent extends Component {
  static propTypes = {
    variant: PropTypes.oneOf(['default', 'inverse']),
    placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    show: PropTypes.bool,
    rootClose: PropTypes.bool,
    children: PropTypes.node,
    onClose: PropTypes.func
  };

  static defaultProps = {
    show: false,
    variant: 'default',
    rootClose: true,
    onClose: function () {}
  };

  handleRootClose = (event) => {
    this.props.onClose(event)
  }

  renderContent () {
    const child = Children.only(this.props.children)
    const clone = safeCloneElement(child, {
      ...child.props,
      'aria-hidden': this.props.show ? null : 'true'
    })

    if (this.props.rootClose) {
      return (
        <RootCloseWrapper noWrap onRootClose={this.handleRootClose}>
          {clone}
        </RootCloseWrapper>
      )
    } else {
      return clone
    }
  }

  render () {
    /* eslint-disable no-unused-vars */
    const {
      children,
      ...props
    } = this.props
    /* eslint-enable no-unused-vars */

    return (
      <ContextBox {...props}>
        {this.renderContent()}
      </ContextBox>
    )
  }
}
