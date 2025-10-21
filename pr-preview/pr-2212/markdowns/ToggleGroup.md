# ToggleGroup


Performs the same function as [`ToggleDetails`](ToggleDetails), but with the summary separated from the
toggle button, and built in padding and borders around the summary and main content area.

### Basic example

```javascript
---
type: example
---
<ToggleGroup
  toggleLabel="This is the toggle button label for screenreaders"
  summary="This is the summary"
  background="default"
>
  <View display="block" padding="small">Here is the expanded content</View>
</ToggleGroup>
```

### More detailed examples

#### `defaultExpanded` to make the component `expanded` when it renders

```javascript
---
type: example
---
<ToggleGroup
  toggleLabel="This is the toggle button label for screenreaders"
  summary="This is the summary"
  defaultExpanded
>
  <View display="block" padding="small">This content is expanded when the component renders</View>
</ToggleGroup>
```

#### Passing in your own `icon` and `iconExpanded`

```javascript
---
type: example
---
<ToggleGroup
  toggleLabel="This is the toggle button label for screenreaders"
  summary="This is the summary"
  iconExpanded={IconXSolid}
  icon={IconPlusSolid}
>
  <View display="block" padding="small">Here is the expanded content</View>
</ToggleGroup>
```

#### Disable default transition of details

```javascript
---
type: example
---
<ToggleGroup
  transition={false}
  toggleLabel="This is the toggle button label for screenreaders"
  summary="This is the summary"
>
  <View display="block" padding="small">This content will not fade in</View>
</ToggleGroup>
```

#### Disable default border if you want to nest ToggleGroups

```javascript
---
type: example
---
<ToggleGroup
  defaultExpanded
  toggleLabel="This is the toggle button label for screenreaders"
  summary={<Heading level="h3">Parent ToggleGroup</Heading>}
>
  <ToggleGroup
    size="small"
    toggleLabel="This is the toggle button label for screenreaders"
    summary="I am nested inside a parent ToggleGroup"
    border={false}
  >
    <View display="block" padding="small">
      This is the details section of the nested ToggleGroup
    </View>
  </ToggleGroup>
</ToggleGroup>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| ToggleGroup | children | `React.ReactNode` | Yes | - | the content to show and hide |
| ToggleGroup | summary | `React.ReactNode` | Yes | - | the content area next to the toggle button |
| ToggleGroup | toggleLabel | `React.ReactNode \| ((expanded: boolean) => React.ReactNode)` | Yes | - | provides a screenreader label for the toggle button (takes `expanded` as an argument if a function) |
| ToggleGroup | as | `keyof JSX.IntrinsicElements \| ComponentType<P>` | No | `'span'` | the element type to render as |
| ToggleGroup | elementRef | `(element: Element \| null) => void` | No | - | provides a reference to the underlying html root element |
| ToggleGroup | size | `'small' \| 'medium' \| 'large'` | No | `'medium'` |  |
| ToggleGroup | expanded | `boolean` | No | - | Whether the content is expanded or hidden |
| ToggleGroup | defaultExpanded | `boolean` | No | `false` | Whether the content is initially expanded or hidden (uncontrolled) |
| ToggleGroup | onToggle | `(event: React.MouseEvent, expanded: boolean) => void` | No | - | Fired when the content display is toggled |
| ToggleGroup | icon | `\| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | `IconArrowOpenEndSolid` | The icon displayed in the toggle button when the content is hidden |
| ToggleGroup | iconExpanded | `\| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | `IconArrowOpenDownSolid` | The icon displayed in the toggle button when the content is showing |
| ToggleGroup | transition | `boolean` | No | `true` | Transition content into view |
| ToggleGroup | border | `boolean` | No | `true` | Toggle the border around the component |

### Usage

Install the package:

```shell
npm install @instructure/ui-toggle-details
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { ToggleGroup } from '@instructure/ui-toggle-details'
```

