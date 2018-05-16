---
describes: ApplyTextDirection
---

A utility component used to manage text direction. In addition to appending the `dir` attribute to
its underlying DOM node, `<ApplyTextDirection />` also creates a direction context which can be
consumed by child components that have implemented [bidirectional](#bidirectional).

If no `dir` prop is supplied, `<ApplyTextDirection />` will fallback to its parent context if it 
exists. Otherwise it queries for and uses the documentElement `dir` attribute and defaults to `ltr`
if it is not found.

```javascript
---
example: true
---
<ApplyTextDirection dir="rtl">
  <View
    display="block"
    background="default"
    padding="large"
    borderWidth="none none none large"
  >
    <Heading>Rtl Content</Heading>
    {lorem.paragraph()}
  </View>
</ApplyTextDirection>
```

For exceptions, `<ApplyTextDirection />` can be nested and override parent context.

```javascript
---
example: true
---
<ApplyTextDirection dir="rtl">
  <View
    display="block"
    background="default"
    padding="large"
    borderWidth="none none none large"
  >
    <Heading>Rtl Content</Heading>
    {lorem.paragraph()}
  </View>
  <ApplyTextDirection dir="ltr">
    <View
      display="block"
      background="default"
      padding="large"
      borderWidth="none none none large"
    >
      <Heading>Ltr Content</Heading>
      {lorem.paragraph()}
    </View>
  </ApplyTextDirection>
</ApplyTextDirection>
```
