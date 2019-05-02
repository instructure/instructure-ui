---
describes: MetricsList
---

The MetricsList component displays metrics (value + label) in rows.

```js
---
example: true
---
<MetricsList>
  <MetricsList.Item label="Grade" value="80%" />
  <MetricsList.Item label="Late" value="4" />
  <MetricsList.Item label="Missing" value="2" />
</MetricsList>
```

```js
---
example: true
---
<ContextView padding="small" placement="center start">
  <MetricsList>
    <MetricsList.Item
      label={<div>Average Grade<div>High 33%, Low 10%</div></div>}
      value="25%"
    />
    <MetricsList.Item
      label={<div>Average Page Views</div>}
      value="12"
    />
    <MetricsList.Item
      label={<div>Missing Submissions</div>}
      value="5"
    />
    <MetricsList.Item
      label={<div>Late Submissions</div>}
      value="11"
    />
  </MetricsList>
</ContextView>
```
