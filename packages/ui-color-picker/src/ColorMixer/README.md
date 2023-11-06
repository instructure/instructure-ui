---
describes: ColorMixer
---

A component for selecting a color. It lets pick from a palette manually or type in an RGBA color.

### Color Mixer

```js
---
type: example
---
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "#328DCFC2",
    };
  }

    render() {
      return (
        <div>
          <div style={{ display: "flex" }}>
            <ColorMixer
              withAlpha
              value={this.state.value}
              onChange={(value) => this.setState({ value })}
              rgbRedInputScreenReaderLabel='Input field for red'
              rgbGreenInputScreenReaderLabel='Input field for green'
              rgbBlueInputScreenReaderLabel='Input field for blue'
              rgbAlphaInputScreenReaderLabel='Input field for alpha'
              colorSliderNavigationExplanationScreenReaderLabel={`You are on a color slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`}
              alphaSliderNavigationExplanationScreenReaderLabel={`You are on an alpha slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`}
              colorPaletteNavigationExplanationScreenReaderLabel={`You are on a color palette. To navigate on the palette up, left, down or right, use the 'W', 'A', 'S' and 'D' buttons respectively`}
            />
            <div
              style={{
                width: "100px",
                height: "160px",
                borderRadius: "4px",
                backgroundColor: this.state.value,
                marginLeft: "25px",
                boxSizing: "border-box",
                borderStyle: "solid",
                borderColor: "rgba(56, 74, 88, 0.6)",
              }}
            >
              {this.state.value}
            </div>
          </div>
          <div style={{ marginTop: "10px" }}>
            <Button onClick={() => this.setState({ value: "#579b17" })}>
              Jump to #579b17
            </Button>
          </div>
        </div>
      );
    }
  }

  render(<Example />);


```

- ```js
  const Example = (props) => {
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
