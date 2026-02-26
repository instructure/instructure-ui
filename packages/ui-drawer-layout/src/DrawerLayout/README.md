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
type: example
---
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
            <View as="div" height="100%" background="primary">
              <View as="div" padding="x-large" background="primary">
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
            </View>
          </DrawerLayout.Content>
        </DrawerLayout>
      </View>
    )
  }

  render(<Example />)
```

Multiple `<DrawerLayout />` components can be nested in order to place trays on both sides

```js
---
type: example
---
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
              background="primary"
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
                <View as="div" background="primary" height='100%'>
                  <View as="div" padding="x-large"      background="primary">
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
                </View>
              </DrawerLayout.Content>
            </DrawerLayout>
          </DrawerLayout.Content>
        </DrawerLayout>
      </View>
    )
  }

  render(<Example />)
```
