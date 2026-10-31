# Text


A component for styling textual content

## Variant

Variant takes care of - almost - all use-cases when it comes to texts on pages. Their name reflects the places they meant to be used. It sets `size`, `weight`, `fontStyle` and `lineHeight`
We recommend using `variants` instead of the aforementioned props.

NOTE: when `variant` is set, `size`, `weight`, `fontStyle` and `lineHeight` props are ignored

```js
---
type: example
---
<div>
  <Text variant="descriptionPage"> descriptionPage </Text><br/>
  <Text variant="descriptionSection"> descriptionSection </Text><br/>
  <Text variant="content"> content </Text><br/>
  <Text variant="contentImportant"> contentImportant </Text><br/>
  <Text variant="contentQuote"> contentQuote </Text><br/>
  <Text variant="contentSmall"> contentSmall </Text><br/>
  <Text variant="legend"> legend </Text><br/>
</div>
```

### Text colors

```js
---
type: example
---
<div>
  <Text color="primary">I&#39;m primary text</Text><br/>
  <Text color="secondary">I&#39;m secondary text</Text><br/>
  <Text color="brand">I&#39;m brand text</Text><br />
  <Text color="success">I&#39;m success text</Text><br/>
  <Text color="warning">I&#39;m warning text</Text><br />
  <Text color="danger">I&#39;m danger text</Text><br />
  <Text color="ai-highlight">I&#39;m a highlighted text (by AI)</Text><br />
  <Text color="alert">I&#39;m alert text - DEPRECATED - DO NOT USE</Text>
</div>
```

### Font sizes

```js
---
type: example
---
<div>
  <Text size='descriptionPage'>descriptionPage</Text><br/>
  <Text size='descriptionSection'>descriptionSection</Text><br/>
  <Text size='content'>content</Text><br/>
  <Text size='contentSmall'>contentSmall</Text><br/>
  <Text size='legend'>legend</Text>
</div>
```

### Font weights

```js
---
type: example
---
<div>
  <Text weight="weightRegular">weightRegular</Text><br/>
  <Text weight="weightImportant">weightImportant</Text>
</div>
```

### Font styles

```js
---
type: example
---
<div>
  <Text fontStyle="italic">I&#39;m italic text</Text><br/>
  <Text>I&#39;m normal text</Text>
</div>
```

### Line heights

```js
---
type: example
---
<div>
  <br/><br/>
  <Text lineHeight="lineHeight100">
    <p>{lorem.paragraph()}</p>
  </Text>
  <Text lineHeight="lineHeight125">
    <p>{lorem.paragraph()}</p>
  </Text>
  <Text lineHeight="lineHeight150">
    <p>{lorem.paragraph()}</p>
  </Text>
</div>
```

### Text transform

```js
---
type: example
---
<div>
  <Text transform="capitalize">I&#39;m capitalized text</Text><br/>
  <Text transform="uppercase">I&#39;m uppercase text</Text><br/>
  <Text transform="lowercase">I&#39;M LOWERCASE TEXT</Text><br/>
</div>
```

### Letter-spacing

```js
---
type: example
---
<div>
  <Text letterSpacing="normal">I&#39;m normal text</Text><br/>
  <Text letterSpacing="condensed">I&#39;m condensed text</Text><br/>
  <Text letterSpacing="expanded" transform="uppercase">I&#39;m expanded uppercase text</Text><br/>
</div>
```

### Wrap

Use `wrap="break-word"` to force breaking in long strings that would otherwise
exceed the bounds of their containers.

```js
---
type: example
---
<div>
  <View as="div" maxWidth="300px" margin="none none small" debug>
    <Text>
      superlongstringsuperlongstringsuperlongstringsuperlongstringsuperlongstringsuperlongstringsuperlongstringsuperlongstringsuperlongstringsuperlongstring
    </Text>
  </View>
  <View as="div" maxWidth="300px" debug>
    <Text wrap="break-word">
      superlongstringsuperlongstringsuperlongstringsuperlongstringsuperlongstringsuperlongstringsuperlongstringsuperlongstringsuperlongstringsuperlongstring
    </Text>
  </View>
</div>
```

```js
---
type: example
---
<View background="primary-inverse" as="div">
    <Text color="primary-inverse">I&#39;m primary text</Text><br/>
    <Text color="secondary-inverse">I&#39;m secondary text</Text>
</View>
```

### Element styles

```js
---
type: example
---
<Text>
  <b>bold </b>
  <strong>strong </strong>
  <i>italic </i>
  <em>emphasis </em>
  <pre>preformatted</pre>
  <code>code</code>
  This<sup>is</sup> some<sub>text</sub>.
</Text>
```

### DEPRECATED legacy values

Multiple values from `size`, `weight` and `lineHeight` are deprecated, but still supported for backward compatibility reasons. Please only use the above listed, semantic values.

Deprecated `size` values:

- x-small
- small
- medium
- large
- x-large
- xx-large

Deprecated `weight` values:

- normal
- light
- bold

Deprecated `lineHeight` values:

- default
- fit
- condensed
- double


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Text | as | `keyof JSX.IntrinsicElements \| ComponentType<P>` | No | `'span'` | the element type to render as |
| Text | children | `React.ReactNode` | No | `null` |  |
| Text | color | `\| 'primary' \| 'secondary' \| 'brand' \| 'success' \| 'danger' \| 'alert' \| 'warning' \| 'primary-inverse' \| 'secondary-inverse' \| 'ai-highlight'` | No | - | Color of the text |
| Text | elementRef | `(element: Element \| null) => void` | No | - | Provides a reference to the underlying HTML element |
| Text | fontStyle | `'italic' \| 'normal'` | No | - |  |
| Text | letterSpacing | `'normal' \| 'condensed' \| 'expanded'` | No | `'normal'` |  |
| Text | lineHeight | `\| 'default' \| 'fit' \| 'condensed' \| 'double' \| 'lineHeight100' \| 'lineHeight125' \| 'lineHeight150'` | No | - |  |
| Text | size | `\| 'x-small' \| 'small' \| 'medium' \| 'large' \| 'x-large' \| 'xx-large' \| 'descriptionPage' \| 'descriptionSection' \| 'content' \| 'contentSmall' \| 'legend'` | No | `'medium'` |  |
| Text | transform | `'none' \| 'capitalize' \| 'uppercase' \| 'lowercase'` | No | - |  |
| Text | variant | `\| 'descriptionPage' \| 'descriptionSection' \| 'content' \| 'contentImportant' \| 'contentQuote' \| 'contentSmall' \| 'legend'` | No | - | Sets multiple props at once. (size, fontStyle, lineHeight, weight) If set, these props are not allowed. NOTE: this is the recommended way of setting these values |
| Text | weight | `'normal' \| 'light' \| 'bold' \| 'weightRegular' \| 'weightImportant'` | No | - |  |
| Text | wrap | `'normal' \| 'break-word'` | No | `'normal'` |  |

### Usage

Install the package:

```shell
npm install @instructure/ui-text
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Text } from '@instructure/ui-text'
```

