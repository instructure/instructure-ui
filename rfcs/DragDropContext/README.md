---
category: Getting Started/RFCs
id: DragDropContextRFC
title: DragDropContext
---

## DragDropContext Component
It is likely that the terms "draggable" or "drag and drop" will be used to refer
to the `DragDropContext` components, particularly `DragSource`.


### Summary
This component effectively wraps the HOCs provided by `react-dnd` and provides
actual components with a simplified API for basic drag and drop functionality.


### Use Cases
This component only aims to provide basic drag and drop functionality. Most use
cases for it would likely involve further abstraction into some kind of draggable
layout component. A sortable grid of cards or a list of items that can be
reordered are two examples.


### Other Implementations
[react-dnd](https://github.com/react-dnd/react-dnd)
[react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)


### Functional Requirements and API
This component should not be concerned with maintaining the order or position of
its children. It only serves to communicate what is being dragged where. Any
sorting or ordering of children should be managed externally.

`DragDropContext` mostly provides a context for any draggable items that need to
interact with each other. Items in one context cannot be dragged or dropped into
other regions. Its callback methods provide details about the items being
manipulated.

`DragSource` is the actual draggable component. If it has a `DragHandle` component
as a child, only the handle can be used to pick up the target. The `children` prop
can be a function with an argument that provides drag state of the item, such as
`isDragging` and `canDrop`. This allows you to visually or otherwise update some
children based on drag state. The `DragSource` component could also set context
consumable by any children that want to know if they're being dragged.

`DropTarget` is the area that a `DragSource` is allowed to be dropped, or rather,
the component that can react to a dropped item. Draggable items don't necessarily
need to live within a `DropTarget`, but it is needed to communicate a successful
drop.


### Examples
```javascript

// single drop zone, multiple draggable items
<DragDropContext
  onDragStart={(start) => {}}
  onDragUpdate={(update) => {}}
  onDragEnd={(end) => {}}
>
  <div>
    <DropTarget>
      {(provided) => (
        <View as="div" padding="large">
          <span>{provided.isOver ? 'Let go!' : 'Drop items here!'}</span>
        </View>
      )}
    </DropTarget>
  </div>
  <div>
    {items.map((item) => (
      <DragSource>
        {(provided) => (
          <View
            padding="small"
            background="default"
            shadow={provided.isDragging ? 'above' : null}
          >
            <span>Drag Me!</span>
          </View>
        )}
      </DragSource>
    ))}
  </div>
</DragDropContext>

// multiple items draggable between drop zones
<DragDropContext
  onDragEnd={(end) => {
    if (end.result === 'DROP') {
      console.log(`Item of type ${end.type} dropped into valid group`)
    }
  }}
>
  <DropTarget>
    <View as="div" padding="large">
      {listA.map((item, index) => (
        <DragSource>
          <DragHandle>{handleIcon}</DragHandle>
          <div>{`Item ${index} from Group A`}</div>
        </DragSource>
      ))}
    </View>
  </DropTarget>
  <DropTarget>
    <View as="div" padding="large">
      {listB.map((item, index) => (
        <DragSource>
          <DragHandle>{handleIcon}</DragHandle>
          <div>{`Item ${index} from Group B`}</div>
        </DragSource>
      ))}
    </View>
  </DropTarget>
</DragDropContext>

// items only draggable into certain drop zones
<DragDropContext
  onDragEnd={(end) => {
    if (end.result === 'CANCEL') {
      console.log(`Item of type ${end.type} dropped outside a target`)
    } else if (end.result === 'INVALID') {
      console.log(`Item of type ${end.type} dropped into invalid group`)
    } else if (end.result === 'DROP') {
      console.log(`Item of type ${end.type} dropped into valid group`)
    }
  }}
>
  <DropTarget accepts="assignment">
    <div>Drop assignments here!</div>
  </DropTarget>
  <DropTarget accepts="student">
    <div>Drop students here!</div>
  </DropTarget>
  <View as="div" padding="large">
    <Heading level="h3">Assignments</h3>
    {assignments.map((assignment) => (
      <DragSource type="assignment">
        <div>{assignment.label}</div>
      </DragSource>
    ))}
  </View>
  <View as="div" padding="large">
    <Heading level="h3">Students</h3>
    {students.map((student) => (
      <DragSource type="student">
        <div>{student.label}</div>
      </DragSource>
    ))}
  </View>
</DragDropContext>

// nested draggables (sortable groups/lists)
// in this example, you can re-order the 2 groups and
// the items within are draggable between the groups
<DragDropContext>
  <DropTarget accepts="assignment_group">
    <DragSource type="assignment_group">
      <div>
        <DragHandle>{handleIcon}</DragHandle>
        <h3>Upcoming Assignments</h3>
        <div>
          <DropTarget accepts="assignment">
            {assignments1.map((assignment) => (
              <DragSource type="assignment">
                <div>{assignment.label}</div>
              </DragSource>
            ))}
          </DropTarget>
        </div>
      </div>
    </DragSource>
  </DropTarget>
  <DropTarget accepts="assignment_group">
    <DragSource type="assignment_group">
      <div>
        <DragHandle>{handleIcon}</DragHandle>
        <h3>Completed Assignments</h3>
        <div>
          <DropTarget accepts="assignment">
            {assignments2.map((assignment) => (
              <DragSource type="assignment">
                <div>{assignment.label}</div>
              </DragSource>
            ))}
          </DropTarget>
        </div>
      </div>
    </DragSource>
  </DropTarget>
</DragDropContext>
```

### DragDropContext Properties
| Prop     | Type     | Default  | Notes    |
|----------|----------|----------|----------|
| children | oneOf: function, element | | An element or function that returns an element. |
| onDragStart | function | (start) => {} | A callback that fires when an item starts being dragged. |
| onDragUpdate | function | (update) => {} | A callback that fires when item's position has changed. |
| onDragEnd | function | (end) => {} | A callback that fires when dragging has stopped. |

### DropTarget Properties
| Prop     | Type     | Default  | Notes    |
|----------|----------|----------|----------|
| accepts | string[] | | A string or array of strings denoting the compatible types of draggable items. Not setting an accepts prop would allow any target in the region to be dropped here. |
| children | oneOf: function, element | | An element or function that returns an element. |

### DragSource Properties
| Prop     | Type     | Default  | Notes    |
|----------|----------|----------|----------|
| type | string | 'any' | A string used to associate a `DragSource` with compatible `DropTargets`. Not setting a type would allow a target to be dropped in any group in the region. |
| children | oneOf: function, element | | An element or function that returns an element. |

### DragHandle Properties
| Prop     | Type     | Default  | Notes    |
|----------|----------|----------|----------|
| children | element | | An element to use as the draggable point of a DragSource |


### Dependencies
- react-dnd
- react-dnd-html5-backend
- react-dnd-touch-backend
- ui-utils


### Theme Variables
n/a


### Accessibility Requirements
n/a. a11y considerations will only be needed for any layers of abstraction on top
of `DragDropContext`, where elements may be focused or reordered.


### Internationalization Requirements
n/a. i18n considerations will also only be needed for components built off this one,
not `DragDropContext` itself. Providing internationalized assistive text to describe
dragging or sorting actions would be the primary consideration.


### Other Things to Consider
- We will certainly want to build other components on top of this one, such as a
sortable layout.
- Because this implementation utilizes `react-dnd` we are also reliant on its
backends. Unless we were to write our own backend, we'd be working around limitations
of the HTML5 drag and drop API. Most of which should be already managed by
`react-dnd` or mostly avoidable, but it's worth mentioning.
- One particular limitation of the HTML5 backend is that the drag preview is always
somewhat transparent. There is a work around for some (not all) use cases so this
limitation should be communicated to design.
- `react-dnd` also only allows *either* the HTML5 backend or the touch backend to be
used. If we need to support touch events, we will need to utilize a third-party
combined backend or provide our own logic to conditionally use the appropriate
backend.
- It may be difficult to use some components with `DragDropContext`, particularly
those that require specific children, such as a `List` that requires only
`ListItem`s as immediate children. However, we expect new components to be purpose
built for draggable use cases, so this likely won't be an issue.
