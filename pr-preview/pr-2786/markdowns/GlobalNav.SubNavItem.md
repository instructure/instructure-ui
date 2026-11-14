# SubNavItem



### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| SubNavItem | item | `GlobalNavSubNavItem & Pick<GlobalNavAccountItem, 'icon'>` | Yes | - | The data of the item. |
| SubNavItem | logout | `boolean` | No | - | Whether the item is the log out button of the account panel, which has its own text color. |
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

