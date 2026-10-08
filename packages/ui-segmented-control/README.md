## ui-segmented-control

[![npm][npm]][npm-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

A UI component for switching between mutually exclusive options.

### Components

The `ui-segmented-control` package contains the following:

- [SegmentedControl](SegmentedControl)

### Installation

```sh
npm install @instructure/ui-segmented-control
```

### Usage

```jsx
import { SegmentedControl } from '@instructure/ui-segmented-control'

const MyView = () => {
  return (
    <SegmentedControl aria-label="Calendar view" defaultValue="week">
      <SegmentedControl.Option value="day" renderLabel="Day" />
      <SegmentedControl.Option value="week" renderLabel="Week" />
      <SegmentedControl.Option value="month" renderLabel="Month" />
    </SegmentedControl>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-segmented-control.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-segmented-control
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE.md
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
