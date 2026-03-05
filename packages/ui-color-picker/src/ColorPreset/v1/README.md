---
describes: ColorPreset
---

A component for picking a color from a list of colors. Supports adding new colors either programmatically through the `colors` prop, or manually with the built in color picker.

### Color Preset

```js
---
type: example
---
  const Example = () => {
    const [selected, setSelected] = useState('')
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
      <div>
        <ColorPreset
          label="Choose a color"
          colors={colors}
          selected={selected}
          onSelect={setSelected}
          colorScreenReaderLabel={(hexCode, isSelected) => {
            return `color with hex code ${hexCode}${
              isSelected ? ' selected' : ''
            }`
          }}
        />
      </div>
    )
  }

  render(<Example />)
```

### Color Preset (with addition, deletion)

```js
---
type: example
---
  const Example = () => {
    const [selected, setSelected] = useState('')
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
      <div>
        <ColorPreset
          colors={colors}
          selected={selected}
          onSelect={setSelected}
          colorMixerSettings={{
            addNewPresetButtonScreenReaderLabel: 'Add new preset button label',
            selectColorLabel: 'Select',
            removeColorLabel: 'Remove',
            onPresetChange: setColors,
            popoverAddButtonLabel: 'Add',
            popoverCloseButtonLabel: 'Cancel',
            colorMixer: {
              rgbRedInputScreenReaderLabel: 'Input field for red',
              rgbGreenInputScreenReaderLabel: 'Input field for green',
              rgbBlueInputScreenReaderLabel: 'Input field for blue',
              rgbAlphaInputScreenReaderLabel: 'Input field for alpha',
              colorSliderNavigationExplanationScreenReaderLabel: `You are on a color slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`,
              alphaSliderNavigationExplanationScreenReaderLabel: `You are on an alpha slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`,
              colorPaletteNavigationExplanationScreenReaderLabel: `You are on a color palette. To navigate on the palette up, left, down or right, use the 'W', 'A', 'S' and 'D' buttons respectively`
            },
            colorContrast: {
              firstColor: '#FF0000',
              label: 'Color Contrast Ratio',
              successLabel: 'PASS',
              failureLabel: 'FAIL',
              normalTextLabel: 'Normal text',
              largeTextLabel: 'Large text',
              graphicsTextLabel: 'Graphics text',
              firstColorLabel: 'Background',
              secondColorLabel: 'Foreground'
            }
          }}
          colorScreenReaderLabel={(hexCode, isSelected) => {
            return `color with hex code ${hexCode}${
              isSelected ? ' selected' : ''
            }`
          }}
        />
      </div>
    )
  }

  render(<Example />)
```
