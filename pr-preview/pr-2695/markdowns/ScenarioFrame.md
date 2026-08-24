# ScenarioFrame

Wraps the scenario markup and drops the pre-hydration snapshot script right
after it, so the script sees the finished server-rendered subtree.

This is a server component on purpose — it renders no interactive markup, and
keeping it on the server means the `<script>` ends up in the streamed HTML
rather than being re-created during hydration.

### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| ScenarioFrame | title | `string` | Yes | - |  |
| ScenarioFrame | children | `ReactNode` | Yes | - |  |

### Usage

Install the package:

```shell
npm install @instructure/ssr-lab
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { ScenarioFrame } from '@instructure/ssr-lab'
```

