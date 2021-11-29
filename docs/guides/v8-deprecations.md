---
title: Deprecated Utilites, Properties and Components in Version 8.0
category: Guides
order: 2
---

# Deprecated Utilites, Properties and Components in Version 8.0

```javascript
---
embed: true
---
<ToggleBlockquote
  summary="Important"
>
  <ToggleBlockquote.Paragraph>
    The following utilities, properties and components are deprecated in v8, and <strong>will be permanently deleted in v9.0.</strong>
  </ToggleBlockquote.Paragraph>
</ToggleBlockquote>
```

The tables below show what will be removed and what are they replaced with. We also marked if there are [codemods](#ui-codemods) available.

- [Deprecated Utilites, Properties and Components in Version 8.0](#deprecated-utilites-properties-and-components-in-version-80)
  - [Deprecated Utilities](#deprecated-utilities)

### Deprecated Utilities

| Utility                                 | Substitute                                                                                                                                          |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| [addResizeListener](#addResizeListener) | Use the native [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) utility. Example usage: [here](#addResizeListener) |
| [Navigation](#Navigation)               | This component has been deprecated from version 8.                                                                                                  |
