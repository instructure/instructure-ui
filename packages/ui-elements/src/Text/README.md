---
describes: DeprecatedText
id: DeprecatedText__README
---

**DEPRECATED:** Text will be removed from `ui-elements` in version 7.0.0. Use [Text](#Text) from [ui-text](#ui-text) instead. Codemods are available to automatically update imports to the new package.
***

A component for styling textual content

### Font sizes

```js
---
example: true
---
<div>
  <DeprecatedText size="x-small">I&#39;m extra small</DeprecatedText><br/>
  <DeprecatedText size="small">I&#39;m small</DeprecatedText><br/>
  <DeprecatedText>I&#39;m medium</DeprecatedText><br/>
  <DeprecatedText size="large">I&#39;m large</DeprecatedText><br/>
  <DeprecatedText size="x-large">I&#39;m extra large</DeprecatedText><br/>
  <DeprecatedText size="xx-large">I&#39;m extra extra large</DeprecatedText>
</div>
```

### Font weights

```js
---
example: true
---
<div>
  <DeprecatedText weight="light">I&#39;m light text</DeprecatedText><br/>
  <DeprecatedText>I&#39;m normal text</DeprecatedText><br/>
  <DeprecatedText weight="bold">I&#39;m bold text</DeprecatedText>
</div>
```

### Font styles

```js
---
example: true
---
<div>
  <DeprecatedText fontStyle="italic">I&#39;m italic text</DeprecatedText><br/>
  <DeprecatedText>I&#39;m normal text</DeprecatedText>
</div>
```

### Line heights

```js
---
example: true
---
<div>
  <DeprecatedText lineHeight="fit">
    <p>{lorem.paragraph()}</p>
  </DeprecatedText>
  <DeprecatedText>
    <p>{lorem.paragraph()}</p>
  </DeprecatedText>
  <DeprecatedText lineHeight="condensed">
    <p>{lorem.paragraph()}</p>
  </DeprecatedText>
  <DeprecatedText lineHeight="double">
    <p>{lorem.paragraph()}</p>
  </DeprecatedText>
</div>
```

### Text transform

```js
---
example: true
---
<div>
  <DeprecatedText transform="capitalize">I&#39;m capitalized text</DeprecatedText><br/>
  <DeprecatedText transform="uppercase">I&#39;m uppercase text</DeprecatedText><br/>
  <DeprecatedText transform="lowercase">I&#39;M LOWERCASE TEXT</DeprecatedText><br/>
</div>
```

### Letter-spacing

```js
---
example: true
---
<div>
  <DeprecatedText letterSpacing="normal">I&#39;m normal text</DeprecatedText><br/>
  <DeprecatedText letterSpacing="condensed">I&#39;m condensed text</DeprecatedText><br/>
  <DeprecatedText letterSpacing="expanded" transform="uppercase">I&#39;m expanded uppercase text</DeprecatedText><br/>
</div>
```

### Wrap

Use `wrap="break-word"` to force breaking in long strings that would otherwise
exceed the bounds of their containers.

```js
---
example: true
---
<div>
  <View as="div" maxWidth="300px" margin="none none small" withVisualDebug>
    <DeprecatedText>
      superlongstringsuperlongstringsuperlongstringsuperlongstringsuperlongstringsuperlongstringsuperlongstringsuperlongstringsuperlongstringsuperlongstring
    </DeprecatedText>
  </View>
  <View as="div" maxWidth="300px" withVisualDebug>
    <DeprecatedText wrap="break-word">
      superlongstringsuperlongstringsuperlongstringsuperlongstringsuperlongstringsuperlongstringsuperlongstringsuperlongstringsuperlongstringsuperlongstring
    </DeprecatedText>
  </View>
</div>
```

### Text colors

```js
---
example: true
---
<div>
  <DeprecatedText color="primary">I&#39;m primary text</DeprecatedText><br/>
  <DeprecatedText color="secondary">I&#39;m secondary text</DeprecatedText><br/>
  <DeprecatedText color="brand">I&#39;m brand text</DeprecatedText><br />
  <DeprecatedText color="success">I&#39;m success text</DeprecatedText><br/>
  <DeprecatedText color="warning">I&#39;m warning text</DeprecatedText><br/>
  <DeprecatedText color="error">I&#39;m error text</DeprecatedText><br />
  <DeprecatedText color="alert">I&#39;m alert text</DeprecatedText>
</div>
```

```js
---
example: true
background: 'checkerboard-inverse'
---
<div>
  <DeprecatedText color="primary-inverse">I&#39;m primary text</DeprecatedText><br/>
  <DeprecatedText color="secondary-inverse">I&#39;m secondary text</DeprecatedText>
</div>
```

### Element styles

```js
---
example: true
---
<DeprecatedText>
  <b>bold </b>
  <strong>strong </strong>
  <i>italic </i>
  <em>emphasis </em>
  <pre>preformatted</pre>
  <code>code</code>
  This<sup>is</sup> some<sub>text</sub>.
</DeprecatedText>
```
