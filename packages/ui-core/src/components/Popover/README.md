---
describes: Popover
---

A `<Popover/>` is a small overlay of content that contains secondary information. Most of the time
you can use a [Tooltip](#Tooltip) or a [PopoverMenu](#PopoverMenu) component, but if you need
something custom that behaves more like a dialog, use a `<Popover/>`.

```js
---
render: false
example: true
---
class Example extends React.Component {
  render () {
    return (
      <div style={{ paddingBottom: 25 }}>
        <Popover on="click">
          <PopoverTrigger><Button>Click Me</Button></PopoverTrigger>
          <PopoverContent><Heading>Hello</Heading></PopoverContent>
        </Popover>
        &nbsp;
        <Popover>
          <PopoverTrigger><Link>Hover or Focus Me</Link></PopoverTrigger>
          <PopoverContent><Heading>Hello</Heading></PopoverContent>
        </Popover>
      </div>
    )
  }
}

render(<Example />)
```

`<Popover />` can act as a dialog with a close button. With the `shouldContainFocus` and `applicationElement`
properties set, it will trap focus inside the `<Popover />`.

```js
---
render: false
example: true
---
class Example extends React.Component {
render () {
  return (
    <Container padding="large 0">
      <Popover
        on="click"
        shouldContainFocus
        shouldReturnFocus
        closeButtonLabel="Close"
        applicationElement={() => document.getElementById('app')}

        label="Popover Dialog Example"
        offsetY="16px"
      >
        <PopoverTrigger><Button>Sign In</Button></PopoverTrigger>
        <PopoverContent>
          <Container padding="medium" display="block" as="form">
            <FormFieldGroup description="Log In">
              <TextInput label="Username" inputRef={(el) => { if (el) { this._username = el } }}/>
              <TextInput label="Password" type="password" />
            </FormFieldGroup>
          </Container>
        </PopoverContent>
      </Popover>
    </Container>
  )
}
}

render(<Example />)

```
The `alignArrow` prop will offset the popover content to adjust for the offset of the arrow.
This will override offsetX for start/end placements, and will override offsetY for top/bottom placements.
```js
---
render: false
example: true
---
class Example extends React.Component {
render () {
  return (
      <div style={{ paddingBottom: 25, display: 'flex', justifyContent: 'center' }}>
        <Popover show placement="end top" alignArrow>
          <PopoverTrigger>
            <div style={{display: 'inline-block', height: '3px', width: '3px', background: 'blue'}}/>
          </PopoverTrigger>
          <PopoverContent>
            <Heading>Small<br/>Target</Heading>
          </PopoverContent>
        </Popover>
      </div>
  )
}
}

render(<Example />)
```
