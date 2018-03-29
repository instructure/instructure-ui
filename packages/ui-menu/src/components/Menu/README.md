---
describes: Menu
---

The `<Menu/>` component provides a list of actionable `<MenuItems/>` that are keyboard accessible.

Passing a node to the `trigger` prop will render a toggle button which, when clicked, shows or hides
the [Menu](#Menu) in a [Popover](#Popover).

Note: `<Menu/>` cannot contain content that is not a `<MenuItem/>` (links or buttons). If
you need to include more complex content, take a look at [Popover](#Popover).


```js
---
example: true
---
<Container padding="medium" textAlign="center">
  <Menu
    placement="bottom"
    trigger={
      <Button>Menu</Button>
    }
  >
    <MenuItem value="mastery">Learning Mastery</MenuItem>
    <MenuItem href="https://instructure.github.io/instructure-ui/">Default (Grid view)</MenuItem>
    <MenuItem disabled>Individual (List view)</MenuItem>
    <Menu label="More Options">
      <MenuItemGroup
        allowMultiple
        label="Select Many"
      >
        <MenuItem value="optionOne" defaultSelected>
          Option 1
        </MenuItem>
        <MenuItem value="optionTwo">
          Option 2
        </MenuItem>
        <MenuItem value="optionThree" defaultSelected>
          Option 3
        </MenuItem>
      </MenuItemGroup>
      <MenuItemSeparator />
      <MenuItem value="navigation">Navigation</MenuItem>
      <MenuItem value="set">Set as default</MenuItem>
    </Menu>
    <MenuItemSeparator />
    <MenuItemGroup
      label="Select One"
    >
      <MenuItem value="itemOne" defaultSelected>
        Item 1
      </MenuItem>
      <MenuItem value="itemTwo">
        Item 2
      </MenuItem>
    </MenuItemGroup>
    <MenuItemSeparator />
    <MenuItem value="baz">Open grading history...</MenuItem>
  </Menu>
</Container>
```

The Menu can also be a controlled component:

```js
---
render: false
example: true
---
class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      singleSelection: ['itemOne'],
      multipleSelection: ['optionOne', 'optionThree']
    }
  }

  handleSingleSelect = (e, newSelected) => {
    this.setState({
      singleSelection: newSelected
    })
  };

  handleMultipleSelect = (e, newSelected) => {
    this.setState({
      multipleSelection: newSelected
    })
  };

  render () {
    return (
    <Container padding="medium" textAlign="center">
      <Menu
        placement="bottom"
        trigger={
          <Button>Menu</Button>
        }
      >
        <MenuItem value="mastery">Learning Mastery</MenuItem>
        <MenuItem href="https://instructure.github.io/instructure-ui/">Default (Grid view)</MenuItem>
        <MenuItem disabled>Individual (List view)</MenuItem>
        <Menu label="More Options">
          <MenuItemGroup
            allowMultiple
            label="Select Many"
            selected={this.state.multipleSelection}
            onSelect={this.handleMultipleSelect}
          >
            <MenuItem value="optionOne">
              Option 1
            </MenuItem>
            <MenuItem value="optionTwo">
              Option 2
            </MenuItem>
            <MenuItem value="optionThree">
              Option 3
            </MenuItem>
          </MenuItemGroup>
          <MenuItemSeparator />
          <MenuItem value="navigation">Navigation</MenuItem>
          <MenuItem value="set">Set as default</MenuItem>
        </Menu>
        <MenuItemSeparator />
        <MenuItemGroup
          label="Select One"
          selected={this.state.singleSelection}
          onSelect={this.handleSingleSelect}
        >
          <MenuItem value="itemOne">
            Item 1
          </MenuItem>
          <MenuItem value="itemTwo">
            Item 2
          </MenuItem>
        </MenuItemGroup>
        <MenuItemSeparator />
        <MenuItem value="baz">Open grading history...</MenuItem>
      </Menu>
    </Container>
    )
  }
}

render(<Example />)
```
