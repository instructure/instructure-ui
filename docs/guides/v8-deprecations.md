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

- [Deprecated Utilities](#v8-deprecations/#deprecated-utilites)

### Deprecated Utilities

| Utility                                 | Substitute                                                                                                |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [addResizeListener](#addResizeListener) | Use tha native [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) utility. |
