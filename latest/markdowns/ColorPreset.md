# ColorPreset


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


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| ColorPreset | colors | `Array<string>` | Yes | - | Array of HEX strings which are the preset colors. Supports 8 character HEX (with alpha) |
| ColorPreset | disabled | `boolean` | No | `false` | Makes the component uninteractable |
| ColorPreset | elementRef | `(element: Element \| null) => void` | No | - | Provides a reference to the component's underlying html element. |
| ColorPreset | label | `string` | No | - | Label text of the component |
| ColorPreset | colorMixerSettings | `{ /** * screenReaderLabel for the add new preset button */ addNewPresetButtonScreenReaderLabel: string selectColorLabel: string removeColorLabel: string onPresetChange: (colors: ColorPresetOwnProps['colors']) => void popoverAddButtonLabel: string popoverCloseButtonLabel: string maxHeight?: string colorMixer: { withAlpha?: boolean rgbRedInputScreenReaderLabel: string rgbGreenInputScreenReaderLabel: string rgbBlueInputScreenReaderLabel: string rgbAlphaInputScreenReaderLabel: string colorSliderNavigationExplanationScreenReaderLabel: string alphaSliderNavigationExplanationScreenReaderLabel: string colorPaletteNavigationExplanationScreenReaderLabel: string } colorContrast?: { firstColor: string label: string successLabel: string failureLabel: string normalTextLabel: string largeTextLabel: string graphicsTextLabel: string firstColorLabel: string secondColorLabel: string } }` | No | - | If set, a `plus` button will appear for the preset. Those components whose corresponding keys aren't provided (`colorMixer` or `colorContrast`) will not be rendered. The `onPresetChange` function gets called when a color gets added or removed from the preset list. It will be called with the new list of colors |
| ColorPreset | onSelect | `(selected: string) => void` | Yes | - | The function gets called when a color gets selected |
| ColorPreset | popoverScreenReaderLabel | `string` | No | - | Sets the ScreenReaderLabel for the popover |
| ColorPreset | selected | `string` | No | - | The currently selected HEX string |
| ColorPreset | colorScreenReaderLabel | `(hexCode: string, isSelected: boolean) => string` | No | - | A function for formatting the text provided to screen readers about the color. @param {string} hexCode - The hexadecimal color code (e.g., "#FFFFFF") of the current color option. Provided by the component - treat as read-only. @param {boolean} isSelected - Indicates whether this color is currently selected. Provided by the component - treat as read-only. Sets the aria-label attribute of the color. If not set, aria-label defaults to the hex code of the color. |

### Usage

Install the package:

```shell
npm install @instructure/ui-color-picker
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { ColorPreset } from '@instructure/ui-color-picker'
```

