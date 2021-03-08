---
title: Focus Management
category: Guides
order: 4
---

## The Focus Management Problem

### Focus management and dialogs

One of the most challenging front end problems is focus management, especially when dialogs are involved. Keyboards and assistive technologies have [specific requirements](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) to "trap" focus within modals, trays, and other UI areas that overlay the page when they have focusable content. Some of these requirements include:

**For keyboard only users**

- When triggered via keyboard, focus should move from the triggering element to the first focusable element within the dialog
- As the user tabs through focusable elements within the dialog, when they tab from the last focusable element they should be wrapped around to focus once again on the first focusable element
- When the user presses the escape key or otherwise closes the modal, focus should be returned to the triggering element

**For screen reader users**

- All content outside the overlaying content should be hidden from screen readers

**Mouse and mobile users**

- When a user clicks or touches outside of the dialog area, the dialog should close

### Dialogs that launch dialogs

Meeting all of these requirements is difficult. To make things more complex, a dialog may launch another dialog. For example, a button contained within a `Tray` may launch a `Modal`. Coordinating focus between multiple dialogs in situations like these was the source of much confusion and developer resources.

## Focus Management in Instructure UI

### The Dialog component

[Dialog](#Dialog) is a utility component that helps us to cover all the requirements we discussed in the previous section. `Dialog` doesn't actually render any styles so it is more of a utility component. It is being used under the hood in [Modal](#Modal), [Tray](#Tray), [Popover](#Popover), and more. Let's discuss exactly what `Dialog` is doing in the following `Modal` example.

```js
---
render: false
example: true
---

const Example = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        Open modal
      </Button>
      <Modal
        open={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
        size="medium"
        label="Modal Dialog: Hello World"
        shouldCloseOnDocumentClick
      >
        <Modal.Header>
          <Heading>Hello from the modal</Heading>
        </Modal.Header>
        <Modal.Body>
          <Flex>
            <Flex.Item margin="none x-small none none" shouldGrow><TextInput renderLabel="Foo" /></Flex.Item>
            <Flex.Item margin="none none none x-small" shouldGrow><TextInput renderLabel="Bar" /></Flex.Item>
          </Flex>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary-inverse" margin="none x-small none none" onClick={() => setIsModalOpen(false)}>Close</Button>
          <Button color="primary" type="submit" onClick={() => setIsModalOpen(false)}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

render(<Example />)
```

Observe that when the modal is opened, the focus moves from the triggering button to the first focusable element within the modal. You can also observe that as you press the tab key on the last focusable element, the focus is moved back to the first focusable element. If you use a screen reader to open the modal, you can only navigate to elements within the modal while it is open. All other elements on the page are hidden. Lastly, you can close the Modal by pressing the escape key, or by clicking outside of the content.

All of these things are being handled internally by the `Dialog` component. For most consumers, this is as low level as you need to go. `Modal`, `Tray` and `Popover` already ship with `Dialog` built in under the hood. For more custom use cases, you can utilize the `Dialog` component directly and it will integrate seamlessly with the components already listed.

### But how does Dialog work?

If you're still reading, you are either extremely curious or performing maintenance on Instructure UI itself. As mentioned above, `Dialog` is meant to abstract away these implementation details (and it provides a clean API for doing so). If you have encountered a bug relating to our focus management, however, you may need to gain an understanding of what's happening the next level down. What follows is meant to give you enough information so that you know where to look in the code to track down erroneous behavior.

At first glance the complex inner workings of `Dialog` might seem overkill. To help us in this discussion, let's go through another example.

```js
---
render: false
example: true
---

const Example = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        Open modal
      </Button>
      <Modal
        open={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
        size="medium"
        label="Modal Dialog: Hello World"
        shouldCloseOnDocumentClick
      >
        <Modal.Header>
          <Heading>Hello from the modal</Heading>
        </Modal.Header>
        <Modal.Body>
          <View
            display="block"
            padding="small none"
          >
            Click on the following trigger to expand the popover.
          </View>
          <Popover
            renderTrigger={<Button>Expand me</Button>}
            isShowingContent={isPopoverOpen}
            onShowContent={() => setIsPopoverOpen(true)}
            onHideContent={() => setIsPopoverOpen(false)}
            on="click"
            screenReaderLabel="Popover Dialog Example"
            shouldContainFocus
            shouldReturnFocus
            shouldCloseOnDocumentClick
          >
            <View padding="medium" display="block" as="form">
              <FormFieldGroup description="Do something">
                <TextInput renderLabel="Foo" />
                <TextInput renderLabel="Bar" />
              </FormFieldGroup>
            </View>
          </Popover>
        </Modal.Body>
        <Modal.Footer>
          <Button
            margin="none x-small none none"
            color="primary-inverse"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </Button>
          <Button
            color="primary"
            type="submit"
            onClick={() => setIsModalOpen(false)}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

render(<Example />)
```

We've modified our first example so that it's a little more complex. Now we need to launch a `Popover` within our open `Modal`. The `Popover` has focusable content so we will need to trap focus as we outlined before. Think about what needs to happen in this situation:

- The code that is scoping the focus on tab press to focusable elements within the open `Modal` needs to be disabled
- The listeners that are attached to close the `Modal` on escape or a click/touch event outside the `Modal` need to be deactivated (otherwise pressing escape to close the `Popover` would close the `Modal` as well)
- We now focus the first focusable element in the `Popover` and scope the focus on tab press to focusable elements within the `Popover`
- We need to adjust what is now hidden in the DOM so that everything outside of the `Popover` is hidden from screen readers (this includes the open `Modal`)
- We need to attach new event listeners to the `Popover` to detect the escape and click/touch events outside of the `Popover` content
- When `Popover` is closed, we need to unwind all of these operations for `Popover` and restore them for the open `Modal`

Focus management is interesting because it requires coordination as dialogs are opened and closed (especially when one triggers the other).

### Coordinating focus regions

Now that we have a basic understanding of the complex coordination necessary to manage focus across multiple UI dialogs we can talk about focus regions. A [FocusRegion](#FocusRegion) is what `Dialog` is using under the hood. Each `Dialog` instance is using exactly one instance of `FocusRegion` internally. Every time a `Dialog` is created, we initialize a `FocusRegion` which traps the focus.

`FocusRegion` doesn't know anything about other `FocusRegion` instances. Yet, in the example above we have two `FocusRegion` instances, one for `Popover` and one for `Modal`. As focus moves from the `Modal` to the `Popover` and back to the `Modal` again we need to activate, deactivate, and reactivate the `FocusRegion` for each component.

To help us keep track of this we use a singleton called [FocusRegionManager](#FocusRegionManager). Every time we create a `FocusRegion`, we register it with the `FocusRegionManager`. `FocusRegionManager` then tracks the order and is able to help us pass focus between regions as necessary.

Let's walk through at a high level what is happening with `FocusRegion` and `FocusRegionManager` in our example:

| What happens in the interface     | What happens in `FocusRegion` and `FocusRegionManager`                                                                                                                                                                                                               |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button is clicked                 |                                                                                                                                                                                                                                                                      |
| Modal opens                       | Modal's focus region is created and registered with `FocusRegionManager`                                                                                                                                                                                             |
| Popover trigger button is clicked |                                                                                                                                                                                                                                                                      |
| Popover is created                | `FocusRegionManager` deactivates Modal's focus region but continues tracking it since it is still mounted. A new focus region for Popover is created and registered with `FocusRegionManager` and is activated.                                                      |
| Popover is closed                 | `FocusRegionManager` deactivates Popover's focus region and also unregisters it since Popover is now unmounted. As Popover's focus region is unregistered, focus is restored to it's triggering element. `FocusRegionManager` then reactivates Modal's focus region. |
| Modal is closed                   | `FocusRegionManager` deactivates Modal's focus region and also unregisters it since Modal is now unmounted. As Modal's focus region is unregistered, focus is restored to it's triggering element (which is the original Button we clicked in the first place)       |

### The internal workings of FocusRegion

`FocusRegion` sets up listeners on the document to detect any escape presses to close on escape. It also adds document listeners for clicking in order to detect if there is a click or touch event that is outside of the Dialog area.

Beyond this, `FocusRegion` coordinates with two other internal classes [KeyboardFocusRegion](#KeyboardFocusRegion) and [ScreenReaderFocusRegion](#ScreenReaderFocusRegion).

#### KeyboardFocusRegion

This is the utility that traps keyboard focus. It scopes the tab press to focusable elements within the dialog and makes sure that when you press tab on the last focusable element, your focus is moved back to the first one. Additionally, `KeyboardFocusRegion` is in charge of returning focus to the triggering element once it is closed.

#### ScreenReaderFocusRegion

This is the utility that makes sure all elements outside of the `Dialog` receive `aria-hidden="true"`. We want to make sure that when a `Dialog` is open, all other page elements are hidden from screen readers. `ScreenReaderFocusRegion` can also receive a live region which includes elements which should not be hidden.
