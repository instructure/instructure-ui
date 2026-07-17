// @ts-nocheck
// Per-instance Metric `themeOverride` set to a function: can't be inspected, so it
// is left unchanged and warned. Sibling Spinner anchor `xSmallBorderWidth` ->
// `strokeWidthXs` (control).
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
      themeOverride={() => ({ padding: '10px' })}
    />
  </div>
)
