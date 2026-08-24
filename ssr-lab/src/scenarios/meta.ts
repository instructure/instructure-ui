/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * The scenario catalogue. Plain data so both server and client components can
 * import it; the actual React components live in `loaders.ts`.
 *
 * `risk` records *why* a component is in here, based on how it computes its
 * styles:
 *
 * - `two-pass-styles`: the component is a class component that calls
 *   `this.props.makeStyles({ ...args })` from `componentDidMount`. Both
 *   `withStyle` and `withStyleNew` seed their style state on the first render
 *   with an *empty* args object, so the server only ever sees that first,
 *   incomplete pass. The real styles arrive after mount.
 * - `dom-measurement`: the component measures the DOM (getBoundingClientRect,
 *   offsetWidth, matchMedia, ...) in an effect and re-renders with the result.
 *   The server has no DOM to measure, so it renders the "unmeasured" state.
 * - `both`: both of the above.
 * - `suite`: a hand-assembled page combining several components.
 */

export type RiskKind = 'two-pass-styles' | 'dom-measurement' | 'both' | 'suite'

export type ScenarioMeta = {
  slug: string
  title: string
  risk: RiskKind
  note: string
  /**
   * What this scenario measured on the first pass through the lab, so a later
   * run has something to compare against. Recorded against the production build
   * (`npm run build && npm start`) in headless Chrome at 1280x900 with 4x CPU
   * throttling. Absolute numbers depend on viewport and machine — the sign and
   * the order of magnitude are the parts worth comparing.
   */
  baseline: string
}

export const RISK_LABELS: Record<RiskKind, string> = {
  'two-pass-styles': 'két-passzos stílus',
  'dom-measurement': 'DOM-mérés',
  both: 'két-passzos + DOM-mérés',
  suite: 'összeállított oldal'
}

export const SCENARIOS: ScenarioMeta[] = [
  {
    slug: 'text-input',
    title: 'TextInput + FormFieldLayout',
    risk: 'two-pass-styles',
    note: 'A ticketben említett eset. A FormFieldLayout grid-je v2-ben MÁR HELYES a szerver HTML-ben (mind a 6 példány ugyanazt a grid-template-areas értéket adja hidratálás előtt és után) — v1-ben viszont csak "controls" van, tehát a label és a hibaüzenet implicit sorokba kerül. A v2-ben mért teljes shift EGYETLEN okra vezethető vissza: a NumberInput `if (!id) return null`-t csinál, az id pedig useEffect-ből jön, tehát a szerveren nem rendereli le magát. Okozati bizonyíték: ha a NumberInput kap egy explicit `id` propot, az SSR magasság 730-ról 854-re nő, a shift 0-ra esik és a CLS is 0 lesz. Szándékosan hagyjuk id nélkül, mert ez a valós fogyasztói alapeset.',
    baseline: 'CLS 0,015 · +124px'
  },
  {
    slug: 'link',
    title: 'Link',
    risk: 'two-pass-styles',
    note: 'Link/v2 a componentDidMount-ban számol újra stílust; a bekezdés újratördelése miatt kicsit összébb húzódik.',
    baseline: 'CLS 0,002 · −16px'
  },
  {
    slug: 'button',
    title: 'Button / BaseButton',
    risk: 'two-pass-styles',
    note: 'BaseButton/v2 két-passzos, de a mért elmozdulás elhanyagolható. Nagyon sok komponens épül rá, ezért érdemes szemmel tartani.',
    baseline: 'CLS 0,000 · 0px'
  },
  {
    slug: 'table',
    title: 'Table',
    risk: 'two-pass-styles',
    note: 'Table.Row/v2 két-passzos; a sorok magassága a hidratálás után nő.',
    baseline: 'CLS 0,015 · +64px'
  },
  {
    slug: 'tabs',
    title: 'Tabs',
    risk: 'both',
    note: 'Tabs.Panel/v2 két-passzos és a Tabs méri a fejléc túlcsordulását, de ezen az oldalon nem eredményezett elmozdulást.',
    baseline: 'CLS 0 · 0px'
  },
  {
    slug: 'tree-browser',
    title: 'TreeBrowser',
    risk: 'two-pass-styles',
    note: 'TreeNode, TreeButton és TreeCollection mind két-passzos, mégsem mozdult el semmi.',
    baseline: 'CLS 0 · 0px'
  },
  {
    slug: 'side-nav-bar',
    title: 'SideNavBar',
    risk: 'two-pass-styles',
    note: 'A `minimized` állapot csak mount után kerül a stílusba; a kezdő állapotban nem látszik elmozdulás.',
    baseline: 'CLS 0 · 0px'
  },
  {
    slug: 'top-nav-bar',
    title: 'TopNavBar',
    risk: 'both',
    note: 'A legsúlyosabb eset: a szerver HTML-ben a komponens NULLA magas, a teljes navigáció csak a hidratálás után jelenik meg. A CLS 0, mert a beugrás még az első festés előtt történt — a magasságkülönbség mutatja meg. A Responsive komponens üres div-et renderel, amíg nincs DOM.',
    baseline: 'CLS 0 · 0px → 164px'
  },
  {
    slug: 'drawer-layout',
    title: 'DrawerLayout',
    risk: 'both',
    note: 'A tartalom szélességét méri, hogy eldöntse, a tray átfedjen-e. A magasság nem változik, de vízszintesen mozdul.',
    baseline: 'CLS 0,041 · 0px'
  },
  {
    slug: 'toggle-group',
    title: 'ToggleGroup',
    risk: 'two-pass-styles',
    note: 'ToggleGroup/v2 két-passzos, a mért elmozdulás elhanyagolható.',
    baseline: 'CLS 0,000 · 0px'
  },
  {
    slug: 'file-drop',
    title: 'FileDrop',
    risk: 'two-pass-styles',
    note: 'FileDrop/v2 két-passzos, de nem mozdult el.',
    baseline: 'CLS 0 · 0px'
  },
  {
    slug: 'progress-circle',
    title: 'ProgressCircle',
    risk: 'two-pass-styles',
    note: 'Két-passzos, plusz mount-animáció. Az animáció a körön belül marad, a layoutot nem tolja el.',
    baseline: 'CLS 0,000 · 0px'
  },
  {
    slug: 'rating',
    title: 'Rating',
    risk: 'two-pass-styles',
    note: 'RatingIcon/v2 két-passzos; az animateFill sem tolja el a layoutot.',
    baseline: 'CLS 0 · 0px'
  },
  {
    slug: 'calendar',
    title: 'Calendar',
    risk: 'two-pass-styles',
    note: 'Calendar.Day/v2 két-passzos és 35 példányban renderelődik, de nem mozdult el.',
    baseline: 'CLS 0 · 0px'
  },
  {
    slug: 'color-picker',
    title: 'ColorPicker',
    risk: 'both',
    note: 'Két-passzos és matchMedia-t is használ; a mért elmozdulás elhanyagolható.',
    baseline: 'CLS 0,000 · 0px'
  },
  {
    slug: 'drilldown',
    title: 'Drilldown',
    risk: 'two-pass-styles',
    note: 'Drilldown/v2 két-passzos, de nem mozdult el.',
    baseline: 'CLS 0 · 0px'
  },
  {
    slug: 'truncate-text',
    title: 'TruncateText',
    risk: 'dom-measurement',
    note: 'A második legsúlyosabb eset: a szerver a teljes szöveget küldi le, a böngésző pedig a hidratálás után vágja el, így az oldal 324 pixellel összeugrik.',
    baseline: 'CLS 0,045 · −324px'
  },
  {
    slug: 'pill',
    title: 'Pill',
    risk: 'dom-measurement',
    note: 'A szöveg szélességét méri a csonkoláshoz; csak pár pixelt mozdul vízszintesen.',
    baseline: 'CLS 0,000 · 0px'
  },
  {
    slug: 'text-area',
    title: 'TextArea',
    risk: 'dom-measurement',
    note: 'Az autogrow magasság csak mount után áll be, addig a mező az alapmagasságán van — 228 pixel különbség.',
    baseline: 'CLS 0,038 · +228px'
  },
  {
    slug: 'breadcrumb',
    title: 'Breadcrumb (TruncateList)',
    risk: 'dom-measurement',
    note: 'A TruncateList a rendelkezésre álló szélességet méri, és a hidratálás után csukja össze a közbülső elemeket.',
    baseline: 'CLS 0,003 · −68px'
  },
  {
    slug: 'select',
    title: 'Select',
    risk: 'dom-measurement',
    note: 'Input és lista méretét is méri, de zárt állapotban nem mozdul.',
    baseline: 'CLS 0 · 0px'
  },
  {
    slug: 'suite-form',
    title: 'Űrlap oldal',
    risk: 'suite',
    note: 'Sok form control egy oldalon — itt adódnak össze a kis shiftek.',
    baseline: 'CLS 0,016 · +88px'
  },
  {
    slug: 'suite-dashboard',
    title: 'Dashboard oldal',
    risk: 'suite',
    note: 'Kártyák, metrikák, progress és tábla vegyesen.',
    baseline: 'CLS 0,002 · −19px'
  },
  {
    slug: 'suite-app-shell',
    title: 'App shell',
    risk: 'suite',
    note: 'Navigáció + tartalom, a legéletszerűbb eset. A TopNavBar üres SSR-je itt is benne van.',
    baseline: 'CLS 0,017 · +64px'
  }
]

export const SCENARIO_SLUGS = SCENARIOS.map((scenario) => scenario.slug)

export const findScenario = (slug: string) =>
  SCENARIOS.find((scenario) => scenario.slug === slug)
