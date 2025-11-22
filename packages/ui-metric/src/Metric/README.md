---
describes: Metric
---

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
