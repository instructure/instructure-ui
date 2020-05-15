---
describes: DrawerLayout
---

The `<DrawerLayout />` component creates a layout consisting of both `<DrawerLayout.Tray />` and `<DrawerLayout.Content />`.
The tray can be placed at the `start` or `end` position. When there is sufficient space available,
the tray is positioned alongside the content. As the screen gets smaller, the `<DrawerTray />` can
be configured to overlay the `<DrawerLayout.Content />`

The `minWidth` prop specifies a breakpoint. When the `<DrawerLayout.Content />` resizes such that the width is
less than the designated `minWidth`, the tray overlays the content

```js
---
render: false
example: true
---
class Example extends React.Component {
  state = {
    open: false,
    trayIsOverlayed: false
  };
  handleOverlayTrayChange = (trayIsOverlayed) => {
    this.setState({ trayIsOverlayed })
  };
  handleTrayDismiss = () => {
    this.setState({ open: false })
  };
  render () {
    return (
      <View
        height="25rem"
        as="div"
        background="primary"
        position="relative"
      >
        { this.state.trayIsOverlayed && this.state.open && <Mask onClick={this.handleTrayDismiss} /> }
        <DrawerLayout onOverlayTrayChange={this.handleOverlayTrayChange}>
          <DrawerLayout.Tray
            id="DrawerLayoutTrayExample1"
            open={this.state.open}
            placement="start"
            label="Drawer Tray Start Example"
            onDismiss={this.handleTrayDismiss}
          >
            <View
              as="div"
              maxWidth="16rem"
              textAlign="center"
              margin="large auto"
              padding="small"
            >
              <CloseButton
                placement="end"
                offset="small"
                onClick={this.handleTrayDismiss}
                screenReaderLabel="Close"
              />
              <Avatar name="foo bar" margin="0 0 small 0" />
              <Text as="div" size="x-small">
                Hello from start tray with a small amount of placeholder content
              </Text>
            </View>
          </DrawerLayout.Tray>
          <DrawerLayout.Content label="Drawer content example">
            <div style={{background: 'white', height: '100%'}}>
              <View as="div" padding="x-large">
                <Heading border="bottom">A simple drawer layout</Heading>
                <Grid startAt="medium" vAlign="middle" colSpacing="none">
                  <Grid.Row>
                    <Grid.Col>
                      <Button
                        margin="small 0"
                        size="small"
                        onClick={() => { this.setState({ open: true }) }}
                        aria-haspopup={this.state.trayIsOverlayed ? 'dialog' : 'region'}
                        aria-controls="DrawerLayoutTrayExample1"
                      >
                        Expand tray
                      </Button>
                    </Grid.Col>
                  </Grid.Row>
                </Grid>
                <Text size="x-small">
                  <p>{lorem.paragraph()}</p>
                </Text>
                <Text size="x-small">
                  <p>{lorem.paragraph()}</p>
                </Text>
              </View>
            </div>
          </DrawerLayout.Content>
        </DrawerLayout>
      </View>
    )
  }
}

render(<Example />)
```

Multiple `<DrawerLayout />` components can be nested in order to place trays on both sides


```js
---
render: false
example: true
---
class Example extends React.Component {
  state = {
    endOpen: false,
    startOpen: false
  };
  render () {
    return (
      <View
        height="40rem"
        display="block"
        background="primary"
      >
        <DrawerLayout>
          <DrawerLayout.Tray
            open={this.state.endOpen}
            placement="end"
            label="Drawer Tray End Example"
            onDismiss={() => {this.setState({ endOpen: false })}}
          >
            <View
              as="div"
              maxWidth="48rem"
              textAlign="center"
              margin="large auto"
              padding="large"
            >
              <CloseButton
                placement="end"
                offset="small"
                onClick={() => {
                  this.setState({ endOpen: false })
                }}
                screenReaderLabel="Close"
              />
              <Text as="div" size="x-small">
                Hello from end tray with a good amount of content as well
              </Text>
            </View>
          </DrawerLayout.Tray>
          <DrawerLayout.Content label="Drawer content example containing another layout">
            <DrawerLayout>
              <DrawerLayout.Tray
                label="Layout Tray Start Example"
                open={this.state.startOpen}
                placement="start"
                onDismiss={() => {this.setState({ startOpen: false })}}
              >
                <View
                  as="div"
                  maxWidth="16rem"
                  textAlign="center"
                  margin="large auto"
                  padding="small"
                >
                  <CloseButton
                    placement="end"
                    offset="small"
                    onClick={() => {
                      this.setState({ startOpen: false })
                    }}
                    screenReaderLabel="Close"
                  />
                  <Avatar name="foo bar" margin="0 0 small 0" />
                  <Text as="div" size="x-small">
                    Hello from start tray with a small amount of placeholder content
                  </Text>
                </View>
              </DrawerLayout.Tray>
              <DrawerLayout.Content label="Drawer content example containing a responsive ">
                <div style={{background: 'white', height: '100%'}}>
                  <View as="div" padding="x-large">
                    <Heading border="bottom">A nested drawer layout</Heading>
                    <Grid startAt="medium" vAlign="middle" colSpacing="none">
                      <Grid.Row>
                        <Grid.Col>
                          <Button
                            margin="small 0"
                            size="small"
                            onClick={() => { this.setState({ startOpen: true }) }}
                            aria-haspopup="dialog"
                          >
                            Expand start tray
                          </Button>
                        </Grid.Col>
                        <Grid.Col width="auto">
                          <Button
                            margin="small 0"
                            size="small"
                            onClick={() => { this.setState({ endOpen: true }) }}
                            aria-haspopup="dialog"
                          >
                            Expand end tray
                          </Button>
                        </Grid.Col>
                      </Grid.Row>
                      <Grid.Row colSpacing="medium">
                        <Grid.Col>
                          <Img role="img" src={placeholderImage(250, 250)} />
                        </Grid.Col>
                        <Grid.Col>
                          <Img role="img" src={placeholderImage(250, 250)} />
                        </Grid.Col>
                        <Grid.Col>
                          <Img role="img" src={placeholderImage(250, 250)} />
                        </Grid.Col>
                      </Grid.Row>
                    </Grid>
                    <Text size="x-small">
                      <p>{lorem.paragraph()}</p>
                    </Text>
                    <Text size="x-small">
                      <p>{lorem.paragraph()}</p>
                    </Text>
                  </View>
                </div>
              </DrawerLayout.Content>
            </DrawerLayout>
          </DrawerLayout.Content>
        </DrawerLayout>
      </View>
    )
  }
}

render(<Example />)
```
