---
describes: TimeInput
---

A TimeInput component is used to select a time from a list of allowed time values. The
list of possible values can be configured via this component's props.

TimeInput passes most properties through to the underlying [Select](#Select).
It does not pass through `defaultOption` or `selectedOption`.

A TimeInput using just the default values:

```js
---
example: true
---
<div style={{height: 350}}>
  <TimeInput label='Time' />
</div>
```

A TimeInput with a value specified

```js
---
example: true
---
<div style={{height: 350}}>
  <TimeInput
    label='Time' value='1986-05-17T18:00:00.000Z'
    onChange={(e) => {console.log('onChange', e)}}
  />
</div>
```

A TimeInput with step set to 15 and a different format (LTS - includes seconds):

```js
---
example: true
---
<div style={{height: 350}}>
  <TimeInput label='Time' step={15} format='LTS' />
</div>
```

TimeInputs with the current time in different time zones:

```js
---
example: true
---
<div style={{height: 500}}>
  <TimeInput
    label='Eastern'
    value={new Date().toISOString()}
    timezone='US/Eastern'
    onChange={(e) => {console.log('onChange', e)}}
  />
  <TimeInput
    label='Central'
    value={new Date().toISOString()}
    timezone='US/Central'
    onChange={(e) => {console.log('onChange', e)}}
  />
  <TimeInput
    label='Mountain'
    value={new Date().toISOString()}
    timezone='US/Mountain'
    onChange={(e) => {console.log('onChange', e)}}
  />
  <TimeInput
    label='Western'
    value={new Date().toISOString()}
    timezone='US/Pacific'
    onChange={(e) => {console.log('onChange', e)}}
  />
</div>
```

A TimeInput with locale set to French (fr):

```js
---
example: true
---
<div style={{height: 350}}>
  <TimeInput label='Time' locale='fr' />
</div>
```

A TimeInput with no default value and set to default to the first option:

```js
---
example: true
---
<div style={{height: 350}}>
  <TimeInput label='Time' defaultToFirstOption />
</div>
```
