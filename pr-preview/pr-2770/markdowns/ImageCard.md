# ImageCard


Use `<ImageCard />` to present a card with an image on top, a title and
supporting content below.

```js
---
type: example
---
<ImageCard
  title="Card Title"
  src={placeholderImage(250, 250)}
  alt="A gray placeholder square"
>
  <Text color="secondary" variant="content">Content goes here.</Text>
</ImageCard>
```

### Breakpoints

Card has 3 visual designs based on its size, these are applied automatically

```js
---
type: example
---
<Flex direction="column" gap="medium">
  <div style={{ width: '15rem', maxWidth: '100%' }}>
    <ImageCard
      title="Small"
      src={placeholderImage(600, 340)}
      alt="A gray placeholder"
    >
      <Text color="secondary" variant="content">
        Narrower than the medium breakpoint.
      </Text>
    </ImageCard>
  </div>
  <div style={{ width: '30rem', maxWidth: '100%' }}>
    <ImageCard
      title="Medium"
      src={placeholderImage(600, 340)}
      alt="A gray placeholder"
    >
      <Text color="secondary" variant="content">
        Between the two breakpoints.
      </Text>
    </ImageCard>
  </div>
  <div style={{ width: '45rem', maxWidth: '100%' }}>
    <ImageCard
      title="Large"
      src={placeholderImage(600, 340)}
      alt="A gray placeholder"
    >
      <Text color="secondary" variant="content">
        Wider than the large breakpoint.
      </Text>
    </ImageCard>
  </div>
</Flex>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| ImageCard | children | `ReactNode` | No | - | The content to be rendered inside the Card |
| ImageCard | title | `string` | Yes | - | The title string of the card. Renders as InstUI's <Heading> |
| ImageCard | titleLevel | `HeadingLevel<'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'> \| 'reset'` | No | `'h3'` | Heading is rendered as h3 by default. Rewrite this if necessary. |
| ImageCard | src | `string` | Yes | - | The src string of the img. |
| ImageCard | alt | `string` | Yes | - | The alt string of the img. |

### Usage

Install the package:

```shell
npm install @instructure/ui-card
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { ImageCard } from '@instructure/ui-card/v11_7'
```

