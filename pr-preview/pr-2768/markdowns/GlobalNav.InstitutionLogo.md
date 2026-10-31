# InstitutionLogo



### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| InstitutionLogo | logo | `{ /** * The URL of the logo image. */ src?: string /** * The name of the institution or product, shown next to the image or used as the alternative text of a wordmark. */ name: string /** * Whether to show `name` as text. Set it to `false` when `src` is a wide logo that already shows the name, for example a product wordmark. Defaults to `true`. */ showName?: boolean /** * The URL that the logo links to. */ href?: string }` | Yes | - | The logo data. |
| InstitutionLogo | collapsed | `boolean` | Yes | - | Whether the rail is collapsed. |

### Usage

Install the package:

```shell
npm install @instructure/ui-global-nav
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { InstitutionLogo } from '@instructure/ui-global-nav/v11_7'
```

