# ColorContrast


A component for displaying color contrast between two colors. It will perform checks according to the [WCAG 2.1 standard](https://webaim.org/articles/contrast/#ratio), determining if a given contrast ratio is acceptable for `normal`, `large` or `graphics` texts. `normal` needs to be `4.5`, the other two `3`.

### Color Contrast

```js
---
type: example
---
<ColorContrast
  firstColor="#FF0000"
  secondColor="#FFFF00"
  label="Color Contrast Ratio"
  successLabel="PASS"
  failureLabel="FAIL"
  normalTextLabel="Normal text"
  largeTextLabel="Large text"
  graphicsTextLabel="Graphics text"
  firstColorLabel="Background"
  secondColorLabel="Foreground"
/>
```

### In-line Color setting

- ```js
  class Example extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        selectedForeGround: '#0CBF94',
        selectedBackGround: '#35423A',
        validationLevel: 'AA'
      }
    }

    render() {
      return (
        <div>
          <RadioInputGroup
            onChange={(_e, value) => this.setState({ validationLevel: value })}
            name="example1"
            defaultValue="AA"
            description="validationLevel"
          >
            <RadioInput key="AA" value="AA" label="AA" />
            <RadioInput key="AAA" value="AAA" label="AAA" />
          </RadioInputGroup>
          <ColorPreset
            label="Background"
            colors={[
              '#ffffff',
              '#0CBF94',
              '#0C89BF',
              '#BF0C6D',
              '#BF8D0C',
              '#ff0000',
              '#576A66',
              '#35423A',
              '#35423F'
            ]}
            selected={this.state.selectedBackGround}
            onSelect={(selectedBackGround) =>
              this.setState({ selectedBackGround })
            }
          />
          <ColorPreset
            label="Foreground"
            colors={[
              '#ffffff',
              '#0CBF94',
              '#0C89BF',
              '#BF0C6D',
              '#BF8D0C',
              '#ff0000',
              '#576A66',
              '#35423A',
              '#35423F'
            ]}
            selected={this.state.selectedForeGround}
            onSelect={(selectedForeGround) =>
              this.setState({ selectedForeGround })
            }
          />
          <hr style={{ width: '272px', marginLeft: 0 }} />
          <ColorContrast
            withoutColorPreview
            firstColor={this.state.selectedBackGround}
            secondColor={this.state.selectedForeGround}
            label="Contrast Ratio"
            successLabel="PASS"
            failureLabel="FAIL"
            normalTextLabel="Normal text"
            largeTextLabel="Large text"
            graphicsTextLabel="Graphics text"
            validationLevel={this.state.validationLevel}
            onContrastChange={(contrastData) => console.log(contrastData)}
          />
        </div>
      )
    }
  }

  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [selectedForeGround, setSelectedForeGround] = useState('#0CBF94')
    const [selectedBackGround, setSelectedBackGround] = useState('#35423A')
    const [validationLevel, setValidationLevel] = useState('AA')

    return (
      <div>
        <RadioInputGroup
          onChange={(_e, value) => setValidationLevel(value)}
          name="example1"
          defaultValue="AA"
          description="validationLevel"
        >
          <RadioInput key="AA" value="AA" label="AA" />
          <RadioInput key="AAA" value="AAA" label="AAA" />
        </RadioInputGroup>
        <ColorPreset
          label="Background"
          colors={[
            '#ffffff',
            '#0CBF94',
            '#0C89BF',
            '#BF0C6D',
            '#BF8D0C',
            '#ff0000',
            '#576A66',
            '#35423A',
            '#35423F'
          ]}
          selected={selectedBackGround}
          onSelect={(selectedBackGround) =>
            setSelectedBackGround(selectedBackGround)
          }
        />
        <ColorPreset
          label="Foreground"
          colors={[
            '#ffffff',
            '#0CBF94',
            '#0C89BF',
            '#BF0C6D',
            '#BF8D0C',
            '#ff0000',
            '#576A66',
            '#35423A',
            '#35423F'
          ]}
          selected={selectedForeGround}
          onSelect={(selectedForeGround) =>
            setSelectedForeGround(selectedForeGround)
          }
        />
        <hr style={{ width: '272px', marginLeft: 0 }} />
        <ColorContrast
          withoutColorPreview
          firstColor={selectedBackGround}
          secondColor={selectedForeGround}
          label="Contrast Ratio"
          successLabel="PASS"
          failureLabel="FAIL"
          normalTextLabel="Normal text"
          largeTextLabel="Large text"
          graphicsTextLabel="Graphics text"
          validationLevel={validationLevel}
          onContrastChange={(contrastData) => console.log(contrastData)}
        />
      </div>
    )
  }

  render(<Example />)
  ```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| ColorContrast | elementRef | `(element: Element \| null) => void` | No | - | Provides a reference to the component's underlying html element. |
| ColorContrast | failureLabel | `string` | Yes | - | Text of the failure indicator (Suggested english text: FAIL) |
| ColorContrast | firstColor | `string` | Yes | - | The first color to compare (HEX code) |
| ColorContrast | firstColorLabel | `string` | No | - | The name of the first color which will be compared |
| ColorContrast | graphicsTextLabel | `string` | Yes | - | Text of the third check (Suggested english text: Graphics text) |
| ColorContrast | withoutColorPreview | `boolean` | No | `false` | Toggles the color preview part of the component. If true, firstColorLabel and secondColorLabel is not necessary. Otherwise, it is required. |
| ColorContrast | label | `string` | Yes | - | Label of the component |
| ColorContrast | largeTextLabel | `string` | Yes | - | Text of the second check (Suggested english text: Large text) |
| ColorContrast | normalTextLabel | `string` | Yes | - | Text of the first check (Suggested english text: Normal text) |
| ColorContrast | secondColor | `string` | Yes | - | The second color to compare (HEX code) |
| ColorContrast | secondColorLabel | `string` | No | - | The name of the second color which will be compared |
| ColorContrast | successLabel | `string` | Yes | - | Text of the success indicator (Suggested english text: PASS) |
| ColorContrast | onContrastChange | `(conrastData: { contrast: number isValidNormalText: boolean isValidLargeText: boolean isValidGraphicsText: boolean firstColor: string secondColor: string }) => null` | No | - | Triggers a callback whenever the contrast changes, due to a changing color input. Communicates the contrast and the success/fail state of the contrast, depending on the situation: isValidNormalText true if at least 4.5:1 isValidLargeText true if at least 3:1 isValidGraphicsText true if at least 3:1 |
| ColorContrast | validationLevel | `'AA' \| 'AAA'` | No | `'AA'` | According to WCAG 2.2 AA level (https://www.w3.org/TR/WCAG22/#contrast-minimum) text: 4.5:1 large text: 3:1 non-text: 3:1 (https://www.w3.org/TR/WCAG22/#non-text-contrast) AAA level (https://www.w3.org/TR/WCAG22/#contrast-enhanced) text: 7:1 large text: 4.5:1 non-text: 3:1 (https://www.w3.org/TR/WCAG22/#non-text-contrast) |

### Usage

Install the package:

```shell
npm install @instructure/ui-color-picker
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { ColorContrast } from '@instructure/ui-color-picker'
```

