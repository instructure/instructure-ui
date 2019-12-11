---
describes: DeprecatedTextInput
id: DeprecatedTextInput__README
---
**DEPRECATED:** TextInput wll be removed from `ui-forms` in version 7.0.0. Use [TextInput](#TextInput) from [ui-text-input](#ui-text-input) instead. Codemods are available to automatically update imports to the new package.
***

`TextInput` renders a custom HTML `input` element. It supports the following types: `text` (default) / `email` / `url` / `tel` / `search` / `password`

```js
---
example: true
---
<DeprecatedTextInput label="Name" placeholder="Doe, John Doe" />
```

A `TextInput` with errors:

```js
---
example: true
---
<DeprecatedTextInput messages={[{ text: 'Invalid name', type: 'error' }]} label="Name" />
```

A disabled `TextInput`:

```js
---
example: true
---
<DeprecatedTextInput disabled label="Name" defaultValue="Charles" />
```

A `TextInput` with an `inline` layout:

```js
---
example: true
---
<DeprecatedTextInput
  label="Name"
  layout="inline"
/>
```

A `TextInput` with a screen reader only label:

```js
---
example: true
---
<DeprecatedTextInput
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
  <DeprecatedTextInput
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
  <DeprecatedTextInput size="small" label="Small-size input" /><br/>
  <DeprecatedTextInput label="Default-size input" /><br/>
  <DeprecatedTextInput size="large" label="Large-size input" />
</div>
```
### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Left align text (exceptions may apply)</Figure.Item>
    <Figure.Item>Place labels on top or to the left (inline)</Figure.Item>
    <Figure.Item>Make placeholder text different than the label</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Place labels to the right of the input</Figure.Item>
    <Figure.Item>Place inputs in the middle of sentences or phrases</Figure.Item>
  </Figure>
</Guidelines>
```
