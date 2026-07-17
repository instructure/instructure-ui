// @ts-nocheck
// Aliased imports (`Spinner as S`, `InstUISettingsProvider as P`): the
// per-instance `themeOverride` is renamed, and the InstUISettingsProvider override
// Spinner `xSmallBorderWidth` -> `strokeWidthXs` is renamed AND relocated to
// `themeOverride.components` - all resolved through the aliases.
import { Spinner as S } from '@instructure/ui-spinner/v11_7'
import { InstUISettingsProvider as P } from '@instructure/emotion'

const test = () => (
  <div>
    <S renderTitle="anchor" themeOverride={{ xSmallBorderWidth: '2rem' }} />
    <P
      theme={{ componentOverrides: { Spinner: { xSmallBorderWidth: '2rem' } } }}
    >
      <S renderTitle="aliased provider" />
    </P>
  </div>
)
