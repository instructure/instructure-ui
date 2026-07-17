// @ts-nocheck
// Heading rename collision: `primaryInverseColor` and `secondaryInverseColor` both
// rename to `inverseColor`, so both are left unchanged and warned (no value is
// dropped); the unrelated `primaryColor` -> `baseColor` rename still applies.
import { Heading } from '@instructure/ui-heading/v11_7'

const test = () => (
  <Heading
    themeOverride={{
      primaryColor: 'red',
      primaryInverseColor: 'white',
      secondaryInverseColor: 'grey'
    }}
  >
    hi
  </Heading>
)
