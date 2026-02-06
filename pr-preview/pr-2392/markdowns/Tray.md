# Tray


The Tray is an actionable container that is triggered by click and does not need to be connected to the element that triggered it. The Tray is on the same hierarchy as the Popover but contains more content. The Tray slides out from the top/bottom/start/end of the viewport.

> Note that the `size` property only applies when the Tray is positioned at `start` or `end` and defines the width of the Tray.

```js
---
type: example
---
const FPO = lorem.paragraph()

const Example = () => {
  const [open, setOpen] = useState(false)

  const hideTray = () => {
    setOpen(false)
  }

  const renderCloseButton = () => (
    <Flex>
      <Flex.Item>
        <CloseButton
          placement="end"
          offset="small"
          screenReaderLabel="Close"
          onClick={hideTray}
        />
      </Flex.Item>
      <Flex.Item shouldGrow shouldShrink>
        <Heading>Hello</Heading>
      </Flex.Item>
    </Flex>
  )

  return (
    <div style={{ padding: '0 0 16rem 0', margin: '0 auto' }}>
      <Button onClick={() => setOpen(true)}>Show the Tray</Button>
      <Tray
        label="Tray Example"
        open={open}
        onDismiss={() => setOpen(false)}
        size="small"
        placement="start"
      >
        <View as="div" padding="medium">
          {renderCloseButton()}
          <Text as="p" lineHeight="double">
            {FPO}
          </Text>
        </View>
      </Tray>
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
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Configure Tray to enter from the end on desktop, bottom on mobile/tablet</Figure.Item>
    <Figure.Item>Use when it is useful to still see information contained on the page or not lose context of the page that triggered the Tray</Figure.Item>
    <Figure.Item>Use 2 tabs max if using TabList in small size</Figure.Item>
    <Figure.Item>Use 5 tabs max if using TabList in medium/large size</Figure.Item>
    <Figure.Item>Prefer Tray to close when user clicks outside of the Tray</Figure.Item>
    <Figure.Item>Keep the close 'x' directly following the Tray title, no matter what side the Tray slides from</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Use TabList in the x-small size</Figure.Item>
    <Figure.Item>Use for Sub Nav or <Link href="/#DrawerLayout">Drawer Layout</Link></Figure.Item>
    <Figure.Item>Use with an <Link href="/#Overlay">Overlay</Link></Figure.Item>
    <Figure.Item>Use a Tray on top of a <Link href="/#Modal">Modal</Link></Figure.Item>
    <Figure.Item>Use for <Link href="#Alert">Alerts</Link> or Confirmation Dialogs</Figure.Item>
    <Figure.Item>Allow Tray to push the content of the page</Figure.Item>
  </Figure>
</Guidelines>
```

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>Keyboard focus must be set in the tray when it appears; usually on the first interactive element</Figure.Item>
    <Figure.Item>Trays must contain keyboard focus until they’re closed. This is to ensure that keyboard or screen reader users won't mistakenly interact with background content that is meant to be hidden or inaccessible</Figure.Item>
    <Figure.Item>When a user closes a tray, focus must return to a logical place within the page. This is usually the element that triggered opening the tray</Figure.Item>
    <Figure.Item>We recommend that trays begin with a heading (typically H2). However, when configuring the component, the button to close the Tray should precede the heading. This ensures screen readers announce the Tray's content in a logical order.</Figure.Item>
  </Figure>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Tray | label | `string` | Yes | - |  |
| Tray | size | `'x-small' \| 'small' \| 'regular' \| 'medium' \| 'large'` | No | `'small'` | The size (width) of the `<Tray />` when placement is `start` or `end` |
| Tray | placement | `'top' \| 'bottom' \| 'start' \| 'end' \| 'center'` | No | `'start'` | Placement to determine where the `<Tray />` should display in the viewport |
| Tray | open | `boolean` | No | `false` | Whether or not the `<Tray />` is open |
| Tray | defaultFocusElement | `UIElement` | No | `null` | An element or a function returning an element to focus by default |
| Tray | contentRef | `(el: HTMLSpanElement \| null) => void` | No | - | A function that returns a reference to the content element |
| Tray | shouldContainFocus | `boolean` | No | `true` | Whether focus should be contained within the `<Tray/>` when it is open |
| Tray | shouldReturnFocus | `boolean` | No | `true` | Whether focus should be restored when the `<Tray/>` is closed |
| Tray | shouldCloseOnDocumentClick | `boolean` | No | `false` | Should the `<Tray />` hide when clicks occur outside the content |
| Tray | onOpen | `(type?: TransitionType) => void` | No | - | Callback fired when `<Tray />` content has been mounted in the DOM |
| Tray | onClose | `(type?: TransitionType) => void` | No | - | Callback fired when `<Tray />` has been unmounted from the DOM |
| Tray | onDismiss | `( event: React.UIEvent \| React.FocusEvent, documentClick?: boolean ) => void` | No | - | Callback fired when the `<Tray />` is requesting to be closed |
| Tray | mountNode | `Element \| (() => Element \| null) \| null` | No | - | An element or a function returning an element to use as the mount node for the `<Tray />` (defaults to `document.body`) |
| Tray | insertAt | `'bottom' \| 'top'` | No | `'bottom'` | Insert the element at the 'top' of the mountNode or at the 'bottom' |
| Tray | liveRegion | `LiveRegion` | No | - | An element, function returning an element, or array of elements that will not be hidden from the screen reader when the `<Tray />` is open |
| Tray | onTransition | `( toState: BaseTransitionStatesType, fromState: BaseTransitionStatesType ) => void` | No | - | Callback fired when the <Tray /> transitions in/out |
| Tray | onEnter | `() => void` | No | - | Callback fired before the <Tray /> transitions in |
| Tray | onEntering | `() => void` | No | - | Callback fired as the <Tray /> begins to transition in |
| Tray | onEntered | `(type?: TransitionType) => void` | No | - | Callback fired after the <Tray /> finishes transitioning in |
| Tray | onExit | `() => void` | No | - | Callback fired right before the <Tray /> transitions out |
| Tray | onExiting | `() => void` | No | - | Callback fired as the <Tray /> begins to transition out |
| Tray | onExited | `(type?: TransitionType) => void` | No | - | Callback fired after the <Tray /> finishes transitioning out |
| Tray | transitionOnMount | `boolean` | No | `true` | Run the enter animation when the component mounts, if it is initially shown |
| Tray | transitionEnter | `boolean` | No | `true` | Run the enter animation |
| Tray | transitionExit | `boolean` | No | `true` | Run the exit animation |
| Tray | border | `boolean` | No | `false` | Should the `<Tray />` have a border |
| Tray | shadow | `boolean` | No | `true` | Should the `<Tray />` have a box shadow |
| Tray | children | `React.ReactNode` | No | - |  |
| Tray | enableMask | `boolean` | No | `false` | Add Mask overlay to the `<Tray />` |

### Usage

Install the package:

```shell
npm install @instructure/ui-tray
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Tray } from '@instructure/ui-tray'
```

