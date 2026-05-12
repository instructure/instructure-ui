# Expandable


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


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Expandable | expanded | `boolean` | No | - | Whether the content is expanded or hidden. Makes the component controlled, so if provided, the `onToggle` handler has to be provided too. |
| Expandable | defaultExpanded | `boolean` | No | `false` | Whether the content is initially expanded or hidden (uncontrolled) |
| Expandable | onToggle | `( event: React.KeyboardEvent<ViewProps> \| React.MouseEvent<ViewProps>, expanded: boolean ) => void` | No | - | Function invoked when this component is expanded/collapsed |
| Expandable | children | `(props: RenderProps) => JSX.Element` | No | - | Must be a function that returns a JSX element. It receives and object which contains whether its expanded and objects that need to be spread on the trigger and details elements. |
| Expandable | render | `(props: RenderProps) => JSX.Element` | No | - | Must be a function that returns a JSX element. It receives and object which contains whether its expanded and objects that need to be spread on the trigger and details elements. Identical to children |

### Usage

Install the package:

```shell
npm install @instructure/ui-expandable
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Expandable } from '@instructure/ui-expandable'
```

