---
describes: MediaCapture
---

*Experimental component. At this time, only __Chrome__ and __Firefox__ are supported.*

```javascript
class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  onCompleted = (file) => {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(file)
    a.download = `${file.name}.webm`
    a.style = { display: 'none' }
    this.container.append(a)
    a.click()
    URL.revokeObjectURL(a.href)
    a.remove()
    this.setState({ isOpen: false })
  }

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
      <div ref={el => this.container = el}>
        <Button onClick={() => { this.setState({ isOpen: !this.state.isOpen }) }}>
          Show Media Capture Modal
        </Button>
        <Modal
          open={this.state.isOpen}
          onDismiss={() => { this.setState({ isOpen: false }) }}
          label="Media Capture"
          shouldCloseOnDocumentClick
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
```
