# SideNavBar


A top-level `SideNavBar` component.

```js
---
type: example
---
  const Example = () => {
    const [minimized, setMinimized] = React.useState(false)

    return (
      <div style={{height: '47rem', width: '10rem'}}>
        <SideNavBar
          label="Main navigation"
          toggleLabel={{
            expandedLabel: 'Minimize SideNavBar',
            minimizedLabel: 'Expand SideNavBar'
          }}
          onMinimized={(_e, isMinimized) => setMinimized(isMinimized)}
        >
          <SideNavBar.Item
            icon={<GlobeInstUIIcon size={minimized ? "small" : "medium"}/>}
            label={<ScreenReaderContent>Home</ScreenReaderContent>}
            href="#"
            themeOverride={{
              contentPadding: '1em 0.375rem 1em 0.375rem'
            }}
          />
          <SideNavBar.Item
            icon={<Avatar name="Ziggy Marley" size="x-small" src={avatarSquare} showBorder="always"/>}
            label="Account"
            onClick={() => { this.loadSubNav('account') }}
          />
          <SideNavBar.Item
            icon={<ShieldUserInstUIIcon />}
            label="Admin"
            href="#"
          />
          <SideNavBar.Item selected
            icon={<LayoutDashboardInstUIIcon />}
            label="Dashboard"
            href="#"
          />
          <SideNavBar.Item
            icon={<BookTextInstUIIcon />}
            label="Courses"
            href="#"
          />
          <SideNavBar.Item
            icon={<CalendarDaysInstUIIcon />}
            label="Calendar"
            href="#"
          />
          <SideNavBar.Item
            icon={
              <Badge count={99}
                formatOutput={function (formattedCount) {
                  return (
                    <AccessibleContent alt={`You have ${formattedCount} unread messages.`}>
                      {formattedCount}
                    </AccessibleContent>
                  )
                }}
              >
                <InboxInstUIIcon />
              </Badge>
            }
            label="Inbox"
            href="#"
          />
          <SideNavBar.Item
            icon={<Clock4InstUIIcon />}
            label="History"
            href="#"
          />
          <SideNavBar.Item
            icon={<HelpCircleInstUIIcon />}
            label="Help"
            href="#"
          />
        </SideNavBar>
      </div>
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
    <Figure.Item>Use for top-level SideNavBar</Figure.Item>
    <Figure.Item>Remember that SideNavBar can be themed by the institution</Figure.Item>
    <Figure.Item>When using an <Link href="/#Avatar">Avatar</Link> in the SideNavBar it should have the <code>showBorder="always"</code> prop</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Add LTI links to the main area</Figure.Item>
  </Figure>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| SideNavBar | minimized | `boolean` | No | - | When minimized is set to true, the `<SideNavBar />` shows icons only while the text becomes a tooltip. When it is set to false, the `<SideNavBar />` shows text in addition to the icons |
| SideNavBar | defaultMinimized | `boolean` | No | `false` | Whether the `<SideNavBar />` is initially minimized (uncontrolled) |
| SideNavBar | onMinimized | `(event: React.SyntheticEvent, minimized: boolean) => void` | No | - |  |
| SideNavBar | label | `string` | Yes | - | Screen reader label for the main SideNavBar |
| SideNavBar | toggleLabel | `{ expandedLabel?: string minimizedLabel?: string }` | Yes | - | Screen reader label for the toggle button expanded/minimized state |
| SideNavBar | href | `string` | No | - | If the `<SideNavBar.Item>` goes to a new page, pass an href |
| SideNavBar | onClick | `(event: React.MouseEvent) => void` | No | `function (_e: React.MouseEvent) {}` | If the `<SideNavBar.Item>` does not go to a new page pass an onClick |
| SideNavBar | children | `React.ReactNode` | No | `null` | children of type SideNavBar.Item |
| SideNavBar.SideNavBarItem | elementRef | `(el: Element \| null) => void` | No | - | The reference to the underlying HTML element |
| SideNavBar.SideNavBarItem | icon | `React.ReactNode` | Yes | - | The visual to display (ex. an Image, Logo, Avatar, or Icon) |
| SideNavBar.SideNavBarItem | label | `React.ReactNode` | Yes | - | The text to display for the SideNavBar Link |
| SideNavBar.SideNavBarItem | as | `AsElementType` | No | `'a'` | The element type to render as (will default to `<a>` if href is provided) |
| SideNavBar.SideNavBarItem | href | `string` | No | - | If the SideNavBarItem goes to a new page, pass an href |
| SideNavBar.SideNavBarItem | onClick | `(event: React.MouseEvent) => void` | No | - | If the SideNavBarItem does not go to a new page pass an onClick |
| SideNavBar.SideNavBarItem | selected | `boolean` | No | `false` | Denotes which SideNavBarItem is currently selected |
| SideNavBar.SideNavBarItem | minimized | `boolean` | No | `false` | When minimized is set to true, the `<SideNavBar />` shows icons only while the text becomes a tooltip. When it is set to false, the `<SideNavBar />` shows text in addition to the icons |

### Usage

Install the package:

```shell
npm install @instructure/ui-side-nav-bar
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { SideNavBar } from '@instructure/ui-side-nav-bar'
```

