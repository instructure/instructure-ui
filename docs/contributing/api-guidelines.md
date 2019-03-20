---
title: API Guidelines
category: Contributing
order: 3
---

## API Guidelines

### Component Properties

- All components should pass through additional props down to the root DOM element using the `omitProps` utility. (e.g. `<div {...omitProps(this.props, MyComponent.propTypes)}>`). Note that in addition to omitting the props you pass in, `omitProps` will remove the `theme`, `className` and `style` props to prevent unexpected style issues.
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

- Function props that provide custom rendering should be prefixed with `render` (e.g. `renderLabel`, `renderHeader`). These props can be set to `PropTypes.oneOfType([PropTypes.node, PropTypes.func])` for the most flexibility.
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

### CSS Class Names

- CSS class names that correspond to a boolean prop should match the prop name (e.g. `isOpen`).
- CSS class names that correspond to a prop name and value should match the kebab-case prop value (e.g. `x-large`) and should be prefixed with the prop name and separated by `--` (e.g. `.size--x-large`, `.width--fluid`).
- All other CSS class names should be camelCase, semantic (describe the content, not what it looks like), and avoid any component prefix (the component scope will be added by the build).

### Component Theme Variables

- Theme variables should be camelCase, reflecting the corresponding CSS property when possible and prefixed with a semantic descriptor, using the following format: `[variation][state][CSS property]` e.g. (for `<Button variant="primary" />`, `primaryHoverBackground`).
- Theme variables shouldn't include the component name because the component scope is added via the build. (`primaryHoverBackground` will be transformed into `--Button`)

### Component Lifecycle methods

- When using `setTimeout`, `requestAnimationFrame`, `MutationObserver`, or similar async functionality in your component, be sure to cancel/clear them in the `componentWillUnmount` lifecycle method.

### Render Prop Components

See the [React docs](https://reactjs.org/docs/render-props.html) for information about what a render prop component is.

- Render props component names should have the `-able` or `-ible` suffix to describe the shared behavior they are providing. (e.g. `Focusable`, `Selectable`, `Dismissible`)
- Render props components should support both `render` and `children` function props.
- The `render` and `children` function props should be called with an object that provides 'prop getter' functions.
- 'Prop getter' functions should be named like `get[semantic element]Props()`.
- DOM events should be added via prop values (using React event handlers) passed in via 'prop getter' functions and not added via `addEventListener`/native events (unless they are added to the document).
