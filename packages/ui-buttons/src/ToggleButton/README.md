---
describes: ToggleButton
---

`ToggleButton` is a controlled button component used for toggling a status or setting
between one of two states (locked/unlocked, published/unpublished, etc.).

```javascript
---
example: true
render: false
---
class Example extends React.Component {
  state = {
    locked: 'off'
  }

  handleLocked = (e) => {
    this.setState(function(prevState) {
      return {locked: prevState.locked === 'on' ? 'off' : 'on'}
    })
  }

  render () {
    const locked = this.state.locked === 'on'

    return (
      <View as="div" padding="x-large" id="toggleContainer">
        <ToggleButton
          status={locked ? 'pressed' : 'unpressed'}
          color={locked ? 'danger' : 'secondary'}
          renderIcon={locked ? IconLockSolid : IconUnlockLine}
          screenReaderLabel={locked ? 'Unlock assignment' : 'Lock assignment'}
          renderTooltipContent={locked ? 'Unlock' : 'Lock'}
          onClick={this.handleLocked}
          mountNode={() => document.getElementById('toggleContainer')}
        />
      </View>
    )
  }
}
render(<Example />)
```

### Inverse ToggleButton

```javascript
---
example: true
render: false
---
class InverseExample extends React.Component {
  state = {
    locked: 'off'
  }

  handleLocked = (e) => {
    this.setState(function(prevState) {
      return {locked: prevState.locked === 'on' ? 'off' : 'on'}
    })
  }

  render () {
    const locked = this.state.locked === 'on'

    return (
      <View as="div" padding="xx-large" background="primary-inverse" id="inverseToggleContainer">
        <ToggleButton
          status={locked ? 'pressed' : 'unpressed'}
          color="primary-inverse"
          renderIcon={locked ? IconLockSolid : IconUnlockLine}
          screenReaderLabel={locked ? 'Unlock assignment' : 'Lock assignment'}
          renderTooltipContent={locked ? 'Unlock' : 'Lock'}
          onClick={this.handleLocked}
          mountNode={() => document.getElementById('inverseToggleContainer')}
        />
      </View>
    )
  }
}
render(<InverseExample />)
```

### Guidelines

```js
---
guidelines: true
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
