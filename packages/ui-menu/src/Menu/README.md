---
describes: Menu
---

The `Menu` component is a special type of Popover that is meant to be used as a list of actions or functions (`<Menu.Items/>` that are keyboard accessible)  that the user may want to invoke often related to or controlling some other content on the page.

- Menu should not be used for navigation.
- Menu should not be used as a form input.
- Menu is usually triggered on click of a trigger element (often a ‘...’ or cog icon button).
- The Menu provides custom focus management, trapping focus within the ContextView, allowing navigation between Menu.Items via arrow keys.
- Menu uses Popover internally and provides additional semantic markup and focus behavior.

Passing a node to the `trigger` prop will render a toggle button which, when clicked, shows or hides
the [Menu](#Menu) in a [Popover](#Popover).

Note: `<Menu/>` cannot contain content that is not a `<Menu.Item/>` (links or buttons). If
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
        <Menu.Item value="mastery">Learning Mastery</Menu.Item>
        <Menu.Item href="https://instructure.github.io/instructure-ui/">Default (Grid view)</Menu.Item>
        <Menu.Item disabled>Individual (List view)</Menu.Item>
        <Menu label="More Options">
          <Menu.Group
            allowMultiple
            label="Select Many"
            selected={this.state.multipleSelection}
            onSelect={this.handleMultipleSelect}
          >
            <Menu.Item value="optionOne">
              Option 1
            </Menu.Item>
            <Menu.Item value="optionTwo">
              Option 2
            </Menu.Item>
            <Menu.Item value="optionThree">
              Option 3
            </Menu.Item>
          </Menu.Group>
          <Menu.Separator />
          <Menu.Item value="navigation">Navigation</Menu.Item>
          <Menu.Item value="set">Set as default</Menu.Item>
        </Menu>
        <Menu.Separator />
        <Menu.Group
          label="Select One"
          selected={this.state.singleSelection}
          onSelect={this.handleSingleSelect}
        >
          <Menu.Item value="itemOne">
            Item 1
          </Menu.Item>
          <Menu.Item value="itemTwo">
            Item 2
          </Menu.Item>
        </Menu.Group>
        <Menu.Separator />
        <Menu.Item value="baz">Open grading history...</Menu.Item>
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
    <Figure.Item>Make the text within Menu direct so users can quickly decide on an action</Figure.Item>
    <Figure.Item>Use for radio or checkbox type interactions</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Nest Menu.Items more than two levels deep</Figure.Item>
    <Figure.Item>Use content that is not a Menu.Item (links or buttons)</Figure.Item>
    <Figure.Item>Include complex content</Figure.Item>
  </Figure>
</Guidelines>
```
