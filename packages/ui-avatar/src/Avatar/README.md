---
describes: Avatar
---

The avatar component can be used to display a user's avatar. When an image src is not supplied the user's initials will display.

## Variant

Avatar has a variant prop, which currently only toggles it between `ai` and `default` behavior. `ai` is a preset where you can only change the `size` and `margin` visual props, all others are preset. In the following example, there are the `ai` variants.

### ai

```js
---
type: example
readonly: true
---
<div>
   <View display="block" padding="small medium">
    <Avatar variant="ai" size="xx-small" margin="0 small 0 0" />
    <Avatar variant="ai" size="x-small" margin="0 small 0 0" />
    <Avatar variant="ai" size="small" margin="0 small 0 0" />
    <Avatar variant="ai" size="medium" margin="0 small 0 0" />
    <Avatar variant="ai" size="large" margin="0 small 0 0" />
    <Avatar variant="ai" size="x-large" margin="0 small 0 0" />
    <Avatar variant="ai" size="xx-large" />
  </View>
</div>
```

### default

Most avatar's features are accessible through the `default` variant

Instead of the initials, an SVG icon can be displayed with the `renderIcon` property.

The avatar can be `circle` _(default)_ or `rectangle`. Use the `margin` prop to add space between Avatar and other content.

```js
---
type: example
readonly: true
---
<div>
  <Avatar name="Sarah Robinson" src={avatarSquare} margin="0 small 0 0" />
  <Avatar name="Sarah Robinson" margin="0 small 0 0" />
  <Avatar name="Sarah Robinson" renderIcon={<IconGroupLine />} margin="0 small 0 0" />
  <Avatar name="Kyle Montgomery" src={avatarSquare} shape="rectangle" margin="0 small 0 0" />
  <Avatar name="Kyle Montgomery" shape="rectangle" margin="0 small 0 0" />
  <Avatar name="Kyle Montgomery" renderIcon={<IconGroupLine />} shape="rectangle" />
</div>
```

### Size

The `size` prop allows you to select from `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, and `xx-large`. If the `auto` prop is set, the avatar size will adjust according to the font-size
of its container.

```js
---
type: example
---
<div>
  <View display="block" padding="small medium">
    <Avatar name="Arthur C. Clarke" size="xx-small" margin="0 small 0 0" />
    <Avatar name="James Arias" size="x-small" margin="0 small 0 0" />
    <Avatar name="Charles Kimball" size="small" margin="0 small 0 0" />
    <Avatar name="Melissa Reed" size="medium" margin="0 small 0 0" />
    <Avatar name="Heather Wheeler" size="large" margin="0 small 0 0" />
    <Avatar name="David Herbert" size="x-large" margin="0 small 0 0" />
    <Avatar name="Isaac Asimov" size="xx-large" />
  </View>
  <View display="block" padding="small medium" background="primary">
    <Avatar name="Arthur C. Clarke" size="xx-small" margin="0 small 0 0"  src={avatarSquare} />
    <Avatar name="James Arias" size="x-small" margin="0 small 0 0"  src={avatarSquare} />
    <Avatar name="Charles Kimball" size="small" margin="0 small 0 0"  src={avatarSquare} />
    <Avatar name="Melissa Reed" size="medium" margin="0 small 0 0"  src={avatarSquare} />
    <Avatar name="Heather Wheeler" size="large" margin="0 small 0 0"  src={avatarSquare} />
    <Avatar name="David Herbert" size="x-large" margin="0 small 0 0"  src={avatarSquare} />
    <Avatar name="Isaac Asimov" size="xx-large"  src={avatarSquare} />
  </View>
  <View display="block" padding="small medium">
    <Avatar name="Arthur C. Clarke" renderIcon={<IconGroupLine />} size="xx-small" margin="0 small 0 0" />
    <Avatar name="James Arias" renderIcon={<IconGroupLine />} size="x-small" margin="0 small 0 0" />
    <Avatar name="Charles Kimball" renderIcon={<IconGroupLine />} size="small" margin="0 small 0 0" />
    <Avatar name="Melissa Reed" renderIcon={<IconGroupLine />} size="medium" margin="0 small 0 0" />
    <Avatar name="Heather Wheeler" renderIcon={<IconGroupLine />} size="large" margin="0 small 0 0" />
    <Avatar name="David Herbert" renderIcon={<IconGroupLine />} size="x-large" margin="0 small 0 0" />
    <Avatar name="Isaac Asimov" renderIcon={<IconGroupLine />} size="xx-large" />
  </View>
</div>
```

### Colors

The color of the initials and icons can be set with the `color` prop, and it allows you to select from `default`, `shamrock`, `barney`, `crimson`, `fire`, `licorice` and `ash`.

```js
---
type: example
---
<div>
  <View display="block" padding="small medium">
    <Avatar name="Arthur C. Clarke" margin="0 small 0 0" />
    <Avatar name="James Arias" color="shamrock" margin="0 small 0 0" />
    <Avatar name="Charles Kimball" color="barney" margin="0 small 0 0" />
    <Avatar name="Melissa Reed" color="crimson" margin="0 small 0 0" />
    <Avatar name="Heather Wheeler" color="fire" margin="0 small 0 0" />
    <Avatar name="David Herbert" color="licorice" margin="0 small 0 0" />
    <Avatar name="Isaac Asimov" color="ash" />
  </View>
  <View display="block" padding="small medium">
    <Avatar renderIcon={<IconGroupLine />} name="Arthur C. Clarke" margin="0 small 0 0" />
    <Avatar renderIcon={<IconGroupLine />} name="James Arias" color="shamrock" margin="0 small 0 0" />
    <Avatar renderIcon={<IconGroupLine />} name="Charles Kimball" color="barney" margin="0 small 0 0" />
    <Avatar renderIcon={<IconGroupLine />} name="Melissa Reed" color="crimson" margin="0 small 0 0" />
    <Avatar renderIcon={<IconGroupLine />} name="Heather Wheeler" color="fire" margin="0 small 0 0" />
    <Avatar renderIcon={<IconGroupLine />} name="David Herbert" color="licorice" margin="0 small 0 0" />
    <Avatar renderIcon={<IconGroupLine />} name="Isaac Asimov" color="ash" />
  </View>
</div>
```

The `hasInverseColor` prop inverts the background color and the text/icon color.

Inverted Avatars have **no border**.

```js
---
type: example
---
<div>
  <View display="block" padding="small medium" background="primary">
    <Avatar name="Arthur C. Clarke" hasInverseColor margin="0 small 0 0" />
    <Avatar name="James Arias" color="shamrock" hasInverseColor margin="0 small 0 0" />
    <Avatar name="Charles Kimball" color="barney" hasInverseColor margin="0 small 0 0" />
    <Avatar name="Melissa Reed" color="crimson" hasInverseColor margin="0 small 0 0" />
    <Avatar name="Heather Wheeler" color="fire" hasInverseColor margin="0 small 0 0" />
    <Avatar name="David Herbert" color="licorice" hasInverseColor margin="0 small 0 0" />
    <Avatar name="Isaac Asimov" color="ash" hasInverseColor />
  </View>
  <View display="block" padding="small medium" background="primary">
    <Avatar renderIcon={<IconGroupLine />} name="Arthur C. Clarke" hasInverseColor margin="0 small 0 0" />
    <Avatar renderIcon={<IconGroupLine />} name="James Arias" color="shamrock" hasInverseColor margin="0 small 0 0" />
    <Avatar renderIcon={<IconGroupLine />} name="Charles Kimball" color="barney" hasInverseColor margin="0 small 0 0" />
    <Avatar renderIcon={<IconGroupLine />} name="Melissa Reed" color="crimson" hasInverseColor margin="0 small 0 0" />
    <Avatar renderIcon={<IconGroupLine />} name="Heather Wheeler" color="fire" hasInverseColor margin="0 small 0 0" />
    <Avatar renderIcon={<IconGroupLine />} name="David Herbert" color="licorice" hasInverseColor margin="0 small 0 0" />
    <Avatar renderIcon={<IconGroupLine />} name="Isaac Asimov" color="ash" hasInverseColor />
  </View>
</div>
```

In case you need more control over the color, feel free to use the `themeOverride` prop, and override the default theme variables.

```js
---
type: example
---
<div>
  <Avatar name="Isaac Asimov" renderIcon={<IconGroupLine />} themeOverride={{ color: '#efb410' }} margin="0 small 0 0" />
  <Avatar name="Heather Wheeler" color="fire" themeOverride={{ colorFire: 'magenta' }} margin="0 small 0 0" />
  <Avatar name="Charles Kimball" renderIcon={<IconGroupLine />} hasInverseColor themeOverride={{ color: 'lightblue', background: 'black' }} margin="0 small 0 0" />
  <Avatar name="David Herbert" hasInverseColor color="fire" themeOverride={{ colorFire: '#efb410' }} />
</div>
```

### Border

By default only avatars without an image have borders but you can force it to `always` or `never` show with the `showBorder` prop however you should only use it rarely in very specific occasions (e.g. displaying an avatar in the [SideNavBar](/#SideNavBar))

```js
---
type: example
---
<div>
  <Avatar name="Sarah Robinson" src={avatarSquare} margin="0 small 0 0" showBorder="always"/>
  <Avatar name="Sarah Robinson" renderIcon={<IconGroupLine />} margin="0 small 0 0" showBorder="never"/>
</div>
```

### Accessibility

Avatars use the `aria-hidden="true"` property and therefore are hidden from screenreaders. Make sure if you are using them stand-alone it's accompanied with [ScreenReaderContent](#ScreenReaderContent).

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Ensure the appropriate size is being used for its placement (in a table, stand-alone, etc…)</Figure.Item>
    <Figure.Item>Use circle variant in Canvas</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Use inline in sentence</Figure.Item>
  </Figure>
</Guidelines>
```
