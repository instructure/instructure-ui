---
describes: DrawerLayout
---

The `<DrawerLayout />` component creates a layout consisting of both `<DrawerTray />` and `<DrawerContent />`.
The tray can be placed at the `start` or `end` position. When there is sufficient space available,
the tray is positioned alongside the content. As the screen gets smaller, the `<DrawerTray />` can
be configured to overlay the `<DrawerContent />`

The `minWidth` prop specifies a breakpoint. When the `<DrawerContent />` resizes such that the width is
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
        background="default"
        style={{ position: 'relative' }}
      >
        { this.state.trayIsOverlayed && this.state.open && <Mask onClick={this.handleTrayDismiss} /> }
        <DrawerLayout onOverlayTrayChange={this.handleOverlayTrayChange}>
          <DrawerTray
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
                variant="icon"
                onClick={this.handleTrayDismiss}
              >
                Close
              </CloseButton>
              <Avatar name="foo bar" margin="0 0 small 0" />
              <Text as="div" size="x-small">
                Hello from start tray with a small amount of placeholder content
              </Text>
            </View>
          </DrawerTray>
          <DrawerContent label="Drawer content example">
            <div style={{background: 'white', height: '100%'}}>
              <View as="div" padding="x-large">
                <Heading border="bottom">A simple drawer layout</Heading>
                <Grid startAt="medium" vAlign="middle" colSpacing="none">
                  <GridRow>
                    <GridCol>
                      <Button
                        margin="small 0"
                        size="small"
                        onClick={() => { this.setState({ open: true }) }}
                        aria-haspopup={this.state.trayIsOverlayed ? 'dialog' : 'region'}
                        aria-controls="DrawerLayoutTrayExample1"
                      >
                        Expand tray
                      </Button>
                    </GridCol>
                  </GridRow>
                </Grid>
                <Text size="x-small">
                  <p>{lorem.paragraph()}</p>
                </Text>
                <Text size="x-small">
                  <p>{lorem.paragraph()}</p>
                </Text>
              </View>
            </div>
          </DrawerContent>
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
        background="default"
      >
        <DrawerLayout>
          <DrawerTray
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
                variant="icon"
                onClick={() => {
                  this.setState({ endOpen: false })
                }}
              >
                Close
              </CloseButton>
              <Text as="div" size="x-small">
                Hello from end tray with a good amount of content as well
              </Text>
            </View>
          </DrawerTray>
          <DrawerContent label="Drawer content example containing another layout">
            <DrawerLayout>
              <DrawerTray
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
                    variant="icon"
                    onClick={() => {
                      this.setState({ startOpen: false })
                    }}
                  >
                    Close
                  </CloseButton>
                  <Avatar name="foo bar" margin="0 0 small 0" />
                  <Text as="div" size="x-small">
                    Hello from start tray with a small amount of placeholder content
                  </Text>
                </View>
              </DrawerTray>
              <DrawerContent label="Drawer content example containing a responsive ">
                <div style={{background: 'white', height: '100%'}}>
                  <View as="div" padding="x-large">
                    <Heading border="bottom">A nested drawer layout</Heading>
                    <Grid startAt="medium" vAlign="middle" colSpacing="none">
                      <GridRow>
                        <GridCol>
                          <Button
                            margin="small 0"
                            size="small"
                            onClick={() => { this.setState({ startOpen: true }) }}
                            aria-haspopup="dialog"
                          >
                            Expand start tray
                          </Button>
                        </GridCol>
                        <GridCol width="auto">
                          <Button
                            margin="small 0"
                            size="small"
                            onClick={() => { this.setState({ endOpen: true }) }}
                            aria-haspopup="dialog"
                          >
                            Expand end tray
                          </Button>
                        </GridCol>
                      </GridRow>
                      <GridRow colSpacing="medium">
                        <GridCol>
                          <Img role="img" src={placeholderImage(250, 250)} />
                        </GridCol>
                        <GridCol>
                          <Img role="img" src={placeholderImage(250, 250)} />
                        </GridCol>
                        <GridCol>
                          <Img role="img" src={placeholderImage(250, 250)} />
                        </GridCol>
                      </GridRow>
                    </Grid>
                    <Text size="x-small">
                      <p>{lorem.paragraph()}</p>
                    </Text>
                    <Text size="x-small">
                      <p>{lorem.paragraph()}</p>
                    </Text>
                  </View>
                </div>
              </DrawerContent>
            </DrawerLayout>
          </DrawerContent>
        </DrawerLayout>
      </View>
    )
  }
}

render(<Example />)
```
