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
type A11yNode = { target: string; html: string; summary: string }
type A11yViolation = {
  id: string
  impact: string | null
  help: string
  helpUrl: string
  nodes: A11yNode[]
}
type A11y = Record<string, A11yViolation[]>

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

/**
 * Build the a11y badge (for the row header) and the collapsible violation list
 * (rule, impact, offending selector, and axe's failure summary) for a
 * screenshot. Returns empty strings and count 0 when there are no violations.
 *
 * @internal — exported only for tests; not part of the package's public API.
 */
export function a11yFor(
  name: string,
  a11y: A11y | null
): { badge: string; details: string; count: number } {
  const slug = name.replace(/\.png$/, '')
  const violations = a11y?.[slug] ?? []
  const count = violations.length
  if (!count) return { badge: '', details: '', count: 0 }

  const plural = count === 1 ? '' : 's'
  const badge = `<span class="pill a11y" title="${count} accessibility violation${plural}">⚠ ${count} a11y</span>`

  const items = violations
    .map((v) => {
      const impact = v.impact
        ? `<span class="a11y-impact ${esc(v.impact)}">${esc(v.impact)}</span> `
        : ''
      const rule = v.helpUrl
        ? `<a href="${esc(
            v.helpUrl
          )}" target="_blank" rel="noopener"><code>${esc(v.id)}</code></a>`
        : `<code>${esc(v.id)}</code>`
      const nodes = v.nodes
        .map(
          (n) =>
            `<li><code class="sel">${esc(n.target)}</code>${
              n.summary
                ? `<div class="a11y-summary">${esc(n.summary)}</div>`
                : ''
            }</li>`
        )
        .join('')
      return `<li>${impact}${rule} — ${esc(
        v.help
      )}<ul class="a11y-nodes">${nodes}</ul></li>`
    })
    .join('')

  // Expanded by default: the violations are the point of the a11y view, so
  // don't make the reviewer click to reveal them.
  const details = `<details class="a11y-details" open><summary>${count} accessibility violation${plural}</summary><ul class="a11y-list">${items}</ul></details>`
  return { badge, details, count }
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
  const {
    badge: a11yBadge,
    details: a11yDetails,
    count: a11yCount
  } = a11yFor(r.name, a11y)
  return `
    <section class="row" data-status="${r.status}" data-name="${
    r.name
  }" data-has-both="${hasBoth}" data-a11y="${a11yCount}"${htmlAttr}>
      <header><h2>${r.name}</h2>${badgeFor(
    r.status
  )}${a11yBadge}${pixelMeta}${source}</header>
      <div class="grid"><figure><figcaption>Baseline</figcaption>${b}</figure><figure><figcaption>Actual</figcaption>${a}</figure><figure><figcaption>Diff</figcaption>${d}</figure></div>
      ${a11yDetails}
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
  // A11y data for the client, keyed by full screenshot name so the lightbox's
  // HTML view can outline the offending nodes in the live iframe. `<` is escaped
  // so the embedded JSON can't terminate the <script> block.
  const a11yByName: Record<string, A11yViolation[]> = {}
  if (a11y) {
    for (const r of results) {
      const v = a11y[r.name.replace(/\.png$/, '')]
      if (v && v.length) a11yByName[r.name] = v
    }
  }
  const a11yJson = JSON.stringify(a11yByName).replace(/</g, '\\u003c')
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
  .a11y { background: #fbefff; color: #8250df; }
  .meta { font-size: 12px; color: #666; }
  .a11y-details { padding: 10px 16px; border-top: 1px solid #f0f0f0; font-size: 13px; }
  .a11y-details > summary { cursor: pointer; color: #8250df; font-weight: 600; }
  .a11y-list { margin: 10px 0 2px; padding-left: 18px; }
  .a11y-list > li { margin-bottom: 8px; }
  .a11y-nodes { margin: 4px 0 0; padding-left: 16px; list-style: circle; }
  .a11y-nodes code.sel { font-size: 12px; color: #57606a; word-break: break-all; }
  .a11y-summary { white-space: pre-wrap; color: #666; font-size: 12px; margin: 2px 0 6px; }
  .a11y-impact { padding: 1px 6px; border-radius: 8px; font-size: 10px; font-weight: 700; text-transform: uppercase; color: #fff; }
  .a11y-impact.critical, .a11y-impact.serious { background: #cf222e; }
  .a11y-impact.moderate { background: #9a6700; }
  .a11y-impact.minor { background: #57606a; }
  .filter { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin-top: 8px; }
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
  .a11y-legend button { display: block; width: 100%; text-align: left; background: transparent; color: #eee; border: 0; border-top: 1px solid #333; padding: 6px 4px; cursor: pointer; font: inherit; }
  .a11y-legend button:hover { background: rgba(255,255,255,0.08); }
  .a11y-legend code { color: #ffb3b3; }
  .a11y-legend .sel { color: #9fb0c0; word-break: break-all; }
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
      <span style="color:#8250df;">⚠ A11y: ${summary.a11yPages}</span>`
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
      <input id="search" type="search" placeholder="Filter by name…" autocomplete="off" />
    </div>${
      facets.length
        ? `
    <div class="filter" id="facet-filter">
      <span style="font-size:12px;color:#666;">Theme:</span>
      <button data-facet="all" class="active">All</button>
      ${facets.map((f) => `<button data-facet="${f}">${f}</button>`).join('')}
    </div>`
        : ''
    }
  </header>
  <main>${results
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
      const listState = { filter: '${defaultFilter}', query: '', facet: 'all' }

      // A11y violations keyed by screenshot name (see --a11y). Used to outline
      // the offending nodes inside the HTML view's live iframe.
      let A11Y = {}
      try { A11Y = JSON.parse(document.getElementById('a11y-data').textContent || '{}') } catch (e) {}
      function escHtml(s) {
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
      }
      function a11yItems(name) {
        return (A11Y[name] || []).flatMap(v =>
          (v.nodes || []).map(n => ({ id: v.id, impact: v.impact, target: n.target, summary: n.summary }))
        )
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
          items.forEach((n, i) => {
            let els = []
            try { els = doc.querySelectorAll(n.target) } catch (e) {}
            els.forEach(el => {
              el.setAttribute('data-a11y-hl', String(i + 1))
              if (!el.getAttribute('title')) el.setAttribute('title', n.id + (n.summary ? ' — ' + n.summary : ''))
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
        document.querySelectorAll('.row').forEach(r => {
          const matchesFilter = listState.filter === 'all'
            || (listState.filter === 'a11y' ? Number(r.dataset.a11y) > 0 : r.dataset.status === listState.filter)
          const matchesQuery = !q || r.dataset.name.toLowerCase().includes(q)
          const matchesFacet = listState.facet === 'all' || r.dataset.name.includes('-' + listState.facet + '.')
          if (matchesFilter && matchesQuery && matchesFacet) r.removeAttribute('data-hidden')
          else r.setAttribute('data-hidden', '')
        })
      }

      document.querySelectorAll('#status-filter button').forEach(btn => {
        btn.addEventListener('click', () => {
          listState.filter = btn.dataset.filter
          document.querySelectorAll('#status-filter button').forEach(b => b.classList.toggle('active', b === btn))
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
      const lbZoomBtn = document.getElementById('lb-zoom')
      const state = { rows: [], idx: 0, mode: 'diff', zoom: false }

      function applyZoom() {
        lbViewer.classList.toggle('actual-size', state.zoom)
        lbZoomBtn.classList.toggle('active', state.zoom)
        lbZoomBtn.textContent = state.zoom ? 'Fit' : '1:1'
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
        lbTitle.textContent = name + '  (' + (state.idx + 1) + '/' + state.rows.length + ') · ' + status
        lbSliderBtn.style.display = hasBoth ? '' : 'none'
        lbHtmlBtn.style.display = htmlUrl ? '' : 'none'

        document.querySelectorAll('#lb-modes button').forEach(b => {
          b.classList.toggle('active', b.dataset.mode === state.mode)
        })

        const availableModes = {
          baseline: status !== 'added',
          actual: status !== 'removed',
          diff: status === 'changed',
          slider: hasBoth,
          html: !!htmlUrl
        }
        if (!availableModes[state.mode]) state.mode = availableModes.diff ? 'diff' : (availableModes.actual ? 'actual' : 'baseline')

        if (state.mode === 'slider') {
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
          const items = a11yItems(name)
          if (items.length) {
            const legend = document.createElement('div')
            legend.className = 'a11y-legend'
            legend.innerHTML = '<div class="hd">⚠ ' + items.length + ' a11y violation' + (items.length === 1 ? '' : 's') + ' — click to locate</div>' +
              items.map((n, i) => '<button type="button" data-i="' + i + '"><b>' + (i + 1) + '.</b> <code>' + escHtml(n.id) + '</code> <span class="sel">' + escHtml(n.target) + '</span></button>').join('')
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

      function open(name) {
        refreshRows()
        const i = state.rows.findIndex(r => r.dataset.name === name)
        state.idx = i >= 0 ? i : 0
        state.mode = 'diff'
        lb.classList.add('open')
        lb.setAttribute('aria-hidden', 'false')
        render()
      }

      function close() {
        lb.classList.remove('open')
        lb.setAttribute('aria-hidden', 'true')
        lbViewer.innerHTML = ''
      }

      document.querySelectorAll('.thumb').forEach(img => {
        img.addEventListener('click', () => open(img.dataset.name))
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
      a11y = JSON.parse(readFileSync(args.a11y, 'utf8'))
    } catch {
      a11y = null
    }
  }
  const a11yEntries = a11y
    ? Object.values(a11y).filter((v) => (v?.length ?? 0) > 0)
    : []

  const summary = {
    total: results.length,
    unchanged: results.filter((r) => r.status === 'unchanged').length,
    changed: results.filter((r) => r.status === 'changed').length,
    added: results.filter((r) => r.status === 'added').length,
    removed: results.filter((r) => r.status === 'removed').length,
    a11yPages: a11yEntries.length,
    a11yViolations: a11yEntries.reduce((n, v) => n + v.length, 0)
  }

  writeFileSync(
    join(outputDir, 'summary.json'),
    JSON.stringify({ summary, results }, null, 2)
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
    `Total: ${summary.total} | OK: ${summary.unchanged} | Changed: ${summary.changed} | New: ${summary.added} | Removed: ${summary.removed}`
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
        'Path to a JSON file of axe accessibility violations keyed by screenshot slug. Renders an a11y badge, an "⚠ A11y" filter, and a per-page violation list (rule, impact, selector, help link) in the report.'
    }
  },
  handler: (argv: Args) => {
    process.exit(run(argv))
  }
}
