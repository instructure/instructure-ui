---
describes: DeprecatedAccessibleContent
id: DeprecatedAccessibleContent__README
---

**DEPRECATED:** AccessibleContent will be removed from `ui-a11y` in version 7.0.0. Use the [AccessibleContent from ui-a11y-content](#AccessibleContent) instead.

### Important Upgrade Notes
Codemods are available to automatically update imports to the new package.

***

An AccessibleContent component

Note the caveats on hiding content from screen readers.
(see [PresentationContent](#PresentationContent))

```js
---
example: true
---
<DeprecatedAccessibleContent alt="Alternative text for a screenreader only">
  <Text>
    Presentational content goes here
  </Text>
</DeprecatedAccessibleContent>
```
