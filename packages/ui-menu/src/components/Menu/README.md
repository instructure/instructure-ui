---
describes: Menu
---

The `Menu` component is a special type of Popover that is meant to be used as a list of actions or functions (`<MenuItems/>` that are keyboard accessible)  that the user may want to invoke often related to or controlling some other content on the page.

- Menu should not be used for navigation.
- Menu should not be used as a form input.
- Menu is usually triggered on click of a trigger element (often a ‘...’ or cog icon button).
- The Menu provides custom focus management, trapping focus within the ContextView, allowing navigation between MenuItems via arrow keys.
- Menu uses Popover internally and provides additional semantic markup and focus behavior.

Passing a node to the `trigger` prop will render a toggle button which, when clicked, shows or hides
the [Menu](#Menu) in a [Popover](#Popover).

Note: `<Menu/>` cannot contain content that is not a `<MenuItem/>` (links or buttons). If
you need to include more complex content, take a look at [Popover](#Popover).

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
    <View padding="medium" textAlign="center">
      <Menu
        placement="bottom"
        trigger={
          <Button>Menu</Button>
        }
        mountNode={() => document.getElementById('main')}
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
    </View>
    )
  }
}

render(<Example />)
```
### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <FigureItem>Make the text within Menu direct so users can quickly decide on an action</FigureItem>
    <FigureItem>Use for radio or checkbox type interactions</FigureItem>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <FigureItem>Nest MenuItems more than two levels deep</FigureItem>
    <FigureItem>Use content that is not a MenuItem (links or buttons)</FigureItem>
    <FigureItem>Include complex content</FigureItem>
  </Figure>
</Guidelines>
```
