# ToggleButton


`ToggleButton` is a controlled button component used for toggling a status or setting
between one of two states (locked/unlocked, published/unpublished, etc.).

- ```javascript
  class Example extends React.Component {
    state = {
      locked: false
    }

    handleLocked = (e) => {
      this.setState((prevState) => ({ locked: !prevState.locked }))
    }

    render() {
      const locked = this.state.locked

      return (
        <View as="div" padding="x-large" id="toggleContainer">
          <ToggleButton
            status={locked ? 'pressed' : 'unpressed'}
            color={locked ? 'danger' : 'secondary'}
            renderIcon={locked ? IconLockSolid : IconUnlockLine}
            screenReaderLabel={locked ? 'Unlock assignment' : 'Lock assignment'}
            renderTooltipContent={locked ? 'Unlock' : 'Lock'}
            onClick={this.handleLocked}
          />
        </View>
      )
    }
  }
  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [locked, setLocked] = useState(false)

    const handleLocked = () => {
      setLocked(!locked)
    }

    return (
      <View as="div" padding="x-large" id="toggleContainer">
        <ToggleButton
          status={locked ? 'pressed' : 'unpressed'}
          color={locked ? 'danger' : 'secondary'}
          renderIcon={locked ? IconLockSolid : IconUnlockLine}
          screenReaderLabel={locked ? 'Unlock assignment' : 'Lock assignment'}
          renderTooltipContent={locked ? 'Unlock' : 'Lock'}
          onClick={handleLocked}
        />
      </View>
    )
  }

  render(<Example />)
  ```

### Inverse ToggleButton

- ```javascript
  class InverseExample extends React.Component {
    state = {
      locked: false
    }

    handleLocked = (e) => {
      this.setState((prevState) => ({ locked: !prevState.locked }))
    }

    render() {
      const locked = this.state.locked

      return (
        <View
          as="div"
          padding="xx-large"
          background="primary-inverse"
          id="inverseToggleContainer"
        >
          <ToggleButton
            status={locked ? 'pressed' : 'unpressed'}
            color="primary-inverse"
            renderIcon={locked ? IconLockSolid : IconUnlockLine}
            screenReaderLabel={locked ? 'Unlock assignment' : 'Lock assignment'}
            renderTooltipContent={locked ? 'Unlock' : 'Lock'}
            onClick={this.handleLocked}
          />
        </View>
      )
    }
  }
  render(<InverseExample />)
  ```

- ```js
  const InverseExample = () => {
    const [locked, setLocked] = useState(false)

    const handleLocked = () => {
      setLocked(!locked)
    }

    return (
      <View
        as="div"
        padding="xx-large"
        background="primary-inverse"
        id="inverseToggleContainer"
      >
        <ToggleButton
          status={locked ? 'pressed' : 'unpressed'}
          color="primary-inverse"
          renderIcon={locked ? IconLockSolid : IconUnlockLine}
          screenReaderLabel={locked ? 'Unlock assignment' : 'Lock assignment'}
          renderTooltipContent={locked ? 'Unlock' : 'Lock'}
          onClick={handleLocked}
        />
      </View>
    )
  }
  render(<InverseExample />)
  ```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Use for toggling a setting or status between one of two states</Figure.Item>
    <Figure.Item>Use <code>color="primary-inverse"</code> on dark backgrounds so your icon and tooltip are visible</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Use text inside a <code>ToggleButton</code></Figure.Item>
  </Figure>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| ToggleButton | screenReaderLabel | `string` | Yes | - | Text to output only to screen readers |
| ToggleButton | renderTooltipContent | `union` | Yes | - | Text to render in the tooltip shown on hover/focus |
| ToggleButton | renderIcon | `union` | Yes | - | An icon or function that returns an icon |
| ToggleButton | status | `union` | Yes | - | Toggles the `aria-pressed` attribute on the button (`true` if `pressed`; `false` if `unpressed`) |
| ToggleButton | as | `union` | No | `'button'` | The element to render as the component root; `button` by default |
| ToggleButton | interaction | `union` | No | `undefined` | Specifies if interaction with `ToggleButton` is `enabled`, `disabled`, or `readonly` |
| ToggleButton | size | `union` | No | `'medium'` | The size of the `ToggleButton` |
| ToggleButton | elementRef | `signature` | No | - | Provides a reference to `ToggleButton`'s underlying HTML element |
| ToggleButton | onClick | `signature` | No | - | Callback fired when the `ToggleButton` is clicked |
| ToggleButton | color | `union` | No | `'secondary'` | The color in which to display the icon |
| ToggleButton | isShowingTooltip | `boolean` | No | - | By default, the tooltip will show on hover/focus. Use this prop if you need to override that behavior. |
| ToggleButton | mountNode | `PositionMountNode` | No | `null` | An element or a function returning an element to use as the mount node |
| ToggleButton | placement | `PlacementPropValues` | No | `'top center'` | The placement of the tooltip in relation to the button |
| ToggleButton | constrain | `PositionConstraint` | No | `'window'` | The parent in which to constrain the tooltip. One of: 'window', 'scroll-parent', 'parent', 'none', an element, or a function returning an element. |

### Usage

Install the package:

```shell
npm install @instructure/ui-buttons
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { ToggleButton } from '@instructure/ui-buttons'
```

