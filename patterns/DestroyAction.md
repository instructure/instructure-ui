---
title: Destroy Action
category: Patterns
id: DestroyAction
---


## Destroy Action
Used to let the user know that the action they are about to take is something that cannot be undone.


```js
---
render: false
example: true
---
const fpo = lorem.paragraphs(1)
class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false,
      size: 'auto'
    }
  }

  handleButtonClick = () => {
    this.setState(function (state) {
      return { open: !state.open }
    })
  }

  renderCloseButton () {
    return (
      <CloseButton
        placement="end"
        offset="medium"
        variant="icon"
        onClick={this.handleButtonClick}
      >
        Close
      </CloseButton>
    )
  }

  render () {
    return (
      <div>
        <Button icon={IconTrash.Line} onClick={this.handleButtonClick}>
          <ScreenReaderContent>Delete the Assignment</ScreenReaderContent>
        </Button>
        <Modal
          open={this.state.open}
          onDismiss={() => { this.setState({ open: false }) }}
          size="small"
          label="Delete"
          shouldCloseOnDocumentClick
        >
          <ModalHeader>
            {this.renderCloseButton()}
            <Heading level="h2">Delete</Heading>
          </ModalHeader>
          <ModalBody padding="large medium">
            <Text>Are you sure you want to delete this assignment? This will affect 16 student's grades.</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.handleButtonClick}>Cancel</Button>&nbsp;
            <Button onClick={this.handleButtonClick} variant="danger" type="submit">Delete</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

render(<Example />)
```

### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <FigureItem>Use when deleting Users, Accounts, Courses, Etc</FigureItem>
    <FigureItem>Use when navigating away from a page that would cause a loss in changes or data</FigureItem>
    <FigureItem>Use language that specifically describes the destructive nature</FigureItem>
    <FigureItem>Use a confirmation button that describes the action to be taken</FigureItem>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <FigureItem>Use “Are you sure?” type language</FigureItem>
    <FigureItem>Use red button for other modal actions</FigureItem>
  </Figure>
</Guidelines>
```
