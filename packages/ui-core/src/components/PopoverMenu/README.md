---
describes: PopoverMenu
---

The `<PopoverMenu/>` component provides a toggle button which, when clicked, shows or hides a [Menu](#Menu) in a
[Popover](#Popover).

Note: The `<PopoverMenu/>` cannot contain content that is not a `<MenuItem/>` (links or buttons). If
you need to include more complex content, take a look at [Popover](#Popover) with the `shouldContainFocus`
and `applicationElement` properties.

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
      <PopoverMenu
        placement="bottom"
        onSelect={function () { console.log(arguments) }}
        trigger={
          <Button>
            Menu
          </Button>
        }
      >
        <MenuItem value="mastery">Learning Mastery</MenuItem>
        <MenuItem href="https://instructure.github.io/instructure-ui/">Default (Grid view)</MenuItem>
        <MenuItem disabled>Individual (List view)</MenuItem>
        <MenuItemFlyout label="More Options">
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
        </MenuItemFlyout>
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
      </PopoverMenu>
    </Container>
    )
  }
}

render(<Example />)
```
