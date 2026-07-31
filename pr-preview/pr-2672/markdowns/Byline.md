# Byline


A byline component with a visual and a caption:

```js
---
type: example
---
<Byline description={lorem.sentence()}>
  <Avatar name="Julia Childer" />
</Byline>
```

Create a heading by using the `title` prop, and add space around the Byline
component via the `margin` prop. To constrain the component's width, use
the `size` prop.

You can also adjust the alignment of the visual object with the descriptive text by
setting the `alignContent` prop.

```js
---
type: example
---
<Byline
  margin="general.space2xl auto"
  size="small"
  alignContent="top"
  title="Graham Taylor"
  description={lorem.paragraph()}
>
  <Avatar name="Graham Taylor" />
</Byline>
```

```js
---
type: example
---
<Byline
  description={
    <View display="block" margin="0 0 0 general.spaceSm">
      <Heading level="h2">
        <Link href="#">Clickable Heading</Link>
      </Heading>
      <Text
        size="x-small"
        transform="uppercase"
        letterSpacing="expanded"
      >
        Something here
      </Text>
    </View>
  }>
  <HeartInstUIIcon size="illu-sm" color="successColor" />
</Byline>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Byline | children | `React.ReactNode` | Yes | - | the Byline visual/object |
| Byline | title | `React.ReactNode` | No | - | the Byline title |
| Byline | description | `string \| React.ReactNode` | No | - | the Byline description |
| Byline | alignContent | `'top' \| 'center'` | No | `'center'` | how should the title and description align |
| Byline | margin | `Spacing` | No | - | Valid values are `0`, `none`, `auto`, and Spacing token values, see https://instructure.design/layout-spacing. Apply these values via familiar CSS-like shorthand. For example, `margin="general.spaceMd auto"`. |
| Byline | size | `'small' \| 'medium' \| 'large'` | No | - |  |
| Byline | elementRef | `(element: Element \| null) => void` | No | - | Provides a reference to the underlying html root element |

### Usage

Install the package:

```shell
npm install @instructure/ui-byline
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Byline } from '@instructure/ui-byline/v11_7'
```

