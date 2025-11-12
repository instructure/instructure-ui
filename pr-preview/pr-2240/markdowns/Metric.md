# Metric


### Upgrade Guide for V12

> - theme variable `padding` is now removed, left-right padding can be set now with the `paddingHorizontal` theme variable
> - theme variable `fontFamily` is now removed, font can be set independently on the value and label elements using the `valueFontFamily` and `labelFontFamily` variables respectively

The Metric component displays 'value' and 'label'. The default alignment is 'center'.

```javascript
---
type: example
---
  <Metric textAlign="start" renderLabel="Grade" renderValue="80%" />
```

The Metric component can be set to align 'start'.

```javascript
---
type: example
---
  <Metric renderLabel="Grade" renderValue="80%" />
```

The Metric component can be set to align 'end'.

```javascript
---
type: example
---
  <Metric textAlign="end" renderLabel="Grade" renderValue="80%" />
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Metric | textAlign | `'start' \| 'center' \| 'end'` | No | - |  |
| Metric | renderLabel | `\| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - |  |
| Metric | renderValue | `\| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - |  |
| Metric | isGroupChild | `boolean` | No | - | Set to true when a child of MetricGroup so the appropriate aria labels get set |

### Usage

Install the package:

```shell
npm install @instructure/ui-metric
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Metric } from '@instructure/ui-metric'
```

