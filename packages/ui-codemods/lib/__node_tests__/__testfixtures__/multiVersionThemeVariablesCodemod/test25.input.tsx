// @ts-nocheck
// Per-instance Metric `themeOverride` with only removed tokens (`padding`,
// `fontFamily`, both warn): the object empties out, so the whole `themeOverride`
// prop is dropped. Sibling Spinner anchor `xSmallBorderWidth` -> `strokeWidthXs`.
import { Spinner } from '@instructure/ui-spinner/v11_7'
import { Metric } from '@instructure/ui-metric/v11_7'

const test = () => (
  <div>
    <Spinner
      renderTitle="anchor"
      themeOverride={{ xSmallBorderWidth: '2rem' }}
    />
    <Metric
      renderLabel="x"
      renderValue="y"
      themeOverride={{ padding: '10px', fontFamily: 'monospace' }}
    />
  </div>
)
