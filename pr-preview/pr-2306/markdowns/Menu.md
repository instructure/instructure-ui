# Menu


The `Menu` component is a special type of Popover that is meant to be used as a list of actions or functions (`<Menu.Items/>` that are keyboard accessible) that the user may want to invoke often related to or controlling some other content on the page.

- Menu should not be used for navigation.
- Menu should not be used as a form input.
- Menu is usually triggered on click of a trigger element (often a ‘...’ or cog icon button).
- The Menu provides custom focus management, trapping focus within the ContextView, allowing navigation between Menu.Items via arrow keys.
- Menu uses Popover internally and provides additional semantic markup and focus behavior.

Passing a node to the `trigger` prop will render a toggle button which, when clicked, shows or hides
the [Menu](Menu) in a [Popover](Popover).

Note: `<Menu/>` cannot contain content that is not a `<Menu.Item/>` (links or buttons). If
you need to include more complex content, take a look at [Popover](Popover).

```js
---
type: example
---
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
| Menu | disabled | `boolean` | No | `false` | Is the `<Menu />` disabled |
| Menu | trigger | `React.ReactNode` | No | `null` | The trigger element, if the `<Menu />` is to render as a popover |
| Menu | placement | `PlacementPropValues` | No | `'bottom center'` | If a trigger is supplied, where should the `<Menu />` be placed (relative to the trigger) |
| Menu | defaultShow | `boolean` | No | `false` | Should the `<Menu />` be open for the initial render |
| Menu | show | `boolean` | No | - | Is the `<Menu />` open (should be accompanied by `onToggle`) |
| Menu | onToggle | `(show: boolean, menu: Menu) => void` | No | - | Callback fired when the `<Menu />` is toggled open/closed. When used with `show`, the component will not control its own state. |
| Menu | onSelect | `( e: React.MouseEvent, value: MenuItemProps['value'] \| MenuItemProps['value'][], selected: MenuItemProps['selected'], args: MenuItem ) => void` | No | - | Callback fired when an item within the `<Menu />` is selected |
| Menu | onDismiss | `( event: React.UIEvent \| React.FocusEvent, documentClick: boolean ) => void` | No | - | If a trigger is supplied, callback fired when the `<Menu />` is closed |
| Menu | onFocus | `(event: React.FocusEvent) => void` | No | - | If a trigger is supplied, callback fired when the `<Menu />` trigger is focused |
| Menu | onMouseOver | `(event: React.MouseEvent) => void` | No | - | If a trigger is supplied, callback fired onMouseOver for the `<Menu />` trigger |
| Menu | onKeyDown | `(event: React.KeyboardEvent<HTMLElement>) => void` | No | - | Callback fired on the onKeyDown of the `<Menu />` |
| Menu | onKeyUp | `(event: React.KeyboardEvent<HTMLElement>) => void` | No | - | Callback fired on the onKeyUp of the `<Menu />` |
| Menu | menuRef | `(el: HTMLElement \| null) => void` | No | - | A function that returns a reference to the `<Menu />` |
| Menu | popoverRef | `(el: Popover \| null) => void` | No | - | A function that returns a reference to the `<Popover />` |
| Menu | mountNode | `PositionMountNode` | No | `null` | If a trigger is supplied, an element or a function returning an element to use as the mount node for the `<Menu />` (defaults to `document.body`) |
| Menu | constrain | `PositionConstraint` | No | `'window'` | The parent in which to constrain the menu. One of: 'window', 'scroll-parent', 'parent', 'none', an element, or a function returning an element |
| Menu | shouldHideOnSelect | `boolean` | No | `true` | If a trigger is supplied, should the `<Menu />` hide when an item is selected |
| Menu | shouldFocusTriggerOnClose | `boolean` | No | `true` | If a trigger is supplied, should the `<Menu />` focus the trigger on after closing |
| Menu | positionContainerDisplay | `'inline-block' \| 'block'` | No | - | If a trigger is supplied, this prop can set the CSS `display` property on the `<span>` container element of the underlying Position component |
| Menu | type | `literal` | No | - | The type of `<Menu />` |
| Menu | id | `string` | No | - |  |
| Menu | withArrow | `boolean` | No | `true` | Whether or not an arrow pointing to the trigger should be rendered |
| Menu | offsetX | `string \| number` | No | `0` | The horizontal offset for the positioned content. Works only if `trigger` is provided. |
| Menu | offsetY | `string \| number` | No | `0` | The vertical offset for the positioned content. Works only if `trigger` is provided. |
| Menu | maxHeight | `string \| number` | No | - | The maximum height the menu can be. If not set, the menu won't scroll and will be as tall as the content requires |
| Menu | renderLabelInfo | `React.ReactNode \| (() => React.ReactNode)` | No | - | Content to render in the label's info region. It is only visible on nested Menus. |
| Menu | controls | `React.AriaAttributes['aria-controls']` | No | - |  |
| Menu.MenuItemGroup | label | `React.ReactNode` | Yes | - |  |
| Menu.MenuItemGroup | allowMultiple | `boolean` | No | `false` |  |
| Menu.MenuItemGroup | children | `React.ReactNode` | No | `null` | children of type `Menu.Item`, `Menu.Separator` |
| Menu.MenuItemGroup | selected | `(string \| number)[]` | No | - | an array of the values (or indices by default) for the selected items |
| Menu.MenuItemGroup | defaultSelected | `(string \| number)[]` | No | `[]` | an array of the values (or indices by default) for the selected items on initial render |
| Menu.MenuItemGroup | onSelect | `( e: React.MouseEvent, updated: MenuItemProps['value'][], selected: MenuItemProps['selected'], item: MenuItem ) => void` | No | - | call this function when a menu item is selected |
| Menu.MenuItemGroup | onMouseOver | `(e: React.MouseEvent, args: MenuItem) => void` | No | - |  |
| Menu.MenuItemGroup | controls | `string` | No | - | the id of the element that the menu items will act upon |
| Menu.MenuItemGroup | itemRef | `(element: MenuItem \| null) => void` | No | - | returns a reference to the `MenuItem` |
| Menu.MenuItemGroup | disabled | `boolean` | No | `false` |  |
| Menu.MenuItemGroup | isTabbable | `boolean` | No | `false` | should the group appear in the tab order (the first item will have a tabIndex of 0) |
| Menu.MenuItem | children | `React.ReactNode` | Yes | - | the menu item label |
| Menu.MenuItem | defaultSelected | `boolean` | No | - | whether to set the menu item state to selected or not on initial render |
| Menu.MenuItem | selected | `boolean` | No | - | whether the menu item is selected or not (must be accompanied by an `onSelect` prop) |
| Menu.MenuItem | onSelect | `( e: React.MouseEvent, value: MenuItemProps['value'], selected: MenuItemProps['selected'], args: MenuItem ) => void` | No | - | when used with the `selected` prop, the component will not control its own state |
| Menu.MenuItem | onClick | `(e: React.MouseEvent) => void` | No | - |  |
| Menu.MenuItem | onKeyDown | `(e: React.KeyboardEvent) => void` | No | - |  |
| Menu.MenuItem | onKeyUp | `(e: React.KeyboardEvent) => void` | No | - |  |
| Menu.MenuItem | onMouseOver | `(e: React.MouseEvent, args: MenuItem) => void` | No | - |  |
| Menu.MenuItem | controls | `string` | No | - | the id of the element that the menu item will act upon |
| Menu.MenuItem | disabled | `boolean` | No | `false` |  |
| Menu.MenuItem | as | `keyof JSX.IntrinsicElements \| ComponentType<P>` | No | - | the element type to render as (will default to `<a>` if href is provided) |
| Menu.MenuItem | type | `'button' \| 'checkbox' \| 'radio' \| 'flyout'` | No | `'button'` | How this component should be rendered. If it's `checkbox` or `radio` it will display a checkmark based on its own 'selected' state, if it's `flyout` it will render an arrow after the label. |
| Menu.MenuItem | value | `string \| number` | No | - | Arbitrary value that you can store in this component. Is sent out by the `onSelect` event |
| Menu.MenuItem | href | `string` | No | - | Value of the `href` prop that will be put on the underlying DOM element. |
| Menu.MenuItem | target | `string` | No | - | Where to display the linked URL, as the name for a browsing context (a tab, window, or <iframe>). |
| Menu.MenuItem | renderLabelInfo | `React.ReactNode \| (() => React.ReactNode)` | No | - | Content to render in the label's info region |

### Usage

Install the package:

```shell
npm install @instructure/ui-menu
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Menu } from '@instructure/ui-menu'
```

