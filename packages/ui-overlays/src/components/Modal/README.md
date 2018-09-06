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

### Constraining Modal to a parent element

By default, Modals are positioned relative to the document body. Setting the `constrain`
property to `parent` will constrain the Modal within the element it is mounted from
(specified via the `mountNode` property). _Note: in these cases, the `mountNode`
element should have an explicit `height` set: Because Modal is absolutely positioned,
it has no height of its own._

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
           size="fullscreen"
           label="Modal Dialog: Hello World"
           shouldCloseOnDocumentClick
           mountNode={() => document.getElementById('constrainExample')}
           constrain="parent"
         >
           <ModalHeader>
             {this.renderCloseButton()}
             <Heading>This Modal contains an Autocomplete</Heading>
           </ModalHeader>
           <ModalBody>
             <View as="p" margin="none none small"><Text>{fpo}</Text></View>
             <ModalAutoCompleteExample
              label="Choose a state" defaultOption="12"
              onChange={(e, o) => console.log(o.label)} />
           </ModalBody>
           <ModalFooter>
             <Button onClick={this.handleButtonClick}>Close</Button>&nbsp;
             <Button onClick={this.handleButtonClick} variant="primary" type="submit">Submit</Button>
           </ModalFooter>
         </Modal>
         <View margin="medium auto none" display="block" width="25rem" height="25rem" borderWidth="large" id="constrainExample"></View>
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
### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <FigureItem>Use it to validate user decisions or to gain secondary confirmation</FigureItem>
    <FigureItem>Provide input areas that the user may interact with such as Forms, Dropdowns, Selectors, and Links</FigureItem>
    <FigureItem>Provide a way to dismiss the Modal: the "x" close button, the ESC key, clicking outside the modal, alternative response button (done, etc...)</FigureItem>
    <FigureItem>Place optional response button(s) on the right side within the ModalFooter</FigureItem>
    <FigureItem>Place primary button on the far right with secondary response buttons to the left of the primary</FigureItem>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <FigureItem>Use when the workflow should NOT be interrupted</FigureItem>
    <FigureItem>Use to show error, success, or warning messages/notifications (see Alert)</FigureItem>
    <FigureItem>Add content to a modal that would be better suited in its own page</FigureItem>
  </Figure>
</Guidelines>
```
