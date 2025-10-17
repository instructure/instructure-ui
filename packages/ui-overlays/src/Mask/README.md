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

The Mask component can be configured to cover the full screen if it is rendered inside a [Portal](Portal).

```js
---
type: example
---
const Example = () => {
  const [open, setOpen] = useState(false)

  const handleButtonClick = () => {
    setOpen(!open)
  }

  return (
    <div>
      <Button onClick={handleButtonClick}>
        {open ? 'Close' : 'Open'} the Mask
      </Button>
      <Portal open={open}>
        <Mask
          fullscreen
          onClick={() => {
            setOpen(false)
          }}
        >
          <Heading>Click anywhere around this text to close the Mask</Heading>
        </Mask>
      </Portal>
    </div>
  )
}

render(<Example />)
```
