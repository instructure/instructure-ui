---
describes: ColorMixer
---

A component for selecting a color. It lets pick from a palette manually or type in an RGBA color.

### Color Mixer

```js
---
render: false
example: true
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

### Color Mixer

```js
---
render: false
example: true
---
class Example extends React.Component {
  render() {
    return (
      <ColorMixer
        disabled
        withAlpha
        value="#38C25494"
         onChange={() => {}}
      />
    );
  }
}

render(<Example />);


```
