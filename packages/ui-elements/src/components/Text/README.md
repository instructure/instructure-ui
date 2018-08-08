---
describes: Text
---

A component for styling text content

### Font sizes

```js
---
example: true
---
<div>
  <Text size="x-small">I&#39;m extra small</Text><br/>
  <Text size="small">I&#39;m small</Text><br/>
  <Text>I&#39;m medium</Text><br/>
  <Text size="large">I&#39;m large</Text><br/>
  <Text size="x-large">I&#39;m extra large</Text><br/>
  <Text size="xx-large">I&#39;m extra extra large</Text>
</div>
```

### Font weights

```js
---
example: true
---
<div>
  <Text weight="light">I&#39;m light text</Text><br/>
  <Text>I&#39;m normal text</Text><br/>
  <Text weight="bold">I&#39;m bold text</Text>
</div>
```

### Font styles

```js
---
example: true
---
<div>
  <Text fontStyle="italic">I&#39;m italic text</Text><br/>
  <Text>I&#39;m normal text</Text>
</div>
```

### Line heights

```js
---
example: true
---
<div>
  <Text lineHeight="fit">
    <p>{lorem.paragraph()}</p>
  </Text>
  <Text>
    <p>{lorem.paragraph()}</p>
  </Text>
  <Text lineHeight="condensed">
    <p>{lorem.paragraph()}</p>
  </Text>
  <Text lineHeight="double">
    <p>{lorem.paragraph()}</p>
  </Text>
</div>
```

### Text transform

```js
---
example: true
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
example: true
---
<div>
  <Text letterSpacing="normal">I&#39;m normal text</Text><br/>
  <Text letterSpacing="condensed">I&#39;m condensed text</Text><br/>
  <Text letterSpacing="expanded" transform="uppercase">I&#39;m expanded uppercase text</Text><br/>
</div>
```
### Text colors

```js
---
example: true
---
<div>
  <Text color="primary">I&#39;m primary text</Text><br/>
  <Text color="secondary">I&#39;m secondary text</Text><br/>
  <Text color="brand">I&#39;m brand text</Text><br />
  <Text color="success">I&#39;m success text</Text><br/>
  <Text color="warning">I&#39;m warning text</Text><br/>
  <Text color="error">I&#39;m error text</Text>
</div>
```

```js
---
example: true
background: 'checkerboard-inverse'
---
<div>
  <Text color="primary-inverse">I&#39;m primary text</Text><br/>
  <Text color="secondary-inverse">I&#39;m secondary text</Text>
</div>
```

### Element styles

```js
---
example: true
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
