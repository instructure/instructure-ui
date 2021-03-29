---
title: API Guidelines
category: Getting Started
order: 4
---

## API Guidelines

### Component Properties

- All components should pass through additional props down to the root DOM element using the `passthroughProps` utility. (e.g. `<div {...passthroughProps(this.props)}>`). Note that in addition to allowing only valid DOM node attributes, `passthroughProps` will remove the `className` and `style` props to prevent unexpected style issues. These need to be set explicitly and used with caution. It also removes the `styles` and `makesStyles` properties added by the [withStyle](#withStyle) decorator.
- Avoid props that could be computed from other props. (e.g. prefer `<Select filter={handleFilter} />` over `<Select shouldFilter filter={handleFilter} />`. Prefer determining whether filtering should happen based on the presence of the `filter` function prop.)
- Avoid situations where certain prop combinations are not supported. Prefer splitting the component into separate components with fewer props or using `PropTypes.oneOf`.
- Set default prop values for non-required props when possible.

#### General Naming Conventions

- Component prop names should be camelCase.
- Avoid the 'default' prop prefix since all components should be controlled only.
- If the component should allow custom DOM elements, it should provide an `as` prop. (e.g. `<Tag as="span" />` will render an HTML `span` element.)
- Enum (`PropType.oneOf`) prop values should be kebab-case (dashes) (e.g. `size="x-small"`).

#### Boolean props

- Boolean props should be avoided when possible in favor of `PropTypes.oneOf` (a list of possible values) so that it's easier to extend later on.
- Avoid Boolean props that are mutually exclusive in favor of `PropTypes.oneOf` or separate components. For example, prefer `<Input interaction="disabled" />` over `<Input disabled />` where the `interaction` prop is `PropTypes.oneOf(['disabled', 'enabled', 'readonly'])`. Note that an input cannot be disabled and readonly, so these are mutually exclusive.
- Boolean props should begin with `should`/`is`/`does`/`has`/`with`.
- When possible, default boolean props to `false` so that they can be set to `true` without a value. (e.g. prefer `<Modal isOpen />` over `<Modal isClosed={false} />`)

#### Function props

- Function props that provide custom rendering should be prefixed with `render` (e.g. `renderLabel`, `renderHeader`). These props can be set to `PropTypes.oneOfType([PropTypes.node, PropTypes.func])` for the most flexibility. If your prop only accepts strings and provides text that is only read by screen readers, use the `screenReader` prefix (e.g., `screenReaderLabel`).
- Function props that handle events should be prefixed with `on` (e.g. `onDismiss`, `onClose`, `onSelect`).
- Function props that handle DOM events should always pass in the [React SyntheticEvent](https://reactjs.org/docs/events.html) object as the first argument and any meta data about the event as a second argument.
- Function props that handle DOM events should be chained (e.g. `createChainedFunction(this.props.onFocus, this.handleFocus)`) so that consumers are able to attach their own handlers in addition to the built in handlers.
- Function [ref](https://reactjs.org/docs/refs-and-the-dom.html) props should have a `Ref` suffix and should describe the element to which it provides a ref (e.g. `inputRef`).
- All components should provide an `elementRef` prop that will return a ref to the root DOM element.

#### Children

- Prefer child components and composition with JSX vs. complex prop types. (e.g. prefer `<List><List.Item label="foo" /></List>` over `<List items={['foo']} />`)
- Avoid using internal child components that aren't meant to be exported as part of the public component API. Prefer composition using other publicly available components that can be rendered in isolation or provide public child components.
- If your component accepts a list of children, make sure it handles `null` children.
- Child components that can't be used on their own should be exported as static properties on the parent component (e.g. `Table.Row`, `Menu.Item`), so that only one import is required to render the component (e.g. `import Table from '@instructure/ui-tables'`).
- If the parent component can only be used with specific children that can also be used on their own, it should have the `Group` suffix (e.g. `<RadioGroup><Radio /><Radio /></RadioGroup>`, `<ButtonGroup><Button /><Button /></ButtonGroup>`).

### styles.js Class Names

- In the `styles.js`, use the name of the component in camelCase (e.g. `appNav`) as the key of the root element's style object. Use camelCase for the keys of child elements as well (e.g. `list` and `listItem`).
- All style object names should be semantic (describe the content, not what it looks like).
- We make use of the `label` property of [Emotion.js](https://emotion.sh/) so that it gets displayed in the generated class name for easy readability and targetability. We use a naming convention based on [BEM naming convention](#http://getbem.com/naming/):
  - For the root element, add a label with the name of the component in camelCase \
    (e.g. `appNav: { label: 'appNav' }`).
  - For the child elements, use the double underscore separator to indicate the parent-child relation with the `[rootElementName]__[childName}` format \
  - In case you want to indicate variants or modifiers of an element, use the double hyphen separator with the `[elementName]--[modifier]` format \
    (e.g. `view--inline-block` or `calendar__navigation--withButtons`).

### Component Theme Variables

- Theme variables should be camelCase, reflecting the corresponding CSS property when possible and prefixed with a semantic descriptor, using the following format: `[variation][state][CSS property]` e.g. (for `<Button color="primary" />`, `primaryHoverBackground`).
- Theme variables shouldn't include the component name.

### Component Lifecycle methods

- When using `setTimeout`, `requestAnimationFrame`, `MutationObserver`, or similar async functionality in your component, be sure to cancel/clear them in the `componentWillUnmount` lifecycle method.

### Package directory structure and file naming

- React component names, and their source directory names, should be PascalCase.
- Avoid deeply nesting directories within a package. All components and utilities should be directly under `src`. Prefer splitting into separate packages over sub-directories. Child components can be nested under the parent if they cannot be used on their own.
- Always provide a named export. (e.g. prefer `export { MyComponent }` vs. `export default MyComponent`)
- Always import named exports when they are available. (e.g. prefer `import { MyComponent } from 'my-lib'` to `import MyComponent from 'my-lib'`)

### Render Prop Components

See the [React docs](https://reactjs.org/docs/render-props.html) for information about what a render prop component is.

- Render props component names should have the `-able` or `-ible` suffix to describe the shared behavior they are providing. (e.g. `Focusable`, `Selectable`, `Dismissible`)
- Render props components should support both `render` and `children` function props.
- The `render` and `children` function props should be called with an object that provides 'prop getter' functions.
- 'Prop getter' functions should be named like `get[semantic element]Props()`.
- DOM events should be added via prop values (using React event handlers) passed in via 'prop getter' functions and not added via `addEventListener`/native events (unless they are added to the document).
