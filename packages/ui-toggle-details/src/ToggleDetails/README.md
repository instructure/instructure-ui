---
describes: ToggleDetails
---

The ToggleDetails component can be used to show/hide content in response to user action.

By default, ToggleDetails content is hidden. To override, pass in the `defaultExpanded` prop.

```js
---
type: example
---
<ToggleDetails
  summary="Click to hide me!"
  defaultExpanded
>
  <Text weight="bold">I am expanded!</Text> {lorem.paragraph()}
</ToggleDetails>
```

ToggleDetails can be controlled:

```js
---
type: example
---

class Example extends React.Component {
  state = {
    expanded: true
  };

  handleChange = (event, expanded) => this.setState({ expanded });

  handleToggle = () => this.setState({ expanded: !this.state.expanded });

  render () {
    return (
      <div>
        <Button onClick={this.handleToggle}>
          This Button {this.state.expanded ? 'Collapses' : 'Expands'}
        </Button>
        <br />
        <br />
        <ToggleDetails
          summary="Click to hide me!"
          expanded={this.state.expanded}
          onToggle={this.handleChange}
        >
          <Text weight="bold">I am controlled and expanded!</Text> {lorem.paragraph()}
        </ToggleDetails>
      </div>
      )
  }
}

render(<Example />)
```

Setting ToggleDetails to `filled` will make the toggle use a full-width [Button](#Button) component.

```js
---
type: example
---
<ToggleDetails
  variant="filled"
  summary="Click to expand me!"
>
  {lorem.paragraph()}
</ToggleDetails>
```

### Icon size / summary text formatting

Icon size can be adjusted using the `size` prop with small, medium, and large options.

The `summary` prop accepts any node, allowing you to format the summary text as
you see fit. In these examples, we are formatting it with the
[Text](#Text) component.

```js
---
type: example
---
<div>
  <ToggleDetails
    size="small"
    summary="Small icon"
  >
    {lorem.paragraph()}
  </ToggleDetails>

  <br />

  <ToggleDetails summary="Medium icon">
    {lorem.paragraph()}
  </ToggleDetails>

  <br />

  <ToggleDetails
    size="large"
    summary="Large icon"
  >
    {lorem.paragraph()}
  </ToggleDetails>
</div>
```

### Icon positioning and block display

The `iconPosition` prop determines if the icon comes before or after the summary.

When the `fluidWidth` prop is set, the toggle fills the width of its
container.

```js
---
type: example
---
<ToggleDetails
  summary="Block display"
  iconPosition="end"
  defaultExpanded
  fluidWidth
>
  <Text>
    {lorem.paragraph()}
  </Text>
</ToggleDetails>
```

### Example to demonstrate more properties

```js
---
type: example
---
const Example = () => {
  const [state, setState] = useState({
    expanded: true,
    fluidWidth: true,
    iconPosition: 'start',
    size: 'small',
    variant: 'default'
  });

  const handleChange = (field, value) => setState(prevState => ({ ...prevState, [field]: value }));
  const handleToggle = () => setState(prevState => ({ ...prevState, expanded: !prevState.expanded }));

  const renderOptions = () => {
    const { fluidWidth, iconPosition, size, variant } = state;
    const options = [
      { name: 'iconPosition', values: ['start', 'end'] },
      { name: 'size', values: ['small', 'medium', 'large'] },
      { name: 'variant', values: ['default', 'filled'] },
    ];

    return (
      <Flex alignItems="start">
        {options.map(({ name, values }) => (
          <Flex.Item margin="small" key={name}>
            <RadioInputGroup
              name={name}
              description={name}
              value={state[name]}
              onChange={(e, value) => handleChange(name, value)}
            >
              {values.map(val => (
                <RadioInput label={val} value={val} key={val} />
              ))}
            </RadioInputGroup>
          </Flex.Item>
        ))}
        <Flex.Item margin="small">
          <Checkbox
            label="fluidWidth"
            checked={fluidWidth}
            onChange={() => handleChange('fluidWidth', !fluidWidth)}
          />
        </Flex.Item>
      </Flex>
    );
  };

  const { expanded, iconPosition, size, variant, fluidWidth } = state;

  return (
    <div>
      {renderOptions()}
      <Button onClick={handleToggle}>
        This Button {expanded ? 'Collapses' : 'Expands'}
      </Button>
      <br />
      <br />
      <ToggleDetails
        summary="Click to hide me!"
        expanded={expanded}
        onToggle={(_, expanded) => handleChange('expanded', expanded)}
        fluidWidth={fluidWidth}
        iconPosition={iconPosition}
        size={size}
        variant={variant}
      >
        <Text weight="bold">
          I am controlled and expanded!I am controlled and expanded!I am controlled and expanded!I am controlled and expanded!I am controlled and expanded!I am controlled and expanded!I am controlled and expanded!I am controlled and expanded!I am controlled and expanded!I am controlled and expanded!I am controlled and expanded!I am controlled and expanded!I am controlled and expanded!I am controlled and expanded!I am controlled and expanded!I am controlled and expanded!I am controlled and expanded!I am controlled and expanded!I am controlled and expanded!I am controlled and expanded!I am controlled and expanded!I am controlled and expanded!I am controlled and expanded!I am controlled and expanded!I am controlled and expanded!
        </Text>
      </ToggleDetails>
    </div>
  );
};

render(<Example />)
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Use ToggleDetails when descriptive text is longer than a short phrase</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Nest ToggleDetails within another ToggleDetails</Figure.Item>
  </Figure>
</Guidelines>
```
