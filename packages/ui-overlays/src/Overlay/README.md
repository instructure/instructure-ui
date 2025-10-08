---
describes: Overlay
---

The Overlay component is a closable/dismissible component that transitions
in and out content rendered in a [Portal](#Portal)

```js
---
type: example
---
const Example = () => {
  const [open, setOpen] = useState(false)
  const maskRef = useRef(null)

  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        Show the Overlay
      </Button>
      <Overlay
        open={open}
        transition="fade"
        label="Overlay Example"
        shouldReturnFocus
        shouldContainFocus
        onDismiss={() => {
          setOpen(false)
        }}
        defaultFocusElement={() => maskRef.current}
      >
        <Mask
          onClick={() => {
            setOpen(false)
          }}
          elementRef={maskRef}
        >
          <Spinner renderTitle="Loading" size="large" margin="0 0 0 medium" />
        </Mask>
      </Overlay>
    </div>
  )
}
render(<Example />)
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>Ensure content behind the overlay is hidden from users so they cannot navigate to it when using keyboard navigation and screen readers</Figure.Item>
    <Figure.Item>Dismissable with the ESC key</Figure.Item>
  </Figure>
</Guidelines>
```
