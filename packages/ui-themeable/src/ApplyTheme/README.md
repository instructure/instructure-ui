---
describes: ApplyTheme
---

The `<ApplyTheme/>` component provides a way to override the default
theme properties for all `@themeable` child components.

Note that `<ApplyTheme/>` components can be nested and that
theme properties will fall back to the parent theme or the defaults when they are not set.

```js
---
example: true
---
<ApplyTheme theme={{
    [Link.theme]: { color: 'green' }
  }}>
  <div>
    <p>
      <Link href="http://instructure.com">I should be Green</Link>
    </p>
    <p>
      <ApplyTheme theme={{
          [Link.theme]: { color: 'red' }
        }}>
        <Link href="http://instructure.com">I should be Red</Link>
      </ApplyTheme>
    </p>
    <p>
      <Link href="http://instructure.com" theme={{ color: 'purple' }}>I should be Purple</Link>
    </p>
  </div>
</ApplyTheme>
```

You can set user defined variables at runtime using the `ApplyTheme.generateTheme` helper
to override a 'registered' theme and passing in the variables as the second argument.

```js
---
example: true
---
<ApplyTheme theme={ApplyTheme.generateTheme('canvas', {
      'ic-brand-primary': '#008EE2',
      'ic-brand-button--primary-bgd': '#008EE2',
      'ic-brand-button--primary-text': '#FFFFFF',
      'ic-link-color': 'red'
    }
  )}
>
  <div>
    <Link href="https://instructure.github.io/instructure-ui/">I should be red</Link>
    <br />
    <Link href="https://instructure.github.io/instructure-ui/" theme={Link.generateTheme('canvas', {
        'color': 'green'
      }
    )}>I should be green</Link>
  </div>
</ApplyTheme>
```
