---
describes: ToggleDetails
---

The ToggleDetails component can be used to show/hide content in response to user action.

By default, ToggleDetails content is hidden. To override, pass in the `defaultExpanded` prop.

```js
---
example: true
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
example: true
render: false
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
          This button {this.state.expanded ? 'collapses' : 'expands'}
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

Setting ToggleDetails to `filled` will make the toggle use the `fluidWidth` Button component.

```js
---
example: true
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
example: true
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
example: true
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
