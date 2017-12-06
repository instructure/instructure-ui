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

`TextInput` supports textAlign set to `start` _(default)_ or `center`. Center is ONLY to be used in very specific circumstances that have been directed by design.
```js
---
example: true
---
<Table
  caption={<ScreenReaderContent>Center Align Use Case</ScreenReaderContent>}>
  <thead>
    <tr>
      <th scope="col"><ScreenReaderContent>Band</ScreenReaderContent></th>
      <th scope="col"><ScreenReaderContent>Album</ScreenReaderContent></th>
      <th scope="col"><ScreenReaderContent>Song</ScreenReaderContent></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <TextInput 
          textAlign="center"
          label={<ScreenReaderContent>Best Band</ScreenReaderContent>}
          placeholder="Best Band" />
      </td>
      <td>
        <TextInput 
          textAlign="center"
          label={<ScreenReaderContent>Best Album</ScreenReaderContent>}
          placeholder="Best Album" />
      </td>
      <td>
        <TextInput 
          textAlign="center"
          label={<ScreenReaderContent>Best Song</ScreenReaderContent>}
          placeholder="Best Song" />
      </td>
    </tr>
  </tbody>
</Table>
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
