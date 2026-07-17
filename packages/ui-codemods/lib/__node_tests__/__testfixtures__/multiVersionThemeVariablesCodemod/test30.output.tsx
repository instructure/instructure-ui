// @ts-nocheck
// Heading per-instance `themeOverride`, three fates at once: `primaryColor` ->
// `baseColor` (rename), `weightImportant` removed (silent), and `titleSection`
// kept but warned (now a typography object instead of a font size).
import { Heading } from '@instructure/ui-heading/v11_7'

const test = () => (
  <Heading
    themeOverride={{
      baseColor: 'red',
      titleSection: '2rem'
    }}
  >
    hi
  </Heading>
)
