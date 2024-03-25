import { View } from '@instructure/ui'
import * as Components from '../components'

export default function Home() {
  return (
    <View as="div">
      {Object.entries(Components as Record<string, React.ElementType>).map(
        ([ComponentName, Component]) => (
          <Component key={ComponentName}></Component>
        )
      )}
    </View>
  )
}
