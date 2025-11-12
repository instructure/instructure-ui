---
describes: MetricGroup
---

### Upgrade Guide for V12

> - theme variable `lineHeight` is now removed.

A `MetricGroup` component displays multiple `Metric` (value + label) in rows.

```javascript
---
type: example
---
<MetricGroup>
  <Metric renderLabel="Grade" renderValue="80%" />
  <Metric renderLabel="Late" renderValue="4" />
  <Metric renderLabel="Missing" renderValue="2" />
</MetricGroup>
```
