---
describes: ToggleGroup
---

Performs the same function as [`ToggleDetails`](#ToggleDetails), but with the summary separated from the
toggle button, and built in padding and borders around the summary and main content area.

### Basic example
```javascript
---
example: true
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
example: true
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
example: true
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
example: true
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
example: true
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
