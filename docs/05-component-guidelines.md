### General Requirements

- be high contrast aware (use color variables, meet [4.5:1](http://www.w3.org/TR/WCAG20-TECHS/G18.html) and [3:1](http://www.w3.org/TR/WCAG20-TECHS/G183.html)).
- be keyboard friendly (proper use of tabIndex, logical tab order, ESC to close modals, etc).
- be screenreader friendly (label all inputs, use native controls, use screenreader-only text).
- have good test coverage.

### CSS Conventions

The build system uses the webpack css loader and [css modules](https://github.com/css-modules/css-modules) to generate
Suit/BEM style class names, where the "block" portion includes the component name and a configured prefix, so that
in the .css source for components we only have to worry about "element" and "modifier" class names (using BEM terminology).

#### Element Class Names

Element classes should be camel case (e.g. `inputLabel`).

#### Modifier Class Names

Modifiers should also be camel case, with a couple exceptions:

- If part of the classname is dynamically generated in the JS from a component prop, use a double dash before the generated part of the class name. e.g. `positioned--left` where "left" is a string value passed as a prop `positioned`.
- For modifiers generated via a boolean prop, use an `is-`, `has-` or `with-` prefix. e.g. `is-open`, `with-padding`
with component props `isOpen` and `withPadding`.

#### Element and Wildcard Selectors

As a general rule, element (e.g. `p { ... }`) and wildcard (`*`) selectors should be avoided. Exceptions could be made for
components that would never render children.

#### CSS variables and adding component themes

All CSS variables should be defined in a `theme.js` file in the component directory. The theme is applied to the component via the `@themeable` decorator, which transforms the JS variables in the `theme.js` file into CSS custom properties that are automatically scoped and applied to the component.

JS variables in the `theme.js` file can be nested, and should generally be named using the name of the component state and/or child element and then the camel-cased css property name.

For example, to add a variable for the `hover` state of a `Button` component the theme.js file would contain the following:

```
export default function ({ colors }) {
  return (
    background: colors.lightest,
    color: colors.darkest,

    hover: {
      color: colors.lightest,
      background: colors.darkest
    }
  )
}
```

The `@themeable` decorator will generate the CSS custom properties `--Button-background`, `--Button-color`, `--Button-hover-color`, `--Button-hover-background`. Use these generated custom property names in the `styles.css` file for the `Button` component.
