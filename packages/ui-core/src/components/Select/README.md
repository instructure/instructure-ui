---
describes: Select
---

An accessible, custom styled HTML Select component.

### Select size variants

Default is `medium`.

```js
---
example: true
---
<div>
  <Select size="small" label="Small">
    <option value="foo">Foo</option>
    <option disabled value="bar">Bar</option>
  </Select>
  <br />
  <Select label="Medium">
    <option value="foo">Foo</option>
    <option disabled value="bar">Bar</option>
  </Select>
  <br />
  <Select size="large" label="Large">
    <option value="foo">Foo</option>
    <option disabled value="bar">Bar</option>
  </Select>
</div>
```

### Select with the `layout` prop set to `inline`

```js
---
example: true
---
<Select label="Inline select" layout="inline">
  <option value="foo">Foo</option>
  <option disabled value="bar">Bar</option>
</Select>
```

### Select with messages

```js
---
example: true
---
<div>
  <Select
    layout="inline"
    label="Choose a snack"
    messages={[{ text: 'You need to make a selection', type: 'error' }]}>
    <option value="apples">Apples</option>
    <option value="oranges">Oranges</option>
    <option value="bananas">Bananas</option>
    <option value="candy" disabled>Candy</option>
  </Select>
  <br />
  <Select
    layout="inline"
    label="Choose a snack"
    messages={[{ text: 'Great job choosing something healthy!', type: 'success' }]}>
    <option value="apples">Apples</option>
    <option value="oranges">Oranges</option>
    <option value="bananas">Bananas</option>
    <option value="candy" disabled>Candy</option>
  </Select>
</div>
```

### Select with the label visible only to screenreaders

```js
---
example: true
---
<Select label={<ScreenReaderContent>What would you like for a snack?</ScreenReaderContent>}>
  <option value="apples">Apples</option>
  <option value="oranges">Oranges</option>
  <option value="bananas">Bananas</option>
  <option value="candy" disabled>Candy</option>
</Select>
```

### Disabled Selects

```js
---
example: true
---
<div>
  <Select disabled label="What would you like for a snack?" inline>
    <option value="apples">Apples</option>
    <option value="oranges">Oranges</option>
    <option value="bananas">Bananas</option>
    <option value="candy" disabled>Candy</option>
  </Select>
  &nbsp;
  <Select disabled label="How many?" inline>
    <option value=""></option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
  </Select>
</div>
```
