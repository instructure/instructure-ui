---
describes: ColorPicker
---

The `ColorPicker` can be used in color input or full color picker mode.
In color input mode ( `simpleView` prop set to `true`), it lets the user enter hex codes. It will display the color, validate the hex or check the contrast.
The component can be either `uncontrolled` or `controlled`. If the `onChange` and `value` props are used, it will behave in a `controlled` manner, otherwise `uncontrolled`.

### Color Input

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
         <ColorPicker
          label="Color Input"
          tooltip="This is an example"
          placeholderText="Enter HEX"
          simpleView={false}
        />
    );
  }
}

render(<Example />);


```

### Controlled Color Input

```js
---
render: false
example: true
---
class Example extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value:"",
      withCheckContrast: false,
      contrastStrength: "mid",
      isStrict: false,
      disabled: false,
      isRequired: false,
      contrastAgainst: "#ffffff",
      colors: ['#ffffff', '#0CBF94', '#0C89BF00', '#BF0C6D', '#BF8D0C', '#ff0000', '#576A66', '#35423A', '#35423F']
    };
  }

  render() {
    const {
      withCheckContrast,
      contrastStrength,
      isStrict,
      contrastAgainst,
      disabled,
      isRequired,
    } = this.state;

    return (
      <View as="div">
        <ColorPicker
          onChange={(value)=>this.setState({value})}
          value={this.state.value}
          placeholderText="Enter HEX"
          label="Color Input"
          tooltip="This is an example"
          disabled={disabled}
          isRequired={isRequired}
          checkContrast={
            withCheckContrast
              ? {
                  isStrict,
                  contrastStrength,
                  contrastAgainst,
                  renderContrastErrorMessage: (contrast, minContrast) => [
                    {
                      type: "error",
                      text: `Not high enough contrast. Minimum required is ${minContrast}:1, current is ${contrast}:1`,
                    },
                  ],
                }
              : false
          }
          renderInvalidColorMessage={(hexCode) => [
            {
              type: "error",
              text: `Not valid hex color. It should be either 3, 6 or 8 character long.`,
            },
          ]}
          renderIsRequiredMessage={() => [
            {
              type: "error",
              text: `This field is required, please enter a valid hex code`,
            },
          ]}
        />
        <hr/>
        <FormFieldGroup description="Settings">
          <Checkbox
            label="isRequired"
            value="small"
            variant="toggle"
            size="small"
            inline
            checked={isRequired}
            onChange={() => this.setState({ isRequired: !isRequired })}
          />

          <Checkbox
            label="Disabled"
            value="small"
            variant="toggle"
            size="small"
            inline
            checked={disabled}
            onChange={() => this.setState({ disabled: !disabled })}
          />

          <Checkbox
            label="With contrast checking (checkContrast)"
            value="small"
            variant="toggle"
            size="small"
            inline
            checked={withCheckContrast}
            onChange={() =>
              this.setState({ withCheckContrast: !withCheckContrast })
            }
          />

          {withCheckContrast && (
            <FormFieldGroup description="Check contrast options">
              <Checkbox
                label="isStrict"
                value="small"
                variant="toggle"
                size="small"
                checked={isStrict}
                onChange={() => this.setState({ isStrict: !isStrict })}
              />
              <RadioInputGroup
                name="contrastStrength"
                description="contrastStrength"
                layout="columns"
                value={contrastStrength}
                onChange={(event, value) =>
                  this.setState({ contrastStrength: value })
                }
              >
                <RadioInput label="min (3:1)" value="min" />
                <RadioInput label="mid (4.5:1)" value="mid" />
                <RadioInput label="max (7:1)" value="max" />
              </RadioInputGroup>

              <ColorPreset
                label="contrastAgainst"
                colors={this.state.colors}
                selected={this.state.contrastAgainst}
                onSelect={(contrastAgainst) => this.setState({ contrastAgainst })}
                onPresetChange={(colors) => this.setState({ colors })}
              />
            </FormFieldGroup>
          )}
        </FormFieldGroup>
      </View>
    );
  }
}

render(<Example />);


```

### Uncontrolled Color Input

```js
---
example: true
---
<div>
    <ColorPicker checkContrast={{
        isStrict:false,
        renderContrastSuccessMessage:()=>[{type:'success', text:'I am a contrast success message'}],
        renderContrastErrorMessage:()=>[{type:'error', text:'I am a contrast warning message'}]
        }}
        renderMessages={()=>[{type:'hint', text:'I can display anything, at any time'}]}
        renderInvalidColorMessage={()=>[{type:'error', text:'I am an invalid color message'}]}
        renderIsRequiredMessage={()=>[{type:'error', text:'I am a required message'}]}
        placeholderText="Enter HEX"
    />
</div>
```
