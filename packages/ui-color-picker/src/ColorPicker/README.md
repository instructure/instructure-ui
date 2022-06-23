---
describes: ColorPicker
---

The `ColorPicker` is a versatile component that can be used to select colors and check their contrast ratios. It has 2 modes of operation:

- In the simple, color input mode, it lets the user enter hex codes. It will display the color, validate the hex and check the contrast.
- In the more complex, color picker mode, the same functionality is available as for the simpler mode, but there is the option to pick a color from a visual color mixer component or from any other method added in a popover.

The component can be either `uncontrolled` or `controlled`. If the `onChange` and `value` props are used, it will behave in a `controlled` manner, otherwise `uncontrolled`.

### ColorPicker with default popover content

```js
---
render: false
example: true
---
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  render() {
    const { value } = this.state;

    return (
        <ColorPicker
          value={value}
          onChange={(value) =>{ this.setState({ value })}}
          label="Color Input"
          tooltip="This is an example"
          placeholderText="Enter HEX"
          popoverButtonScreenReaderLabel="Open color mixer popover"
          withAlpha
          colorMixerSettings={{
            popoverAddButtonLabel: "Add",
            popoverCloseButtonLabel: "Cancel",
            colorMixer: {
              withAlpha: false,
              rgbRedInputScreenReaderLabel:'Input field for red',
              rgbGreenInputScreenReaderLabel:'Input field for green',
              rgbBlueInputScreenReaderLabel:'Input field for blue',
              rgbAlphaInputScreenReaderLabel:'Input field for alpha',
              colorSliderNavigationExplanationScreenReaderLabel:`You are on a color slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`,
              alphaSliderNavigationExplanationScreenReaderLabel:`You are on an alpha slider. To navigate the slider left or right, use the 'A' and 'D' buttons respectively`,
              colorPaletteNavigationExplanationScreenReaderLabel:`You are on a color palette. To navigate on the palette up, left, down or right, use the 'W', 'A', 'S' and 'D' buttons respectively`
            },
            colorPreset: {
              label: "Choose a nice color",
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
            },
            colorContrast: {
              firstColor: "#FFFF00",
              label: "Color Contrast Ratio",
              successLabel: "PASS",
              failureLabel: "FAIL",
              normalTextLabel: "Normal text",
              largeTextLabel: "Large text",
              graphicsTextLabel: "Graphics text",
              firstColorLabel: "Background",
              secondColorLabel: "Foreground",
            },
          }}
        />
    );
  }
}

render(<Example />);


```

### ColorPicker with custom popover content

```js
---
render: false
example: true
---
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }
  renderPopoverContent = (value, onChange, handleAdd, handleClose) => (
    <div>
      <div style={{ padding: "20px" }}>
        <ColorMixer
          withAlpha
          value={value}
          onChange={onChange}
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
            borderTop: "solid",
            borderWidth: "1px",
            borderColor: "#C7CDD1",
            margin: "20px 0 20px 0",
          }}
        />
        <ColorPreset
          label="Choose a color"
          colors={[
            "#ffffff",
            "#0CBF94",
            "#0C89BF00",
            "#BF0C6D",
            "#BF8D0C",
            "#ff0000",
            "#576A66",
            "#35423A",
            "#35423F",
          ]}
          selected={value}
          onSelect={onChange}
        />
        <div
          style={{
            borderTop: "solid",
            borderWidth: "1px",
            borderColor: "#C7CDD1",
            margin: "20px 0 20px 0",
          }}
        />
        <ColorContrast
          firstColor="#FFFFFF"
          secondColor={value}
          label="Color Contrast Ratio"
          successLabel="PASS"
          failureLabel="FAIL"
          normalTextLabel="Normal text"
          largeTextLabel="Large text"
          graphicsTextLabel="Graphics text"
          firstColorLabel="Background"
          secondColorLabel="Foreground"
        />
      </div>
      <div
        style={{
          backgroundColor: "#F5F5F5",
          display: "flex",
          flexDirection: "row-reverse",
          padding: "7px",
          borderTop: "solid 1px #C7CDD1",
        }}
      >
        <Button onClick={handleAdd} color="primary" margin="xx-small">
          Add
        </Button>
        <Button onClick={handleClose} color="secondary" margin="xx-small">
          Close
        </Button>
      </div>
    </div>
  );

  render() {
    return (
      <div>
        <ColorPicker
          value={this.state.value}
          onChange={(value) => {
            this.setState({ value });
          }}
          label="Color Input"
          tooltip="This is an example"
          placeholderText="Enter HEX"
          popoverButtonScreenReaderLabel="Open color mixer popover"
        >
          {this.renderPopoverContent}
        </ColorPicker>
      </div>
    );
  }
}


render(<Example />);
```

### Complex Color input example

```js
---
render: false
example: true
---
class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      withCheckContrast: false,
      contrastStrength: "mid",
      isStrict: false,
      disabled: false,
      isRequired: false,
      contrastAgainst: "#ffffff",
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
      withAlpha: false,
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
      withAlpha,
      value,
    } = this.state;

    return (
      <View as="div">
        <ColorPicker
          onChange={(value) => this.setState({ value })}
          value={value}
          placeholderText="Enter HEX"
          label="Color Input"
          tooltip="This is an example"
          disabled={disabled}
          isRequired={isRequired}
          withAlpha={withAlpha}
          popoverButtonScreenReaderLabel="Open color mixer popover"
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
        <hr />
        <FormFieldGroup description="Settings">
          <Checkbox
            label="isRequired"
            value="small"
            variant="toggle"
            size="small"
            inline
            checked={isRequired}
            onChange={() =>
              this.setState({
                isRequired: !isRequired,
              })
            }
          />
          <Checkbox
            label="withAlpha"
            value="small"
            variant="toggle"
            size="small"
            inline
            checked={withAlpha}
            onChange={() =>
              this.setState({
                withAlpha: !withAlpha,
                value: value.slice(0, 6),
              })
            }
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
                onSelect={(contrastAgainst) =>
                  this.setState({ contrastAgainst })
                }
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
  <ColorPicker
    checkContrast={{
      isStrict: false,
      renderContrastSuccessMessage: () => [
        { type: "success", text: "I am a contrast success message" },
      ],
      renderContrastErrorMessage: () => [
        { type: "error", text: "I am a contrast warning message" },
      ],
    }}
    renderMessages={() => [
      { type: "hint", text: "I can display anything, at any time" },
    ]}
    renderInvalidColorMessage={() => [
      { type: "error", text: "I am an invalid color message" },
    ]}
    renderIsRequiredMessage={() => [
      { type: "error", text: "I am a required message" },
    ]}
    placeholderText="Enter HEX"
  />
</div>;

```
