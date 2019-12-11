---
describes: DeprecatedTextArea
id: DeprecatedTextArea__README
---
**DEPRECATED:** TextArea will be removed from `ui-forms` in version 7.0.0. Use the [TextArea](#TextArea) from [ui-text-area](#ui-text-area) instead. Codemods are available to automatically update imports to the new package.
***

TextArea renders a standard HTML `textarea` element. By default, TextArea will
resize to fit its content. Use the `maxHeight` property to set a limit on the
component's height.

```js
---
example: true
---
<div>
  <DeprecatedTextArea
    label="Enter/delete text to see TextArea resize"
  />
  <br />
  <DeprecatedTextArea
    label="I can't go any higher than 10rem (160px)"
    maxHeight="10rem"
  />
</div>
```

To allow the user to manually resize TextArea (in supported browsers), use the `resize` property.

```js
---
example: true
---
<FormFieldGroup description={<ScreenReaderContent>TextArea examples</ScreenReaderContent>}>
  <DeprecatedTextArea label="Description" resize="vertical" />
  <DeprecatedTextArea label="Description" resize="vertical" layout="inline" />
</FormFieldGroup>
```

A `TextArea` with errors:

```js
---
example: true
---
<DeprecatedTextArea
  messages={[{ text: 'Invalid description', type: 'error' }]} label="Description" />
```

A disabled `textarea`:

```js
---
example: true
---
<DeprecatedTextArea label="Description" defaultValue="Nice" disabled />
```

A `TextArea` with a screenreader only label:

```js
---
example: true
---
<DeprecatedTextArea
  label={<ScreenReaderContent>Description</ScreenReaderContent>}
  placeholder="describe something"
/>
```

An inline `TextArea` with a fixed width, initial height and maxHeight.
*Note: IE11 needs a `width` prop if the TextArea is `inline`.*

```js
---
example: true
---
<div style={{ display: 'flex', alignItems: 'center' }}>
  <DeprecatedTextArea
    label={<ScreenReaderContent>Label</ScreenReaderContent>}
    inline
    width="10em"
    height="10em"
    maxHeight="250px"
  />
</div>
```

A 'controlled' TextArea:

```js
---
render: false
example: true
---

class Example extends React.Component {
  state = { description: 'Hello World' };

  handleChange = (e) => this.setState({ description: e.target.value});

  render () {
    return (
      <DeprecatedTextArea
        label="Description"
        value={this.state.description}
        onChange={this.handleChange}
      />
    )
  }
}

render(<Example/>)
```
### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Align text to the left</Figure.Item>
    <Figure.Item>Place labels on top or to the left (inline)</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Repeat label text if using placeholder text</Figure.Item>
    <Figure.Item>Use for rich text editing</Figure.Item>
    <Figure.Item>Allow resizing of the TextArea to break the layout of a page</Figure.Item>
    <Figure.Item>Place labels to the right of the TextArea</Figure.Item>
  </Figure>
</Guidelines>
```
