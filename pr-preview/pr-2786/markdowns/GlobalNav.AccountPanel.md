# AccountPanel



### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| AccountPanel | account | `{ /** * Identifies the account panel in `openSubNav`. */ itemID: string /** * The heading of the account panel. */ label: string /** * The user's name, shown on the rail item and in the panel. */ name: string /** * The URL of the user's avatar. */ avatarSrc?: string /** * The text of the role pill. */ userType?: string /** * The name of the user's institution. */ institution?: string /** * Whether the current page belongs to the account, for example the profile. */ current?: boolean /** * The number in the badge of the rail item, which is hidden when it is 0 or missing. */ badgeCount?: number /** * Screen reader text of the badge. */ badgeLabel?: GlobalNavCountLabel /** * A reminder to verify the account, shown as a badge on the avatar and a link under the institution. */ verification?: { badgeLabel: string linkLabel: string href?: string onClick?: (event: MouseEvent<HTMLElement>) => void } /** * The other accounts of the user, which the button next to the name lists in a menu. */ switcher?: { label: string accounts: GlobalNavAccountOption[] } /** * The links of the panel. */ items?: GlobalNavAccountItem[] /** * A section of toggles with a heading, for example user interface settings. */ toggles?: { label: string items: GlobalNavToggle[] } /** * The log out button at the end of the panel. */ logout?: { label: string href?: string onClick?: (event: MouseEvent<HTMLElement>) => void } }` | Yes | - | The data of the account. |

### Usage

Install the package:

```shell
npm install @instructure/ui-global-nav
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { AccountPanel } from '@instructure/ui-global-nav/v11_7'
```

