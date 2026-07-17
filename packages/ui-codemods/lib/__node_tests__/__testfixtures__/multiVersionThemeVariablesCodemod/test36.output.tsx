// @ts-nocheck
// Rename collision inside InstUISettingsProvider `componentOverrides`:
// Heading `primaryInverseColor` and `secondaryInverseColor` both map to
// `inverseColor` so both are left unchanged + warned, while `primaryColor` ->
// `baseColor` renames; the override is then relocated to `themeOverride.components`.
import { Heading } from '@instructure/ui-heading/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

const test = () => (
  <InstUISettingsProvider
    themeOverride={{
      components: {
        Heading: {
          baseColor: 'g',
          primaryInverseColor: 'a',
          secondaryInverseColor: 'b'
        }
      }
    }}
  >
    <Heading>x</Heading>
  </InstUISettingsProvider>
)
