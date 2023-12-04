---
describes: Mask
---

A Mask component covers its closest positioned parent (either absolute or relative).

```js
---
type: example
---
<View
  padding="large"
  margin="medium"
  textAlign="center"
  as="div"
  style={{ position: 'relative' }}
>
  <Heading>Some content that is masked</Heading>
  <Mask />
</View>
```

The Mask component can be configured to cover the full screen if it is rendered inside a [Portal](#Portal).

```js
---
type: example
---

 class Example extends React.Component {
   constructor (props) {
     super(props)

     this.state = {
       open: false
     }
   }

   handleButtonClick = () => {
     this.setState(function (state) {
       return { open: !state.open }
     })
   };

   render () {
     return (
       <div>
         <Button onClick={this.handleButtonClick}>
           {this.state.open ? 'Close' : 'Open'} the Mask
         </Button>
         <Portal
           open={this.state.open}
         >
            <Mask
              fullscreen
              onClick={() => { this.setState({ open: false }) }}
            >
              <Heading>Click anywhere around this text to close the Mask</Heading>
            </Mask>
          </Portal>
       </div>
     )
   }
 }

 render(<Example />)
```
