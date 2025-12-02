# TextInput


`TextInput` is a custom styled `input` element. It supports the following types: `text` (default) / `email` / `url` / `tel` / `search` / `password`

You can see here most of the visual states of the component.

```js
---
type: example
---
  <Flex gap='medium' direction='column'>
    <TextInput
      renderAfterInput={<SVGIcon src={iconExample} />}
      renderBeforeInput={<SVGIcon src={iconExample} />}
      renderLabel='normal'
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
  class ControlledTextInputExample extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        value: 'Supertramp',
        disabled: false,
        readOnly: false,
        inline: false,
        messages: null
      }
    }

    handleChange = (e, value) =>
      this.setState({
        value,
        messages: null
      })

    handleBlur = (e) => {
      if (this.state.value === 'Supertramp') {
        this.setState({
          messages: [
            {
              text: `Come on. There's no way your favorite band is really Supertramp.`,
              type: 'error'
            }
          ]
        })
      }
    }

    toggleDisabled = (e) => this.setState({ disabled: !this.state.disabled })
    toggleReadOnly = (e) => this.setState({ readOnly: !this.state.readOnly })
    toggleInline = (e) => this.setState({ inline: !this.state.inline })

    render() {
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
              interaction={
                this.state.disabled
                  ? 'disabled'
                  : this.state.readOnly
                  ? 'readonly'
                  : 'enabled'
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
            type: 'error'
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
            renderAfterInput={<SVGIcon src={iconExample} />}
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
                    margin="xxx-small xxx-small xxx-small none"
                    onClick={() => console.log(this.state.value)}
                  />
                )}
                <Tag
                  text="Rocky road"
                  margin="xxx-small xxx-small xxx-small none"
                  onClick={() => console.log('Rocky road')}
                />
                <Tag
                  text="Vanilla"
                  margin="xxx-small xxx-small xxx-small none"
                  onClick={() => console.log('Vanilla')}
                />
                <Tag
                  text="Coffee"
                  margin="xxx-small xxx-small xxx-small none"
                  onClick={() => console.log('Coffee')}
                />
                <Tag
                  text="Strawberry"
                  margin="xxx-small xxx-small xxx-small none"
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

```js
---
type: example
---
  const ExtraContentExample = () => {
    const [value, setValue] = useState('')

    const handleChange = (e, value) => setValue(value)

    return (
      <View as="div">
        <TextInput
          renderLabel="What are Paula Panda's favorite ice cream flavors?"
          value={value}
          onChange={handleChange}
          renderBeforeInput={
            <>
              {value !== '' && (
                <Tag
                  text={value}
                  margin="xxx-small xxx-small xxx-small none"
                  onClick={() => console.log(value)}
                />
              )}
              <Tag
                text="Rocky road"
                margin="xxx-small xxx-small xxx-small none"
                onClick={() => console.log('Rocky road')}
              />
              <Tag
                text="Vanilla"
                margin="xxx-small xxx-small xxx-small none"
                onClick={() => console.log('Vanilla')}
              />
              <Tag
                text="Coffee"
                margin="xxx-small xxx-small xxx-small none"
                onClick={() => console.log('Coffee')}
              />
              <Tag
                text="Strawberry"
                margin="xxx-small xxx-small xxx-small none"
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


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| TextInput | renderLabel | `\| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - | The form field label. |
| TextInput | type | `'text' \| 'email' \| 'url' \| 'tel' \| 'search' \| 'password'` | No | `'text'` | Determines the underlying native HTML `<input>` element's `type`. For more see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/url |
| TextInput | id | `string` | No | - | The id of the text input. One is generated if not supplied. |
| TextInput | value | `string` | No | - | the selected value (must be accompanied by an `onChange` prop) |
| TextInput | defaultValue | `string` | No | - | value to set on initial render |
| TextInput | interaction | `InteractionType` | No | `undefined` | Specifies if interaction with the input is enabled, disabled, or readonly. When "disabled", the input changes visibly to indicate that it cannot receive user interactions. When "readonly" the input still cannot receive user interactions but it keeps the same styles as if it were enabled. |
| TextInput | messages | `FormMessage[]` | No | `[]` | Array of objects with shape: `{ text: React.ReactNode, type: One of ['error', 'hint', 'success', 'screenreader-only'] }` |
| TextInput | size | `'small' \| 'medium' \| 'large'` | No | `'medium'` | The size of the text input. |
| TextInput | textAlign | `'start' \| 'center'` | No | `'start'` | The text alignment of the input. |
| TextInput | width | `string` | No | - | The width of the input. |
| TextInput | htmlSize | `number` | No | - | The width of the input (integer value 0 or higher), if a width is not explicitly provided via the `width` prop. Only applicable if `display="inline-block"`. For more see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/size |
| TextInput | display | `'inline-block' \| 'block'` | No | `'block'` | The display of the root element. |
| TextInput | shouldNotWrap | `boolean` | No | `false` | Prevents the default behavior of wrapping the input and rendered content when available space is exceeded. |
| TextInput | placeholder | `string` | No | - | Html placeholder text to display when the input has no value. This should be hint text, not a label replacement. |
| TextInput | isRequired | `boolean` | No | `false` | Whether or not the text input is required. |
| TextInput | elementRef | `(element: Element \| null) => void` | No | - | provides a reference to the underlying html root element |
| TextInput | inputRef | `(inputElement: HTMLInputElement \| null) => void` | No | - | a function that provides a reference to the actual input element |
| TextInput | inputContainerRef | `(element: HTMLSpanElement \| null) => void` | No | - | a function that provides a reference a parent of the input element |
| TextInput | renderBeforeInput | `\| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - | Content to display before the input text, such as an icon |
| TextInput | renderAfterInput | `\| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - | Content to display after the input text, such as an icon |
| TextInput | onChange | `(event: React.ChangeEvent<HTMLInputElement>, value: string) => void` | No | - | Callback executed when the input fires a change event. @param {Object} event - the event object @param {string} value - the string value of the input |
| TextInput | onBlur | `(event: React.FocusEvent<HTMLInputElement>) => void` | No | - | Callback fired when input loses focus. |
| TextInput | onFocus | `(event: React.FocusEvent<HTMLInputElement>) => void` | No | - | Callback fired when input receives focus. |
| TextInput | margin | `Spacing` | No | - | Margin around the component. Accepts a `Spacing` token. See token values and example usage in [this guide](https://instructure.design/#layout-spacing). |

### Usage

Install the package:

```shell
npm install @instructure/ui-text-input
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { TextInput } from '@instructure/ui-text-input'
```

