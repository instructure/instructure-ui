---
describes: TextArea
---

TextArea renders a standard HTML `textarea` element. By default, TextArea will
resize to fit its content. Use the `maxHeight` property to set a limit on the
component's height.

```js
---
type: example
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
type: example
---
<TextArea label="Description" resize="vertical" />
```

A `TextArea` with errors:

```js
---
type: example
---
<TextArea messages={[{ text: 'Invalid description', type: 'newError' }]} label="Description" />
```

A disabled `TextArea`:

```js
---
type: example
---
<TextArea label="Description" disabled />
```

A `TextArea` with a screenreader only label:

```js
---
type: example
---
<TextArea
  label={<ScreenReaderContent>Description</ScreenReaderContent>}
  placeholder="describe something"
/>
```

An inline `TextArea` with a fixed width, initial height and maxHeight.

```js
---
type: example
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
type: example
---
  const Example = () => {
    const [description, setDescription] = useState('Hello World')

    const handleChange = (e) => setDescription(e.target.value)

    return (
      <TextArea
        label="Description"
        value={description}
        onChange={handleChange}
      />
    )
  }

  render(<Example />)
```

### Guidelines

```js
---
type: embed
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
type: embed
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
