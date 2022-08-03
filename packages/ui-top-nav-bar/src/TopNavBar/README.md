---
describes: TopNavBar
---

A `TopNavBar` component [WIP]

```js
---
example: true
render: false
---
class Example extends React.Component {
  renderSubmenu(num) {
    return (
      <Drilldown
        rootPageId={`root${num}`}
        // maxHeight="30rem"
      >
        {[
          <Drilldown.Page id={`root${num}`} key={`root${num}`}>
            <Drilldown.Option id={`Manage ${num}`} subPageId={`Manage ${num}`}>
              Manage
            </Drilldown.Option>
            <Drilldown.Option
              id={`Reporting ${num}`}
              subPageId={`Reporting ${num}`}
            >
              Reporting
            </Drilldown.Option>
            <Drilldown.Option
              id={`Assessment ${num}`}
              subPageId={`Assessment ${num}`}
            >
              Assessment
            </Drilldown.Option>
            <Drilldown.Option id={`Item Bank ${num}`} href="/">
              Item Bank
            </Drilldown.Option>
            <Drilldown.Option id={`Progress Reports ${num}`} href="/">
              Progress Reports
            </Drilldown.Option>
          </Drilldown.Page>,
          ...[`Manage ${num}`, `Reporting ${num}`, `Assessment ${num}`].map(
            (submenu) => (
              <Drilldown.Page id={submenu} key={submenu}>
                {Array.from(Array(5)).map((_item, idx) => (
                  <Drilldown.Option
                    id={`${submenu}_${idx}`}
                    key={`${submenu}_${idx}`}
                  >
                    Level 2 Menu Item
                  </Drilldown.Option>
                ))}
              </Drilldown.Page>
            )
          )
        ]}
      </Drilldown>
    )
  }

  render() {
    const commonSettings = {
      renderBrand: (
        <TopNavBar.Brand>
          <TopNavBar.Item id="Brand">Brand</TopNavBar.Item>
        </TopNavBar.Brand>
      ),
      renderMenuItems: (
        <TopNavBar.MenuItems>
          <TopNavBar.Item id="Overview">Overview</TopNavBar.Item>
          <TopNavBar.Item
            id="Admin"
            renderSubmenu={this.renderSubmenu(1)}
            isActive
          >
            Admin
          </TopNavBar.Item>
          <TopNavBar.Item id="Settings">Settings</TopNavBar.Item>
        </TopNavBar.MenuItems>
      ),
      renderActionItems: (
        <TopNavBar.ActionItems>
          <TopNavBar.Item id="Search">Search</TopNavBar.Item>
          <TopNavBar.Item id="Info">Info</TopNavBar.Item>
        </TopNavBar.ActionItems>
      ),
      renderUser: (
        <TopNavBar.User>
          <TopNavBar.Item id="User Name">User Name</TopNavBar.Item>
        </TopNavBar.User>
      )
    }

    const sticky = {
      position: 'sticky'
    }

    return (
      <div
        style={{
          height: '100%',
          overflow: 'hidden',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* TODO: when it has another menu on top */}
        <div
          style={{ background: 'yellow', position: 'relative', zIndex: 10000 }}
        >
          Menu
        </div>

        <div
          style={
            {
              position: 'relative'
              // ...sticky
            }
          }
        >
          <TopNavBar
            breakpoint='500'
            renderLayout={(
              <TopNavBar.Layout
                {...commonSettings}
                trayMountNode={() => document.getElementById('menuMountNode')}
              />
            )}
            // renderSmallViewportLayout={(
            //   <TopNavBar.SmallViewportLayout
            //     {...commonSettings}
            //     trayMountNode={() => document.getElementById('menuMountNode')}
            //   />
            // )}
          />
          <div
            id="menuMountNode"
            style={{
              position: 'absolute',
              top: '56px',
              left: '0px',
              width: '100%'
            }}
          />
        </div>
        <div style={{ overflow: 'auto' }}>{lorem.paragraphs(20)}</div>
      </div>
    )
  }
}

render(<Example />)
```
