# DrawerLayout


The `<DrawerLayout />` component creates a layout consisting of both `<DrawerLayout.Tray />` and `<DrawerLayout.Content />`.
The tray can be placed at the `start` or `end` position. When there is sufficient space available,
the tray is positioned alongside the content. As the screen gets smaller, the `<DrawerTray />` can
be configured to overlay the `<DrawerLayout.Content />`

The `minWidth` prop specifies a breakpoint. When the `<DrawerLayout.Content />` resizes such that the width is
less than the designated `minWidth`, the tray overlays the content

- ```js
  class Example extends React.Component {
    state = {
      open: false,
      trayIsOverlayed: false
    }
    handleOverlayTrayChange = (trayIsOverlayed) => {
      this.setState({ trayIsOverlayed })
    }
    handleTrayDismiss = () => {
      this.setState({ open: false })
    }
    render() {
      return (
        <View height="25rem" as="div" background="primary" position="relative">
          {this.state.trayIsOverlayed && this.state.open && (
            <Mask onClick={this.handleTrayDismiss} />
          )}
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
                  Hello from start tray with a small amount of placeholder
                  content
                </Text>
              </View>
            </DrawerLayout.Tray>
            <DrawerLayout.Content label="Drawer content example">
              <div style={{ background: 'white', height: '100%' }}>
                <View as="div" padding="x-large">
                  <Heading border="bottom">A simple drawer layout</Heading>
                  <Grid startAt="medium" vAlign="middle" colSpacing="none">
                    <Grid.Row>
                      <Grid.Col>
                        <Button
                          margin="small 0"
                          size="small"
                          onClick={() => {
                            this.setState({ open: true })
                          }}
                          aria-haspopup={
                            this.state.trayIsOverlayed ? 'dialog' : 'region'
                          }
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

- ```js
  const Example = () => {
    const [open, setOpen] = useState(false)
    const [trayIsOverlayed, setTrayIsOverlayed] = useState(false)

    const handleOverlayTrayChange = (trayIsOverlayed) => {
      setTrayIsOverlayed(trayIsOverlayed)
    }

    const handleTrayDismiss = () => {
      setOpen(false)
    }

    return (
      <View height="25rem" as="div" background="primary" position="relative">
        {trayIsOverlayed && open && <Mask onClick={handleTrayDismiss} />}
        <DrawerLayout onOverlayTrayChange={handleOverlayTrayChange}>
          <DrawerLayout.Tray
            id="DrawerLayoutTrayExample1"
            open={open}
            placement="start"
            label="Drawer Tray Start Example"
            onDismiss={handleTrayDismiss}
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
                onClick={handleTrayDismiss}
                screenReaderLabel="Close"
              />
              <Avatar name="foo bar" margin="0 0 small 0" />
              <Text as="div" size="x-small">
                Hello from start tray with a small amount of placeholder content
              </Text>
            </View>
          </DrawerLayout.Tray>
          <DrawerLayout.Content label="Drawer content example">
            <div style={{ background: 'white', height: '100%' }}>
              <View as="div" padding="x-large">
                <Heading border="bottom">A simple drawer layout</Heading>
                <Grid startAt="medium" vAlign="middle" colSpacing="none">
                  <Grid.Row>
                    <Grid.Col>
                      <Button
                        margin="small 0"
                        size="small"
                        onClick={() => {
                          setOpen(true)
                        }}
                        aria-haspopup={trayIsOverlayed ? 'dialog' : 'region'}
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

  render(<Example />)
  ```

Multiple `<DrawerLayout />` components can be nested in order to place trays on both sides

- ```js
  class Example extends React.Component {
    state = {
      endOpen: false,
      startOpen: false
    }
    render() {
      return (
        <View height="40rem" display="block" background="primary">
          <DrawerLayout>
            <DrawerLayout.Tray
              open={this.state.endOpen}
              placement="end"
              label="Drawer Tray End Example"
              onDismiss={() => {
                this.setState({ endOpen: false })
              }}
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
                  onDismiss={() => {
                    this.setState({ startOpen: false })
                  }}
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
                      Hello from start tray with a small amount of placeholder
                      content
                    </Text>
                  </View>
                </DrawerLayout.Tray>
                <DrawerLayout.Content label="Drawer content example containing a responsive ">
                  <div style={{ background: 'white', height: '100%' }}>
                    <View as="div" padding="x-large">
                      <Heading border="bottom">A nested drawer layout</Heading>
                      <Grid startAt="medium" vAlign="middle" colSpacing="none">
                        <Grid.Row>
                          <Grid.Col>
                            <Button
                              margin="small 0"
                              size="small"
                              onClick={() => {
                                this.setState({ startOpen: true })
                              }}
                              aria-haspopup="dialog"
                            >
                              Expand start tray
                            </Button>
                          </Grid.Col>
                          <Grid.Col width="auto">
                            <Button
                              margin="small 0"
                              size="small"
                              onClick={() => {
                                this.setState({ endOpen: true })
                              }}
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

- ```js
  const Example = () => {
    const [endOpen, setEndOpen] = useState(false)
    const [startOpen, setStartOpen] = useState(false)

    return (
      <View height="40rem" display="block" background="primary">
        <DrawerLayout>
          <DrawerLayout.Tray
            open={endOpen}
            placement="end"
            label="Drawer Tray End Example"
            onDismiss={() => {
              setEndOpen(false)
            }}
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
                  setEndOpen(false)
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
                open={startOpen}
                placement="start"
                onDismiss={() => {
                  setStartOpen(false)
                }}
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
                      setStartOpen(false)
                    }}
                    screenReaderLabel="Close"
                  />
                  <Avatar name="foo bar" margin="0 0 small 0" />
                  <Text as="div" size="x-small">
                    Hello from start tray with a small amount of placeholder
                    content
                  </Text>
                </View>
              </DrawerLayout.Tray>
              <DrawerLayout.Content label="Drawer content example containing a responsive ">
                <div style={{ background: 'white', height: '100%' }}>
                  <View as="div" padding="x-large">
                    <Heading border="bottom">A nested drawer layout</Heading>
                    <Grid startAt="medium" vAlign="middle" colSpacing="none">
                      <Grid.Row>
                        <Grid.Col>
                          <Button
                            margin="small 0"
                            size="small"
                            onClick={() => {
                              setStartOpen(true)
                            }}
                            aria-haspopup="dialog"
                          >
                            Expand start tray
                          </Button>
                        </Grid.Col>
                        <Grid.Col width="auto">
                          <Button
                            margin="small 0"
                            size="small"
                            onClick={() => {
                              setEndOpen(true)
                            }}
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

  render(<Example />)
  ```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| DrawerLayout | children | `ReactReactNode` | No | - | Exactly one of each of the following child types: `DrawerLayout.Content`, `DrawerLayout.Tray` |
| DrawerLayout | minWidth | `string` | No | `'30rem'` | Min width for the `<DrawerLayout.Content />` |
| DrawerLayout | onOverlayTrayChange | `signature` | No | - | Function called when the `<DrawerLayout.Content />` is resized and hits the `minWidth` breakpoint Called with a boolean value, `true` if the tray is now overlaying the content or `false` if it is side by side |
| DrawerLayout.DrawerContent | label | `string` | Yes | - |  |
| DrawerLayout.DrawerContent | children | `ReactReactNode` | No | - |  |
| DrawerLayout.DrawerContent | contentRef | `signature` | No | - |  |
| DrawerLayout.DrawerContent | onSizeChange | `signature` | No | - | Callback fired whenever the `<DrawerLayout.Content />` changes size |
| DrawerLayout.DrawerContent | role | `AriaRole` | No | `'region'` |  |
| DrawerLayout.DrawerTray | label | `string` | Yes | - |  |
| DrawerLayout.DrawerTray | children | `union` | No | - |  |
| DrawerLayout.DrawerTray | render | `signature` | No | - |  |
| DrawerLayout.DrawerTray | placement | `union` | No | `'start'` | Placement of the `<DrawerLayout.Tray />` |
| DrawerLayout.DrawerTray | open | `boolean` | No | `false` | If the tray is open or closed. |
| DrawerLayout.DrawerTray | onOpen | `signature` | No | - | Called when the `<DrawerLayout.Tray />` is opened |
| DrawerLayout.DrawerTray | onClose | `signature` | No | - | Called when the `<DrawerLayout.Tray />` is closed |
| DrawerLayout.DrawerTray | border | `boolean` | No | `true` | Should the `<DrawerLayout.Tray />` have a border |
| DrawerLayout.DrawerTray | shadow | `boolean` | No | `true` | Should the `<DrawerLayout.Tray />` have a shadow |
| DrawerLayout.DrawerTray | onTransition | `signature` | No | - | Callback fired when the `<DrawerLayout.Tray />` transitions in/out |
| DrawerLayout.DrawerTray | onEnter | `signature` | No | - | Callback fired before the `<DrawerLayout.Tray />` transitions in |
| DrawerLayout.DrawerTray | onEntering | `signature` | No | - | Callback fired as the `<DrawerLayout.Tray />` begins to transition in |
| DrawerLayout.DrawerTray | onEntered | `signature` | No | - | Callback fired after the `<DrawerLayout.Tray />` finishes transitioning in |
| DrawerLayout.DrawerTray | onExit | `signature` | No | - | Callback fired right before the `<DrawerLayout.Tray />` transitions out |
| DrawerLayout.DrawerTray | onExiting | `signature` | No | - | Callback fired as the `<DrawerLayout.Tray />` begins to transition out |
| DrawerLayout.DrawerTray | onExited | `signature` | No | - | Callback fired after the `<DrawerLayout.Tray />` finishes transitioning out |
| DrawerLayout.DrawerTray | contentRef | `signature` | No | - | Ref function for the `<DrawerLayout.Tray />` content |
| DrawerLayout.DrawerTray | mountNode | `PositionMountNode` | No | - | An element or a function returning an element to use as the mount node for the `<DrawerLayout.Tray />` when tray is overlaying content |
| DrawerLayout.DrawerTray | defaultFocusElement | `union` | No | - | An element or a function returning an element to focus by default |
| DrawerLayout.DrawerTray | liveRegion | `union` | No | - | An element, function returning an element, or array of elements that will not be hidden from the screen reader when the `<DrawerLayout.Tray />` is open |
| DrawerLayout.DrawerTray | onDismiss | `signature` | No | - |  |
| DrawerLayout.DrawerTray | shouldContainFocus | `boolean` | No | `true` |  |
| DrawerLayout.DrawerTray | shouldReturnFocus | `boolean` | No | `true` |  |
| DrawerLayout.DrawerTray | shouldCloseOnDocumentClick | `boolean` | No | `true` |  |
| DrawerLayout.DrawerTray | shouldCloseOnEscape | `boolean` | No | `true` |  |

### Usage

Install the package:

```shell
npm install @instructure/ui-drawer-layout
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { DrawerLayout } from '@instructure/ui-drawer-layout'
```

