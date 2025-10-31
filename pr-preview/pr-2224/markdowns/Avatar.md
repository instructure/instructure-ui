# Avatar


The avatar component can be used to display a user's avatar. When an image src is not supplied the user's initials will display.

Instead of the initials, an SVG icon can be displayed with the `renderIcon` property.

The avatar can be `circle` _(default)_ or `rectangle`. Use the `margin` prop to add space between Avatar and other content.

```js
---
type: example
readonly: true
---
<div>
  <Avatar name="Sarah Robinson" src={avatarSquare} margin="0 space8 0 0" />
  <Avatar name="Sarah Robinson" margin="0 space8 0 0" />
  <Avatar name="Sarah Robinson" renderIcon={<IconGroupLine />} margin="0 space8 0 0" />
  <Avatar name="Kyle Montgomery" src={avatarSquare} shape="rectangle" margin="0 space8 0 0" />
  <Avatar name="Kyle Montgomery" shape="rectangle" margin="0 space8 0 0" />
  <Avatar name="Kyle Montgomery" renderIcon={<IconGroupLine />} shape="rectangle" />
</div>
```

### AI Avatar

There is a need for special, `ai avatars`. These have a specific look. You can achieve it the following way

```js
---
type: example
readonly: true
---
<View display="block" padding="small medium" background="primary">
  <Avatar size="xx-small" color="ai"  renderIcon={IconAiSolid} margin="0 space8 0 0"/>
  <Avatar size="x-small" color="ai" renderIcon={IconAiSolid} margin="0 space8 0 0"/>
  <Avatar size="small" color="ai" renderIcon={IconAiSolid} margin="0 space8 0 0"/>
  <Avatar size="medium" color="ai" renderIcon={IconAiSolid} margin="0 space8 0 0"/>
  <Avatar size="large" color="ai" renderIcon={IconAiSolid} margin="0 space8 0 0"/>
  <Avatar size="x-large"  color="ai" renderIcon={IconAiSolid} margin="0 space8 0 0"/>
  <Avatar size="xx-large" color="ai" renderIcon={IconAiSolid} />
</View>
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
    <Avatar name="Arthur C. Clarke" size="xx-small" margin="0 space8 0 0" />
    <Avatar name="James Arias" size="x-small" margin="0 space8 0 0" />
    <Avatar name="Charles Kimball" size="small" margin="0 space8 0 0" />
    <Avatar name="Melissa Reed" size="medium" margin="0 space8 0 0" />
    <Avatar name="Heather Wheeler" size="large" margin="0 space8 0 0" />
    <Avatar name="David Herbert" size="x-large" margin="0 space8 0 0" />
    <Avatar name="Isaac Asimov" size="xx-large" />
  </View>
  <View display="block" padding="small medium" background="primary">
    <Avatar name="Arthur C. Clarke" size="xx-small" margin="0 space8 0 0"  src={avatarSquare} />
    <Avatar name="James Arias" size="x-small" margin="0 space8 0 0"  src={avatarSquare} />
    <Avatar name="Charles Kimball" size="small" margin="0 space8 0 0"  src={avatarSquare} />
    <Avatar name="Melissa Reed" size="medium" margin="0 space8 0 0"  src={avatarSquare} />
    <Avatar name="Heather Wheeler" size="large" margin="0 space8 0 0"  src={avatarSquare} />
    <Avatar name="David Herbert" size="x-large" margin="0 space8 0 0"  src={avatarSquare} />
    <Avatar name="Isaac Asimov" size="xx-large"  src={avatarSquare} />
  </View>
  <View display="block" padding="small medium">
    <Avatar name="Arthur C. Clarke" renderIcon={<IconGroupLine />} size="xx-small" margin="0 space8 0 0" />
    <Avatar name="James Arias" renderIcon={<IconGroupLine />} size="x-small" margin="0 space8 0 0" />
    <Avatar name="Charles Kimball" renderIcon={<IconGroupLine />} size="small" margin="0 space8 0 0" />
    <Avatar name="Melissa Reed" renderIcon={<IconGroupLine />} size="medium" margin="0 space8 0 0" />
    <Avatar name="Heather Wheeler" renderIcon={<IconGroupLine />} size="large" margin="0 space8 0 0" />
    <Avatar name="David Herbert" renderIcon={<IconGroupLine />} size="x-large" margin="0 space8 0 0" />
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
    <Avatar name="Arthur C. Clarke" margin="0 space8 0 0" />
    <Avatar name="James Arias" color="shamrock" margin="0 space8 0 0" />
    <Avatar name="Charles Kimball" color="barney" margin="0 space8 0 0" />
    <Avatar name="Melissa Reed" color="crimson" margin="0 space8 0 0" />
    <Avatar name="Heather Wheeler" color="fire" margin="0 space8 0 0" />
    <Avatar name="David Herbert" color="licorice" margin="0 space8 0 0" />
    <Avatar name="Isaac Asimov" color="ash" />
  </View>
  <View display="block" padding="small medium">
    <Avatar renderIcon={<IconGroupLine />} name="Arthur C. Clarke" margin="0 space8 0 0" />
    <Avatar renderIcon={<IconGroupLine />} name="James Arias" color="shamrock" margin="0 space8 0 0" />
    <Avatar renderIcon={<IconGroupLine />} name="Charles Kimball" color="barney" margin="0 space8 0 0" />
    <Avatar renderIcon={<IconGroupLine />} name="Melissa Reed" color="crimson" margin="0 space8 0 0" />
    <Avatar renderIcon={<IconGroupLine />} name="Heather Wheeler" color="fire" margin="0 space8 0 0" />
    <Avatar renderIcon={<IconGroupLine />} name="David Herbert" color="licorice" margin="0 space8 0 0" />
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
    <Avatar name="Arthur C. Clarke" hasInverseColor margin="0 space8 0 0" />
    <Avatar name="James Arias" color="shamrock" hasInverseColor margin="0 space8 0 0" />
    <Avatar name="Charles Kimball" color="barney" hasInverseColor margin="0 space8 0 0" />
    <Avatar name="Melissa Reed" color="crimson" hasInverseColor margin="0 space8 0 0" />
    <Avatar name="Heather Wheeler" color="fire" hasInverseColor margin="0 space8 0 0" />
    <Avatar name="David Herbert" color="licorice" hasInverseColor margin="0 space8 0 0" />
    <Avatar name="Isaac Asimov" color="ash" hasInverseColor />
  </View>
  <View display="block" padding="small medium" background="primary">
    <Avatar renderIcon={<IconGroupLine />} name="Arthur C. Clarke" hasInverseColor margin="0 space8 0 0" />
    <Avatar renderIcon={<IconGroupLine />} name="James Arias" color="shamrock" hasInverseColor margin="0 space8 0 0" />
    <Avatar renderIcon={<IconGroupLine />} name="Charles Kimball" color="barney" hasInverseColor margin="0 space8 0 0" />
    <Avatar renderIcon={<IconGroupLine />} name="Melissa Reed" color="crimson" hasInverseColor margin="0 space8 0 0" />
    <Avatar renderIcon={<IconGroupLine />} name="Heather Wheeler" color="fire" hasInverseColor margin="0 space8 0 0" />
    <Avatar renderIcon={<IconGroupLine />} name="David Herbert" color="licorice" hasInverseColor margin="0 space8 0 0" />
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
  <Avatar name="Isaac Asimov" renderIcon={<IconGroupLine />} themeOverride={{ color: '#efb410' }} margin="0 space8 0 0" />
  <Avatar name="Heather Wheeler" color="fire" themeOverride={{ colorFire: 'magenta' }} margin="0 space8 0 0" />
  <Avatar name="Charles Kimball" renderIcon={<IconGroupLine />} hasInverseColor themeOverride={{ color: 'lightblue', background: 'black' }} margin="0 space8 0 0" />
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
  <Avatar name="Sarah Robinson" src={avatarSquare} margin="0 space8 0 0" showBorder="always"/>
  <Avatar name="Sarah Robinson" renderIcon={<IconGroupLine />} margin="0 space8 0 0" showBorder="never"/>
</div>
```

### Accessibility

Avatars use the `aria-hidden="true"` property and therefore are hidden from screenreaders. Make sure if you are using them stand-alone it's accompanied with [ScreenReaderContent](ScreenReaderContent).

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


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Avatar | name | `string` | Yes | - | The name to display. It will be automatically converted to initials. |
| Avatar | src | `string` | No | - | URL of the image to display as the background image |
| Avatar | alt | `string` | No | - | Accessible label |
| Avatar | size | `\| 'auto' \| 'xx-small' \| 'x-small' \| 'small' \| 'medium' \| 'large' \| 'x-large' \| 'xx-large'` | No | `'medium'` |  |
| Avatar | color | `\| 'default' // = brand \| 'shamrock' \| 'barney' \| 'crimson' \| 'fire' \| 'licorice' \| 'ash' \| 'ai'` | No | `'default'` |  |
| Avatar | hasInverseColor | `boolean` | No | `false` | In inverse color mode the background and text/icon colors are inverted |
| Avatar | showBorder | `'auto' \| 'always' \| 'never'` | No | `'auto'` | `auto` only shows a border when there is no source image. This prop can force to always or never show that border. |
| Avatar | shape | `'circle' \| 'rectangle'` | No | `'circle'` |  |
| Avatar | display | `'inline-block' \| 'block'` | No | `'inline-block'` |  |
| Avatar | margin | `Spacing` | No | - | Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via familiar CSS-like shorthand. For example: `margin="small auto large"`. |
| Avatar | onImageLoaded | `(event?: SyntheticEvent) => void` | No | - | Callback fired when the avatar image has loaded. `event` can be `undefined`, if its already loaded when the page renders (can happen in SSR) |
| Avatar | as | `keyof JSX.IntrinsicElements \| ComponentType<P>` | No | - | The element type to render as |
| Avatar | elementRef | `(element: Element \| null) => void` | No | - | provides a reference to the underlying html root element |
| Avatar | renderIcon | `\| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - | An icon, or function that returns an icon that gets displayed. If the `src` prop is provided, `src` will have priority. |

### Usage

Install the package:

```shell
npm install @instructure/ui-avatar
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Avatar } from '@instructure/ui-avatar'
```

