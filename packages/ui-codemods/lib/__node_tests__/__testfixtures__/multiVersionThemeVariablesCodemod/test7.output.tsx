// @ts-nocheck
// Per-instance `themeOverride` (static object): Metric `padding` removed (warns),
// `valueColor` kept (unmapped). Sibling Spinner anchor `xSmallBorderWidth` ->
// `strokeWidthXs` (control).
import { Spinner } from '@instructure/ui-spinner/v11_7'
import { Metric } from '@instructure/ui-metric/v11_7'

const test = () => (
  <div>
    <Spinner renderTitle="anchor" themeOverride={{ strokeWidthXs: '2rem' }} />
    <Metric
      renderLabel="x"
      renderValue="y"
      themeOverride={{
        valueColor: 'keep'
      }}
    />
  </div>
)
