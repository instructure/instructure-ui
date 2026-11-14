# Mask


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


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Mask | children | `React.ReactNode` | No | - |  |
| Mask | placement | `'top' \| 'center' \| 'bottom' \| 'stretch'` | No | `'center'` |  |
| Mask | fullscreen | `boolean` | No | `false` |  |
| Mask | onClick | `(event: React.MouseEvent<HTMLSpanElement>) => void` | No | - |  |
| Mask | elementRef | `(element: Element \| null) => void` | No | - | provides a reference to the underlying html root element |

### Usage

Install the package:

```shell
npm install @instructure/ui-overlays
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Mask } from '@instructure/ui-overlays'
```

