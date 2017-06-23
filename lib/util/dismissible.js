import React from 'react'
import PropTypes from 'prop-types'
import IconXSolid from 'instructure-icons/lib/Solid/IconXSolid'
import getDisplayName from './getDisplayName'
import safeCloneElement from './safeCloneElement'

import ScreenReaderContent from '../components/ScreenReaderContent'
import Button from '../components/Button'

const propTypes = {
   /**
  * should the close button display
  */
  dismissible: PropTypes.bool,
  /**
  * accessible label for the 'Close' button (required if `dismissible`)
  */
  closeButtonLabel: PropTypes.string,
  /**
  * function to be called when close button is clicked (required if `dismissible`)
  */
  onDismiss: PropTypes.func,
  /**
  * function to get a reference to the close `Button` element
  */
  closeButtonRef: PropTypes.func,
  /**
   * variant of button to render
   */
  closeButtonVariant: PropTypes.string
}

/**
 * Mark component as dismissible (renders a 'close' button).
 */
export default function dismissible (closeButtonStyles) {
  return function (ComposedComponent) {
    const displayName = getDisplayName(ComposedComponent)

    class DismissableComponent extends ComposedComponent {
      static displayName = displayName

      static propTypes = {
        ...ComposedComponent.propTypes,
        ...propTypes
      }

      static defaultProps = {
        ...ComposedComponent.defaultProps,
        dismissible: false,
        closeButtonVariant: 'icon'
      }

      renderCloseButton () {
        return (
          <div className={closeButtonStyles} key="closeButton">
            <Button
              buttonRef={this.props.closeButtonRef}
              onClick={this.props.onDismiss}
              size="small"
              variant={this.props.closeButtonVariant}
            >
              <IconXSolid />
              <ScreenReaderContent>{this.props.closeButtonLabel}</ScreenReaderContent>
            </Button>
          </div>
        )
      }

      render () {
        const componentTree = super.render()
        let children = React.Children.toArray(componentTree.props.children)

        if (this.props.dismissible) {
          children = [this.renderCloseButton()].concat(children)
        }
        return safeCloneElement(componentTree, {...componentTree.props}, children)
      }
    }

    return DismissableComponent
  }
}

dismissible.propTypes = propTypes
