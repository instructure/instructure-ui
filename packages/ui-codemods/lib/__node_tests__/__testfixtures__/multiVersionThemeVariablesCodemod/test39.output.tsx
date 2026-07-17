// @ts-nocheck
// Two Checkbox elements, resolved by static `variant`.
//  Default (checkbox facade): `background` -> `backgroundColor`, `padding` removed,
//  divergent renames to Checkbox-slot names (`checkedBackground` ->
//  `backgroundCheckedColor`, `labelFontSizeMedium` -> `fontSizeMd`,
//  `labelLineHeight` -> `lineHeight`, `labelColor` -> `labelBaseColor`).
//  Toggle facade: `background`/`checkedBackground` -> Toggle-slot names,
//  `checkedIconColor` removed (warned), `labelColor` kept.
import { Checkbox } from '@instructure/ui-checkbox/v11_7'

const test = () => (
  <div>
    <Checkbox
      label="x"
      themeOverride={{
        backgroundColor: 'pink',
        backgroundCheckedColor: 'green',
        fontSizeMd: '1rem',
        lineHeight: 1.5,
        labelBaseColor: 'blue'
      }}
    />
    <Checkbox
      label="y"
      variant="toggle"
      themeOverride={{
        backgroundColor: 'pink',
        checkedBackgroundColor: 'green',
        labelColor: 'blue'
      }}
    />
  </div>
)
