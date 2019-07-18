---
describes: AppNav
---

`AppNav` is a navigation component currently intended for use within LTI apps. AppNav
can be configured to adapt to small screen widths by truncating nav items that
don't fit within the available space.

The `onUpdate` function prop returns the number of visible nav items, while the
`renderTruncateLabel` function prop allows you to customize the trigger for the Menu
that contains the truncated items. The example below shows how you can use both of
these props to create a hamburger menu when the number of visible nav items is less
than two.

```javascript
---
example: true
render: false
---

const totalItemsCount = 5

class AppNavExample extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      visibleItemsCount: totalItemsCount
    }
  }

  handleUpdate = ({ visibleItemsCount }) => {
    this.setState({ visibleItemsCount })
  }

  render () {
    const visibleItemsCount = this.state.visibleItemsCount

    return (
      <AppNav
        screenReaderLabel="App navigation"
        visibleItemsCount={visibleItemsCount >= 2 ? visibleItemsCount : 0}
        onUpdate={this.handleUpdate}
        renderBeforeItems={
          <AppNav.Item
            renderLabel={<ScreenReaderContent>Instructure</ScreenReaderContent>}
            renderIcon={<IconCommonsLine inline={false} size="medium" color="primary" />}
            href="http://instructure.com"
          />
        }
        renderAfterItems={
          <Button
            variant="icon"
            onClick={() => console.log('Add')}
            icon={IconPlusSolid}
            margin="0 0 0 x-small"
          >
            <ScreenReaderContent>Add something</ScreenReaderContent>
          </Button>
        }
        renderTruncateLabel={function () {
          const hiddenItemsCount = totalItemsCount - visibleItemsCount
          if (visibleItemsCount >= 2) {
            return `${hiddenItemsCount} More`
          } else {
            return (
              <span>
                <IconHamburgerLine size="small" inline={false} />
                <ScreenReaderContent>{`${hiddenItemsCount} More`}</ScreenReaderContent>
              </span>
            )
          }
        }}
      >
        <AppNav.Item
          renderLabel="instructure-ui"
          href="http://instructure.design"
          renderAfter={
            <Badge
              type="notification"
              variant="success"
              standalone
              formatOutput={function () {
                return <ScreenReaderContent>You have notifications from instructure-ui</ScreenReaderContent>
              }}
            />
          }
        />
        <AppNav.Item
          isSelected
          renderLabel="Canvas"
          href="https://www.instructure.com/canvas/"
        />
        <AppNav.Item
          renderLabel="Canvas Network"
          href="https://canvas.net"
        />
        <AppNav.Item
          renderLabel={() => 'Canvas Community'}
          href="https://community.canvaslms.com/"
        />
        <AppNav.Item
          renderLabel="Bridge"
          href="https://www.instructure.com/bridge/"
        />
      </AppNav>
    )
  }
}

render(<AppNavExample />)
```
