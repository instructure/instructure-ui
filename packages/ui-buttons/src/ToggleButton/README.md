---
describes: ToggleButton
---

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
