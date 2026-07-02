---
describes: ColorIndicator
---

A component displaying a circle with checkerboard background capable of displaying colors

### Color Indicator

```js
---
type: example
---
<View as="div" background="primary" display='flex'>
  <View margin='general.spaceMd'>
    <ColorIndicator color=''/>
  </View>
  <View margin='general.spaceMd'>
    <ColorIndicator color='#ff0000'/>
  </View>
  <View margin='general.spaceMd'>
    <ColorIndicator color='#ff000088'/>
  </View>
  <View margin='general.spaceMd'>
    <ColorIndicator color='#ff000000'/>
  </View>
  <View margin='general.spaceMd'>
    <ColorIndicator color='yellow'/>
  </View>
  <View margin='general.spaceMd'>
    <ColorIndicator color='rgb(155,55,82)'/>
  </View>
  <View margin='general.spaceMd'>
    <ColorIndicator color='rgba(155,55,82,.5)'/>
  </View>
  <View margin='general.spaceMd'>
    <ColorIndicator color='hsl(30, 100%, 50%)'/>
  </View>
  <View margin='general.spaceMd'>
    <ColorIndicator color='hsla(30, 100%, 50%, .3)'/>
  </View>
  <View margin='general.spaceMd'>
    <ColorIndicator color='hwb(1.5708rad 60% 0%)'/>
  </View>
</View>


```

### Shapes

`ColorIndicator` can have a `shape` prop. It is either a `circle` which is the default, or a `rectangle`

```js
---
type: example
---
<View as="div" background="primary" display='flex'>
  <View margin='general.spaceMd'>
    <ColorIndicator color='#ff0000'/>
  </View>
  <View margin='general.spaceMd'>
    <ColorIndicator color='#ff0000' shape='rectangle'/>
  </View>
</View>
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
