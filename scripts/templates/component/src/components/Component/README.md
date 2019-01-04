---
describes: ${COMPONENT}
---

A `${COMPONENT}` component [WIP]

```javascript
---
example: true
render: false
---
const Example = (props) => {
  return (
    <${COMPONENT}>
    {({ getViewProps }) => {
      return (
        <${COMPONENT}View
          {...getViewProps(/* view prop overrides go here */)}
        >
          {this.props.children}
        </${COMPONENT}View>
      )
    }}
    </${COMPONENT}>
  )
}
render(Example)
```
