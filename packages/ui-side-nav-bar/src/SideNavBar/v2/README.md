---
describes: SideNavBar
---

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
