---
describes: TextInputControlled
id: TextInputControlled__README
---

A **controlled-only** version of [`TextInput`](#TextInput): You must pass event handlers if you want it to respond to user input.

TextInputControlled supports the following types: `text` (default) / `email` / `url` / `tel` / `search` / `password`

```javascript
---
example: true
render: false
---
class ControlledTextInputExample extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: 'Supertramp',
      disabled: false,
      readOnly: false,
      inline: false,
      messages: null
    }
  }

  handleChange = (e, value) => this.setState({
    value,
    messages: null
  })

  handleBlur = (e) => {
    if (this.state.value === 'Supertramp') {
      this.setState({
        messages: [{ text: `Come on. There's no way your favorite band is really Supertramp.`, type: 'error' }]
      })
    }
  }

  toggleDisabled = (e) => this.setState(({ disabled: !this.state.disabled }))
  toggleReadOnly = (e) => this.setState(({ readOnly: !this.state.readOnly }))
  toggleInline = (e) => this.setState(({ inline: !this.state.inline }))

  render () {
    return (
      <div>
        <FormFieldGroup
          description="Controlled TextInput state"
          layout="columns"
        >
          <Checkbox
            checked={this.state.disabled}
            label="disabled"
            onChange={this.toggleDisabled}
          />
          <Checkbox
            checked={this.state.readOnly}
            label="readOnly"
            onChange={this.toggleReadOnly}
          />
          <Checkbox
            checked={this.state.inline}
            label="inline layout"
            onChange={this.toggleInline}
          />
        </FormFieldGroup>
        <View display="block" margin="medium 0 0">
          <TextInputControlled
            label="What is your favorite band?"
            value={this.state.value}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            disabled={this.state.disabled}
            readOnly={this.state.readOnly}
            layout={this.state.inline ? 'inline' : 'stacked'}
            messages={this.state.messages}
            renderAfterInput={() => <SVGIcon src={iconExample} />}
            width="15rem"
          />
        </View>
      </div>
    )
  }
}

render(<ControlledTextInputExample />)
```

To make the component display inline, set the `inline` boolean property. To constrain the
size of the input itself, use `width`.

> Note: IE11 needs a `width` prop if the TextInput is `inline`.

```js
---
example: true
---
<div>
  <TextInputControlled
    label="I am a fairly long label"
    inline
    width="4rem"
  />
  &nbsp;
  <Text>I am inline content</Text>
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
