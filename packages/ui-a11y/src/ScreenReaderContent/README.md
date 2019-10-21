---
describes: DeprecatedScreenReaderContent
id: DeprecatedScreenReaderContent__README
---

**DEPRECATED:** ScreenReaderContent will be removed from `ui-a11y` in version 7.0.0. Use the [ScreenReaderContent](#ScreenReaderContent) from [ui-a11y-content](#ui-a11y-content) instead.

### Important upgrade notes
Codemods are available to automatically update imports to the new package.

***

The ScreenReaderContent component renders content that is accessible to
screen readers, but is not visible.

```js
---
example: true
---
<DeprecatedScreenReaderContent>
  This content is not visible.
</DeprecatedScreenReaderContent>
```
