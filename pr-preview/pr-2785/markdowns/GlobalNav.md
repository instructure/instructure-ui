# GlobalNav


The main navigation of an app. Work in progress: the API will change, don't use it in production yet.

The app passes the navigation as data (`items` and `logo`). `GlobalNav` is controlled: the app keeps `collapsed` and `openSubNav` in its state and updates them in `onCollapse` and `onSubNavChange`.

`GlobalNav` fills the height of its container. An open SubNav makes it wider and pushes the page. While no SubNav is open, its width only depends on `collapsed`, so the strip showing or hiding doesn't move the page.

### Minimal example

A starting point to copy.

```js
---
type: example
---
const Example = () => {
  const [collapsed, setCollapsed] = React.useState(false)
  const [openSubNav, setOpenSubNav] = React.useState()

  return (
    <View as="div" height="24rem">
      <GlobalNav
        label="Main navigation"
        collapsed={collapsed}
        onCollapse={(_e, isCollapsed) => setCollapsed(isCollapsed)}
        collapseLabel="Collapse navigation"
        expandLabel="Expand navigation"
        backLabel={(title) => `Back to ${title}`}
        closeSubNavLabel="Close sub navigation"
        expandSubNavLabel="Open sub navigation"
        openSubNav={openSubNav}
        onSubNavChange={(_e, itemID) => setOpenSubNav(itemID)}
        logo={{ name: 'My app', href: '#GlobalNav' }}
        items={[
          {
            itemID: 'dashboard',
            icon: <LayoutDashboardInstUIIcon />,
            label: 'Dashboard',
            href: '#GlobalNav',
            current: true
          },
          {
            itemID: 'courses',
            icon: <BookOpenInstUIIcon />,
            label: 'Courses',
            subNav: {
              title: 'Courses',
              items: [
                {
                  itemID: 'all-courses',
                  label: 'All courses',
                  href: '#GlobalNav'
                }
              ]
            }
          }
        ]}
      />
    </View>
  )
}

render(<Example />)
```

### Example app

A mock app with pages. The navigation switches between them, and the current page is marked in the rail and in the SubNav. It starts on a course page with the Courses SubNav open. Close it to see the strip that opens it again. On Dashboard, closing a SubNav removes it completely. Help shows custom content.

```js
---
type: example
---
const courses = [
  { id: 'biology', name: 'Biology 101' },
  { id: 'history', name: 'World history' },
  { id: 'algebra', name: 'Algebra II' }
]
const coursePages = ['Home', 'Modules', 'Grades']
const pageTitles = {
  dashboard: 'Dashboard',
  courses: 'All courses',
  calendar: 'Calendar',
  inbox: 'Inbox'
}

const Example = () => {
  // the current page, for example 'dashboard' or 'courses/biology/Modules'
  const [page, setPage] = React.useState('courses/biology/Home')
  const [collapsed, setCollapsed] = React.useState(false)
  // a course page loads with the Courses SubNav open
  const [openSubNav, setOpenSubNav] = React.useState('courses')
  const [unread, setUnread] = React.useState(9)

  // a real app navigates with its router, this example only switches the mock page
  const link = (path) => ({
    href: '#GlobalNav',
    current: page === path,
    onClick: (event) => {
      event.preventDefault()
      setPage(path)
      if (path === 'inbox') setUnread(0)
    }
  })

  // the light theme has a white rail, the other themes a dark one
  const onLightRail = useTheme().key === 'light'
  const wordmark = onLightRail ? canvasWordmarkDark : canvasWordmarkWhite
  const mark = onLightRail ? canvasMarkDark : canvasMarkWhite

  const items = [
    {
      itemID: 'dashboard',
      icon: <LayoutDashboardInstUIIcon />,
      label: 'Dashboard',
      ...link('dashboard')
    },
    {
      itemID: 'courses',
      icon: <BookOpenInstUIIcon />,
      label: 'Courses',
      // the section of the current page, so its SubNav collapses to a strip
      current: page.startsWith('courses'),
      subNav: {
        title: 'Courses',
        items: [
          { itemID: 'all-courses', label: 'All courses', ...link('courses') },
          ...courses.map((course) => ({
            itemID: course.id,
            label: course.name,
            subNav: {
              title: course.name,
              items: coursePages.map((coursePage) => ({
                itemID: `${course.id}-${coursePage}`,
                label: coursePage,
                ...link(`courses/${course.id}/${coursePage}`)
              }))
            }
          }))
        ]
      }
    },
    {
      itemID: 'calendar',
      icon: <CalendarInstUIIcon />,
      label: 'Calendar',
      ...link('calendar')
    },
    {
      itemID: 'inbox',
      icon: <InboxInstUIIcon />,
      label: 'Inbox',
      badgeCount: unread,
      badgeLabel: (count) => `${count} unread messages`,
      elementProps: { 'data-analytics': 'global-nav-inbox' },
      ...link('inbox')
    },
    {
      itemID: 'help',
      icon: <CircleHelpInstUIIcon />,
      label: 'Help',
      subNav: {
        title: 'Help',
        renderContent: () => (
          <View as="div" padding="0 small">
            <Text as="p" size="small">
              Find answers to common questions.
            </Text>
            <List isUnstyled itemSpacing="small">
              <List.Item>
                <Link href="#GlobalNav">Search the guides</Link>
              </List.Item>
              <List.Item>
                <Link href="#GlobalNav">Ask your instructor a question</Link>
              </List.Item>
              <List.Item>
                <Link href="#GlobalNav">Report a problem</Link>
              </List.Item>
            </List>
          </View>
        )
      }
    }
  ]

  const [, courseID, coursePage] = page.split('/')
  const course = courses.find((c) => c.id === courseID)

  return (
    <View as="div" display="flex" height="36rem">
      <GlobalNav
        label="Main navigation"
        collapsed={collapsed}
        onCollapse={(_e, isCollapsed) => setCollapsed(isCollapsed)}
        collapseLabel="Collapse navigation"
        expandLabel="Expand navigation"
        backLabel={(title) => `Back to ${title}`}
        closeSubNavLabel="Close sub navigation"
        expandSubNavLabel="Open sub navigation"
        openSubNav={openSubNav}
        onSubNavChange={(_e, itemID) => setOpenSubNav(itemID)}
        logo={{
          src: collapsed ? mark : wordmark,
          name: 'Canvas',
          showName: false,
          href: '#GlobalNav'
        }}
        items={items}
      />
      <View as="div" width="100%" padding="medium" background="secondary">
        {course && <Text size="small">{course.name}</Text>}
        <Heading level="h2" margin="0 0 small">
          {course ? coursePage : pageTitles[page]}
        </Heading>
        <Text>A mock page. Use the navigation to switch pages.</Text>
      </View>
    </View>
  )
}

render(<Example />)
```

### How it behaves

- One SubNav is open at a time. Clicking its rail item again, its close handle or a rail item without a `subNav` closes it. A click with a modifier key, for example to open a link in a new tab, keeps it open.
- When the user opens a SubNav or a deeper level, focus moves to its first item: in custom content to its first focusable element, and without either to the close handle. Back returns focus to the item that opened the level, and closing returns it to the rail item. Focus doesn't move when the app sets `openSubNav` itself.
- A SubNav opens on the level of its deepest `current` item.
- Set `current` on the rail item of the current page's section. Closing its SubNav then leaves a narrow strip that opens it again on click. Other SubNavs close completely.
- The back button shows the title of the level it returns to, and `backLabel` gets that title for the screen reader text, for example "Back to Courses".
- `renderContent` shows any content in place of `items`, inside the panel frame. Use it for content that can't be navigation items yet, for example while migrating an existing product.

### HTML attributes

The app can set `data-*` attributes on the elements below, for example for analytics or tests, and `id` or `className` where the table lists them. `GlobalNav`'s own attributes, such as `href`, `aria-*` and `role`, always win.

| Element                                | Prop                         | Attributes                                   |
| -------------------------------------- | ---------------------------- | -------------------------------------------- |
| root `nav`                             | GlobalNav's own props        | `id`, `data-*`                               |
| `ul` of the rail items                 | `listElementProps`           | `id`, `className`, `data-*`                  |
| collapse button                        | `collapseButtonElementProps` | `id`, `data-*`                               |
| logo link, or its `div` without `href` | `logo.elementProps`          | `id`, `className`, `data-*`                  |
| item link or button                    | `item.elementProps`          | `id`, `className`, `target`, `rel`, `data-*` |
| rail item `li`                         | `item.itemElementProps`      | `id`, `className`, `data-*`                  |
| SubNav item `li`                       | `item.itemElementProps`      | `className`, `data-*`                        |
| element around the item label          | `item.labelElementProps`     | `className`, `data-*`                        |
| SubNav panel `nav` (top level only)    | `subNav.elementProps`        | `id`, `data-*`                               |
| SubNav `ul`                            | `subNav.listElementProps`    | `id`, `data-*`                               |

The label element stays in the DOM when the rail is collapsed, inside `ScreenReaderContent`, and still names the item. When `subNav.elementProps.id` is set, the panel uses it, and its rail item points to it with `aria-controls`.


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| GlobalNav | label | `string` | Yes | - | Accessible name of the navigation landmark, read by screen readers. |
| GlobalNav | collapsed | `boolean` | Yes | - | Whether the rail is collapsed, a state that the app updates in `onCollapse`. |
| GlobalNav | onCollapse | `(event: SyntheticEvent, collapsed: boolean) => void` | Yes | - | Called when the user clicks the collapse button, with the new `collapsed` value. |
| GlobalNav | collapseLabel | `string` | Yes | - | Screen reader text and tooltip of the collapse button when the rail is expanded. |
| GlobalNav | expandLabel | `string` | Yes | - | Screen reader text and tooltip of the collapse button when the rail is collapsed. |
| GlobalNav | backLabel | `(parentTitle: string) => string` | Yes | - | Screen reader text of the back button in a deeper SubNav level, from the title of the level it returns to. |
| GlobalNav | closeSubNavLabel | `string` | Yes | - | Screen reader text and tooltip of the handle that closes the open SubNav. |
| GlobalNav | expandSubNavLabel | `string` | Yes | - | Screen reader text and tooltip of the button that opens the SubNav of the current page again. |
| GlobalNav | openSubNav | `string` | No | - | The `itemID` of the item or account whose SubNav is open, or `undefined` when none is open. |
| GlobalNav | onSubNavChange | `(event: SyntheticEvent, itemID: string \| undefined) => void` | No | - | Called when the user opens or closes a SubNav, with the `itemID` of the item or `undefined`. |
| GlobalNav | items | `GlobalNavMainNavItem[]` | Yes | - | The rail items, top to bottom. |
| GlobalNav | listElementProps | `Pick< HTMLAttributes<HTMLElement>, 'id' \| 'className' > & { // object literals typed as HTML attributes reject data-* keys without this [key: `data-${string}`]: string \| number \| boolean \| undefined }` | No | - | HTML attributes for the `ul` element of the rail items: `id`, `className` and `data-*`. |
| GlobalNav | collapseButtonElementProps | `Omit<GlobalNavHTMLProps, 'className'>` | No | - | HTML attributes for the collapse button: `id` and `data-*`. |
| GlobalNav | logo | `{ /** * The URL of the logo image. */ src?: string /** * The name of the institution or product, shown next to the image or used as the alternative text of a wordmark. */ name: string /** * Whether to show `name` as text. Set it to `false` when `src` is a wide logo that already shows the name, for example a product wordmark. Defaults to `true`. */ showName?: boolean /** * The URL that the logo links to. */ href?: string /** * HTML attributes for the logo's link, or its `div` without `href`: `id`, `className` and `data-*`. */ elementProps?: GlobalNavHTMLProps }` | Yes | - | The institution logo at the top of the rail. |
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

