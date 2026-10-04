# Card3


Use `<Card />` as a basic wrapper for grouping related content with padding,
border radius, shadow, and background color.

```js
---
type: example
---
<Card3 src={avatarSquare}>
  <Heading level="h3" margin="0 0 x-small 0">
    Base card
  </Heading>
  <Text variant="content">Medium size, the default.</Text>
</Card3>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Card3 | children | `ReactNode` | No | - | The content to be rendered inside the Card |
| Card3 | src | `string` | Yes | - | image source string. It gets passed to InstUI's <Img> component |

### Usage

Install the package:

```shell
npm install @instructure/ui-card
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Card3 } from '@instructure/ui-card/v11_7'
```

