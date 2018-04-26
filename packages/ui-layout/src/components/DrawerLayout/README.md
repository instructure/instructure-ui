---
describes: DrawerLayout
---

The `<DrawerLayout />` component creates a layout consisting of both `<DrawerTray />` and `<DrawerContent />`.
The tray can be placed at the `start` or `end` position. When there is sufficient space available, 
the tray is positioned alongside the content. As the screen gets smaller, the `<DrawerTray />` can 
be configured to overlay the `<DrawerContent />`

The `minWidth` prop specifies a breakpoint. When the `<DrawerContent />` resizes such that the width is
less than the designated `minWidth`, the tray overlays the content

### Rendering Tray Content
`<DrawerTray />` accepts a `render` function or `children` function which gets passed a single boolean
argument `positioned`. The `positioned` argument indicates when the tray has finished transitioning.
When rendering a `Dialog` for accessibility, the `positioned` argument can be used to conditionally
render the `Dialog` after the `<DrawerTray />` is completely positioned. Otherwise the screen will
jolt to the side when the `Dialog` receives focus and is yet to transition onscreen.

```js
---
render: false
example: true
---
class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
    }
  };

  renderCloseButton (closeTray) {
    return (
      <CloseButton
        placement="end"
        offset="small"
        variant="icon"
        onClick={closeTray}
      >
        Close
      </CloseButton>
    )
  }

  render () {
    return (
      <View height="25rem">
        <DrawerLayout>
          <DrawerTray
            label="Drawer Tray Start Example"
            closeButtonLabel="Close"
            open={this.state.open}
            placement="start"
            liveRegion={() => document.getElementById('flash-messages')}
            render={(positioned) => {
              let trayContent = (
                <View
                  as="div"
                  maxWidth="16rem"
                  textAlign="center"
                  margin="large auto"
                  padding="small"
                >
                  {this.renderCloseButton(() => { 
                    this.setState({ open: false }) 
                  })}
                  <Avatar name="foo bar" margin="0 0 small 0" />
                  <Text as="div" size="x-small">
                    Hello from start tray with a small amount of placeholder content
                  </Text>
                </View>
              )

              if (positioned) {
                trayContent = (
                  <Dialog
                    open
                    shouldContainFocus
                    shouldCloseOnDocumentClick={false}
                    shouldReturnFocus
                    role="region"
                  >
                    {trayContent}
                  </Dialog>
                )
              }

              return trayContent
            }}
          />
          <DrawerContent label="Drawer content example">
            <div style={{background: 'white', height: '100%'}}>
              <Container as="div" padding="x-large">
                <Heading border="bottom">A simple drawer layout</Heading>
                <Grid startAt="medium" vAlign="middle" colSpacing="none">
                  <GridRow>
                    <GridCol>
                      <Button
                        margin="small 0"
                        size="small"
                        onClick={() => { this.setState({ open: true }) }}
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
              </Container>
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
  constructor (props) {
    super(props)
    this.state = {
      startOpen: false,
      endOpen: false
    }
  }

  renderCloseButton (closeTray) {
    return (
      <CloseButton
        placement="end"
        offset="small"
        variant="icon"
        onClick={closeTray}
      >
        Close
      </CloseButton>
    )
  }

  render () {
    return (
      <View height="40rem">
        <DrawerLayout>
          <DrawerTray
            label="Drawer Tray End Example"
            closeButtonLabel="Close"
            open={this.state.endOpen}
            placement="end"
            onDismiss={() => {this.setState({ endOpen: false })}}
            render={(positioned) => {
              let trayContent = (
                <View
                  as="div"
                  maxWidth="48rem"
                  textAlign="center"
                  margin="large auto"
                  padding="large"
                >
                  {this.renderCloseButton(() => { 
                    this.setState({ endOpen: false }) 
                  })}   
                  <Text as="div" size="x-small">
                    Hello from end tray with a good amount of content as well
                  </Text>
                </View>
              )

              if (positioned) {
                trayContent = (
                  <Dialog
                    open
                    shouldContainFocus
                    shouldCloseOnDocumentClick={false}
                    shouldReturnFocus
                    role="region"
                  >
                    {trayContent}
                  </Dialog>
                )
              }

              return trayContent
            }}
          />
          <DrawerContent label="Drawer content example containing another layout">
            <DrawerLayout>
              <DrawerTray
                label="Layout Tray Start Example"
                closeButtonLabel="Close"
                open={this.state.startOpen}
                placement="start"
                render={(positioned) => {
                  let trayContent = (
                    <View
                      as="div"
                      maxWidth="16rem"
                      textAlign="center"
                      margin="large auto"
                      padding="small"
                    >
                      {this.renderCloseButton(() => { 
                        this.setState({ startOpen: false }) 
                      })}
                      <Avatar name="foo bar" margin="0 0 small 0" />
                      <Text as="div" size="x-small">
                        Hello from start tray with a small amount of placeholder content
                      </Text>
                    </View>
                  )

                  if (positioned) {
                    trayContent = (
                      <Dialog
                        open
                        shouldContainFocus
                        shouldCloseOnDocumentClick={false}
                        shouldReturnFocus
                        role="region"
                      >
                        {trayContent}
                      </Dialog>
                    )
                  }

                  return trayContent
                }}
              />
              <DrawerContent label="Drawer content example containing a responsive ">
                <div style={{background: 'white', height: '100%'}}>
                  <Container as="div" padding="x-large">
                    <Heading border="bottom">A nested drawer layout</Heading>
                    <Grid startAt="medium" vAlign="middle" colSpacing="none">
                      <GridRow>
                        <GridCol>
                          <Button
                            margin="small 0"
                            size="small"
                            onClick={() => { this.setState({ startOpen: true }) }}
                          >
                            Expand start tray
                          </Button>
                        </GridCol>
                        <GridCol width="auto">
                          <Button
                            margin="small 0"
                            size="small"
                            onClick={() => { this.setState({ endOpen: true }) }}
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
                  </Container>
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
