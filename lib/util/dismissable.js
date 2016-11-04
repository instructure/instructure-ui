import React, { PropTypes } from 'react'
import getDisplayName from './getDisplayName'

import IconXSolid from 'instructure-icons/lib/Solid/IconXSolid'

import ScreenReaderContent from '../components/ScreenReaderContent'
import Button from '../components/Button'

/**
 * Mark component as dismissable (renders a 'close' button).
 */
export default function dismissable (closeButtonStyles) {
  return function (ComposedComponent) {
    const displayName = getDisplayName(ComposedComponent)

    class DismissableComponent extends ComposedComponent {
      static displayName = displayName

      static propTypes = {
        ...ComposedComponent.propTypes,
        /**
        * should the close button display
        */
        isDismissable: PropTypes.bool,
        /**
        * accessible label for the 'Close' button (required if `isDismissable`)
        */
        closeButtonLabel: PropTypes.string,
        /**
        * function to be called when close button is clicked (required if `isDismissable`)
        */
        onClose: PropTypes.func,
        /**
        * function to get a reference to the close `Button` element
        */
        closeButtonRef: PropTypes.func
      }

      static defaultProps = {
        ...ComposedComponent.defaultProps,
        isDismissable: false
      }

      renderCloseButton () {
        return (
          <div className={closeButtonStyles} key="closeButton">
            <Button
              ref={this.props.closeButtonRef}
              onClick={this.props.onClose}
              size="small"
              variant="icon">
              <IconXSolid />
              <ScreenReaderContent>{this.props.closeButtonLabel}</ScreenReaderContent>
            </Button>
          </div>
        )
      }

      render () {
        const componentTree = super.render()
        let children = React.Children.toArray(componentTree.props.children)

        if (this.props.isDismissable) {
          children = [this.renderCloseButton()].concat(children)
        }

        return React.cloneElement(componentTree, {...componentTree.props}, children)
      }
    }

    return DismissableComponent
  }
}
