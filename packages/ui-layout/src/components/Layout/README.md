---
describes: Layout
---

The `<Layout />` component creates a layout consisting of both `<LayoutTray />` and `<LayoutContent />`.
The tray can be placed at the `start` or `end` position. When there is sufficient space available, 
the tray is positioned alongside the content. As the screen gets smaller, the `<LayoutTray />` can 
be configured to overlay the `<LayoutContent />`

The `minWidth` prop specifies a breakpoint. When the `<LayoutContent />` resizes such that the width is
less than the designated `minWidth`, the tray overlays the content

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

  render () {
    return (
      <div style={{height: '25rem'}}>
        <Layout>
          <LayoutTray
            label="Layout Tray Start Example"
            closeButtonLabel="Close"
            open={this.state.open}
            placement="start"
            onDismiss={() => { this.setState({ open: false }) }}
            applicationElement={() => document.getElementById('layoutContentExample1') }
          >
            <Container
              as="div"
              size="x-small"
              textAlign="center"
              margin="large auto"
              padding="small"
            >
              <Avatar name="foo bar" margin="0 0 small 0" />
              <Text as="div" size="x-small">
                Hello from start tray with a small amount of placeholder content
              </Text>
            </Container>
          </LayoutTray>
          <LayoutContent label="Layout content example">
            <div
              id="layoutContentExample1"
              style={{background: 'white', height: '100%'}}
            >
              <Container as="div" padding="x-large">
                <Heading border="bottom">A simple layout</Heading>
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
          </LayoutContent>
        </Layout>
      </div>
    )
  }
}

render(<Example />)
```

Multiple `<Layout />` components can be nested in order to place trays on both sides


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

  render () {
    return (
      <div style={{height: '40rem'}}>
        <Layout>
          <LayoutTray
            label="Layout Tray End Example"
            closeButtonLabel="Close"
            open={this.state.endOpen}
            placement="end"
            onDismiss={() => {this.setState({ endOpen: false })}}
            applicationElement={() => document.getElementById('layoutContentExample')}
          >
            <Container
              as="div"
              size="medium"
              textAlign="center"
              margin="large auto"
              padding="large"
            >
              <Text as="div" size="x-small">
                Hello from end tray with a good amount of content as well
              </Text>
            </Container>
          </LayoutTray>
          <LayoutContent label="Layout content example containing another layout">
            <Layout>
              <LayoutTray
                label="Layout Tray Start Example"
                closeButtonLabel="Close"
                open={this.state.startOpen}
                placement="start"
                onDismiss={() => { this.setState({ startOpen: false }) }}
                applicationElement={() => document.getElementById('layoutContentExample') }
              >
                <Container
                  as="div"
                  size="x-small"
                  textAlign="center"
                  margin="large auto"
                  padding="small"
                >
                  <Avatar name="foo bar" margin="0 0 small 0" />
                  <Text as="div" size="x-small">
                    Hello from start tray with a small amount of placeholder content
                  </Text>
                </Container>
              </LayoutTray>
              <LayoutContent label="Layout content example containing a responsive ">
                <div
                  id="layoutContentExample"
                  style={{background: 'white', height: '100%'}}
                >
                  <Container as="div" padding="x-large">
                    <Heading border="bottom">A nested layout</Heading>
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
                          <Image src={placeholderImage(250, 250)} />
                        </GridCol>
                        <GridCol>
                          <Image src={placeholderImage(250, 250)} />
                        </GridCol>
                        <GridCol>
                          <Image src={placeholderImage(250, 250)} />
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
              </LayoutContent>
            </Layout>
          </LayoutContent>
        </Layout>
      </div>
    )
  }
}

render(<Example />)
```
