---
describes: Pages
---

```js
---
render: false
example: true
---
class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      activePageIndex: 0
    }
  }

  handlePagesBackButtonClick = (activePageIndex) => {
    this.setState({
      activePageIndex
    })
  }

  handleLinkClick = () => {
    this.setState({
      activePageIndex: 1
    })
  }

  renderBackButton (navigateToPreviousPage) {
    return (
      <Button
        variant="icon"
        onClick={navigateToPreviousPage}
        icon={IconArrowOpenStartLine}
      >
        <ScreenReaderContent>Back to Page One</ScreenReaderContent>
      </Button>
    )
  }

  render () {
    return (
      <Pages 
        activePageIndex={this.state.activePageIndex}
        onPageIndexChange={this.handlePagesBackButtonClick}
        backButtonLabel="Back to previous page"
      >
        <Pages.Page>
         {(history, navigateToPreviousPage) => {
          return (
            <div>
              <View as="div" textAlign="end">
                <Button 
                  variant="link" 
                  onClick={this.handleLinkClick}
                >
                  Go to page 2
                </Button>
              </View>
              <View as="div" margin="large 0 0 0" textAlign="center">
                <Text as="div">Page One</Text>
              </View>
            </div>
          )
        }}
        </Pages.Page>
        <Pages.Page>
          {(history, navigateToPreviousPage) => {
          return (
            <div>
              <View as="div" maxWidth="7rem">
                {history.length > 1 && (
                  this.renderBackButton(navigateToPreviousPage)
                )}
              </View>
              <View as="div" margin="large 0 0 0" textAlign="center">
                Hey Look - Page Two
              </View>
            </div>
          )
        }}
        </Pages.Page>
      </Pages>
    )
  }
}

render(<Example />)
```


```js
---
render: false
example: true
---
class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      activePageIndex: 0
    }
  }

  handlePagesBackButtonClick = (activePageIndex) => {
    this.setState({
      activePageIndex
    })
  }

  handleViewDetailsClick = () => {
    this.setState({
      activePageIndex: 1
    })
  }

  renderBackButton (navigateToPreviousPage) {
    return (
      <Button
        variant="icon"
        onClick={navigateToPreviousPage}
        icon={IconArrowStartLine}
      >
        <ScreenReaderContent>Back</ScreenReaderContent>
      </Button>
    )
  }

  render () {
    return (
      <Pages
        activePageIndex={this.state.activePageIndex}
        onPageIndexChange={this.handlePagesBackButtonClick}
        backButtonLabel="Back to previous page"
      >
        <Pages.Page>
        {(history, navigateToPreviousPage) => {
          return (
            <div>
              {history.length > 1 && (
                this.renderBackButton(navigateToPreviousPage)
              )}
              <View display="inline-block" margin="large">
                <Heading level="h1">Hello World</Heading>
              </View>
              <Button
                onClick={this.handleViewDetailsClick}
                variant="primary"
              >
                View Details
              </Button>
            </div>
          )
        }}
        </Pages.Page>
        <Pages.Page>
        {(history, navigateToPreviousPage) => {
          return (
            <div>
              {history.length > 1 && (
                this.renderBackButton(navigateToPreviousPage)
              )}
              <View display="inline-block" margin="large">
                <Heading level="h1">Foo Bar Baz Qux</Heading>
              </View>
              <FormField id="name" label="Name">
                <input id="name"/>
              </FormField>
            </div>
          )
        }}
        </Pages.Page>
      </Pages>
    )
  }
}

render(<Example />)
```


```js
---
render: false
example: true
---
const USERS = [
  {
    id: 1,
    name: 'Fred Flintstone',
    email: 'fred@example.com',
    age: 41,
    spouse: 2
  },
  {
    id: 2,
    name: 'Wilma Flintstone',
    email: 'wilma@example.com',
    age: 40,
    spouse: 1
  },
  {
    id: 3,
    name: 'Barney Rubble',
    email: 'barney@example.com',
    age: 42,
    spouse: 4
  },
  {
    id: 4,
    name: 'Betty Rubble',
    email: 'betty@example.com',
    age: 38,
    spouse: 3
  },
  {
    id: 5,
    name: 'Pebbles Flintstone',
    age: 2,
    parents: [1, 2]
  },
  {
    id: 6,
    name: 'Bamm-Bamm Rubble',
    age: 1,
    parents: [3, 4]
  }
]

class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showPopover: false,
      activePageIndex: 0
    }
  }

  findUser (id) {
    return USERS.find((user) => user.id === id)
  }

  setActivePageIndex (index) {
    this.setState({
      activePageIndex: index,
      lastPageIndex: this.state.activePageIndex
    })
  }

  handlePagesBackButtonClick = (activePageIndex) => {
    this.setActivePageIndex(activePageIndex)
  }

  handleDetailsButtonClick = (activePageIndex) => {
    this.setActivePageIndex(activePageIndex)
  }

  showPopover = () => {
    this.setState({
      showPopover: true
    })
  }

  hidePopover = () => {
    this.setState({
      showPopover: false,
      activePageIndex: 0
    })
  }

  renderNavigation () {
    this._usersNav = []
    return (
      <div>
        {USERS.map((user, index) => {
          return (
            <div key={index}>{this.renderUserMedia(user)}</div>
          )
        })}
      </div>
    )
  }

  renderUserMedia (user) {
    return (
      <View as="div" margin="small 0">
        <Button
          variant="link"
          onClick={this.handleDetailsButtonClick.bind(this, user.id)}
          ref={(el) => { this._usersNav[user.id] = el }}
        >
          <Media description={user.name}>
            <Avatar name={user.name} />
          </Media>
        </Button>
      </View>
    )
  }

  renderNavigationButton (history, navigateToPreviousPage) {
    return history.length === 1 ? (
      this.renderCloseButton()
    ) : (
      this.renderBackButton(navigateToPreviousPage)
    )
  }

  renderBackButton (navigateToPreviousPage) {
    return (
      <Button
        variant="icon"
        onClick={navigateToPreviousPage}
        icon={IconArrowOpenStartLine}
      >
        <ScreenReaderContent>Back</ScreenReaderContent>
      </Button>
    )
  }

  renderCloseButton () {
    return (
      <Button
        variant="icon"
        onClick={this.hidePopover}
        icon={IconXLine}
      >
        <ScreenReaderContent>Close</ScreenReaderContent>
      </Button>
    )
  }

  render () {
    return (
      <View padding="large 0">
        <Popover
          on="click"
          show={this.state.showPopover}
          shouldContainFocus
          shouldReturnFocus
          label="Pages Dialog Example"
          placement="center end"
          onDismiss={this.hidePopover}
        >
          <Popover.Trigger>
            <Button onClick={this.showPopover}>
              View Users
            </Button>
          </Popover.Trigger>
          <Popover.Content>
            <Pages
              activePageIndex={this.state.activePageIndex}
              onPageIndexChange={this.handlePagesBackButtonClick}
              backButtonLabel="Back to previous page"
            >
              <Pages.Page
                defaultFocusElement={() => this._usersNav[this.state.lastPageIndex]}
              >
              {(history, navigateToPreviousPage) => {
                return (
                  <div>
                    <Grid hAlign="space-between">
                      <Grid.Row>
                        <Grid.Col width={9}>
                          <Heading level="h1">Users</Heading>
                        </Grid.Col>
                        <Grid.Col width={3} textAlign="end">
                          {this.renderNavigationButton(history, navigateToPreviousPage)}
                        </Grid.Col>
                      </Grid.Row>
                    </Grid>
                    {this.renderNavigation()}
                  </div>
                )
              }}
              </Pages.Page>
              {USERS.map((user, index) => {
                return (
                  <Pages.Page key={index}>
                  {(history, navigateToPreviousPage) => {
                    return (
                      <div>
                        <Grid hAlign="space-between">
                          <Grid.Row>
                            <Grid.Col width={9}>
                              <Heading level="h1">User Details</Heading>
                            </Grid.Col>
                            <Grid.Col width={3} textAlign="end">
                              {this.renderNavigationButton(history, navigateToPreviousPage)}
                            </Grid.Col>
                          </Grid.Row>
                        </Grid>
                        <Media description={user.name}>
                          <Avatar name={user.name} />
                        </Media>
                        <Table caption="User details">
                          <Table.Body>
                            <Table.Row>
                              <Table.RowHeader>Age</Table.RowHeader>
                              <Table.Cell>{user.age}</Table.Cell>
                            </Table.Row>
                            {user.email && (
                              <Table.Row>
                                <Table.RowHeader>Email</Table.RowHeader>
                                <Table.Cell>{user.email}</Table.Cell>
                              </Table.Row>
                            )}
                            {!isNaN(user.spouse) && (
                              <Table.Row>
                                <Table.RowHeader>Spouse</Table.RowHeader>
                                <Table.Cell>
                                  {this.renderUserMedia(this.findUser(user.spouse))}
                                </Table.Cell>
                              </Table.Row>
                            )}
                            {Array.isArray(user.parents) && (
                              <Table.Row>
                                <Table.RowHeader>Parents</Table.RowHeader>
                                <Table.Cell>
                                  {user.parents.map((parent, index) => {
                                    return (
                                      <div key={index}>{this.renderUserMedia(this.findUser(parent))}</div>
                                    )
                                  })}
                                </Table.Cell>
                              </Table.Row>
                            )}
                          </Table.Body>
                        </Table>
                      </div>
                    )
                  }}
                  </Pages.Page>
                )
              })}
            </Pages>
          </Popover.Content>
        </Popover>
      </View>
    )
  }
}

render(<Example />)
```
