// @ts-nocheck
// Unmapped component: Byline is not in the token mapping, so its `themeOverride`
// is left completely untouched with no warning. Only the mapped Spinner anchor
// `xSmallBorderWidth` -> `strokeWidthXs` changes.
import { Spinner } from '@instructure/ui-spinner/v11_7'
import { Byline } from '@instructure/ui-byline/v11_7'

const test = () => (
  <div>
    <Spinner renderTitle="anchor" themeOverride={{ strokeWidthXs: '2rem' }} />
    <Byline
      title="unmapped"
      themeOverride={{ margin: '1rem', background: 'magenta' }}
    >
      x
    </Byline>
  </div>
)
