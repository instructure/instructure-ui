# ColorPicker


The `ColorPicker` is a versatile component that can be used to select colors and check their contrast ratios. It has 2 modes of operation:

- In the simple, color input mode, it lets the user enter hex codes. It will display the color, validate the hex and check the contrast.
- In the more complex, color picker mode, the same functionality is available as for the simpler mode, but there is the option to pick a color from a visual color mixer component or from any other method added in a popover.

The component can be either `uncontrolled` or `controlled`. If the `onChange` and `value` props are used, it will behave in a `controlled` manner, otherwise `uncontrolled`.

### ColorPicker with default popover content

```js
---
type: example
---
<ColorPicker
  label="Color Input"
  tooltip="This is an example"
  placeholderText="Enter HEX"
  popoverButtonScreenReaderLabel="Open color mixer popover"
  withAlpha
  colorMixerSettings={{
    popoverAddButtonLabel: "Add",
    popoverCloseButtonLabel: "Cancel",
    colorMixer: {
      withAlpha: false,
      rgbRedInputScreenReaderLabel:'Input field for red',
      rgbGreenInputScreenReaderLabel:'Input field for green',
      rgbBlueInputScreenReaderLabel:'Input field for blue',
      rgbAlphaInputScreenReaderLabel:'Input field for alpha',
      colorSliderNavigationExplanationScreenReaderLabel:`You are on a color slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`,
      alphaSliderNavigationExplanationScreenReaderLabel:`You are on an alpha slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`,
      colorPaletteNavigationExplanationScreenReaderLabel:`You are on a color palette. To navigate on the palette up, left, down or right, use the 'W', 'A', 'S' and 'D' buttons respectively`
    },
    colorPreset: {
      label: "Choose a nice color",
      colors: [
        "#ffffff",
        "#0CBF94",
        "#0C89BF00",
        "#BF0C6D",
        "#BF8D0C",
        "#ff0000",
        "#576A66",
        "#35423A",
        "#35423F",
      ],
    },
    colorContrast: {
      firstColor: "#FFFF00",
      label: "Color Contrast Ratio",
      successLabel: "PASS",
      failureLabel: "FAIL",
      normalTextLabel: "Normal text",
      largeTextLabel: "Large text",
      graphicsTextLabel: "Graphics text",
      firstColorLabel: "Background",
      secondColorLabel: "Foreground",
    },
  }}
/>
```

### ColorPicker with custom popover content

- ```js
  class Example extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        value: ''
      }
    }
    renderPopoverContent = (value, onChange, handleAdd, handleClose) => (
      <div>
        <div style={{ padding: '20px' }}>
          <ColorMixer
            withAlpha
            value={value}
            onChange={onChange}
            rgbRedInputScreenReaderLabel="Input field for red"
            rgbGreenInputScreenReaderLabel="Input field for green"
            rgbBlueInputScreenReaderLabel="Input field for blue"
            rgbAlphaInputScreenReaderLabel="Input field for alpha"
            colorSliderNavigationExplanationScreenReaderLabel={`You are on a color slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`}
            alphaSliderNavigationExplanationScreenReaderLabel={`You are on an alpha slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`}
            colorPaletteNavigationExplanationScreenReaderLabel={`You are on a color palette. To navigate on the palette up, left, down or right, use the 'W', 'A', 'S' and 'D' buttons respectively`}
          />
          <div
            style={{
              borderTop: 'solid',
              borderWidth: '1px',
              borderColor: '#C7CDD1',
              margin: '20px 0 20px 0'
            }}
          />
          <ColorPreset
            label="Choose a color"
            colors={[
              '#ffffff',
              '#0CBF94',
              '#0C89BF00',
              '#BF0C6D',
              '#BF8D0C',
              '#ff0000',
              '#576A66',
              '#35423A',
              '#35423F'
            ]}
            selected={value}
            onSelect={onChange}
          />
          <div
            style={{
              borderTop: 'solid',
              borderWidth: '1px',
              borderColor: '#C7CDD1',
              margin: '20px 0 20px 0'
            }}
          />
          <ColorContrast
            firstColor="#FFFFFF"
            secondColor={value}
            label="Color Contrast Ratio"
            successLabel="PASS"
            failureLabel="FAIL"
            normalTextLabel="Normal text"
            largeTextLabel="Large text"
            graphicsTextLabel="Graphics text"
            firstColorLabel="Background"
            secondColorLabel="Foreground"
          />
        </div>
        <div
          style={{
            backgroundColor: '#F5F5F5',
            display: 'flex',
            flexDirection: 'row-reverse',
            padding: '7px',
            borderTop: 'solid 1px #C7CDD1'
          }}
        >
          <Button onClick={handleAdd} color="primary" margin="xx-small">
            Add
          </Button>
          <Button onClick={handleClose} color="secondary" margin="xx-small">
            Close
          </Button>
        </div>
      </div>
    )

    render() {
      return (
        <div>
          <ColorPicker
            value={this.state.value}
            onChange={(value) => {
              this.setState({ value })
            }}
            label="Color Input"
            tooltip="This is an example"
            placeholderText="Enter HEX"
            popoverButtonScreenReaderLabel="Open color mixer popover"
          >
            {this.renderPopoverContent}
          </ColorPicker>
        </div>
      )
    }
  }

  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [value, setValue] = useState('')

    const renderPopoverContent = (value, onChange, handleAdd, handleClose) => (
      <div>
        <div style={{ padding: '20px' }}>
          <ColorMixer
            withAlpha
            value={value}
            onChange={onChange}
            rgbRedInputScreenReaderLabel="Input field for red"
            rgbGreenInputScreenReaderLabel="Input field for green"
            rgbBlueInputScreenReaderLabel="Input field for blue"
            rgbAlphaInputScreenReaderLabel="Input field for alpha"
            colorSliderNavigationExplanationScreenReaderLabel={`You are on a color slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`}
            alphaSliderNavigationExplanationScreenReaderLabel={`You are on an alpha slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`}
            colorPaletteNavigationExplanationScreenReaderLabel={`You are on a color palette. To navigate on the palette up, left, down or right, use the 'W', 'A', 'S' and 'D' buttons respectively`}
          />
          <div
            style={{
              borderTop: 'solid',
              borderWidth: '1px',
              borderColor: '#C7CDD1',
              margin: '20px 0 20px 0'
            }}
          />
          <ColorPreset
            label="Choose a color"
            colors={[
              '#ffffff',
              '#0CBF94',
              '#0C89BF00',
              '#BF0C6D',
              '#BF8D0C',
              '#ff0000',
              '#576A66',
              '#35423A',
              '#35423F'
            ]}
            selected={value}
            onSelect={onChange}
          />
          <div
            style={{
              borderTop: 'solid',
              borderWidth: '1px',
              borderColor: '#C7CDD1',
              margin: '20px 0 20px 0'
            }}
          />
          <ColorContrast
            firstColor="#FFFFFF"
            secondColor={value}
            label="Color Contrast Ratio"
            successLabel="PASS"
            failureLabel="FAIL"
            normalTextLabel="Normal text"
            largeTextLabel="Large text"
            graphicsTextLabel="Graphics text"
            firstColorLabel="Background"
            secondColorLabel="Foreground"
          />
        </div>
        <div
          style={{
            backgroundColor: '#F5F5F5',
            display: 'flex',
            flexDirection: 'row-reverse',
            padding: '7px',
            borderTop: 'solid 1px #C7CDD1'
          }}
        >
          <Button onClick={handleAdd} color="primary" margin="xx-small">
            Add
          </Button>
          <Button onClick={handleClose} color="secondary" margin="xx-small">
            Close
          </Button>
        </div>
      </div>
    )

    return (
      <div>
        <ColorPicker
          value={value}
          onChange={(val) => {
            setValue(val)
          }}
          label="Color Input"
          tooltip="This is an example"
          placeholderText="Enter HEX"
          popoverButtonScreenReaderLabel="Open color mixer popover"
        >
          {renderPopoverContent}
        </ColorPicker>
      </div>
    )
  }

  render(<Example />)
  ```

### Complex Color input example

- ```js
  class Example extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        value: '',
        withCheckContrast: undefined,
        contrastStrength: 'mid',
        isStrict: false,
        disabled: false,
        isRequired: false,
        contrastAgainst: '#ffffff',
        colors: [
          '#ffffff',
          '#0CBF94',
          '#0C89BF00',
          '#BF0C6D',
          '#BF8D0C',
          '#ff0000',
          '#576A66',
          '#35423A',
          '#35423F'
        ],
        withAlpha: false
      }
    }

    render() {
      const {
        withCheckContrast,
        contrastStrength,
        isStrict,
        contrastAgainst,
        disabled,
        isRequired,
        withAlpha,
        value
      } = this.state

      return (
        <View as="div">
          <ColorPicker
            onChange={(value) => this.setState({ value })}
            value={value}
            placeholderText="Enter HEX"
            label="Color Input"
            tooltip="This is an example"
            disabled={disabled}
            isRequired={isRequired}
            withAlpha={withAlpha}
            popoverButtonScreenReaderLabel="Open color mixer popover"
            checkContrast={
              withCheckContrast && {
                isStrict,
                contrastStrength,
                contrastAgainst,
                renderContrastErrorMessage: (contrast, minContrast) => [
                  {
                    type: 'error',
                    text: `Not high enough contrast. Minimum required is ${minContrast}:1, current is ${contrast}:1`
                  }
                ]
              }
            }
            renderInvalidColorMessage={(hexCode) => [
              {
                type: 'error',
                text: `Not valid hex color. It should be either 3, 6 or 8 character long.`
              }
            ]}
            renderIsRequiredMessage={() => [
              {
                type: 'error',
                text: `This field is required, please enter a valid hex code`
              }
            ]}
          />
          <hr />
          <FormFieldGroup description="Settings">
            <Checkbox
              label="isRequired"
              value="small"
              variant="toggle"
              size="small"
              inline
              checked={isRequired}
              onChange={() =>
                this.setState({
                  isRequired: !isRequired
                })
              }
            />
            <Checkbox
              label="withAlpha"
              value="small"
              variant="toggle"
              size="small"
              inline
              checked={withAlpha}
              onChange={() =>
                this.setState({
                  withAlpha: !withAlpha,
                  value: value.slice(0, 6)
                })
              }
            />

            <Checkbox
              label="Disabled"
              value="small"
              variant="toggle"
              size="small"
              inline
              checked={disabled}
              onChange={() => this.setState({ disabled: !disabled })}
            />

            <Checkbox
              label="With contrast checking (checkContrast)"
              value="small"
              variant="toggle"
              size="small"
              inline
              checked={withCheckContrast}
              onChange={() =>
                this.setState({ withCheckContrast: !withCheckContrast })
              }
            />

            {withCheckContrast && (
              <FormFieldGroup description="Check contrast options">
                <Checkbox
                  label="isStrict"
                  value="small"
                  variant="toggle"
                  size="small"
                  checked={isStrict}
                  onChange={() => this.setState({ isStrict: !isStrict })}
                />
                <RadioInputGroup
                  name="contrastStrength"
                  description="contrastStrength"
                  layout="columns"
                  value={contrastStrength}
                  onChange={(event, value) =>
                    this.setState({ contrastStrength: value })
                  }
                >
                  <RadioInput label="min (3:1)" value="min" />
                  <RadioInput label="mid (4.5:1)" value="mid" />
                  <RadioInput label="max (7:1)" value="max" />
                </RadioInputGroup>

                <ColorPreset
                  label="contrastAgainst"
                  colors={this.state.colors}
                  selected={this.state.contrastAgainst}
                  onSelect={(contrastAgainst) =>
                    this.setState({ contrastAgainst })
                  }
                />
              </FormFieldGroup>
            )}
          </FormFieldGroup>
        </View>
      )
    }
  }

  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [value, setValue] = useState('')
    const [withCheckContrast, setWithCheckContrast] = useState(undefined)
    const [contrastStrength, setContrastStrength] = useState('mid')
    const [isStrict, setIsStrict] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [isRequired, setIsRequired] = useState(false)
    const [withAlpha, setWithAlpha] = useState(false)
    const [contrastAgainst, setContrastAgainst] = useState('#ffffff')
    const [colors, setColors] = useState([
      '#ffffff',
      '#0CBF94',
      '#0C89BF00',
      '#BF0C6D',
      '#BF8D0C',
      '#ff0000',
      '#576A66',
      '#35423A',
      '#35423F'
    ])

    return (
      <View as="div">
        <ColorPicker
          onChange={(val) => setValue(val)}
          value={value}
          placeholderText="Enter HEX"
          label="Color Input"
          tooltip="This is an example"
          disabled={disabled}
          isRequired={isRequired}
          withAlpha={withAlpha}
          popoverButtonScreenReaderLabel="Open color mixer popover"
          checkContrast={
            withCheckContrast && {
              isStrict,
              contrastStrength,
              contrastAgainst,
              renderContrastErrorMessage: (contrast, minContrast) => [
                {
                  type: 'error',
                  text: `Not high enough contrast. Minimum required is ${minContrast}:1, current is ${contrast}:1`
                }
              ]
            }
          }
          renderInvalidColorMessage={(hexCode) => [
            {
              type: 'error',
              text: `Not valid hex color. It should be either 3, 6 or 8 character long.`
            }
          ]}
          renderIsRequiredMessage={() => [
            {
              type: 'error',
              text: `This field is required, please enter a valid hex code`
            }
          ]}
        />
        <hr />
        <FormFieldGroup description="Settings">
          <Checkbox
            label="isRequired"
            value="small"
            variant="toggle"
            size="small"
            inline
            checked={isRequired}
            onChange={() => setIsRequired(!isRequired)}
          />
          <Checkbox
            label="withAlpha"
            value="small"
            variant="toggle"
            size="small"
            inline
            checked={withAlpha}
            onChange={() => {
              setWithAlpha(!withAlpha)
              setValue(value.slice(0, 6))
            }}
          />

          <Checkbox
            label="Disabled"
            value="small"
            variant="toggle"
            size="small"
            inline
            checked={disabled}
            onChange={() => setDisabled(!disabled)}
          />

          <Checkbox
            label="With contrast checking (checkContrast)"
            value="small"
            variant="toggle"
            size="small"
            inline
            checked={withCheckContrast}
            onChange={() => setWithCheckContrast(!withCheckContrast)}
          />

          {withCheckContrast && (
            <FormFieldGroup description="Check contrast options">
              <Checkbox
                label="isStrict"
                value="small"
                variant="toggle"
                size="small"
                checked={isStrict}
                onChange={() => setIsStrict(!isStrict)}
              />
              <RadioInputGroup
                name="contrastStrength"
                description="contrastStrength"
                layout="columns"
                value={contrastStrength}
                onChange={(_, strength) => setContrastStrength(strength)}
              >
                <RadioInput label="min (3:1)" value="min" />
                <RadioInput label="mid (4.5:1)" value="mid" />
                <RadioInput label="max (7:1)" value="max" />
              </RadioInputGroup>

              <ColorPreset
                label="contrastAgainst"
                colors={colors}
                selected={contrastAgainst}
                onSelect={(val) => setContrastAgainst(val)}
              />
            </FormFieldGroup>
          )}
        </FormFieldGroup>
      </View>
    )
  }

  render(<Example />)
  ```

### Uncontrolled Color Input

```js
---
type: example
---
<div>
  <ColorPicker
    label="Color"
    checkContrast={{
      isStrict: false,
      renderContrastSuccessMessage: () => [
        { type: "success", text: "I am a contrast success message" },
      ],
      renderContrastErrorMessage: () => [
        { type: "error", text: "I am a contrast warning message" },
      ],
    }}
    renderMessages={() => [
      { type: "hint", text: "I can display anything, at any time" },
    ]}
    renderInvalidColorMessage={() => [
      { type: "error", text: "I am an invalid color message" },
    ]}
    renderIsRequiredMessage={() => [
      { type: "error", text: "I am a required message" },
    ]}
    placeholderText="Enter HEX"
  />
</div>

```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| ColorPicker | checkContrast | `{ isStrict?: boolean contrastStrength?: ContrastStrength contrastAgainst?: string renderContrastSuccessMessage?: ( contrast: number, minContrast: number ) => FormMessage[] renderContrastErrorMessage?: ( contrast: number, minContrast: number ) => FormMessage[] }` | No | - | Configures the contrast checker. If not provided, there will be no checking. isStrict: if it's true, it will display an error if false, a warning contrastStrength: can be one of ('min','mid','max'), which translates to 3:1, 4.5:1, 7:1 contrast, defalts to 'mid' contrastAgainst: is the color which the component checks the contrast against. Accepts hex, defaults to #ffffff renderContrastSuccessMessage: if set and the contrast is high enough, it will display the message renderContrastErrorMessage: if set and the contrast is not high enough, it will display the message FormMessage[]: Array of objects with shape: `{ text: ReactNode, type: One of: ['newError', 'error', 'hint', 'success', 'screenreader-only'] }` |
| ColorPicker | colorMixerSettings | `{ popoverAddButtonLabel: string popoverCloseButtonLabel: string colorMixer?: { withAlpha?: boolean rgbRedInputScreenReaderLabel: string rgbGreenInputScreenReaderLabel: string rgbBlueInputScreenReaderLabel: string rgbAlphaInputScreenReaderLabel: string colorSliderNavigationExplanationScreenReaderLabel: string alphaSliderNavigationExplanationScreenReaderLabel: string colorPaletteNavigationExplanationScreenReaderLabel: string } colorPreset?: { colors: Array<string> label: string } colorContrast?: { firstColor: string label: string successLabel: string failureLabel: string normalTextLabel: string largeTextLabel: string graphicsTextLabel: string firstColorLabel: string secondColorLabel: string onContrastChange?: (conrastData: { contrast: number isValidNormalText: boolean isValidLargeText: boolean isValidGraphicsText: boolean firstColor: string secondColor: string }) => null } }` | No | - | If set, the default popover will appear for the picker. Those components whose corresponding keys aren't provided (e.g. `colorMixer`, `colorPreset` or `colorContrast`) will not be rendered. |
| ColorPicker | children | `( value: string, onChange: (hex: string) => void, handleAdd: () => void, handleClose: () => void ) => React.ReactNode` | No | - | If a child function is provided, the component will render it to the popover. |
| ColorPicker | disabled | `boolean` | No | `false` | Sets the input to disabled state |
| ColorPicker | elementRef | `(element: Element \| null) => void` | No | - | provides a reference to the underlying html root element |
| ColorPicker | isRequired | `boolean` | No | - | If true, it will display a red error ring or a message after a blur event and remove it after a change event |
| ColorPicker | label | `string` | Yes | - | The label of the component |
| ColorPicker | onChange | `(value: string) => void` | No | - | If 'value' is set, this must be set. It'll be called on every change |
| ColorPicker | placeholderText | `string` | Yes | - | Placeholder for the input field |
| ColorPicker | popoverScreenReaderLabel | `string` | No | - | Sets the ScreenReaderLabel for the popover |
| ColorPicker | popoverButtonScreenReaderLabel | `string` | No | - | Sets the ScreenReaderLabel for the popover Button |
| ColorPicker | popoverMaxHeight | `string` | No | `'100vh'` | If set, it will set the popover's max height. Useful when the popover is too big |
| ColorPicker | renderInvalidColorMessage | `(hexCode: string) => FormMessage[]` | No | - | If set and the hex is invalid, it will display the message after a blur event and remove it after a change event FormMessage[]: Array of objects with shape: `{ text: ReactNode, type: One of: ['newError', 'error', 'hint', 'success', 'screenreader-only'] }` |
| ColorPicker | renderIsRequiredMessage | `() => FormMessage[]` | No | - | If set, isRequired is true and the input is empty, it will display the message after a blur event and remove it after a change event FormMessage[]: Array of objects with shape: `{ text: ReactNode, type: One of: ['newError', 'error', 'hint', 'success', 'screenreader-only'] }` |
| ColorPicker | renderMessages | `( hexCode: string, isValidHex: boolean, minContrast: number, contrast?: number ) => FormMessage[]` | No | - | If set, it will display the message it returns FormMessage[]: Array of objects with shape: `{ text: ReactNode, type: One of: ['newError', 'error', 'hint', 'success', 'screenreader-only'] }` |
| ColorPicker | tooltip | `React.ReactNode` | No | - | If set, an info icon with a tooltip will be displayed |
| ColorPicker | id | `string` | No | - | The id of the text input. One is generated if not supplied. |
| ColorPicker | value | `string` | No | - | If set, the component will behave as controlled |
| ColorPicker | width | `string` | No | `'22.5rem'` | The width of the input. |
| ColorPicker | withAlpha | `boolean` | No | `false` | If true, alpha slider will be rendered. Defaults to false |
| ColorPicker | margin | `Spacing` | No | - | Margin around the component. Accepts a `Spacing` token. See token values and example usage in [this guide](https://instructure.design/#layout-spacing). |
| ColorPicker | inputRef | `(inputElement: HTMLInputElement \| null) => void` | No | - | A function that provides a reference to the input element |

### Usage

Install the package:

```shell
npm install @instructure/ui-color-picker
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { ColorPicker } from '@instructure/ui-color-picker'
```

