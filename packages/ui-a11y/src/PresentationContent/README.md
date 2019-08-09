---
describes: DeprecatedPresentationContent
id: DeprecatedPresentationContent__README
---

**DEPRECATED:** PresentationContent will be removed from `ui-a11y` in version 7.0.0. Use the [PresentationContent from ui-a11y-content](#PresentationContent) instead.

### Important Upgrade Notes
Codemods are available to automatically update imports to the new package.

***

A component that *tries* to hide itself from screen readers, absolutely
expecting that you're providing a more accessible version of the resource
using something like a ScreenReaderContent component.

Be warned that this does not totally prevent all screen readers from
seeing this content in all modes. For example, VoiceOver in OS X will
still see this element when running in the "Say-All" mode and read it
along with the accessible version you're providing.

Use of this component is discouraged unless there's no alternative
(e.g. for data visualizations)

```js
---
example: true
---
<DeprecatedPresentationContent>
  <Text>
    Presentational content here
  </Text>
</DeprecatedPresentationContent>
```
