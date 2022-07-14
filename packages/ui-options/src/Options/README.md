---
describes: Options
---

`Options` is a view-only component for creating option lists and menus, like those used in [Select](#Select) and [Drilldown](#Drilldown). It should only be used if an existing component doesn't offer the level of customization needed.

### Inverse color

```js
---
example: true
render: false
---
class InverseColorExample extends React.Component {
  state = {
    color: 'primary-inverse'
  }

  render() {
    return (
      <Flex alignItems='start'>
        <Flex.Item width="33%">
          <Options role="menu" as="ul" color={this.state.color} renderLabel="Inverse color version">
            <Options.Item role="menuitem" description="Curabitur fringilla, urna ut efficitur molestie, nibh lacus tincidunt elit, ut tempor ipsum nunc sit amet massa.">
              Option one
            </Options.Item>
            <Options.Item role="menuitem" variant="highlighted">
              Option two
            </Options.Item>
            <Options.Item role="menuitem" renderAfterLabel={IconArrowOpenEndSolid}>
              Flyout menu option
            </Options.Item>
            <Options.Separator as="li" />
            <Options role="menu" as="ul" renderLabel={'Sub menu'}>
              <Options.Item role="menuitem">
                Sub option one
              </Options.Item>
              <Options.Item role="menuitem">
                Sub option two
              </Options.Item>
            </Options>
            <Options.Separator />
            <Options role="menu" as="ul" renderLabel={'Radio group'}>
              <Options.Item role="menuitemradio" renderBeforeLabel={IconCheckSolid}>
                Radio option one
              </Options.Item>
              <Options.Item role="menuitemradio" renderBeforeLabel={
                <IconCheckLine style={{opacity: 0}} />
              }>
                Radio option two
              </Options.Item>
            </Options>
            <Options.Separator />
            <Options.Item role="menuitem" variant="disabled">
              Option three
            </Options.Item>
          </Options>
        </Flex.Item>

        <Flex.Item width="33%" margin='0 0 0 large'>
          <Options color={this.state.color} renderLabel='Option item variants'>
            <Options.Item onClick={() => console.log('clicked!')}>
              Default option
            </Options.Item>
            <Options.Item variant="highlighted">
              Highlighted option
            </Options.Item>
            <Options.Item variant="selected">
              Selected option
            </Options.Item>
            <Options.Item variant="disabled">
              Disabled option
            </Options.Item>
            <Options.Item variant="highlighted-disabled">
              Highlighted disabled option
            </Options.Item>
          </Options>
        </Flex.Item>

        <Flex.Item padding="0 0 0 large" shouldGrow shouldShrink>
          <RadioInputGroup
            onChange={(_event, value) => {
              this.setState({ color: value })
            }}
            defaultValue="primary-inverse"
            name="color"
            description="Color version"
          >
            {['primary', 'primary-inverse'].map(part => <RadioInput key={part} value={part} label={part} />)}
          </RadioInputGroup>
        </Flex.Item>
      </Flex>
    )
  }
}

render(<InverseColorExample />)
```

### Option item variants

The `variant` prop of `Option.Item` provides several visual treatments. Use the `highlighted` variant to indicate that an option is being hovered, focused, or otherwise interacted with and the `selected` variant to indicate the selected option.

```js
---
example: true
---
<View display="block" width="300px">
  <Options>
    <Options.Item onClick={() => console.log('clicked!')}>
      Default option
    </Options.Item>
    <Options.Item variant="highlighted">
      Highlighted option
    </Options.Item>
    <Options.Item variant="selected">
      Selected option
    </Options.Item>
    <Options.Item variant="disabled">
      Disabled option
    </Options.Item>
    <Options.Item variant="highlighted-disabled">
      Highlighted disabled option
    </Options.Item>
  </Options>
</View>
```

### Nesting and using icons

`Options` components can be nested to create sub menus. Icons may be added to any `Options.Item` before or after its text content using `renderBeforeLabel` and `renderAfterLabel` respectively.

> `Options` and `Options.Item` receive default roles of `list` and `listitem` respectively, but the most applicable roles should be used. These will commonly be `listbox`/`option` or `menu`/`menuitem`.

```js
---
example: true
---
<View display="block" width="300px">
  <Options role="menu" as="ul">
    <Options.Item role="menuitem">
      Option one
    </Options.Item>
    <Options.Item role="menuitem" variant="highlighted">
      Option two
    </Options.Item>
    <Options.Item role="menuitem" renderAfterLabel={IconArrowOpenEndSolid}>
      Flyout menu option
    </Options.Item>
    <Options.Separator as="li" />
    <Options role="menu" as="ul" renderLabel={'Sub menu'}>
      <Options.Item role="menuitem">
        Sub option one
      </Options.Item>
      <Options.Item role="menuitem">
        Sub option two
      </Options.Item>
    </Options>
    <Options.Separator />
    <Options role="menu" as="ul" renderLabel={'Radio group'}>
      <Options.Item role="menuitemradio" renderBeforeLabel={IconCheckSolid}>
        Radio option one
      </Options.Item>
      <Options.Item role="menuitemradio" renderBeforeLabel={
        <IconCheckLine style={{opacity: 0}} />
      }>
        Radio option two
      </Options.Item>
    </Options>
    <Options.Separator />
    <Options.Item role="menuitem">
      Option three
    </Options.Item>
  </Options>
</View>
```

### Handling interaction

`Options` does not manage any state or react to any user interaction. The consuming component or app should listen for events on items and update the `variant` props accordingly via its own state.

```js
---
render: false
example: true
---
class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      highlighted: -1,
      selected: -1
    }
  }

  handleKeyDown = (event) => {
    const { highlighted } = this.state
    let index = highlighted

    if (event.keyCode === 40 && highlighted < this.props.options.length - 1) {
      // down arrow
      event.preventDefault()
      index = highlighted + 1
    } else if (event.keyCode === 38 && highlighted > 0) {
      // up arrow
      event.preventDefault()
      index = highlighted - 1
    } else if (event.keyCode === 13 && highlighted > -1) {
      // enter
      this.setState({ selected: index })
    }
    this.setState({ highlighted: index })
  }

  handleFocus = (event, index) => {
    this.setState({ highlighted: index })
  }

  handleMouseOver = (event, index) => {
    this.setState({ highlighted: index })
  }

  handleClick = (event, index) => {
    this.setState({ selected: index })
  }

  render () {
    return (
      <View
        display="block"
        width="300px"
        shadow="above"
      >
        <Options
          onKeyDown={this.handleKeyDown}
          onMouseOut={(e) => this.setState({ highlighted: -1 })}
          tabIndex="0"
        >
          {this.props.options.map((option, index) => {
            let variant = 'default'
            if (this.state.highlighted === index) {
              variant = 'highlighted'
            } else if (this.state.selected === index) {
              variant = 'selected'
            }
            return (
              <Options.Item
                key={option}
                variant={variant}
                tabIndex="-1"
                onMouseOver={(e) => this.handleMouseOver(e, index)}
                onFocus={(e) => this.handleFocus(e, index)}
                onClick={(e) => this.handleClick(e, index)}
              >
                { option }
              </Options.Item>
            )
          })}
        </Options>
      </View>
    )
  }
}

render(
  <Example options={[
    'Option one',
    'Option two',
    'Option three',
    'Option four',
    'Option five'
  ]} />
)
```

### Recoloring text and icons

You can recolor the text and the background of the items for their `default`, `highlighted` and `selected` variants.

By default, the icons in the `Option.Item` have the same color as the text. If you want to set the color of the icon separately, pass a function to the `renderBeforeLabel` or `renderAfterLabel` prop. This function will have a `props` parameter, so you can access the properties of that `Option.Item` (e.g. the current `variant`). The available props are: `[ variant, as, role, color, children ]`.

```js
---
render: false
example: true
---
class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      highlighted: -1,
      selected: -1
    }
  }

  handleKeyDown = (event) => {
    const { highlighted } = this.state
    let index = highlighted

    if (event.keyCode === 40 && highlighted < this.props.options.length - 1) {
      // down arrow
      event.preventDefault()
      index = highlighted + 1
    } else if (event.keyCode === 38 && highlighted > 0) {
      // up arrow
      event.preventDefault()
      index = highlighted - 1
    } else if (event.keyCode === 13 && highlighted > -1) {
      // enter
      this.setState({ selected: index })
    }
    this.setState({ highlighted: index })
  }

  handleFocus = (event, index) => {
    this.setState({ highlighted: index })
  }

  handleMouseOver = (event, index) => {
    this.setState({ highlighted: index })
  }

  handleClick = (event, index) => {
    this.setState({ selected: index })
  }

  render () {
    return (
      <View
        display="block"
        width="300px"
        shadow="above"
      >
        <Options
          onKeyDown={this.handleKeyDown}
          onMouseOut={(e) => this.setState({ highlighted: -1 })}
          tabIndex="0"
        >
          {this.props.options.map((option, index) => {
            let variant = 'default'
            if (this.state.highlighted === index) {
              variant = 'highlighted'
            } else if (this.state.selected === index) {
              variant = 'selected'
            }
            return (
              <Options.Item
                key={option.label}
                variant={variant}
                tabIndex="-1"
                onMouseOver={(e) => this.handleMouseOver(e, index)}
                onFocus={(e) => this.handleFocus(e, index)}
                onClick={(e) => this.handleClick(e, index)}
                {...option.extraProps}
              >
                { option.label }
              </Options.Item>
            )
          })}
        </Options>
      </View>
    )
  }
}

render(
  <Example options={[
    {
      label: 'Default item',
      extraProps: {
        renderBeforeLabel: IconCheckSolid
      }
    },
    {
      label: 'Text is green',
      extraProps: {
        renderBeforeLabel: IconCheckSolid,
        themeOverride: { color: "#0B874B" }
      }
    },
    {
      label: 'Highlighted text is black',
      extraProps: {
        renderBeforeLabel: IconCheckSolid,
        themeOverride: { highlightedLabelColor: "#2D3B45" }

      }
    },
    {
      label: 'Highlighted background is purple',
      extraProps: {
        renderBeforeLabel: IconCheckSolid,
        themeOverride: { highlightedBackground: "#BF32A4" }
      }
    },
    {
      label: 'Only the icon is red',
      extraProps: {
        renderBeforeLabel: (props) => {
          return <IconCheckSolid
            {...(props.variant === "default" && { color: 'warning' }) }
          />
        }
      }
    }
  ]} />
)
```

### Secondary text

Additional/secondary text can be added via the `description` prop, and the ARIA role of it can be set with the `descriptionRole` prop.

For longer, multi-line options the problem of the vertical alignment comes up. The content of the `renderBeforeLabel` and `renderAfterLabel` props are vertically centered by default. This can be changed with the `beforeLabelContentVAlign` and `afterLabelContentVAlign` props.

```js
---
render: false
example: true
---
class Example extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      highlighted: -1
    }
  }

  handleMouseOver = (index) => {
    this.setState({ highlighted: index })
  }

  render() {
    return (
      <View display="block" width="300px">
        <Options onMouseOut={(e) => this.setState({ highlighted: -1 })}>
          <Options.Item
            onMouseOver={(e) => this.handleMouseOver(1)}
            variant={this.state.highlighted === 1 ? 'highlighted' : 'default'}
            description="Curabitur fringilla, urna ut efficitur molestie, nibh lacus tincidunt elit, ut tempor ipsum nunc sit amet massa."
            renderBeforeLabel={IconCheckSolid}
            renderAfterLabel={IconArrowOpenEndSolid}
            beforeLabelContentVAlign="start"
            afterLabelContentVAlign="start"
          >
            Option one
          </Options.Item>
          <Options.Item
            onMouseOver={(e) => this.handleMouseOver(2)}
            variant={this.state.highlighted === 2 ? 'highlighted' : 'default'}
            description="Curabitur fringilla, urna ut efficitur molestie, nibh lacus tincidunt elit, ut tempor ipsum nunc sit amet massa."
            renderBeforeLabel={IconCheckSolid}
            renderAfterLabel={IconArrowOpenEndSolid}
            beforeLabelContentVAlign="center"
            afterLabelContentVAlign="center"
          >
            Option two
          </Options.Item>
          <Options.Item
            onMouseOver={(e) => this.handleMouseOver(3)}
            variant={this.state.highlighted === 3 ? 'highlighted' : 'default'}
            description="Curabitur fringilla, urna ut efficitur molestie, nibh lacus tincidunt elit, ut tempor ipsum nunc sit amet massa."
            renderBeforeLabel={IconCheckSolid}
            renderAfterLabel={IconArrowOpenEndSolid}
            beforeLabelContentVAlign="end"
            afterLabelContentVAlign="end"
          >
            Option three
          </Options.Item>
        </Options>
      </View>
    )
  }
}

render(<Example />)
```

### Options as links

Providing a `href` prop will render the option as `<a>` link element.

**WARNING!** Since `Options` is a view-only component, you have to make sure it is accessible, and if set the variant to disabled, disable the links as well!

```js
---
render: false
example: true
---
class Example extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      highlighted: -1
    }
  }

  handleMouseOver = (index) => {
    this.setState({ highlighted: index })
  }

  render() {
    return (
      <View display="block" width="300px">
        <Options onMouseOut={(e) => this.setState({ highlighted: -1 })}>
          <Options.Item
            onMouseOver={(e) => this.handleMouseOver(1)}
            variant={this.state.highlighted === 1 ? 'highlighted' : 'default'}
            href="/"
          >
            Link one
          </Options.Item>
          <Options.Item
            onMouseOver={(e) => this.handleMouseOver(2)}
            variant={this.state.highlighted === 2 ? 'highlighted' : 'default'}
            href="/"
          >
            Link two
          </Options.Item>
          <Options.Item
            onMouseOver={(e) => this.handleMouseOver(3)}
            variant={this.state.highlighted === 3 ? 'highlighted' : 'default'}
            variant="disabled"
            onClick={(e) => { e.preventDefault() }}
            href="/"
          >
            Link three
          </Options.Item>
        </Options>
      </View>
    )
  }
}

render(<Example />)
```
