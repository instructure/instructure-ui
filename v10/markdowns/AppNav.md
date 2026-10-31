# AppNav


`AppNav` is a navigation component currently intended for use within LTI apps. AppNav
can be configured to adapt to small screen widths by truncating nav items that
don't fit within the available space.

The `onUpdate` function prop returns the number of visible nav items, while the
`renderTruncateLabel` function prop allows you to customize the trigger for the Menu
that contains the truncated items. The example below shows how you can use both of
these props to create a hamburger menu when the number of visible nav items is less
than two.

- ```js
  const totalItemsCount = 5

  class AppNavExample extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        visibleItemsCount: totalItemsCount
      }
    }

    handleUpdate = ({ visibleItemsCount }) => {
      this.setState({ visibleItemsCount })
    }

    render() {
      const visibleItemsCount = this.state.visibleItemsCount

      return (
        <AppNav
          screenReaderLabel="App navigation"
          visibleItemsCount={visibleItemsCount >= 2 ? visibleItemsCount : 0}
          onUpdate={this.handleUpdate}
          renderBeforeItems={
            <AppNav.Item
              renderLabel={
                <ScreenReaderContent>Instructure</ScreenReaderContent>
              }
              renderIcon={
                <IconCommonsLine inline={false} size="medium" color="primary" />
              }
              href="http://instructure.com"
            />
          }
          renderAfterItems={
            <IconButton
              onClick={() => console.log('Add')}
              renderIcon={IconPlusSolid}
              margin="0 0 0 x-small"
              screenReaderLabel="Add something"
              withBorder={false}
              withBackground={false}
            />
          }
          renderTruncateLabel={function () {
            const hiddenItemsCount = totalItemsCount - visibleItemsCount
            if (visibleItemsCount >= 2) {
              return `${hiddenItemsCount} More`
            } else {
              return (
                <span>
                  <IconHamburgerLine size="small" inline={false} />
                  <ScreenReaderContent>{`${hiddenItemsCount} More`}</ScreenReaderContent>
                </span>
              )
            }
          }}
        >
          <AppNav.Item
            renderLabel="instructure-ui"
            href="http://instructure.design"
            renderAfter={
              <Badge
                type="notification"
                variant="success"
                standalone
                formatOutput={function () {
                  return (
                    <ScreenReaderContent>
                      You have notifications from instructure-ui
                    </ScreenReaderContent>
                  )
                }}
              />
            }
          />
          <AppNav.Item
            isSelected
            renderLabel="Canvas"
            href="https://www.instructure.com/canvas/"
          />
          <AppNav.Item renderLabel="Canvas Network" href="https://canvas.net" />
          <AppNav.Item
            renderLabel={() => 'Canvas Community'}
            href="https://community.canvaslms.com/"
          />
          <AppNav.Item
            renderLabel="Bridge"
            href="https://www.instructure.com/bridge/"
          />
        </AppNav>
      )
    }
  }

  render(<AppNavExample />)
  ```

- ```js
  const totalItemsCount = 5

  const AppNavExample = () => {
    const [visibleItemsCount, setVisibleItemsCount] = useState(totalItemsCount)

    const handleUpdate = ({ visibleItemsCount }) => {
      setVisibleItemsCount(visibleItemsCount)
    }

    return (
      <AppNav
        screenReaderLabel="App navigation"
        visibleItemsCount={visibleItemsCount >= 2 ? visibleItemsCount : 0}
        onUpdate={handleUpdate}
        renderBeforeItems={
          <AppNav.Item
            renderLabel={<ScreenReaderContent>Instructure</ScreenReaderContent>}
            renderIcon={
              <IconCommonsLine inline={false} size="medium" color="primary" />
            }
            href="http://instructure.com"
          />
        }
        renderAfterItems={
          <IconButton
            onClick={() => console.log('Add')}
            renderIcon={IconPlusSolid}
            margin="0 0 0 x-small"
            screenReaderLabel="Add something"
            withBorder={false}
            withBackground={false}
          />
        }
        renderTruncateLabel={() => {
          const hiddenItemsCount = totalItemsCount - visibleItemsCount
          if (visibleItemsCount >= 2) {
            return `${hiddenItemsCount} More`
          } else {
            return (
              <span>
                <IconHamburgerLine size="small" inline={false} />
                <ScreenReaderContent>{`${hiddenItemsCount} More`}</ScreenReaderContent>
              </span>
            )
          }
        }}
      >
        <AppNav.Item
          renderLabel="instructure-ui"
          href="http://instructure.design"
          renderAfter={
            <Badge
              type="notification"
              variant="success"
              standalone
              formatOutput={() => {
                return (
                  <ScreenReaderContent>
                    You have notifications from instructure-ui
                  </ScreenReaderContent>
                )
              }}
            />
          }
        />
        <AppNav.Item
          isSelected
          renderLabel="Canvas"
          href="https://www.instructure.com/canvas/"
        />
        <AppNav.Item renderLabel="Canvas Network" href="https://canvas.net" />
        <AppNav.Item
          renderLabel={() => 'Canvas Community'}
          href="https://community.canvaslms.com/"
        />
        <AppNav.Item
          renderLabel="Bridge"
          href="https://www.instructure.com/bridge/"
        />
      </AppNav>
    )
  }

  render(<AppNavExample />)
  ```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| AppNav | screenReaderLabel | `string` | Yes | - | Screenreader label for the overall navigation |
| AppNav | children | `React.ReactNode` | No | `null` | Only accepts `AppNav.Item` as children |
| AppNav | debounce | `number` | No | `300` | The rate (in ms) the component responds to container resizing or an update to one of its child items |
| AppNav | renderBeforeItems | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - | Content to display before the navigation items, such as a logo |
| AppNav | renderAfterItems | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - | Content to display after the navigation items, aligned to the far end of the navigation |
| AppNav | margin | `Spacing` | No | `'0'` | Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via familiar CSS-like shorthand. For example: `margin="small auto large"`. |
| AppNav | elementRef | `(element: Element \| null) => void` | No | - | Provides a reference to the underlying nav element |
| AppNav | renderTruncateLabel | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | `() => 'More'` | Customize the text displayed in the menu trigger when links overflow the overall nav width. |
| AppNav | onUpdate | `(visibleItemsCount: { visibleItemsCount: number }) => void` | No | - | Called whenever the navigation items are updated or the size of the navigation changes. Passes in the `visibleItemsCount` as a parameter. |
| AppNav | visibleItemsCount | `number` | No | `0` | Sets the number of navigation items that are visible. |
| AppNav.Item | renderLabel | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | Yes | - | The text to display. If the `icon` prop is used, label text must be wrapped in `ScreenReaderContent`. |
| AppNav.Item | renderAfter | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - | Content to display after the renderLabel text, such as a badge |
| AppNav.Item | renderIcon | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - | The visual to display (ex. an Image, Logo, Avatar, or Icon) |
| AppNav.Item | href | `string` | No | - | If the item goes to a new page, pass an href |
| AppNav.Item | onClick | `(event: React.MouseEvent) => void` | No | - | If the item does not go to a new page, pass an onClick |
| AppNav.Item | isSelected | `boolean` | No | `false` | Denotes which item is currently selected |
| AppNav.Item | elementRef | `(element: Element \| null) => void` | No | - | provides a reference to the underlying focusable (`button` or `a`) element |
| AppNav.Item | as | `keyof JSX.IntrinsicElements \| ComponentType<P>` | No | - | The element type to render as (will default to `<a>` if href is provided) |
| AppNav.Item | cursor | `Cursor` | No | `'pointer'` | Specify the mouse cursor to use on :hover. The `pointer` cursor is used by default. |
| AppNav.Item | isDisabled | `boolean` | No | `false` | Disables the link or button visually and functionally |
| AppNav.Item | children | `` | No | `null` |  |

### Usage

Install the package:

```shell
npm install @instructure/ui-navigation
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { AppNav } from '@instructure/ui-navigation'
```

