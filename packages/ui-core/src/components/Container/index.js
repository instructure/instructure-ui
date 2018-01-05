import React, { Component } from 'react'

import deprecated, { changedPackageWarning } from '@instructure/ui-utils/lib/react/deprecated'

import UIContainer from '@instructure/ui-container/lib/components/Container'

@deprecated('5.0.0', null, changedPackageWarning(
  'ui-core',
  'ui-container'
))
class Container extends Component {
  static propTypes = {
    ...UIContainer.PropTypes
  }

  render () {
    return <UIContainer {...this.props} />
  }
}

export default Container
