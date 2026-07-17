// @ts-nocheck
// The InstUISettingsProvider's only override is `Spinner.smallSize`, which is removed
// in v2. Once it's gone the override is empty, the `theme` prop is empty, and the
// InstUISettingsProvider has nothing left to do - so it is removed and its child is
// kept: the whole thing becomes just `<Spinner renderTitle="x" />`.
import { Spinner } from '@instructure/ui-spinner/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

const test = <Spinner renderTitle="x" />
