---
describes: TextArea
---

Standard HTML `textarea` element (resizable). Note the default `stacked` label &gt; input
layout, and the alternate `inline` layout.

```js
---
example: true
---
<FormFieldGroup description={<ScreenReaderContent>TextArea examples</ScreenReaderContent>}>
  <TextArea label="Description" resize="vertical" />
  <TextArea label="Description" resize="vertical" layout="inline" />
</FormFieldGroup>
```

A `textarea` with errors:

```js
---
example: true
---
<TextArea messages={[{ text: 'Invalid description', type: 'error' }]} label="Description" />
```

A `textarea` with a screenreader only label:

```js
---
example: true
---
<TextArea
  label={<ScreenReaderContent>Description</ScreenReaderContent>}
  placeholder="describe something"
/>
```

An inline `textarea` with a fixed width, initial height and maxHeight.
*Note: IE11 needs a `width` prop if the TextArea is `inline`.*

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
  &nbsp;
  <Text>foo</Text>
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
