---
describes: MetricsList
---

The MetricsList component displays metrics (value + label) in rows.

```js
---
example: true
---
<MetricsList>
  <MetricsListItem label="Grade" value="80%" />
  <MetricsListItem label="Late" value="4" />
  <MetricsListItem label="Missing" value="2" />
</MetricsList>
```

```js
---
example: true
---
<ContextBox padding="small">
  <MetricsList>
    <MetricsListItem
      label={<div>Average Grade<div>High 33%, Low 10%</div></div>}
      value="25%"
    />
    <MetricsListItem
      label={<div>Average Page Views</div>}
      value="12"
    />
    <MetricsListItem
      label={<div>Missing Submissions</div>}
      value="5"
    />
    <MetricsListItem
      label={<div>Late Submissions</div>}
      value="11"
    />
  </MetricsList>
</ContextBox>
```
