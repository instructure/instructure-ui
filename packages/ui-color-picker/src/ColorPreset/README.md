---
describes: ColorPreset
---

A component for picking a color from a list of colors. Supports adding new colors either programatically through the `colors` prop, or manually with the built in color picker.

### Color Preset

```js
---
render: false
example: true
---
class Example extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selected: "",
      colors: ['#ffffff', '#0CBF94', '#0C89BF00', '#BF0C6D', '#BF8D0C', '#ff0000', '#576A66', '#35423A', '#35423F']
    }
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
render: false
example: true
---
class Example extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selected: "",
      colors: ['#ffffff', '#0CBF94', '#0C89BF00', '#BF0C6D', '#BF8D0C', '#ff0000', '#576A66', '#35423A', '#35423F']
    }
  }

  render() {


    return (
      <div>
        <ColorPreset
        colors={this.state.colors}
        selected={this.state.selected}
        onSelect={(selected) => this.setState({ selected })}
        onPresetChange={(colors) => this.setState({ colors })}
      />
      </div>
    );
  }
}

render(<Example />);


```
