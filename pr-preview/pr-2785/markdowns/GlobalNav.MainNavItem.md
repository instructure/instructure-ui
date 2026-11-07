# MainNavItem



### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| MainNavItem | item | `Omit<GlobalNavSubNavItem, 'itemElementProps'> & { /** * HTML attributes for the item's `li` element: `id`, `className` and `data-*`. */ itemElementProps?: GlobalNavHTMLProps /** * The icon of the rail item. */ icon: Renderable /** * The number in the badge, which is hidden when it is 0 or missing. */ badgeCount?: number /** * Screen reader text of the badge. */ badgeLabel?: GlobalNavCountLabel }` | Yes | - | The data of the item. |
| MainNavItem | collapsed | `boolean` | Yes | - | Whether the rail is collapsed. |
| MainNavItem | open | `boolean` | Yes | - | Whether the SubNav of the item is open. |
| MainNavItem | subNavId | `string` | No | - | The id of the open SubNav panel, set only while the SubNav of this item is open. |
| MainNavItem | onActivate | `( event: MouseEvent<HTMLElement>, item: GlobalNavMainNavItem ) => void` | Yes | - | Called when the user activates the item, after `item.onClick`. |
| MainNavItem | elementRef | `(element: HTMLElement \| null) => void` | Yes | - | Called with the link or button element of the item. |

### Usage

Install the package:

```shell
npm install @instructure/ui-global-nav
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { MainNavItem } from '@instructure/ui-global-nav/v11_7'
```

