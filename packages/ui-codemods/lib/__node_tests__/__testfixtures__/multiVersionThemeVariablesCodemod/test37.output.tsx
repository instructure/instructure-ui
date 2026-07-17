// @ts-nocheck
// Drilldown sub-components forward their `themeOverride` to the Options they render,
// so Options.Item's `padding` is removed (and warned) here, while the unmapped
// `color` passes through unchanged.
import { Drilldown } from '@instructure/ui-drilldown/v11_7'

const test = () => (
  <Drilldown.Option
    themeOverride={{
      color: 'red'
    }}
  />
)
