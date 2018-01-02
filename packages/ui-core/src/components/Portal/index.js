import React, { Component } from 'react'

import deprecated, { changedPackageWarning } from '@instructure/ui-utils/lib/react/deprecated'

import UIPortal from '@instructure/ui-portal/lib/components/Portal'

@deprecated('5.0.0', null, changedPackageWarning(
  'ui-core',
  'ui-portal'
))
class Portal extends Component {
  static propTypes = {
    ...UIPortal.PropTypes
  }

  render () {
    return <UIPortal {...this.props} />
  }
}

export default Portal
