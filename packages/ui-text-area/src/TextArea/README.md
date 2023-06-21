---
describes: TextArea
---

TextArea renders a standard HTML `textarea` element. By default, TextArea will
resize to fit its content. Use the `maxHeight` property to set a limit on the
component's height.

```js
---
example: true
---
<div>
  <TextArea
    label="Enter/delete text to see TextArea resize"
  />
  <br />
  <TextArea
    label="I can't go any higher than 10rem (160px)"
    maxHeight="10rem"
  />
</div>
```

To allow the user to manually resize TextArea (in supported browsers), use the
`resize` property.

```js
---
example: true
---
<TextArea label="Description" resize="vertical" />
```

A `TextArea` with errors:

```js
---
example: true
---
<TextArea messages={[{ text: 'Invalid description', type: 'error' }]} label="Description" />
```

A disabled `TextArea`:

```js
---
example: true
---
<TextArea label="Description" disabled />
```

A `TextArea` with a screenreader only label:

```js
---
example: true
---
<TextArea
  label={<ScreenReaderContent>Description</ScreenReaderContent>}
  placeholder="describe something"
/>
```

An inline `TextArea` with a fixed width, initial height and maxHeight.

```js
---
example: true
---
<div style={{ display: 'flex', alignItems: 'center' }}>
  <TextArea
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
      <TextArea
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
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Repeat label text if using placeholder text</Figure.Item>
    <Figure.Item>Use for rich text editing</Figure.Item>
    <Figure.Item>Allow resizing of the TextArea to break the layout of a page</Figure.Item>
    <Figure.Item>Place labels to the right of the TextArea</Figure.Item>
  </Figure>
</Guidelines>
```

```js
---
guidelines: true
---
<Guidelines>
  <Alert
    variant="info"
    margin="small"
  >
    Every non-listed prop will be passed down to the underlying 'textarea' element, such as 'onBlur' and any other prop
  </Alert>
</Guidelines>
```
