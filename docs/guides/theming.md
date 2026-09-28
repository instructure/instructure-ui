---
title: Theming
category: Guides
order: 9
relevantForAI: true
---

## Theming in InstUI

Every InstUI component reads its colors, spacing, typography, and other visual values from a theme. You don't style components one by one. You pick a theme, and every component inside it follows along.

This page covers the basics: how to apply a theme, which themes ship with InstUI, and how to style your own layout so it matches the active theme. To customize themes read [New Theme Overrides](new-theme-overrides) (should not be needed in most cases).

### Applying a theme

Wrap your app in `InstUISettingsProvider` and pass a theme to its `theme` prop:

```js
---
type: code
---
import { InstUISettingsProvider } from '@instructure/emotion'
import { canvas } from '@instructure/ui-themes'

<InstUISettingsProvider theme={canvas}>
  <App />
</InstUISettingsProvider>
```

If you don't set the `theme` prop, `InstUISettingsProvider` uses `canvas`. You can nest providers to give parts of the page a different theme. The inner provider wins for everything inside it.

InstUI ships with four themes:

| Theme                         | Import                                                        | Supported component versions |
| ----------------------------- | ------------------------------------------------------------- | ---------------------------- |
| Light                         | `import { light } from '@instructure/ui-themes'`              | `v11_7+`                     |
| Dark                          | `import { dark } from '@instructure/ui-themes'`               | `v11_7+`                     |
| Canvas (legacy)               | `import { canvas } from '@instructure/ui-themes'`             | `v11_6` and `v11_7+`         |
| Canvas high contrast (legacy) | `import { canvasHighContrast } from '@instructure/ui-themes'` | `v11_6` and `v11_7+`         |

v11.6 components fall back to the `canvas` theme when one tried to apply the `light` and `dark` themes. See [Component versioning](/#component-versioning) for details.

### Styling your own layout with the theme

InstUI components handle theming for you. Your own layout elements, like page backgrounds, cards, and dividers, need a little help.

We recommend plain HTML elements, like `<div>`, for layout. Style them with plain CSS, and read colors and sizes from the current theme with the [useComputedTheme](/#useComputedTheme) hook's `sharedTokens` prop:

```js
---
type: code
---
import { useComputedTheme } from '@instructure/emotion'

const Card = ({ children }) => {
  const { sharedTokens } = useComputedTheme()

  return (
    <div
      style={{
        background: sharedTokens.background.containerColor,
        border: `${sharedTokens.strokeWidth.sm} solid ${sharedTokens.stroke.baseColor}`,
        borderRadius: sharedTokens.borderRadius.md,
        padding: sharedTokens.spacing.padding.card.md
      }}
    >
      {children}
    </div>
  )
}
```

`useComputedTheme` returns the resolved tokens of the nearest theme. When the theme changes, your component re-renders with the new values.

Call the hook in a component that renders _inside_ the `InstUISettingsProvider` whose theme you want.

### Example: a themed login page

The switcher at the top swaps the theme on an `InstUISettingsProvider`. The page background, the card, and the divider are plain `<div>` elements styled with `useComputedTheme`. The heading, inputs, checkbox, button, and link are InstUI components.

This example uses v11.7+ components.

```js
---
type: example
---
const themes = [
  { key: 'light', label: 'Light', theme: light },
  { key: 'dark', label: 'Dark', theme: dark },
  { key: 'canvas', label: 'Canvas', theme: canvas },
  {
    key: 'canvasHighContrast',
    label: 'Canvas high contrast',
    theme: canvasHighContrast
  }
]

const LoginPage = () => {
  const { sharedTokens } = useComputedTheme()
  const { background, spacing, borderRadius, stroke } = sharedTokens

  const [email, setEmail] = useState('')
  const [emailMessages, setEmailMessages] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email) {
      setEmailMessages([{ type: 'error', text: 'Enter your email address.' }])
      setIsSubmitted(false)
      return
    }
    setEmailMessages([])
    setIsSubmitted(true)
  }

  return (
    <div
      style={{
        background: background.containerColor,
        padding: spacing.general.space2xl,
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <form
        noValidate
        onSubmit={handleSubmit}
        style={{
          background: background.containerColor,
          border: `1px solid ${stroke.baseColor}`,
          borderRadius: borderRadius.md,
          padding: spacing.padding.card.lg,
          width: '100%',
          maxWidth: '24rem',
          display: 'flex',
          flexDirection: 'column',
          gap: spacing.gap.inputs.vertical
        }}
      >
        <div>
          <Heading level="h2" variant="titleSection">
            Sign in
          </Heading>
          <Text as="p" color="secondary">
            Welcome back. Enter your details to continue.
          </Text>
        </div>

        {isSubmitted && (
          <Alert variant="success">
            You're signed in as {email}. This is a demo, so nothing was sent.
          </Alert>
        )}

        <TextInput
          renderLabel="Email"
          type="email"
          value={email}
          onChange={(event, value) => setEmail(value)}
          messages={emailMessages}
          isRequired
        />
        <TextInput renderLabel="Password" type="password" />
        <Checkbox label="Keep me signed in" />
        <Button type="submit" color="primary" display="block">
          Sign in
        </Button>

        <div
          style={{
            borderTop: `1px solid ${stroke.mutedColor}`,
            paddingTop: spacing.general.spaceLg,
            textAlign: 'center'
          }}
        >
          <Text>
            New here?{' '}
            <Link href="#" onClick={(event) => event.preventDefault()}>
              Create an account
            </Link>
          </Text>
        </div>
      </form>
    </div>
  )
}

const Example = () => {
  const [themeKey, setThemeKey] = useState('light')

  return (
    <div>
      <RadioInputGroup
        name="theming-guide-theme"
        description="Theme"
        variant="toggle"
        layout="columns"
        value={themeKey}
        onChange={(event, value) => setThemeKey(value)}
        margin="0 0 general.spaceLg"
      >
        {themes.map(({ key, label }) => (
          <RadioInput key={key} value={key} label={label} />
        ))}
      </RadioInputGroup>

      <InstUISettingsProvider
        theme={themes.find(({ key }) => key === themeKey).theme}
      >
        <LoginPage />
      </InstUISettingsProvider>
    </div>
  )
}

render(<Example />)
```
