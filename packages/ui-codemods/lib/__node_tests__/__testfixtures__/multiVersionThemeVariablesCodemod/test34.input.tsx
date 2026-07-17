// @ts-nocheck
// Text color swap: `primaryColor` -> `baseColor` and `brandColor` -> `primaryColor`
// both apply (allowed because `primaryColor` is vacated), plus a straight rename
// `dangerColor` -> `errorColor` and a silent removal (`alertColor`).
import { Text } from '@instructure/ui-text/v11_7'

const test = () => (
  <Text
    themeOverride={{
      primaryColor: 'grey',
      brandColor: 'blue',
      dangerColor: 'red',
      alertColor: 'cyan'
    }}
  >
    x
  </Text>
)
