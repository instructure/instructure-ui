// @ts-nocheck
// Per-instance Metric `themeOverride` with a spread: visible `padding` is removed
// (warns) and the spread is kept; a warning notes the spread can't be inspected.
// Sibling Spinner anchor `xSmallBorderWidth` -> `strokeWidthXs` (control).
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
      themeOverride={{ ...someOverrides, padding: '10px' }}
    />
  </div>
)
