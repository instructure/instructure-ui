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

  renderCloseButton () {
     return (
       <CloseButton
         placement="end"
         offset="medium"
         variant="icon"
         onClick={() => this.setState({ isOpen: false })}
       >
         Close
       </CloseButton>
     )
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
          applicationElement={() => document.getElementById('app')}
        >
          <ModalBody padding="xx-large">
            {this.renderCloseButton()}
            <MediaCapture onCompleted={this.onCompleted} onClose={this.onClose} />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

render(<Example />)
```
