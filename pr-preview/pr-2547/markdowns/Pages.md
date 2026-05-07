# Pages


The Pages component can be used to render Paginated content that does not fit into one page. Each page content should have at least one focusable element (e.g. the back button) otherwise the focus will be lost.

```js
---
type: example
---
const Example = () => {
  const [activePageIndex, setActivePageIndex] = useState(0)

  const handlePagesBackButtonClick = (activePageIndex) => {
    setActivePageIndex(activePageIndex)
  }

  const handleLinkClick = () => {
    setActivePageIndex(1)
  }

  const renderBackButton = (navigateToPreviousPage) => {
    return (
      <IconButton
        onClick={navigateToPreviousPage}
        renderIcon={IconArrowOpenStartLine}
        screenReaderLabel="Back to Page One"
        withBorder={false}
        withBackground={false}
      />
    )
  }

  return (
    <Pages
      activePageIndex={activePageIndex}
      onPageIndexChange={handlePagesBackButtonClick}
    >
      <Pages.Page>
        {(history, navigateToPreviousPage) => {
          return (
            <div>
              <View as="div" textAlign="end">
                <Link isWithinText={false} onClick={handleLinkClick}>
                  Go to Page Two
                </Link>
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
                {history.length > 1 &&
                  renderBackButton(navigateToPreviousPage)}
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

render(<Example />)
```

###

```js
---
type: example
---
const Example = () => {
  const [activePageIndex, setActivePageIndex] = useState(0)

  const handlePagesBackButtonClick = (activePageIndex) => {
    setActivePageIndex(activePageIndex)
  }

  const handleViewDetailsClick = () => {
    setActivePageIndex(1)
  }

  const renderBackButton = (navigateToPreviousPage) => {
    return (
      <IconButton
        onClick={navigateToPreviousPage}
        renderIcon={IconArrowStartLine}
        screenReaderLabel="Back"
        withBorder={false}
        withBackground={false}
      />
    )
  }

  return (
    <Pages
      activePageIndex={activePageIndex}
      onPageIndexChange={handlePagesBackButtonClick}
    >
      <Pages.Page>
        {(history, navigateToPreviousPage) => {
          return (
            <div>
              {history.length > 1 && renderBackButton(navigateToPreviousPage)}
              <View display="inline-block" margin="large">
                <Heading level="h1">Hello World</Heading>
              </View>
              <Button onClick={handleViewDetailsClick} color="primary">
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
              {history.length > 1 && renderBackButton(navigateToPreviousPage)}
              <View display="inline-block" margin="large">
                <Heading level="h1">Foo Bar Baz Qux</Heading>
              </View>
              <FormField id="name" label="Name">
                <input id="name" />
              </FormField>
            </div>
          )
        }}
      </Pages.Page>
    </Pages>
  )
}

render(<Example />)
```

###

```js
---
type: example
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
const Example = () => {
  const [showPopover, setShowPopover] = useState(false)
  const [activePageIndex, setActivePageIndex] = useState(0)
  const usersNavRef = useRef({})
  const lastPageIndexRef = useRef(0)

  const findUser = (id) => {
    return USERS.find((user) => user.id === id)
  }

  const updateActivePageIndex = (index) => {
    const previousIndex = activePageIndex
    lastPageIndexRef.current = previousIndex
    setActivePageIndex(index)
  }

  const handlePagesBackButtonClick = (activePageIndex) => {
    updateActivePageIndex(activePageIndex)
  }

  const handleDetailsButtonClick = (activePageIndex) => {
    updateActivePageIndex(activePageIndex)
  }

  const displayPopover = () => {
    setShowPopover(true)
  }

  const hidePopover = () => {
    setShowPopover(false)
    setActivePageIndex(0)
  }

  const renderNavigation = () => {
    return (
      <div>
        {USERS.map((user, index) => {
          return <div key={index}>{renderUserMedia(user)}</div>
        })}
      </div>
    )
  }

  const renderUserMedia = (user) => {
    return (
      <View as="div" margin="small 0">
        <Link
          isWithinText={false}
          onClick={() => handleDetailsButtonClick(user.id)}
          elementRef={(el) => {
            usersNavRef.current[user.id] = el
          }}
        >
          <Byline description={user.name}>
            <Avatar name={user.name} />
          </Byline>
        </Link>
      </View>
    )
  }

  const renderNavigationButton = (history, navigateToPreviousPage) => {
    return history.length === 1
      ? renderCloseButton()
      : renderBackButton(navigateToPreviousPage)
  }

  const renderBackButton = (navigateToPreviousPage) => {
    return (
      <IconButton
        onClick={navigateToPreviousPage}
        renderIcon={IconArrowOpenStartLine}
        screenReaderLabel="Back"
        withBorder={false}
        withBackground={false}
      />
    )
  }

  const renderCloseButton = () => {
    return (
      <IconButton
        onClick={hidePopover}
        renderIcon={IconXLine}
        withBorder={false}
        withBackground={false}
        screenReaderLabel="Close"
      />
    )
  }

  return (
    <View padding="large 0">
      <Popover
        on="click"
        isShowingContent={showPopover}
        shouldContainFocus
        shouldReturnFocus
        screenReaderLabel="Pages Dialog Example"
        placement="center end"
        onHideContent={hidePopover}
        renderTrigger={<Button onClick={displayPopover}>View Users</Button>}
      >
        <Pages
          activePageIndex={activePageIndex}
          onPageIndexChange={handlePagesBackButtonClick}
        >
          <Pages.Page
            defaultFocusElement={() =>
              usersNavRef.current[lastPageIndexRef.current]
            }
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
                        {renderNavigationButton(
                          history,
                          navigateToPreviousPage
                        )}
                      </Grid.Col>
                    </Grid.Row>
                  </Grid>
                  {renderNavigation()}
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
                            {renderNavigationButton(
                              history,
                              navigateToPreviousPage
                            )}
                          </Grid.Col>
                        </Grid.Row>
                      </Grid>
                      <Byline description={user.name}>
                        <Avatar name={user.name} />
                      </Byline>
                      <Table caption="User details">
                        <Table.Body>
                          <Table.Row>
                            <Table.RowHeader>Age</Table.RowHeader>
                            <Table.Cell>{user.age}</Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                      {user.email && (
                        <Table caption="User details">
                          <Table.Body>
                            <Table.Row>
                              <Table.RowHeader>Email</Table.RowHeader>
                              <Table.Cell>{user.email}</Table.Cell>
                            </Table.Row>
                          </Table.Body>
                        </Table>
                      )}
                      {!isNaN(user.spouse) && (
                        <Table caption="User details">
                          <Table.Body>
                            <Table.Row>
                              <Table.RowHeader>Spouse</Table.RowHeader>
                              <Table.Cell>
                                {renderUserMedia(findUser(user.spouse))}
                              </Table.Cell>
                            </Table.Row>
                          </Table.Body>
                        </Table>
                      )}
                      {Array.isArray(user.parents) && (
                        <Table caption="User details">
                          <Table.Body>
                            <Table.Row>
                              <Table.RowHeader>Parents</Table.RowHeader>
                              <Table.Cell>
                                {user.parents.map((parent, index) => {
                                  return (
                                    <div key={index}>
                                      {renderUserMedia(findUser(parent))}
                                    </div>
                                  )
                                })}
                              </Table.Cell>
                            </Table.Row>
                          </Table.Body>
                        </Table>
                      )}
                    </div>
                  )
                }}
              </Pages.Page>
            )
          })}
        </Pages>
      </Popover>
    </View>
  )
}

render(<Example />)
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Pages | children | `React.ReactNode` | No | - | Children are type of `<Pages.Page>` |
| Pages | defaultPageIndex | `number` | No | - |  |
| Pages | activePageIndex | `number` | No | `0` | The currently active page index |
| Pages | onPageIndexChange | `(newPageIndex: number, oldPageIndex?: number) => void` | No | - | Event handler fired anytime page index has changed due to back button being clicked |
| Pages | margin | `Spacing` | No | - | Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via familiar CSS-like shorthand. For example: `margin="small auto large"`. |
| Pages.Page | children | `\| React.ReactNode \| (( history: PagesContextType['history'], navigateToPreviousPage: PagesContextType['navigateToPreviousPage'] ) => React.ReactNode)` | No | `null` | The children to be rendered |
| Pages.Page | defaultFocusElement | `UIElement \| (() => UIElement)` | No | `null` | An element or a function returning an element to focus by default |
| Pages.Page | padding | `Spacing` | No | `'small'` | Set the padding using familiar CSS shorthand |
| Pages.Page | textAlign | `'start' \| 'center' \| 'end'` | No | `'start'` |  |

### Usage

Install the package:

```shell
npm install @instructure/ui-pages
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Pages } from '@instructure/ui-pages'
```

