# GlobalNav


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


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| GlobalNav | label | `string` | Yes | - | Accessible name of the navigation landmark, read by screen readers. |
| GlobalNav | collapsed | `boolean` | Yes | - | Whether the rail is collapsed, a state that the app updates in `onCollapse`. |
| GlobalNav | onCollapse | `(event: SyntheticEvent, collapsed: boolean) => void` | Yes | - | Called when the user clicks the collapse button, with the new `collapsed` value. |
| GlobalNav | collapseLabel | `string` | Yes | - | Screen reader text and tooltip of the collapse button when the rail is expanded. |
| GlobalNav | expandLabel | `string` | Yes | - | Screen reader text and tooltip of the collapse button when the rail is collapsed. |
| GlobalNav | backLabel | `string` | Yes | - | Screen reader text of the back button in a deeper SubNav level. |
| GlobalNav | closeSubNavLabel | `string` | Yes | - | Screen reader text of the handle that closes the open SubNav. |
| GlobalNav | openSubNav | `string` | No | - | The `itemID` of the item or account whose SubNav is open, or `undefined` when none is open. |
| GlobalNav | onSubNavChange | `(event: SyntheticEvent, itemID: string \| undefined) => void` | No | - | Called when the user opens or closes a SubNav, with the `itemID` of the item or `undefined`. |
| GlobalNav | items | `GlobalNavMainNavItem[]` | Yes | - | The rail items, top to bottom. |
| GlobalNav | logo | `{ /** * The URL of the logo image. */ src?: string /** * The name of the institution or product, shown next to the image or used as the alternative text of a wordmark. */ name: string /** * Whether to show `name` as text. Set it to `false` when `src` is a wide logo that already shows the name, for example a product wordmark. Defaults to `true`. */ showName?: boolean /** * The URL that the logo links to. */ href?: string }` | Yes | - | The institution logo at the top of the rail. |
| GlobalNav | account | `{ /** * Identifies the account panel in `openSubNav`. */ itemID: string /** * The heading of the account panel. */ label: string /** * The user's name, shown on the rail item and in the panel. */ name: string /** * The URL of the user's avatar. */ avatarSrc?: string /** * The text of the role pill. */ userType?: string /** * The name of the user's institution. */ institution?: string /** * The number in the badge of the rail item, which is hidden when it is 0 or missing. */ badgeCount?: number /** * Screen reader text of the badge. */ badgeLabel?: GlobalNavCountLabel /** * Whether the panel items are loading. */ loading?: boolean /** * Screen reader text of the loading spinner. */ loadingLabel?: string /** * The links of the panel. */ items?: GlobalNavSubNavItem[] /** * A section of toggles with a heading, for example user interface settings. */ toggles?: { label: string items: GlobalNavToggle[] } /** * Any content, rendered after the toggles. */ renderContent?: Renderable /** * The log out button at the end of the panel. */ logout?: { label: string href?: string onClick?: (event: MouseEvent<HTMLElement>) => void } }` | No | - | The account item of the rail and its panel. |

### Usage

Install the package:

```shell
npm install @instructure/ui-global-nav
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { GlobalNav } from '@instructure/ui-global-nav/v11_7'
```

