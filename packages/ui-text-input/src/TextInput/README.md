---
describes: TextInput
---

`TextInput` is a custom styled `input` element. It supports the following types: `text` (default) / `email` / `url` / `tel` / `search` / `password`

### Uncontrolled TextInput

```js
---
type: example
---
<TextInput
  renderLabel="Name"
  placeholder="Doe, John Doe"
  onChange={(event, value) => { console.log(value) }}
/>
```

#### Controlled TextInput

```js
---
type: example
---
  const ControlledTextInputExample = () => {
    const [value, setValue] = useState('Supertramp')
    const [disabled, setDisabled] = useState(false)
    const [readOnly, setReadOnly] = useState(false)
    const [inline, setInline] = useState(false)
    const [messages, setMessages] = useState(null)

    const handleChange = (e, value) => {
      setValue(value)
      setMessages(null)
    }

    const handleBlur = (e) => {
      if (value === 'Supertramp') {
        setMessages([
          {
            text: "Come on. There's no way your favorite band is really Supertramp.",
            type: 'newError'
          }
        ])
      }
    }

    const toggleDisabled = () => setDisabled((prev) => !prev)
    const toggleReadOnly = () => setReadOnly((prev) => !prev)
    const toggleInline = () => setInline((prev) => !prev)

    return (
      <div>
        <FormFieldGroup
          description="Controlled TextInput state"
          layout="columns"
        >
          <Checkbox
            checked={disabled}
            label="disabled"
            onChange={toggleDisabled}
          />
          <Checkbox
            checked={readOnly}
            label="readOnly"
            onChange={toggleReadOnly}
          />
          <Checkbox
            checked={inline}
            label="inline display"
            onChange={toggleInline}
          />
        </FormFieldGroup>
        <View display="block" margin="medium 0 0">
          <TextInput
            renderLabel="What is your favorite band?"
            display={inline ? 'inline-block' : null}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            interaction={
              disabled ? 'disabled' : readOnly ? 'readonly' : 'enabled'
            }
            messages={messages}
            renderAfterInput={<HeartInstUIIcon />}
          />
        </View>
      </div>
    )
  }

  render(<ControlledTextInputExample />)
```

### Prepending and appending content

TextInput accepts focusable and non-focusable content before and/or after
the input text. A common use case is adding an icon or avatar to the input.
Focusable content will be focused separately from the input itself.

```js
---
type: example
---
  class ExtraContentExample extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        value: ''
      }
    }

    handleChange = (e, value) => this.setState({ value })

    render() {
      return (
        <View as="div">
          <TextInput
            renderLabel="What are Paula Panda's favorite ice cream flavors?"
            value={this.state.value}
            onChange={this.handleChange}
            renderBeforeInput={
              <>
                {this.state.value !== '' && (
                  <Tag
                    text={this.state.value}
                    margin="xxx-small xx-small xxx-small none"
                    onClick={() => console.log(this.state.value)}
                  />
                )}
                <Tag
                  text="Rocky road"
                  margin="xxx-small xx-small xxx-small none"
                  onClick={() => console.log('Rocky road')}
                />
                <Tag
                  text="Vanilla"
                  margin="xxx-small xx-small xxx-small none"
                  onClick={() => console.log('Vanilla')}
                />
                <Tag
                  text="Coffee"
                  margin="xxx-small xx-small xxx-small none"
                  onClick={() => console.log('Coffee')}
                />
                <Tag
                  text="Strawberry"
                  margin="xxx-small xx-small xxx-small none"
                  onClick={() => console.log('Strawberry')}
                />
              </>
            }
            renderAfterInput={() => (
              <Avatar name="Paula Panda" src={avatarSquare} size="x-small" />
            )}
          />
        </View>
      )
    }
  }

  render(<ExtraContentExample />)
```

Another common usecase is to add an `IconButton` at the end of a TextInput, e.g. for revealing the content of a password field. In these cases, please use the `withBorder={false}` and `withBackground={false}` props for the IconButton.

```js
---
type: example
---
const InputsWithButtonsExample = () => {
  const [passwordValue, setPasswordValue] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  return (
    <TextInput
      renderLabel="Password"
      type={showPassword ? 'text' : 'password'}
      placeholder="Find something..."
      value={passwordValue}
      onChange={(e, newValue) => setPasswordValue(newValue)}
      renderAfterInput={
        <IconButton withBorder={false} withBackground={false} onClick={() => setShowPassword(prevState => !prevState)} screenReaderLabel={showPassword ? 'Hide password' : 'Show password'}>
          {showPassword ? <IconOffLine/> : <IconEyeLine/>}
        </IconButton>
      }
    />
  )
}
render(<InputsWithButtonsExample />)
```

### Setting width and display

To make the component display inline, set the `display` property to `inline-block`. To constrain the
size of the component, use `width`.

```js
---
type: example
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
the component to accommodate large lists of [Tags](Tag), for example.

If not desired, this behavior can be overridden by setting the `shouldNotWrap`
boolean prop to `true`.

```js
---
type: example
---
<View as="div" maxWidth="250px">
  <TextInput
    renderLabel="I will not wrap"
    renderBeforeInput={() => (<IconSearchLine inline={false} />)}
    renderAfterInput={<Avatar name="Paula Panda" src={avatarSquare} size="x-small" />}
    shouldNotWrap
  />
  <View as="div" margin="medium none none">
    <TextInput
      renderLabel="I will wrap"
      renderBeforeInput={
        <>
          <Tag
            text="English 101"
            margin="xx-small xxx-small"
          />
          <Tag
            text="History 205"
            margin="xx-small xxx-small"
          />
        </>
      }
      renderAfterInput={<Avatar name="Paula Panda" src={avatarSquare} size="x-small" />}
    />
  </View>
</View>
```

You can see here most of the visual states of the component:

```js
---
type: example
---
  <Flex gap='medium' direction='column'>
    <TextInput
      size="small"
      renderAfterInput={<AlarmClockInstUIIcon />}
      renderBeforeInput={<AlarmClockInstUIIcon />}
      renderLabel='small'
      placeholder="placeholder"
    />
    <TextInput
      renderAfterInput={<AlarmClockInstUIIcon />}
      renderBeforeInput={<AlarmClockInstUIIcon />}
      renderLabel='normal'
      placeholder="placeholder"
    />
    <TextInput
      size="large"
      renderAfterInput={<AlarmClockInstUIIcon />}
      renderBeforeInput={<AlarmClockInstUIIcon />}
      renderLabel='large'
      placeholder="placeholder"
    />
    <TextInput
      interaction='disabled'
      renderLabel='disabled'
      placeholder="placeholder"
    />
    <TextInput
      interaction='readonly'
      renderLabel='readonly'
      placeholder="placeholder"
    />
    <TextInput
      renderLabel='with error message'
      placeholder="placeholder"
      messages={[{ text: 'This is an error.', type: 'error' }]}
    />
    <TextInput
      renderLabel='with success message'
      placeholder="placeholder"
      messages={[{ text: 'Great success!', type: 'success' }]}
    />
    <TextInput
      renderLabel='large size (default is "medium")'
      placeholder="placeholder"
      size='large'
    />
    <TextInput
      renderLabel='small size (default is "medium")'
      placeholder="placeholder"
      size='small'
    />
  </Flex>
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Left align text (exceptions may apply)</Figure.Item>
    <Figure.Item>Place labels on top or to the left (inline)</Figure.Item>
    <Figure.Item>Make placeholder text different than the label</Figure.Item>
    <Figure.Item>Use React fragments for <code>renderBeforeInput</code>. This will nicely float the text input box to the remaining space</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Place labels to the right of the input</Figure.Item>
    <Figure.Item>Place inputs in the middle of sentences or phrases</Figure.Item>
  </Figure>
</Guidelines>
```
