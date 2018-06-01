---
describes: Pages
---

```js
---
example: true
---
<Pages activePageIndex={1}>
  <Page>
    Page One
  </Page>
  <Page>
    Page Two
  </Page>
</Pages>
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
        icon={IconArrowOpenStart}
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
        <Page>
        {(history, navigateToPreviousPage) => {
          return (
            <div>
              {history.length > 1 && (
                this.renderBackButton(navigateToPreviousPage)
              )}
              <Heading level="h1">Hello World</Heading>
              <Button
                onClick={this.handleViewDetailsClick}
                variant="link"
              >
                View Details
              </Button>
            </div>
          )
        }}
        </Page>
        <Page>
        {(history, navigateToPreviousPage) => {
          return (
            <div>
              {history.length > 1 && (
                this.renderBackButton(navigateToPreviousPage)
              )}
              <Heading level="h1">Foo Bar Baz Qux</Heading>
              <FormField id="name" label="Name">
                <input id="name"/>
              </FormField>
            </div>
          )
        }}
        </Page>
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
      <Button
        variant="link"
        onClick={this.handleDetailsButtonClick.bind(this, user.id)}
        ref={(el) => { this._usersNav[user.id] = el }}
      >
        <Media description={user.name}>
          <Avatar name={user.name} />
        </Media>
      </Button>
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
        icon={IconArrowOpenStart}
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
        icon={IconX.Solid}
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
          <PopoverTrigger>
            <Button onClick={this.showPopover}>
              View Users
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Pages
              activePageIndex={this.state.activePageIndex}
              onPageIndexChange={this.handlePagesBackButtonClick}
              backButtonLabel="Back to previous page"
            >
              <Page
                defaultFocusElement={() => this._usersNav[this.state.lastPageIndex]}
              >
              {(history, navigateToPreviousPage) => {
                return (
                  <div>
                    <Grid hAlign="space-between">
                      <GridRow>
                        <GridCol width={9}>
                          <Heading level="h1">Users</Heading>
                        </GridCol>
                        <GridCol width={3} textAlign="end">
                          {this.renderNavigationButton(history, navigateToPreviousPage)}
                        </GridCol>
                      </GridRow>
                    </Grid>
                    {this.renderNavigation()}
                  </div>
                )
              }}
              </Page>
              {USERS.map((user, index) => {
                return (
                  <Page key={index}>
                  {(history, navigateToPreviousPage) => {
                    return (
                      <div>
                        <Grid hAlign="space-between">
                          <GridRow>
                            <GridCol width={9}>
                              <Heading level="h1">User Details</Heading>
                            </GridCol>
                            <GridCol width={3} textAlign="end">
                              {this.renderNavigationButton(history, navigateToPreviousPage)}
                            </GridCol>
                          </GridRow>
                        </Grid>
                        <Media description={user.name}>
                          <Avatar name={user.name} />
                        </Media>
                        <Table caption={<ScreenReaderContent>User details</ScreenReaderContent>}>
                          <tbody>
                            <tr>
                              <td>Age</td>
                              <td>{user.age}</td>
                            </tr>
                            {user.email && (
                              <tr>
                                <td>Email</td>
                                <td>{user.email}</td>
                              </tr>
                            )}
                            {!isNaN(user.spouse) && (
                              <tr>
                                <td>Spouse</td>
                                <td>
                                  {this.renderUserMedia(this.findUser(user.spouse))}
                                </td>
                              </tr>
                            )}
                            {Array.isArray(user.parents) && (
                              <tr>
                                <td>Parents</td>
                                <td>
                                  {user.parents.map((parent, index) => {
                                    return (
                                      <div key={index}>{this.renderUserMedia(this.findUser(parent))}</div>
                                    )
                                  })}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </Table>
                      </div>
                    )
                  }}
                  </Page>
                )
              })}
            </Pages>
          </PopoverContent>
        </Popover>
      </View>
    )
  }
}

render(<Example />)
```
