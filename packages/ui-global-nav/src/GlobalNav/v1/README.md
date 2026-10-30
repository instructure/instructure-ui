---
describes: GlobalNav
---

The main navigation of an app. Work in progress: the API will change, don't use it in production yet.

The app passes the content as data: `items`, `logo` and `account`.

`GlobalNav` is controlled: the app passes `collapsed` and `openSubNav`, and updates them in `onCollapse` and `onSubNavChange`.

`GlobalNav` fills the height of its container, so put it in a layout with a height.

Items are links (`href`) or buttons. An item with a `subNav` opens a sub navigation.

`logo` shows the institution mark and name. Without `src`, only the name shows, and nothing shows when the rail is collapsed.

```js
---
type: example
---
const items = [
  {
    itemID: 'dashboard',
    icon: <LayoutDashboardInstUIIcon />,
    label: 'Dashboard',
    href: '#',
    current: true
  },
  {
    itemID: 'courses',
    icon: <BookOpenInstUIIcon />,
    label: 'Courses',
    subNav: { title: 'Courses' }
  },
  {
    itemID: 'inbox',
    icon: <InboxInstUIIcon />,
    label: 'Inbox',
    href: '#',
    badgeCount: 9,
    badgeLabel: (count) => `${count} unread messages`
  }
]

const Example = () => {
  const [collapsed, setCollapsed] = React.useState(false)
  const [openSubNav, setOpenSubNav] = React.useState()
  // the light theme has a white rail, the other themes a dark one
  const onLightRail = useTheme().key === 'light'
  const wordmark = onLightRail ? canvasWordmarkDark : canvasWordmarkWhite
  const mark = onLightRail ? canvasMarkDark : canvasMarkWhite

  return (
    <View as="div" height="30rem">
      <GlobalNav
        label="Main navigation"
        collapsed={collapsed}
        onCollapse={(_e, isCollapsed) => setCollapsed(isCollapsed)}
        collapseLabel="Collapse navigation"
        expandLabel="Expand navigation"
        backLabel="Back"
        closeSubNavLabel="Close sub navigation"
        openSubNav={openSubNav}
        onSubNavChange={(_e, itemID) => setOpenSubNav(itemID)}
        logo={{
          src: collapsed ? mark : wordmark,
          name: 'Canvas',
          showName: false,
          href: '#'
        }}
        items={items}
      />
    </View>
  )
}

render(<Example />)
```

### Wordmark logo

For a logo that already shows the name, for example a product wordmark, set `showName` to `false`. The rail then shows only the image, and `name` is its alternative text. The collapsed rail needs a square mark, so pass it as `src` when `collapsed` is true, as the example above does.

### HTML attributes

`elementProps` adds HTML attributes to the link or button of an item, limited to `id`, `className`, `target`, `rel` and `data-*` attributes. GlobalNav keeps its own `aria-*` attributes and click handling.

```js
---
type: code
---
const items = [
  {
    itemID: 'dashboard',
    icon: <LayoutDashboardInstUIIcon />,
    label: 'Dashboard',
    href: '/',
    elementProps: { 'data-track': 'dashboard' }
  }
]
```
