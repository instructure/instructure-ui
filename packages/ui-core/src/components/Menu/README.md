---
describes: Menu
---

The `<Menu/>` component provides a list of actionable
`<MenuItems/>`that are keyboard accessible. A `<Menu/>`
is typically used in a `<Popover/>`, so you may be looking for the [PopoverMenu](#PopoverMenu) component.

```js
---
example: true
---
<Menu labelledBy="foobar"
  onSelect={function () { console.log(arguments) }}
  onDismiss={function () { console.log(arguments) }}
>
  <MenuItem href="example.html">Default (Grid view)</MenuItem>
  <MenuItem value="foo">Learning Mastery</MenuItem>
  <MenuItem disabled>Individual (List view)</MenuItem>
  <MenuItemSeparator />
  <MenuItemGroup label="Select one">
    <MenuItem defaultSelected value="one">
      Select me
    </MenuItem>
    <MenuItem value="two">
      Or select me
    </MenuItem>
  </MenuItemGroup>
  <MenuItemSeparator />
  <MenuItemFlyout label="More Options">
    <MenuItemGroup allowMultiple label="Select many">
      <MenuItem defaultSelected value="one">
        Select me
      </MenuItem>
      <MenuItem value="two">
        And select me
      </MenuItem>
      <MenuItem defaultSelected value="three">
        And me
      </MenuItem>
    </MenuItemGroup>
  </MenuItemFlyout>
  <MenuItem value="baz">Open grading history...</MenuItem>
</Menu>
```
