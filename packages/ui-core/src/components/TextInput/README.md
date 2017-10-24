---
describes: TextInput
---

`TextInput` renders a custom HTML `input` element.

```js
---
example: true
---
<TextInput label="Name" placeholder="Doe, John Doe" />
```

A `TextInput` with errors:

```js
---
example: true
---
<TextInput messages={[{ text: 'Invalid name', type: 'error' }]} label="Name" />
```

A `TextInput` with an `inline` layout:

```js
---
example: true
---
<TextInput
  label="Name"
  layout="inline"
/>
```

A `TextInput` with a screen reader only label:

```js
---
example: true
---
<TextInput
  label={<ScreenReaderContent>Age</ScreenReaderContent>}
  placeholder="hello world"
/>
```

An inline `TextInput` with a fixed width:

```js
---
example: true
---
<div style={{display: 'flex', alignItems: 'center'}}>
  <TextInput
    label={<ScreenReaderContent>Label</ScreenReaderContent>}
    inline
    width="4em"
  />
  &nbsp;
  <Text>foo</Text>
</div>
```

A `TextInput` as a password field:

```js
---
example: true
---
<TextInput label="Password" type="password" />
```

A text input field next to a [Button](#Button). Note: Form layout components
are coming soon. Please ignore the inline styles in the example.

```js
---
example: true
---
<Grid vAlign="bottom">
  <GridRow>
    <GridCol>
      <TextInput label="Default-size input and button" />
    </GridCol>
    <GridCol>
      <Button>Click me</Button>
    </GridCol>
  </GridRow>
  <GridRow>
    <GridCol>
      <TextInput size="small" label="Small-size input and button" />
    </GridCol>
    <GridCol>
      <Button size="small">Click me</Button>
    </GridCol>
  </GridRow>
  <GridRow>
    <GridCol>
      <TextInput size="large" label="Large-size input and button" />
    </GridCol>
    <GridCol>
      <Button size="large">Click me</Button>
    </GridCol>
  </GridRow>
</Grid>
```
