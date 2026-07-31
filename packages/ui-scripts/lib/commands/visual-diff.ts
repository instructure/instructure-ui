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
import {
  readdirSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  copyFileSync,
  existsSync,
  statSync
} from 'node:fs'
import { join, basename } from 'node:path'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'

type Status = 'unchanged' | 'changed' | 'added' | 'removed'

type Result = {
  name: string
  status: Status
  numDiff?: number
  sizeMismatch?: boolean
}

type Args = {
  actualDir: string
  baselineDir: string
  outputDir: string
  threshold: number
  failOnMissingBaseline: boolean
  prNumber?: string
  prUrl?: string
  meta?: string
  sourceBaseUrl?: string
  facets?: string
  appPath?: string
  a11y?: string
}

type Meta = Record<string, string>

// Accessibility violations captured by the spec's axe run, keyed by screenshot
// slug (name minus `.png`, e.g. `button-dark`). Written by the `recordA11y`
// Cypress task; see regression-test/cypress.config.ts.

/** Bounding box of a violating element, in CSS pixels relative to the top-left
 * of the document (not the viewport) — the same coordinate space the fullPage
 * screenshot is captured in. */
type A11yRect = { x: number; y: number; w: number; h: number }

/** Structured payload of an axe `color-contrast` check, so the report can show
 * real swatches and ratios instead of making the reader parse prose. */
type A11yContrast = {
  fg: string
  bg: string
  ratio: number
  expected: number
  fontSize?: string
  fontWeight?: string
}

type A11yNode = {
  target: string
  html: string
  summary: string
  /** Human-readable description of the element, e.g. `button "Save changes"`. */
  label?: string
  rect?: A11yRect | null
  contrast?: A11yContrast | null
}

type A11yViolation = {
  id: string
  impact: string | null
  help: string
  helpUrl: string
  nodes: A11yNode[]
}

/** Dimensions of the captured page, used to convert node rects into
 * percentages of the screenshot so overlays scale with the rendered image. */
type A11yPageSize = { w: number; h: number }

type A11yEntry = { page: A11yPageSize | null; violations: A11yViolation[] }

type A11y = Record<string, A11yEntry>

/** @internal — exported only for tests; not part of the package's public API. */
export function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** @internal — exported only for tests; not part of the package's public API. */
export function sourceLinkFor(
  name: string,
  meta: Meta | null,
  sourceBaseUrl?: string
): string {
  if (!meta || !sourceBaseUrl) return ''
  const slug = name.replace(/\.png$/, '')
  const pagePath = meta[slug]
  if (!pagePath) return ''
  const url = sourceBaseUrl.replace(/\/$/, '') + pagePath + '/page.tsx'
  const display = pagePath.replace(/^\//, '') + '/page.tsx'
  return `<a class="source-link" href="${url}" target="_blank" rel="noopener">${display}</a>`
}

/**
 * Build the URL of the live rendered page for a screenshot, relative to the
 * report root. The app (a static export of the regression-test Next app) is
 * published under `appPath` next to the report, so a screenshot named
 * `<slug>-<theme>.png` maps to `<appPath><pagePath>/?theme=<theme>` — e.g.
 * `app/button/?theme=dark`. Returns '' when the app wasn't published, meta is
 * missing, or the page path can't be resolved (the HTML view is then hidden).
 *
 * `meta` is keyed by the full screenshot name (minus `.png`), e.g.
 * `button-dark → /button`; the theme is recovered by matching the name's
 * trailing `-<facet>` against the known facets (facets may themselves contain
 * hyphens, so a plain split won't do).
 *
 * @internal — exported only for tests; not part of the package's public API.
 */
export function appUrlFor(
  name: string,
  meta: Meta | null,
  facets: string[],
  appPath?: string
): string {
  if (!appPath || !meta) return ''
  const slug = name.replace(/\.png$/, '')
  const pagePath = meta[slug]
  if (!pagePath) return ''
  const facet = facets.find((f) => slug.endsWith('-' + f))
  const base = appPath.replace(/\/$/, '')
  const query = facet ? `?theme=${facet}` : ''
  return `${base}${pagePath}/${query}`
}

function walk(dir: string): string[] {
  if (!existsSync(dir)) return []
  const out: string[] = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) out.push(...walk(full))
    else if (entry.endsWith('.png')) out.push(full)
  }
  return out
}

/** @internal — exported only for tests; not part of the package's public API. */
export function indexByName(files: string[]): Map<string, { path: string }> {
  const map = new Map<string, { path: string }>()
  for (const f of files) map.set(basename(f), { path: f })
  return map
}

function loadPng(path: string): PNG {
  return PNG.sync.read(readFileSync(path))
}

// Highlight color for changed pixels in the diff image (matches the report's accent).
const HIGHLIGHT = { r: 255, g: 0, b: 128 }

// Compare two images and return a per-pixel changed mask (1 = differs), padding
// the smaller image so both share the max dimensions.
function diffMask(baseline: PNG, actual: PNG, threshold: number) {
  const { width: bw, height: bh } = baseline
  const { width: aw, height: ah } = actual
  const width = Math.max(bw, aw)
  const height = Math.max(bh, ah)

  const pad = (src: PNG, w: number, h: number): PNG => {
    if (src.width === w && src.height === h) return src
    const padded = new PNG({ width: w, height: h })
    PNG.bitblt(src, padded, 0, 0, src.width, src.height, 0, 0)
    return padded
  }

  const b = pad(baseline, width, height)
  const a = pad(actual, width, height)
  const out = new PNG({ width, height })
  const numDiff = pixelmatch(b.data, a.data, out.data, width, height, {
    threshold,
    includeAA: false,
    diffMask: true
  })
  // With diffMask:true, changed pixels are opaque and the rest transparent.
  const changed = new Uint8Array(width * height)
  for (let i = 0; i < width * height; i++) {
    changed[i] = out.data[i * 4 + 3] > 0 ? 1 : 0
  }
  return {
    changed,
    width,
    height,
    numDiff,
    sizeMismatch: bw !== aw || bh !== ah,
    actual: a
  }
}

// How much unchanged pixels are dimmed in the diff image so the changed pixels
// stand out. DESAT blends each pixel toward its own grayscale (0 = keep color,
// 1 = fully gray); DIM then scales brightness (0.5 = half).
const DESAT = 0.7
const DIM = 0.5

// Grow a per-pixel changed mask by `radius` cells in every direction. A single
// changed pixel is nearly invisible once painted, so we dilate the mask before
// highlighting to give hairline diffs a legible footprint.
/** @internal — exported only for tests; not part of the package's public API. */
export function dilateMask(
  changed: ArrayLike<number>,
  width: number,
  height: number,
  radius = 1
): Uint8Array {
  const out = new Uint8Array(width * height)
  if (radius <= 0) {
    for (let i = 0; i < width * height; i++) out[i] = changed[i] ? 1 : 0
    return out
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!changed[y * width + x]) continue
      const y0 = Math.max(0, y - radius)
      const y1 = Math.min(height - 1, y + radius)
      const x0 = Math.max(0, x - radius)
      const x1 = Math.min(width - 1, x + radius)
      for (let yy = y0; yy <= y1; yy++) {
        for (let xx = x0; xx <= x1; xx++) out[yy * width + xx] = 1
      }
    }
  }
  return out
}

// Render the diff image Chromatic-style: dim and desaturate the actual
// screenshot so it reads as a faint backdrop, then paint the exact changed
// pixels (dilated for visibility) in a bright highlight color. This points the
// reviewer's eye precisely at what changed instead of a coarse bounding box.
function highlightImage(
  actual: PNG,
  changed: ArrayLike<number>,
  width: number,
  height: number
): PNG {
  const out = new PNG({ width, height })
  const { r: HR, g: HG, b: HB } = HIGHLIGHT
  const hits = dilateMask(changed, width, height)

  for (let i = 0; i < width * height; i++) {
    const o = i * 4
    if (hits[i]) {
      out.data[o] = HR
      out.data[o + 1] = HG
      out.data[o + 2] = HB
      out.data[o + 3] = 255
      continue
    }
    const r = actual.data[o]
    const g = actual.data[o + 1]
    const b = actual.data[o + 2]
    const gray = 0.299 * r + 0.587 * g + 0.114 * b
    out.data[o] = Math.round((r * (1 - DESAT) + gray * DESAT) * DIM)
    out.data[o + 1] = Math.round((g * (1 - DESAT) + gray * DESAT) * DIM)
    out.data[o + 2] = Math.round((b * (1 - DESAT) + gray * DESAT) * DIM)
    out.data[o + 3] = 255
  }
  return out
}

function copyInto(src: string, destDir: string, name: string) {
  mkdirSync(destDir, { recursive: true })
  copyFileSync(src, join(destDir, name))
}

/** @internal — exported only for tests; not part of the package's public API. */
export function badgeFor(s: Status): string {
  return {
    unchanged: '<span class="pill pass">ok</span>',
    changed: '<span class="pill fail">changed</span>',
    added: '<span class="pill new">new</span>',
    removed: '<span class="pill gone">removed</span>'
  }[s]
}

/** @internal — exported only for tests; not part of the package's public API. */
export function thumb(mode: string, name: string): string {
  return `<img loading="lazy" src="${mode}/${name}" data-name="${name}" data-mode="${mode}" class="thumb" />`
}

// ---------------------------------------------------------------------------
// Accessibility reporting
//
// axe's raw output is written for developers: rule ids, CSS selectors, and a
// prose `failureSummary`. The report's audience is mostly designers, so the
// functions below translate that into (a) boxes drawn on the screenshot itself,
// and (b) a card per finding that leads with plain language, the offending
// element's visible name, and — for contrast failures — actual color swatches.
// The raw axe output stays available behind a "Technical details" disclosure.
// ---------------------------------------------------------------------------

/**
 * Accept both the current a11y.json shape (`{ page, violations }` per
 * screenshot) and the earlier one (a bare violation array), and drop
 * screenshots with no violations so every consumer can treat a present key as
 * "this screenshot has findings".
 *
 * @internal — exported only for tests; not part of the package's public API.
 */
export function normalizeA11y(raw: unknown): A11y | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null
  const out: A11y = {}
  for (const [name, value] of Object.entries(raw as Record<string, unknown>)) {
    const entry = Array.isArray(value)
      ? { page: null, violations: value as A11yViolation[] }
      : (value as A11yEntry | null)
    const violations = Array.isArray(entry?.violations) ? entry.violations : []
    if (!violations.length) continue
    const page = entry?.page
    out[name] = {
      page: page && page.w > 0 && page.h > 0 ? page : null,
      violations
    }
  }
  return out
}

const IMPACT_RANK: Record<string, number> = {
  critical: 0,
  serious: 1,
  moderate: 2,
  minor: 3
}

/** @internal — exported only for tests; not part of the package's public API. */
export function normalizeImpact(impact: string | null | undefined): string {
  return impact && impact in IMPACT_RANK ? impact : 'unknown'
}

function impactRank(impact: string | null | undefined): number {
  return IMPACT_RANK[normalizeImpact(impact)] ?? 4
}

/**
 * Recover the structured contrast numbers from axe's prose failure summary,
 * for runs captured before the spec started recording them directly. The
 * summary reads: "Element has insufficient color contrast of 2.42 (foreground
 * color: #6b7780, background color: #2d3b45, font size: 12.0pt (16px), font
 * weight: normal). Expected contrast ratio of 4.5:1".
 *
 * @internal — exported only for tests; not part of the package's public API.
 */
export function parseContrast(summary?: string): A11yContrast | null {
  if (!summary) return null
  const ratio = /contrast of ([\d.]+)/.exec(summary)
  const fg = /foreground color: (#[0-9a-fA-F]{3,8})/.exec(summary)
  const bg = /background color: (#[0-9a-fA-F]{3,8})/.exec(summary)
  const expected = /Expected contrast ratio of ([\d.]+):1/.exec(summary)
  if (!ratio || !fg || !bg || !expected) return null
  const fontSize = /font size: ([^,]+)/.exec(summary)
  const fontWeight = /font weight: ([^,)]+)/.exec(summary)
  return {
    fg: fg[1],
    bg: bg[1],
    ratio: Number(ratio[1]),
    expected: Number(expected[1]),
    fontSize: fontSize?.[1].trim(),
    fontWeight: fontWeight?.[1].trim()
  }
}

// Plain-language rendering of the axe rules this suite can actually trip, in
// the words a designer would use. `title` replaces the rule id as the card's
// headline; `fix` is the one-line "so what do I change?". Anything not listed
// falls back to axe's own `help` text, so an unmapped rule still reads fine.
const RULE_COPY: Record<string, { title: string; fix: string }> = {
  'color-contrast': {
    title: 'Text contrast is too low',
    fix: 'Darken the text or lighten the background until it reaches the required ratio.'
  },
  'color-contrast-enhanced': {
    title: 'Text contrast is below the enhanced (AAA) threshold',
    fix: 'Increase the contrast between the text and its background.'
  },
  'link-in-text-block': {
    title: 'Link is only distinguishable by color',
    fix: 'Underline the link, or raise its contrast against the surrounding text.'
  },
  'button-name': {
    title: 'Button has no accessible name',
    fix: 'Give the button visible text, or pass a screen-reader label.'
  },
  'link-name': {
    title: 'Link has no accessible name',
    fix: 'Give the link visible text, or pass a screen-reader label.'
  },
  'input-button-name': {
    title: 'Button has no accessible name',
    fix: 'Set a value or a label on the input button.'
  },
  'image-alt': {
    title: 'Image has no alternative text',
    fix: 'Add alt text describing the image, or mark it decorative if it carries no meaning.'
  },
  'input-image-alt': {
    title: 'Image button has no alternative text',
    fix: 'Add alt text describing what the button does.'
  },
  'role-img-alt': {
    title: 'Image has no alternative text',
    fix: 'Add a label to the element that carries role="img".'
  },
  'svg-img-alt': {
    title: 'Icon has no alternative text',
    fix: 'Give the icon a title/label, or hide it from screen readers if it is decorative.'
  },
  'area-alt': {
    title: 'Image map area has no alternative text',
    fix: 'Add alt text to the area element.'
  },
  label: {
    title: 'Form field has no label',
    fix: 'Add a visible label, or attach one with renderLabel / aria-label.'
  },
  'select-name': {
    title: 'Select has no accessible name',
    fix: 'Add a label to the select.'
  },
  'form-field-multiple-labels': {
    title: 'Form field has more than one label',
    fix: 'Keep a single label per field.'
  },
  'aria-input-field-name': {
    title: 'Input has no accessible name',
    fix: 'Label the field so screen readers can announce what it is for.'
  },
  'aria-toggle-field-name': {
    title: 'Toggle has no accessible name',
    fix: 'Label the checkbox/switch so screen readers can announce what it toggles.'
  },
  'aria-command-name': {
    title: 'Control has no accessible name',
    fix: 'Give the button/link/menuitem text or a label.'
  },
  'aria-allowed-attr': {
    title: 'ARIA attribute is not allowed on this element',
    fix: "Remove the attribute, or change the element's role to one that allows it."
  },
  'aria-prohibited-attr': {
    title: 'ARIA attribute is prohibited on this element',
    fix: 'Remove the attribute and name the element with visible text instead.'
  },
  'aria-required-attr': {
    title: 'Required ARIA attribute is missing',
    fix: 'Add the attribute the role requires.'
  },
  'aria-required-children': {
    title: 'ARIA role is missing its required children',
    fix: 'Nest the child roles the parent role expects.'
  },
  'aria-required-parent': {
    title: 'ARIA role is missing its required parent',
    fix: 'Wrap the element in the parent role its role expects.'
  },
  'aria-valid-attr-value': {
    title: 'ARIA attribute has an invalid value',
    fix: 'Check the value — an id reference here usually points at a missing element.'
  },
  'aria-hidden-focus': {
    title: 'Hidden element can still be focused',
    fix: 'Remove aria-hidden, or take the element out of the tab order.'
  },
  'aria-hidden-body': {
    title: 'The page body is hidden from screen readers',
    fix: 'Remove aria-hidden from <body>.'
  },
  'nested-interactive': {
    title: 'Interactive control is nested inside another',
    fix: 'Flatten the markup so controls are siblings, not parent and child.'
  },
  'heading-order': {
    title: 'Heading levels skip a step',
    fix: 'Step heading levels one at a time (h2 → h3, never h2 → h4).'
  },
  'empty-heading': {
    title: 'Heading is empty',
    fix: 'Give the heading text, or remove it.'
  },
  'duplicate-id': {
    title: 'Duplicate id on the page',
    fix: 'Make every id unique — duplicates break label and ARIA references.'
  },
  'duplicate-id-aria': {
    title: 'Duplicate id used by an ARIA reference',
    fix: 'Make the referenced id unique so the reference resolves.'
  },
  'duplicate-id-active': {
    title: 'Duplicate id on an interactive element',
    fix: 'Make every id unique.'
  },
  list: {
    title: 'List contains items that are not list items',
    fix: 'Only <li> (or script/template) may be a direct child of a list.'
  },
  listitem: {
    title: 'List item is not inside a list',
    fix: 'Wrap the item in a <ul> or <ol>.'
  },
  'definition-list': {
    title: 'Definition list is structured incorrectly',
    fix: 'A <dl> may only contain <dt>/<dd> pairs (optionally grouped in <div>).'
  },
  'scrollable-region-focusable': {
    title: 'Scrollable area cannot be reached by keyboard',
    fix: 'Give the scrollable container tabindex="0" so keyboard users can scroll it.'
  },
  'th-has-data-cells': {
    title: 'Table header has no data cells',
    fix: 'Check the table structure — a header should describe some cells.'
  },
  'td-headers-attr': {
    title: 'Table cell points at a header that does not exist',
    fix: 'Fix the headers attribute so it references real cells in the same table.'
  },
  region: {
    title: 'Content sits outside any landmark',
    fix: 'Wrap the content in a landmark such as <main>, <nav>, or <section> with a label.'
  },
  'landmark-one-main': {
    title: 'Page has no main landmark',
    fix: 'Wrap the primary content in <main>.'
  },
  'frame-title': {
    title: 'Frame has no title',
    fix: 'Add a title attribute describing the frame contents.'
  },
  'html-has-lang': {
    title: 'Page does not declare a language',
    fix: 'Add a lang attribute to <html>.'
  },
  tabindex: {
    title: 'Element uses a positive tabindex',
    fix: 'Use tabindex="0" and rely on DOM order instead.'
  },
  'meta-viewport': {
    title: 'Page prevents zooming',
    fix: 'Remove user-scalable=no / maximum-scale from the viewport meta tag.'
  },
  'presentation-role-conflict': {
    title: 'Element is marked decorative but is still exposed',
    fix: 'Remove role="presentation"/"none", or remove what keeps the element exposed.'
  }
}

/**
 * Plain-language headline and remedy for an axe rule, falling back to axe's own
 * `help` text for rules this report has no copy for.
 *
 * @internal — exported only for tests; not part of the package's public API.
 */
export function ruleCopy(
  id: string,
  help = ''
): { title: string; fix: string } {
  const copy = RULE_COPY[id]
  return { title: copy?.title ?? help ?? id, fix: copy?.fix ?? '' }
}

/**
 * One violating element. axe groups nodes under a rule; the report flattens
 * that so every finding gets its own number, card, and box on the screenshot —
 * a designer thinks in "this thing here is wrong", not "this rule matched".
 */
type Finding = {
  /** 1-based, stable within one screenshot; ties the card to its overlay box. */
  n: number
  rule: string
  impact: string
  title: string
  fix: string
  help: string
  helpUrl: string
  label: string
  target: string
  summary: string
  rect: A11yRect | null
  contrast: A11yContrast | null
}

/**
 * Flatten a screenshot's violations into numbered findings, worst impact first
 * so the numbering on the screenshot runs in priority order.
 *
 * @internal — exported only for tests; not part of the package's public API.
 */
export function findingsFor(
  name: string,
  a11y: A11y | null
): { findings: Finding[]; page: A11yPageSize | null } {
  const entry = a11y?.[name.replace(/\.png$/, '')]
  if (!entry) return { findings: [], page: null }

  const flat = entry.violations.flatMap((v) =>
    v.nodes.map((node) => {
      const { title, fix } = ruleCopy(v.id, v.help)
      return {
        rule: v.id,
        impact: normalizeImpact(v.impact),
        title,
        fix,
        help: v.help,
        helpUrl: v.helpUrl,
        label: node.label ?? '',
        target: node.target,
        summary: node.summary ?? '',
        rect: node.rect ?? null,
        contrast: node.contrast ?? parseContrast(node.summary)
      }
    })
  )
  flat.sort(
    (a, b) =>
      impactRank(a.impact) - impactRank(b.impact) ||
      a.rule.localeCompare(b.rule)
  )
  return {
    findings: flat.map((f, i) => ({ n: i + 1, ...f })),
    page: entry.page
  }
}

/**
 * Row-header pill, colored by the worst impact on the screenshot.
 *
 * @internal — exported only for tests; not part of the package's public API.
 */
export function a11yBadge(findings: Finding[]): string {
  if (!findings.length) return ''
  const worst = findings.reduce(
    (acc, f) => (impactRank(f.impact) < impactRank(acc) ? f.impact : acc),
    'unknown'
  )
  const plural = findings.length === 1 ? '' : 's'
  return `<span class="pill a11y" data-impact="${esc(worst)}" title="${
    findings.length
  } accessibility issue${plural}, worst impact: ${esc(worst)}">⚠ ${
    findings.length
  } a11y</span>`
}

/**
 * Boxes to lay over the screenshot, positioned as percentages of the captured
 * page so one markup blob works at thumbnail size and full size alike. Returns
 * '' when the run predates rect capture (no page size recorded).
 *
 * @internal — exported only for tests; not part of the package's public API.
 */
export function a11yMarkers(
  findings: Finding[],
  page: A11yPageSize | null
): string {
  if (!page) return ''
  const pct = (v: number, total: number) =>
    ((Math.max(0, v) / total) * 100).toFixed(3)
  return findings
    .filter((f) => f.rect)
    .map((f) => {
      const r = f.rect!
      return `<span class="mk" data-n="${f.n}" data-impact="${esc(
        f.impact
      )}" style="--x:${pct(r.x, page.w)}%;--y:${pct(r.y, page.h)}%;--w:${pct(
        r.w,
        page.w
      )}%;--h:${pct(r.h, page.h)}%"><b>${f.n}</b></span>`
    })
    .join('')
}

// axe reports colors as hex; anything else is shown as text only rather than
// interpolated into a style attribute.
function swatch(color: string): string {
  const safe = /^#[0-9a-fA-F]{3,8}$/.test(color) ? color : 'transparent'
  return `<span class="sw" style="background:${safe}"></span><code>${esc(
    color.toUpperCase()
  )}</code>`
}

function contrastHtml(c: A11yContrast): string {
  const pass = c.ratio >= c.expected
  const text = [c.fontSize, c.fontWeight].filter(Boolean).join(' · ')
  return `<div class="v-contrast">${swatch(
    c.fg
  )}<span class="on">on</span>${swatch(c.bg)}<span class="ratio ${
    pass ? 'ok' : 'bad'
  }">${c.ratio.toFixed(2)}:1</span><span class="need">needs ${
    c.expected
  }:1</span>${text ? `<span class="fs">${esc(text)}</span>` : ''}</div>`
}

/**
 * One card per finding: impact, plain-language headline, which element it is,
 * a contrast readout when relevant, the suggested fix, and the raw axe output
 * tucked behind a disclosure.
 *
 * @internal — exported only for tests; not part of the package's public API.
 */
export function a11yCards(findings: Finding[]): string {
  if (!findings.length) return ''
  const cards = findings
    .map((f) => {
      const where = f.label
        ? `<div class="v-where">${esc(f.label)}</div>`
        : `<div class="v-where muted">position not captured</div>`
      const contrast = f.contrast ? contrastHtml(f.contrast) : ''
      const fix = f.fix ? `<div class="v-fix">${esc(f.fix)}</div>` : ''
      const rule = f.helpUrl
        ? `<a href="${esc(f.helpUrl)}" target="_blank" rel="noopener">${esc(
            f.rule
          )}</a>`
        : esc(f.rule)
      return `<article class="v-card" data-n="${f.n}" data-rule="${esc(
        f.rule
      )}" data-impact="${esc(f.impact)}">
        <span class="v-num" data-impact="${esc(f.impact)}">${f.n}</span>
        <div class="v-body">
          <div class="v-head"><span class="impact ${esc(f.impact)}">${esc(
        f.impact
      )}</span><h3>${esc(f.title)}</h3></div>
          ${where}${contrast}${fix}
          <details class="v-tech"><summary>Technical details</summary><dl>
            <dt>Rule</dt><dd>${rule} — ${esc(f.help)}</dd>
            <dt>Selector</dt><dd><code>${esc(f.target)}</code></dd>
            <dt>axe</dt><dd><pre>${esc(f.summary)}</pre></dd>
          </dl></details>
        </div>
      </article>`
    })
    .join('')
  return `<div class="v-cards">${cards}</div>`
}

/** A rule rolled up across every screenshot in the run. */
type RuleSummary = {
  rule: string
  impact: string
  title: string
  helpUrl: string
  nodes: number
  screens: number
}

/**
 * Roll findings up by rule for the run-level overview: how many elements each
 * rule affects and how many screenshots it appears on, worst impact first. The
 * same rule tripping on `button-canvas`, `button-light` and `button-dark`
 * collapses to one line here instead of three.
 *
 * @internal — exported only for tests; not part of the package's public API.
 */
export function a11ySummary(a11y: A11y | null): RuleSummary[] {
  const byRule = new Map<string, RuleSummary>()
  for (const entry of Object.values(a11y ?? {})) {
    const seenHere = new Set<string>()
    for (const v of entry.violations) {
      const cur = byRule.get(v.id) ?? {
        rule: v.id,
        impact: normalizeImpact(v.impact),
        title: ruleCopy(v.id, v.help).title,
        helpUrl: v.helpUrl,
        nodes: 0,
        screens: 0
      }
      cur.nodes += v.nodes.length
      if (impactRank(v.impact) < impactRank(cur.impact)) {
        cur.impact = normalizeImpact(v.impact)
      }
      if (!seenHere.has(v.id)) {
        cur.screens += 1
        seenHere.add(v.id)
      }
      byRule.set(v.id, cur)
    }
  }
  return [...byRule.values()].sort(
    (a, b) =>
      impactRank(a.impact) - impactRank(b.impact) ||
      b.nodes - a.nodes ||
      a.rule.localeCompare(b.rule)
  )
}

/**
 * The run-level a11y panel that opens the report: totals, then one clickable
 * line per rule that filters the list down to the screenshots tripping it.
 *
 * @internal — exported only for tests; not part of the package's public API.
 */
export function a11yOverview(rules: RuleSummary[], screens: number): string {
  if (!rules.length) return ''
  const total = rules.reduce((n, r) => n + r.nodes, 0)
  const lines = rules
    .map(
      (r) => `<button class="ov-rule" data-rule="${esc(r.rule)}">
        <span class="impact ${esc(r.impact)}">${esc(r.impact)}</span>
        <span class="ov-title">${esc(r.title)}</span>
        <code class="ov-id">${esc(r.rule)}</code>
        <span class="ov-count"><b>${r.nodes}</b> element${
        r.nodes === 1 ? '' : 's'
      }</span>
        <span class="ov-screens">${r.screens} screenshot${
        r.screens === 1 ? '' : 's'
      }</span>
      </button>`
    )
    .join('')
  return `<details class="overview" open>
    <summary><b>⚠ ${total} accessibility issue${
    total === 1 ? '' : 's'
  }</b> across ${screens} screenshot${screens === 1 ? '' : 's'} · ${
    rules.length
  } rule${rules.length === 1 ? '' : 's'}</summary>
    <div class="ov-hint">Click a rule to see only the screenshots it affects. Numbered boxes on each “Actual” image mark where the issue is.</div>
    <div class="ov-rules">${lines}</div>
  </details>`
}

function row(
  r: Result,
  meta: Meta | null,
  sourceBaseUrl?: string,
  facets: string[] = [],
  appPath?: string,
  a11y: A11y | null = null
): string {
  const b = r.status === 'added' ? '' : thumb('baseline', r.name)
  const a = r.status === 'removed' ? '' : thumb('actual', r.name)
  const d = r.status === 'changed' ? thumb('diff', r.name) : ''
  const pixelMeta =
    r.status === 'changed'
      ? `<div class="meta">${r.numDiff} pixels differ${
          r.sizeMismatch ? ' · size mismatch' : ''
        }</div>`
      : ''
  const source = sourceLinkFor(r.name, meta, sourceBaseUrl)
  const hasBoth = r.status === 'changed' || r.status === 'unchanged'
  // A 'removed' screenshot has no current page to render, so offer the live
  // HTML view only when the page still exists (added/changed/unchanged).
  const htmlUrl =
    r.status === 'removed' ? '' : appUrlFor(r.name, meta, facets, appPath)
  const htmlAttr = htmlUrl ? ` data-html-url="${htmlUrl}"` : ''
  const { findings, page } = findingsFor(r.name, a11y)
  const markers = a11yMarkers(findings, page)
  // Impacts present on this row, so the impact filter can hide it without
  // walking its cards.
  const impacts = [...new Set(findings.map((f) => f.impact))].join(' ')
  const rules = [...new Set(findings.map((f) => f.rule))].join(' ')
  // The overlay lives on "Actual" — that's the render the findings were
  // measured against.
  const actual = markers ? `<div class="shot">${a}${markers}</div>` : a
  return `
    <section class="row" data-status="${r.status}" data-name="${
    r.name
  }" data-has-both="${hasBoth}" data-a11y="${
    findings.length
  }" data-impacts="${impacts}" data-rules="${esc(rules)}"${htmlAttr}>
      <header><h2>${r.name}</h2>${badgeFor(r.status)}${a11yBadge(
    findings
  )}${pixelMeta}${source}</header>
      <div class="grid"><figure><figcaption>Baseline</figcaption>${b}</figure><figure><figcaption>Actual</figcaption>${actual}</figure><figure><figcaption>Diff</figcaption>${d}</figure></div>
      ${a11yCards(findings)}
    </section>`
}

function renderHtml(
  results: Result[],
  summary: Record<string, number>,
  prNumber?: string,
  prUrl?: string,
  meta?: Meta | null,
  sourceBaseUrl?: string,
  facets: string[] = [],
  appPath?: string,
  a11y: A11y | null = null
): string {
  const prBadge =
    prNumber && prUrl
      ? `<a href="${prUrl}" style="font-weight:600;color:#0969da;text-decoration:none;">PR #${prNumber}</a>`
      : prNumber
      ? `<span style="font-weight:600;">PR #${prNumber}</span>`
      : ''
  // Land on the "Changed" view by default so reviewers see regressions first,
  // but fall back to "All" when nothing changed (otherwise the list is blank).
  const defaultFilter = summary.changed > 0 ? 'changed' : 'all'
  const statusFilters: [string, string][] = [
    ['all', 'All'],
    ['changed', 'Changed'],
    ['added', 'New'],
    ['removed', 'Removed'],
    ['unchanged', 'Unchanged'],
    ['a11y', '⚠ A11y']
  ]
  const impactFilters = ['critical', 'serious', 'moderate', 'minor']
  // A11y data for the client, keyed by full screenshot name so the lightbox's
  // HTML view can outline the offending nodes in the live iframe. Only the
  // fields the client needs — the cards and overlay boxes are server-rendered
  // and the lightbox clones them. `<` is escaped so the embedded JSON can't
  // terminate the <script> block.
  const a11yByName: Record<
    string,
    Array<{ n: number; rule: string; impact: string; target: string }>
  > = {}
  for (const r of results) {
    const { findings } = findingsFor(r.name, a11y)
    if (findings.length) {
      a11yByName[r.name] = findings.map((f) => ({
        n: f.n,
        rule: f.rule,
        impact: f.impact,
        target: f.target
      }))
    }
  }
  const a11yJson = JSON.stringify(a11yByName).replace(/</g, '\\u003c')
  const overview = a11yOverview(a11ySummary(a11y), summary.a11yPages)
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>Visual regression report</title>
<style>
  body { font: 14px system-ui, sans-serif; margin: 0; background: #fafafa; color: #222; }
  header.top { position: sticky; top: 0; background: #fff; border-bottom: 1px solid #e5e5e5; padding: 16px 24px; z-index: 2; }
  .counts { display: flex; gap: 16px; margin-top: 8px; }
  .counts span { font-weight: 600; }
  main { padding: 24px; }
  .row { background: #fff; border: 1px solid #e5e5e5; border-radius: 8px; margin-bottom: 16px; overflow: hidden; }
  .row header { padding: 12px 16px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid #f0f0f0; }
  .row h2 { margin: 0; font-size: 14px; font-weight: 600; flex: 1; }
  .grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: #f0f0f0; }
  figure { margin: 0; background: #fff; padding: 12px; }
  figcaption { font-size: 12px; color: #666; margin-bottom: 8px; }
  img { max-width: 100%; display: block; border: 1px solid #eee; }
  .pill { padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 600; text-transform: uppercase; }
  .pass { background: #e7f6ec; color: #1a7f37; }
  .fail { background: #ffebe9; color: #cf222e; }
  .new { background: #ddf4ff; color: #0969da; }
  .gone { background: #fff1e5; color: #9a6700; }
  .meta { font-size: 12px; color: #666; }

  /* --- accessibility -------------------------------------------------- */
  /* One hue per impact, reused by pills, cards, and the boxes drawn on the
     screenshot, so a color always means the same severity. */
  [data-impact=critical], .impact.critical { --c: #8b1a10; }
  [data-impact=serious], .impact.serious { --c: #cf222e; }
  [data-impact=moderate], .impact.moderate { --c: #b26a00; }
  [data-impact=minor], .impact.minor { --c: #4f7a9c; }
  [data-impact=unknown], .impact.unknown { --c: #57606a; }
  .impact { padding: 2px 7px; border-radius: 8px; font-size: 10px; font-weight: 700; letter-spacing: .03em; text-transform: uppercase; color: #fff; background: var(--c); flex-shrink: 0; }
  .pill.a11y { color: #fff; background: var(--c, #8250df); }

  /* Overlay boxes. Positioned in % of the captured page so the same markup
     works on the thumbnail and blown up in the lightbox. */
  .shot { position: relative; display: inline-block; max-width: 100%; vertical-align: top; }
  .mk { position: absolute; left: var(--x); top: var(--y); width: var(--w); height: var(--h); min-width: 6px; min-height: 6px; box-sizing: border-box; border: 2px solid var(--c); border-radius: 3px; background: color-mix(in srgb, var(--c) 12%, transparent); pointer-events: none; }
  .mk > b { position: absolute; top: -8px; left: -8px; min-width: 16px; height: 16px; padding: 0 3px; box-sizing: border-box; background: var(--c); color: #fff; border-radius: 8px; font-size: 10px; line-height: 16px; text-align: center; font-weight: 700; box-shadow: 0 0 0 1.5px #fff; }
  .mk.pulse { animation: mkpulse 1.1s ease-out 2; }
  @keyframes mkpulse { 0%,100% { box-shadow: 0 0 0 0 transparent; } 40% { box-shadow: 0 0 0 6px color-mix(in srgb, var(--c) 45%, transparent); } }
  body.no-markers .mk { display: none; }

  /* Two-up on a wide screen: a page can easily trip a dozen findings, and a
     single column pushes the next screenshot off the bottom of the report. */
  .v-cards { border-top: 1px solid #f0f0f0; padding: 10px 16px 14px; display: grid; gap: 8px; grid-template-columns: repeat(auto-fill, minmax(420px, 1fr)); align-items: start; }
  .v-card { display: flex; gap: 10px; padding: 10px 12px; border: 1px solid #eaeaea; border-left: 4px solid var(--c); border-radius: 6px; background: #fcfcfc; }
  .v-card.pulse { background: #fff8e5; }
  .v-num { flex-shrink: 0; width: 20px; height: 20px; border-radius: 10px; background: var(--c); color: #fff; font-size: 11px; font-weight: 700; line-height: 20px; text-align: center; }
  .v-body { flex: 1; min-width: 0; }
  .v-head { display: flex; align-items: center; gap: 8px; }
  .v-head h3 { margin: 0; font-size: 14px; font-weight: 600; }
  .v-where { font-size: 13px; color: #24292f; margin-top: 4px; }
  .v-where.muted { color: #8c959f; font-style: italic; }
  .v-fix { font-size: 13px; color: #57606a; margin-top: 4px; }
  .v-contrast { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin-top: 6px; font-size: 13px; }
  .v-contrast .sw { width: 18px; height: 18px; border-radius: 4px; border: 1px solid rgba(0,0,0,0.25); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.35); }
  .v-contrast code { font-size: 12px; color: #24292f; }
  .v-contrast .on { color: #8c959f; margin: 0 2px; }
  .v-contrast .ratio { font-weight: 700; font-size: 15px; margin-left: 4px; }
  .v-contrast .ratio.bad { color: #cf222e; }
  .v-contrast .ratio.ok { color: #1a7f37; }
  .v-contrast .need { color: #57606a; }
  .v-contrast .fs { color: #8c959f; margin-left: 4px; }
  .v-tech { margin-top: 6px; font-size: 12px; }
  .v-tech > summary { cursor: pointer; color: #57606a; }
  .v-tech dl { display: grid; grid-template-columns: max-content 1fr; gap: 2px 10px; margin: 6px 0 0; }
  .v-tech dt { color: #8c959f; }
  .v-tech dd { margin: 0; min-width: 0; }
  .v-tech code { word-break: break-all; color: #57606a; }
  .v-tech pre { margin: 0; white-space: pre-wrap; color: #57606a; font-size: 11px; }

  .overview { background: #fff; border: 1px solid #e5e5e5; border-left: 4px solid #cf222e; border-radius: 8px; margin-bottom: 16px; padding: 12px 16px; }
  .overview > summary { cursor: pointer; font-size: 14px; }
  .ov-hint { font-size: 12px; color: #57606a; margin: 8px 0 10px; }
  .ov-rules { display: grid; gap: 4px; }
  .ov-rule { display: grid; grid-template-columns: 76px 1fr auto auto auto; align-items: center; gap: 10px; width: 100%; text-align: left; font: inherit; padding: 7px 8px; border: 1px solid transparent; border-radius: 6px; background: #fafafa; cursor: pointer; }
  .ov-rule:hover { background: #f0f6ff; border-color: #cfe3ff; }
  .ov-rule.active { background: #ddf4ff; border-color: #0969da; }
  .ov-rule .impact { text-align: center; }
  .ov-title { font-weight: 600; }
  .ov-id { font-size: 11px; color: #8c959f; }
  .ov-count { font-size: 12px; color: #24292f; white-space: nowrap; }
  .ov-screens { font-size: 12px; color: #8c959f; white-space: nowrap; }

  .filter { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin-top: 8px; }
  .filter .lbl { font-size: 12px; color: #666; }
  .filter label.toggle { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #57606a; cursor: pointer; }
  #rule-chip { display: none; align-items: center; gap: 6px; font-size: 12px; padding: 3px 6px 3px 10px; border-radius: 12px; background: #ddf4ff; color: #0969da; }
  #rule-chip.on { display: inline-flex; }
  #rule-chip button { border: 0; background: transparent; color: inherit; cursor: pointer; font: inherit; padding: 0 2px; }
  .filter button { font-size: 12px; padding: 4px 10px; border: 1px solid #ddd; background: #fff; border-radius: 4px; cursor: pointer; }
  .filter button.active { background: #0969da; color: #fff; border-color: #0969da; }
  .filter input[type=search] { flex: 1; min-width: 180px; max-width: 320px; margin-left: auto; padding: 4px 10px; border: 1px solid #ddd; border-radius: 4px; font: inherit; }
  .source-link { font-size: 12px; color: #0969da; text-decoration: none; margin-left: auto; }
  .source-link:hover { text-decoration: underline; }
  [data-hidden] { display: none; }
  .thumb { cursor: zoom-in; }

  .lightbox { position: fixed; inset: 0; background: rgba(10,10,10,0.92); z-index: 100; display: none; flex-direction: column; }
  .lightbox.open { display: flex; }
  .lightbox .bar { display: flex; align-items: center; gap: 12px; padding: 12px 16px; color: #eee; background: rgba(0,0,0,0.5); border-bottom: 1px solid #333; }
  .lightbox .bar h3 { margin: 0; font-size: 14px; font-weight: 600; flex: 1; }
  .lightbox .bar button { background: transparent; color: #eee; border: 1px solid #555; padding: 4px 10px; border-radius: 4px; cursor: pointer; font: inherit; }
  .lightbox .bar button.active { background: #fff; color: #111; border-color: #fff; }
  .lightbox .viewer { position: relative; flex: 1; overflow: auto; display: flex; align-items: center; justify-content: center; padding: 16px; }
  .lightbox .viewer.actual-size { align-items: flex-start; }
  .lightbox .viewer > img { display: block; background: #fff; max-width: 100%; max-height: 100%; object-fit: contain; }
  .lightbox .viewer.actual-size > img { max-width: none; max-height: none; image-rendering: pixelated; }
  .lightbox .viewer > iframe { width: 100%; height: 100%; border: 0; background: #fff; }
  .a11y-legend { position: absolute; top: 12px; left: 12px; z-index: 5; max-width: min(46%, 520px); max-height: 72%; overflow: auto; background: rgba(20,20,20,0.94); color: #eee; border: 1px solid #444; border-radius: 6px; padding: 8px 10px; font-size: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.4); }
  .a11y-legend .hd { font-weight: 700; color: #ffb3b3; margin-bottom: 6px; }
  .a11y-legend button { display: flex; align-items: center; gap: 8px; width: 100%; text-align: left; background: transparent; color: #eee; border: 0; border-top: 1px solid #333; padding: 6px 4px; cursor: pointer; font: inherit; }
  .a11y-legend button:hover { background: rgba(255,255,255,0.08); }
  .a11y-legend .n { flex-shrink: 0; width: 18px; height: 18px; border-radius: 9px; background: var(--c); color: #fff; text-align: center; line-height: 18px; font-weight: 700; font-size: 11px; }
  .a11y-legend .sel { color: #9fb0c0; word-break: break-all; }

  /* A11y mode: the screenshot with its boxes on the left, the same cards the
     row shows (cloned, so there is one renderer) docked on the right. */
  .lightbox .viewer.a11y { align-items: stretch; justify-content: stretch; padding: 0; }
  .a11y-view { display: flex; width: 100%; min-height: 0; }
  .a11y-stage { flex: 1; min-width: 0; overflow: auto; padding: 16px; display: flex; justify-content: center; align-items: flex-start; }
  .a11y-stage .shot img { display: block; max-width: 100%; background: #fff; }
  .lightbox .viewer.actual-size .a11y-stage .shot img { max-width: none; }
  /* The panel is a single column regardless of the row's two-up layout. */
  .a11y-panel { width: 400px; flex-shrink: 0; overflow: auto; background: #fff; border-left: 1px solid #333; padding: 12px; display: grid; grid-template-columns: 1fr; gap: 8px; align-content: start; }
  .a11y-panel .v-card { cursor: pointer; }
  .a11y-panel-hd { font-size: 12px; color: #57606a; }
  .lightbox .slider { position: relative; user-select: none; background: #fff; flex-shrink: 0; }
  .lightbox .slider img { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
  .lightbox .slider .top { clip-path: inset(0 0 0 var(--split, 50%)); }
  .lightbox .slider .handle { position: absolute; top: 0; bottom: 0; left: var(--split, 50%); width: 2px; background: #ff0080; cursor: ew-resize; transform: translateX(-1px); }
  .lightbox .slider .handle::after { content: ''; position: absolute; top: 50%; left: 50%; width: 28px; height: 28px; margin: -14px 0 0 -14px; background: #ff0080; border-radius: 50%; box-shadow: 0 0 0 3px rgba(255,255,255,0.4); }
</style></head>
<body>
  <header class="top">
    <div style="display:flex;align-items:baseline;gap:12px;">
      <h1 style="margin:0;font-size:18px;">Visual regression report</h1>
      ${prBadge}
    </div>
    <div class="counts">
      <span>Total: ${summary.total}</span>
      <span style="color:#1a7f37;">OK: ${summary.unchanged}</span>
      <span style="color:#cf222e;">Changed: ${summary.changed}</span>
      <span style="color:#0969da;">New: ${summary.added}</span>
      <span style="color:#9a6700;">Removed: ${summary.removed}</span>${
    summary.a11yPages
      ? `
      <span style="color:#cf222e;">⚠ A11y: ${summary.a11yViolations} on ${summary.a11yPages}</span>`
      : ''
  }
    </div>
    <div class="filter" id="status-filter">
      ${statusFilters
        .map(
          ([value, label]) =>
            `<button data-filter="${value}"${
              value === defaultFilter ? ' class="active"' : ''
            }>${label}</button>`
        )
        .join('')}
      <span id="rule-chip">rule: <b id="rule-chip-name"></b><button type="button" aria-label="Clear rule filter">✕</button></span>
      <input id="search" type="search" placeholder="Filter by name…" autocomplete="off" />
    </div>${
      facets.length
        ? `
    <div class="filter" id="facet-filter">
      <span class="lbl">Theme:</span>
      <button data-facet="all" class="active">All</button>
      ${facets.map((f) => `<button data-facet="${f}">${f}</button>`).join('')}
    </div>`
        : ''
    }${
    summary.a11yPages
      ? `
    <div class="filter" id="impact-filter">
      <span class="lbl">Impact:</span>
      <button data-impact-filter="all" class="active">All</button>
      ${impactFilters
        .map((i) => `<button data-impact-filter="${i}">${i}</button>`)
        .join('')}
      <label class="toggle"><input type="checkbox" id="marker-toggle" checked /> Show markers on screenshots</label>
    </div>`
      : ''
  }
  </header>
  <main>${overview}${results
    .map((r) => row(r, meta ?? null, sourceBaseUrl, facets, appPath, a11y))
    .join('')}</main>

  <div class="lightbox" id="lb" aria-hidden="true">
    <div class="bar">
      <h3 id="lb-title"></h3>
      <div id="lb-modes">
        <button data-mode="baseline">Baseline</button>
        <button data-mode="actual">Actual</button>
        <button data-mode="diff">Diff</button>
        <button data-mode="slider" id="lb-slider-btn">Slider</button>
        <button data-mode="a11y" id="lb-a11y-btn">⚠ A11y</button>
        <button data-mode="html" id="lb-html-btn">HTML</button>
      </div>
      <button id="lb-zoom">1:1</button>
      <button id="lb-prev" aria-label="Previous">‹</button>
      <button id="lb-next" aria-label="Next">›</button>
      <button id="lb-close" aria-label="Close">✕</button>
    </div>
    <div class="viewer" id="lb-viewer"></div>
  </div>

  <script type="application/json" id="a11y-data">${a11yJson}</script>
  <script>
    (function () {
      const listState = { filter: '${defaultFilter}', query: '', facet: 'all', impact: 'all', rule: 'all' }

      // Flattened a11y findings keyed by screenshot name (see --a11y): number,
      // rule, impact, selector. The cards and the boxes drawn on each
      // screenshot are rendered server-side and cloned where needed, so this is
      // only what the client can't get from the DOM — the selectors used to
      // outline nodes inside the HTML view's live iframe.
      let A11Y = {}
      try { A11Y = JSON.parse(document.getElementById('a11y-data').textContent || '{}') } catch (e) {}
      function escHtml(s) {
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
      }
      function outlineA11y(iframe, items) {
        let doc
        try { doc = iframe.contentDocument } catch (e) { return }
        if (!doc) return
        const paint = () => {
          if (doc.head && !doc.getElementById('a11y-hl-style')) {
            const st = doc.createElement('style')
            st.id = 'a11y-hl-style'
            st.textContent = '[data-a11y-hl]{outline:3px solid #cf222e !important;outline-offset:2px !important;}[data-a11y-hl].a11y-flash{box-shadow:0 0 0 6px rgba(207,34,46,0.45)!important;}'
            doc.head.appendChild(st)
          }
          items.forEach(n => {
            let els = []
            try { els = doc.querySelectorAll(n.target) } catch (e) {}
            els.forEach(el => {
              el.setAttribute('data-a11y-hl', String(n.n))
              if (!el.getAttribute('title')) el.setAttribute('title', n.n + '. ' + n.rule)
            })
          })
        }
        // Re-apply after hydration: the app applies the theme in an effect after
        // mount, so the target nodes may not exist at iframe 'load' time.
        paint()
        setTimeout(paint, 500)
      }
      function locateA11y(iframe, item) {
        let doc
        try { doc = iframe.contentDocument } catch (e) { return }
        if (!doc) return
        let el
        try { el = doc.querySelector(item.target) } catch (e) {}
        if (!el) return
        el.scrollIntoView({ block: 'center', inline: 'center' })
        el.classList.add('a11y-flash')
        setTimeout(() => el.classList.remove('a11y-flash'), 1200)
      }

      function applyFilters() {
        const q = listState.query.toLowerCase()
        const impact = listState.impact
        const rule = listState.rule
        document.querySelectorAll('.row').forEach(r => {
          const matchesFilter = listState.filter === 'all'
            || (listState.filter === 'a11y' ? Number(r.dataset.a11y) > 0 : r.dataset.status === listState.filter)
          const matchesQuery = !q || r.dataset.name.toLowerCase().includes(q)
          const matchesFacet = listState.facet === 'all' || r.dataset.name.includes('-' + listState.facet + '.')
          // The impact and rule filters are a11y-scoped: they narrow to rows
          // carrying a matching finding, and grey out the cards that don't.
          const matchesImpact = impact === 'all' || (r.dataset.impacts || '').split(' ').includes(impact)
          const matchesRule = rule === 'all' || (r.dataset.rules || '').split(' ').includes(rule)
          const shown = new Set()
          r.querySelectorAll('.v-card').forEach(c => {
            const ok = (impact === 'all' || c.dataset.impact === impact) && (rule === 'all' || c.dataset.rule === rule)
            c.toggleAttribute('data-hidden', !ok)
            if (ok) shown.add(c.dataset.n)
          })
          // Keep the boxes on the screenshot in step with the cards, so the
          // numbers you see on the image are the ones listed below it.
          r.querySelectorAll('.mk').forEach(m => m.toggleAttribute('data-hidden', !shown.has(m.dataset.n)))
          if (matchesFilter && matchesQuery && matchesFacet && matchesImpact && matchesRule) r.removeAttribute('data-hidden')
          else r.setAttribute('data-hidden', '')
        })
      }

      function setStatusFilter(value) {
        listState.filter = value
        document.querySelectorAll('#status-filter button').forEach(b => b.classList.toggle('active', b.dataset.filter === value))
      }

      document.querySelectorAll('#status-filter button').forEach(btn => {
        btn.addEventListener('click', () => {
          setStatusFilter(btn.dataset.filter)
          applyFilters()
        })
      })

      document.querySelectorAll('#facet-filter button').forEach(btn => {
        btn.addEventListener('click', () => {
          listState.facet = btn.dataset.facet
          document.querySelectorAll('#facet-filter button').forEach(b => b.classList.toggle('active', b === btn))
          applyFilters()
        })
      })

      document.querySelectorAll('#impact-filter button').forEach(btn => {
        btn.addEventListener('click', () => {
          listState.impact = btn.dataset.impactFilter
          document.querySelectorAll('#impact-filter button').forEach(b => b.classList.toggle('active', b === btn))
          // Narrowing by impact only makes sense within screenshots that have
          // findings, so pull the status filter along.
          if (listState.impact !== 'all' && listState.filter !== 'a11y') setStatusFilter('a11y')
          applyFilters()
        })
      })

      const markerToggle = document.getElementById('marker-toggle')
      if (markerToggle) {
        markerToggle.addEventListener('change', () => {
          document.body.classList.toggle('no-markers', !markerToggle.checked)
        })
      }

      // Overview: clicking a rule narrows the list to the screenshots it
      // affects; clicking it again (or the chip's ✕) clears it.
      const ruleChip = document.getElementById('rule-chip')
      const ruleChipName = document.getElementById('rule-chip-name')
      function setRule(rule) {
        listState.rule = rule
        ruleChipName.textContent = rule === 'all' ? '' : rule
        ruleChip.classList.toggle('on', rule !== 'all')
        document.querySelectorAll('.ov-rule').forEach(b => b.classList.toggle('active', b.dataset.rule === rule))
        if (rule !== 'all') setStatusFilter('a11y')
        applyFilters()
      }
      document.querySelectorAll('.ov-rule').forEach(btn => {
        btn.addEventListener('click', () => {
          setRule(listState.rule === btn.dataset.rule ? 'all' : btn.dataset.rule)
        })
      })
      ruleChip.querySelector('button').addEventListener('click', () => setRule('all'))

      let searchTimer
      document.getElementById('search').addEventListener('input', (e) => {
        clearTimeout(searchTimer)
        searchTimer = setTimeout(() => {
          listState.query = e.target.value.trim()
          applyFilters()
        }, 150)
      })

      const lb = document.getElementById('lb')
      const lbTitle = document.getElementById('lb-title')
      const lbViewer = document.getElementById('lb-viewer')
      const lbSliderBtn = document.getElementById('lb-slider-btn')
      const lbHtmlBtn = document.getElementById('lb-html-btn')
      const lbA11yBtn = document.getElementById('lb-a11y-btn')
      const lbZoomBtn = document.getElementById('lb-zoom')
      const state = { rows: [], idx: 0, mode: 'diff', zoom: false }

      function applyZoom() {
        lbViewer.classList.toggle('actual-size', state.zoom)
        lbZoomBtn.classList.toggle('active', state.zoom)
        lbZoomBtn.textContent = state.zoom ? 'Fit' : '1:1'
      }

      // Briefly draw attention to one finding's box and its card at once, so
      // clicking either end of the pair shows you the other.
      function pulse(scope, n) {
        scope.querySelectorAll('.pulse').forEach(el => el.classList.remove('pulse'))
        const marker = scope.querySelector('.mk[data-n="' + n + '"]')
        const card = scope.querySelector('.v-card[data-n="' + n + '"]')
        if (marker) {
          marker.classList.add('pulse')
          marker.scrollIntoView({ block: 'center', inline: 'center' })
        }
        if (card) {
          card.classList.add('pulse')
          card.scrollIntoView({ block: 'nearest' })
        }
        setTimeout(() => {
          if (marker) marker.classList.remove('pulse')
          if (card) card.classList.remove('pulse')
        }, 2400)
      }

      function refreshRows() {
        state.rows = Array.from(document.querySelectorAll('.row')).filter(r => !r.hasAttribute('data-hidden'))
      }

      function render() {
        const row = state.rows[state.idx]
        if (!row) return
        const name = row.dataset.name
        const status = row.dataset.status
        const hasBoth = row.dataset.hasBoth === 'true'
        const htmlUrl = row.dataset.htmlUrl || ''
        const a11yCount = Number(row.dataset.a11y) || 0
        lbTitle.textContent = name + '  (' + (state.idx + 1) + '/' + state.rows.length + ') · ' + status
        lbSliderBtn.style.display = hasBoth ? '' : 'none'
        lbHtmlBtn.style.display = htmlUrl ? '' : 'none'
        lbA11yBtn.style.display = a11yCount ? '' : 'none'
        lbA11yBtn.textContent = '⚠ ' + a11yCount + ' a11y'

        document.querySelectorAll('#lb-modes button').forEach(b => {
          b.classList.toggle('active', b.dataset.mode === state.mode)
        })

        const availableModes = {
          baseline: status !== 'added',
          actual: status !== 'removed',
          diff: status === 'changed',
          slider: hasBoth,
          a11y: a11yCount > 0,
          html: !!htmlUrl
        }
        if (!availableModes[state.mode]) state.mode = availableModes.diff ? 'diff' : (availableModes.actual ? 'actual' : 'baseline')
        lbViewer.classList.toggle('a11y', state.mode === 'a11y')

        if (state.mode === 'a11y') {
          // Reuse the row's server-rendered boxes and cards rather than
          // re-implementing the renderer in the browser.
          lbViewer.innerHTML = ''
          const view = document.createElement('div')
          view.className = 'a11y-view'
          const stage = document.createElement('div')
          stage.className = 'a11y-stage'
          const shot = document.createElement('div')
          shot.className = 'shot'
          const img = document.createElement('img')
          img.src = 'actual/' + name
          img.alt = name
          shot.appendChild(img)
          // The lightbox shows the full picture regardless of the list filters,
          // so drop the hidden flags the filters may have set on the originals.
          row.querySelectorAll('.mk').forEach(m => {
            const clone = m.cloneNode(true)
            clone.removeAttribute('data-hidden')
            shot.appendChild(clone)
          })
          stage.appendChild(shot)
          const panel = document.createElement('aside')
          panel.className = 'a11y-panel'
          const hd = document.createElement('div')
          hd.className = 'a11y-panel-hd'
          // Only promise the click-to-locate behaviour when boxes were captured.
          hd.textContent = a11yCount + ' issue' + (a11yCount === 1 ? '' : 's') +
            (shot.querySelector('.mk') ? ' — click one to find it on the screenshot' : '')
          panel.appendChild(hd)
          row.querySelectorAll('.v-card').forEach(c => {
            const clone = c.cloneNode(true)
            clone.removeAttribute('data-hidden')
            clone.addEventListener('click', (e) => {
              // Leave the disclosure's own toggling alone.
              if (e.target.closest('.v-tech')) return
              pulse(view, clone.dataset.n)
            })
            panel.appendChild(clone)
          })
          view.appendChild(stage)
          view.appendChild(panel)
          lbViewer.appendChild(view)
          shot.querySelectorAll('.mk > b').forEach(pin => {
            pin.style.pointerEvents = 'auto'
            pin.style.cursor = 'pointer'
            pin.addEventListener('click', () => pulse(view, pin.parentNode.dataset.n))
          })
        } else if (state.mode === 'slider') {
          lbViewer.innerHTML = ''
          const wrap = document.createElement('div')
          wrap.className = 'slider'
          const bot = document.createElement('img')
          bot.src = 'baseline/' + name
          const top = document.createElement('img')
          top.src = 'actual/' + name
          top.className = 'top'
          const handle = document.createElement('div')
          handle.className = 'handle'
          wrap.appendChild(bot)
          wrap.appendChild(top)
          wrap.appendChild(handle)
          lbViewer.appendChild(wrap)

          const sizeWrap = () => {
            const nw = bot.naturalWidth, nh = bot.naturalHeight
            if (!nw || !nh) return
            if (state.zoom) {
              wrap.style.width = nw + 'px'
              wrap.style.height = nh + 'px'
            } else {
              const pad = 32
              const vw = lbViewer.clientWidth - pad
              const vh = lbViewer.clientHeight - pad
              const scale = Math.min(vw / nw, vh / nh, 1)
              wrap.style.width = Math.floor(nw * scale) + 'px'
              wrap.style.height = Math.floor(nh * scale) + 'px'
            }
          }
          if (bot.complete) sizeWrap()
          else bot.onload = sizeWrap
          window.addEventListener('resize', sizeWrap)

          const onMove = (e) => {
            const rect = wrap.getBoundingClientRect()
            const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left
            const pct = Math.max(0, Math.min(100, (x / rect.width) * 100))
            wrap.style.setProperty('--split', pct + '%')
          }
          let dragging = false
          wrap.addEventListener('mousedown', (e) => { dragging = true; onMove(e); e.preventDefault() })
          window.addEventListener('mousemove', (e) => { if (dragging) onMove(e) })
          window.addEventListener('mouseup', () => { dragging = false })
          wrap.addEventListener('touchstart', (e) => { onMove(e); e.preventDefault() }, { passive: false })
          wrap.addEventListener('touchmove', (e) => { onMove(e); e.preventDefault() }, { passive: false })
        } else if (state.mode === 'html') {
          lbViewer.innerHTML = '<iframe src="' + htmlUrl + '" title="' + name + '"></iframe>'
          const iframe = lbViewer.querySelector('iframe')
          const items = A11Y[name] || []
          if (items.length) {
            const legend = document.createElement('div')
            legend.className = 'a11y-legend'
            // Numbers match the boxes in the A11y view and the cards in the
            // list, so the same finding is "#3" everywhere.
            legend.innerHTML = '<div class="hd">⚠ ' + items.length + ' a11y issue' + (items.length === 1 ? '' : 's') + ' — click to locate in the live page</div>' +
              items.map((n, i) => '<button type="button" data-i="' + i + '" data-impact="' + escHtml(n.impact) + '"><span class="n">' + n.n + '</span> <code>' + escHtml(n.rule) + '</code> <span class="sel">' + escHtml(n.target) + '</span></button>').join('')
            lbViewer.appendChild(legend)
            legend.querySelectorAll('button').forEach(b => {
              b.addEventListener('click', () => locateA11y(iframe, items[+b.dataset.i]))
            })
            iframe.addEventListener('load', () => outlineA11y(iframe, items))
          }
        } else {
          lbViewer.innerHTML = '<img src="' + state.mode + '/' + name + '" alt="' + name + '" />'
        }
        applyZoom()
      }

      function open(name, mode, focusN) {
        refreshRows()
        const i = state.rows.findIndex(r => r.dataset.name === name)
        state.idx = i >= 0 ? i : 0
        state.mode = mode || 'diff'
        lb.classList.add('open')
        lb.setAttribute('aria-hidden', 'false')
        render()
        if (focusN) pulse(lbViewer, focusN)
      }

      function close() {
        lb.classList.remove('open')
        lb.setAttribute('aria-hidden', 'true')
        lbViewer.innerHTML = ''
      }

      document.querySelectorAll('.thumb').forEach(img => {
        img.addEventListener('click', () => open(img.dataset.name))
      })

      // The number badge on a card is the handle for "where is this?" — it
      // opens the A11y view already scrolled to that finding's box.
      document.querySelectorAll('.row .v-num').forEach(num => {
        num.title = 'Show on the screenshot'
        num.style.cursor = 'pointer'
        num.addEventListener('click', () => {
          const card = num.closest('.v-card')
          open(num.closest('.row').dataset.name, 'a11y', card.dataset.n)
        })
      })
      function step(delta) {
        if (!state.rows.length) return
        state.idx = (state.idx + delta + state.rows.length) % state.rows.length
        render()
      }

      document.getElementById('lb-close').addEventListener('click', close)
      document.getElementById('lb-prev').addEventListener('click', () => step(-1))
      document.getElementById('lb-next').addEventListener('click', () => step(1))
      document.querySelectorAll('#lb-modes button').forEach(b => {
        b.addEventListener('click', () => { state.mode = b.dataset.mode; render() })
      })
      lbZoomBtn.addEventListener('click', () => { state.zoom = !state.zoom; render() })

      document.addEventListener('keydown', (e) => {
        if (!lb.classList.contains('open')) return
        if (e.key === 'Escape') close()
        else if (e.key === 'ArrowLeft') step(-1)
        else if (e.key === 'ArrowRight') step(1)
      })

      applyFilters()
    })()
  </script>
</body></html>`
}

function run(args: Args): number {
  const {
    actualDir,
    baselineDir,
    outputDir,
    threshold,
    failOnMissingBaseline
  } = args

  mkdirSync(outputDir, { recursive: true })
  const actuals = indexByName(walk(actualDir))
  const baselines = indexByName(walk(baselineDir))

  const results: Result[] = []
  const allNames = new Set([...actuals.keys(), ...baselines.keys()])

  for (const name of [...allNames].sort()) {
    const a = actuals.get(name)
    const b = baselines.get(name)

    if (a && !b) {
      copyInto(a.path, join(outputDir, 'actual'), name)
      results.push({ name, status: 'added' })
      continue
    }
    if (!a && b) {
      copyInto(b.path, join(outputDir, 'baseline'), name)
      results.push({ name, status: 'removed' })
      continue
    }
    if (!a || !b) continue

    copyInto(a.path, join(outputDir, 'actual'), name)
    copyInto(b.path, join(outputDir, 'baseline'), name)

    const baseline = loadPng(b.path)
    const actual = loadPng(a.path)
    const {
      changed,
      width,
      height,
      numDiff,
      sizeMismatch,
      actual: padded
    } = diffMask(baseline, actual, threshold)

    const status: Status =
      numDiff === 0 && !sizeMismatch ? 'unchanged' : 'changed'

    if (status === 'changed') {
      const highlight = highlightImage(padded, changed, width, height)
      mkdirSync(join(outputDir, 'diff'), { recursive: true })
      writeFileSync(join(outputDir, 'diff', name), PNG.sync.write(highlight))
    }

    results.push({ name, status, numDiff, sizeMismatch })
  }

  let a11y: A11y | null = null
  if (args.a11y && existsSync(args.a11y)) {
    try {
      a11y = normalizeA11y(JSON.parse(readFileSync(args.a11y, 'utf8')))
    } catch {
      a11y = null
    }
  }
  const a11yEntries = Object.values(a11y ?? {})

  const summary = {
    total: results.length,
    unchanged: results.filter((r) => r.status === 'unchanged').length,
    changed: results.filter((r) => r.status === 'changed').length,
    added: results.filter((r) => r.status === 'added').length,
    removed: results.filter((r) => r.status === 'removed').length,
    a11yPages: a11yEntries.length,
    // Counted per offending element, not per rule — that's the number of
    // things someone actually has to go fix.
    a11yViolations: a11yEntries.reduce(
      (n, e) => n + e.violations.reduce((m, v) => m + v.nodes.length, 0),
      0
    )
  }

  // `a11y` is the same per-rule rollup the report's overview panel shows, so
  // the PR comment can name the rules instead of pointing at the run logs.
  writeFileSync(
    join(outputDir, 'summary.json'),
    JSON.stringify({ summary, results, a11y: a11ySummary(a11y) }, null, 2)
  )
  let meta: Meta | null = null
  if (args.meta && existsSync(args.meta)) {
    try {
      meta = JSON.parse(readFileSync(args.meta, 'utf8'))
    } catch {
      meta = null
    }
  }

  const facets = (args.facets ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  writeFileSync(
    join(outputDir, 'index.html'),
    renderHtml(
      results,
      summary,
      args.prNumber,
      args.prUrl,
      meta,
      args.sourceBaseUrl,
      facets,
      args.appPath,
      a11y
    )
  )

  console.log(
    `Total: ${summary.total} | OK: ${summary.unchanged} | Changed: ${summary.changed} | New: ${summary.added} | Removed: ${summary.removed}` +
      (summary.a11yPages
        ? ` | A11y: ${summary.a11yViolations} on ${summary.a11yPages}`
        : '')
  )

  const missingBaseline = summary.added > 0 && failOnMissingBaseline
  const hasRegressions = summary.changed > 0 || summary.removed > 0
  return hasRegressions || missingBaseline ? 1 : 0
}

export default {
  command: 'visual-diff',
  desc: 'Diff visual regression screenshots and generate an HTML report',
  builder: {
    'actual-dir': {
      type: 'string',
      describe: 'Directory containing the newly captured screenshots',
      default: 'cypress/screenshots'
    },
    'baseline-dir': {
      type: 'string',
      describe: 'Directory containing the baseline screenshots to diff against',
      default: '.baselines'
    },
    'output-dir': {
      type: 'string',
      describe:
        'Directory to write the HTML report, diff PNGs, and summary.json',
      default: 'visual-report'
    },
    threshold: {
      type: 'number',
      describe: 'pixelmatch color threshold (0-1)',
      default: 0.1
    },
    'fail-on-missing-baseline': {
      type: 'boolean',
      describe: 'Exit non-zero if actual screenshots have no matching baseline',
      default: true
    },
    'pr-number': {
      type: 'string',
      describe: 'Pull request number to display in the report header'
    },
    'pr-url': {
      type: 'string',
      describe: 'Pull request URL to link from the report header'
    },
    meta: {
      type: 'string',
      describe:
        'Path to a JSON file mapping screenshot slug to the visited URL path'
    },
    'source-base-url': {
      type: 'string',
      describe:
        'Base URL for source-file links in the report (e.g. GitHub blob URL of the app root)'
    },
    facets: {
      type: 'string',
      describe:
        'Comma-separated facet suffixes (e.g. "canvas,light,dark") rendered as one-click filter chips that match screenshots named "<name>-<facet>"'
    },
    'app-path': {
      type: 'string',
      describe:
        'Path (relative to the report root) where the live app is published, e.g. "app". Enables an "HTML" view in the lightbox that iframes the rendered page for each screenshot.'
    },
    a11y: {
      type: 'string',
      describe:
        'Path to a JSON file of axe accessibility violations keyed by screenshot slug. Renders a run-level overview grouped by rule, numbered boxes over each offending element on the "Actual" screenshot, per-finding cards (plain-language summary, contrast swatches, suggested fix), and impact/rule filters.'
    }
  },
  handler: (argv: Args) => {
    process.exit(run(argv))
  }
}
