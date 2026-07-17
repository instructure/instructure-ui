// @ts-nocheck
// Integration mix in one file.
//  Renamed:   per-instance Spinner `xSmallBorderWidth` -> `strokeWidthXs`;
//             InstUISettingsProvider Text `secondaryColor` -> `mutedColor`
//             (relocated to `themeOverride.components`).
//  Removed:   per-instance Spinner `smallSize` (warns; emptied prop dropped).
//  Untouched: Spinner unmapped `valueColor`; non-InstUI `Widget`; dynamic Text
//             `themeOverride` (warns); bare `theme={canvas}` switch (silent).
import { Spinner } from '@instructure/ui-spinner/v11_7'
import { Text } from '@instructure/ui-text/v11_7'
import { Widget } from 'some-lib'
import { InstUISettingsProvider } from '@instructure/emotion'

const test = (dyn) => (
  <>
    <Spinner renderTitle="a" themeOverride={{ strokeWidthXs: '1rem' }} />
    <Spinner renderTitle="b" />
    <Spinner renderTitle="c" themeOverride={{ valueColor: 'keep' }} />
    <Widget themeOverride={{ xSmallBorderWidth: 'nope' }} />
    <Text themeOverride={dyn}>x</Text>
    <InstUISettingsProvider
      themeOverride={{
        components: { Text: { mutedColor: 'grey' } }
      }}
    >
      <Text>y</Text>
    </InstUISettingsProvider>
    <InstUISettingsProvider theme={canvas}>
      <Text>z</Text>
    </InstUISettingsProvider>
  </>
)
