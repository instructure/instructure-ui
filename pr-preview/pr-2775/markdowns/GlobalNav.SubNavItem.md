# SubNavItem



### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| SubNavItem | item | `{ /** * Identifies the item in `openSubNav` and is its React key, but isn't rendered to the DOM. */ itemID: string /** * The visible text and accessible name of the item. */ label: string /** * The URL of the page, ignored for items with a `subNav`. */ href?: string /** * Called when the user activates the item, also when it opens a deeper level. */ onClick?: (event: MouseEvent<HTMLElement>) => void /** * Whether the item is the current page, which sets `aria-current="page"`. */ current?: boolean /** * The deeper level that the item opens as a disclosure button. */ subNav?: GlobalNavSubNav /** * HTML attributes for the item's link or button: `id`, `className`, `target`, `rel` and `data-*`. */ elementProps?: GlobalNavElementProps }` | Yes | - | The data of the item. |
| SubNavItem | elementRef | `(element: HTMLElement \| null) => void` | No | - | Called with the link or button element of the item. |
| SubNavItem | onDrillIn | `( event: MouseEvent<HTMLElement>, item: GlobalNavSubNavItem ) => void` | No | - | Called when the user activates an item with a `subNav`, after `item.onClick`. |

### Usage

Install the package:

```shell
npm install @instructure/ui-global-nav
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { SubNavItem } from '@instructure/ui-global-nav/v11_7'
```

