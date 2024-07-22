---
describes: ColorContrast
---

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
        selectedBackGround: '#35423A'
      }
    }

    render() {
      return (
        <div>
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

    return (
      <div>
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
        />
      </div>
    )
  }

  render(<Example />)
  ```
