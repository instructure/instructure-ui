---
describes: Text
---

A component for styling textual content

## Variant

Variant takes care of - almost - all use-cases when it comes to texts on pages. Their name reflects the places they meant to be used. It sets `font family`, `size`, `weight` and `lineHeight`.

> We recommend using `variant` instead of setting values directly.

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
  <Text color="ai-highlight">I&#39;m an ai-highlight text</Text><br />
  <View background="primary-inverse">
    <Text color="primary-inverse">I&#39;m primary-inverse text</Text><br />
    <Text color="secondary-inverse">I&#39;m secondary-inverse text</Text><br />
  </View>
</div>
```

### Font sizes

```js
---
type: example
---
<div>
  <Text size='x-small'>x-small</Text><br/>
  <Text size='small'>small</Text><br/>
  <Text size='medium'>medium</Text><br/>
  <Text size='large'>large</Text><br/>
  <Text size='x-large'>x-large</Text><br/>
  <Text size='xx-large'>xx-large</Text>
</div>
```

### Font weights

```js
---
type: example
---
<div>
  <Text weight="light">light text</Text><br/>
  <Text weight="normal">normal text</Text><br/>
  <Text weight="bold">bold text</Text>
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
  <Text lineHeight="default">
    <p><b>default:</b> {lorem.paragraph()}</p>
  </Text>
  <Text lineHeight="fit">
    <p><b>fit:</b> {lorem.paragraph()}</p>
  </Text>
  <Text lineHeight="condensed">
    <p><b>condensed:</b> {lorem.paragraph()}</p>
  </Text>
  <Text lineHeight="double">
    <p><b>double:</b> {lorem.paragraph()}</p>
  </Text>
</div>
```

### Text transformations

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

### Element styles

You can use simple HTML tags to style your text.

```js
---
type: example
---
<Text>
  <b>bold </b>
  <strong>strong </strong>
  <i>italic </i>
  <em>emphasis </em>
  <pre>preformatted </pre>
  <code>code </code><br/>
  This <sup>sup</sup> normal <sub>sub </sub> text.
</Text>
```

### DEPRECATED legacy values

Multiple values from `size`, `weight` and `lineHeight` are deprecated, but still supported for backward compatibility reasons. Please only use the above listed, semantic values.

Deprecated `size` values:

`descriptionPage`, `descriptionSection`, `content`, `contentSmall`, `legend`

Deprecated `weight` values:

`weightRegular`, `weightImportant`

Deprecated `lineHeight` values:

`lineHeight100`, `lineHeight125`, `lineHeight150`
