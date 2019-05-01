---
describes: TextInput
---
**DEPRECATED:** use the [controlled `TextInput` from ui-text-input](#TextInputControlled) instead.

`TextInput` renders a custom HTML `input` element. It supports the following types: `text` (default) / `email` / `url` / `tel` / `search` / `password`

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

A disabled `TextInput`:

```js
---
example: true
---
<TextInput disabled label="Name" defaultValue="Charles" />
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

An inline `TextInput` with a fixed width. *Note: IE11 needs a `width` prop if
the TextInput is `inline`.*

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

Default is `medium.  As with other form elements, the sizes align with the `Button` options for a nice layout.

```js
---
example: true
---
<div>
  <TextInput size="small" label="Small-size input" /><br/>
  <TextInput label="Default-size input" /><br/>
  <TextInput size="large" label="Large-size input" />
</div>
```
### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <FigureItem>Left align text (exceptions may apply)</FigureItem>
    <FigureItem>Place labels on top or to the left (inline)</FigureItem>
    <FigureItem>Make placeholder text different than the label</FigureItem>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <FigureItem>Place labels to the right of the input</FigureItem>
    <FigureItem>Place inputs in the middle of sentences or phrases</FigureItem>
  </Figure>
</Guidelines>
```
