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
        screenReaderLabel="Close"
        onClick={this.handleButtonClick}
      />
    )
  }

  render () {
    return (
      <div>
        <IconButton
          renderIcon={IconTrashLine}
          onClick={this.handleButtonClick}
          screenReaderLabel="Delete the Assignment"
        />
        <Modal
          open={this.state.open}
          onDismiss={() => { this.setState({ open: false }) }}
          size="small"
          label="Delete"
          shouldCloseOnDocumentClick
        >
          <Modal.Header>
            {this.renderCloseButton()}
            <Heading level="h2">Delete</Heading>
          </Modal.Header>
          <Modal.Body padding="large medium">
            <Text>You are about to delete an active assignment. This will affect 16 students grades.</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleButtonClick}>Cancel</Button>&nbsp;
            <Button onClick={this.handleButtonClick} color="danger" type="submit">Delete</Button>
          </Modal.Footer>
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
    <Figure.Item>Use when deleting Users, Accounts, Courses, Etc</Figure.Item>
    <Figure.Item>Use when navigating away from a page that would cause a loss in changes or data</Figure.Item>
    <Figure.Item>Use language that specifically describes the destructive nature</Figure.Item>
    <Figure.Item>Use a confirmation button that describes the action to be taken</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Use “Are you sure?” type language</Figure.Item>
    <Figure.Item>Use red button for other modal actions</Figure.Item>
  </Figure>
</Guidelines>
```
