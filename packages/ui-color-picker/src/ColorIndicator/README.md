---
describes: ColorIndicator
---

A component displaying a circle with checkerboard background capable of displaying colors

### Color Indicator

```js
---
type: example
---
<div style={{display:'flex', background:'white'}}>
  <View margin='small'>
    <ColorIndicator color=''/>
  </View>
  <View margin='small'>
    <ColorIndicator color='#ff0000'/>
  </View>
  <View margin='small'>
    <ColorIndicator color='#ff000088'/>
  </View>
  <View margin='small'>
    <ColorIndicator color='#ff000000'/>
  </View>
  <View margin='small'>
    <ColorIndicator color='yellow'/>
  </View>
  <View margin='small'>
    <ColorIndicator color='rgb(155,55,82)'/>
  </View>
  <View margin='small'>
    <ColorIndicator color='rgba(155,55,82,.5)'/>
  </View>
  <View margin='small'>
    <ColorIndicator color='hsl(30, 100%, 50%)'/>
  </View>
  <View margin='small'>
    <ColorIndicator color='hsla(30, 100%, 50%, .3)'/>
  </View>
  <View margin='small'>
    <ColorIndicator color='hwb(1.5708rad 60% 0%)'/>
  </View>
</div>


```

### Shapes

`ColorIndicator` can have a `shape` prop. It is either a `circle` which is the default, or a `rectangle`

```js
---
type: example
---
<div style={{display:'flex', background:'white'}}>
  <View margin='small'>
    <ColorIndicator color='#ff0000'/>
  </View>
  <View margin='small'>
    <ColorIndicator color='#ff0000' shape='rectangle'/>
  </View>
</div>
```

### Color Button Pattern

```js
---
type: example
---
<IconButton screenReaderLabel="ColorIndicator button">
  <ColorIndicator color='#ff0000'/>
</IconButton>
```
