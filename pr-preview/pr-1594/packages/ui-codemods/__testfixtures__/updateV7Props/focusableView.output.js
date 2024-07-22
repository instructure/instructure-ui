/* eslint-disable */
import { FocusableView } from '@instructure/ui-focusable'

import { View } from '@instructure/ui-view'

const a = (
  <p>
    <View withFocusOutline />
    <View withFocusOutline={true} />
    <View withFocusOutline={false} />
    <View />
    <View />
    <View focusColor="danger" />
    <View focusColor="inverse" />
  </p>
)
