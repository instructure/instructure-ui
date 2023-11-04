---
describes: ColorPreset
---

A component for picking a color from a list of colors. Supports adding new colors either programmatically through the `colors` prop, or manually with the built in color picker.

### Color Preset

```js
---
type: standaloneExample
---
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
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
    };
  }

  render() {
    return (
      <div>
        <ColorPreset
          label="Choose a color"
          colors={this.state.colors}
          selected={this.state.selected}
          onSelect={(selected) => this.setState({ selected })}
        />
      </div>
    );
  }
}


render(<Example />);


```

### Color Preset (with addition, deletion)

```js
---
type: standaloneExample
---
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
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
    };
  }

  render() {
    return (
      <div>
        <ColorPreset
          colors={this.state.colors}
          selected={this.state.selected}
          onSelect={(selected) => this.setState({ selected })}
          colorMixerSettings={{
            addNewPresetButtonScreenReaderLabel:'Add new preset button label',
            selectColorLabel: 'Select',
            removeColorLabel: 'Remove',
            onPresetChange:(colors) => this.setState({ colors }),
            popoverAddButtonLabel: "Add",
            popoverCloseButtonLabel: "Cancel",
            colorMixer:{
              rgbRedInputScreenReaderLabel:'Input field for red',
              rgbGreenInputScreenReaderLabel:'Input field for green',
              rgbBlueInputScreenReaderLabel:'Input field for blue',
              rgbAlphaInputScreenReaderLabel:'Input field for alpha',
              colorSliderNavigationExplanationScreenReaderLabel:`You are on a color slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`,
              alphaSliderNavigationExplanationScreenReaderLabel:`You are on an alpha slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`,
              colorPaletteNavigationExplanationScreenReaderLabel:`You are on a color palette. To navigate on the palette up, left, down or right, use the 'W', 'A', 'S' and 'D' buttons respectively`
            },
            colorContrast:{
                firstColor:"#FF0000",
                label:"Color Contrast Ratio",
                successLabel:"PASS",
                failureLabel:"FAIL",
                normalTextLabel:"Normal text",
                largeTextLabel:"Large text",
                graphicsTextLabel:"Graphics text",
                firstColorLabel:"Background",
                secondColorLabel:"Foreground",
            }
          }}
        />
      </div>
    );
  }
}

render(<Example />);


```
