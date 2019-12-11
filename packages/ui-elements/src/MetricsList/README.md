---
describes: DeprecatedMetricsList
id: DeprecatedMetricsList__README
---

**DEPRECATED:** MetricsList will be removed from `ui-elements` in version 7.0.0. Use the [MetricsList](#MetricsList) from [ui-metric](#ui-metric) instead. Codemods are available to automatically update imports to the new package.
***

The MetricsList component displays metrics (value + label) in rows.

```js
---
example: true
---
<DeprecatedMetricsList>
  <DeprecatedMetricsList.Item label="Grade" value="80%" />
  <DeprecatedMetricsList.Item label="Late" value="4" />
  <DeprecatedMetricsList.Item label="Missing" value="2" />
</DeprecatedMetricsList>
```

```js
---
example: true
---
<ContextView padding="small" placement="center start">
  <DeprecatedMetricsList>
    <DeprecatedMetricsList.Item
      label={<div>Average Grade<div>High 33%, Low 10%</div></div>}
      value="25%"
    />
    <DeprecatedMetricsList.Item
      label={<div>Average Page Views</div>}
      value="12"
    />
    <DeprecatedMetricsList.Item
      label={<div>Missing Submissions</div>}
      value="5"
    />
    <DeprecatedMetricsList.Item
      label={<div>Late Submissions</div>}
      value="11"
    />
  </DeprecatedMetricsList>
</ContextView>
```
