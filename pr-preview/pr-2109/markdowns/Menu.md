# Menu


The `Menu` component is a special type of Popover that is meant to be used as a list of actions or functions (`<Menu.Items/>` that are keyboard accessible) that the user may want to invoke often related to or controlling some other content on the page.

- Menu should not be used for navigation.
- Menu should not be used as a form input.
- Menu is usually triggered on click of a trigger element (often a ‘...’ or cog icon button).
- The Menu provides custom focus management, trapping focus within the ContextView, allowing navigation between Menu.Items via arrow keys.
- Menu uses Popover internally and provides additional semantic markup and focus behavior.

Passing a node to the `trigger` prop will render a toggle button which, when clicked, shows or hides
the [Menu](#Menu) in a [Popover](#Popover).

Note: `<Menu/>` cannot contain content that is not a `<Menu.Item/>` (links or buttons). If
you need to include more complex content, take a look at [Popover](#Popover).

- ```js
  class Example extends React.Component {
    constructor(props) {
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
    }

    handleMultipleSelect = (e, newSelected) => {
      this.setState({
        multipleSelection: newSelected
      })
    }

    render() {
      return (
        <View padding="medium" textAlign="center">
          <Menu
            placement="bottom"
            trigger={<Button>Menu</Button>}
            mountNode={() => document.getElementById('main')}
          >
            <Menu.Item value="mastery">Learning Mastery</Menu.Item>
            <Menu.Item
              href="https://instructure.github.io/instructure-ui/"
              target="_blank"
            >
              Default (Grid view)
            </Menu.Item>
            <Menu.Item disabled>Individual (List view)</Menu.Item>
            <Menu label="More Options">
              <Menu.Group
                allowMultiple
                label="Select Many"
                selected={this.state.multipleSelection}
                onSelect={this.handleMultipleSelect}
              >
                <Menu.Item value="optionOne">Option 1</Menu.Item>
                <Menu.Item value="optionTwo">Option 2</Menu.Item>
                <Menu.Item value="optionThree">Option 3</Menu.Item>
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
              <Menu.Item value="itemOne">Item 1</Menu.Item>
              <Menu.Item value="itemTwo">Item 2</Menu.Item>
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

- ```js
  const Example = () => {
    const [singleSelection, setSingleSelection] = useState(['itemOne'])
    const [multipleSelection, setMultipleSelection] = useState([
      'optionOne',
      'optionThree'
    ])

    const handleSingleSelect = (e, newSelected) => {
      setSingleSelection(newSelected)
    }

    const handleMultipleSelect = (e, newSelected) => {
      setMultipleSelection(newSelected)
    }

    return (
      <View padding="medium" textAlign="center">
        <Menu
          placement="bottom"
          trigger={<Button>Menu</Button>}
          mountNode={() => document.getElementById('main')}
        >
          <Menu.Item value="mastery">Learning Mastery</Menu.Item>
          <Menu.Item
            href="https://instructure.github.io/instructure-ui/"
            target="_blank"
          >
            Default (Grid view)
          </Menu.Item>
          <Menu.Item disabled>Individual (List view)</Menu.Item>
          <Menu label="More Options">
            <Menu.Group
              allowMultiple
              label="Select Many"
              selected={multipleSelection}
              onSelect={handleMultipleSelect}
            >
              <Menu.Item value="optionOne">Option 1</Menu.Item>
              <Menu.Item value="optionTwo">Option 2</Menu.Item>
              <Menu.Item value="optionThree">Option 3</Menu.Item>
            </Menu.Group>
            <Menu.Separator />
            <Menu.Item value="navigation">Navigation</Menu.Item>
            <Menu.Item value="set">Set as default</Menu.Item>
          </Menu>
          <Menu.Separator />
          <Menu.Group
            label="Select One"
            selected={singleSelection}
            onSelect={handleSingleSelect}
          >
            <Menu.Item value="itemOne">Item 1</Menu.Item>
            <Menu.Item value="itemTwo">Item 2</Menu.Item>
          </Menu.Group>
          <Menu.Separator />
          <Menu.Item value="baz">Open grading history...</Menu.Item>
        </Menu>
      </View>
    )
  }

  render(<Example />)
  ```

### Guidelines

```js
---
type: embed
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


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Menu | children | `React.ReactNode` | No | - | Children of type `Menu.Item`, `Menu.Group`, `Menu.Separator`, or `Menu` |
| Menu | label | `string` | No | `null` | Description of the `<Menu />`. The component uses it to add its value to the `aria-label` attribute. |
| Menu | disabled | `bool` | No | `false` | Is the `<Menu />` disabled |
| Menu | trigger | `React.ReactNode` | No | `null` | The trigger element, if the `<Menu />` is to render as a popover |
| Menu | placement | `custom` | No | `'bottom center'` | If a trigger is supplied, where should the `<Menu />` be placed (relative to the trigger) |
| Menu | defaultShow | `bool` | No | `false` | Should the `<Menu />` be open for the initial render |
| Menu | show | `custom` | No | - | Is the `<Menu />` open (should be accompanied by `onToggle`) |
| Menu | onToggle | `(show: boolean, menu: Menu) => void` | No | - | Callback fired when the `<Menu />` is toggled open/closed. When used with `show`, the component will not control its own state. |
| Menu | onSelect | `( e: React.MouseEvent, value: MenuItemProps['value'] \| MenuItemProps['value'][], selected: MenuItemProps['selected'], args: MenuItem ) => void` | No | - | Callback fired when an item within the `<Menu />` is selected |
| Menu | onDismiss | `( event: React.UIEvent \| React.FocusEvent, documentClick: boolean ) => void` | No | - | If a trigger is supplied, callback fired when the `<Menu />` is closed |
| Menu | onFocus | `(event: React.FocusEvent) => void` | No | - | If a trigger is supplied, callback fired when the `<Menu />` trigger is focused |
| Menu | onMouseOver | `(event: React.MouseEvent) => void` | No | - | If a trigger is supplied, callback fired onMouseOver for the `<Menu />` trigger |
| Menu | onKeyDown | `(event: React.KeyboardEvent<HTMLElement>) => void` | No | - | Callback fired on the onKeyDown of the `<Menu />` |
| Menu | onKeyUp | `(event: React.KeyboardEvent<HTMLElement>) => void` | No | - | Callback fired on the onKeyUp of the `<Menu />` |
| Menu | menuRef | `(el: HTMLElement \| null) => void` | No | - | A function that returns a reference to the `<Menu />` |
| Menu | popoverRef | `(el: Popover \| null) => void` | No | - | A function that returns a reference to the `<Popover />` |
| Menu | mountNode | `custom` | No | `null` | If a trigger is supplied, an element or a function returning an element to use as the mount node for the `<Menu />` (defaults to `document.body`) |
| Menu | constrain | `custom` | No | `'window'` | The parent in which to constrain the menu. One of: 'window', 'scroll-parent', 'parent', 'none', an element, or a function returning an element |
| Menu | shouldHideOnSelect | `bool` | No | `true` | If a trigger is supplied, should the `<Menu />` hide when an item is selected |
| Menu | shouldFocusTriggerOnClose | `bool` | No | `true` | If a trigger is supplied, should the `<Menu />` focus the trigger on after closing |
| Menu | positionContainerDisplay | `'inline-block' \| 'block'` | No | - | If a trigger is supplied, this prop can set the CSS `display` property on the `<span>` container element of the underlying Position component |
| Menu | type | `enum` | No | - | The type of `<Menu />` |
| Menu | id | `string` | No | - |  |
| Menu | withArrow | `bool` | No | `true` | Whether or not an arrow pointing to the trigger should be rendered |
| Menu | offsetX | `string \| number` | No | `0` | The horizontal offset for the positioned content. Works only if `trigger` is provided. |
| Menu | offsetY | `string \| number` | No | `0` | The vertical offset for the positioned content. Works only if `trigger` is provided. |
| Menu | maxHeight | `string \| number` | No | - | The maximum height the menu can be. If not set, the menu won't scroll and will be as tall as the content requires |
| Menu | renderLabelInfo | `React.ReactNode \| (() => React.ReactNode)` | No | - | Content to render in the label's info region. It is only visible on nested Menus. |
| Menu | controls | `React.AriaAttributes['aria-controls']` | No | - |  |

### Usage

Install the package:

```shell
npm install @instructure/ui-menu
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Menu } from '@instructure/ui-menu'

/*** ES Modules (without tree shaking) ***/
import { Menu } from '@instructure/ui-menu/es/Menu/index'
```

