---
describes: GlobalNav
---

The main navigation of an app. Work in progress: the API will change, don't use it in production yet.

The app passes the content as data: `items`, `logo` and `account`.

`GlobalNav` is controlled: the app passes `collapsed` and `openSubNav`, and updates them in `onCollapse` and `onSubNavChange`.

```js
---
type: example
---
const Example = () => {
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <GlobalNav
      label="Main navigation"
      collapsed={collapsed}
      onCollapse={(_e, isCollapsed) => setCollapsed(isCollapsed)}
      collapseLabel="Collapse navigation"
      expandLabel="Expand navigation"
      backLabel="Back"
      closeSubNavLabel="Close sub navigation"
      items={[]}
    />
  )
}

render(<Example />)
```
