---
describes: Mask
---

A Mask component covers its closest positioned parent (either absolute or relative).

You can use the [Overlay](#Overlay) component to make a mask that covers
the viewport (with transitions).

```js
---
example: true
---
<Container
  padding="large"
  margin="medium"
  textAlign="center"
  as="div"
  style={{ position: 'relative' }}
>
  <Heading>Some content that is masked</Heading>
  <Mask />
</Container>
```

The Mask component can be configured to cover the full screen if it is rendered inside a [Portal](#Portal).

```js
---
example: true
render: false
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
              fullScreen
              onDismiss={() => { this.setState({ open: false }) }}
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
