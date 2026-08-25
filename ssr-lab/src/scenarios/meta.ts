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

export type RiskKind =
  | 'custom'
  | 'two-pass-styles'
  | 'dom-measurement'
  | 'both'
  | 'suite'

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
   * the order of magnitude are the parts worth comparing. Re-recorded on top of
   * INSTUI-5152 (useId-based id generation).
   */
  baseline: string
}

export const RISK_LABELS: Record<RiskKind, string> = {
  custom: 'scratch page',
  'two-pass-styles': 'two-pass styles',
  'dom-measurement': 'DOM measurement',
  both: 'two-pass + DOM measurement',
  suite: 'assembled page'
}

export const SCENARIOS: ScenarioMeta[] = [
  {
    slug: 'custom',
    title: 'Custom scratch page',
    risk: 'custom',
    note: 'Already registered and empty-ish: put whatever you want to measure into src/scenarios/custom.tsx and reload. No entry to add anywhere.',
    baseline: 'yours'
  },
  {
    slug: 'text-input',
    title: 'TextInput + FormFieldLayout',
    risk: 'two-pass-styles',
    note: 'The case named in the ticket. In v2 the FormFieldLayout grid is already correct in the server HTML (all 6 instances produce the same grid-template-areas before and after hydration); in v1 it collapses to just "controls", so the label and the messages land in implicit tracks. The +124px measured here earlier came from the NumberInput `if (!id) return null` gate, which INSTUI-5152 (useId-based ids) removed: the page now moves 0px.',
    baseline: 'CLS 0.000 · 0px'
  },
  {
    slug: 'link',
    title: 'Link',
    risk: 'two-pass-styles',
    note: 'Link/v2 recomputes its styles in componentDidMount; the paragraph re-wraps and pulls together slightly.',
    baseline: 'CLS 0.001 · −16px'
  },
  {
    slug: 'button',
    title: 'Button / BaseButton',
    risk: 'two-pass-styles',
    note: 'BaseButton/v2 is two-pass, but the measured movement is negligible. Worth watching because a great many components build on it.',
    baseline: 'CLS 0.000 · 0px'
  },
  {
    slug: 'table',
    title: 'Table',
    risk: 'two-pass-styles',
    note: 'Table.Row/v2 is two-pass; row heights grow after hydration.',
    baseline: 'CLS 0.020 · +64px'
  },
  {
    slug: 'tabs',
    title: 'Tabs',
    risk: 'both',
    note: 'Tabs.Panel/v2 is two-pass and Tabs measures header overflow, but neither moved anything on this page.',
    baseline: 'CLS 0 · 0px'
  },
  {
    slug: 'tree-browser',
    title: 'TreeBrowser',
    risk: 'two-pass-styles',
    note: 'TreeNode, TreeButton and TreeCollection are all two-pass, yet nothing moved.',
    baseline: 'CLS 0 · 0px'
  },
  {
    slug: 'side-nav-bar',
    title: 'SideNavBar',
    risk: 'two-pass-styles',
    note: 'The `minimized` flag only reaches the styles after mount; in the initial state no movement shows up.',
    baseline: 'CLS 0 · 0px'
  },
  {
    slug: 'top-nav-bar',
    title: 'TopNavBar',
    risk: 'both',
    note: 'The worst case: in the server HTML the component is ZERO pixels tall, and the whole navigation only appears after hydration. CLS is 0 because the pop-in happens before the first paint, so the height difference is what reveals it. Responsive renders an empty div until it has a DOM.',
    baseline: 'CLS 0 · 0px → 164px'
  },
  {
    slug: 'drawer-layout',
    title: 'DrawerLayout',
    risk: 'both',
    note: 'Measures the content width to decide whether the tray overlays it. The height does not change, but things move horizontally.',
    baseline: 'CLS 0.044 · 0px'
  },
  {
    slug: 'toggle-group',
    title: 'ToggleGroup',
    risk: 'two-pass-styles',
    note: 'ToggleGroup/v2 is two-pass; the measured movement is negligible.',
    baseline: 'CLS 0.000 · 0px'
  },
  {
    slug: 'file-drop',
    title: 'FileDrop',
    risk: 'two-pass-styles',
    note: 'FileDrop/v2 is two-pass, but nothing moved.',
    baseline: 'CLS 0 · 0px'
  },
  {
    slug: 'progress-circle',
    title: 'ProgressCircle',
    risk: 'two-pass-styles',
    note: 'Two-pass, plus a mount animation. The animation stays inside the circle and does not push the layout.',
    baseline: 'CLS 0 · 0px'
  },
  {
    slug: 'rating',
    title: 'Rating',
    risk: 'two-pass-styles',
    note: 'RatingIcon/v2 is two-pass; animateFill does not push the layout either.',
    baseline: 'CLS 0 · 0px'
  },
  {
    slug: 'calendar',
    title: 'Calendar',
    risk: 'two-pass-styles',
    note: 'Calendar.Day/v2 is two-pass and renders 35 times, but nothing moved.',
    baseline: 'CLS 0 · 0px'
  },
  {
    slug: 'color-picker',
    title: 'ColorPicker',
    risk: 'both',
    note: 'Two-pass and also uses matchMedia; the measured movement is negligible.',
    baseline: 'CLS 0.000 · 0px'
  },
  {
    slug: 'drilldown',
    title: 'Drilldown',
    risk: 'two-pass-styles',
    note: 'Drilldown/v2 is two-pass, but nothing moved.',
    baseline: 'CLS 0 · 0px'
  },
  {
    slug: 'truncate-text',
    title: 'TruncateText',
    risk: 'dom-measurement',
    note: 'The worst remaining case: the server sends the full text and the browser only truncates it after hydration, so the page collapses by 289 pixels.',
    baseline: 'CLS 0.037 · −289px'
  },
  {
    slug: 'pill',
    title: 'Pill',
    risk: 'dom-measurement',
    note: 'Measures its own text width to decide on truncation; moves a few pixels horizontally at most.',
    baseline: 'CLS 0 · 0px'
  },
  {
    slug: 'text-area',
    title: 'TextArea',
    risk: 'dom-measurement',
    note: 'The autogrow height only settles after mount; until then the field sits at its default height, a 532 pixel difference — on its own enough to push CLS past the 0.1 "good" threshold.',
    baseline: 'CLS 0.103 · +532px'
  },
  {
    slug: 'breadcrumb',
    title: 'Breadcrumb (TruncateList)',
    risk: 'dom-measurement',
    note: 'TruncateList measures the available width and collapses the middle crumbs after hydration, taking 84px off the page.',
    baseline: 'CLS 0.004 · −84px'
  },
  {
    slug: 'select',
    title: 'Select',
    risk: 'dom-measurement',
    note: 'Measures both the input and the list, but does not move while closed.',
    baseline: 'CLS 0 · 0px'
  },
  {
    slug: 'suite-form',
    title: 'Form page',
    risk: 'suite',
    note: 'Many form controls on one page. Before INSTUI-5152 this was +88px (NumberInput was missing from the server HTML); afterwards 0px.',
    baseline: 'CLS 0 · 0px'
  },
  {
    slug: 'suite-dashboard',
    title: 'Dashboard page',
    risk: 'suite',
    note: 'Cards, metrics, progress and a table mixed together.',
    baseline: 'CLS 0.002 · −19px'
  },
  {
    slug: 'suite-app-shell',
    title: 'App shell',
    risk: 'suite',
    note: 'Navigation plus content, the most lifelike case. The empty TopNavBar server render shows up here too.',
    baseline: 'CLS 0.017 · +64px'
  }
]

export const SCENARIO_SLUGS = SCENARIOS.map((scenario) => scenario.slug)

export const findScenario = (slug: string) =>
  SCENARIOS.find((scenario) => scenario.slug === slug)
