---
describes: Portal
---

The `<Portal/>` component allows you to render a subtree into a DOM element.

```js
---
type: example
---
const Example = () => {
  const [isPortalOpen, setIsPortalOpen] = useState(false)
  const mountNodeRef = useRef(null)

  const handleButtonClick = () => {
    setIsPortalOpen(!isPortalOpen)
  }

  const firstParagraph = lorem.paragraph()
  const secondParagraph = lorem.paragraph()

  return (
    <div>
      <Button onClick={handleButtonClick}>
        {isPortalOpen ? 'Close' : 'Open'} the Portal
      </Button>
      <Portal
        mountNode={mountNodeRef.current}
        open={isPortalOpen}
      >
        <ContextView placement="center start" padding="0 x-small">
          <p>Greetings from the portal!</p>
        </ContextView>
      </Portal>
      <Text>
        <p>{firstParagraph}</p>
        <div ref={mountNodeRef}></div>
        <p>{secondParagraph}</p>
      </Text>
    </div>
  )
}

render(<Example />)
```
