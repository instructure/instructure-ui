---
describes: Options
---

`Options` is a view-only component for creating option lists and menus, like those used in [Select](#Select) and [Menu](#Menu). It should only be used if an existing component doesn't offer the level of customization needed.

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
  </Options>
</View>
```

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
        <Options onKeyDown={this.handleKeyDown} tabIndex="0">
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

You can recolor the text and the background of the items for their `default`, `highlighted` and `selected` variants.

By default, the icons in the `Option.Item` have the same color as the text. If you want to set the color of the icon separately, pass a function to the `renderBeforeLabel` or `renderAfterLabel` prop. This function will have a `props` parameter, so you can access the properties of that `Option.Item` (e.g. the current `variant`). The available props are: `[ variant, as, role, children ]`.

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
        <Options onKeyDown={this.handleKeyDown} tabIndex="0">
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
        themeOverride: { color: "#00AC18" }
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
