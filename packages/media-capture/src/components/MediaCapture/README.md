---
describes: MediaCapture
---

*Experimental component. At this time, only __Chrome__ and __Firefox__ are supported.*

```js
---
render: false
example: true
---
class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  onCompleted = () => { alert('Recording Completed!') }

  onClose = (state) => {
    this.setState({ isOpen: false }, () => {
      console.log(`MediaCapture closed: ${state}`)
    })
  }

  render () {
    return (
      <div>
        <Button onClick={() => { this.setState({ isOpen: !this.state.isOpen }) }}>
          Show Media Capture Modal
        </Button>
        <Modal
          open={this.state.isOpen}
          onDismiss={() => { this.setState({ isOpen: false }) }}
          label="Media Capture"
          shouldCloseOnOverlayClick
          closeButtonLabel="Close"
          applicationElement={() => document.getElementById('app')}
        >
          <ModalBody padding="xx-large">
            <MediaCapture onCompleted={this.onCompleted} onClose={this.onClose} />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

render(<Example />)
```
