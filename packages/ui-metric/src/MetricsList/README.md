---
describes: MetricsList
---

```js
---
guidelines: true
---
<Guidelines>
  <Figure title="Upgrade Notes for v8.0.0" recommendation="none">
    <Figure.Item>
      <code>MetricsList</code> will be removed from <code>ui-metric</code> in version 8.0.0. Use <Link href="#MetricGroup">MetricGroup</Link> instead
    </Figure.Item>
    <Figure.Item>
      <code>MetricsList.Item</code> will be removed from <code>ui-metric</code> in version 8.0.0. Use <Link href="#Metric">Metric</Link> instead.
    </Figure.Item>
  </Figure>
</Guidelines>
```

The MetricsList component displays MetricsListItems (value + label) in rows.

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
