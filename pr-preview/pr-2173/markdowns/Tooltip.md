# Tooltip


Tooltips are small text-only contextual overlays that are triggered by hover/focus. Use anywhere additional explanation might be needed but space is limited on the triggering element.

> ### What about 'focusable' elements?
>
> Content provided to the `renderTip` prop **should not contain any focusable elements**. If you'd like to do
> that you should use the [Popover](#Popover) component and handle focus management yourself or
> consider using a [Modal](#Modal) or a [Tray](#Tray) as those will work better on smaller screens.

#### Uncontrolled Tooltips

```js
---
type: example
---
<div>
  <p>
    <Tooltip
      renderTip="Hello. I'm a tool tip"
      as={Button}
      onShowContent={() => console.log('showing')}
      onHideContent={() => console.log('hidden')}
    >
      Hover or focus me
    </Tooltip>
  </p>
  <p>
    <Tooltip
      color="primary-inverse"
      renderTip="Hello. I'm a tool tip"
      placement="bottom"
      offsetX="5px"
    >
      <TextInput
        display="inline-block"
        renderLabel="Enter some text"
      />
    </Tooltip>
  </p>
  <p>
    <Tooltip
      renderTip="Hello. I'm a tool tip"
      placement="start"
      on={['click', 'hover', 'focus']}
    >
      <IconButton
        renderIcon={IconInfoLine}
        withBackground={false}
        withBorder={false}
        screenReaderLabel="Toggle Tooltip"
      />
    </Tooltip>
  </p>
</div>
```

#### Controlled Tooltips

- ```js
  class Example extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        isShowingContent: false
      }
    }

    render() {
      return (
        <>
          <p>
            <Tooltip
              renderTip="Hello. I'm a tool tip"
              isShowingContent={this.state.isShowingContent}
              onShowContent={(e) => {
                console.log('expecting to show tooltip')
              }}
              onHideContent={(e) => {
                console.log('expecting to hide tooltip')
              }}
            >
              <Link href="#">This link has a tooltip</Link>
            </Tooltip>
          </p>
          <Checkbox
            label="show tooltip?"
            variant="toggle"
            value="toggled"
            onChange={(event) => {
              this.setState({ isShowingContent: event.target.checked })
            }}
          />
        </>
      )
    }
  }

  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [isShowingContent, setIsShowingContent] = useState(false)

    return (
      <>
        <p>
          <Tooltip
            renderTip="Hello. I'm a tool tip"
            isShowingContent={isShowingContent}
            onShowContent={(e) => {
              console.log('expecting to show tooltip')
            }}
            onHideContent={(e) => {
              console.log('expecting to hide tooltip')
            }}
          >
            <Link href="#">This link has a tooltip</Link>
          </Tooltip>
        </p>
        <Checkbox
          label="show tooltip?"
          variant="toggle"
          value="toggled"
          onChange={(event) => {
            setIsShowingContent(event.target.checked)
          }}
        />
      </>
    )
  }

  render(<Example />)
  ```

### Custom elements as renderTrigger

Popover and Tooltip attach mouse and focus event listeners to their render trigger components via props. These need to be propagated to the component for the listeners to work:

- ```js
  class MyComponent extends React.Component {
    constructor(props) {
      super(props)
      this.ref = React.createRef()
    }
    render() {
      //  Spread the props to the underlying DOM element
      return (
        <div {...this.props} ref={this.ref} style={{ width: '10rem' }}>
          My custom component
        </div>
      )
    }
  }
  ;<Tooltip renderTip="Tooltip text to display">
    <MyComponent />
  </Tooltip>
  ```

- ```js
  const MyComponent = forwardRef((props, ref) => {
    return (
      <div {...props} ref={ref} style={{ width: '10rem' }}>
        My custom component
      </div>
    )
  })

  ;<Tooltip renderTip="Tooltip text to display">
    <MyComponent />
  </Tooltip>
  ```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Use on icons with no labels</Figure.Item>
    <Figure.Item>Use on condensed dates</Figure.Item>
    <Figure.Item>Use on table content if items are getting truncated</Figure.Item>
    <Figure.Item>Use to provide more specific data (ie. user hovers over a chart element, Tooltip shows precise info)</Figure.Item>
    <Figure.Item>Try to stay within 50 characters</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Repeat the exact information contained on the triggering element</Figure.Item>
    <Figure.Item>Contain links or focusable items</Figure.Item>
    <Figure.Item>Use icons inside Tooltips</Figure.Item>
    <Figure.Item>Use in place of a <Link href="/#Popover">Popover</Link> or <Link href="/#Menu">Menu</Link></Figure.Item>
  </Figure>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Tooltip | elementRef | `(element: Element \| null) => void` | No | - | provides a reference to the underlying html root element |
| Tooltip | children | `React.ReactNode \| TooltipRenderChildren` | Yes | - | A ReactNode or a function that returns a ReactNode with the following params: @param {Boolean} focused - Is the Tooltip trigger focused? @param {Function} getTriggerProps - Props to be spread onto the trigger element |
| Tooltip | renderTip | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | Yes | - | The content to render in the tooltip |
| Tooltip | isShowingContent | `boolean` | No | - | Whether or not the tooltip content is shown, when controlled |
| Tooltip | defaultIsShowingContent | `boolean` | No | `false` | Whether or not to show the content by default, when uncontrolled |
| Tooltip | as | `keyof JSX.IntrinsicElements \| ComponentType<P>` | No | - | the element type to render as (assumes a single child if 'as' is undefined) |
| Tooltip | on | `('click' \| 'hover' \| 'focus') \| ('click' \| 'hover' \| 'focus')[]` | No | - | The action that causes the Content to display (`click`, `hover`, `focus`) |
| Tooltip | color | `'primary' \| 'primary-inverse'` | No | `'primary'` | The color of the tooltip content |
| Tooltip | placement | `PlacementPropValues` | No | `'top'` | Specifies where the Tooltip will be placed in relation to the target element. Ex. placement="bottom" will render the Tooltip below the triggering element (Note: if there is not room, it will position opposite. Ex. "top" will automatically switch to "bottom") |
| Tooltip | mountNode | `PositionMountNode` | No | - | An element or a function returning an element to use as the mount node for the `<Tooltip />` (defaults to `document.body`) |
| Tooltip | constrain | `PositionConstraint` | No | `'window'` | The parent in which to constrain the tooltip. One of: 'window', 'scroll-parent', 'parent', 'none', an element, or a function returning an element |
| Tooltip | offsetX | `string \| number` | No | `0` | The horizontal offset for the positioned content |
| Tooltip | offsetY | `string \| number` | No | `0` | The vertical offset for the positioned content |
| Tooltip | positionTarget | `PositionMountNode` | No | - | Target element for positioning the Tooltip (if it differs from children/trigger) |
| Tooltip | onShowContent | `(event: React.UIEvent \| React.FocusEvent) => void` | No | - | Callback fired when content is shown. When controlled, this callback is fired when the tooltip expects to be shown |
| Tooltip | onHideContent | `( event: React.UIEvent \| React.FocusEvent, args: { documentClick: boolean } ) => void` | No | - | Callback fired when content is hidden. When controlled, this callback is fired when the tooltip expects to be hidden |
| Tooltip | preventTooltip | `boolean` | No | `false` | If true, it won't display the tooltip. This is useful in cases when tooltip is conditionally needed but in an uncontrolled way |

### Usage

Install the package:

```shell
npm install @instructure/ui-tooltip
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Tooltip } from '@instructure/ui-tooltip'
```

