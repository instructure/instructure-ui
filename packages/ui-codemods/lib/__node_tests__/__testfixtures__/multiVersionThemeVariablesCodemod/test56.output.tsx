// @ts-nocheck
// Facade InstUISettingsProvider overrides keep their own keys in v2 (CheckboxFacade/ToggleFacade
// read their own slots), so `Checkbox` / `CheckboxFacade` / `ToggleFacade` stay as
// three separate entries - no re-key, no merge. Tokens still rename:
// `requiredInvalidColor` -> `asteriskColor`, `background` -> `backgroundColor`.
// The whole block relocates to `themeOverride.components`.
import { Checkbox } from '@instructure/ui-checkbox/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

function test() {
  return (
    <InstUISettingsProvider
      themeOverride={{
        components: {
          Checkbox: { asteriskColor: 'red' },
          CheckboxFacade: { backgroundColor: 'pink' },
          ToggleFacade: { backgroundColor: 'lightblue' }
        }
      }}
    >
      <Checkbox label="x" />
    </InstUISettingsProvider>
  )
}
