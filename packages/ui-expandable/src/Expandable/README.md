---
describes: Expandable
---

`Expandable` handles the show/hide functionality for both [`ToggleDetails`](ToggleDetails)
and [`ToggleGroup`](ToggleGroup). `getToggleProps` and `getDetailsProps` are needed for the component to function properly, these add necessary ARIA tags and event listeners.

### Basic example

```javascript
---
type: example
---
<Expandable onToggle={(event, expanded) => console.log(event, expanded)}>
  {({ expanded, getToggleProps, getDetailsProps }) => {
    return (
      <div>
        <Button margin="small 0"
                {...getToggleProps()}
                display="block"
                textAlign="start"
        >
          I am expanded? {expanded.toString()}
        </Button>
        {expanded ? <div {...getDetailsProps()}>
          This is the content that will display under the Expandable
        </div> : null}
      </div>
    )
  }}
</Expandable>
```
