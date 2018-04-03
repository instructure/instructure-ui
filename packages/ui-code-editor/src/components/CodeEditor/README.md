---
describes: CodeEditor
---

The CodeEditor component can be used to display code.

```js
---
example: true
---
<CodeEditor
  label='code editor'
  defaultValue={`function findSequence(goal) {
  function find(start, history) {
    if (start == goal)
      return history;
    else if (start > goal)
      return null;
    else
      return find(start + 5, "(" + history + " + 5)") ||
             find(start * 3, "(" + history + " * 3)");
  }
  return find(1, "1");
}`}
  language='javascript'
  options={{ lineNumbers: false }}
/>
```
