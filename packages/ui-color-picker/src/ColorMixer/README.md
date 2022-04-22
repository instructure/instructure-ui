---
describes: ColorMixer
---

A component selecting a color. It lets pick from a palette manually or type in an RGBA color.

### Color Mixer

```js
---
render: false
example: true
---
class Example extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: "#ffff00"
    }
  }

  render() {

    return (
      <div>
        <div style={{display:'flex'}}>
          <ColorMixer
          value={this.state.value}
          onChange={(value) => this.setState({ value })} />
          <div style={{
            width:"100px",
            height:"160px",
            borderRadius:"4px",
            backgroundColor:this.state.value,
            marginLeft:"25px",
            boxSizing:"border-box",
            borderStyle:"solid",
            borderColor:"rgba(56, 74, 88, 0.6)"
            }}>{this.state.value}</div>
        </div>
        <div style={{marginTop:'10px'}}>
        <Button onClick={()=>this.setState({value:"#99BBCC"})}>Jump to #99BBCC</Button>
        </div>
      </div>
    );
  }
}

render(<Example />);


```
