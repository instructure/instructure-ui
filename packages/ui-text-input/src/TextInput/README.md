---
describes: TextInput
---

`TextInput` is a custom styled `input` element. It supports the following types: `text` (default) / `email` / `url` / `tel` / `search` / `password`

### Uncontrolled TextInput

```js
---
example: true
---
<TextInput
  renderLabel="Name"
  placeholder="Doe, John Doe"
  onChange={(event, value) => { console.log(value) }}
/>
```

#### Controlled TextInput

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
            label="inline display"
            onChange={this.toggleInline}
          />
        </FormFieldGroup>
        <View display="block" margin="medium 0 0">
          <TextInput
            renderLabel="What is your favorite band?"
            display={this.state.inline ? 'inline-block' : null}
            value={this.state.value}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            interaction={this.state.disabled
              ? 'disabled'
              : this.state.readOnly ? 'readonly' : 'enabled'
            }
            messages={this.state.messages}
            renderAfterInput={<SVGIcon src={iconExample} />}
          />
        </View>
      </div>
    )
  }
}

render(<ControlledTextInputExample />)
```

### Prepending and appending content

TextInput accepts focusable and non-focusable content before and/or after
the input text. A common use case is adding an icon or avatar to the input.
Focusable content will be focused separately from the input itself.

> Note: For any content larger than an icon or small avatar (multiple [Tags](#Tag), for example),
> use the `renderBeforeInput` property.

```javascript
---
example: true
render: false
---
class ExtraContentExample extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: ''
    }
  }

  handleChange = (e, value) => this.setState({ value })

  render () {
    return (
      <View as="div">
        <TextInput
          renderLabel="What are Paula Panda's favorite ice cream flavors?"
          value={this.state.value}
          onChange={this.handleChange}
          renderBeforeInput={
            <View display="block" padding="xxx-small 0">
              {
                (this.state.value !== '') &&
                <Tag
                  text={this.state.value}
                  margin="xxx-small xxx-small xxx-small none"
                  onClick={function () {
                    console.log(this.state.value)
                  }}
                />
              }
              <Tag
                text="Rocky road"
                margin="xxx-small xxx-small xxx-small none"
                onClick={function () {
                  console.log('Rocky road')
                }}
              />
              <Tag
                text="Vanilla"
                margin="xxx-small xxx-small xxx-small none"
                onClick={function () {
                  console.log('Vanilla')
                }}
              />
              <Tag
                text="Coffee"
                margin="xxx-small xxx-small xxx-small none"
                onClick={function () {
                  console.log('Coffee')
                }}
              />
              <Tag
                text="Strawberry"
                margin="xxx-small xxx-small xxx-small none"
                onClick={function () {
                  console.log('Strawberry')
                }}
              />
            </View>
          }
          renderAfterInput={() => <Avatar name="Paula Panda" src={avatarSquare} size="x-small" />}
        />
      </View>
    )
  }
}

render(<ExtraContentExample />)
```

### Setting width and display

To make the component display inline, set the `display` property to `inline-block`. To constrain the
size of the component, use `width`.

```js
---
example: true
---
<div>
  <TextInput
    renderLabel={<ScreenReaderContent>I am a hidden label</ScreenReaderContent>}
    display="inline-block"
    width="4rem"
  />
  &nbsp;
  <Button>I Am Inline Content</Button>
</div>
```

### `shouldNotWrap`

If there is content rendered before the input (via `renderBeforeInput`), the
input will wrap to a new line when the browser determines it does
not have enough room (for most browsers, this is 20 characters). Wrapping allows
the component to accommodate large lists of [Tags](#Tag), for example.

If not desired, this behavior can be overridden by setting the `shouldNotWrap`
boolean prop to `true`.

```js
---
example: true
---
<View as="div" maxWidth="250px">
  <TextInput
    renderLabel="I will not wrap"
    renderBeforeInput={<IconSearchLine inline={false} />}
    renderAfterInput={<Avatar name="Paula Panda" src={avatarSquare} size="x-small" />}
    shouldNotWrap
  />
  <View as="div" margin="medium none none">
    <TextInput
      renderLabel="I will wrap"
      renderBeforeInput={
        <div>
          <Tag
            text="English 101"
            margin="xx-small xxx-small"
          />
          <Tag
            text="History 205"
            margin="xx-small xxx-small"
          />
        </div>
      }
      renderAfterInput={<Avatar name="Paula Panda" src={avatarSquare} size="x-small" />}
    />
  </View>
</View>
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
