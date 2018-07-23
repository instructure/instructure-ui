---
category: Getting Started/RFCs
id: SortableListRFC
title: SortableList
---


## SortableList Component
This component could also be considered a draggable list.


### Summary
This is an abstraction of the `DragDropContext` components that allows the
reordering of list items through drag and drop actions.



### Use Cases
There are a variety of places in Canvas where draggable lists or grids are used.


### Other Implementations
[react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)
[react-sortable-hoc](https://github.com/clauderic/react-sortable-hoc)


### Functional Requirements and API
SortableList will be built off our DragDropContext component and provide more
specific draggable functionality in the form of sortable lists. Specifically, it
will handle the logic involved in rearranging items during and after drag actions.
Some of it's API is based heavily on `react-beautiful-dnd` concepts.

A `SortableList` needs to allow it's children to be reordered via dragging or
keyboard controls. We should account for the use case where multiple lists will
exist on the same page and need to share draggable children with each other.

This component should leave much of the styling and state management to the
consuming app or component, but provide information as to which items are being
dragged and to where.


### Examples
```javascript

// simple sortable list
<SortableList>
  {() => (
    <ul>
      {items.map((item) => (
        <SortableItem>
          {() => (
            <li>{item.label}</li>
          )}
        </SortableItem>
      ))}
    </ul>
  )}
</SortableList>

// sortable lists using snapshot argument
<SortableList>
  {(snapshot) => (
    <div className={snapshot.isDraggingOver ? styles.isDraggingOver : null}>
      {group1.map((item) => (
        <SortableItem>
          {(snapshot) => (
            <div className={snapshot.isDragging ? styles.isDragging : null}>
              {item.label}
            </div>
          )}
        </SortableItem>
      ))}
    </div>
  )}
</SortableList>

// nested sortable lists
// this creates multiple draggable ToggleDetails, each with its own sortable list of assignments
// each assignment can be dropped into lists in other ToggleDetails
<SortableList accepts="course">
  <SortableItem type="course">
    {() => (
      <ToggleDetails summary={`Group 1`}>
        <SortableList accepts="assignment">
          {group1.map((item) => (
            <SortableItem type="assignment">
              {() => (
                <div>{item.label}</div>
              )}
            </SortableItem>
          ))}
        </SortableList>
      </ToggleDetails>
    )}
  </SortableItem>
  <SortableItem type="course">
    {() => (
      <ToggleDetails summary={`Group 2`}>
        <SortableList accepts="assignment">
          {group2.map((item) => (
            <SortableItem type="assignment">
              {() => (
                <div>{item.label}</div>
              )}
            </SortableItem>
          ))}
        </SortableList>
      </ToggleDetails>
    )}
  </SortableItem>
</SortableList>

// accessible sortable list
<SortableList
  assistiveText="This is a moveable item. To start moving this item, press space"
  onMoveStart={(start, provided) => {
    provided.announce(`You are moving an item at position ${start.source.index + 1}. Use arrow keys to move`)
  }}
  onMoveUpdate={(update, provided) => {
    provided.announce(`Item is now at position ${update.destination.index + 1}`)
  }}
  onMoveEnd={(end, provided) => {
    if (end.result === 'SORT') {
      provided.announce(`Item has been moved to position ${end.destination.index + 1}`)
    } else {
      provided.announce('Action cancelled. No items have been moved')
    }
  }}
>
  {items.map((item) => (
    <SortableItem>
      {() => (
        <div>{item.label}</div>
      )}
    </SortableItem>
  ))}
</SortableList>

```


### SortableList Properties
| Prop     | Type     | Default  | Notes    |
|----------|----------|----------|----------|
| children | oneOf: function, element | | An element or function that returns an element. |
| accepts | string[] | | A string or array of strings denoting the compatible types of draggable items. Not setting an accepts prop would allow any item to be dropped here. |
| assistiveText | string | | A string for screen readers to announce when an item is focused. |
| onMoveStart | function | (start, provided) => {} | A callback that fires when an item starts being dragged. |
| onMoveUpdate | function | (update, provided) => {} | A callback that fires when item's position has changed. |
| onMoveEnd | function | (end, provided) => {} | A callback that fires when dragging has stopped. |

### SortableItem Properties
| Prop     | Type     | Default  | Notes    |
|----------|----------|----------|----------|
| children | oneOf: function, element | | An element or function that returns an element. |
| draggable | boolean | true | Whether or not dragging should be enabled on the item. |
| type | string | 'any' | A string used to associate a `SortableItem` with compatible `SortableList`s. |


### Dependencies
- DragDropContext


### Theme Variables
TBD


### Accessibility Requirements
Lists should be sortable via the keyboard and we should provide assistive text for
screen readers. Assistive text should be used to explain how to interact with items
and to update the user on the current location/order of the items whenever a change
occurs. Sortable items will need a visual hover state as well as a dragging state.
We will probably want these state to be indicated in different ways. Items will
also need to receive its own focus and pass focus to actionable children.
`react-beautiful-dnd` has a pretty good KO experience that we can take cues from.


### Internationalization Requirements
We need to allow for the internationalization of the assistive text announcements.


### Other Things to Consider
- There's a chance we'll have to include a wrapper component `SortableContext` to
allow dragging between multiple lists. This would be to ensure the `react-dnd`
`DragDropContext` component exists on the page but is not duplicated or nested.
If we need to do this, we may also consider moving the onMove callbacks to that
as well. It's also possible we may find it difficult to track drag actions between
lists without a common parent.
- We should confirm drag/focus state styles with design so we can be sure we'll be
able to support them.
- Do we want to account for removal/deletion of items in this component as well?
- Design may want to smoothly animate items while they are being re-ordered, so
we'll need to discuss how we may best accomplish that if needed (ui-motion?)
