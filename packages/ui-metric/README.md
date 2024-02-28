---
category: packages
---

## ui-metric

[![npm][npm]][npm-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A UI component for displaying Metrics.

### Components

The `ui-metric` package contains the following:

- [Metric](#Metric)
- [MetricGroup](#MetricGroup)

### Installation

```sh
npm install @instructure/ui-metric
```

### Usage

```jsx
---
type: code
---

import { Metric } from '@instructure/ui-metric'

const MyMetric = () => {
  return (
    <Metric label="Grade" value="80%" />
  )
}
```

```jsx
---
type: code
---

import { MetricGroup } from '@instructure/ui-metric'

const MyGroup = () => {
  return (
    <MetricGroup>
      <Metric label="Grade" value="80%" />
      <Metric label="Late" value="4" />
      <Metric label="Missing" value="2" />
    </MetricGroup>
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-metric.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-metric
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
