---
describes: Modal
---

The Modal is a dialog component that is centered in the viewport. The Modal
overlays the application content and applies a mask to it.

The default `padding` of the Modal content is `medium` but can be overridden
by using the `padding` prop on the `<ModalBody/>` if the use case requires it.

```js
---
render: false
example: true
---
 const fpo = lorem.paragraphs(5)

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
   };

   handleSelectChange = (e, o) => {
     this.setState({ size: o.value })
   };

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
     const variants = [
       {value: 'auto', label: 'Auto'},
       {value: 'small', label: 'Small'},
       {value: 'medium', label: 'Medium'},
       {value: 'large', label: 'Large'},
       {value: 'fullscreen', label: 'Full Screen'}
     ]

     return (
       <div style={{ padding: '0 0 11rem 0', margin: '0 auto' }}>
         <Select
           onChange={this.handleSelectChange}
           value={this.state.size}
           label={<ScreenReaderContent>Modal size</ScreenReaderContent>}
           inline
         >
           {variants.map((s) => <option value={s.value} key={s.value}>{s.label}</option>)}
         </Select>
         &nbsp;
         <Button onClick={this.handleButtonClick}>
           {this.state.open ? 'Close' : 'Open'} the Modal
         </Button>
         <Modal
           open={this.state.open}
           onDismiss={() => { this.setState({ open: false }) }}
           size={this.state.size}
           label="Modal Dialog: Hello World"
           shouldCloseOnDocumentClick
         >
           <ModalHeader>
             {this.renderCloseButton()}
             <Heading>Hello World</Heading>
           </ModalHeader>
           <ModalBody>
             <Text lineHeight="double">{fpo}</Text>
           </ModalBody>
           <ModalFooter>
             <Button onClick={this.handleButtonClick}>Close</Button>&nbsp;
             <Button onClick={this.handleButtonClick} variant="primary" type="submit">Submit</Button>
           </ModalFooter>
         </Modal>
       </div>
     )
   }
 }

 render(<Example />)
```

A Modal may contain components which "break out" of their container using absolute position elements,
such as an Autocomplete and it's options list.

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
         <Button onClick={this.handleButtonClick}>
           {this.state.open ? 'Close' : 'Open'} the Modal
         </Button>
         <Modal
           open={this.state.open}
           onDismiss={() => { this.setState({ open: false }) }}
           size="medium"
           label="Modal Dialog: Hello World"
           shouldCloseOnDocumentClick
         >
           <ModalHeader>
             {this.renderCloseButton()}
             <Heading>This Modal contains an Autocomplete</Heading>
           </ModalHeader>
           <ModalBody>
             <Text lineHeight="double">{fpo}</Text>
             <ModalAutoCompleteExample
              label="Choose a state" defaultOption="12"
              onChange={(e, o) => console.log(o.label)} />
           </ModalBody>
           <ModalFooter>
             <Button onClick={this.handleButtonClick}>Close</Button>&nbsp;
             <Button onClick={this.handleButtonClick} variant="primary" type="submit">Submit</Button>
           </ModalFooter>
         </Modal>
       </div>
     )
   }
 }

 class ModalAutoCompleteExample extends React.Component {
  render () {
    const options = [
      'Alabama', 'Alaska', 'American Samoa', 'Arizona',
      'Arkansas', 'California', 'Colorado', 'Connecticut',
      'Delaware', 'District Of Columbia',
      'Federated States Of Micronesia', 'Florida', 'Georgia',
      'Guam', 'Hawaii', 'Idaho', 'Illinois'
    ]

    return (
      <Select {...this.props}
        editable
        formatSelectedOption={(tag) => (
          <AccessibleContent alt={`Remove ${tag.label}`}>{tag.label}</AccessibleContent>
        )}
      >
        {options.map((label, index) => (
          <option key={label} value={'' + index}>
            {label}
          </option>
        ))}
      </Select>
    )
  }
}

render(<Example />)
```
