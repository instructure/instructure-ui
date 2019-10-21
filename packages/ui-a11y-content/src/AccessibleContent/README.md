---
describes: AccessibleContent
---

AccessibleContent provides a textual alternative to the presentational content it is wrapping. It utilizes the `alt` prop that is very similar in concept to the 'alt' attribute of an HTML <img> tag.

The content should be descriptive enough that a screen reader user gets the gist purely through text. Note the caveats on hiding content from screen readers. (see [PresentationContent](#PresentationContent))

```js
---
example: true
---
<AccessibleContent alt="Alternative text for a screen reader only">
  <Text>
    Presentational content goes here
  </Text>
</AccessibleContent>
```
