# TruncateList


`TruncateList` is a special kind of list component that can be configured to adapt to small screen widths by truncating its items that don’t fit within the available space. It is a utility component that can be used on its own, but its intended use is to handle the truncation logic of menu items in navigation bars.

### Visible items

The `onUpdate` function prop returns the number of visible items, and the `visibleItemsCount` prop controls how many items are currently visible.

It is a controlled component, so without and `onUpdate` prop it won't be responsive to changes. When `visibleItemsCount` is not set, the list is not truncated.

When the list is truncated, it is recommended to pass an element that lists the rest of the hidden items. The `renderHiddenItemMenu` prop accepts a function with the `hiddenChildren` as its parameter, and it should return a dropdown menu (e.g.: [Drilldown](/#Drilldown), [Menu](/#Menu)) or link, etc.

```js
---
type: example
---
class Example extends React.Component {
  state = { visibleItemsCount: undefined }

  render() {
    return (
      <View as="div" background="primary" padding="x-small">
        <TruncateList
          itemSpacing='0.25rem'
          visibleItemsCount={this.state.visibleItemsCount}
          onUpdate={({ visibleItemsCount }) => {
            this.setState({ visibleItemsCount })
          }}
          renderHiddenItemMenu={(hiddenChildren) => {
            return (
              <Drilldown
                rootPageId="root"
                trigger={(
                  <Button margin="0 0 0 small">
                    {hiddenChildren.length} More
                  </Button>
                )}
                width="15rem"
                maxHeight="10rem"
                placement='bottom'
              >
                <Drilldown.Page id="root">
                  {hiddenChildren.map((child, idx) => {
                    return (
                      <Drilldown.Option
                        key={`option-${idx}`}
                        id={`option-${idx}`}
                      >
                        {child}
                      </Drilldown.Option>
                    )
                  })}
                </Drilldown.Page>
              </Drilldown>
            )
          }}
        >
          {Array.from(Array(16)).map((item, idx) => {
            return (
              <View
                key={idx}
                padding="x-small"
              >
                Item {idx + 1}
              </View>
            )
          })}
        </TruncateList>
      </View>
    )
  }
}

render(<Example />)
```

### Layout settings

The `itemSpacing` prop adds spacing between the items. The width of the list item containing the menu trigger can be set to a fixed value with the `fixMenuTriggerWidth` prop.

```js
---
type: example
---
class Example extends React.Component {
  state = {
    visibleItemsCount: undefined,
    spacing: '0.5rem',
    menuTriggerWidth: 'none'
  }

  render() {
    return (
      <View as="div" padding="medium">
        <View display="block" margin="small none large">
          <FormFieldGroup
            description="Settings"
            rowSpacing="small"
            layout='columns'
          >
            <RadioInputGroup
              name="spacing"
              description="Spacing"
              value={this.state.spacing}
              onChange={(event, value) => {
                this.setState({ spacing: value })
              }}>
                {[
                  '0',
                  '0.5rem',
                  '1em',
                  '48px'
                ].map((spacingValue) => (
                  <RadioInput
                    key={spacingValue}
                    label={spacingValue}
                    value={spacingValue}
                  />
                ))}
            </RadioInputGroup>

            <RadioInputGroup
              name="menuTriggerWidth"
              description="Fix menu trigger width"
              value={this.state.menuTriggerWidth}
              onChange={(event, value) => {
                this.setState({ menuTriggerWidth: value })
              }}>
                {[
                  'none',
                  '10rem',
                  '8em',
                  '240px'
                ].map((menuTriggerWidthValue) => (
                  <RadioInput
                    key={menuTriggerWidthValue}
                    label={menuTriggerWidthValue}
                    value={menuTriggerWidthValue}
                  />
                ))}
            </RadioInputGroup>
          </FormFieldGroup>
        </View>

        <View as="div" background="primary" padding="x-small">
          <TruncateList
            itemSpacing={this.state.spacing}
            fixMenuTriggerWidth={this.state.menuTriggerWidth === 'none'
              ? undefined
              : this.state.menuTriggerWidth
            }
            visibleItemsCount={this.state.visibleItemsCount}
            onUpdate={({ visibleItemsCount }) => {
              this.setState({ visibleItemsCount })
            }}
            renderHiddenItemMenu={(hiddenChildren) => {
              return (
                <Drilldown
                  rootPageId="root"
                  trigger={(
                    <Button display="block">
                      {hiddenChildren.length} More
                    </Button>
                  )}
                  positionContainerDisplay="block"
                  width="15rem"
                  maxHeight="10rem"
                  placement='bottom'
                >
                  <Drilldown.Page id="root">
                    {hiddenChildren.map((child, idx) => {
                      return (
                        <Drilldown.Option
                          key={`option-${idx}`}
                          id={`option-${idx}`}
                        >
                          {child}
                        </Drilldown.Option>
                      )
                    })}
                  </Drilldown.Page>
                </Drilldown>
              )
            }}
          >
            {Array.from(Array(16)).map((item, idx) => {
              return <div key={idx}>Item {idx + 1}</div>
            })}
          </TruncateList>
        </View>
      </View>
    )
  }
}

render(<Example />)
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| TruncateList | children | `React.ReactNode` | No | - | List of items in the truncated list |
| TruncateList | visibleItemsCount | `number` | No | - | Sets the number of navigation items that are visible. If not set, the list is not truncated. |
| TruncateList | renderHiddenItemMenu | `( hiddenChildren: Exclude<React.ReactNode, boolean \| null \| undefined>[] ) => React.ReactElement` | No | - | When there are list items hidden, an optional element (dropdown menu, link, etc.) can be provided to display them (renders at the end of the list). |
| TruncateList | onUpdate | `(visibleItemsCount: { visibleItemsCount: number }) => void` | No | - | Called whenever the navigation items are updated or the size of the navigation changes. Passes in the `visibleItemsCount` as a parameter. |
| TruncateList | itemSpacing | `string` | No | `'0'` | The spacing between list items (in 'rem', 'em' or 'px') |
| TruncateList | fixMenuTriggerWidth | `string` | No | - | Fix width of the Menu trigger (in 'rem', 'em' or 'px') |
| TruncateList | debounce | `number` | No | `300` | The rate (in ms) the component responds to container resizing or an update to one of its child items |
| TruncateList | elementRef | `(element: HTMLUListElement \| null) => void` | No | - | Provides a reference to the underlying ul element |

### Usage

Install the package:

```shell
npm install @instructure/ui-truncate-list
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { TruncateList } from '@instructure/ui-truncate-list'
```

