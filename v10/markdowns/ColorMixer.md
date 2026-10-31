# ColorMixer


A component for selecting a color. It lets pick from a palette manually or type in an RGBA color.

### Color Mixer

- ```js
  class Example extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        value: '#328DCFC2'
      }
    }

    render() {
      return (
        <div>
          <div style={{ display: 'flex' }}>
            <ColorMixer
              withAlpha
              value={this.state.value}
              onChange={(value) => this.setState({ value })}
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
                width: '100px',
                height: '160px',
                borderRadius: '4px',
                backgroundColor: this.state.value,
                marginLeft: '25px',
                boxSizing: 'border-box',
                borderStyle: 'solid',
                borderColor: 'rgba(56, 74, 88, 0.6)'
              }}
            >
              {this.state.value}
            </div>
          </div>
          <div style={{ marginTop: '10px' }}>
            <Button onClick={() => this.setState({ value: '#579b17' })}>
              Jump to #579b17
            </Button>
          </div>
        </div>
      )
    }
  }

  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [value, setValue] = useState('#328DCFC2')

    return (
      <div>
        <div style={{ display: 'flex' }}>
          <ColorMixer
            withAlpha
            value={value}
            onChange={(value) => setValue(value)}
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
              width: '100px',
              height: '160px',
              borderRadius: '4px',
              backgroundColor: value,
              marginLeft: '25px',
              boxSizing: 'border-box',
              borderStyle: 'solid',
              borderColor: 'rgba(56, 74, 88, 0.6)'
            }}
          >
            {value}
          </div>
        </div>
        <div style={{ marginTop: '10px' }}>
          <Button onClick={() => setValue('#579b17')}>Jump to #579b17</Button>
        </div>
      </div>
    )
  }

  render(<Example />)
  ```

### Disabled Color Mixer

```js
---
type: example
---
<ColorMixer
  disabled
  withAlpha
  value="#328DCFC2"
  onChange={() => {}}
  rgbRedInputScreenReaderLabel='Input field for red'
  rgbGreenInputScreenReaderLabel='Input field for green'
  rgbBlueInputScreenReaderLabel='Input field for blue'
  rgbAlphaInputScreenReaderLabel='Input field for alpha'
  colorSliderNavigationExplanationScreenReaderLabel={`You are on a color slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`}
  alphaSliderNavigationExplanationScreenReaderLabel={`You are on an alpha slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`}
  colorPaletteNavigationExplanationScreenReaderLabel={`You are on a color palette. To navigate on the palette up, left, down or right, use the 'W', 'A', 'S' and 'D' buttons respectively`}
/>

```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| ColorMixer | disabled | `boolean` | No | `false` | Makes the component uninteractable |
| ColorMixer | elementRef | `(element: Element \| null) => void` | No | - | Provides a reference to the component's underlying html element. |
| ColorMixer | withAlpha | `boolean` | No | `false` | Toggles alpha. If true, alpha slider will appear |
| ColorMixer | value | `string` | No | `'#000'` | Sets the value of the component. If changes, the color changes inside the component as well |
| ColorMixer | onChange | `(hex: string) => void` | Yes | - | Gets called each time the color changes |
| ColorMixer | rgbRedInputScreenReaderLabel | `string` | Yes | - | screenReaderLabel for the RGBA input's red input field |
| ColorMixer | rgbGreenInputScreenReaderLabel | `string` | Yes | - | screenReaderLabel for the RGBA input's green input field |
| ColorMixer | rgbBlueInputScreenReaderLabel | `string` | Yes | - | screenReaderLabel for the RGBA input's blue input field |
| ColorMixer | rgbAlphaInputScreenReaderLabel | `string` | Yes | - | screenReaderLabel for the RGBA input's alpha input field |
| ColorMixer | colorSliderNavigationExplanationScreenReaderLabel | `string` | Yes | - | screenReaderLabel for the color slider. It should explain how to navigate the slider with the keyboard ('A' for left, 'D' for right) |
| ColorMixer | alphaSliderNavigationExplanationScreenReaderLabel | `string` | Yes | - | screenReaderLabel for the alpha slider. It should explain how to navigate the slider with the keyboard ('A' for left, 'D' for right) |
| ColorMixer | colorPaletteNavigationExplanationScreenReaderLabel | `string` | Yes | - | screenReaderLabel for the color palette. It should explain how to navigate the palette with the keyboard ('W' for up, 'A' for left, 'S' for down and 'D' for right) |

### Usage

Install the package:

```shell
npm install @instructure/ui-color-picker
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { ColorMixer } from '@instructure/ui-color-picker'
```

