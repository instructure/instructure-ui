# MainNavItem



### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| MainNavItem | item | `GlobalNavSubNavItem & { /** * The icon of the rail item. */ icon: Renderable /** * The number in the badge, which is hidden when it is 0 or missing. */ badgeCount?: number /** * Screen reader text of the badge. */ badgeLabel?: GlobalNavCountLabel }` | Yes | - | The data of the item. |
| MainNavItem | collapsed | `boolean` | Yes | - | Whether the rail is collapsed. |
| MainNavItem | open | `boolean` | Yes | - | Whether the SubNav of the item is open. |
| MainNavItem | onSubNavChange | `(event: SyntheticEvent, itemID: string \| undefined) => void` | No | - | Called when the user opens or closes the SubNav of the item. |

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

